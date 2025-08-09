import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ArchitectureDetails from './pages/ArchitectureDetails'
import './styles/App.css'
import './styles/Portfolio.css'
import './styles/EditMode.css'
import './styles/BuildProcess.css'
import './styles/ArchitectureDetails.css'

function App() {
  return (
    <Router>
      <div className="app">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/architecture" element={<ArchitectureDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
