<template>
  <!-- TEMPORARY dev-only picker for trying accent colours — delete once one is chosen -->
  <div
    class="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3 py-2 shadow-lg backdrop-blur dark:border-white/10 dark:bg-neutral-900/90 print:hidden"
  >
    <span class="font-mono text-[11px] text-neutral-500">accent</span>
    <button
      v-for="option in options"
      :key="option.name"
      type="button"
      :title="option.name"
      :aria-label="option.name"
      :style="{ backgroundColor: option.swatch }"
      :class="
        current === option.name
          ? 'ring-2 ring-offset-2 ring-neutral-400 dark:ring-offset-neutral-900'
          : ''
      "
      class="size-5 cursor-pointer rounded-full"
      @click="select(option.name)"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const STORAGE_KEY = 'accent-preview'

const options = [
  { name: 'emerald', swatch: '#10b981' },
  { name: 'indigo', swatch: '#6366f1' },
  { name: 'amber', swatch: '#f59e0b' },
  { name: 'cyan', swatch: '#06b6d4' },
  { name: 'rose', swatch: '#f43f5e' },
  { name: 'mono', swatch: '#737373' },
]

const current = ref('emerald')

const select = (name: string): void => {
  current.value = name
  document.documentElement.dataset.accent = name
  localStorage.setItem(STORAGE_KEY, name)
}

onMounted(() => {
  select(localStorage.getItem(STORAGE_KEY) ?? 'emerald')
})
</script>
