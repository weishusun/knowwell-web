import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
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

export async function PATCH(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  try {
    const body = await request.json();
    const { title, content, coverUrl, tags } = body as {
      title?: string;
      content?: string;
      coverUrl?: string;
      tags?: string[];
    };

    const note = await prisma.note.findUnique({
      where: { id }
    });

    if (!note) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    if (note.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updateData: {
      title?: string;
      content?: string;
      coverUrl?: string | null;
      tags?: string[];
    } = {};

    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (coverUrl !== undefined) updateData.coverUrl = coverUrl;
    if (tags !== undefined) updateData.tags = Array.isArray(tags) ? tags : [];

    const updatedNote = await prisma.note.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error('[NOTE_PATCH]', error);
    return NextResponse.json({ error: 'Unable to update note.' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  try {
    const note = await prisma.note.findUnique({
      where: { id }
    });

    if (!note) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    if (note.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.note.delete({
      where: { id }
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[NOTE_DELETE]', error);
    return NextResponse.json({ error: 'Unable to delete note.' }, { status: 500 });
  }
}
