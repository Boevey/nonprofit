import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Homepage from './components/Homepage'
import AboutMe from './components/AboutMe'
import Footer from './components/Footer'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="app-shell">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {currentPage === 'home' ? <Homepage /> : <AboutMe />}
      <Footer />
    </div>
  )
}

export default App
