<template>
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
  <UiButton :label="props.actions.exportPdf" icon="download" is-dark @click="printPage" />
</template>

<script setup lang="ts">
import UiButton from './ui/UiButton.vue'
import { useTheme } from '@/composables/useTheme'
import { useLocale } from '@/composables/useLocale'
import type { TContent } from '@/content/types'

const props = defineProps<{
  actions: TContent['actions']
}>()

const { isDark, toggle } = useTheme()
const { locale, toggle: toggleLocale } = useLocale()

const printPage = (): void => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>
