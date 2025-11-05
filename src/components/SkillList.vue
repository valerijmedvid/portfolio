<template>
  <div class="px-6 pb-6 print:px-0">
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div
        v-for="(skill, index) in props.skillList"
        :key="index"
        class="rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4"
      >
        <p class="text-xs uppercase tracking-wide text-neutral-500">
          {{ skill.categoryName }}
        </p>
        <div class="mt-3 flex flex-wrap gap-2">
          <UiTag v-for="tag in skill.skills" :key="tag" :label="tag" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiTag from './ui/UiTag.vue'

type TSkill = {
  categoryName: string
  skills: string[]
}

const props = defineProps<{
  skillList: TSkill[]
}>()
</script>
