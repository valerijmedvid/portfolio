<template>
  <div
    class="overflow-hidden rounded-xl border border-black/10 bg-white/80 shadow-xl shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-neutral-950/80 dark:shadow-black/40 print:overflow-visible print:rounded-none print:border-0 print:bg-white print:shadow-none print:backdrop-blur-none"
  >
    <!-- Window chrome -->
    <div
      class="flex items-center gap-3 border-b border-black/10 bg-neutral-100/80 px-4 py-2.5 dark:border-white/10 dark:bg-neutral-900/80 print:hidden"
    >
      <div aria-hidden="true" class="flex shrink-0 gap-1.5">
        <span class="size-3 rounded-full bg-[#ff5f57]" />
        <span class="size-3 rounded-full bg-[#febc2e]" />
        <span class="size-3 rounded-full bg-[#28c840]" />
      </div>
      <p
        aria-hidden="true"
        class="hidden flex-1 truncate text-center font-mono text-xs text-neutral-500 sm:block"
      >
        {{ props.title }}
      </p>
      <div class="ml-auto flex shrink-0 items-center gap-1.5 sm:ml-0">
        <slot name="actions" />
      </div>
    </div>

    <div class="px-5 py-8 sm:px-10 sm:py-10 print:p-0">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>
