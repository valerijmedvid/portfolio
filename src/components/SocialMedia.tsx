type SocialMedia = {
  name: string
  link: string
}

export default function SocialLinks() {
  const socialMediaLinks: SocialMedia[] = [
    { name: 'GitHub', link: 'https://github.com/valerijmedvid' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/in/valerijmedvid/' },
    { name: 'Twitter', link: 'https://twitter.com/valerijmedvid' },
  ]
  return (
    <div className='mt-10 flex flex-row flex-wrap justify-center'>
      {socialMediaLinks.map((link, index) => {
        return (
          <a href={link.link} key={index}>
            <button className='bg-transparent hover:bg-sky-400 text-gray-700 font-semibold hover:text-white py-4 px-8 border border-gray-500 hover:border-transparent rounded m-3'>
              {link.name}
            </button>
          </a>
        )
      })}
    </div>
  )
}
