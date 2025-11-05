<script setup lang="ts">
defineProps<{
  title: string
  company: string
  period: string
  bullets: string[]
}>()
</script>

<template>
  <div class="relative">
    <div class="absolute -left-[21px] top-1 size-3 rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"></div>
    <div class="mb-1">
      <h4 class="font-semibold text-neutral-900 dark:text-neutral-100">{{ title }}</h4>
      <p class="text-sm text-neutral-600 dark:text-neutral-400">{{ company }} · {{ period }}</p>
    </div>
    <ul class="mt-2 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
      <li v-for="(bullet, index) in bullets" :key="index" class="flex items-start gap-2">
        <span class="mt-1.5 size-1 shrink-0 rounded-full bg-neutral-400"></span>
        <span>{{ bullet }}</span>
      </li>
    </ul>
  </div>
</template>

