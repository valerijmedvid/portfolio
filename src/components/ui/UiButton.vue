<template>
  <a
    :href="props.href"
    :class="{
      'bg-neutral-900 text-white hover:opacity-80': props.isDark,
      'bg-white border-black/10': !props.isDark,
    }"
    class="inline-flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-sm shadow-sm hover:opacity-50 transition cursor-pointer"
  >
    <UiIcon v-if="props.icon" :name="props.icon" />
    {{ props.label }}
  </a>
</template>

<script setup lang="ts">
import UiIcon from './UiIcon.vue'

const props = defineProps<{
  label: string
  icon?: string
  href?: string
  isDark?: boolean
}>()
</script>
