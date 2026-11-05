import { cs } from './cs'
import { en } from './en'
import type { TContent } from './types'

export type Locale = 'cs' | 'en'

export const contentByLocale: Record<Locale, TContent> = { cs, en }
