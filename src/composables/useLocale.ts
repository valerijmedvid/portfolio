import { ref, computed, type ComputedRef, type Ref } from 'vue'
import { contentByLocale, type Locale } from '@/content'
import type { TContent } from '@/content/types'

const STORAGE_KEY = 'locale'

const locale = ref<Locale>('en')
const content = computed((): TContent => contentByLocale[locale.value])

let initialized = false

function isLocale(value: unknown): value is Locale {
  return value === 'cs' || value === 'en'
}

function apply(): void {
  document.documentElement.lang = locale.value
}

function init(): void {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  const stored = localStorage.getItem(STORAGE_KEY)
  if (isLocale(stored)) {
    locale.value = stored
  } else {
    // Czech and Slovak visitors get the Czech version, everyone else English
    const browser = navigator.language.slice(0, 2).toLowerCase()
    locale.value = browser === 'cs' || browser === 'sk' ? 'cs' : 'en'
  }

  apply()
}

function toggle(): void {
  locale.value = locale.value === 'cs' ? 'en' : 'cs'
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, locale.value)
    apply()
  }
}

export function useLocale(): {
  locale: Ref<Locale>
  content: ComputedRef<TContent>
  toggle: () => void
} {
  init()
  return { locale, content, toggle }
}
