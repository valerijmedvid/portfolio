<template>
  <span
    :class="
      props.muted
        ? 'border-dashed border-black/15 text-neutral-400 dark:border-white/15 dark:text-neutral-500'
        : 'border-black/5 bg-black/[0.03] text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300'
    "
    class="inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-xs transition-colors duration-200 hover:border-accent/40 hover:text-accent print:border-0 print:bg-transparent print:p-0 print:pr-2 print:font-sans print:text-black"
  >
    {{ props.label }}
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string
    /** Low-key style for the joke tags */
    muted?: boolean
  }>(),
  { muted: false },
)
</script>
