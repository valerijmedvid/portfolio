import { ref, computed, type ComputedRef, type Ref } from 'vue'

type Mode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme'
const DARK_CLASS = 'dark'

const mode = ref<Mode>('system')
const systemPrefersDark = ref(false)
const isDark = computed((): boolean =>
  mode.value === 'system' ? systemPrefersDark.value : mode.value === 'dark',
)

let initialized = false

function apply(): void {
  document.documentElement.classList.toggle(DARK_CLASS, isDark.value)
}

function init(): void {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    mode.value = stored
  }

  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  systemPrefersDark.value = mql.matches
  mql.addEventListener('change', (e) => {
    systemPrefersDark.value = e.matches
    if (mode.value === 'system') apply()
  })

  apply()

  // Force light mode for print (Cmd+P or Export PDF) without losing user preference
  window.addEventListener('beforeprint', () => {
    document.documentElement.classList.remove(DARK_CLASS)
  })
  window.addEventListener('afterprint', apply)
}

function toggle(): void {
  mode.value = isDark.value ? 'light' : 'dark'
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, mode.value)
    apply()
  }
}

export function useTheme(): {
  mode: Ref<Mode>
  isDark: ComputedRef<boolean>
  toggle: () => void
} {
  init()
  return { mode, isDark, toggle }
}
