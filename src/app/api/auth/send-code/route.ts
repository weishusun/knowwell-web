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

    // SMTP configuration (common env names). If any are missing, email sending is skipped.
    // Required env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM;

    if (smtpHost && smtpPort && smtpUser && smtpPass && smtpFrom) {
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(smtpPort),
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });

        await transporter.sendMail({
          from: smtpFrom,
          to: email,
          subject: 'KnowWell verification code',
          text: `Your verification code is ${code}. It expires in 10 minutes.`
        });
      } catch (mailError) {
        console.error('[AUTH_SEND_CODE_EMAIL]', mailError);
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[AUTH_CODE] ${email} -> ${code} (valid 10 min)`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[AUTH_SEND_CODE]', error);
    return NextResponse.json({ error: 'Unable to send verification code.' }, { status: 500 });
  }
}
