# 👨‍💻 Valerij Medviď - Portfolio

[![Deploy](https://github.com/valerijmedvid/portfolio/actions/workflows/main.yaml/badge.svg)](https://github.com/valerijmedvid/portfolio/actions/workflows/main.yaml/badge.svg)

Osobní portfolio - moderní, responzivní a rychlé.

## 🎯 O projektu

Moje portfolio postavené na Vue 3 + TypeScript s Tailwind CSS. Prezentuje mé dovednosti, zkušenosti a projekty. Podporuje dark mode (s přepínačem i podle systému) a export do PDF přes tisk.

## 🛠️ Tech Stack

- **Framework:** Vue 3 + TypeScript
- **Styling:** Tailwind CSS v4
- **Build Tool:** Vite
- **Ikony:** lucide-vue-next
- **Deployment:** FTP přes GitHub Actions

## 📋 Obsah

- **HeroHeader** + **HeaderActions** - Úvodní sekce s kontaktem, přepínačem dark mode a tlačítkem Export PDF
- **AboutSection** - Krátké shrnutí
- **SkillList** - Dovednosti seskupené podle oblastí
- **TimelineSection** - Pracovní zkušenosti a vzdělání (timeline s automatickým výpočtem délky období)

Veškerá data a texty jsou v `src/content/` (`en.ts`, kontakty v `contact.ts`) — žádný store ani API.

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
