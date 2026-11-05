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
    location: string
    languages: string
    availability: string
    yearsInIt: (years: number) => string
    summary: (years: number) => string
  }
  headings: {
    skills: string
    experience: string
    education: string
  }
  actions: {
    email: string
    exportPdf: string
    switchToLight: string
    switchToDark: string
    /** Short code of the *other* language, shown on the switch button */
    otherLanguage: string
    switchLanguage: string
  }
  skillGroups: TSkillGroup[]
  experience: TExperience[]
  education: TEducation[]
}
