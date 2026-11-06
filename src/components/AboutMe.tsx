import aboutMeContent from '../data/aboutMe.json'

const aboutMe = aboutMeContent as {
  name: string
  role: string
  focusArea: string
  location: string
  email: string
  phone: string
  course: string
  story: string[]
  stats: Array<{ value: string; label: string }>
  values: Array<{ title: string; text: string }>
  image?: string
}

const profileImage = aboutMe.image

export default function AboutMe() {
  return (
    <section className="about-section" id="about">
      <div className="container about-bio-wrap">
        <div className="about-image about-portrait">
          <img src={profileImage} alt={aboutMe.name} />
        </div>

        <div className="about-copy bio-copy">
          <h2>{aboutMe.name}</h2>
          <p className="bio-role">{aboutMe.role}</p>

          <div className="bio-details">
            <p>Focus Area: {aboutMe.focusArea}</p>
            <p>Location: {aboutMe.location}</p>
            <p>Email: {aboutMe.email}</p>
            <p>Phone: {aboutMe.phone}</p>
            <p>Course: {aboutMe.course}</p>
          </div>

          <div className="bio-story">
            {aboutMe.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="container values-section">
        <div className="values-header">
          <p className="eyebrow">My mission</p>
          <h3>What guides every rescue and every adoption.</h3>
        </div>

        <div className="values-grid">
          {aboutMe.values.map((point) => (
            <article key={point.title} className="value-card">
              <span className="value-icon" aria-hidden="true">
                {point.title === 'Compassion first' ? '❤' : point.title === 'Care with purpose' ? '✦' : '🏠'}
              </span>
              <h4>{point.title}</h4>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}