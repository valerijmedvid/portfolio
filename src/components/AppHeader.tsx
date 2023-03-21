import Logo from '../assets/images/logo.svg'

export default function AppHeader() {
  return (
    <header>
      <img src={Logo} alt='logo' style={{ width: '18em' }} width='288' height='67' />
    </header>
  )
}
