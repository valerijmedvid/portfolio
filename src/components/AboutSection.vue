<template>
  <!-- Summary section -->
  <div
    class="px-6 pb-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 print:px-0 print:pb-4 print:text-black"
  >
    {{ props.summary }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  summary: string
}>()
</script>
