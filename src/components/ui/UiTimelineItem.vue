<template>
  <div
    class="group relative mb-6 last:mb-0 page-break-avoid motion-safe:animate-slide-in print:!animate-none print:mb-2"
    :style="{ animationDelay: `${props.index * 80}ms` }"
  >
    <!-- Commit dot on the rail -->
    <div
      :class="
        isCurrent
          ? 'border-accent bg-accent'
          : 'border-neutral-300 bg-white group-hover:border-accent dark:border-neutral-600 dark:bg-neutral-950'
      "
      class="absolute -left-[23px] top-1.5 size-3 rounded-full border-2 transition-colors duration-200 print:border-neutral-500 print:bg-white"
    />

    <!-- Header: title + period side by side, secondary line below -->
    <div class="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
      <h3
        class="flex flex-wrap items-center gap-2 font-semibold text-neutral-900 dark:text-neutral-50 print:text-black"
      >
        {{ headerTitle }}
        <span
          v-if="isCurrent"
          class="rounded border border-accent/40 bg-accent/10 px-1.5 font-mono text-[10px] font-medium leading-4 text-accent print:hidden"
        >
          HEAD
        </span>
      </h3>
      <p
        class="shrink-0 font-mono text-xs text-neutral-500 tabular-nums dark:text-neutral-400 sm:text-right print:font-sans print:text-black"
      >
        {{ formatPeriod(companyRange.from, companyRange.to, props.locale) }}
      </p>
    </div>

    <p
      v-if="headerSubtitle"
      class="mt-0.5 font-mono text-xs text-accent print:font-sans print:text-sm print:text-neutral-800"
    >
      <span aria-hidden="true" class="print:hidden">@ </span>{{ headerSubtitle }}
    </p>

    <!-- Single role: bullets directly under header -->
    <ul
      v-if="singleRole"
      class="mt-2 space-y-1 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 print:mt-1 print:space-y-0.5 print:text-black"
    >
      <li v-for="(bullet, i) in singleRole.bullets" :key="i" class="flex items-start gap-2">
        <span
          aria-hidden="true"
          class="font-mono text-accent print:font-sans print:text-neutral-700"
          >-</span
        >
        <span>{{ bullet }}</span>
      </li>
    </ul>

    <!-- Multi-role: nested sub-timeline -->
    <div
      v-else
      class="mt-3 ml-1 space-y-3 border-l border-dashed border-neutral-300 pl-4 dark:border-neutral-700 print:mt-1 print:space-y-2 print:border-neutral-300"
    >
      <div v-for="(role, i) in props.experience.roles" :key="i" class="relative page-break-avoid">
        <div
          class="absolute -left-[20.5px] top-1.5 size-2 rounded-full border border-neutral-400 bg-white dark:border-neutral-600 dark:bg-neutral-950 print:border-neutral-400"
        />

        <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
          <h4 class="text-sm font-semibold text-neutral-900 dark:text-neutral-100 print:text-black">
            {{ role.title }}
          </h4>
          <p
            class="font-mono text-[11px] text-neutral-500 tabular-nums dark:text-neutral-500 print:hidden"
          >
            {{ formatPeriod(role.from, role.to, props.locale) }}
          </p>
        </div>

        <ul
          class="mt-1 space-y-0.5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 print:text-black"
        >
          <li v-for="(bullet, j) in role.bullets" :key="j" class="flex items-start gap-2">
            <span
              aria-hidden="true"
              class="font-mono text-accent print:font-sans print:text-neutral-700"
              >-</span
            >
            <span>{{ bullet }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatPeriod, earliest, latest, type YearMonth } from '@/utils/period'
import type { Locale } from '@/content'
import type { TExperience, TRole } from '@/content/types'

const props = withDefaults(
  defineProps<{
    experience: TExperience
    locale: Locale
    index?: number
  }>(),
  { index: 0 },
)

const singleRole = computed((): TRole | null => {
  return props.experience.roles.length === 1 ? (props.experience.roles[0] ?? null) : null
})

const headerTitle = computed((): string => {
  return singleRole.value ? singleRole.value.title : props.experience.company
})

const headerSubtitle = computed((): string | null => {
  return singleRole.value ? props.experience.company : null
})

const companyRange = computed((): { from: YearMonth; to: YearMonth } => {
  const froms = props.experience.roles.map((r) => r.from)
  const tos = props.experience.roles.map((r) => r.to)
  return { from: earliest(froms), to: latest(tos) }
})

const isCurrent = computed((): boolean => companyRange.value.to === 'present')
</script>
