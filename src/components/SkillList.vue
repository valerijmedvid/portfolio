<template>
  <!-- Skills section -->
  <div class="px-6 pb-6 print:px-0">
    <h2
      class="text-sm font-semibold text-neutral-800 dark:text-neutral-100 uppercase tracking-wide mb-2"
    >
      Fancy Words I Can Actually Use
    </h2>
    <div class="flex flex-wrap gap-1">
      <UiTag
        v-for="(skill, index) in props.skillList"
        :key="skill"
        :label="skill"
        :style="{
          animationDelay: `${index * 30}ms`,
        }"
        class="animate-slideIn"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UiTag from './ui/UiTag.vue'

const props = defineProps<{
  skillList: string[]
}>()
</script>
