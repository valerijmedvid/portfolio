<template>
  <span
    class="group inline-flex items-center gap-0.5 px-1 py-1 text-xs leading-none transition-all cursor-pointer"
  >
    <UiIcon
      name="hash"
      size="11px"
      class="opacity-40 group-hover:opacity-60 transition-opacity duration-200"
    />
    <span class="group-hover:opacity-60">{{ props.label }}</span>
  </span>
</template>

<script setup lang="ts">
import UiIcon from './UiIcon.vue'

const props = defineProps<{
  label: string
}>()
</script>
