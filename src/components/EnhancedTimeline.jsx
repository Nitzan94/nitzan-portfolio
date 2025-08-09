import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import UniversalEditableText from './UniversalEditableText'
import { useEditMode } from '../hooks/useEditMode'
import useContentManager from '../hooks/useContentManager'

function EnhancedTimeline() {
  const [currentTime, setCurrentTime] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  // Add edit mode functionality
  const { isEditMode } = useEditMode()
  const { updateContent, updateColor, getColor, getText: getContentText } = useContentManager()

  const getMilestoneText = (id, defaultValue) => {
    return getContentText ? getContentText(id, defaultValue) : defaultValue
  }

  const milestones = [
    { time: 0, title: getMilestoneText('milestone-0-title', 'התחלה'), description: getMilestoneText('milestone-0-desc', 'קבלת דרישות והגדרת מטרות'), icon: '🎯', progress: 0 },
    { time: 5, title: getMilestoneText('milestone-1-title', 'הגדרת פרויקט'), description: getMilestoneText('milestone-1-desc', 'יצירת מבנה פרויקט וקונפיגורציה'), icon: '⚙️', progress: 8 },
    { time: 12, title: getMilestoneText('milestone-2-title', 'GitHub Setup'), description: getMilestoneText('milestone-2-desc', 'יצירת repository וקונפיגורציה'), icon: '🐙', progress: 17 },
    { time: 20, title: getMilestoneText('milestone-3-title', 'עיצוב ומבנה'), description: getMilestoneText('milestone-3-desc', 'יצירת קומפוננטים בסיסיים'), icon: '🎨', progress: 33 },
    { time: 35, title: getMilestoneText('milestone-4-title', 'תכונות מתקדמות'), description: getMilestoneText('milestone-4-desc', 'מערכת CMS ואינטראקטיביות'), icon: '⚡', progress: 58 },
    { time: 45, title: getMilestoneText('milestone-5-title', 'בדיקות ואופטימיזציה'), description: getMilestoneText('milestone-5-desc', 'וידוא איכות ותקינות'), icon: '🧪', progress: 75 },
    { time: 52, title: getMilestoneText('milestone-6-title', 'פריסה לייצור'), description: getMilestoneText('milestone-6-desc', 'העלאה ל-Vercel וקונפיגורציה'), icon: '🚀', progress: 87 },
    { time: 58, title: getMilestoneText('milestone-7-title', 'סיום!'), description: getMilestoneText('milestone-7-desc', 'אתר מושלם ופעיל'), icon: '🎉', progress: 100 }
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
        <UniversalEditableText
          id="enhanced-timeline-title"
          defaultValue="⏱️ איך בניתי את האתר הזה תוך שעה"
          defaultColor={getColor('enhanced-timeline-title', '#ffffff')}
          tag="h2"
          className="timeline-title"
          isEditMode={isEditMode}
          onUpdate={updateContent}
          onColorUpdate={updateColor}
        />
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
                  <UniversalEditableText
                    id={`milestone-title-${index}`}
                    defaultValue={milestone.title}
                    defaultColor={getColor(`milestone-title-${index}`, '#ffffff')}
                    tag="div"
                    className="milestone-title"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                  <UniversalEditableText
                    id={`milestone-desc-${index}`}
                    defaultValue={milestone.description}
                    defaultColor={getColor(`milestone-desc-${index}`, '#ffffff')}
                    tag="div"
                    className="milestone-description"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
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