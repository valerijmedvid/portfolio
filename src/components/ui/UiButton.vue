<template>
  <component
    :is="props.href ? 'a' : 'button'"
    :href="props.href"
    :target="props.href ? '_blank' : undefined"
    :rel="props.href ? 'noopener noreferrer' : undefined"
    :type="props.href ? undefined : 'button'"
    :aria-label="props.label || props.ariaLabel"
    :class="[
      props.isDark
        ? 'bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100'
        : 'bg-white text-neutral-900 hover:bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800',
      props.label ? 'px-3 py-2' : 'p-2',
    ]"
    class="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 text-sm shadow-sm transition-colors duration-200 cursor-pointer hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 dark:focus-visible:ring-white/40"
  >
    <UiIcon v-if="props.icon" :name="props.icon" />
    <span v-if="props.label">{{ props.label }}</span>
  </component>
</template>

<script setup lang="ts">
import UiIcon from './UiIcon.vue'

const props = withDefaults(
  defineProps<{
    label?: string
    icon?: string
    href?: string
    isDark?: boolean
    ariaLabel?: string
  }>(),
  {
    label: '',
    icon: undefined,
    href: undefined,
    isDark: false,
    ariaLabel: undefined,
  },
)
</script>
