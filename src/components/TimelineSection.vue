<template>
  <section class="px-6 pb-6 print:px-0 print:pb-0">
    <h3 class="mb-3 text-base font-semibold tracking-tight">{{ props.title }}</h3>

    <div
      class="border-l border-dashed border-neutral-300 dark:border-neutral-700 pl-4 print:border-neutral-400"
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
import UiTimelineItem from './ui/UiTimelineItem.vue'
import type { Locale } from '@/content'
import type { TExperience } from '@/content/types'

const props = defineProps<{
  title: string
  items: TExperience[]
  locale: Locale
}>()
</script>
