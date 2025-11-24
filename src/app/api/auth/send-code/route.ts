import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

const CODE_TTL_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body ?? {};

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = await hash(code, 10);
    const expiresAt = new Date(Date.now() + CODE_TTL_MS);

    await prisma.verificationCode.deleteMany({ where: { email } });

    await prisma.verificationCode.create({
      data: {
        email,
        codeHash,
        expiresAt
      }
    });

    // Resend configuration (common env names). If any are missing, email sending is skipped.
    // Required env vars: RESEND_API_KEY, RESEND_FROM
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM;

    if (resendApiKey && resendFrom) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: resendFrom,
            to: [email],
            subject: 'KnowWell verification code',
            html: `<p>Your verification code is <strong>${code}</strong>. It expires in 10 minutes.</p>`,
            text: `Your verification code is ${code}. It expires in 10 minutes.`
          })
        });
      } catch (mailError) {
        console.error('[AUTH_SEND_CODE_EMAIL]', mailError);
      }
    } else {
      console.log(`[AUTH_CODE] ${email} -> ${code} (valid 10 min)`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[AUTH_SEND_CODE]', error);
    return NextResponse.json({ error: 'Unable to send verification code.' }, { status: 500 });
  }
}
