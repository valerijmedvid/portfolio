<template>
  <!-- Screen only — print already has contacts in the header -->
  <section class="print:hidden">
    <UiSectionHeading command="contact --email" :title="props.title" />
    <p class="text-[15px] text-neutral-700 dark:text-neutral-300">{{ props.cta }}</p>

    <a
      v-if="email.href.value"
      :href="email.href.value"
      class="group mt-3 inline-flex items-center gap-2 font-mono text-lg font-bold text-accent sm:text-xl"
    >
      <span aria-hidden="true">&gt;</span>
      <span
        class="underline decoration-accent/30 underline-offset-4 transition-colors group-hover:decoration-accent"
      >
        {{ email.address.value }}
      </span>
    </a>

    <InteractiveTerminal :years-in-it="props.yearsInIt" />
  </section>
</template>

<script setup lang="ts">
import InteractiveTerminal from './InteractiveTerminal.vue'
import UiSectionHeading from './ui/UiSectionHeading.vue'
import { useEmail } from '@/composables/useEmail'

const props = defineProps<{
  title: string
  cta: string
  yearsInIt: number
}>()

const email = useEmail()
</script>
