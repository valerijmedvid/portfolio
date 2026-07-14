# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio / CV — a single-page Vue 3 + TypeScript + Vite app styled with Tailwind v4. Deployed via GitHub Actions to an FTP host on push to `main` (`.github/workflows/main.yaml`).

**There is no Pinia, no router, and no state management** — all content (skills, experience) is hardcoded as inline arrays in `src/App.vue:28`. Adding a new role or skill means editing those arrays.

## Commands

```bash
npm run dev       # Vite dev server
npm run build     # vue-tsc type-check + vite build (both must pass — type errors block the build)
npm run preview   # preview the production build
npm run lint      # eslint . --fix
npm run format    # prettier write across js/ts/vue/json/css/scss/md
```

There are no tests in this repo.

## Architecture

```
src/
  App.vue                       data lives here (skillList, experienceList) and is passed down as props
  components/
    HeroHeader.vue              header + summary; owns the dark-mode toggle and Export-PDF (window.print) button
    SkillList.vue               renders skill tags
    ExperienceHistory.vue       renders the experience timeline
    ui/                         pure presentational primitives (UiButton, UiIcon, UiTag, UiTimelineItem)
  composables/
    useTheme.ts                 dark-mode state (module-level singleton, see below)
  utils/
    period.ts                   `YearMonth` type + date-range formatting for the timeline
  style.css                     `@import 'tailwindcss'` + `@theme` block (Tailwind v4 syntax)
```

Data flow is one-way and trivial: `App.vue` → feature components (`Hero`, `Skill`, `Experience`) → `ui/` primitives. There is no shared store; the only composable is `useTheme` and the only util is `period.ts`. The project is small enough that you almost certainly don't need to add more.

### Icons

`UiIcon` wraps `lucide-vue-next` behind a string-name map (`src/components/ui/UiIcon.vue:30`). To use a new icon, **import it and add it to `iconMap`** — unknown names silently fall back to `AlertCircle`. Component templates reference icons by lowercase name (e.g. `name="github"`), not by component reference.

### Dark mode

Class-based, not media-query-based: `src/style.css` declares `@custom-variant dark (&:where(.dark, .dark *))`, and `useTheme` (`src/composables/useTheme.ts`) toggles the `dark` class on `<html>`. State is a module-level singleton (mode persisted to `localStorage` under `theme`, defaults to system preference). `HeroHeader` renders the toggle. Print always forces light mode via `beforeprint`/`afterprint` listeners — don't rely on `dark:` styles in print output.

### Print / Export PDF

The "Export PDF" button calls `window.print()`. Layout adapts via Tailwind `print:` variants scattered across components (`print:px-0`, `print:hidden`, `print:flex-row`, etc.). When changing layout, check the print result too — it's a first-class output, not a side effect.

### Path alias

`@/*` → `src/*` is configured in both `vite.config.ts` and `tsconfig.json`. Use it for imports across `src/`.

## TypeScript & lint conventions worth knowing

`tsconfig.json` runs with `strict`, `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`, `noImplicitReturns`. The build will fail on unused symbols, so don't leave imports behind during refactors.

ESLint enforces (see `eslint.config.js`):

- `@typescript-eslint/explicit-function-return-type` — annotate return types on functions, including in `<script setup>`.
- `@typescript-eslint/no-explicit-any` and `no-non-null-assertion` are errors, not warnings.
- `vue/component-name-in-template-casing`: **PascalCase** in templates (`<UiButton>`, not `<ui-button>`).
- `vue/define-macros-order`: `defineProps` before `defineEmits`.
- `vue/define-props-declaration` + `define-emits-declaration`: **type-based** only — `defineProps<{...}>()`, not the runtime-object form.
- `vue/require-default-prop` — every optional prop needs a default (or be marked required).
- `no-console` allows only `warn`/`error`.

Prettier: no semicolons, single quotes, trailing commas, 100-col width, LF line endings.

## Styling

Tailwind v4 — configured via `@tailwindcss/postcss` and the `@theme` block in `src/style.css`. There is a `tailwind.config.js` but core theme tokens (e.g. `--font-sans: 'Work Sans'`) live in CSS, not JS. Dark-mode classes (`dark:*`) appear throughout and are driven by the `.dark` class on `<html>` (see Dark mode above).
