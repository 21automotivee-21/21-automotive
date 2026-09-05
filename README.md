# 21 Automotive

Dealership site for 21 Automotive — inventory browsing, export listings, test-drive
booking, a financing calculator, bilingual EN/AR content, and an AI site assistant.

Built with **Next.js 16** (App Router, React 19, TypeScript, Turbopack).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in ANTHROPIC_API_KEY if you want the chat assistant
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Project layout

```
app/
  layout.tsx              Root layout: fonts, navbar, footer, chat widget, i18n provider
  page.tsx                Home
  inventory/              Local inventory grid (search, filters, sort)
  export/                 Germany-sourced export listings + VAT explainer
  vehicle/[id]/           Vehicle detail; prerendered per vehicle
  book-test-drive/        Booking form -> POST /api/bookings
  financing/              Loan calculator + pre-qualification form
  warranty/ service-packages/ accessories/ contact/
  api/
    bookings/             POST create, GET list (x-admin-key)
    finance-applications/ POST create, GET list (x-admin-key)
    chat/                 POST — proxies to the Anthropic API
components/               Navbar, Footer, ChatWidget, cards, shared icons
lib/
  data/                   Vehicle + export inventory data
  i18n/                   Dictionary, settings, provider, server cookie reader
  db.ts                   SQLite (node:sqlite) connection and schema
  validation.ts           Shared request validation
  chat-prompt.ts          Assistant system prompt (embeds live inventory)
data/data.sqlite          Bookings + finance applications
legacy-static/            The previous hand-rolled static site, kept for reference
```

Each page that needs translated copy is split into a server `page.tsx` (which owns
`metadata`) and a client `*View.tsx` (which owns interactivity), since `t()` runs
against the visitor's chosen language on the client.

## Language and currency

Preferences are stored in the `site-lang` and `site-currency` **cookies** rather than
`localStorage`. The root layout reads them on the server, so the first HTML response
is already in the right language, direction (`dir="rtl"` for Arabic), and currency —
no flash of English and no hydration mismatch. Switching either preference updates
React state immediately and writes the cookie for subsequent requests.

Translations live in `lib/i18n/dictionary.ts`; use `const { t, price, tEnum } = useI18n()`
inside client components.

## Environment variables

See `.env.example`. All are optional except `ANTHROPIC_API_KEY`, which the chat
assistant needs — without it `POST /api/chat` returns a clear 503.

| Variable | Purpose |
| --- | --- |
| `ANTHROPIC_API_KEY` | Enables the AI assistant. Server-side only — never exposed to the browser. |
| `CHAT_MODEL` | Overrides the default `claude-haiku-4-5-20251001`. |
| `ADMIN_KEY` | Shared secret for the admin `GET` endpoints. Defaults to `dev-admin-key`. |
| `DATABASE_PATH` | SQLite file location. Defaults to `./data/data.sqlite`. |
| `NEXT_PUBLIC_SITE_URL` | Public origin, used to resolve Open Graph image URLs. |

## Deposits

Test-drive deposits are stored as an *intent*, not a charge — there is no payment
processor wired up. Staff follow up with a real, secure payment link. No card details
are ever collected by this site. See the note in `app/api/bookings/route.ts`.
