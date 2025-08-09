import React, { useState, useEffect } from 'react'

function MetricsCard({ title, value, unit, icon, trend }) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById(`metric-${title}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [title])

  useEffect(() => {
    if (isVisible) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setAnimatedValue(value)
          clearInterval(timer)
        } else {
          setAnimatedValue(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isVisible, value])

  return (
    <div 
      id={`metric-${title}`}
      className={`metrics-card ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="metric-icon">{icon}</div>
      <h3 className="metric-title">{title}</h3>
      <div className="metric-value">
        <span className="number">{animatedValue.toLocaleString()}</span>
        <span className="unit">{unit}</span>
      </div>
      <div className={`metric-trend ${trend.includes('+') ? 'positive' : 'negative'}`}>
        {trend} בחודש האחרון
      </div>
    </div>
  )
}

export default MetricsCard