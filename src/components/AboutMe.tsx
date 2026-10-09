import profilePic from '../assets/profilepic.png'

const storyPoints = [
  {
    title: 'Compassion first',
    text: 'We believe every dog deserves a safe place, thoughtful care, and a future built on trust.',
  },
  {
    title: 'Care with purpose',
    text: 'From rescue to recovery, we focus on the health, comfort, and emotional well-being of every dog.',
  },
  {
    title: 'Families for life',
    text: 'We match each dog with the right home through gentle guidance, support, and long-term care.',
  },
]

const stats = [
  { value: '8+', label: 'Years of rescue work' },
  { value: '500+', label: 'Dogs supported' },
  { value: '100%', label: 'Volunteer-led care' },
]

export default function AboutMe() {
  return (
    <section className="about-section" id="about">
      <div className="container about-bio-wrap">
        <div className="about-image about-portrait">
          <img src={profilePic} alt="Dog rescue volunteer with a rescued dog" />
        </div>

        <div className="about-copy bio-copy">
          <h2>Cayanan, Airoen Boevey G.</h2>
          <p className="bio-role">Founder & Rescue Advocate</p>

          <div className="bio-details">
            <p>Practice Group: Dog Rescue & Community Care</p>
            <p>Location: Angeles City</p>
            <p>Email: cayanan.airoenboevey@student.auf.edu.ph</p>
            <p>Phone: (63) 912 345 6789</p>
            <p>Course: Information Technology at Angeles University Foundation</p>
          </div>

          <div className="bio-story">
            <p>
              I started Pawly after seeing how many loving dogs were waiting in shelters, overlooked and in need
              of care. What began as a small act of kindness grew into a mission to help dogs heal, feel safe,
              and find forever homes where they are truly valued.
            </p>
            <p>
              Every rescue has a story. Some arrive frightened and unsure, while others need medical attention,
              patience, and time to trust again. I believe that every dog deserves a future shaped by dignity,
              comfort, and unconditional love.
            </p>
          </div>
        </div>
      </div>

      <div className="container values-section">
        <div className="values-header">
          <p className="eyebrow">My mission</p>
          <h3>What guides every rescue and every adoption.</h3>
        </div>

        <div className="values-grid">
          {storyPoints.map((point) => (
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
