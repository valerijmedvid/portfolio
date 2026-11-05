import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

const TYPE_MS = 32
const DELETE_MS = 16
const HOLD_MS = 1600
const GAP_MS = 200

/**
 * Types each phrase char by char, holds it, deletes it and moves to the next — forever.
 * Restarts from the first phrase when `phrases` changes (e.g. locale switch).
 * With prefers-reduced-motion the first phrase is shown statically.
 */
export function useTypewriter(phrases: Ref<string[]>): Ref<string> {
  const text = ref('')
  let timer: number | undefined

  const stop = (): void => {
    if (timer !== undefined) window.clearTimeout(timer)
    timer = undefined
  }

  const run = (phraseIndex: number, charCount: number, deleting: boolean): void => {
    const list = phrases.value
    const phrase = list[phraseIndex % list.length] ?? ''
    text.value = phrase.slice(0, charCount)

    if (!deleting && charCount < phrase.length) {
      timer = window.setTimeout(() => run(phraseIndex, charCount + 1, false), TYPE_MS)
    } else if (!deleting) {
      timer = window.setTimeout(() => run(phraseIndex, charCount, true), HOLD_MS)
    } else if (charCount > 0) {
      timer = window.setTimeout(() => run(phraseIndex, charCount - 1, true), DELETE_MS)
    } else {
      timer = window.setTimeout(() => run(phraseIndex + 1, 0, false), GAP_MS)
    }
  }

  const start = (): void => {
    stop()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      text.value = phrases.value[0] ?? ''
      return
    }
    run(0, 0, false)
  }

  onMounted(start)
  watch(phrases, start)
  onBeforeUnmount(stop)

  return text
}
