<template>
  <section class="mb-12 print:mb-3">
    <UiSectionHeading :command="props.command" :title="props.title" />

    <UiGitLog :items="props.items" :locale="props.locale" />
  </section>
</template>

<script setup lang="ts">
import UiSectionHeading from './ui/UiSectionHeading.vue'
import UiGitLog from './ui/UiGitLog.vue'
import type { Locale } from '@/content'
import type { TExperience } from '@/content/types'

const props = defineProps<{
  command: string
  title: string
  items: TExperience[]
  locale: Locale
}>()
</script>
