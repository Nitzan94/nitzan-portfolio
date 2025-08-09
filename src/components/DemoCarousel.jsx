import React, { useState, useEffect } from 'react'

function DemoCarousel({ currentDemo, setCurrentDemo }) {
  const demos = [
    {
      id: 1,
      title: '🎯 יצירת פרויקט אוטומטית',
      description: 'יצירת פרויקט React מלא עם GitHub וVercel בפקודה אחת',
      features: ['GitHub Integration', 'Vercel Config', 'TypeScript Setup', 'Enterprise Structure'],
      code: `./new-project.sh amazing-app --type react
✅ Repository created on GitHub
🚀 Vercel deployment configured  
📦 Dependencies installed
⚡ Development server ready`
    },
    {
      id: 2,
      title: '🤖 MCP Servers Network',
      description: '7 שרתי MCP המספקים יכולות מתקדמות',
      features: ['Memory Management', 'GitHub Operations', 'File System', 'Web Scraping'],
      code: `Available MCP Servers:
├── memory - Project context & decisions
├── github - All GitHub operations  
├── puppeteer - Browser automation
├── filesystem - Advanced file ops
├── fetch - HTTP requests & APIs
└── analytics - Usage tracking`
    },
    {
      id: 3,
      title: '📊 Analytics & Monitoring',
      description: 'מעקב שימוש ואנליטיקה מתקדמת',
      features: ['Usage Tracking', 'Performance Metrics', 'Error Monitoring', 'Custom Dashboards'],
      code: `npm run analytics:dashboard
📈 Usage Analytics Ready
🎯 Performance: 95% efficiency
⚡ Response Time: 0.3s avg
🔍 Error Rate: 0.1%`
    }
  ]

  const nextDemo = () => {
    setCurrentDemo((prev) => (prev + 1) % demos.length)
  }

  const prevDemo = () => {
    setCurrentDemo((prev) => (prev - 1 + demos.length) % demos.length)
  }

  useEffect(() => {
    const interval = setInterval(nextDemo, 8000) // Auto-advance every 8 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="demo-carousel">
      <div className="carousel-container">
        <button className="carousel-btn prev" onClick={prevDemo}>
          ←
        </button>
        
        <div className="demo-content">
          <div className="demo-header">
            <h3>{demos[currentDemo].title}</h3>
            <p>{demos[currentDemo].description}</p>
          </div>
          
          <div className="demo-body">
            <div className="demo-features">
              <h4>תכונות עיקריות:</h4>
              <ul>
                {demos[currentDemo].features.map((feature, index) => (
                  <li key={index}>✨ {feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="demo-code">
              <div className="code-header">
                <span>💻 Live Demo</span>
                <div className="code-controls">
                  <div className="code-dot red"></div>
                  <div className="code-dot yellow"></div>
                  <div className="code-dot green"></div>
                </div>
              </div>
              <pre className="code-content">{demos[currentDemo].code}</pre>
            </div>
          </div>
        </div>
        
        <button className="carousel-btn next" onClick={nextDemo}>
          →
        </button>
      </div>
      
      <div className="carousel-indicators">
        {demos.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentDemo ? 'active' : ''}`}
            onClick={() => setCurrentDemo(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default DemoCarousel