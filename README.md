# Naano — full rebuild

A working rebuild of [naano.com](https://naano.com), the B2B LinkedIn creator marketplace: the whole public site, both sign-up flows, the brand workspace and the creator workspace.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

No external services are required. Data lives in a local SQLite file (`data/naano.db`, created on first request) through libSQL; in production the same code talks to a hosted Turso database.

Copy `.env.example` to `.env.local` to plug in providers (all optional, see the file for every variable):

* **E-mail** — set the `SMTP_*` variables (nodemailer) or `RESEND_API_KEY`, and verification / recovery codes are e-mailed to the user. Without a provider the messages land in a local inbox at **/dev/inbox** (the sign-up page tells the user so). The code is never shown on screen.
* **Social sign-in** — set `GOOGLE_CLIENT_ID/SECRET` and/or `LINKEDIN_CLIENT_ID/SECRET` (OpenID Connect, callback `<APP_URL>/api/auth/oauth/callback`) and the LinkedIn / Google buttons use the real providers. Without credentials a built-in consent screen simulates the provider so the full flow (account creation, role choice, onboarding, returning sign-in) works locally.
* **AI** — set `GEMINI_API_KEY` (Google AI Studio) or `ANTHROPIC_API_KEY` (Claude), choose with `AI_PROVIDER`, to turn on the AI-powered features (website analysis during brand onboarding, Nao creator matching, "Create with AI" briefs, the NaanoBot assistant). Every AI feature has a deterministic fallback.

## What is in the box

| Area | Route(s) | Notes |
| --- | --- | --- |
| Public site | `/`, `/creators`, `/agencies`, `/pricing`, `/about`, `/help`, `/book`, `/briefs`, `/selection`, `/reports`, `/benchmarks/q2-2026`, `/linkedin-creator-marketplace`, `/case-studies/blogseo`, `/free-tools/*`, `/for/*`, `/blog`, `/blog/*` (60 posts), FR comparison page | Pixel-level port of every page (rendered markup + the production stylesheets + fonts + assets). Nav, mobile menu, Resources dropdown and FAQ accordions are interactive. |
| Public creator cards | `/creators/[slug]` | Data-driven template. Creators are a **fictional** dataset (`src/data/creators.ts`) plus every creator who signs up here. |
| Auth | `/login`, `/login/forgot-password`, `/register`, `/register?role=saas`, `/register?role=influencer` | E-mail + password with 6-digit codes delivered by e-mail, password recovery, sessions, and Google / LinkedIn sign-in (OpenID Connect) that links to existing accounts by e-mail or creates a new one after the role choice. |
| Brand onboarding | 3 steps | Website analysis → value prop & 3 ICPs review → AI matching → first campaign brief is generated. |
| Creator onboarding | 4 steps + optional | Public LinkedIn URL import → country & industries → price & bundles → professional info → card reveal → guided tour. |
| Brand workspace | `/brand#…` | Overview, Creators (Nao AI matching + marketplace with search/sort/filters/shortlist/bulk invite), creator profile modal, booking & negotiation, Campaigns (list, create with AI / from link / with the team, detail with collaborations, brief editor, shortlist, analytics), Collaborations, Results (analytics, leads, posts), Messages (NaanoBot + booking threads), Billing (top-ups, invoices), Settings (profile, audience/ICP, team), Integrations (MCP, pixel). |
| Creator workspace | `/creator#…` | Overview, My card (editor + live card), Opportunities (apply to open brand campaigns), Collaborations (accept / decline / submit draft / publish), Analytics, Community, Earnings (payout methods, withdrawals), Affiliate program, Messages, Integrations, Settings. |

The two workspaces talk to each other: a creator who applies to a brand campaign shows up in the brand's collaborations, and a brand's booking of a registered creator lands in that creator's inbox.

## Site assistant

Every public page carries the prompt bar at the bottom of the screen (`src/components/site/ChatWidget.tsx`, styles in `src/styles/chat.css`). It posts to `/api/chat`, which answers with Gemini or Claude grounded in the public `llms.txt` and `pricing.md` documents (`src/data/knowledge.ts`), and falls back to canned FAQ answers when no AI key is configured. The chevron above the bar minimises it to a bubble in the corner; the conversation is kept per tab in `sessionStorage`.

## Moving the code to a new repository

The project has no ties to a particular GitHub repository: nothing in the code, the workflow or the Vercel config names one. To publish it elsewhere:

1. Create an empty repository on GitHub (no README, no .gitignore).
2. Push the `export` branch as its `main` (a single commit authored by the repository owner):
   ```bash
   git push https://github.com/<you>/<new-repo>.git export:main
   ```
   or keep the full history with `git push https://github.com/<you>/<new-repo>.git main`.
3. In the new repository add the three Actions secrets listed below, and in Vercel connect the project to the new repository (Project → Settings → Git). The next push to `main` deploys.

## Deploy (Vercel via GitHub Actions)

Every push to `main` runs `.github/workflows/deploy.yml`: type-check → `vercel build` → `vercel deploy --prod`.

Live deployment: https://nano-clone-chi.vercel.app

1. **Database** — Vercel's filesystem is ephemeral (without Turso the app falls back to a throw-away SQLite file in `/tmp`, so accounts vanish between deploys). Either accept the Turso marketplace terms and run `vercel integration add turso -e production`, or create a Turso database yourself: `turso db create naano`, then `turso db show naano --url` and `turso db tokens create naano`.
2. **Vercel project** — run `vercel link` once locally (or create the project in the dashboard). Copy `orgId` and `projectId` from `.vercel/project.json`.
3. **GitHub secrets** (repo → Settings → Secrets and variables → Actions): `VERCEL_TOKEN` (https://vercel.com/account/tokens), `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
4. **Vercel environment variables** (project → Settings → Environment Variables, Production): `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `APP_URL=https://<your-domain>`, plus the AI, SMTP and OAuth variables from `.env.example`. Register `https://<your-domain>/api/auth/oauth/callback` with Google and LinkedIn.
5. Push to `main`.

## Stack

Next.js 15 (App Router, Turbopack) · React 19 · TypeScript · libSQL / Turso (`@libsql/client`, SQLite locally) · Google Gemini / Anthropic Claude (optional) · nodemailer / Resend · Iconify (offline icon sets).

`src/generated/` holds the ported page markup (one component per public page) and the extracted chrome (navigation / footers). `src/styles/vendor/` and `public/vendor/app/` hold the production stylesheets so the rendering matches the original to the pixel; `public/lp/` holds the original imagery.

## Notes

* The marketplace listing is fictional on purpose: the live product lists real people. Names, stats and posts in `src/data/creators.ts` are generated.
* Payments (Stripe), the public-LinkedIn scraper and the pixel are simulated locally; social sign-in and e-mail use real providers when configured; the UI, states and data model are complete so real providers can be plugged in behind the existing API routes (`src/app/api/*`).
