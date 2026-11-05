<template>
  <div
    :class="props.expanded ? 'min-h-screen rounded-none border-0' : 'rounded-xl border'"
    class="overflow-hidden border-black/10 bg-white/80 shadow-xl shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-neutral-950/80 dark:shadow-black/40 print:overflow-visible print:rounded-none print:border-0 print:bg-white print:shadow-none print:backdrop-blur-none"
  >
    <!-- Window chrome -->
    <div
      class="flex items-center gap-3 border-b border-black/10 bg-neutral-100/80 px-4 py-2.5 dark:border-white/10 dark:bg-neutral-900/80 print:hidden"
    >
      <!-- macOS traffic lights; glyphs appear on hover like the real ones -->
      <!-- Each button is a 24px touch target around a 12px dot (WCAG 2.5.8) -->
      <div class="group -mx-1.5 flex shrink-0">
        <button
          v-for="light in trafficLights"
          :key="light.name"
          type="button"
          :aria-label="props.labels[light.name]"
          :title="props.labels[light.name]"
          class="cursor-pointer rounded-full p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          @click="onLight(light.name)"
        >
          <svg viewBox="0 0 12 12" class="size-3" aria-hidden="true">
            <circle
              cx="6"
              cy="6"
              r="5.75"
              :fill="light.fill"
              :stroke="light.border"
              stroke-width="0.5"
            />
            <g
              class="opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
            >
              <path
                v-if="light.name === 'close'"
                d="M3.9 3.9 8.1 8.1M8.1 3.9 3.9 8.1"
                :stroke="light.glyph"
                stroke-width="1.1"
                stroke-linecap="round"
              />
              <path
                v-else-if="light.name === 'minimize'"
                d="M3.3 6h5.4"
                :stroke="light.glyph"
                stroke-width="1.2"
                stroke-linecap="round"
              />
              <path v-else d="M3.6 3.6h4L3.6 7.6zM8.4 8.4h-4l4-4z" :fill="light.glyph" />
            </g>
          </svg>
        </button>
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

    <div
      :class="[
        props.compact ? 'p-5' : 'px-5 py-8 sm:px-10 sm:py-10',
        props.expanded ? 'mx-auto max-w-5xl' : '',
      ]"
      class="print:p-0"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
type TLight = 'close' | 'minimize' | 'maximize'

const props = withDefaults(
  defineProps<{
    title: string
    /** aria-labels / tooltips of the three traffic-light buttons */
    labels: Record<TLight, string>
    expanded?: boolean
    compact?: boolean
  }>(),
  { expanded: false, compact: false },
)

const emit = defineEmits<{
  close: []
  minimize: []
  maximize: []
}>()

// Colours sampled from macOS: fill, darker rim, glyph
const trafficLights: { name: TLight; fill: string; border: string; glyph: string }[] = [
  { name: 'close', fill: '#ff5f57', border: '#e0443e', glyph: '#4d0000' },
  { name: 'minimize', fill: '#febc2e', border: '#dea123', glyph: '#995700' },
  { name: 'maximize', fill: '#28c840', border: '#1aab29', glyph: '#006500' },
]

const onLight = (name: TLight): void => {
  if (name === 'close') emit('close')
  else if (name === 'minimize') emit('minimize')
  else emit('maximize')
}
</script>
