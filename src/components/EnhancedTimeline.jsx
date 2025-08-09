import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function EnhancedTimeline() {
  const [currentTime, setCurrentTime] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const milestones = [
    { time: 0, title: 'התחלה', description: 'קבלת דרישות והגדרת מטרות', icon: '🎯', progress: 0 },
    { time: 5, title: 'הגדרת פרויקט', description: 'יצירת מבנה פרויקט וקונפיגורציה', icon: '⚙️', progress: 8 },
    { time: 12, title: 'GitHub Setup', description: 'יצירת repository וקונפיגורציה', icon: '🐙', progress: 17 },
    { time: 20, title: 'עיצוב ומבנה', description: 'יצירת קומפוננטים בסיסיים', icon: '🎨', progress: 33 },
    { time: 35, title: 'תכונות מתקדמות', description: 'מערכת CMS ואינטראקטיביות', icon: '⚡', progress: 58 },
    { time: 45, title: 'בדיקות ואופטימיזציה', description: 'וידוא איכות ותקינות', icon: '🧪', progress: 75 },
    { time: 52, title: 'פריסה לייצור', description: 'העלאה ל-Vercel וקונפיגורציה', icon: '🚀', progress: 87 },
    { time: 58, title: 'סיום!', description: 'אתר מושלם ופעיל', icon: '🎉', progress: 100 }
  ]

  const totalDuration = 60 // 60 minutes
  const animationDuration = 10000 // 10 seconds for full animation

  useEffect(() => {
    if (!isInView) return

    const startAnimation = () => {
      setIsPlaying(true)
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / animationDuration, 1)
        const newTime = progress * totalDuration

        setCurrentTime(newTime)

        // Update current step
        const activeStep = milestones.findIndex((milestone, index) => {
          const nextMilestone = milestones[index + 1]
          return newTime >= milestone.time && (!nextMilestone || newTime < nextMilestone.time)
        })

        if (activeStep !== -1) {
          setCurrentStep(activeStep)
        }

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setIsPlaying(false)
        }
      }

      animate()
    }

    const timer = setTimeout(startAnimation, 1000)
    return () => clearTimeout(timer)
  }, [isInView])

  const formatTime = (minutes) => {
    const mins = Math.floor(minutes)
    const secs = Math.floor((minutes - mins) * 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const restartAnimation = () => {
    setCurrentTime(0)
    setCurrentStep(0)
    setIsPlaying(true)
    
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / animationDuration, 1)
      const newTime = progress * totalDuration

      setCurrentTime(newTime)

      const activeStep = milestones.findIndex((milestone, index) => {
        const nextMilestone = milestones[index + 1]
        return newTime >= milestone.time && (!nextMilestone || newTime < nextMilestone.time)
      })

      if (activeStep !== -1) {
        setCurrentStep(activeStep)
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsPlaying(false)
      }
    }

    animate()
  }

  return (
    <div ref={ref} className="enhanced-timeline">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="timeline-header"
      >
        <h2 className="timeline-title">⏱️ איך בניתי את האתר הזה תוך שעה</h2>
        <div className="timeline-controls">
          <div className="time-display">
            <span className="current-time">{formatTime(currentTime)}</span>
            <span className="separator"> / </span>
            <span className="total-time">{formatTime(totalDuration)}</span>
          </div>
          <motion.button
            className="replay-button"
            onClick={restartAnimation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isPlaying}
          >
            {isPlaying ? '⏸️ Playing' : '🔄 Replay'}
          </motion.button>
        </div>
      </motion.div>

      <div className="timeline-container">
        <div className="progress-track">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${(currentTime / totalDuration) * 100}%` }}
            transition={{ duration: 0.1 }}
          />
          <motion.div
            className="progress-indicator"
            initial={{ left: 0 }}
            animate={{ left: `${(currentTime / totalDuration) * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="milestones-container">
          {milestones.map((milestone, index) => {
            const isActive = index === currentStep
            const isCompleted = currentTime > milestone.time
            const position = (milestone.time / totalDuration) * 100

            return (
              <motion.div
                key={index}
                className={`milestone ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                style={{ left: `${position}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="milestone-icon"
                  animate={isActive ? {
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}
                >
                  {milestone.icon}
                </motion.div>
                
                <div className="milestone-content">
                  <div className="milestone-time">{formatTime(milestone.time)}</div>
                  <div className="milestone-title">{milestone.title}</div>
                  <div className="milestone-description">{milestone.description}</div>
                  <div className="milestone-progress">{milestone.progress}% Complete</div>
                </div>

                {isActive && (
                  <motion.div
                    className="active-indicator"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {isCompleted && (
                  <motion.div
                    className="completed-checkmark"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✅
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="timeline-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="stat-item">
            <div className="stat-value">
              <motion.span
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {milestones[currentStep]?.progress || 0}%
              </motion.span>
            </div>
            <div className="stat-label">Progress</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">
              <motion.span
                key={Math.floor(currentTime)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {Math.floor(currentTime)}
              </motion.span>
            </div>
            <div className="stat-label">Minutes</div>
          </div>

          <div className="stat-item">
            <div className="stat-value">
              <motion.span
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep + 1}
              </motion.span>
            </div>
            <div className="stat-label">Phase</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default EnhancedTimeline