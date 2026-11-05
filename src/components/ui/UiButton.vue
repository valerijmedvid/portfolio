<template>
  <component
    :is="props.href ? 'a' : 'button'"
    :href="props.href"
    :target="isExternalLink ? '_blank' : undefined"
    :rel="isExternalLink ? 'noopener noreferrer' : undefined"
    :type="props.href ? undefined : 'button'"
    :aria-label="props.ariaLabel || props.label"
    :class="[
      props.isDark
        ? 'border-accent bg-accent text-accent-contrast hover:opacity-90'
        : 'border-black/10 bg-white/60 text-neutral-800 hover:border-accent hover:text-accent dark:border-white/10 dark:bg-white/5 dark:text-neutral-200',
      props.label ? 'px-2.5 py-1.5' : 'p-1.5',
    ]"
    class="inline-flex items-center gap-1.5 rounded-md border font-mono text-xs transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
  >
    <UiIcon v-if="props.icon" :name="props.icon" :size="14" />
    <span v-if="props.label">{{ props.label }}</span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

// Only absolute http(s) links open in a new tab — not mailto: or same-site files like the CV PDF
const isExternalLink = computed((): boolean => /^https?:\/\//.test(props.href ?? ''))
</script>
