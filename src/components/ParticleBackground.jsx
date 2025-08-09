import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function ParticleBackground() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationFrameRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const particles = particlesRef.current

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create particles
    const createParticles = () => {
      particles.length = 0
      const particleCount = Math.min(50, Math.floor(canvas.width / 20))
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          color: Math.random() > 0.5 ? '#667eea' : '#764ba2',
          symbol: ['<', '>', '{', '}', '(', ')', '[', ']', '/', '*'][Math.floor(Math.random() * 10)],
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 0.02
        })
      }
    }

    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.rotation += particle.rotationSpeed

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.font = `${particle.size * 8}px "JetBrains Mono", monospace`
        ctx.textAlign = 'center'
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)
        ctx.fillText(particle.symbol, 0, 0)
        ctx.restore()

        // Add glow effect
        ctx.save()
        ctx.globalAlpha = particle.opacity * 0.3
        ctx.shadowColor = particle.color
        ctx.shadowBlur = 10
        ctx.fillStyle = particle.color
        ctx.font = `${particle.size * 8}px "JetBrains Mono", monospace`
        ctx.textAlign = 'center'
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)
        ctx.fillText(particle.symbol, 0, 0)
        ctx.restore()
      })

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.save()
            ctx.globalAlpha = (100 - distance) / 100 * 0.1
            ctx.strokeStyle = '#667eea'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    createParticles()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{
        background: 'transparent',
        zIndex: 1
      }}
    />
  )
}

export default ParticleBackground