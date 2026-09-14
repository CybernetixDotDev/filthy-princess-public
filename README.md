# Filthy Princess — Public

The standalone public-facing marketing application for Filthy Princess. It is a mobile-first editorial experience that introduces Cally, the Filthy Princess experience, retreats, events, the Inner Sanctum, and currently available products.

This repository has one job: persuade. Identity, membership, and operations belong elsewhere.

---

## Architecture

Filthy Princess is divided into three distinct surfaces:

### Public

This repository is responsible for:

- Public marketing and storytelling
- Store catalogue presentation
- Public Events presentation
- The Inner Sanctum teaser
- Public, read-only Supabase data

It does not contain authentication, entitlement management, administration, a booking engine, database writes, or private member content.

### Inner Sanctum

The Inner Sanctum is a separate private member application responsible for identity, authentication, entitlements, member content, progression, tasks, rewards, private interactions, and invitations. None of that functionality is implemented here; this application contains only its public teaser.

### Admin

Admin is a separate operational application for managing members, Store catalogue data, events, invitations, entitlements, payments and orders, retreat operations, and other private administration. It is not part of this repository.

> **Public = persuade · Inner Sanctum = belong · Admin = operate**

## Tech Stack

Versions below reflect the current `package.json`:

- Next.js 16.3.5 with the App Router
- React and React DOM 19.2.8
- TypeScript 5
- Tailwind CSS 4
- Supabase JS 2.116.0
- Motion 13.2.0
- Three.js 0.186.0
- React Three Fiber 9.7.0
- Drei 10.7.8
- Lucide React 1.45.0

Additional UI utilities are installed; the list above describes the principal technologies and does not imply that every package is used on every page.

## Public Routes

| Route | Purpose |
| --- | --- |
| `/` | Redirects to `/home`. |
| `/home` | Opens the main public narrative. |
| `/cally` | Introduces Cally. |
| `/experience` | Presents the Cally experience. |
| `/retreat` | Introduces the retreat concept and invitation model. |
| `/store` | Displays active products read from Supabase. |
| `/events` | Displays qualifying publicly invitable events from Supabase. |
| `/inner-sanctum` | Teases the separate private member experience. |
| `/sitemap.xml` | Publishes the marketing-route sitemap. |
| `/robots.txt` | Publishes crawler rules and the sitemap location. |

`/events` always exists as a route. Its navigation link is shown only when at least one qualifying publicly invitable event is available; otherwise the route remains accessible and renders its appropriate empty or unavailable state.

## Public Data / Supabase

Supabase supplies public, read-only data through two current sources:

### `store_products`

Used by `/store`. The query presents only rows whose `status` is `active`, ordered by catalogue sort order and then by name and ID.

### `retreat_events`

Used by `/events` and by Events navigation visibility. A publicly invitable event must satisfy all of the following:

```text
status = published
invitation_only = true
interest_enabled = true
available_places > 0
end_date >= current Africa/Johannesburg business date
```

The same canonical query controls both the Events navigation link and the `/events` listing.

Reads use the Supabase publishable key and remain constrained by database grants and Row Level Security (RLS). **Do not use a Supabase service-role key or secret key in this application.** The public application performs no database writes.

## Environment Variables

Create `.env.local` from `.env.example` and configure:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Do not commit real credentials. The publishable key is intended for public/client-safe access and is not a secret, but authorization must still be enforced by database grants and RLS.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available project commands:

```bash
npm run build
npm run start
npm run lint
```

`npm run start` serves a completed production build. This repository currently has no test script.

## Project Structure

```text
app/
├── (marketing)/       Public marketing pages and their shared layout
├── layout.tsx         Root document layout and metadata
├── page.tsx           Root redirect to /home
├── robots.ts          Crawler rules
└── sitemap.ts         Public sitemap
components/
├── cinematic/         Cinematic and Three.js-backed presentation scenes
├── editorial/         Shared editorial primitives and reveal behavior
├── navigation/        Public site navigation
├── store/             Store-specific presentation components
└── ui/                General UI primitives
lib/
├── config/            Local application configuration helpers
└── supabase/          Server-only public data boundary
public/                Static images, video, and public product assets
scripts/               Repository command wrappers
```

## Supabase Boundary

The public data layer is intentionally narrow:

- `lib/supabase/public.ts` creates a server-only Supabase client with auth refresh, URL session detection, and session persistence disabled.
- `lib/supabase/store.ts` reads active public Store products.
- `lib/supabase/events.ts` defines the Johannesburg business date and reads qualifying public events.
- `lib/supabase/types.ts` contains the minimal types exposed to the public application.

Both data queries use React request memoization and Next.js data caching with a 180-second revalidation period. Failures are caught at the boundary, logged with sanitized messages, and returned as explicit unavailable states. These modules do not establish user sessions or perform writes.

## Store

`/store` renders the current active `store_products` inventory and supports zero, one, or multiple products. Prices and currencies come from each Supabase product row; inventory is live data and is not hardcoded in this documentation.

Public product images are accepted from `/assets/...` paths. Missing, invalid, or failed images use the local visual fallback.

There is currently no checkout or payment implementation in this repository.

## Events

`/events` renders the current qualifying `retreat_events` rows from Supabase. The same publication state controls whether Events appears in public navigation. Event expiry is evaluated against the `Africa/Johannesburg` business date.

This application does not create or manage events and does not implement event booking or mutation.

## Design Philosophy

The application is mobile-first, editorial, image-led, and deliberately high-emotion with restrained copy. Its visual language combines editorial display type, loud sans-serif accents, and handwritten annotations. Pages are composed as narrative chapters rather than conventional SaaS screens, so visual complexity should remain intentional.

## Development Principles

- Start with mobile layouts.
- Keep public data read-only.
- Treat Supabase database state as the source of truth for Store and Events.
- Do not duplicate live inventory or events as mocks.
- Do not introduce authentication into the public application.
- Do not introduce service-role credentials.
- Do not invent checkout or booking behavior.
- Keep private and member functionality outside this repository.
- Preserve clear Server and Client Component boundaries.
- Prefer narrow changes over broad architectural abstractions.

## Deployment Notes

Before deploying:

- Configure the production Supabase environment variables.
- Ensure production does **not** use `NODE_TLS_REJECT_UNAUTHORIZED=0`.
- Run `npm run build`.
- Verify public Supabase reads and RLS behavior.
- Verify Store inventory and currency display.
- Verify Events listing and navigation visibility in both populated and empty states.
- Verify mobile layouts on representative viewport sizes.

Deployment is intentionally provider-neutral; no provider-specific deployment configuration is present in the repository.

## Status

This is the actively developed public marketing application for Filthy Princess. Its scope is the Public surface only.
