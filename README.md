# KnowWell Web

A Next.js 14 (App Router) project for publishing K-Notes and community reviews. Built with TypeScript, Tailwind CSS, Prisma, PostgreSQL, and NextAuth credential-based authentication.

## Getting started

1. Install dependencies

```bash
npm install
```

2. Configure environment variables

Copy `.env.example` to `.env.local` and set your Supabase PostgreSQL URL and NextAuth secret values.

```bash
cp .env.example .env.local
```

3. Generate the Prisma client and run the dev server

```bash
npx prisma generate
npm run dev
```

## Features

- Credential-based registration and login via NextAuth
- Publish visual K-Notes with cover images and tags
- Write and read reviews on each note
- Responsive homepage with hero, showcase cards, and cookie consent
- Shared navigation, footer, and layout with Tailwind styling
