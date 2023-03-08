import AppHeader from './components/AppHeader'
import PersonalBio from './components/PersonalBio'
import SocialLinks from './components/SocialMedia'

export default function App() {
  return (
    <div className='max-w-5xl h-screen mx-auto p-4'>
      <AppHeader />
      <PersonalBio />
      <SocialLinks />
    </div>
  )
}
