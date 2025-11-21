import { HomeNavbar } from '@/components/home/home-navbar';

const aboutContent = `KnowWell is built by a collective of curious writers, editors, and researchers who believe that informed choices lead to better lives. We dive deep into the products, experiences, and stories that shape culture, sharing insights that are both practical and inspiring.

Our team blends journalistic rigor with lived experience. We interview experts, test products, and listen to the community to surface perspectives that feel human, not corporate. Every piece we publish is guided by empathy and a commitment to clarity.

As we grow, we stay focused on trust. We disclose how we work, why we recommend what we do, and the values that guide us. Thank you for reading, sharing, and helping us build a more transparent, thoughtful way to discover what matters.`;

const contacts = [
  {
    title: 'For editorial',
    email: 'editorial@knowwell.com',
    description: 'Pitch stories, share feedback, or collaborate on reporting with our editorial desk.'
  },
  {
    title: 'For customer service',
    email: 'support@knowwell.com',
    description: 'Questions about your account, subscriptions, or site experience? We are here to help.'
  },
  {
    title: 'For brand partnership',
    email: 'partners@knowwell.com',
    description: 'Explore thoughtful collaborations that put audience value first and keep transparency at the core.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3ecff] via-[#f7f5ff] to-white text-slate-900">
      <HomeNavbar activeHref="/about" />

      <main className="container-page gap-12">
        <section className="relative overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.08),_transparent_45%),_radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.08),_transparent_45%)]" />

          <div className="relative z-10 flex flex-col items-center gap-10 px-6 py-10 md:px-12 md:py-14">
            <header className="flex flex-col items-center gap-3 text-center">
              <span className="inline-flex items-center rounded-full bg-purple-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-purple-700">
                About
              </span>
              <h1 className="text-3xl font-bold md:text-4xl">About Us</h1>
              <p className="max-w-3xl text-base text-slate-600 md:text-lg">
                We are building a kinder, clearer way to help people make confident decisions—rooted in reporting, empathy, and community voices.
              </p>
            </header>

            <article className="max-w-3xl space-y-5 text-justify text-base leading-relaxed text-slate-700 md:text-lg">
              {aboutContent.split('\n\n').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>

            <div className="w-full rounded-2xl bg-gradient-to-r from-purple-50 via-white to-indigo-50 p-6 shadow-inner ring-1 ring-purple-100 md:p-8">
              <div className="mb-6 flex flex-col gap-2 text-center">
                <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
                <p className="text-sm text-slate-600 md:text-base">
                  Reach the right team for your questions, pitches, and collaboration ideas.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                {contacts.map((contact) => (
                  <div key={contact.title} className="flex flex-col gap-3 rounded-xl border border-purple-100 bg-white/70 p-4 text-left shadow-sm backdrop-blur">
                    <h3 className="text-base font-semibold text-slate-900">{contact.title}</h3>
                    <p className="text-sm text-slate-600">{contact.description}</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm font-semibold text-purple-700 underline decoration-2 underline-offset-4 transition hover:text-purple-800"
                    >
                      {contact.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
