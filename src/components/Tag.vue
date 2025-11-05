<script setup lang="ts">
defineProps<{
  children?: string
}>()
</script>

<template>
  <span class="inline-flex items-center rounded-lg bg-neutral-100 dark:bg-neutral-800 px-2 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300">
    <slot />
  </span>
</template>

