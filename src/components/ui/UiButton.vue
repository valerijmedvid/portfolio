<template>
  <component
    :is="props.href ? 'a' : 'button'"
    :href="props.href"
    :target="props.href ? '_blank' : undefined"
    :rel="props.href ? 'noopener noreferrer' : undefined"
    :type="props.href ? undefined : 'button'"
    :class="{
      'bg-neutral-900 text-white hover:bg-neutral-800': props.isDark,
      'bg-white text-neutral-900 hover:bg-neutral-50': !props.isDark,
    }"
    class="inline-flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-sm shadow-sm transition-colors duration-200 cursor-pointer hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
  >
    <UiIcon v-if="props.icon" :name="props.icon" />
    {{ props.label }}
  </component>
</template>

<script setup lang="ts">
import UiIcon from './UiIcon.vue'

const props = withDefaults(
  defineProps<{
    label: string
    icon?: string
    href?: string
    isDark?: boolean
  }>(),
  {
    icon: undefined,
    href: undefined,
    isDark: false,
  },
)
</script>
