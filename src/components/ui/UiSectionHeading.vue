<template>
  <div class="mb-4 print:mb-2">
    <!-- Decorative shell prompt; screen readers and print get only the heading below -->
    <p
      aria-hidden="true"
      class="font-mono text-xs text-neutral-500 dark:text-neutral-500 print:hidden"
    >
      <span class="text-accent">~</span>
      <span class="text-accent">&nbsp;$&nbsp;</span>{{ props.command }}
    </p>
    <h2
      class="mt-1 font-mono text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50 print:mt-0 print:font-sans print:text-base print:text-black"
    >
      <span aria-hidden="true" class="text-accent print:hidden"># </span>{{ props.title }}
    </h2>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  command: string
  title: string
}>()
</script>
