# 👨‍💻 Valerij Medviď - Portfolio

[![Deploy](https://github.com/valerijmedvid/portfolio/actions/workflows/main.yaml/badge.svg)](https://github.com/valerijmedvid/portfolio/actions/workflows/main.yaml/badge.svg)

Osobní portfolio - moderní, responzivní a rychlé.

## 🎯 O projektu

Portfolio a CV ve stylu terminálu, postavené na Vue 3 + TypeScript + Tailwind v4.

- **CZ / EN** — přepínač jazyka, výchozí podle prohlížeče
- **Dark mode** — přepínač i podle systému
- **Export PDF** — tisk z prohlížeče, samostatný layout jako klasické jednostránkové CV
- **Zkušenosti jako `git log --graph`**, skills jako `ls`, typewriter pod jménem, flip fotky
- **Easter eggy** — semafor okna (🔴 reload, 🟡 vizitka, 🟢 fullscreen), interaktivní terminál
  (`help`, Tab doplňování), pozdrav v DevTools konzoli

## 🛠️ Tech Stack

- **Framework:** Vue 3 + TypeScript
- **Styling:** Tailwind CSS v4
- **Build Tool:** Vite
- **Ikony:** lucide-vue-next
- **Deployment:** FTP přes GitHub Actions

## 📋 Obsah

Veškerá data a texty jsou v `src/content/` — `cs.ts` a `en.ts` (stejný tvar `TContent`, při změně
upravit oba), kontakty v `contact.ts`. Žádný store ani API. Architektura komponent je popsaná
v `CLAUDE.md`.

Náhledový obrázek pro sdílení (`public/og-image.png`, 1200×630) je statický — při změně role nebo
fotky je potřeba ho vygenerovat znovu.

## 🚀 Spuštění

```bash
# Instalace závislostí
npm install

# Vývoj se live reload
npm run dev

# Build pro produkci (type-check + build)
npm run build

# Preview build
npm run preview
```

## 📝 Kvalita kódu

```bash
# ESLint s auto-fix
npm run lint

# Prettier formátování
npm run format
```

## 🌐 Live

Portfolio je deployováno na FTP serveru přes GitHub Actions CI/CD při push do `main`.
