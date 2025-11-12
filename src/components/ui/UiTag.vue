<template>
  <span
    class="group inline-flex items-center gap-0.5 px-1 py-1 text-xs cursor-pointer transition-colors duration-200"
  >
    <UiIcon
      name="hash"
      size="11px"
      class="opacity-40 group-hover:opacity-70 transition-opacity duration-200"
    />
    <span
      class="text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-200"
    >
      {{ props.label }}
    </span>
  </span>
</template>

<script setup lang="ts">
import UiIcon from './UiIcon.vue'

const props = defineProps<{
  label: string
}>()
</script>
