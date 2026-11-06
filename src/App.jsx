import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Homepage from './components/Homepage'
import AboutMe from './components/AboutMe'
import Footer from './components/Footer'
import DonationModal from './components/DonationModal'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isDonationOpen, setIsDonationOpen] = useState(false)

  return (
    <div className="app-shell">
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onDonate={() => setIsDonationOpen(true)}
      />
      {currentPage === 'home' ? (
        <Homepage onDonate={() => setIsDonationOpen(true)} />
      ) : (
        <AboutMe />
      )}
      <Footer />
      {isDonationOpen && <DonationModal onClose={() => setIsDonationOpen(false)} />}
    </div>
  )
}

export default App
