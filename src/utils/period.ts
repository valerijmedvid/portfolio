import type { Locale } from '@/content'

export type YearMonth = `${number}-${number}` | 'present'

const PRESENT: Record<Locale, string> = { en: 'present', cs: 'současnost' }

// Plural forms per Intl.PluralRules category ('one' | 'few' | 'many' | 'other')
const YEAR_UNIT: Record<Locale, Partial<Record<Intl.LDMLPluralRule, string>>> = {
  en: { one: 'yr', other: 'yrs' },
  cs: { one: 'rok', few: 'roky', other: 'let' },
}
const MONTH_UNIT: Record<Locale, string> = { en: 'mo', cs: 'měs.' }

function parseYearMonth(s: YearMonth): Date {
  if (s === 'present') return new Date()
  return new Date(Number(s.slice(0, 4)), Number(s.slice(5, 7)) - 1, 1)
}

function formatYearMonth(s: YearMonth, locale: Locale): string {
  if (s === 'present') return PRESENT[locale]
  // Czech CVs use "06/2022"; Intl's Czech month names ("červen 2022") are too long for the timeline
  if (locale === 'cs') return `${s.slice(5, 7)}/${s.slice(0, 4)}`
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(
    parseYearMonth(s),
  )
}

function diffMonths(from: YearMonth, to: YearMonth): number {
  const a = parseYearMonth(from)
  const b = parseYearMonth(to)
  const months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
  return Math.max(months + 1, 1)
}

function formatDuration(months: number, locale: Locale): string {
  const years = Math.floor(months / 12)
  const mo = months % 12
  const parts: string[] = []
  if (years > 0) {
    const units = YEAR_UNIT[locale]
    const category = new Intl.PluralRules(locale).select(years)
    parts.push(`${years} ${units[category] ?? units.other}`)
  }
  if (mo > 0 || parts.length === 0) parts.push(`${mo} ${MONTH_UNIT[locale]}`)
  return parts.join(' ')
}

export function formatPeriod(from: YearMonth, to: YearMonth, locale: Locale): string {
  return `${formatYearMonth(from, locale)} – ${formatYearMonth(to, locale)} · ${formatDuration(diffMonths(from, to), locale)}`
}

export function formatYearRange(from: YearMonth, to: YearMonth, locale: Locale): string {
  const year = (v: YearMonth): string => (v === 'present' ? PRESENT[locale] : v.slice(0, 4))
  return `${year(from)} – ${year(to)}`
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
