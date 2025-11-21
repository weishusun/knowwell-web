import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
        reviews: true
      }
    });
    return NextResponse.json(notes);
  } catch (error) {
    console.error('[NOTES_GET]', error);
    return NextResponse.json({ error: 'Unable to fetch notes.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !session.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content, coverUrl, tags } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        coverUrl,
        tags: Array.isArray(tags) ? tags : [],
        authorId: session.user.id
      }
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error('[NOTES_POST]', error);
    return NextResponse.json({ error: 'Unable to create note.' }, { status: 500 });
  }
}
