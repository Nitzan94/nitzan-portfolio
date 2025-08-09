import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './styles/App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>React Enterprise Template</h1>
          <p>Built with Claude Code Infrastructure</p>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
