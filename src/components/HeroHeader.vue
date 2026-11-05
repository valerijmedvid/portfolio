<template>
  <!-- Hero section -->
  <header
    class="flex flex-col items-center gap-4 px-6 pt-8 pb-6 md:flex-row md:items-center md:justify-between print:px-0 print:pt-0 print:pb-4 print:flex-row print:items-center"
  >
    <div
      class="flex flex-col items-center gap-4 md:flex-row md:items-center md:text-left print:flex-row print:items-center print:gap-4"
    >
      <div
        class="size-28 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5 print:size-20 print:ring-0"
      >
        <img :src="ProfilePhoto" :alt="contact.name" class="h-full w-full object-cover" />
      </div>

      <div class="text-center md:text-left print:text-left">
        <h1 class="text-2xl font-bold leading-tight tracking-tight print:text-xl">
          {{ contact.name }}
        </h1>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 print:text-neutral-700">
          {{ props.profile.role }}
        </p>

        <div
          class="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-neutral-600 dark:text-neutral-400 md:justify-start print:justify-start print:text-neutral-700"
        >
          <span class="inline-flex items-center gap-1">
            <UiIcon name="mappin" :size="12" />
            {{ props.profile.location }}
          </span>

          <span class="inline-flex items-center gap-1">
            <UiIcon name="briefcase" :size="12" />
            {{ props.profile.yearsInIt(props.yearsInIt) }}
          </span>

          <span class="inline-flex items-center gap-1">
            <UiIcon name="languages" :size="12" />
            {{ props.profile.languages }}
          </span>

          <span class="inline-flex items-center gap-1 print:hidden">
            <UiIcon name="calendar" :size="12" />
            {{ props.profile.availability }}
          </span>
        </div>

        <!-- Print-only contact lines (replaces the buttons that are hidden in print) -->
        <div
          class="mt-2 hidden flex-col gap-0.5 text-xs text-neutral-700 print:flex print:text-left"
        >
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

    <HeaderActions :actions="props.actions" :email-href="emailHref" />
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProfilePhoto from '/src/assets/vili.webp'
import HeaderActions from './HeaderActions.vue'
import UiIcon from './ui/UiIcon.vue'
import { contact } from '@/content/contact'
import type { TContent } from '@/content/types'

const props = defineProps<{
  profile: TContent['profile']
  actions: TContent['actions']
  yearsInIt: number
}>()

const emailHref = ref('')

onMounted(() => {
  emailHref.value = `mailto:${contact.email.user}@${contact.email.domain}`
})
</script>
