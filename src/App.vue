<template>
  <main class="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900">
    <div class="mx-auto max-w-5xl px-6 py-10 print:p-0">
      <section
        class="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-950/60 backdrop-blur shadow-sm print:shadow-none print:border-0 print:rounded-none"
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

const skillList = [
  {
    categoryName: 'Core Skills',
    skills: ['Vue.js', 'TypeScript', 'Nuxt', 'Tailwind', 'Pinia'],
  },
  {
    categoryName: 'Toolbox',
    skills: ['SQL', 'Supabase', 'Node', 'Docker', 'Git', 'CI/CD', 'Python'],
  },
  {
    categoryName: 'Focus',
    skills: ['Clean Code', 'UX', 'DX', 'Performance', 'Testing', 'Comunication'],
  },
]

const experienceList = [
  {
    title: 'Frontend Developer',
    company: 'Komerční banka',
    period: '2024 – now',
    bullets: [
      'Vue 3 + TypeScript internal web apps',
      'API integration, form-heavy UIs, access control',
      'Code quality: ESLint, unit tests, CI pipelines',
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'Košík.cz',
    period: '2022 – 2023',
    bullets: [
      'Refactor to Composition API, performance improvements',
      'Design system tokens, reusable components',
      'Collaboration in cross‑functional squads',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Avast',
    period: '2019 – 2022',
    bullets: [
      'Internal dashboards (Vue, Python, SQL)',
      'Dockerized environments, automated deployments',
    ],
  },
  {
    title: 'Senior Threat Operations Analyst',
    company: 'Avast',
    period: '2012 – 2019',
    bullets: ['Data analysis, scripting (Python, SQL)'],
  },
  {
    title: 'IT & Database specialist',
    company: 'APS Czech Republic',
    period: '2011 – 2012',
    bullets: ['IT administration', 'database management (MS SQL)', 'user support'],
  },
]
</script>
