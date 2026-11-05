<template>
  <section class="mb-12 print:mb-3">
    <UiSectionHeading command="ls skills/" :title="props.title" />
    <dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2 print:grid-cols-2 print:gap-y-1">
      <div v-for="(group, groupIndex) in props.skillGroups" :key="group.label">
        <dt
          class="mb-1.5 font-mono text-xs font-bold text-accent print:mb-0.5 print:font-sans print:font-semibold print:text-neutral-700"
        >
          <span class="print:hidden">{{ toDirName(group.label) }}/</span>
          <span class="hidden print:inline">{{ group.label }}</span>
        </dt>
        <dd class="flex flex-wrap gap-1.5 print:gap-0">
          <UiTag
            v-for="(skill, index) in group.skills"
            :key="skill.label"
            :label="skill.label"
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
  skillGroups: TSkillGroup[]
}>()

// "Backend & data" -> "backend-data", shown like a directory listing
const toDirName = (label: string): string =>
  label
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '')
</script>
