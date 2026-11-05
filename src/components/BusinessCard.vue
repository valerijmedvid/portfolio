<template>
  <!-- "Minimised" portfolio: the essentials in business-card format (85 × 55) -->
  <TerminalWindow
    :title="`${props.terminalUser}@card: ~`"
    :labels="{
      close: props.windowLabels.reload,
      minimize: props.windowLabels.restore,
      maximize: props.windowLabels.fullscreen,
    }"
    compact
    class="w-[min(92vw,28rem)]"
    @close="emit('close')"
    @minimize="emit('restore')"
    @maximize="emit('maximize')"
  >
    <div class="flex aspect-[85/55] flex-col justify-between">
      <div class="flex items-center gap-4">
        <img
          :src="IllustrationSrc"
          alt=""
          class="size-16 shrink-0 rounded-xl bg-neutral-100 object-cover ring-1 ring-black/10 dark:bg-neutral-800 dark:ring-white/10"
        />
        <div class="min-w-0">
          <p class="text-xl font-bold leading-tight text-neutral-900 dark:text-neutral-50">
            {{ contact.name }}
          </p>
          <p class="mt-0.5 font-mono text-xs text-accent">{{ props.role }}</p>
        </div>
      </div>

      <ul class="space-y-1 font-mono text-xs text-neutral-600 dark:text-neutral-400">
        <li v-if="email.href.value">
          <a :href="email.href.value" class="inline-flex items-center gap-2 hover:text-accent">
            <UiIcon name="mail" :size="12" class="text-accent" />{{ email.address.value }}
          </a>
        </li>
        <li>
          <a
            :href="contact.github.href"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 hover:text-accent"
          >
            <UiIcon name="github" :size="12" class="text-accent" />{{ contact.github.label }}
          </a>
        </li>
        <li>
          <a
            :href="contact.linkedin.href"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 hover:text-accent"
          >
            <UiIcon name="linkedin" :size="12" class="text-accent" />{{ contact.linkedin.label }}
          </a>
        </li>
      </ul>

      <div class="flex justify-end">
        <UiButton :label="props.windowLabels.openPortfolio" is-dark @click="emit('restore')" />
      </div>
    </div>
  </TerminalWindow>
</template>

<script setup lang="ts">
import IllustrationSrc from '@/assets/vili.webp'
import TerminalWindow from './TerminalWindow.vue'
import UiButton from './ui/UiButton.vue'
import UiIcon from './ui/UiIcon.vue'
import { useEmail } from '@/composables/useEmail'
import { contact } from '@/content/contact'
import type { TContent } from '@/content/types'

const props = defineProps<{
  role: string
  terminalUser: string
  windowLabels: TContent['window']
}>()

const emit = defineEmits<{
  close: []
  restore: []
  maximize: []
}>()

const email = useEmail()
</script>
