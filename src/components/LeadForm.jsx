import React, { useState } from 'react'

function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    interest: '',
    experience: ''
  })
  
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <div className="lead-form-container submitted">
        <div className="success-message">
          <div className="success-icon">🎉</div>
          <h2>תודה רבה!</h2>
          <p>הבקשה שלך נשלחה בהצלחה</p>
          <p>נחזור אליך בתוך 24 שעות עם פרטי הסדנה</p>
          <div className="next-steps">
            <h3>מה קורה הלאה?</h3>
            <div className="steps-list">
              <div className="step">
                <span className="step-number">1</span>
                <span>נחזור אליך תוך 24 שעות</span>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <span>נקבע יחד תאריך מתאים לסדנה</span>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <span>תקבל חומרי הכנה מראש</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="lead-form-container">
      <div className="form-header">
        <h2>🎯 רוצה ללמוד איך לבנות מערכת כמו שלי?</h2>
        <p>הצטרף לסדנת הClaude Code הבלעדית - מוגבלת ל-10 משתתפים!</p>
        
        <div className="value-props">
          <div className="value-prop">
            <span className="icon">⚡</span>
            <span>חסוך 40+ שעות בשבוע</span>
          </div>
          <div className="value-prop">
            <span className="icon">🚀</span>
            <span>פיתוח פי-5 מהר יותר</span>
          </div>
          <div className="value-prop">
            <span className="icon">💰</span>
            <span>ROI של 500%</span>
          </div>
        </div>
      </div>

      <form className="lead-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">שם מלא *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="איך קוראים לך?"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">אימייל *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@company.com"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="company">חברה</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="איפה אתה עובד?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">תפקיד</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">בחר תפקיד...</option>
              <option value="developer">מפתח</option>
              <option value="team-lead">ראש צוות</option>
              <option value="architect">אדריכל תוכנה</option>
              <option value="cto">CTO</option>
              <option value="product">מנהל מוצר</option>
              <option value="other">אחר</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="interest">מה הכי מעניין אותך?</label>
          <select
            id="interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
          >
            <option value="">בחר נושא...</option>
            <option value="automation">אוטומציה ובניית סקריפטים</option>
            <option value="mcp">שרתי MCP ואינטגרציות</option>
            <option value="templates">תבניות ופיגומים</option>
            <option value="workflow">זרימות עבודה מתקדמות</option>
            <option value="enterprise">פתרונות ארגוניים</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="experience">רמת נסיון עם AI/Claude?</label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          >
            <option value="">בחר רמה...</option>
            <option value="beginner">מתחיל - בדיוק מתחיל</option>
            <option value="intermediate">ביניים - יש לי קצת נסיון</option>
            <option value="advanced">מתקדם - אני כבר עובד עם Claude</option>
            <option value="expert">מומחה - אני בונה כלים מתקדמים</option>
          </select>
        </div>

        <button 
          type="submit" 
          className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              שולח...
            </>
          ) : (
            <>
              🚀 רוצה להצטרף לסדנה!
            </>
          )}
        </button>

        <div className="form-footer">
          <div className="trust-signals">
            <div className="signal">
              <span>🔒</span>
              <span>מידע מאובטח 100%</span>
            </div>
            <div className="signal">
              <span>📧</span>
              <span>ללא ספאם - מובטח</span>
            </div>
            <div className="signal">
              <span>⚡</span>
              <span>מענה תוך 24 שעות</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LeadForm