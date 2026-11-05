<template>
  <Component :is="iconComponent" :size="iconSize" :stroke-width="props.strokeWidth" />
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
  Sun,
  Moon,
  Mail,
  Languages,
  X,
  Minus,
  Maximize2,
} from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    strokeWidth?: number
  }>(),
  {
    size: 16,
    strokeWidth: 1.75,
  },
)

const iconMap: Record<string, Component> = {
  github: Github,
  linkedin: Linkedin,
  download: Download,
  mappin: MapPin,
  briefcase: Briefcase,
  calendar: Calendar,
  sun: Sun,
  moon: Moon,
  mail: Mail,
  languages: Languages,
  x: X,
  minus: Minus,
  maximize: Maximize2,
}

const iconComponent = computed((): Component => {
  const iconName = props.name.toLowerCase()

  return iconMap[iconName] || AlertCircle
})

const iconSize = computed(() => props.size || 16)
</script>
