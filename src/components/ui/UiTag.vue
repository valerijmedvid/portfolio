<template>
  <span
    class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none tracking-wide bg-white/50 dark:bg-white/5 border-black/10 dark:border-white/10"
  >
    {{ props.label }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
}>()
</script>
