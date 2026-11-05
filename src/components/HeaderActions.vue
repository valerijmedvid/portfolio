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
  <!-- Production: download the PDF pre-rendered at build time (scripts/generate-cv-pdf.ts).
       Dev server has no PDFs, so it falls back to the browser's print dialog. -->
  <UiButton
    v-if="pdfHref"
    :label="props.actions.exportPdf"
    icon="download"
    is-dark
    :href="pdfHref"
    :download="pdfFileName"
  />
  <UiButton v-else :label="props.actions.exportPdf" icon="download" is-dark @click="printPage" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UiButton from './ui/UiButton.vue'
import { useTheme } from '@/composables/useTheme'
import { useLocale } from '@/composables/useLocale'
import type { TContent } from '@/content/types'

const props = defineProps<{
  actions: TContent['actions']
}>()

const { isDark, toggle } = useTheme()
const { locale, toggle: toggleLocale } = useLocale()

const pdfHref = computed((): string => (import.meta.env.DEV ? '' : `/cv-${locale.value}.pdf`))
const pdfFileName = computed(
  (): string => `Valerij-Medvid-CV-${locale.value === 'cs' ? 'CZ' : 'EN'}.pdf`,
)

const printPage = (): void => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>
