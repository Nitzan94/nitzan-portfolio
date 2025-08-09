import React, { useState, useEffect } from 'react'
import UniversalEditableText from './UniversalEditableText'
import { useEditMode } from '../hooks/useEditMode'
import useContentManager from '../hooks/useContentManager'

function DemoCarousel({ currentDemo, setCurrentDemo }) {
  // Add edit mode functionality
  const { isEditMode } = useEditMode()
  const { updateContent, updateColor, getColor } = useContentManager()
  
  const demos = [
    {
      id: 1,
      title: '🏗️ ארכיטקטורת היינטגרציה - הגשר שבניתי',
      description: 'איך בניתי גשר בין Claude Code לכל המערכות שאני צריך',
      instruction: '⚙️ האתר הזה זה רק חלק מהצורה - בואו נראה את כל המערכת:',
      features: [
        '✅ בניתי גשר בין Claude Code לכל המערכות שאני צריך:',
        '  → GitHub לניהול קוד, Vercel לפריסה, מערכת קבצים מתקדמת,',
        '  → ועוד 4 שכבות שמאפשרות לי לעבוד בקצב הזה',
        '✅ הקמתי מערכת זיכרון שזוכרת כל החלטה ארכיטקטונית',
        '✅ בניתי מערכת אוטומציה שמתחזקת את עצמה'
      ],
      code: `# האינטגרציה המלאה שבניתי:

🧠 MCP Memory Server:
   ✓ זוכר כל החלטה ארכיטקטונית
   ✓ שומר context בין סשנים
   ✓ מאפשר המשכיות מושלמת

💻 GitHub Integration:
   ✓ יצירת repos אוטומטית
   ✓ ניהול PRs וissues
   ✓ הגדרת CI/CD pipelines

🚀 Vercel + פריסה:
   ✓ פריסה אוטומטית על כל commit
   ✓ הגדרת domains וSSL
   ✓ מוניטורינג אוטומטי

⚡ התוצאה: במקום לנהל באגים וconfigs,
             אני מתמקד בבניית פיצ'רים!`
    },
    {
      id: 2,
      title: '📚 המתודולוגיה - איך אני חושב על קוד',
      description: 'השינוי המנטלי - מכתיבת קוד לארכיטקטורה מערכתית',
      instruction: '🧠 השינוי האמיתי הוא באופן שאני חושב על קוד:',
      features: [
        '✅ במקום "איך לכתוב קומפוננטה?", אני שואל "איך המערכת צריכה להיראות?"',
        '✅ במקום לחשוב על פונקציות, אני חושב על דפוסי עבודה',
        '✅ במקום לעסוק בconfigs, אני מתמקד בפיצ\'רים',
        '✅ במקום לדאוג לבאגים, אני בונה מערכות שלא נשברות'
      ],
      code: `# השינוי המנטלי שלי:

👨‍💻 לפני - כתיבת קוד:
   "איך לכתוב function שעושה X?"
   "איך לחבר את הAPI הזה?"
   "למה הconfig הזה לא עובד?"

🤖 עכשיו - ארכיטקטורה מערכתית:
   "איך המשתמש צריך לחוות את זה?"
   "איך המערכת צריכה להתנהג?"
   "איך לבנות שזה יעבוד גם בעוד 5 שנים?"

⚡ התוצאה:
   במקום לתקן באגים, אני מנע אותם
   במקום לכתוב קוד, אני מתכנן מערכות
   במקום לפתור בעיות, אני בונה פתרונות`
    },
    {
      id: 3,
      title: '⚡ הקסם - פקודה אחת, פרויקט מלא',
      description: 'איך פקודה אחת יוצרת פרויקט עם כל האינטגרציות',
      instruction: '🚀 האוטומציה האמיתית - ראו מה קורה בפקודה אחת:',
      features: [
        '✅ אחרי פקודה אחת - כל האינטגרציות מתחברות אוטומטית',
        '✅ GitHub ריפו, Vercel פריסה, וכל הconfigs - מוכנים',
        '✅ המערכת "זוכרת" את פרטי הפרויקט ושומרת עקביות',
        '✅ כל פרויקט מקבל את אותה רמת מקצועיות ואיכות'
      ],
      code: `# מה שקורה בפקודה אחת:
./create-project my-awesome-app --type react

⚡ מה שקורה אוטומטית:
┌─ GitHub Repository
│  ✓ יוצר ריפו חדש
│  ✓ מגדיר branch protection
│  ✓ מוסיף GitHub Actions
│
├─ Vercel Deployment  
│  ✓ מחבר לריפו
│  ✓ מגדיר auto-deploy
│  ✓ מוסיף custom domain
│
├─ Development Environment
│  ✓ React + TypeScript + Vite
│  ✓ ESLint + Prettier + Tests
│  ✓ מבנה תיקיות מושלם
│
└─ Documentation & Memory
   ✓ README אוטומטי
   ✓ שמירה בזיכרון המערכת
   ✓ היסטורית החלטות

🎉 תוך 3 דקות: מרעיון לפרויקט חי באינטרנט!`
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
            <UniversalEditableText
              id={`demo-title-${currentDemo}`}
              defaultValue={demos[currentDemo].title}
              defaultColor={getColor(`demo-title-${currentDemo}`, '#ffffff')}
              tag="h3"
              isEditMode={isEditMode}
              onUpdate={updateContent}
              onColorUpdate={updateColor}
            />
            <UniversalEditableText
              id={`demo-desc-${currentDemo}`}
              defaultValue={demos[currentDemo].description}
              defaultColor={getColor(`demo-desc-${currentDemo}`, '#ffffff')}
              tag="p"
              isEditMode={isEditMode}
              onUpdate={updateContent}
              onColorUpdate={updateColor}
            />
            {demos[currentDemo].instruction && (
              <div className="demo-instruction">
                <UniversalEditableText
                  id={`demo-instruction-${currentDemo}`}
                  defaultValue={demos[currentDemo].instruction}
                  defaultColor={getColor(`demo-instruction-${currentDemo}`, '#ffffff')}
                  tag="strong"
                  isEditMode={isEditMode}
                  onUpdate={updateContent}
                  onColorUpdate={updateColor}
                />
              </div>
            )}
          </div>
          
          <div className="demo-body">
            <div className="demo-features">
              <UniversalEditableText
                id="demo-features-title"
                defaultValue="מה תראו כאן:"
                defaultColor={getColor('demo-features-title', '#ffffff')}
                tag="h4"
                isEditMode={isEditMode}
                onUpdate={updateContent}
                onColorUpdate={updateColor}
              />
              <ul>
                {demos[currentDemo].features.map((feature, index) => (
                  <UniversalEditableText
                    key={index}
                    id={`demo-feature-${currentDemo}-${index}`}
                    defaultValue={feature}
                    defaultColor={getColor(`demo-feature-${currentDemo}-${index}`, '#ffffff')}
                    tag="li"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
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