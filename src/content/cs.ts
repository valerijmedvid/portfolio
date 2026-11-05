import type { TContent } from './types'

export const cs: TContent = {
  profile: {
    role: 'Frontend Developer · Vue & TypeScript',
    taglines: [
      'Frontend Developer · Vue & TypeScript',
      'Stavím vývojové workflow s AI',
      'Agentní flow s Claude a MCP',
      'Od nápadu až do produkce',
      'Čistý kód · skvělé DX',
    ],
    location: 'Česko',
    languages: 'čeština · angličtina',
    availability: 'Otevřený zajímavým projektům',
    yearsInIt: (years) => `${years}+ let v IT`,
    summary: (years) =>
      `Frontend developer se specializací na Vue a TypeScript a s více než ${years} lety v IT — zaměřuji se na vývoj aplikací od nápadu až do produkce. Jsem od přírody zvědavý, pořád se učím a zdokonaluji své řemeslo. Rád si hraju s IoT a chytrou domácností a mimo obrazovku mě najdete u sportu, na cestách nebo na motorce.`,
  },
  headings: {
    about: 'O mně',
    skills: 'Buzzwordy, které fakt umím',
    experience: 'Pracovní zkušenosti',
    education: 'Vzdělání',
    contact: 'Kontakt',
  },
  contactCta: 'Máte zajímavý projekt? Pojďme spolu něco postavit.',
  actions: {
    email: 'E-mail',
    exportPdf: 'Stáhnout PDF',
    switchToLight: 'Přepnout na světlý režim',
    switchToDark: 'Přepnout na tmavý režim',
    otherLanguage: 'EN',
    switchLanguage: 'Switch to English',
  },
  skillGroups: [
    {
      label: 'Frontend',
      skills: [
        { label: 'Vue.js' },
        { label: 'TypeScript' },
        { label: 'Nuxt' },
        { label: 'Tailwind' },
        { label: 'Pinia' },
      ],
    },
    {
      label: 'Backend & data',
      skills: [
        { label: 'REST' },
        { label: 'Node' },
        { label: 'SQL' },
        { label: 'Supabase' },
        { label: 'Python' },
      ],
    },
    {
      label: 'DevOps & kvalita',
      skills: [
        { label: 'Docker' },
        { label: 'CI/CD' },
        { label: 'Git' },
        { label: 'Testování' },
        { label: 'Clean Code' },
      ],
    },
    {
      label: 'Jak pracuji',
      skills: [
        { label: 'UX / DX' },
        { label: 'Agile' },
        { label: 'Komunikace' },
        { label: 'Řešení problémů' },
        { label: 'Mistr console.log debuggingu', printHidden: true },
        { label: 'Coffee-Driven Development ☕', printHidden: true },
      ],
    },
  ],
  experience: [
    {
      company: 'LutherOne',
      roles: [
        {
          title: 'Senior Frontend Developer',
          from: '2026-01',
          to: 'present',
          bullets: [
            'Vývoj platformy pro employee experience a people analytics ve Vue 3 + TypeScript',
            'Utvářím komponentové vzory, kvalitu kódu a DX napříč frontendem',
            'Architektonická rozhodnutí, code review, spolupráce napříč týmy',
          ],
        },
      ],
    },
    {
      company: 'Komerční banka — Modrá pyramida (NOBY)',
      roles: [
        {
          title: 'Frontend Developer',
          from: '2024-01',
          to: '2026-03',
          bullets: [
            'Vývoj klientských aplikací pro novou digitální banku NOBY (dceřiná společnost Modrá pyramida)',
            'Finanční UI plná formulářů s přísnými požadavky na přístupnost a řízení oprávnění',
            'Zodpovědnost za kvalitu kódu: ESLint, unit testy, CI pipeline, code review',
          ],
        },
      ],
    },
    {
      company: 'Košík.cz',
      roles: [
        {
          title: 'Frontend Developer',
          from: '2022-06',
          to: '2023-12',
          bullets: [
            'Migrace legacy kódu z Options API na Composition API s měřitelným zrychlením',
            'Podíl na tokenech design systému a knihovně znovupoužitelných komponent',
            'Práce v cross-funkčním týmu s produktem, designem a backendem',
          ],
        },
      ],
    },
    {
      company: 'Avast',
      roles: [
        {
          title: 'Software Engineer',
          from: '2019-03',
          to: '2022-05',
          bullets: [
            'Interní dashboardy a nástroje — Vue.js, Python, SQL, RabbitMQ, gRPC',
            'Dockerizovaná prostředí nasazovaná do Kubernetes přes automatizované CI/CD',
          ],
        },
        {
          title: 'Senior Threat Operations Analyst',
          from: '2017-07',
          to: '2019-03',
          bullets: [
            'Vedení threat-ops procesů; automatizace práce analytiků v Pythonu a JS',
            'Most mezi provozem a vývojem — moje cesta k vývoji na plný úvazek',
          ],
        },
        {
          title: 'Malware Analyst & Operator',
          from: '2014-07',
          to: '2017-07',
          bullets: [
            'Analýza malwaru a release pipeline virových definic',
            'Zpracování dat a automatizace v Pythonu a SQL',
          ],
        },
        {
          title: 'Junior Malware Analyst & Operator',
          from: '2012-10',
          to: '2014-07',
          bullets: ['Analýza PC malwaru, třídění vzorků a reporting'],
        },
      ],
    },
    {
      company: 'APS Czech Republic',
      roles: [
        {
          title: 'IT & Database Specialist',
          from: '2011-10',
          to: '2012-09',
          bullets: ['Správa IT, vývoj a ladění MS SQL, podpora uživatelů'],
        },
      ],
    },
  ],
  // SSŠVT entry is added in phase 4 once the study years are known
  education: [],
}
