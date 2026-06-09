<template>
  <main
    class="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-100 print:bg-white print:text-black"
  >
    <div class="mx-auto max-w-5xl px-6 py-10 print:p-0 print:max-w-none">
      <section
        class="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-950/60 backdrop-blur shadow-sm print:bg-white print:shadow-none print:border-0 print:rounded-none print:backdrop-blur-none"
      >
        <HeroHeader />

        <SkillList :skillList />

        <ExperienceHistory :experienceList />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import HeroHeader from './components/HeroHeader.vue'
import SkillList from './components/SkillList.vue'
import ExperienceHistory from './components/ExperienceHistory.vue'
import type { TExperience } from './components/ui/UiTimelineItem.vue'
import { useTheme } from './composables/useTheme'

useTheme()

const skillList = [
  'Vue.js',
  'TypeScript',
  'Nuxt',
  'Tailwind',
  'REST',
  'Pinia',
  'SQL',
  'Problem Solving',
  'Agile',
  'Supabase',
  'Node',
  'Docker',
  'Git',
  'CI/CD',
  'Console.log Debugging Master',
  'Python',
  'Clean Code',
  'UX / DX',
  'Testing',
  'Comunication',
  'Coffee-Driven Development ☕',
]

const experienceList: TExperience[] = [
  {
    company: 'LutherOne',
    roles: [
      {
        title: 'Senior Frontend Developer',
        from: '2026-01',
        to: 'present',
        bullets: [
          'Building employee-experience and people-analytics platform in Vue 3 + TypeScript',
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
]
</script>
