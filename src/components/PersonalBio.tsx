import Vili from '../assets/images/vili.webp'

export default function PersonalBio() {
  const now = new Date()
  const age = now.getFullYear() - 1990

  return (
    <article className='mt-5 flex flex-col justify-center items-center'>
      <img src={Vili} alt='portrait' className='mb-7' style={{ width: '11em', height: '11em' }} />

      <h1 className='font-sans text-xl font-bold'>Valerij Medviď</h1>

      <p className='mt-3 ml-1 font-mono text-md font-medium text-center'>
        I&apos;m {age} years old. I&apos;m interested in <strong>IT</strong>,{' '}
        <strong>application development</strong> and <strong>production deployment</strong>. I enjoy
        learning new things and improving my skills. My hobbies include creating{' '}
        <strong>IoT</strong> based gadgets and smart homes. I like to spend my free time doing{' '}
        <strong>sports</strong>, <strong>going on trips</strong> or{' '}
        <strong>riding my motor bike</strong>.
      </p>
    </article>
  )
}
