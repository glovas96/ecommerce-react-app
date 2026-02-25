## E-commerce React App

Local online store built with React, Vite, and Firebase. Demonstrates product catalog, product pages, checkout flow, authentication, and protected routes for signed-in users.

## Features

- Firebase authentication and authorization with protected-route gating.
- Product catalog, cards, cart, and checkout synced via Redux.
- Order management: list and details per user.
- Material UI integration covering navigation and base styling.

## Stack

- React 18 + Vite
- Redux Toolkit for global state, React Router v7 for routing
- Firebase Auth + Firestore (server logic lives in `entities`)
- React Hook Form + Zod for form validation
- Material UI + Emotion
- Vitest + Testing Library for tests
- Prettier and ESLint with plugins applied

## Scripts

- `npm run dev` – launcher with HMR.
- `npm run build` – production build output to `dist`.
- `npm run preview` – serve a static preview from `dist`.
- `npm run lint` / `npm run lint:fix` – run ESLint checks and autofix.
- `npm run format` – apply Prettier to source files.
- `npm run test` / `npm run test:watch` – run Vitest.
- `npm run typecheck` – run `tsc` type verification.
- `npm run deploy` – publish `dist` folder to `gh-pages`.

## Testing and Quality

- ESLint and Prettier are preconfigured; run `npm run lint` and `npm run format`.
- Types are verified with `npm run typecheck`.

## Project Structure

- `src/shared` – shared configs, routing, and UI primitives.
- `src/entities` – isolated domain models, services, and Firebase interactions.
- `src/features` – glue hooks and UI blocks for user scenarios.
- `src/widgets` – reusable visual blocks (buttons, navigation, loaders).
- `src/pages` – application routes and pages that assemble existing components.
