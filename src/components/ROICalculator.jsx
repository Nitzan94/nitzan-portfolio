import React, { useState, useEffect } from 'react'

function ROICalculator() {
  const [inputs, setInputs] = useState({
    hourlyRate: 150,
    teamSize: 3,
    projectsPerMonth: 4,
    currentDevTime: 40
  })
  
  const [results, setResults] = useState({})
  
  useEffect(() => {
    calculateROI()
  }, [inputs])

  const calculateROI = () => {
    const { hourlyRate, teamSize, projectsPerMonth, currentDevTime } = inputs
    
    // Current situation calculations
    const currentTimePerProject = currentDevTime
    const currentCostPerProject = currentTimePerProject * hourlyRate * teamSize
    const currentMonthlyCost = currentCostPerProject * projectsPerMonth
    const currentYearlyCost = currentMonthlyCost * 12
    
    // With Claude Code System
    const newTimePerProject = 1 // 1 hour with our system
    const newCostPerProject = newTimePerProject * hourlyRate * teamSize
    const newMonthlyCost = newCostPerProject * projectsPerMonth
    const newYearlyCost = newMonthlyCost * 12
    
    // Savings
    const timeSavedPerProject = currentTimePerProject - newTimePerProject
    const costSavedPerProject = currentCostPerProject - newCostPerProject
    const monthlySavings = costSavedPerProject * projectsPerMonth
    const yearlySavings = monthlySavings * 12
    
    // ROI calculations
    const systemCost = 5000 // Estimated cost for workshop + setup
    const roiPercentage = ((yearlySavings - systemCost) / systemCost) * 100
    const breakEvenTime = systemCost / monthlySavings // in months
    
    setResults({
      currentTimePerProject,
      currentCostPerProject,
      currentYearlyCost,
      newTimePerProject,
      newCostPerProject,
      newYearlyCost,
      timeSavedPerProject,
      costSavedPerProject,
      monthlySavings,
      yearlySavings,
      roiPercentage,
      breakEvenTime,
      systemCost
    })
  }

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseInt(value) || 0
    }))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getROIColor = (percentage) => {
    if (percentage >= 500) return '#28a745'
    if (percentage >= 200) return '#17a2b8' 
    if (percentage >= 100) return '#ffc107'
    return '#dc3545'
  }

  return (
    <div className="roi-calculator">
      <div className="calculator-header">
        <h2>🧮 מחשבון החיסכון שלך</h2>
        <p>גלה כמה זמן וכסף תחסוך עם המערכת שלי</p>
      </div>

      <div className="calculator-container">
        <div className="inputs-section">
          <h3>📊 הכנס את הפרמטרים שלך</h3>
          
          <div className="input-group">
            <label>💰 תעריף לשעה (₪)</label>
            <div className="input-with-slider">
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={inputs.hourlyRate}
                onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                className="slider"
              />
              <input
                type="number"
                value={inputs.hourlyRate}
                onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                className="number-input"
              />
            </div>
          </div>

          <div className="input-group">
            <label>👥 גודל צוות</label>
            <div className="input-with-slider">
              <input
                type="range"
                min="1"
                max="10"
                value={inputs.teamSize}
                onChange={(e) => handleInputChange('teamSize', e.target.value)}
                className="slider"
              />
              <input
                type="number"
                value={inputs.teamSize}
                onChange={(e) => handleInputChange('teamSize', e.target.value)}
                className="number-input"
              />
            </div>
          </div>

          <div className="input-group">
            <label>📈 פרויקטים בחודש</label>
            <div className="input-with-slider">
              <input
                type="range"
                min="1"
                max="20"
                value={inputs.projectsPerMonth}
                onChange={(e) => handleInputChange('projectsPerMonth', e.target.value)}
                className="slider"
              />
              <input
                type="number"
                value={inputs.projectsPerMonth}
                onChange={(e) => handleInputChange('projectsPerMonth', e.target.value)}
                className="number-input"
              />
            </div>
          </div>

          <div className="input-group">
            <label>⏰ שעות פיתוח נוכחי לפרויקט</label>
            <div className="input-with-slider">
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={inputs.currentDevTime}
                onChange={(e) => handleInputChange('currentDevTime', e.target.value)}
                className="slider"
              />
              <input
                type="number"
                value={inputs.currentDevTime}
                onChange={(e) => handleInputChange('currentDevTime', e.target.value)}
                className="number-input"
              />
            </div>
          </div>
        </div>

        <div className="results-section">
          <h3>📈 התוצאות המדהימות</h3>
          
          <div className="comparison-cards">
            <div className="comparison-card before">
              <h4>😤 ללא המערכת</h4>
              <div className="stat">
                <span className="number">{results.currentTimePerProject}</span>
                <span className="unit">שעות לפרויקט</span>
              </div>
              <div className="stat">
                <span className="number">{formatCurrency(results.currentCostPerProject)}</span>
                <span className="unit">עלות לפרויקט</span>
              </div>
              <div className="stat">
                <span className="number">{formatCurrency(results.currentYearlyCost)}</span>
                <span className="unit">עלות שנתית</span>
              </div>
            </div>

            <div className="comparison-arrow">➡️</div>

            <div className="comparison-card after">
              <h4>🚀 עם המערכת שלי</h4>
              <div className="stat">
                <span className="number">{results.newTimePerProject}</span>
                <span className="unit">שעה לפרויקט</span>
              </div>
              <div className="stat">
                <span className="number">{formatCurrency(results.newCostPerProject)}</span>
                <span className="unit">עלות לפרויקט</span>
              </div>
              <div className="stat">
                <span className="number">{formatCurrency(results.newYearlyCost)}</span>
                <span className="unit">עלות שנתית</span>
              </div>
            </div>
          </div>

          <div className="savings-highlight">
            <div className="savings-item">
              <span className="savings-icon">💰</span>
              <div className="savings-content">
                <span className="savings-number">{formatCurrency(results.yearlySavings)}</span>
                <span className="savings-label">חיסכון שנתי</span>
              </div>
            </div>
            
            <div className="savings-item">
              <span className="savings-icon">⏰</span>
              <div className="savings-content">
                <span className="savings-number">{results.timeSavedPerProject * results.projectsPerMonth * 12}</span>
                <span className="savings-label">שעות חיסכון בשנה</span>
              </div>
            </div>
            
            <div className="savings-item">
              <span className="savings-icon">📊</span>
              <div className="savings-content">
                <span 
                  className="savings-number"
                  style={{ color: getROIColor(results.roiPercentage) }}
                >
                  {results.roiPercentage?.toFixed(0)}%
                </span>
                <span className="savings-label">ROI</span>
              </div>
            </div>
          </div>

          <div className="breakeven-info">
            <div className="breakeven-card">
              <h4>⚡ נקודת איזון</h4>
              <p>
                <strong>{Math.ceil(results.breakEvenTime)} חודשים</strong> 
                <br />
                ואחר כך זה רק רווח!
              </p>
            </div>
          </div>

          <div className="action-section">
            <div className="investment-breakdown">
              <h4>💎 השקעה חד-פעמית:</h4>
              <div className="investment-item">
                <span>🎓 סדנה מקצועית</span>
                <span>₪2,500</span>
              </div>
              <div className="investment-item">
                <span>⚙️ הגדרת מערכת</span>
                <span>₪1,500</span>
              </div>
              <div className="investment-item">
                <span>📞 תמיכה 3 חודשים</span>
                <span>₪1,000</span>
              </div>
              <div className="investment-total">
                <span><strong>סה"כ השקעה</strong></span>
                <span><strong>₪5,000</strong></span>
              </div>
            </div>

            <button className="cta-calculator">
              🚀 רוצה לחסוך {formatCurrency(results.yearlySavings)} בשנה?
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ROICalculator