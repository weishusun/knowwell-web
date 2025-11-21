import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ReviewForm } from '@/components/review-form';

type Review = {
  id: string;
  body: string;
  rating: number;
  createdAt?: string;
  author?: {
    name?: string | null;
    image?: string | null;
  } | null;
};

type Note = {
  id: string;
  title: string;
  content: string;
  coverUrl?: string | null;
  tags?: string[];
  createdAt?: string;
  author?: {
    name?: string | null;
    image?: string | null;
  } | null;
  reviews?: Review[];
};

async function getNote(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL ?? ''}/api/notes/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

const formatDate = (date?: string) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));
};

const Avatar = ({ name, image }: { name?: string | null; image?: string | null }) => (
  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-base font-semibold text-slate-600">
    {image ? <Image src={image} alt={name ?? 'User'} width={48} height={48} className="h-full w-full object-cover" /> : (name ?? 'K')[0]}
  </div>
);

function NoteMeta({ note }: { note: Note }) {
  return (
    <div className="flex items-center gap-4">
      <Avatar name={note.author?.name} image={note.author?.image ?? undefined} />
      <div>
        <p className="text-sm font-semibold text-slate-900">{note.author?.name ?? 'Anonymous'}</p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>
      <div className="ml-auto flex items-center gap-3 text-xs font-medium text-slate-600">
        <button className="rounded-full bg-slate-100 px-3 py-1 transition hover:bg-slate-200" type="button">
          Follow
        </button>
      </div>
    </div>
  );
}

function InteractionBar({ commentCount }: { commentCount: number }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
      >
        <span role="img" aria-label="like">
          ❤️
        </span>
        Like
      </button>
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
      >
        <span role="img" aria-label="save">
          ⭐
        </span>
        Save
      </button>
      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
        <span role="img" aria-label="comments">
          💬
        </span>
        {commentCount} comments
      </div>
    </div>
  );
}

function CommentList({ reviews }: { reviews?: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-sm text-slate-500">No comments yet. Be the first to share your thoughts.</p>;
  }

  return (
    <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-2xl border border-slate-100 bg-white/60 p-3 shadow-sm">
          <div className="flex items-center gap-3">
            <Avatar name={review.author?.name} image={review.author?.image ?? undefined} />
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-800">{review.author?.name ?? 'Reader'}</span>
                <span>{formatDate(review.createdAt)}</span>
              </div>
              <p className="mt-1 text-sm text-slate-700">{review.body}</p>
            </div>
            <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-700">{review.rating} ★</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function RecommendedNotes({ tags }: { tags?: string[] }) {
  const suggestions = tags && tags.length > 0 ? tags : ['Creative', 'Inspiration', 'Research'];

  return (
    <div className="rounded-[28px] border border-white/5 bg-white/5 p-6 shadow-inner backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">More to explore</p>
          <h3 className="text-xl font-semibold text-white">Recommended Notes</h3>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">→</div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {suggestions.map((title) => (
          <div
            key={title}
            className="group rounded-2xl border border-white/5 bg-white/10 p-4 text-white shadow-sm transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/15"
          >
            <p className="text-sm font-semibold">{title}</p>
            <p className="mt-1 text-xs text-slate-200">Curated picks inspired by this note.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function NoteDetailPage({ params }: { params: { id: string } }) {
  const note: Note | null = await getNote(params.id);
  if (!note) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="relative overflow-hidden rounded-[32px] bg-slate-900/60 shadow-2xl ring-1 ring-white/5">
            {note.coverUrl ? (
              <Image src={note.coverUrl} alt={note.title} fill className="object-cover" priority />
            ) : (
              <div className="flex h-full min-h-[520px] items-center justify-center text-sm text-slate-400">
                No cover image
              </div>
            )}
          </div>

          <div className="space-y-4 rounded-[32px] border border-white/10 bg-white/95 p-6 text-slate-900 shadow-2xl backdrop-blur">
            <NoteMeta note={note} />
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">K-Note</p>
              <h1 className="text-3xl font-bold text-slate-900 lg:text-4xl">{note.title}</h1>
              <p className="text-sm text-slate-500">Published {formatDate(note.createdAt)}</p>
            </div>
            <p className="whitespace-pre-line text-base leading-7 text-slate-700">{note.content}</p>
            {note.tags?.length ? (
              <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-700">
                {note.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-slate-800">
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
            <InteractionBar commentCount={note.reviews?.length ?? 0} />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.7fr,1.3fr]">
          <div className="rounded-[28px] border border-white/5 bg-white/10 p-5 shadow-inner backdrop-blur">
            <h2 className="text-xl font-semibold text-white">Quick Reply</h2>
            <p className="mt-1 text-sm text-slate-200">Share your thoughts and help others exploring this K-Note.</p>
            <div className="mt-4">
              <ReviewForm noteId={note.id} />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/5 bg-white/10 p-5 shadow-inner backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Comments</h2>
              <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                {note.reviews?.length ?? 0} replies
              </div>
            </div>
            <CommentList reviews={note.reviews} />
          </div>
        </div>

        <div className="mt-8">
          <RecommendedNotes tags={note.tags} />
        </div>
      </div>
    </div>
  );
}
