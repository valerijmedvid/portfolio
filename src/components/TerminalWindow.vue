<template>
  <div
    class="overflow-hidden rounded-xl border border-black/10 bg-white/80 shadow-xl shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-neutral-950/80 dark:shadow-black/40 print:overflow-visible print:rounded-none print:border-0 print:bg-white print:shadow-none print:backdrop-blur-none"
  >
    <!-- Window chrome -->
    <div
      class="flex items-center gap-3 border-b border-black/10 bg-neutral-100/80 px-4 py-2.5 dark:border-white/10 dark:bg-neutral-900/80 print:hidden"
    >
      <!-- macOS traffic lights: decorative, glyphs appear on hover like the real ones -->
      <div aria-hidden="true" class="group flex shrink-0 gap-2">
        <span
          v-for="light in trafficLights"
          :key="light.icon"
          :style="{ backgroundColor: light.color }"
          class="flex size-3 items-center justify-center rounded-full ring-1 ring-black/10 ring-inset"
        >
          <UiIcon
            :name="light.icon"
            :size="8"
            :stroke-width="3"
            class="text-black/60 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          />
        </span>
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
import UiIcon from './ui/UiIcon.vue'

const props = defineProps<{
  title: string
}>()

const trafficLights = [
  { color: '#ff5f57', icon: 'x' },
  { color: '#febc2e', icon: 'minus' },
  { color: '#28c840', icon: 'maximize' },
]
</script>
