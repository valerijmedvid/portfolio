<template>
  <main
    class="relative min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 print:bg-white print:text-black"
  >
    <div
      aria-hidden="true"
      class="bg-dot-grid pointer-events-none absolute inset-0 text-neutral-900 dark:text-white print:hidden"
    />

    <!-- Minimised: business card centred on the screen (never printed) -->
    <Transition name="window">
      <div
        v-if="windowMode === 'card'"
        class="fixed inset-0 z-10 flex items-center justify-center p-4 print:hidden"
      >
        <BusinessCard
          :role="content.profile.role"
          :terminal-user="terminalUser"
          :window-labels="content.window"
          @close="reload"
          @restore="windowMode = 'normal'"
          @maximize="toggleFullscreen"
        />
      </div>
    </Transition>

    <!-- The CV stays in the DOM while minimised so printing always outputs it.
         Re-showing it restarts the window-in animation. -->
    <div
      :class="[
        windowMode === 'fullscreen' ? 'max-w-none' : 'max-w-4xl px-3 py-6 sm:px-6 sm:py-14',
        windowMode === 'card' ? 'hidden print:block' : '',
      ]"
      class="relative mx-auto motion-safe:animate-window-in print:max-w-none print:animate-none print:p-0"
    >
      <TerminalWindow
        :title="`${terminalUser}@portfolio: ~`"
        :labels="{
          close: content.window.reload,
          minimize: content.window.card,
          maximize: content.window.fullscreen,
        }"
        :expanded="windowMode === 'fullscreen'"
        @close="reload"
        @minimize="minimize"
        @maximize="toggleFullscreen"
      >
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

        <ContactSection
          :title="content.headings.contact"
          :cta="content.contactCta"
          :years-in-it="yearsInIt"
        />
      </TerminalWindow>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import TerminalWindow from './components/TerminalWindow.vue'
import BusinessCard from './components/BusinessCard.vue'
import HeaderActions from './components/HeaderActions.vue'
import HeroHeader from './components/HeroHeader.vue'
import AboutSection from './components/AboutSection.vue'
import SkillList from './components/SkillList.vue'
import TimelineSection from './components/TimelineSection.vue'
import ContactSection from './components/ContactSection.vue'
import { useTheme } from './composables/useTheme'
import { useLocale } from './composables/useLocale'
import type { TExperience } from './content/types'
import { printDevGreeting } from './utils/devGreeting'
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

// --- Traffic-light easter eggs ---------------------------------------------

type TWindowMode = 'normal' | 'fullscreen' | 'card'
const windowMode = ref<TWindowMode>('normal')

const reload = (): void => window.location.reload()

const exitBrowserFullscreen = (): void => {
  if (document.fullscreenElement) void document.exitFullscreen()
}

const minimize = (): void => {
  exitBrowserFullscreen()
  windowMode.value = 'card'
  window.scrollTo({ top: 0 })
}

const toggleFullscreen = (): void => {
  if (windowMode.value === 'fullscreen') {
    windowMode.value = 'normal'
    exitBrowserFullscreen()
    return
  }
  windowMode.value = 'fullscreen'
  // Real fullscreen where supported (not on iPhone); the layout expands either way
  document.documentElement.requestFullscreen?.().catch(() => undefined)
}

// Esc leaves browser fullscreen — fall back to the normal window too
const onFullscreenChange = (): void => {
  if (!document.fullscreenElement && windowMode.value === 'fullscreen') windowMode.value = 'normal'
}

onMounted(() => {
  document.addEventListener('fullscreenchange', onFullscreenChange)
  printDevGreeting()
})

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', onFullscreenChange)
})
</script>
