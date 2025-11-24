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

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[AUTH_CODE] ${email} -> ${code} (valid 10 min)`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[AUTH_SEND_CODE]', error);
    return NextResponse.json({ error: 'Unable to send verification code.' }, { status: 500 });
  }
}
