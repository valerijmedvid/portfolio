<template>
  <!-- Skills section -->
  <div class="px-6 pb-6 print:px-0 print:pb-3">
    <h3 class="mb-2 text-base font-semibold tracking-tight">{{ props.title }}</h3>
    <dl class="grid gap-x-6 gap-y-2 sm:grid-cols-2 print:grid-cols-2 print:gap-y-1">
      <div v-for="(group, groupIndex) in props.skillGroups" :key="group.label">
        <dt
          class="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 print:text-neutral-700"
        >
          {{ group.label }}
        </dt>
        <dd class="flex flex-wrap gap-y-0.5">
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
  </div>
</template>

<script setup lang="ts">
import UiTag from './ui/UiTag.vue'
import type { TSkillGroup } from '@/content/types'

const props = defineProps<{
  title: string
  skillGroups: TSkillGroup[]
}>()
</script>
