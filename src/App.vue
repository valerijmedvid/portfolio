<template>
  <main class="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900">
    <div class="mx-auto max-w-5xl px-6 py-10 print:p-0">
      <section
        class="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-950/60 backdrop-blur shadow-sm print:shadow-none print:border-0 print:rounded-none"
      >
        <HeroHeader />

        <!-- META STRIP -->
        <div class="px-6 pb-6 print:px-0">
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div
              class="rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4"
            >
              <p class="text-xs uppercase tracking-wide text-neutral-500">Core Skills</p>
              <div class="mt-2 flex flex-wrap gap-2">
                <Tag>Vue 3</Tag>
                <Tag>TypeScript</Tag>
                <Tag>Nuxt</Tag>
                <Tag>Tailwind</Tag>
                <Tag>Pinia</Tag>
              </div>
            </div>
            <div
              class="rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4"
            >
              <p class="text-xs uppercase tracking-wide text-neutral-500">Toolbox</p>
              <div class="mt-2 flex flex-wrap gap-2">
                <Tag>Supabase</Tag>
                <Tag>Node</Tag>
                <Tag>Docker</Tag>
                <Tag>Git</Tag>
                <Tag>CI/CD</Tag>
              </div>
            </div>
            <div
              class="rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4"
            >
              <p class="text-xs uppercase tracking-wide text-neutral-500">Focus</p>
              <div class="mt-2 flex flex-wrap gap-2">
                <Tag>Clean UI</Tag>
                <Tag>DX</Tag>
                <Tag>Performance</Tag>
                <Tag>Testing</Tag>
              </div>
            </div>
          </div>
        </div>

        <!-- EXPERIENCE -->
        <section class="px-6 pb-6 print:px-0">
          <h3 class="mb-3 text-base font-semibold tracking-tight">Experience</h3>
          <div
            class="relative border-l border-dashed border-neutral-300 dark:border-neutral-700 pl-4"
          >
            <TimelineItem
              title="Frontend Developer"
              company="Komerční banka"
              period="2024 – now"
              :bullets="[
                'Vue 3 + TypeScript internal web apps',
                'API integration, form-heavy UIs, access control',
                'Code quality: ESLint, unit tests, CI pipelines',
              ]"
            />
            <div class="my-3" />
            <TimelineItem
              title="Frontend Developer"
              company="Košík.cz"
              period="2022 – 2023"
              :bullets="[
                'Refactor to Composition API, performance improvements',
                'Design system tokens, reusable components',
                'Collaboration in cross‑functional squads',
              ]"
            />
            <div class="my-3" />
            <TimelineItem
              title="Software Engineer"
              company="Avast"
              period="2019 – 2022"
              :bullets="[
                'Internal dashboards (Vue, Python, SQL)',
                'Dockerized environments, automated deployments',
              ]"
            />
            <div class="my-3" />
            <TimelineItem
              title="Senior Threat Operations Analyst"
              company="Avast"
              period="2012 – 2019"
              :bullets="['Data analysis, scripting (Python, SQL)']"
            />
          </div>
        </section>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import HeroHeader from './components/HeroHeader.vue'
import TimelineItem from './components/TimelineItem.vue'
</script>
