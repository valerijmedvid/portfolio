import type { YearMonth } from '@/utils/period'

export type TSkill = {
  label: string
  printHidden?: boolean
}

export type TSkillGroup = {
  label: string
  skills: TSkill[]
}

export type TRole = {
  title: string
  from: YearMonth
  to: YearMonth
  bullets: string[]
  /** Show "2006 – 2010" instead of months + duration (used for education) */
  yearsOnly?: boolean
}

export type TExperience = {
  company: string
  roles: TRole[]
}

export type TEducation = {
  school: string
  field: string
  from: YearMonth
  to: YearMonth
  bullets: string[]
}

/** Everything that differs between language mutations. Contacts live in `contact.ts`. */
export type TContent = {
  profile: {
    role: string
    /** Rotating lines typed out under the name (screen only); first one should match `role` */
    taglines: string[]
    location: string
    languages: string
    availability: string
    yearsInIt: (years: number) => string
    summary: (years: number) => string
  }
  headings: {
    about: string
    skills: string
    skillsPrint: string
    experience: string
    education: string
    contact: string
  }
  contactCta: string
  actions: {
    email: string
    exportPdf: string
    switchToLight: string
    switchToDark: string
    /** Short code of the *other* language, shown on the switch button */
    otherLanguage: string
    switchLanguage: string
  }
  /** Traffic-light buttons and the business-card view */
  window: {
    reload: string
    card: string
    restore: string
    fullscreen: string
    openPortfolio: string
  }
  /** Interactive terminal at the end of the page */
  terminal: {
    hint: string
    inputLabel: string
    help: { command: string; description: string }[]
    notFound: (command: string) => string
    hireDenied: string
    hireGranted: string
    rmRf: string
    exit: string
    coffee: string
    langSet: string
    themeSet: (dark: boolean) => string
  }
  skillGroups: TSkillGroup[]
  experience: TExperience[]
  education: TEducation[]
}
