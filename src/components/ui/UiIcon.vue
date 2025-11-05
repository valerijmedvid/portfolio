<template>
  <Component :is="iconComponent" :size="iconSize" stroke-width="1.75" />
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import {
  Github,
  Linkedin,
  Download,
  MapPin,
  Briefcase,
  Calendar,
  AlertCircle,
} from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
  }>(),
  {
    size: 16,
  },
)

const iconMap: Record<string, Component> = {
  github: Github,
  linkedin: Linkedin,
  download: Download,
  mappin: MapPin,
  briefcase: Briefcase,
  calendar: Calendar,
}

const iconComponent = computed((): Component => {
  const iconName = props.name.toLowerCase()

  return iconMap[iconName] || AlertCircle
})

const iconSize = computed(() => props.size || 16)
</script>
