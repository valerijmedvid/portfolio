import { onMounted, ref, type Ref } from 'vue'
import { contact } from '@/content/contact'

/**
 * The full address is assembled only after mount so it never appears in the
 * server-rendered HTML — keeps scrapers away. Empty string until then.
 */
export function useEmail(): { address: Ref<string>; href: Ref<string> } {
  const address = ref('')
  const href = ref('')

  onMounted(() => {
    address.value = `${contact.email.user}@${contact.email.domain}`
    href.value = `mailto:${address.value}`
  })

  return { address, href }
}
