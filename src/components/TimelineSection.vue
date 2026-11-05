<template>
  <section class="mb-12 print:mb-3">
    <UiSectionHeading :command="props.command" :title="props.title" />

    <div
      class="ml-1.5 border-l-2 border-neutral-200 pl-5 dark:border-neutral-800 print:ml-1 print:border-l print:border-neutral-300 print:pl-4"
    >
      <UiTimelineItem
        v-for="(item, index) in props.items"
        :key="item.company"
        :experience="item"
        :index="index"
        :locale="props.locale"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import UiSectionHeading from './ui/UiSectionHeading.vue'
import UiTimelineItem from './ui/UiTimelineItem.vue'
import type { Locale } from '@/content'
import type { TExperience } from '@/content/types'

const props = defineProps<{
  command: string
  title: string
  items: TExperience[]
  locale: Locale
}>()
</script>
