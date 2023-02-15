import Logo from './assets/images/logo.svg'

export default function App() {
  return (
    <div className='container h-screen mx-auto flex justify-center items-center'>
      <img
        src={Logo}
        alt='logo'
        style={{ width: '15em', height: '15em', animation: 'tilt-shaking 1s linear infinite' }}
      />
    </div>
  )
}
