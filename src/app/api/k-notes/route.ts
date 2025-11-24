import { Prisma } from '@prisma/client';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function normalizeTags(tags: string[] | string | null | undefined): string[] {
  if (Array.isArray(tags)) {
    return tags
      .map((tag) => (typeof tag === 'string' ? tag.trim() : ''))
      .filter(Boolean);
  }

  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') ?? undefined;
    const authorId = searchParams.get('authorId') ?? undefined;
    const takeParam = Number.parseInt(searchParams.get('take') || '20', 10);
    const skipParam = Number.parseInt(searchParams.get('skip') || '0', 10);

    const take = Number.isNaN(takeParam) ? 20 : Math.min(Math.max(takeParam, 0), 100);
    const skip = Number.isNaN(skipParam) ? 0 : Math.max(skipParam, 0);

    let session = null;
    if (authorId) {
      session = await getServerSession(authOptions);
      if (!session?.user?.id || session.user.id !== authorId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const where: Prisma.KNoteWhereInput = {};

    if (category) {
      where.category = category;
    }

    if (authorId) {
      where.authorId = authorId;
    } else {
      where.isPublished = true;
    }

    const kNotes = await prisma.kNote.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take,
      skip,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    });

    return NextResponse.json(kNotes);
  } catch (error) {
    console.error('[K_NOTES_GET]', error);
    return NextResponse.json({ error: 'Unable to fetch K-Notes.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, summary, content, category, tags, coverImageUrl, isPublished } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }

    const kNote = await prisma.kNote.create({
      data: {
        title,
        summary,
        content,
        category,
        tags: normalizeTags(tags),
        coverImageUrl,
        isPublished: Boolean(isPublished),
        authorId: session.user.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    });

    return NextResponse.json(kNote, { status: 201 });
  } catch (error) {
    console.error('[K_NOTES_POST]', error);
    return NextResponse.json({ error: 'Unable to create K-Note.' }, { status: 500 });
  }
}
