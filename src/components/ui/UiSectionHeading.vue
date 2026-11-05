<template>
  <div
    class="mb-4 print:mb-1.5 print:break-after-avoid print:border-b print:border-neutral-200 print:pb-0.5"
  >
    <!-- Decorative shell prompt; screen readers and print get only the heading below -->
    <p
      aria-hidden="true"
      class="font-mono text-xs text-neutral-500 dark:text-neutral-500 print:hidden"
    >
      <span class="text-accent">~</span>
      <span class="text-accent">&nbsp;$&nbsp;</span>{{ props.command }}
    </p>
    <h2
      class="mt-1 font-mono text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50 print:mt-0 print:font-sans print:text-[10pt] print:font-semibold print:uppercase print:tracking-widest print:text-accent"
    >
      <span aria-hidden="true" class="text-accent print:hidden"># </span>
      <span :class="props.printTitle ? 'print:hidden' : ''">{{ props.title }}</span>
      <span v-if="props.printTitle" class="hidden print:inline">{{ props.printTitle }}</span>
    </h2>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    command: string
    title: string
    /** Plainer heading for the PDF, if the screen one is too playful */
    printTitle?: string
  }>(),
  { printTitle: undefined },
)
</script>
