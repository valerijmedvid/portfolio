<template>
  <div class="flex flex-wrap items-center justify-center gap-2 md:justify-end print:hidden">
    <UiButton
      :icon="isDark ? 'sun' : 'moon'"
      :aria-label="isDark ? props.actions.switchToLight : props.actions.switchToDark"
      @click="toggle"
    />
    <UiButton
      :label="props.actions.otherLanguage"
      :aria-label="props.actions.switchLanguage"
      :lang="locale === 'cs' ? 'en' : 'cs'"
      @click="toggleLocale"
    />
    <UiButton
      v-if="props.emailHref"
      :label="props.actions.email"
      icon="mail"
      :href="props.emailHref"
    />
    <UiButton label="Github" icon="github" :href="contact.github.href" />
    <UiButton label="LinkedIn" icon="linkedin" :href="contact.linkedin.href" />
    <UiButton :label="props.actions.exportPdf" icon="download" is-dark @click="printPage" />
  </div>
</template>

<script setup lang="ts">
import UiButton from './ui/UiButton.vue'
import { useTheme } from '@/composables/useTheme'
import { useLocale } from '@/composables/useLocale'
import { contact } from '@/content/contact'
import type { TContent } from '@/content/types'

const props = defineProps<{
  actions: TContent['actions']
  emailHref: string
}>()

const { isDark, toggle } = useTheme()
const { locale, toggle: toggleLocale } = useLocale()

const printPage = (): void => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>
