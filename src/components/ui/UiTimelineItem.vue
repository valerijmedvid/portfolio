<template>
  <div class="relative mb-4 pl-1 print:mb-0">
    <div
      class="absolute -left-[22px] top-2 size-3 rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
    />

    <div class="mb-1">
      <h4 class="font-semibold text-neutral-900 dark:text-neutral-100">
        {{ props.experience.title }}
      </h4>

      <p class="text-sm text-neutral-600 dark:text-neutral-400">
        {{ props.experience.company }} | {{ props.experience.period }}
      </p>
    </div>

    <ul class="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
      <li
        v-for="(bullet, index) in props.experience.bullets"
        :key="index"
        class="flex items-start gap-2"
      >
        <span class="mt-1.5 size-1 shrink-0 rounded-full bg-neutral-400"></span>
        <span>{{ bullet }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
export type TExperience = {
  title: string
  company: string
  period: string
  bullets: string[]
}

const props = defineProps<{
  experience: TExperience
}>()
</script>
