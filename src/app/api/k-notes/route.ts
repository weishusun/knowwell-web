import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_TAKE = 20;
const DEFAULT_SKIP = 0;

function normalizeTags(tags: string[] | string | null | undefined): string[] {
  if (Array.isArray(tags)) {
    return tags
      .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
      .filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

function parseNumberParam(value: string | null, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isNaN(parsed) ? fallback : Math.max(parsed, 0);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    const take = parseNumberParam(searchParams.get("take"), DEFAULT_TAKE);
    const skip = parseNumberParam(searchParams.get("skip"), DEFAULT_SKIP);

    const where = {
      isPublished: true,
      ...(category ? { category } : {}),
    };

    const [kNotes, _count] = await Promise.all([
      prisma.kNote.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take,
        skip,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      }),
      prisma.kNote.count({ where }),
    ]);

    return NextResponse.json(kNotes);
  } catch (error) {
    console.error("[K_NOTES_GET]", error);
    return NextResponse.json({ error: "Unable to fetch K-Notes." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, summary, content, category, tags, coverImageUrl, isPublished } = body ?? {};

    if (!title || !content || !category) {
      return NextResponse.json({ error: "Title, content, and category are required." }, { status: 400 });
    }

    const created = await prisma.kNote.create({
      data: {
        title,
        summary,
        content,
        category,
        tags: normalizeTags(tags),
        coverImageUrl,
        isPublished: Boolean(isPublished),
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error("[K_NOTES_POST]", error);
    return NextResponse.json({ error: "Unable to create K-Note." }, { status: 500 });
  }
}
