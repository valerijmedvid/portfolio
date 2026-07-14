<template>
  <!-- Hero section -->
  <header
    class="flex flex-col items-center gap-4 px-6 pt-8 pb-6 md:flex-row md:items-center md:justify-between print:px-0 print:pt-0 print:pb-4 print:flex-row print:items-center"
  >
    <div
      class="flex flex-col items-center gap-4 md:flex-row md:items-center md:text-left print:flex-row print:items-center print:gap-4"
    >
      <div
        class="size-28 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5 print:size-20 print:ring-0"
      >
        <img :src="ProfilePhoto" alt="Valerij Medviď" class="h-full w-full object-cover" />
      </div>

      <div class="text-center md:text-left print:text-left">
        <h1 class="text-2xl font-bold leading-tight tracking-tight print:text-xl">
          Valerij Medviď
        </h1>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 print:text-neutral-700">
          Frontend Developer · Vue &amp; TypeScript
        </p>

        <div
          class="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-neutral-600 dark:text-neutral-400 md:justify-start print:justify-start print:text-neutral-700"
        >
          <span class="inline-flex items-center gap-1">
            <UiIcon name="mappin" :size="12" />
            Czechia
          </span>

          <span class="inline-flex items-center gap-1">
            <UiIcon name="briefcase" :size="12" />
            {{ props.yearsInIt }}+ yrs in IT
          </span>

          <span class="inline-flex items-center gap-1">
            <UiIcon name="languages" :size="12" />
            Czech · English
          </span>

          <span class="inline-flex items-center gap-1 print:hidden">
            <UiIcon name="calendar" :size="12" />
            Open to interesting projects
          </span>
        </div>

        <!-- Print-only contact lines (replaces the buttons that are hidden in print) -->
        <div
          class="mt-2 hidden flex-col gap-0.5 text-xs text-neutral-700 print:flex print:text-left"
        >
          <span class="inline-flex items-center gap-1.5">
            <UiIcon name="mail" :size="11" />
            {{ emailUser }}&#64;{{ emailDomain }}
          </span>
          <span class="inline-flex items-center gap-1.5">
            <UiIcon name="github" :size="11" />
            github.com/valerijmedvid
          </span>
          <span class="inline-flex items-center gap-1.5">
            <UiIcon name="linkedin" :size="11" />
            linkedin.com/in/valerijmedvid
          </span>
        </div>
      </div>
    </div>

    <!-- Links section -->
    <div class="flex flex-wrap items-center justify-center gap-2 md:justify-end print:hidden">
      <UiButton
        :icon="isDark ? 'sun' : 'moon'"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggle"
      />
      <UiButton v-if="emailHref" label="Email" icon="mail" :href="emailHref" />
      <UiButton label="Github" icon="github" href="https://github.com/valerijmedvid" />
      <UiButton
        label="LinkedIn"
        icon="linkedin"
        href="https://www.linkedin.com/in/valerijmedvid/"
      />
      <UiButton label="Export PDF" icon="download" is-dark @click="printPage" />
    </div>
  </header>

  <!-- Summary section -->
  <div
    class="px-6 pb-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 print:px-0 print:pb-4 print:text-black"
  >
    Frontend developer specializing in Vue and TypeScript, with {{ props.yearsInIt }}+ years in IT —
    focused on building applications end-to-end, from idea to production. I’m naturally curious,
    always learning and refining my craft. I enjoy tinkering with IoT and smart-home projects, and
    outside the screen you’ll find me doing sports, traveling, or riding my motorbike.
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProfilePhoto from '/src/assets/vili.webp'
import UiButton from './ui/UiButton.vue'
import UiIcon from './ui/UiIcon.vue'
import { useTheme } from '@/composables/useTheme'

const props = defineProps<{
  yearsInIt: number
}>()

const { isDark, toggle } = useTheme()

// Email is split and assembled only after mount so the full address never
// appears in the bundle or server-rendered HTML — keeps scrapers away
const emailUser = 'vmedvid'
const emailDomain = 'gmail.com'
const emailHref = ref('')

onMounted(() => {
  emailHref.value = `mailto:${emailUser}@${emailDomain}`
})

const printPage = (): void => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>
