<template>
  <!-- Tiny fake shell: type `help`. Screen only. -->
  <div
    class="mt-6 rounded-lg border border-black/10 bg-neutral-50 p-4 font-mono text-xs leading-relaxed dark:border-white/10 dark:bg-black/40 sm:text-sm print:hidden"
    @click="focusInput"
  >
    <p class="mb-2 text-neutral-500">{{ content.terminal.hint }}</p>

    <div
      ref="scroller"
      aria-live="polite"
      class="max-h-72 overflow-y-auto whitespace-pre-wrap break-words"
    >
      <p v-for="(line, i) in lines" :key="i" :class="lineClass[line.kind]">
        <template v-if="line.kind === 'input'"
          ><span class="text-accent" aria-hidden="true">~ $ </span>{{ line.text }}</template
        >
        <template v-else>{{ line.text }}</template>
      </p>
    </div>

    <form class="flex items-center" @submit.prevent="submit">
      <span class="shrink-0 text-accent" aria-hidden="true">~ $&nbsp;</span>
      <input
        ref="input"
        v-model="draft"
        type="text"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        :aria-label="content.terminal.inputLabel"
        class="min-w-0 flex-1 bg-transparent text-neutral-900 caret-accent outline-none dark:text-neutral-100"
        @keydown.up.prevent="browseHistory(-1)"
        @keydown.down.prevent="browseHistory(1)"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue'
import { useEmail } from '@/composables/useEmail'
import { useLocale } from '@/composables/useLocale'
import { useTheme } from '@/composables/useTheme'
import { contact } from '@/content/contact'
import { earliest, latest } from '@/utils/period'

type TLine = { kind: 'input' | 'output' | 'error' | 'accent'; text: string }

const props = defineProps<{
  yearsInIt: number
}>()

const { content, locale, toggle: toggleLocale } = useLocale()
const { isDark, toggle: toggleTheme } = useTheme()
const email = useEmail()

const lineClass: Record<TLine['kind'], string> = {
  input: 'text-neutral-900 dark:text-neutral-100',
  output: 'text-neutral-600 dark:text-neutral-400',
  error: 'text-rose-600 dark:text-rose-400',
  accent: 'text-accent',
}

const lines = ref<TLine[]>([])
const draft = ref('')
const history: string[] = []
let historyIndex = 0

const input = useTemplateRef('input')
const scroller = useTemplateRef('scroller')

const focusInput = (): void => {
  // Don't steal a text selection the visitor is making
  if (!window.getSelection()?.toString()) input.value?.focus({ preventScroll: true })
}

const print = (kind: TLine['kind'], text: string): void => {
  lines.value.push({ kind, text })
}

const dirName = (label: string): string =>
  label
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '')

const yearOf = (value: string): string => (value === 'present' ? 'now' : value.slice(0, 4))

const commands: Record<string, (args: string[]) => void> = {
  help: () => {
    const width = Math.max(...content.value.terminal.help.map((h) => h.command.length))
    content.value.terminal.help.forEach((h) =>
      print('output', `${h.command.padEnd(width + 2)}${h.description}`),
    )
  },
  whoami: () => print('accent', `${contact.name} — ${content.value.profile.role}`),
  about: () => print('output', content.value.profile.summary(props.yearsInIt)),
  skills: () => {
    const dirs = content.value.skillGroups.map((g) => `${dirName(g.label)}/`)
    const width = Math.max(...dirs.map((d) => d.length))
    content.value.skillGroups.forEach((g, i) =>
      print(
        'output',
        `${(dirs[i] ?? '').padEnd(width + 2)}${g.skills.map((s) => s.label).join(' · ')}`,
      ),
    )
  },
  experience: () =>
    content.value.experience.forEach((e) => {
      const from = yearOf(earliest(e.roles.map((r) => r.from)))
      const to = yearOf(latest(e.roles.map((r) => r.to)))
      print('output', `${from}–${to}  ${e.roles[0]?.title ?? ''} @ ${e.company}`)
    }),
  contact: () => {
    if (email.address.value) print('output', `email     ${email.address.value}`)
    print('output', `github    ${contact.github.label}`)
    print('output', `linkedin  ${contact.linkedin.label}`)
  },
  'hire-me': () => print('error', content.value.terminal.hireDenied),
  sudo: (args) => {
    if (args[0] === 'hire-me') {
      content.value.terminal.hireGranted.split('\n').forEach((t) => print('accent', t))
      window.setTimeout(() => {
        if (email.href.value) window.location.href = email.href.value
      }, 900)
    } else {
      print('error', content.value.terminal.hireDenied)
    }
  },
  lang: (args) => {
    const wanted = args[0]
    if (wanted !== locale.value && (wanted === undefined || wanted === 'cs' || wanted === 'en')) {
      toggleLocale()
    }
    print('accent', content.value.terminal.langSet)
  },
  theme: () => {
    toggleTheme()
    print('accent', content.value.terminal.themeSet(isDark.value))
  },
  clear: () => (lines.value = []),
  date: () => print('output', new Date().toLocaleString(locale.value)),
  echo: (args) => print('output', args.join(' ')),
  rm: (args) =>
    args.some((a) => a.startsWith('-') && a.includes('r'))
      ? print('error', content.value.terminal.rmRf)
      : print('error', content.value.terminal.notFound('rm')),
  exit: () => print('accent', content.value.terminal.exit),
  coffee: () => print('accent', content.value.terminal.coffee),
}
// Aliases that read like real shell commands
commands['cat'] = (args): void => (args[0] === 'about.md' ? commands.about?.([]) : undefined)
commands['ls'] = (): void => commands.skills?.([])
commands['git'] = (): void => commands.experience?.([])

const submit = async (): Promise<void> => {
  const raw = draft.value.trim()
  draft.value = ''
  if (!raw) return
  history.push(raw)
  historyIndex = history.length

  print('input', raw)
  const [name = '', ...args] = raw.split(/\s+/)
  const command = commands[name.toLowerCase()]
  if (command) command(args)
  else print('error', content.value.terminal.notFound(name))

  await nextTick()
  if (scroller.value) scroller.value.scrollTop = scroller.value.scrollHeight
}

const browseHistory = (step: number): void => {
  if (!history.length) return
  historyIndex = Math.min(Math.max(historyIndex + step, 0), history.length)
  draft.value = history[historyIndex] ?? ''
}
</script>
