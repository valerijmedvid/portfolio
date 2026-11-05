<template>
  <section class="mb-12 print:mb-2.5">
    <UiSectionHeading command="ls skills/" :title="props.title" :print-title="props.printTitle" />
    <!-- Screen: one directory per row, like `ls` output. Print: compact 3-column grid. -->
    <dl
      class="space-y-3 sm:space-y-2 print:grid print:grid-cols-3 print:gap-x-6 print:gap-y-1 print:space-y-0"
    >
      <div
        v-for="(group, groupIndex) in props.skillGroups"
        :key="group.label"
        class="sm:grid sm:grid-cols-[9.5rem_1fr] sm:items-baseline print:block"
      >
        <dt
          class="mb-1.5 font-mono text-xs font-bold text-accent sm:mb-0 print:mb-0.5 print:font-sans print:font-semibold print:text-neutral-700"
        >
          <span class="print:hidden">{{ toDirName(group.label) }}/</span>
          <span class="hidden print:inline">{{ group.label }}</span>
        </dt>
        <dd class="flex flex-wrap gap-1.5 print:gap-0">
          <UiTag
            v-for="(skill, index) in group.skills"
            :key="skill.label"
            :label="skill.label"
            :muted="skill.printHidden"
            :style="{ animationDelay: `${(groupIndex * group.skills.length + index) * 25}ms` }"
            :class="skill.printHidden ? 'print:hidden' : ''"
            class="motion-safe:animate-slide-in print:!animate-none"
          />
        </dd>
      </div>
    </dl>
  </section>
</template>

<script setup lang="ts">
import UiSectionHeading from './ui/UiSectionHeading.vue'
import UiTag from './ui/UiTag.vue'
import type { TSkillGroup } from '@/content/types'

const props = defineProps<{
  title: string
  printTitle: string
  skillGroups: TSkillGroup[]
}>()

// "Backend & data" -> "backend-data", shown like a directory listing
const toDirName = (label: string): string =>
  label
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '')
</script>
