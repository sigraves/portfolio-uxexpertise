# Project memory

## Product intent & audience

- Portfolio website showcasing case studies with dedicated detail pages.
- Case study routes identified: `/waru`, `/energy`, `/utsa`.
- Audience: visitors reviewing work/case studies; expected to be production-quality.

## Brand personality & voice

- Design goal: beautiful, distinctive, production-worthy — explicitly avoiding generic/cookie-cutter layouts.

## Visual design & UX direction

- Tech stack: Vite + React (JSX), Tailwind CSS for styling, Lucide React for icons.
- Navigation: multi-page SPA with client-side routing (React Router-style routes).
- Case study links originate from the Home page and route to individual detail pages.
- UX expectation: route changes should reset scroll to top (implemented via `ScrollToTop` component in `App.tsx` listening to route changes).

## Decisions, constraints & rationale

- No extra UI/icon packages beyond Tailwind + Lucide React unless explicitly requested.
- ScrollToTop implemented as a dedicated component in `App.tsx` rather than per-page `useEffect` — applies globally to all navigation.
- Fix was verified via build pass before reporting complete.

## Open questions & assumptions

- Portfolio has exactly 3 case studies (waru, energy, utsa); more may be added later.
- Assuming React Router is the routing library in use (inferred from route pattern behavior).
- Content/source for case study pages not yet reviewed; visual design details per page not captured.