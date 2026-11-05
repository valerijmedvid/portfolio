<template>
  <header class="mb-12 print:mb-4">
    <p aria-hidden="true" class="mb-5 font-mono text-xs text-neutral-500 print:hidden">
      <span class="text-accent">~ $&nbsp;</span>whoami
    </p>

    <div
      class="flex flex-col items-start gap-6 sm:flex-row sm:items-center print:flex-row print:gap-4"
    >
      <!-- Photo with offset accent frame -->
      <div class="relative shrink-0">
        <div
          aria-hidden="true"
          class="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border-2 border-accent print:hidden"
        />
        <img
          :src="ProfilePhoto"
          :alt="contact.name"
          class="relative size-28 rounded-2xl bg-neutral-100 object-cover ring-1 ring-black/10 sm:size-32 dark:bg-neutral-800 dark:ring-white/10 print:size-20 print:rounded-full print:ring-0"
        />
      </div>

      <div class="min-w-0">
        <h1
          class="text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50 print:text-xl print:text-black"
        >
          {{ contact.name }}
        </h1>
        <!-- Static role for screen readers and print; typed taglines are visual only -->
        <p
          class="mt-1 min-h-6 whitespace-nowrap font-mono text-sm leading-6 text-accent print:font-sans print:text-neutral-700"
        >
          <span class="sr-only print:not-sr-only">{{ props.profile.role }}</span>
          <span aria-hidden="true" class="print:hidden">{{ typedTagline }}</span>
          <span
            aria-hidden="true"
            class="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-accent motion-safe:animate-blink print:hidden"
          />
        </p>

        <!-- Meta as key: value pairs -->
        <dl
          class="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs print:font-sans text-neutral-600 dark:text-neutral-400 print:text-neutral-700"
        >
          <div
            v-for="item in metaItems"
            :key="item.icon"
            :class="item.class"
            class="inline-flex items-center gap-1.5"
          >
            <dt class="inline-flex">
              <UiIcon :name="item.icon" :size="12" class="text-accent print:text-neutral-700" />
            </dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>

        <!-- Contact links (screen) -->
        <div class="mt-4 flex flex-wrap gap-2 print:hidden">
          <UiButton
            v-if="email.href.value"
            :label="props.actions.email"
            icon="mail"
            :href="email.href.value"
          />
          <UiButton label="GitHub" icon="github" :href="contact.github.href" />
          <UiButton label="LinkedIn" icon="linkedin" :href="contact.linkedin.href" />
        </div>

        <!-- Contact lines (print replaces the buttons) -->
        <div class="mt-2 hidden flex-col gap-0.5 text-xs text-neutral-700 print:flex">
          <span class="inline-flex items-center gap-1.5">
            <UiIcon name="mail" :size="11" />
            {{ contact.email.user }}&#64;{{ contact.email.domain }}
          </span>
          <span class="inline-flex items-center gap-1.5">
            <UiIcon name="github" :size="11" />
            {{ contact.github.label }}
          </span>
          <span class="inline-flex items-center gap-1.5">
            <UiIcon name="linkedin" :size="11" />
            {{ contact.linkedin.label }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ProfilePhoto from '/src/assets/vili.webp'
import UiButton from './ui/UiButton.vue'
import UiIcon from './ui/UiIcon.vue'
import { useEmail } from '@/composables/useEmail'
import { useTypewriter } from '@/composables/useTypewriter'
import { contact } from '@/content/contact'
import type { TContent } from '@/content/types'

const props = defineProps<{
  profile: TContent['profile']
  actions: TContent['actions']
  yearsInIt: number
}>()

const email = useEmail()
const typedTagline = useTypewriter(computed((): string[] => props.profile.taglines))

const metaItems = computed((): { icon: string; value: string; class?: string }[] => [
  { icon: 'mappin', value: props.profile.location },
  { icon: 'briefcase', value: props.profile.yearsInIt(props.yearsInIt) },
  { icon: 'languages', value: props.profile.languages },
  { icon: 'calendar', value: props.profile.availability, class: 'print:hidden' },
])
</script>
