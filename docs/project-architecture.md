# 1. Repository Tree (annotated)
- `README.md` — quick start and feature overview for the KnowWell web app.
- `.env.example` — sample environment variables for PostgreSQL and NextAuth secrets.
- `next.config.mjs` / `tailwind.config.ts` / `postcss.config.mjs` — Next.js and Tailwind configuration, including brand theme extensions.
- `prisma/` — database schema and Prisma client generator (`schema.prisma`).
- `src/app/` — Next.js App Router root with global layout, public and dashboard route groups, API handlers, and global styles.
  - `layout.tsx` — root HTML shell loading fonts, providers, global footer, and cookie manager.
  - `globals.css` — Tailwind layers plus shared utility classes (buttons, cards, container).
  - `page.tsx` — landing page that server-fetches notes and composes public sections.
  - `(public)/` — marketing and content routes with their own navbar + footer layout.
  - `(dashboard)/` — authenticated authoring area (currently only new note creation).
  - `api/notes` — Route Handlers for listing/creating notes and fetching a single note.
- `src/components/` — shared UI library (home sections, dashboard note form, navbars, cookie controls, providers, footer).
- `src/lib/` — server utilities (`auth.ts` for NextAuth config, `prisma.ts` client singleton).
- `src/types/` — NextAuth session type augmentation.

# 2. Core Architecture Summary
- Next.js 14 App Router with a global `RootLayout` that loads Inter and Plus Jakarta fonts, wraps pages in a `SessionProvider`, and injects a shared `Footer` plus cookie settings manager.
- Public pages live under the `(public)` route group, which adds `HomeNavbar` and `SiteFooter` around its children for consistent marketing navigation.
- The root landing page is server-rendered, fetching notes from the internal `/api/notes` endpoint with `cache: 'no-store'` before composing multiple promotional sections.
- Dashboard content under `(dashboard)` is client-rendered; `/notes/new` gates access via `useSession` and posts new notes to `/api/notes`.
- Data layer uses Prisma with PostgreSQL models for `User`, `Note`, and `Review`, and exposes API Route Handlers for list/detail note operations.
- Authentication relies on NextAuth credentials provider with JWT sessions, attaching `user.id` in the session callback.
- Styling is Tailwind-first with brand colors, shadows, and font variables defined in `tailwind.config.ts` and utility classes in `globals.css`.
- Client-only UX includes cookie consent management, modal dialogs, and interactive dashboards using React state inside client components.

# 3. Routing & Rendering Flow
1. Every request enters `src/app/layout.tsx`, which sets the HTML shell, applies font variables, and wraps the page with `Providers`, `Footer`, and `CookieSettingsManager`.
2. Routes inside `src/app/(public)` are further wrapped by `(public)/layout.tsx`, injecting `HomeNavbar` and `SiteFooter` so all marketing pages share the same chrome.
3. The root `/` route (`page.tsx`) is a server component that fetches notes from `/api/notes`, then renders the hero, category icons, rankings, latest reviews, and popular notes sections alongside the cookie settings launcher.
4. Dashboard routes rely on the global layout only; `/notes/new` is a client page that checks `useSession`, shows login/register prompts if unauthenticated, and submits form data to `/api/notes` before redirecting to the new note detail.
5. Note detail pages in `(public)/notes/[id]` are server components that fetch from `/api/notes/[id]` with `no-store` caching; they `notFound()` on missing IDs and render rich content/insights UI.
6. API Route Handlers (`api/notes` and `api/notes/[id]`) run on the server, using Prisma to query or create records and returning JSON responses used by both server and client components.
7. Static assets are primarily remote images referenced in components; global styles and Tailwind classes handle theming and layout without local `/public` assets called out in the inspected files.

# 4. Page / Feature Map
| Route | Page file | Components used | Status |
| --- | --- | --- | --- |
| `/` | `src/app/page.tsx` | HomeNavbar, HeroSection, CategoryIconsRow, TrendingRankingSection, LatestReviewsList, PopularNotesSection, CookieSettingsLauncher, SiteFooter | Done (server-rendered, fetches notes) |
| `(public)` layout | `src/app/(public)/layout.tsx` | HomeNavbar, SiteFooter | Layout wrapper active |
| `/about` | `src/app/(public)/about/page.tsx` | Static marketing sections | Done (static) |
| `/brands` | `src/app/(public)/brands/page.tsx` | Brand grid cards | Done (static links) |
| `/business` | `src/app/(public)/business/page.tsx` | Business marketing layout | Done (static) |
| `/cookie-policy` | `src/app/(public)/cookie-policy/page.tsx` | Policy text | Done (static) |
| `/login` | `src/app/(public)/login/page.tsx` | Login dialog modal | Functional (depends on NextAuth backend) |
| `/register` | `src/app/(public)/register/page.tsx` | Registration UI | Placeholder/static (no form wiring observed) |
| `/privacy` | `src/app/(public)/privacy/page.tsx` | Privacy policy content | Done (static) |
| `/privacy-policy` | `src/app/(public)/privacy-policy/page.tsx` | Privacy policy content | Done (static) |
| `/write-review` | `src/app/(public)/write-review/page.tsx` | Hero + category grid | Done (static CTA) |
| `/smart-buy` | `src/app/(public)/smart-buy/page.tsx` | Marketplace layout | Done (static) |
| `/reviews` | `src/app/(public)/reviews/page.tsx` | Review listings | Done (static/demo) |
| `/reviews/[id]` | `src/app/(public)/reviews/[id]/page.tsx` | Review detail + form card | Done (static/demo) |
| `/notes/[id]` | `src/app/(public)/notes/[id]/page.tsx` | Server fetch note detail UI | Done (returns 404 on missing note) |
| `/k-note` | `src/app/(public)/k-note/page.tsx` | K-Note grid with modal | Placeholder/demo data |
| `/k-note/*` subroutes | `src/app/(public)/k-note/.../page.tsx` | Dashboards, messaging, management layouts | Placeholders (static dashboards) |
| `/k-ranking` | `src/app/(public)/k-ranking/page.tsx` | Ranking cards | Done (static datasets) |
| `/k-ranking/[category]` and category pages | `src/app/(public)/k-ranking/[category]/page.tsx` plus category files | Ranking cards per category | Done (static datasets) |
| `(dashboard)/notes/new` | `src/app/(dashboard)/notes/new/page.tsx` | NoteSidebar, NoteForm, auth guard | Functional with API/DB configured |

# 5. Data / State / Style Flow
- **Auth & Providers**: `Providers` wraps pages in NextAuth `SessionProvider`, enabling `useSession` across client components like the dashboard note form.
- **Data fetching**: Server components call internal APIs using absolute URLs derived from `NEXTAUTH_URL`; note detail uses `fetch` with `cache: 'no-store'` to avoid stale data.
- **API handlers**: `/api/notes` GET/POST and `/api/notes/[id]` GET use Prisma to query/create notes with related authors and reviews, returning JSON for pages and client forms.
- **Client state**: Forms, modal dialogs, and cookie settings are managed via React state in client components; cookie preferences persist to `localStorage` and dispatch custom events.
- **Styling system**: Tailwind CSS with global utility classes (`.btn-primary`, `.card`, `.container-page`) defined in `globals.css` and brand theme settings in `tailwind.config.ts`.

# 6. How to Run This Project
1. Install dependencies: `npm install`.
2. Copy environment template: `cp .env.example .env.local`, then set `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL`.
3. Generate Prisma client: `npx prisma generate` (or `npm run prisma:generate`).
4. Start development server: `npm run dev` (Next.js on port 3000).
5. Production build: `npm run build` then `npm start`.
6. Linting: `npm run lint`.

# 7. Improvement Checklist
- Consolidate navbar/footer usage so the root home page relies on the `(public)` layout instead of duplicating header/footer locally.
- Add loading and error UI states for note list/detail fetches to improve resiliency when `/api/notes` requests fail.
- Introduce authenticated layout or middleware for `(dashboard)` routes to prevent unauthenticated flashes and centralize access control.
- Replace placeholder/static datasets (K-Note grid, K-Ranking categories, review listings) with real data sources or CMS-driven content; extract reusable card components to reduce duplication.
- Extend API coverage for reviews (currently read-only via note detail) and wire review submission forms accordingly.
- Add automated tests (unit/render or integration) for data-fetching utilities and critical UI components.
