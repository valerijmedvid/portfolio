<template>
  <!-- Skills section -->
  <div class="px-6 pb-6 print:px-0 print:pb-3">
    <h3 class="mb-1 text-base font-semibold tracking-tight">Fancy words I can actually use</h3>
    <div class="flex flex-wrap gap-y-0.5">
      <UiTag
        v-for="(skill, index) in props.skillList"
        :key="skill"
        :label="skill"
        :style="{ animationDelay: `${index * 25}ms` }"
        class="motion-safe:animate-slide-in print:!animate-none"
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
