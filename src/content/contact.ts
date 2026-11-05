// Language-independent personal data

export const contact = {
  name: 'Valerij Medviď',
  github: { label: 'github.com/valerijmedvid', href: 'https://github.com/valerijmedvid' },
  linkedin: {
    label: 'linkedin.com/in/valerijmedvid',
    href: 'https://www.linkedin.com/in/valerijmedvid/',
  },
  // Email is split and assembled only after mount (see HeroHeader) so the full
  // address never appears in the server-rendered HTML — keeps scrapers away
  email: { user: 'vmedvid', domain: 'gmail.com' },
}
