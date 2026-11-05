<template>
  <section class="mb-12 print:mb-4">
    <UiSectionHeading command="cat about.md" :title="props.title" />
    <p
      class="max-w-3xl text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300 print:max-w-none print:text-sm print:text-black"
    >
      {{ props.summary }}
    </p>
  </section>
</template>

<script setup lang="ts">
import UiSectionHeading from './ui/UiSectionHeading.vue'

const props = defineProps<{
  title: string
  summary: string
}>()
</script>
