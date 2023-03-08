type WorkPeriod = {
  start: Date
  end: Date | null
}

type Work = {
  position: string
  company: string
  link: string
  period: WorkPeriod
  description: string
}

type ExperienceList = Work[]

const Experiences: ExperienceList = [
  {
    company: 'Košík s.r.o.',
    position: 'Frontend developer',
    link: 'https://www.kosik.cz/',
    period: { start: new Date('2022-06-1'), end: null },
    description: 'Scrum · Komunikace · JS · SQL · Git · JavaScript · Vue · Docker',
  },
  {
    company: 'Avast s.r.o.',
    position: 'Software Engineer',
    link: 'https://www.avast.com/',
    period: { start: new Date('2019-03-1'), end: new Date('2022-05-31') },
    description: 'Python · JS · PostgreSQL · SQL · Git · JavaScript · Vue · Docker',
  },
  {
    company: 'Avast s.r.o.',
    position: 'Senior Threat Operations Analyst',
    link: 'https://www.avast.com/',
    period: { start: new Date('2012-10-1'), end: new Date('2019-02-28') },
    description: 'Python · JS · SQL · Git · Laravel',
  },
  {
    company: 'APS Czech Republic a.s.',
    position: 'IT & Database specialist',
    link: 'https://cz.aps-holding.com/',
    period: { start: new Date('2011-10-1'), end: new Date('2012-09-30') },
    description:
      'IT administration, configuration & installation. Database development & optimization.',
  },
]

export default function WorkExperience() {
  return (
    <div className='m-12 font-sans text-center'>
      <h2 className='font-sans text-2xl text-center font-bold mb-10'>Work experience</h2>
      {Experiences.map((experience, index) => (
        <article key={index} className='mb-8'>
          <h3 className='font-bold accent'>
            {experience.position}
            <a href={experience.link}>
              <span className='text-black accent-hover hover:text-gray-500 ml-1'>
                @{experience.company}
              </span>
            </a>
          </h3>
          <p className='text-gray-500'>
            {experience.period.start.getFullYear()} -{' '}
            {experience.period.end ? experience.period.end.getFullYear() : 'presence'}
          </p>
          <p>{experience.description}</p>
        </article>
      ))}
    </div>
  )
}
