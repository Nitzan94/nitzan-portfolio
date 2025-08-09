import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function EnhancedTerminal({ title = "💻 Live Demo", isActive = false, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [progress, setProgress] = useState({})
  const terminalRef = useRef(null)
  const typeTimeoutRef = useRef(null)

  const steps = [
    {
      type: 'command',
      text: './new-project.sh nitzan-portfolio --type react --interactive',
      delay: 1000
    },
    {
      type: 'output',
      text: '🚀 Initializing Claude Code Enterprise System...',
      delay: 500
    },
    {
      type: 'progress',
      id: 'setup',
      label: 'Setting up project structure',
      duration: 2000,
      steps: [
        'Creating project directory...',
        'Installing dependencies...',
        'Configuring build tools...'
      ]
    },
    {
      type: 'output',
      text: '✅ Project structure created successfully!',
      delay: 300
    },
    {
      type: 'progress',
      id: 'github',
      label: 'GitHub Integration',
      duration: 1500,
      steps: [
        'Creating GitHub repository...',
        'Setting up CI/CD pipeline...',
        'Configuring branch protection...'
      ]
    },
    {
      type: 'output',
      text: '✅ GitHub repository created and configured',
      delay: 300
    },
    {
      type: 'progress',
      id: 'components',
      label: 'Generating UI Components',
      duration: 2500,
      steps: [
        'Creating Hero Section...',
        'Building interactive demos...',
        'Generating architecture diagram...',
        'Setting up CMS system...'
      ]
    },
    {
      type: 'output',
      text: '✅ 15+ React components generated',
      delay: 300
    },
    {
      type: 'progress',
      id: 'deploy',
      label: 'Deployment Setup',
      duration: 1800,
      steps: [
        'Configuring Vercel deployment...',
        'Optimizing build...',
        'Setting up domain...'
      ]
    },
    {
      type: 'success',
      text: '🎉 Portfolio deployed successfully!',
      delay: 500
    },
    {
      type: 'success',
      text: '🌐 Live at: https://nitzan-portfolio.vercel.app',
      delay: 300
    },
    {
      type: 'success',
      text: '⚡ Total time: 58 minutes | Lines generated: 2,347',
      delay: 500
    }
  ]

  const typeText = (text, callback) => {
    let index = 0
    setCurrentText('')
    setIsTyping(true)

    const type = () => {
      if (index < text.length) {
        setCurrentText(text.slice(0, index + 1))
        index++
        typeTimeoutRef.current = setTimeout(type, Math.random() * 50 + 30)
      } else {
        setIsTyping(false)
        setTimeout(callback, 500)
      }
    }
    
    type()
  }

  const runProgressBar = (progressConfig, callback) => {
    const { id, duration, steps } = progressConfig
    let stepIndex = 0
    let progressValue = 0

    const updateProgress = () => {
      if (progressValue >= 100) {
        setProgress(prev => ({ ...prev, [id]: { value: 100, step: steps[steps.length - 1], complete: true } }))
        setTimeout(callback, 300)
        return
      }

      const increment = 100 / (duration / 50)
      progressValue += increment

      if (stepIndex < steps.length - 1 && progressValue > (stepIndex + 1) * (100 / steps.length)) {
        stepIndex++
      }

      setProgress(prev => ({ 
        ...prev, 
        [id]: { 
          value: Math.min(progressValue, 100), 
          step: steps[stepIndex],
          complete: false
        } 
      }))

      setTimeout(updateProgress, 50)
    }

    setProgress(prev => ({ ...prev, [id]: { value: 0, step: steps[0], complete: false } }))
    updateProgress()
  }

  const processStep = () => {
    if (currentStep >= steps.length) {
      onComplete && onComplete()
      return
    }

    const step = steps[currentStep]

    if (step.type === 'progress') {
      runProgressBar(step, () => {
        setCurrentStep(prev => prev + 1)
      })
    } else {
      typeText(step.text, () => {
        setTimeout(() => {
          setCurrentStep(prev => prev + 1)
        }, step.delay)
      })
    }
  }

  useEffect(() => {
    if (isActive && currentStep < steps.length) {
      const timer = setTimeout(processStep, 800)
      return () => clearTimeout(timer)
    }
  }, [currentStep, isActive])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [currentStep, currentText, progress])

  const getCurrentStepContent = () => {
    const step = steps[currentStep]
    if (!step) return null

    if (step.type === 'progress') {
      const prog = progress[step.id]
      if (!prog) return null

      return (
        <div className="progress-container">
          <div className="progress-label">{step.label}</div>
          <div className="progress-bar-container">
            <motion.div 
              className="progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${prog.value}%` }}
              transition={{ duration: 0.1 }}
            />
            <span className="progress-text">{Math.round(prog.value)}%</span>
          </div>
          <div className="progress-step">{prog.step}</div>
        </div>
      )
    }

    return (
      <div className={`terminal-line ${step.type}`}>
        {step.type === 'command' && <span className="prompt">nitzan@claude:~$ </span>}
        <span className="text">{currentText}</span>
        {isTyping && showCursor && <span className="cursor">|</span>}
      </div>
    )
  }

  return (
    <div className="enhanced-terminal">
      <div className="terminal-header">
        <div className="terminal-controls">
          <div className="control close"></div>
          <div className="control minimize"></div>
          <div className="control maximize"></div>
        </div>
        <span className="terminal-title">{title}</span>
        <motion.button
          className="terminal-replay"
          onClick={() => {
            setCurrentStep(0)
            setCurrentText('')
            setProgress({})
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentStep < steps.length}
        >
          {currentStep >= steps.length ? '🔄 Replay' : '⏸️ Running'}
        </motion.button>
      </div>
      
      <div className="terminal-body" ref={terminalRef}>
        <AnimatePresence>
          {Array.from({ length: currentStep + 1 }).map((_, index) => {
            const step = steps[index]
            if (!step) return null

            if (index === currentStep) {
              return (
                <motion.div
                  key={`current-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="terminal-current-line"
                >
                  {getCurrentStepContent()}
                </motion.div>
              )
            }

            if (step.type === 'progress') {
              const prog = progress[step.id]
              return (
                <motion.div
                  key={`completed-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="progress-container completed"
                >
                  <div className="progress-label">{step.label}</div>
                  <div className="progress-bar-container">
                    <div className="progress-bar completed" style={{ width: '100%' }} />
                    <span className="progress-text">100%</span>
                  </div>
                  <div className="progress-step">✅ Completed</div>
                </motion.div>
              )
            }

            return (
              <motion.div
                key={`completed-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`terminal-line ${step.type} completed`}
              >
                {step.type === 'command' && <span className="prompt">nitzan@claude:~$ </span>}
                <span className="text">{step.text}</span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default EnhancedTerminal