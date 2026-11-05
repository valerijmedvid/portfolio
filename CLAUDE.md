# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio / CV — a single-page Vue 3 + TypeScript + Vite app styled with Tailwind v4. Deployed via GitHub Actions to an FTP host on push to `main` (`.github/workflows/main.yaml`).

**There is no Pinia, no router, and no state management** — all content (skills, experience, education, UI copy) is hardcoded per language in `src/content/cs.ts` and `src/content/en.ts` (both typed by `TContent` in `src/content/types.ts` — **edit both** when changing content); language-independent contacts are in `src/content/contact.ts`. Adding a new role or skill means editing those arrays.

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
  App.vue                       picks the content object and passes slices down as props
  content/
    types.ts                    TContent + TSkillGroup / TExperience / TEducation
    cs.ts / en.ts               all copy and data, one file per language
    index.ts                    `Locale` type + `contentByLocale` map
    contact.ts                  name, GitHub, LinkedIn, email parts (language-independent)
  components/
    TerminalWindow.vue          macOS-style terminal window chrome; `#actions` slot in the title bar
    HeaderActions.vue           title-bar buttons: dark-mode toggle, CZ/EN switch, Export-PDF (window.print)
    HeroHeader.vue              `whoami` block: photo, name, meta, contact links (+ print-only contact lines)
    AboutSection.vue            summary paragraph
    SkillList.vue               grouped skills rendered as an `ls skills/` listing
    TimelineSection.vue         titled timeline; used for experience and (mapped) education
    ContactSection.vue          closing CTA with email (screen only)
    AccentSwitcher.vue          TEMPORARY dev-only accent colour picker — remove once a colour is chosen
    ui/                         pure presentational primitives (UiButton, UiIcon, UiTag, UiSectionHeading, UiTimelineItem)
  composables/
    useTheme.ts                 dark-mode state (module-level singleton, see below)
    useEmail.ts                 email address/href assembled after mount (anti-scraper)
    useLocale.ts                cs/en state + active `content` (same singleton pattern; `locale` in localStorage, default from navigator.language, sets `<html lang>`)
  utils/
    period.ts                   `YearMonth` type + date-range formatting for the timeline
  style.css                     `@import 'tailwindcss'` + `@theme` block (Tailwind v4 syntax)
```

Data flow is one-way and trivial: `content/` → `App.vue` → feature components → `ui/` primitives. There is no shared store; the composables are `useTheme` and `useLocale` and the only util is `period.ts` (locale-aware via `Intl`). The project is small enough that you almost certainly don't need to add more.

### Icons

`UiIcon` wraps `lucide-vue-next` behind a string-name map (`src/components/ui/UiIcon.vue:30`). To use a new icon, **import it and add it to `iconMap`** — unknown names silently fall back to `AlertCircle`. Component templates reference icons by lowercase name (e.g. `name="github"`), not by component reference.

### Dark mode

Class-based, not media-query-based: `src/style.css` declares `@custom-variant dark (&:where(.dark, .dark *))`, and `useTheme` (`src/composables/useTheme.ts`) toggles the `dark` class on `<html>`. State is a module-level singleton (mode persisted to `localStorage` under `theme`, defaults to system preference). `HeaderActions` renders the toggle. Print always forces light mode via `beforeprint`/`afterprint` listeners — don't rely on `dark:` styles in print output.

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

Visual concept: developer terminal. Each section starts with a decorative shell prompt (`UiSectionHeading`, `aria-hidden`, hidden in print) followed by a real `<h2>`. One accent colour, exposed as Tailwind `accent` / `accent-contrast` via CSS variables in `src/style.css`. Monospace (`font-mono`, JetBrains Mono) is screen-only flavour — print switches back to `font-sans` so the PDF stays a classic CV.


Tailwind v4 — configured via `@tailwindcss/postcss` and the `@theme` block in `src/style.css`. There is a `tailwind.config.js` but core theme tokens (e.g. `--font-sans: 'Work Sans'`) live in CSS, not JS. Dark-mode classes (`dark:*`) appear throughout and are driven by the `.dark` class on `<html>` (see Dark mode above).
