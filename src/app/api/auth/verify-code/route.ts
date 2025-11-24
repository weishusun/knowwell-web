import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, code } = body ?? {};

    if (!email || typeof email !== 'string' || !code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Email and code are required.' }, { status: 400 });
    }

    const verification = await prisma.verificationCode.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' }
    });

    if (!verification) {
      return NextResponse.json({ error: 'Verification code not found.' }, { status: 404 });
    }

    if (verification.expiresAt.getTime() < Date.now()) {
      await prisma.verificationCode.deleteMany({ where: { email } });
      return NextResponse.json({ error: 'Verification code expired.' }, { status: 410 });
    }

    const isMatch = await compare(code, verification.codeHash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid verification code.' }, { status: 401 });
    }

    await prisma.verificationCode.deleteMany({ where: { email } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[AUTH_VERIFY_CODE]', error);
    return NextResponse.json({ error: 'Unable to verify code.' }, { status: 500 });
  }
}
