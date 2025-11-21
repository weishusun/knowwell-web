import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

export async function POST(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { body: reviewBody, rating } = body;

    if (!reviewBody) {
      return NextResponse.json({ error: 'Review text is required.' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        body: reviewBody,
        rating: Number(rating) || 5,
        noteId: params.id,
        authorId: session.user.id
      }
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('[REVIEW_POST]', error);
    return NextResponse.json({ error: 'Unable to add review.' }, { status: 500 });
  }
}
