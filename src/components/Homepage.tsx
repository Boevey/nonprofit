const stats = [
  { value: '2.4k+', label: 'Dogs rescued' },
  { value: '94%', label: 'Placed home' },
  { value: '24/7', label: 'Care support' },
]

const missionCards = [
  {
    title: 'Rescue',
    description: 'We bring in dogs in urgent need and provide immediate safety and medical care.',
  },
  {
    title: 'Restore',
    description: 'Our foster community helps each dog heal physically and emotionally in a calm home.',
  },
  {
    title: 'Rehome',
    description: 'We match every dog with a loving family using thoughtful, lasting adoption support.',
  },
]

const featuredDogs = [
  {
    name: 'Milo',
    age: '2 yrs',
    image:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Luna',
    age: '4 yrs',
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Buddy',
    age: '1 yr',
    image:
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=900&q=80',
  },
]

export default function Homepage() {
  return (
    <main id="home">
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Every dog deserves a second chance</p>
            <h1>We rescue dogs and help them find home.</h1>
            <p className="hero-text">
              Pawly is a modern dog rescue nonprofit focused on safe shelter, compassionate care,
              and long-term adoption support for vulnerable dogs.
            </p>

            <div className="hero-actions">
              <a href="#adopt" className="btn btn-primary">
                Adopt a Dog
              </a>
              <a href="#mission" className="btn btn-secondary">
                Learn More
              </a>
            </div>

            <div className="stats-row" aria-label="Organization statistics">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-box">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-label="Happy rescued dog">
            <img
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80"
              alt="Happy rescued dog"
            />
            <div className="floating-card card-top">
              <span>4.9/5 rescue experience</span>
            </div>
            <div className="floating-card card-bottom">
              <strong>12 dogs</strong>
              <span>ready for adoption</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-section" id="mission">
        <div className="container section-header">
          <p className="eyebrow dark">Our mission</p>
          <h2>Simple care, real change.</h2>
        </div>

        <div className="container mission-grid">
          {missionCards.map((card) => (
            <article key={card.title} className="mission-card">
              <div className="icon-wrap" aria-hidden="true">
                {card.title === 'Rescue' ? '🐶' : card.title === 'Restore' ? '💛' : '🏡'}
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="adoption-section" id="adopt">
        <div className="container section-header split-heading">
          <div>
            <p className="eyebrow dark">Meet our dogs</p>
            <h2>Ready to meet their forever family.</h2>
          </div>
          <button type="button" className="btn btn-primary">
            View dogs
          </button>
        </div>

        <div className="container dog-grid">
          {featuredDogs.map((dog) => (
            <article key={dog.name} className="dog-card">
              <img src={dog.image} alt={dog.name} />
              <div className="dog-info">
                <div className="dog-name-row">
                  <h3>{dog.name}</h3>
                  <span>{dog.age}</span>
                </div>
                <p>Friendly, lovable, and ready for a safe and happy life with a caring family.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section" id="about">
        <div className="container cta-box">
          <div>
            <p className="eyebrow">Support the mission</p>
            <h2>Help us give dogs the care, comfort, and safety they deserve.</h2>
          </div>
          <button type="button" className="btn btn-primary">
            Donate now
          </button>
        </div>
      </section>
    </main>
  )
}
