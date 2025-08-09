import React, { useState, useEffect } from 'react'

function BuildProcessDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  const buildSteps = [
    {
      id: 1,
      time: '00:02',
      title: '🎯 הגדרת הדרישות',
      description: 'הגדרתי בבקשה פשוטה מה אני רוצה לבנות',
      code: `שלום Claude! אני רוצה לבנות אתר פורטפוליו...`,
      duration: 2,
      color: '#FF6B6B'
    },
    {
      id: 2,
      time: '00:05',
      title: '⚡ יצירת פרויקט אוטומטית',
      description: 'המערכת יצרה פרויקט React מלא עם GitHub ו-Vercel',
      code: `./new-project.sh portfolio --type react
✅ GitHub repo created
🚀 Vercel configured
📦 Dependencies installed`,
      duration: 3,
      color: '#4ECDC4'
    },
    {
      id: 3,
      time: '00:15',
      title: '🎨 עיצוב וקומפוננטים',
      description: 'בנייה אוטומטית של כל הקומפוננטים והעיצוב',
      code: `Creating components:
- MetricsCard.jsx ✅
- InteractiveTerminal.jsx ✅  
- DemoCarousel.jsx ✅
- ArchitectureDiagram.jsx ✅`,
      duration: 10,
      color: '#45B7D1'
    },
    {
      id: 4,
      time: '00:35',
      title: '🛠️ מערכת CMS מתקדמת',
      description: 'בנייה אוטומטית של מערכת עריכה חיה',
      code: `Building CMS system:
- EditableText.jsx ✅
- AdminPanel.jsx ✅
- useEditMode hook ✅
- Edit Mode CSS ✅`,
      duration: 20,
      color: '#96CEB4'
    },
    {
      id: 5,
      time: '00:50',
      title: '🚀 הפריסה הסופית',
      description: 'העלאה אוטומטית לVercel עם כל התכונות',
      code: `vercel --prod --yes
✅ Build successful
✅ Deployed to production
🌍 Live at: https://your-site.vercel.app`,
      duration: 15,
      color: '#FFEAA7'
    }
  ]

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedTime(prev => {
          const newTime = prev + 1
          
          // Auto-advance to next step
          const currentStepData = buildSteps[currentStep]
          if (currentStepData && newTime >= currentStepData.duration) {
            if (currentStep < buildSteps.length - 1) {
              setCurrentStep(prev => prev + 1)
            } else {
              setIsPlaying(false)
            }
            return 0
          }
          
          return newTime
        })
      }, 200) // Faster for demo
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep, buildSteps])

  const startDemo = () => {
    setCurrentStep(0)
    setElapsedTime(0)
    setIsPlaying(true)
  }

  const resetDemo = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setElapsedTime(0)
  }

  const getTotalTime = () => {
    return buildSteps.reduce((acc, step, index) => {
      if (index < currentStep) return acc + step.duration
      if (index === currentStep) return acc + elapsedTime
      return acc
    }, 0)
  }

  return (
    <div className="build-process-demo">
      <div className="demo-header">
        <h2>⏱️ איך בניתי את האתר הזה תוך שעה</h2>
        <p>צפה בתהליך הבנייה המהיר והחכם</p>
        
        <div className="demo-controls">
          <button 
            className={`demo-btn ${isPlaying ? 'playing' : ''}`}
            onClick={isPlaying ? () => setIsPlaying(false) : startDemo}
          >
            {isPlaying ? '⏸️ עצור' : '▶️ התחל הדגמה'}
          </button>
          <button className="demo-btn reset" onClick={resetDemo}>
            🔄 איפוס
          </button>
          
          <div className="time-display">
            <span className="total-time">{Math.floor(getTotalTime() / 60).toString().padStart(2, '0')}:{(getTotalTime() % 60).toString().padStart(2, '0')}</span>
            <span className="time-label">/ 60:00 דקות</span>
          </div>
        </div>
      </div>

      <div className="timeline-container">
        <div className="timeline">
          {buildSteps.map((step, index) => (
            <div 
              key={step.id}
              className={`timeline-step ${
                index < currentStep ? 'completed' : 
                index === currentStep ? 'active' : 'pending'
              }`}
            >
              <div className="step-marker" style={{backgroundColor: step.color}}>
                {index < currentStep ? '✅' : 
                 index === currentStep ? '🔄' : '⏳'}
              </div>
              
              <div className="step-content">
                <div className="step-header">
                  <h3>{step.title}</h3>
                  <span className="step-time">{step.time}</span>
                </div>
                
                <p className="step-description">{step.description}</p>
                
                <div className="step-code">
                  <pre>{step.code}</pre>
                </div>
                
                {index === currentStep && isPlaying && (
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{
                        width: `${(elapsedTime / step.duration) * 100}%`,
                        backgroundColor: step.color
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="results-summary">
        <h3>🎉 התוצאה: אתר מלא תוך שעה!</h3>
        <div className="results-grid">
          <div className="result-item">
            <span className="result-number">15+</span>
            <span className="result-label">קומפוננטים</span>
          </div>
          <div className="result-item">
            <span className="result-number">2000+</span>
            <span className="result-label">שורות קוד</span>
          </div>
          <div className="result-item">
            <span className="result-number">1</span>
            <span className="result-label">שעה בלבד</span>
          </div>
          <div className="result-item">
            <span className="result-number">0</span>
            <span className="result-label">שגיאות</span>
          </div>
        </div>
        
        <div className="comparison-note">
          <strong>💡 בדרך הרגילה זה היה לוקח:</strong>
          <div className="comparison-items">
            <span>⏰ 40-60 שעות עבודה</span>
            <span>🐛 עשרות שגיאות לתיקון</span>
            <span>📚 ימים של למידה</span>
            <span>💸 אלפי שקלים בעבודת פיתוח</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuildProcessDemo