<template>
  <main
    class="relative min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 print:bg-white print:text-black"
  >
    <div
      aria-hidden="true"
      class="bg-dot-grid pointer-events-none absolute inset-0 text-neutral-900 dark:text-white print:hidden"
    />

    <div class="relative mx-auto max-w-4xl px-3 py-6 sm:px-6 sm:py-14 print:p-0 print:max-w-none">
      <TerminalWindow :title="`${terminalUser}@portfolio: ~`">
        <template #actions>
          <HeaderActions :actions="content.actions" />
        </template>

        <HeroHeader
          :profile="content.profile"
          :actions="content.actions"
          :years-in-it="yearsInIt"
        />

        <AboutSection
          :title="content.headings.about"
          :summary="content.profile.summary(yearsInIt)"
        />

        <SkillList
          :title="content.headings.skills"
          :print-title="content.headings.skillsPrint"
          :skill-groups="content.skillGroups"
        />

        <TimelineSection
          command="git log --graph"
          :title="content.headings.experience"
          :items="content.experience"
          :locale="locale"
        />

        <TimelineSection
          v-if="educationItems.length"
          command="cat education.md"
          :title="content.headings.education"
          :items="educationItems"
          :locale="locale"
        />

        <ContactSection :title="content.headings.contact" :cta="content.contactCta" />
      </TerminalWindow>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TerminalWindow from './components/TerminalWindow.vue'
import HeaderActions from './components/HeaderActions.vue'
import HeroHeader from './components/HeroHeader.vue'
import AboutSection from './components/AboutSection.vue'
import SkillList from './components/SkillList.vue'
import TimelineSection from './components/TimelineSection.vue'
import ContactSection from './components/ContactSection.vue'
import { useTheme } from './composables/useTheme'
import { useLocale } from './composables/useLocale'
import type { TExperience } from './content/types'
import { earliest, yearsSince } from './utils/period'

useTheme()
const { locale, content } = useLocale()

const terminalUser = 'valerij'

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
