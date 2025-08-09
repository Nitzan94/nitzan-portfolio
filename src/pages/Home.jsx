import React from 'react'
import Button from '../components/Button'

function Home() {
  const handleClick = () => {
    alert('Hello from Claude Code Enterprise!')
  }

  return (
    <div className="home">
      <h2>Welcome to Your React App!</h2>
      <p>This template includes:</p>
      <ul>
        <li>✅ Vite for fast development</li>
        <li>✅ TypeScript support</li>
        <li>✅ Testing with Vitest</li>
        <li>✅ Enterprise-grade structure</li>
      </ul>
      <Button variant="primary" onClick={handleClick}>
        Test Button
      </Button>
    </div>
  )
}

export default Home
