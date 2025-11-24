import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

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

export async function GET(_request: Request, { params }: Params) {
  try {
    const kNote = await prisma.kNote.findUnique({
      where: { id: params.id },
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

    if (!kNote) {
      return NextResponse.json({ error: "K-Note not found" }, { status: 404 });
    }

    return NextResponse.json({ data: kNote });
  } catch (error) {
    console.error("[K_NOTE_GET]", error);
    return NextResponse.json({ error: "Unable to fetch K-Note." }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.kNote.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "K-Note not found" }, { status: 404 });
    }

    if (existing.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { title, summary, content, category, tags, coverImageUrl, isPublished } = body ?? {};

    const data: Record<string, unknown> = {};

    if (typeof title === "string") data.title = title;
    if (typeof summary === "string") data.summary = summary;
    if (typeof content === "string") data.content = content;
    if (typeof category === "string") data.category = category;
    if (typeof coverImageUrl === "string") data.coverImageUrl = coverImageUrl;
    if (typeof isPublished === "boolean") data.isPublished = isPublished;
    if (tags !== undefined) data.tags = normalizeTags(tags);

    const updated = await prisma.kNote.update({
      where: { id: params.id },
      data,
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

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("[K_NOTE_PATCH]", error);
    return NextResponse.json({ error: "Unable to update K-Note." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.kNote.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "K-Note not found" }, { status: 404 });
    }

    if (existing.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.kNote.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[K_NOTE_DELETE]", error);
    return NextResponse.json({ error: "Unable to delete K-Note." }, { status: 500 });
  }
}
