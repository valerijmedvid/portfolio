<template>
  <main
    class="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-100 print:bg-white print:text-black"
  >
    <div class="mx-auto max-w-5xl px-6 py-10 print:p-0 print:max-w-none">
      <section
        class="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-950/60 backdrop-blur shadow-sm print:bg-white print:shadow-none print:border-0 print:rounded-none print:backdrop-blur-none"
      >
        <HeroHeader
          :profile="content.profile"
          :actions="content.actions"
          :years-in-it="yearsInIt"
        />

        <AboutSection :summary="content.profile.summary(yearsInIt)" />

        <SkillList :title="content.headings.skills" :skill-groups="content.skillGroups" />

        <TimelineSection
          :title="content.headings.experience"
          :items="content.experience"
          :locale="locale"
        />

        <TimelineSection
          v-if="educationItems.length"
          :title="content.headings.education"
          :items="educationItems"
          :locale="locale"
        />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import HeroHeader from './components/HeroHeader.vue'
import AboutSection from './components/AboutSection.vue'
import SkillList from './components/SkillList.vue'
import TimelineSection from './components/TimelineSection.vue'
import { useTheme } from './composables/useTheme'
import { useLocale } from './composables/useLocale'
import type { TExperience } from './content/types'
import { earliest, yearsSince } from './utils/period'

useTheme()
const { locale, content } = useLocale()

const yearsInIt = computed((): number =>
  yearsSince(earliest(content.value.experience.flatMap((e) => e.roles.map((r) => r.from)))),
)

// Education reuses the experience timeline: school ~ company, field ~ role
const educationItems = computed((): TExperience[] =>
  content.value.education.map((e) => ({
    company: e.school,
    roles: [{ title: e.field, from: e.from, to: e.to, bullets: e.bullets }],
  })),
)
</script>
