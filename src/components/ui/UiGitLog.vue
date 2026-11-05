<template>
  <ol class="text-sm">
    <li
      v-for="(row, index) in rows"
      :key="row.key"
      :class="[
        row.kind === 'edge' ? 'print:hidden' : 'page-break-avoid',
        row.kind === 'commit' && row.nested ? 'print:pl-4' : '',
      ]"
      class="flex motion-safe:animate-slide-in print:!animate-none"
      :style="{ animationDelay: `${index * 50}ms` }"
    >
      <!-- Graph column: lanes are CELL px wide, lane n is centred at n * CELL + CELL / 2 -->
      <div
        aria-hidden="true"
        class="relative shrink-0 text-neutral-300 dark:text-neutral-700 print:hidden"
        :style="{ width: `${row.graph.length * CELL}px` }"
      >
        <template v-if="row.kind === 'commit'">
          <template v-for="(cell, c) in row.graph" :key="c">
            <span
              v-if="cell === '|'"
              class="absolute inset-y-0 w-px bg-current"
              :style="{ left: `${laneX(c)}px` }"
            />
            <template v-else-if="cell === '*'">
              <span
                v-if="index > 0"
                class="absolute top-0 h-1.5 w-px bg-current"
                :style="{ left: `${laneX(c)}px` }"
              />
              <span
                class="absolute top-0 text-center font-mono text-base font-bold leading-6 text-accent"
                :style="{ left: `${c * CELL}px`, width: `${CELL}px` }"
                >*</span
              >
              <span
                v-if="!row.isLast"
                class="absolute top-[17px] bottom-0 w-px bg-current"
                :style="{ left: `${laneX(c)}px` }"
              />
            </template>
          </template>
        </template>

        <!-- Fork (|\) and join (|/) drawn as curves between lane 0 and lane 2 -->
        <svg
          v-else
          :width="row.graph.length * CELL + CELL"
          height="20"
          class="block overflow-visible"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
        >
          <line v-if="row.graph[0] === '|'" :x1="laneX(0)" y1="0" :x2="laneX(0)" y2="20" />
          <path
            v-if="row.graph[1] === '\\'"
            :d="`M ${laneX(0)} 0 C ${laneX(0)} 12, ${laneX(2)} 8, ${laneX(2)} 20`"
          />
          <path v-else :d="`M ${laneX(2)} 0 C ${laneX(2)} 12, ${laneX(0)} 8, ${laneX(0)} 20`" />
        </svg>
      </div>

      <!-- Commit -->
      <div
        v-if="row.kind === 'commit'"
        :class="row.merge ? 'pb-1' : row.nested ? 'pb-4' : 'pb-7'"
        class="ml-3 min-w-0 flex-1 print:ml-0 print:pb-2"
      >
        <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <p class="leading-6">
            <span class="font-mono text-amber-600 dark:text-amber-400 print:hidden">{{
              row.hash
            }}</span>
            <span v-if="row.isHead" class="font-mono font-bold print:hidden">
              <span class="font-normal text-neutral-500"> (</span>
              <span class="text-cyan-600 dark:text-cyan-400">HEAD -&gt; </span>
              <span class="text-accent">main</span>
              <span class="font-normal text-neutral-500">)</span>
            </span>
            <span v-if="row.merge" class="font-mono text-neutral-500 print:hidden">
              Merge branch
            </span>
            {{ ' ' }}
            <span
              :class="row.nested ? 'text-sm' : 'text-base'"
              class="font-semibold text-neutral-900 dark:text-neutral-50 print:text-black"
              >{{ row.title }}</span
            >
          </p>
          <p
            :class="row.nested ? 'print:hidden' : ''"
            class="shrink-0 font-mono text-xs leading-6 text-neutral-500 tabular-nums dark:text-neutral-400 print:font-sans print:text-black"
          >
            {{ row.period }}
          </p>
        </div>

        <p
          v-if="row.subtitle"
          class="font-mono text-xs text-accent print:font-sans print:text-sm print:text-neutral-800"
        >
          <span aria-hidden="true" class="print:hidden">@ </span>{{ row.subtitle }}
        </p>

        <ul
          v-if="row.bullets.length"
          class="mt-1.5 space-y-1 leading-relaxed text-neutral-700 dark:text-neutral-300 print:mt-1 print:space-y-0.5 print:text-black"
        >
          <li v-for="(bullet, b) in row.bullets" :key="b" class="flex items-start gap-2">
            <span
              aria-hidden="true"
              class="font-mono text-neutral-400 dark:text-neutral-600 print:font-sans print:text-neutral-700"
              >-</span
            >
            <span>{{ bullet }}</span>
          </li>
        </ul>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { earliest, formatPeriod, latest } from '@/utils/period'
import type { Locale } from '@/content'
import type { TExperience } from '@/content/types'

type TGraphCell = ' ' | '|' | '*' | '\\' | '/'

type TCommitRow = {
  kind: 'commit'
  key: string
  graph: TGraphCell[]
  hash: string
  title: string
  subtitle?: string
  period: string
  bullets: string[]
  merge: boolean
  nested: boolean
  isHead: boolean
  isLast: boolean
}

type TEdgeRow = {
  kind: 'edge'
  key: string
  graph: TGraphCell[]
  isLast: boolean
}

const props = defineProps<{
  items: TExperience[]
  locale: Locale
}>()
const CELL = 12
// +0.5 keeps 1px lines on whole pixels
const laneX = (lane: number): number => lane * CELL + CELL / 2 + 0.5

// Deterministic fake short SHA (FNV-1a) so hashes stay stable between renders
const shortHash = (input: string): string => {
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}

/**
 * Flattens experience into `git log --graph` rows. A company with one role is
 * a single commit; a company with several roles is a merged branch:
 *   *   Merge branch 'Avast'
 *   |\
 *   | * newest role
 *   | * older role
 *   |/
 */
const rows = computed((): (TCommitRow | TEdgeRow)[] => {
  const result: (TCommitRow | TEdgeRow)[] = []

  props.items.forEach((exp) => {
    const commit = (
      partial: Pick<TCommitRow, 'graph' | 'title' | 'period' | 'bullets'> &
        Partial<Pick<TCommitRow, 'subtitle' | 'merge' | 'nested'>>,
    ): TCommitRow => ({
      kind: 'commit',
      key: `${exp.company}:${partial.title}`,
      hash: shortHash(`${exp.company}:${partial.title}`),
      merge: false,
      nested: false,
      isHead: false,
      isLast: false,
      ...partial,
    })

    const [onlyRole] = exp.roles
    if (exp.roles.length === 1 && onlyRole) {
      result.push(
        commit({
          graph: ['*'],
          title: onlyRole.title,
          subtitle: exp.company,
          period: formatPeriod(onlyRole.from, onlyRole.to, props.locale),
          bullets: onlyRole.bullets,
        }),
      )
      return
    }

    const from = earliest(exp.roles.map((r) => r.from))
    const to = latest(exp.roles.map((r) => r.to))
    result.push(
      commit({
        graph: ['*'],
        title: exp.company,
        period: formatPeriod(from, to, props.locale),
        bullets: [],
        merge: true,
      }),
    )
    result.push({ kind: 'edge', key: `${exp.company}:fork`, graph: ['|', '\\'], isLast: false })
    exp.roles.forEach((role) => {
      result.push(
        commit({
          graph: ['|', ' ', '*'],
          title: role.title,
          period: formatPeriod(role.from, role.to, props.locale),
          bullets: role.bullets,
          nested: true,
        }),
      )
    })
    result.push({ kind: 'edge', key: `${exp.company}:join`, graph: ['|', '/'], isLast: false })
  })

  const first = result[0]
  if (first?.kind === 'commit' && props.items[0]?.roles.some((r) => r.to === 'present')) {
    first.isHead = true
  }

  // The graph ends at the last row: no line hanging below it
  const last = result[result.length - 1]
  if (last) {
    last.isLast = true
    if (last.kind === 'edge') last.graph = [' ', '/']
  }

  return result
})
</script>
