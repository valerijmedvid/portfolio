<template>
  <!-- Experience section -->
  <section class="px-6 pb-6 print:px-0 print:pb-0">
    <h3 class="mb-3 text-base font-semibold tracking-tight">Experience</h3>

    <div
      class="border-l border-dashed border-neutral-300 dark:border-neutral-700 pl-4 print:border-neutral-400"
    >
      <UiTimelineItem
        v-for="(item, index) in props.experienceList"
        :key="item.company"
        :experience="item"
        :index="index"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import UiTimelineItem from './ui/UiTimelineItem.vue'
import type { TExperience } from './ui/UiTimelineItem.vue'

const props = defineProps<{
  experienceList: TExperience[]
}>()
</script>
