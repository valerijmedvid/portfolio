import Logo from './assets/images/logo.svg'
import Vili from './assets/images/vili.png'

export default function App() {
  const now = new Date()
  const age = now.getFullYear() - 1990

  return (
    <div className='container h-screen mx-auto p-4'>
      <header>
        <img
          src={Logo}
          alt='logo'
          style={{ width: '3em', height: '3em', animation: 'tilt-shaking 1s linear infinite' }}
        />
      </header>
      <article className='mt-10 flex flex-col justify-center items-center'>
        <img src={Vili} alt='portrait' style={{ width: '10em', height: '10em' }} />

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
    </div>
  )
}
