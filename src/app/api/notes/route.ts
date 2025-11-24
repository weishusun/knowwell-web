import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

type NoteStatus = 'draft' | 'published' | 'all';
type SortableField = 'createdAt' | 'updatedAt';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);

    const statusValue = searchParams.get('status');
    const statusParam: NoteStatus = statusValue === 'draft' || statusValue === 'published'
      ? statusValue
      : 'all';
    const q = searchParams.get('q') ?? '';
    const sortValue = searchParams.get('sort');
    const sortParam: SortableField = sortValue === 'updatedAt' ? 'updatedAt' : 'createdAt';
    const orderValue = searchParams.get('order');
    const orderParam: Prisma.SortOrder = orderValue === 'asc' ? 'asc' : 'desc';
    const pageParam = Number(searchParams.get('page'));
    const pageSizeParam = Number(searchParams.get('pageSize'));

    const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : DEFAULT_PAGE;
    const pageSize =
      Number.isInteger(pageSizeParam) && pageSizeParam > 0 ? pageSizeParam : DEFAULT_PAGE_SIZE;

    const skip = (page - 1) * pageSize;
    const noteModelFields = (prisma.note as unknown as { fields?: Record<string, unknown> }).fields;
    const hasStatusField = Boolean(noteModelFields?.status);

    const where: Prisma.NoteWhereInput = {
      authorId: session.user.id
    };

    if (statusParam !== 'all') {
      if (hasStatusField) {
        (where as Record<string, unknown>).status = statusParam;
      } else {
        // TODO: Add `status` field to the Note model to enable status-based filtering.
      }
    }

    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        {
          // Array filters are case-sensitive; ensure tags are normalized for best results.
          tags: { has: q }
        }
      ];
    }

    const [items, totalItems] = await Promise.all([
      prisma.note.findMany({
        where,
        orderBy: { [sortParam]: orderParam },
        skip,
        take: pageSize,
        include: {
          author: true,
          reviews: true
        }
      }),
      prisma.note.count({ where })
    ]);

    const totalPages = Math.ceil(totalItems / pageSize);

    return NextResponse.json({
      items,
      meta: {
        page,
        pageSize,
        totalItems,
        totalPages
      }
    });
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
