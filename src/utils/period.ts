const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export type YearMonth = `${number}-${number}` | 'present'

function parseYearMonth(s: YearMonth): Date {
  if (s === 'present') return new Date()
  return new Date(Number(s.slice(0, 4)), Number(s.slice(5, 7)) - 1, 1)
}

function formatYearMonth(s: YearMonth): string {
  if (s === 'present') return 'present'
  const d = parseYearMonth(s)
  return `${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`
}

function diffMonths(from: YearMonth, to: YearMonth): number {
  const a = parseYearMonth(from)
  const b = parseYearMonth(to)
  const months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
  return Math.max(months + 1, 1)
}

function formatDuration(months: number): string {
  const years = Math.floor(months / 12)
  const mo = months % 12
  const parts: string[] = []
  if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`)
  if (mo > 0 || parts.length === 0) parts.push(`${mo} mo`)
  return parts.join(' ')
}

export function formatPeriod(from: YearMonth, to: YearMonth): string {
  return `${formatYearMonth(from)} – ${formatYearMonth(to)} · ${formatDuration(diffMonths(from, to))}`
}

export function yearsSince(from: YearMonth): number {
  return Math.floor(diffMonths(from, 'present') / 12)
}

export function earliest(values: YearMonth[]): YearMonth {
  return values.reduce((min, v) => (parseYearMonth(v) < parseYearMonth(min) ? v : min))
}

export function latest(values: YearMonth[]): YearMonth {
  return values.reduce((max, v) => (parseYearMonth(v) > parseYearMonth(max) ? v : max))
}
