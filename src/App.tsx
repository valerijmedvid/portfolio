import AppHeader from './components/AppHeader'
import PersonalBio from './components/PersonalBio'
import SocialLinks from './components/SocialMedia'
import WorkExperience from './components/WorkExperience'

export default function App() {
  return (
    <div className='max-w-5xl h-screen mx-auto p-4'>
      <AppHeader />
      <main>
        <PersonalBio />
        <SocialLinks />
        <WorkExperience />
      </main>
    </div>
  )
}
