import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const note = await prisma.note.findUnique({
      where: { id: params.id },
      include: {
        author: true,
        reviews: {
          include: {
            author: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!note) return NextResponse.json({ error: 'Note not found' }, { status: 404 });

    return NextResponse.json(note);
  } catch (error) {
    console.error('[NOTE_GET]', error);
    return NextResponse.json({ error: 'Unable to fetch note.' }, { status: 500 });
  }
}
