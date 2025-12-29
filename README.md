# FitnessTrack ✅

A simple fitness & nutrition tracker built with Next.js, Tailwind, NextAuth, and Prisma. Track foods, workouts, and authenticate via email or Google.

---

## 🔍 Project Overview

FitnessTrack helps users log workouts and look up nutrition information. It uses Next.js (App Router), Prisma with PostgreSQL, and NextAuth for authentication (email + Google provider).

## ⚙️ Features

- Local signup/signin (email + password)
- Google single sign-on
- Nutrition lookup and food database
- Workout plans by muscle groups
- Prisma ORM for PostgreSQL data modeling and migrations

## 🧰 Tech Stack

- Next.js (15.x, App Router)
- TypeScript
- Tailwind CSS
- NextAuth (Google + Credentials provider)
- Prisma (PostgreSQL)
- React Icons, Framer Motion

## 🚀 Quick Start

1. Clone the repository

```bash
git clone <repo-url>
cd FitnessTrack
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file (see **Environment Variables** below)

4. Generate Prisma client and run migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Run the development server

```bash
npm run dev
```

Open http://localhost:3000

## 🔐 Environment Variables

Create a `.env` (DO NOT commit secrets). Required variables used in this project:

- `DATABASE_URL` — PostgreSQL connection string (e.g., Neon, Supabase, Heroku)
- `NEXTAUTH_SECRET` — strong random string used by NextAuth
- `GOOGLE_CLIENT_ID` — OAuth client ID for Google sign-in
- `GOOGLE_CLIENT_KEY` — OAuth client secret for Google sign-in
- `GOOGLE_API_KEY` — optional, used for any Google APIs

> The project uses `DATABASE_URL` in `prisma/schema.prisma` and `NEXTAUTH_SECRET` & Google credentials in `app/lib/auth.ts`.

## 🗂 Project Structure (high level)

- `app/` — Next.js app routes & pages (signup, signin, workouts, nutritions, api)
- `app/lib/auth.ts` — NextAuth configuration (Google + credentials)
- `component/` — UI components (Header, Button)
- `prisma/schema.prisma` — DB models (User, Food, WorkoutPlan)
- `middleware.ts` — app middleware (if any)

## 📋 Prisma / Database

Schema: `prisma/schema.prisma` contains models for `User`, `Food`, and `WorkoutPlan`.

Common commands:

```bash
npx prisma generate         # generate client
npx prisma migrate dev      # run migrations locally
npx prisma db push          # push schema (non-migration)
```

## 🧪 Authentication

- Email/password auth handled by NextAuth Credentials provider (see `authorize` in `app/lib/auth.ts`). Passwords are hashed with `bcrypt` on sign-up.
- Google sign-in is available; on first sign-in the app creates a user record if one doesn't exist.
- Session `maxAge` is configured in `app/lib/auth.ts` (1 hour by default).

## ✅ Scripts

- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm start` — start production server
- `npm run lint` — run ESLint

## 🔧 Deployment

Vercel is recommended for Next.js deployments. Ensure env vars are set in your deployment environment (DATABASE_URL, NEXTAUTH_SECRET, Google OAuth credentials).

## 💡 Tips & Notes

- Keep `.env` out of version control. Add `.env` to `.gitignore` if not already ignored.
- If you add seeding scripts, consider `prisma db seed` or a custom script.

## 🤝 Contributing

Contributions are welcome — open an issue or PR with proposed changes.

## 📞 Contact

For questions or feature requests, open an issue or contact the maintainer.

## 📄 License

MIT License

