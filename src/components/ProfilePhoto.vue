<template>
  <!-- Flip card: illustration on the front, real photo on the back.
       Flips on hover / tap and on its own every few seconds. Print shows the real photo only. -->
  <div
    class="relative size-28 shrink-0 [perspective:800px] sm:size-32 print:size-20"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="tapped = !tapped"
  >
    <div
      aria-hidden="true"
      class="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border-2 border-accent print:hidden"
    />

    <div
      :class="isFlipped ? '[transform:rotateY(180deg)]' : ''"
      class="relative size-full cursor-pointer transition-transform duration-700 ease-in-out [transform-style:preserve-3d] motion-reduce:transition-none print:![transform:none]"
    >
      <img
        :src="IllustrationSrc"
        :alt="contact.name"
        class="absolute inset-0 size-full rounded-2xl bg-neutral-100 object-cover ring-1 ring-black/10 [backface-visibility:hidden] dark:bg-neutral-800 dark:ring-white/10 print:hidden"
      />
      <img
        :src="PhotoSrc"
        alt=""
        class="absolute inset-0 size-full rounded-2xl object-cover ring-1 ring-black/10 [backface-visibility:hidden] [transform:rotateY(180deg)] dark:ring-white/10 print:rounded-full print:ring-0 print:[transform:none]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import IllustrationSrc from '@/assets/vili.webp'
import PhotoSrc from '@/assets/vili-photo.webp'
import { contact } from '@/content/contact'

const AUTO_EVERY_MS = 7000
const AUTO_SHOW_MS = 2500

const hovered = ref(false)
const tapped = ref(false)
const autoFlipped = ref(false)

const isFlipped = computed((): boolean => hovered.value || tapped.value || autoFlipped.value)

let interval: number | undefined
let timeout: number | undefined

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  interval = window.setInterval(() => {
    if (hovered.value || tapped.value) return
    autoFlipped.value = true
    timeout = window.setTimeout(() => (autoFlipped.value = false), AUTO_SHOW_MS)
  }, AUTO_EVERY_MS)
})

onBeforeUnmount(() => {
  window.clearInterval(interval)
  window.clearTimeout(timeout)
})
</script>
