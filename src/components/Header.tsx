type HeaderProps = {
  currentPage: 'home' | 'about'
  onNavigate: (page: 'home' | 'about') => void
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container nav-bar">
        <button
          type="button"
          className="brand brand-button"
          aria-label="Pawly home"
          onClick={() => onNavigate('home')}
        >
          <span className="brand-mark">🐾</span>
          <div className="brand-copy">
            <strong>Pawly</strong>
          </div>
        </button>

        <div className="header-actions">
          <button
            type="button"
            className={`btn ${currentPage === 'home' ? 'btn-primary' : 'btn-secondary'} header-link`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={`btn ${currentPage === 'about' ? 'btn-primary' : 'btn-secondary'} nav-cta`}
            onClick={() => onNavigate('about')}
          >
            About Me
          </button>
        </div>
      </div>
    </header>
  )
}
