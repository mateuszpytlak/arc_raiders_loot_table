# ARC Raiders Loot Table

A single-page React application that helps ARC Raiders players decide what to keep, upgrade, or recycle from their loot. The UI organizes every item in the current dataset into practical categories, highlights upgrade paths per workbench, and provides quick access to search, filtering, and compact viewing modes.

## Features

- **Rich loot catalogue** – Items are grouped into "Keep for Quests", "Keep for Projects", "Upgrading Benches", and "Safely Recycle" sections so players can immediately see the recommendation for each drop.
- **Workbench progression planning** – A settings side panel lets you select the current level of every workbench and instantly updates the upgrade requirements that appear in the "Upgrading Benches" section. Levels are persisted in `localStorage` so they survive refreshes.
- **Fast search and smart collapsing** – The global search bar filters the catalogue in real time. When a query is present, irrelevant sections automatically collapse to keep the focus on matching items.
- **Compact vs. normal layouts** – Toggle between the spacious card layout and a condensed mode when you need to scan the list quickly.
- **Privacy-friendly analytics** – Page views are routed through a Google Analytics helper that only fires after consent is granted through a custom cookie banner component.
- **Responsive design** – Tailwind CSS utility classes ensure the layout remains legible from narrow mobile screens to large desktop displays.

## Tech Stack

- [React 19](https://react.dev/) with TypeScript for type-safe UI components
- [Vite 7](https://vitejs.dev/) for development, bundling, and HMR
- [Tailwind CSS 4](https://tailwindcss.com/blog/tailwindcss-v4-alpha) (via the official Vite plugin) for styling
- Custom data modules under `src/data` that describe items, bench levels, and supporting types

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

   Vite prints a local URL (usually `http://localhost:5173`) that you can open in your browser.

3. **Run type checks and linting**

   ```bash
   npm run lint
   ```

4. **Create a production build**

   ```bash
   npm run build
   ```

5. **Preview the production build locally**

   ```bash
   npm run preview
   ```

## Project Structure

```
.
├── public/                 # Static assets served as-is (favicons, manifest, etc.)
├── src/
│   ├── components/         # Reusable UI pieces such as search, settings, footer, cards
│   ├── data/               # Item catalogue and helper utilities for normalising assets
│   ├── lib/                # Cross-cutting helpers (e.g. analytics integration)
│   ├── types/              # Shared TypeScript types for benches and items
│   ├── App.tsx             # Root view that wires search, grouping, and layout controls
│   └── main.tsx            # React entry point mounted by Vite
├── index.html              # HTML shell used by Vite during dev/build
├── package.json            # Scripts and dependencies
└── vite.config.ts          # Vite configuration and Tailwind plugin setup
```

## Data Model Reference

### `Item`

Defined in [`src/data/items.ts`](src/data/items.ts). Each record drives the card UI and includes:

| Field       | Type     | Description |
| ----------- | -------- | ----------- |
| `name`      | `string` | Display name shown to the player. |
| `category`  | `string` | Lore-friendly grouping such as "ARC", "Industrial", or "Nature". |
| `tier`      | `number` | Relative tier used to sort or reason about value. |
| `value`     | `number` | Credit value for recycling. |
| `group`     | union    | One of the four recommendation buckets rendered by the UI. |
| `rarity`    | union    | Indicates how hard the item is to find (common → epic). |
| `image`     | `string` | Optional path to artwork located in `public/images/items`. |
| `quantity`  | `number` | Suggested number to keep for quests or upgrades. |
| `workshop`  | `string` | If present, identifies which bench the item upgrades. |
| `level`     | `number` | Bench level the quantity applies to. |

### `BenchLevels`

Defined in [`src/types/benches.ts`](src/types/benches.ts). Tracks the current progression for:

- `scrappy`
- `gunsmith`
- `medical`
- `explosives`
- `gear`
- `refinery`
- `utility`

Bench levels feed the upgrade requirements rendered in the side panel and in the `UpgradingSection` component.

## Development Notes

- The upgrade lists inside `src/components/ItemSection/UpgradingSection.tsx` derive filtered subsets of the master item dataset. Update the dataset first, then adjust presentation logic if new benches or rarities appear.
- Analytics logic lives in [`src/lib/ga.ts`](src/lib/ga.ts). Replace the placeholder measurement ID or stub implementation to hook the app into your tracking provider.
- Images referenced by items should be placed under `public/images/items/` and follow the slugified naming convention enforced by the `normalize` helper in `src/data/items.ts`.

## License

The dataset and UI were assembled for community use. Adapt and extend it to suit your squad’s needs.
docs/README.md
New
+39-0
# Documentation Overview

This folder stores contributor-facing notes that complement the main project README. Use it to keep design decisions, data maintenance processes, and reference material in one place.

## UI Architecture

The application is a single-page experience composed of the following high-level building blocks:

- **`App.tsx`** – Owns global state such as the search query, compact mode, collapsed item groups, and the persisted bench levels.
- **`SearchBar`** – Collects the player’s query and triggers smart collapsing logic so only relevant groups stay expanded.
- **`ItemsSection`** – Renders each recommendation group, exposes “Expand all/Collapse all” controls, and delegates to either `ItemCard` or `UpgradingSection` depending on the content type.
- **`UpgradingSection`** – Filters upgrade-specific items by the selected bench level and displays them in a grid tuned for material planning.
- **`SidePanel`** – Houses the bench level selectors. Animates into view via CSS transforms and persists updates to `localStorage`.
- **`CookieConsent` & `lib/ga.ts`** – Gate analytics until the player gives consent, then fire a page-view event.
- **`Footer`** – Lists helpful community links.

## Data Maintenance Workflow

1. Update `src/data/items.ts` with new or revised loot entries. Maintain alphabetical order within each group to keep diffs readable.
2. If a new bench is introduced, extend the `BenchLevels` type in `src/types/benches.ts`, update the `SidePanel` configuration, and adjust `UpgradingSection` so it can render the additional category.
3. Add any supporting imagery to `public/images/items/` using the slug format generated by the `normalize` helper.
4. Smoke-test the UI via `npm run dev` to confirm search, grouping, and compact mode still behave as expected.

## Analytics Integration

The `trackPageview` helper in `src/lib/ga.ts` is currently a thin wrapper designed around Google Analytics. Swap in your own measurement ID or replace the implementation if you prefer a different analytics provider. Make sure the consent flow still short-circuits events until the player accepts.

## Accessibility Notes

- Item cards expose semantic headings and paragraphs so screen readers can parse names, rarities, and recommended quantities.
- Buttons throughout the UI use high-contrast color combinations and large hit areas to improve keyboard and touch usability.
- Consider adding focus outlines and ARIA labels if new interactive components are introduced.

## Testing Checklist

- [ ] Search returns expected results for representative item names (e.g., "Battery", "Power Rod").
- [ ] Changing bench levels updates material quantities inside the "Upgrading Benches" section.
- [ ] Compact view toggle collapses spacing without clipping text on narrow screens.
- [ ] Cookie banner appears only once consent is given and the analytics helper is invoked.