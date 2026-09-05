<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 21 Automotive — project notes

Next.js 16 App Router site for a car dealership. Converted from a hand-rolled static
site; the original lives in `legacy-static/` for reference only and is not built or served.

## Conventions

- **Page structure.** A page that renders translated copy is split in two: `page.tsx`
  is a server component that owns `metadata`, and `<Name>View.tsx` is the `"use client"`
  component that owns the markup and interactivity. Keep new pages to this shape.
- **Translations.** Never hard-code user-facing English in a component. Add the key to
  both `en` and `ar` in `lib/i18n/dictionary.ts`, then read it with
  `const { t } = useI18n()`. Prices go through `price()`, and vehicle enum values
  (category/condition/fuel/transmission) through `tEnum()`.
- **Preferences are cookies, not localStorage** (`site-lang`, `site-currency`), so the
  server can render the right language on the first response. `lib/i18n/server.ts`
  reads them; `I18nProvider` writes them. This is why every route renders dynamically.
- **Styling.** `app/globals.css` is the original stylesheet, largely unchanged. Match
  the existing BEM-ish class names rather than introducing a new styling approach.
  Fonts come from `next/font` and are wired to the `--font-*` tokens.
- **Icons.** Reuse the components in `components/icons.tsx` instead of pasting inline SVG.
- **Images.** `next/image` with `fill`; the containers already set `aspect-ratio`,
  `overflow: hidden`, and `position: relative`.

## Backend

Route handlers in `app/api/` back the forms, storing rows in SQLite through Node's
built-in `node:sqlite` (`lib/db.ts`) — there is no ORM and no extra dependency.
`GET` list endpoints require the `x-admin-key` header.

`POST /api/chat` proxies to the Anthropic API so `ANTHROPIC_API_KEY` never reaches the
browser. Do not move that call client-side.

Deposits are recorded as an intent only — no payment processor is connected, and no
card details are collected anywhere on this site. Keep it that way unless real Stripe
credentials are wired up deliberately.
