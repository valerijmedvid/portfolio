import Logo from './assets/images/logo.svg'
import Vili from './assets/images/vili.png'

interface ISocialMedia {
  name: string
  link: string
}

export default function App() {
  const now = new Date()
  const age = now.getFullYear() - 1990

  const socialMediaLinks: ISocialMedia[] = [
    { name: 'GitHub', link: 'https://github.com/valerijmedvid' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/in/valerijmedvid/' },
    { name: 'Twitter', link: 'https://twitter.com/valerijmedvid' },
  ]

  return (
    <div className='container h-screen mx-auto p-4'>
      <header>
        <img
          src={Logo}
          alt='logo'
          style={{ width: '3em', height: '3em', animation: 'tilt-shaking 5s linear infinite' }}
        />
      </header>
      <article className='mt-5 flex flex-col justify-center items-center'>
        <img src={Vili} alt='portrait' className='mb-7' style={{ width: '10em', height: '10em' }} />

        <h1 className='font-sans text-xl font-bold'>Valerij Medviď</h1>

        <p className='mt-3 ml-1 font-mono text-md font-medium'>
          I&apos;m {age} years old. I&apos;m interested in <strong>IT</strong>,{' '}
          <strong>application development</strong> and <strong>production deployment</strong>. I
          enjoy learning new things and improving my skills. My hobbies include creating{' '}
          <strong>IoT</strong> based gadgets and smart homes. I like to spend my free time doing
          <strong>sports</strong>, <strong>going on trips</strong> or{' '}
          <strong>riding my motor bike</strong>.
        </p>
      </article>

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
    </div>
  )
}
