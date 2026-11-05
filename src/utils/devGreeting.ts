import { contact } from '@/content/contact'

/** A hello for the curious ones who open DevTools. */
export function printDevGreeting(): void {
  const email = `${contact.email.user}@${contact.email.domain}`
  const accent = 'color:#10b981;font-family:monospace'

  /* eslint-disable no-console -- the console *is* the feature here */
  console.log('%c> Hi, fellow dev! 👋', `${accent};font-size:16px;font-weight:bold`)
  console.log(
    `%cThanks for peeking under the hood.\nBuilt with Vue 3 + TypeScript + Tailwind v4.\nLooking for a Vue developer? → ${email}\nPS: there's a working terminal at the bottom of the page — type %chelp`,
    'font-family:monospace;font-size:12px',
    `${accent};font-weight:bold;font-size:12px`,
  )
  /* eslint-enable no-console */
}
