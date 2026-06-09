<template>
  <div
    class="group relative mb-4 pl-1 page-break-avoid motion-safe:animate-slide-in print:!animate-none print:mb-2"
    :style="{ animationDelay: `${props.index * 80}ms` }"
  >
    <div
      class="absolute -left-[22px] top-2 size-3 rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 transition-colors duration-200 group-hover:border-neutral-900 dark:group-hover:border-neutral-100 print:border-neutral-400"
    />

    <!-- Header: title + period side by side, secondary line below -->
    <div class="mb-1 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
      <h4 class="font-semibold text-neutral-900 dark:text-neutral-100 print:text-black">
        {{ headerTitle }}
      </h4>
      <p
        class="text-xs text-neutral-500 dark:text-neutral-400 tabular-nums sm:text-right print:text-black"
      >
        {{ formatPeriod(companyRange.from, companyRange.to) }}
      </p>
    </div>

    <p
      v-if="headerSubtitle"
      class="mb-2 text-sm text-neutral-600 dark:text-neutral-400 print:text-neutral-800"
    >
      {{ headerSubtitle }}
    </p>

    <!-- Single role: bullets directly under header -->
    <ul
      v-if="singleRole"
      class="space-y-1 text-sm text-neutral-700 dark:text-neutral-300 print:text-black"
    >
      <li
        v-for="(bullet, i) in singleRole.bullets"
        :key="i"
        class="flex items-start gap-2"
      >
        <span
          class="mt-1.5 size-1 shrink-0 rounded-full bg-neutral-400 print:bg-neutral-700"
        ></span>
        <span>{{ bullet }}</span>
      </li>
    </ul>

    <!-- Multi-role: nested sub-timeline -->
    <div
      v-else
      class="mt-2 ml-1 space-y-3 border-l border-dashed border-neutral-200 dark:border-neutral-800 pl-4 print:border-neutral-300 print:space-y-2"
    >
      <div
        v-for="(role, i) in props.experience.roles"
        :key="i"
        class="relative page-break-avoid"
      >
        <div
          class="absolute -left-[20px] top-1.5 size-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 print:border-neutral-400"
        />

        <h5
          class="mb-0.5 text-sm font-semibold text-neutral-900 dark:text-neutral-100 print:text-black"
        >
          {{ role.title }}
        </h5>

        <ul class="space-y-0.5 text-sm text-neutral-700 dark:text-neutral-300 print:text-black">
          <li
            v-for="(bullet, j) in role.bullets"
            :key="j"
            class="flex items-start gap-2"
          >
            <span
              class="mt-1.5 size-1 shrink-0 rounded-full bg-neutral-400 print:bg-neutral-700"
            ></span>
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

export type TRole = {
  title: string
  from: YearMonth
  to: YearMonth
  bullets: string[]
}

export type TExperience = {
  company: string
  roles: TRole[]
}

const props = withDefaults(
  defineProps<{
    experience: TExperience
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
</script>
