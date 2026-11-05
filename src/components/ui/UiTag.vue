<template>
  <span
    class="inline-flex items-center rounded border border-black/5 bg-black/[0.03] px-1.5 py-0.5 font-mono text-xs text-neutral-700 transition-colors duration-200 hover:border-accent/40 hover:text-accent dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 print:border-0 print:bg-transparent print:p-0 print:pr-2 print:font-sans print:text-black"
  >
    {{ props.label }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
}>()
</script>
