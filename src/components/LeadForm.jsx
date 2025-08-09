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
          <h2>מעולה!</h2>
          <p>הפנייתך נשלחה בהצלחה</p>
          <p>אשלח לך משאבים וקישורים לקוד המקור בתוך 24 שעות</p>
          <div className="next-steps">
            <h3>מה קורה הלאה?</h3>
            <div className="steps-list">
              <div className="step">
                <span className="step-number">1</span>
                <span>אשלח לך קישורים לקוד המקור ומדריכים</span>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <span>נמצא את האופציה הטובה ביותר ללמוד יחד</span>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <span>נתחיל לשתף פעולה ולפתח פרויקטים</span>
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
        <h2>📚 רוצה ללמוד איך לבנות מערכות כאלה?</h2>
        <p>אשמח לשתף את הידע ולעזור לך להתחיל עם המתודולוגיה הזאת</p>
        
        <div className="value-props">
          <div className="value-prop">
            <span className="icon">📝</span>
            <span>קוד מקור ומדריכים</span>
          </div>
          <div className="value-prop">
            <span className="icon">🎓</span>
            <span>למידה עם דוגמאות</span>
          </div>
          <div className="value-prop">
            <span className="icon">🤝</span>
            <span>שיתוף ידע וניסיון</span>
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
          <label htmlFor="interest">מה הכי מעניין אותך כרגע?</label>
          <select
            id="interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
          >
            <option value="">בחר תחום...</option>
            <option value="architecture">ללמוד ארכיטקטורה מערכתית עם AI</option>
            <option value="automation">להבין איך לבנות אוטומציות מתקדמות</option>
            <option value="methodology">להציץ מהטקסט ולקבל מתודולוגיית עבודה</option>
            <option value="implementation">לראות מימוש מעשי של הרעיונות האלו</option>
            <option value="collaboration">לשתף פעולה ולפתח יחד פרויקטים</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="experience">מה רמת הניסיון שלך?</label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          >
            <option value="">בחר רמה...</option>
            <option value="beginner">מתחיל - רוצה ללמוד ולהתחיל</option>
            <option value="intermediate">בינוני - יש לי בסיס, רוצה להעמיק</option>
            <option value="advanced">מתקדם - מעוניין בפיתוח משותף</option>
            <option value="expert">מומחה - רוצה לשתף וללמוד</option>
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
              📚 בואו נלמד יחד!
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
              <span>שיתוף ידע - ללא מכירות</span>
            </div>
            <div className="signal">
              <span>⚡</span>
              <span>קוד מקור ומדריכים מיד</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LeadForm