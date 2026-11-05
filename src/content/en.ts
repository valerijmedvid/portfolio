import type { TContent } from './types'

export const en: TContent = {
  profile: {
    role: 'Frontend Developer · Vue & TypeScript',
    taglines: [
      'Frontend Developer · Vue & TypeScript',
      'Building AI-assisted dev workflows',
      'Agentic flows with Claude & MCP',
      'From idea to production',
      'Clean code · Great DX',
    ],
    location: 'Czechia',
    languages: 'Czech · English',
    availability: 'Open to interesting projects',
    yearsInIt: (years) => `${years}+ yrs in IT`,
    summary: (years) =>
      `Frontend developer specializing in Vue and TypeScript, with ${years}+ years in IT — focused on building applications end-to-end, from idea to production. Lately I focus on AI-assisted development — designing agentic workflows that make the whole team faster. I’m naturally curious, always learning and refining my craft. I enjoy tinkering with IoT and smart-home projects, and outside the screen you’ll find me doing sports, traveling, or riding my motorbike.`,
  },
  headings: {
    about: 'About',
    skills: 'Fancy words I can actually use',
    skillsPrint: 'Skills',
    experience: 'Experience',
    education: 'Education',
    contact: 'Contact',
  },
  contactCta: "Got an interesting project? Let's build something together.",
  actions: {
    email: 'Email',
    exportPdf: 'Export PDF',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    otherLanguage: 'CZ',
    switchLanguage: 'CZ · Přepnout do češtiny',
  },
  window: {
    reload: 'Reload page',
    card: 'Shrink to business card',
    restore: 'Back to full portfolio',
    fullscreen: 'Toggle full screen',
    openPortfolio: 'Open portfolio',
  },
  terminal: {
    hint: 'Prefer the keyboard? Type `help`.',
    inputLabel: 'Terminal command',
    help: [
      { command: 'help', description: 'show this help' },
      { command: 'whoami', description: 'who am I' },
      { command: 'about', description: 'short bio' },
      { command: 'skills', description: 'what I work with' },
      { command: 'experience', description: 'career at a glance' },
      { command: 'contact', description: 'how to reach me' },
      { command: 'sudo hire-me', description: '😉' },
      { command: 'lang cs|en', description: 'switch language' },
      { command: 'theme', description: 'toggle dark mode' },
      { command: 'clear', description: 'clear the screen' },
    ],
    notFound: (command) => `command not found: ${command} — try \`help\``,
    hireDenied: 'Permission denied. Did you mean `sudo hire-me`?',
    hireGranted:
      '[sudo] password for recruiter: ********\n✔ Access granted. Opening your mail client…',
    rmRf: 'Nice try 😄 This portfolio is safely backed up in git.',
    exit: 'There is no exit here. Only the red button 🔴',
    coffee: '☕ Brewing… done. Productivity +20 %.',
    langSet: 'Language: English',
    themeSet: (dark) => (dark ? 'Dark mode on 🌙' : 'Light mode on ☀️'),
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
      label: 'AI & Tooling',
      skills: [
        { label: 'Claude Code' },
        { label: 'MCP' },
        { label: 'Agentic workflows' },
        { label: 'Prompt engineering' },
      ],
    },
    {
      label: 'Backend & Data',
      skills: [
        { label: 'REST' },
        { label: 'Node' },
        { label: 'SQL' },
        { label: 'Supabase' },
        { label: 'Python' },
      ],
    },
    {
      label: 'DevOps & Quality',
      skills: [
        { label: 'Docker' },
        { label: 'CI/CD' },
        { label: 'Git' },
        { label: 'Testing' },
        { label: 'Clean Code' },
      ],
    },
    {
      label: 'Ways of working',
      skills: [
        { label: 'UX / DX' },
        { label: 'Agile' },
        { label: 'Communication' },
        { label: 'Problem Solving' },
        { label: 'Console.log Debugging Master', printHidden: true },
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
            'Building employee-experience and people-analytics platform in Vue 3 + TypeScript',
            'Driving AI-assisted development — agentic workflows and LLM tooling woven into the team’s everyday process',
            'Shaping component patterns, code quality and DX across the frontend',
            'Architecture decisions, code reviews, cross-team collaboration',
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
            'Built customer-facing apps for the new digital bank NOBY (subsidiary Modrá pyramida)',
            'Form-heavy financial UIs with strict accessibility and access-control requirements',
            'Owned code quality: ESLint, unit tests, CI pipelines, code reviews',
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
            'Migrated legacy Options API codebase to Composition API with measurable perf wins',
            'Contributed to design-system tokens and reusable component library',
            'Worked in a cross-functional squad alongside product, design and backend',
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
            'Internal dashboards and tooling — Vue.js, Python, SQL, RabbitMQ, gRPC',
            'Dockerized environments deployed to Kubernetes via automated CI/CD',
          ],
        },
        {
          title: 'Senior Threat Operations Analyst',
          from: '2017-07',
          to: '2019-03',
          bullets: [
            'Led threat-ops processes; automated analyst workflows with Python and JS',
            'Bridged operations and engineering — the gateway into full-time development',
          ],
        },
        {
          title: 'Malware Analyst & Operator',
          from: '2014-07',
          to: '2017-07',
          bullets: [
            'Malware analysis and virus-definition release pipeline',
            'Data processing and automation in Python and SQL',
          ],
        },
        {
          title: 'Junior Malware Analyst & Operator',
          from: '2012-10',
          to: '2014-07',
          bullets: ['PC malware analysis, sample triage and reporting'],
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
          bullets: ['IT administration, MS SQL development and tuning, user support'],
        },
      ],
    },
  ],
  education: [
    {
      school: 'SSŠVT — Private Secondary School of Computer Technology, Prague',
      field: 'Information Technology · school-leaving exam (maturita)',
      from: '2006-09',
      to: '2010-06',
      bullets: [
        'Broad IT curriculum from before the field was split into specializations',
        'Network and server administration: Windows and Linux, DNS, DHCP, routing, firewalls',
        'Programming, relational databases, web development and computer graphics',
      ],
    },
  ],
}
