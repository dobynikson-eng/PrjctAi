# Dobby's Culinary Page 🧦🍳

A small and offline, **bilingual (Bulgarian / English)** recipe website built with **Next.js (App Router)**.
Recipes are organized into categories (Salads, Meat, Fish, Vegan, and Desserts with the subgroups
Ice creams, Creams, Cakes, Healthy), plus a Contacts page. Each recipe shows its required products,
duration, preparation method, and a photo. No database, no runtime network calls — it runs entirely
on your machine.

> Status: **scaffolded**. Built module by module (see below). Run instructions are finalized as the
> modules land.

## Modules

1. **Recipe Data & Schema** (`lib/recipes.js`, `lib/categories.js`, `lib/schema.js`) — the recipe
   dataset, the category tree, and a validator that checks each recipe's required fields and that
   every category has at least one recipe.
2. **Internationalization** (`lib/i18n.js`, `lib/translations.js`, `components/LanguageProvider.jsx`)
   — BG/EN UI labels and bilingual recipe fields, with a language toggle.
3. **Filter & Search** (`lib/filter.js`) — select recipes by category (including nested Desserts
   subgroups) and search by name or ingredient.
4. **UI Components** (`components/`) — recipe card, recipe detail, category nav, search bar, and an
   image component with a graceful placeholder fallback.
5. **App Shell & Pages** (`app/`) — layout, home grid, per-category and per-recipe routes, and the
   Contacts page; configured for offline static export.

## Run from a clean clone

Requires **Node.js ≥ 18**.

```bash
git clone <repo-url>
cd dobbys-culinary-page
npm install        # one-time; needs internet to download Next/React/Vitest/Tailwind
npm test           # run the test suite (Vitest)
npm run dev        # open http://localhost:3000
```

Fully offline static build:

```bash
npm run build      # produces ./out (static HTML)
npx serve out      # serve the exported site (or any static file server)
```

## Recipe photos

Drop real photos into `public/images/` using each recipe's `photo` filename. Until then, the UI
shows a styled placeholder so the site still looks complete.

## Sample run

Run the test suite:

```bash
npm test
```

Expected (Module 1 implemented; later modules show as `todo`):

```
 ✓ test/schema.test.js (11 tests)

 Test Files  1 passed | 3 skipped (4)
      Tests  11 passed | 10 todo (21)
```

The shipped recipe dataset (`lib/recipes.js`) doubles as the sample data: the
`validateDataset` test proves every category has at least one valid bilingual recipe.

## Repository

Repo link: _<paste your GitHub link here>_
