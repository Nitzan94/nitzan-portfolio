import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import InteractiveTerminal from '../components/InteractiveTerminal'
import MetricsCard from '../components/MetricsCard'
import DemoCarousel from '../components/DemoCarousel'
import ArchitectureDiagram from '../components/ArchitectureDiagram'
import Enhanced3DArchitecture from '../components/Enhanced3DArchitecture'
import LeadForm from '../components/LeadForm'
import EnhancedTimeline from '../components/EnhancedTimeline'
import EditableText from '../components/EditableText'
import UniversalEditableText from '../components/UniversalEditableText'
import AdminPanel from '../components/AdminPanel'
import GlobalEditPanel from '../components/GlobalEditPanel'
import ContentControlPanel from '../components/ContentControlPanel'
import { useEditMode } from '../hooks/useEditMode'
import useContentManager from '../hooks/useContentManager'

function Home() {
  const navigate = useNavigate()
  const [currentDemo, setCurrentDemo] = useState(0)
  // System components - static values that demonstrate capabilities
  const metrics = {
    automation: { value: "4K+", unit: "Lines Code" },
    servers: { value: 7, unit: "MCP Plugins" },
    templates: { value: 12, unit: "Ready Templates" },
    projects: { value: "50+", unit: "Built Successfully" }
  }

  // Edit mode functionality
  const {
    isEditMode,
    hasChanges,
    toggleEditMode,
    updateText,
    getText,
    saveChanges,
    resetChanges
  } = useEditMode()
  
  // Content management
  const {
    content,
    colors,
    updateContent,
    updateColor,
    getText: getContentText,
    getColor,
    exportContent,
    importContent
  } = useContentManager()

  return (
    <div className="portfolio-home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <EditableText
            id="hero-title"
            defaultValue="🧠 Deep Dive: Claude Code Enterprise Architecture"
            tag="h1"
            className="hero-title"
            isEditMode={isEditMode}
            onUpdate={updateText}
            getValue={getText}
          />
          <EditableText
            id="hero-subtitle"
            defaultValue="איך שינתי את האופן שבו אני פיתח תוכנה - מדיווח לפרקטיקה"
            tag="p"
            className="hero-subtitle"
            isEditMode={isEditMode}
            onUpdate={updateText}
            getValue={getText}
          />
          <div className="cta-container">
            <button 
              className="primary-cta"
              onClick={() => document.getElementById('demo-section').scrollIntoView()}
            >
              <EditableText
                id="primary-cta-text"
                defaultValue="🔍 חקור את האימפלמנטציה"
                tag="span"
                isEditMode={isEditMode}
                onUpdate={updateText}
                getValue={getText}
              />
            </button>
            <button 
              className="secondary-cta"
              onClick={() => {
                const timelineSection = document.querySelector('.timeline-demo-section')
                if (timelineSection) {
                  timelineSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              <EditableText
                id="secondary-cta-text"
                defaultValue="🔮 איך זה עובד?"
                tag="span"
                isEditMode={isEditMode}
                onUpdate={updateText}
                getValue={getText}
              />
            </button>
          </div>
        </div>
      </section>

      {/* System Deep Dive - Educational Content */}
      <section className="system-overview-section">
        <EditableText
          id="system-overview-title"
          defaultValue="🔬 כיצד פועלת המערכת - מבט פנימי טכני"
          tag="h2"
          className="section-title"
          isEditMode={isEditMode}
          onUpdate={updateText}
          getValue={getText}
        />
        <div className="system-explanation">
          <div className="explanation-card">
            <div className="explanation-icon">🧠</div>
            <EditableText
              id="ai-engine-title"
              defaultValue="מנוע הAI המתקדם"
              tag="h3"
              className="explanation-title"
              isEditMode={isEditMode}
              onUpdate={updateText}
              getValue={getText}
            />
            <EditableText
              id="ai-engine-text"
              defaultValue="במקום לכתוב קוד שורה אחר שורה, אני 'משוחח' עם המחשב על מה שאני רוצה לבנות. המערכת מבינה לא רק את הקוד, אלא גם את הרעיון מאחוריו. זה כמו לעבוד עם מפתח senior שזוכר את כל ההחלטות שקיבלנו ויודע בדיוק איך להמשיך."
              tag="p"
              className="explanation-text"
              multiline={true}
              isEditMode={isEditMode}
              onUpdate={updateText}
              getValue={getText}
            />
          </div>
          <div className="explanation-card">
            <div className="explanation-icon">🔧</div>
            <EditableText
              id="automation-layer-title"
              defaultValue="שכבת האוטומציה החכמה"
              tag="h3"
              className="explanation-title"
              isEditMode={isEditMode}
              onUpdate={updateText}
              getValue={getText}
            />
            <EditableText
              id="automation-layer-text"
              defaultValue="המהפכה האמיתית היא בזה שהמערכת לא רק כותבת קוד - היא גם מנהלת את כל התהליך. מיצירת הגיט ריפו, דרך הגדרת הפריסה, ועד לכתיבת הדוקומנטציה. כל הדברים המשעממים שלא אוהבים לעשות כמפתחים - המערכת עושה אותם אוטומטית ונכון."
              tag="p"
              className="explanation-text"
              multiline={true}
              isEditMode={isEditMode}
              onUpdate={updateText}
              getValue={getText}
            />
          </div>
        </div>
        
        {/* Paradigm Shift Explanation */}
        <div className="paradigm-shift">
          <div className="shift-explanation">
            <UniversalEditableText
              id="paradigm-shift-title"
              defaultValue="השינוי האמיתי באופן שבו אנחנו מפתחים:"
              defaultColor={getColor('paradigm-shift-title', '#ffffff')}
              tag="h3"
              isEditMode={isEditMode}
              onUpdate={updateContent}
              onColorUpdate={updateColor}
            />
            <div className="before-after">
              <div className="before">
                <UniversalEditableText
                  id="before-title"
                  defaultValue="👨‍💻 לפני - כתיבת קוד מנואלית"
                  defaultColor={getColor('before-title', '#ffffff')}
                  tag="h4"
                  isEditMode={isEditMode}
                  onUpdate={updateContent}
                  onColorUpdate={updateColor}
                />
                <ul>
                  <UniversalEditableText
                    id="before-item-1"
                    defaultValue="חושב מה אני רוצה"
                    defaultColor={getColor('before-item-1', '#ffffff')}
                    tag="li"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                  <UniversalEditableText
                    id="before-item-2"
                    defaultValue="כותב קוד שורה אחר שורה"
                    defaultColor={getColor('before-item-2', '#ffffff')}
                    tag="li"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                  <UniversalEditableText
                    id="before-item-3"
                    defaultValue="מתקן באגים ונלחם עם קונפיגים"
                    defaultColor={getColor('before-item-3', '#ffffff')}
                    tag="li"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                  <UniversalEditableText
                    id="before-item-4"
                    defaultValue="מוצא פתרונות ב-Google/Stack Overflow"
                    defaultColor={getColor('before-item-4', '#ffffff')}
                    tag="li"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                </ul>
              </div>
              <div className="after">
                <UniversalEditableText
                  id="after-title"
                  defaultValue="עכשיו - שיחה עם המחשב 🤖"
                  defaultColor={getColor('after-title', '#ffffff')}
                  tag="h4"
                  isEditMode={isEditMode}
                  onUpdate={updateContent}
                  onColorUpdate={updateColor}
                />
                <ul>
                  <UniversalEditableText
                    id="after-item-1"
                    defaultValue="מבין מה אני רוצה ומסביר למחשב"
                    defaultColor={getColor('after-item-1', '#ffffff')}
                    tag="li"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                  <UniversalEditableText
                    id="after-item-2"
                    defaultValue="המחשב כותב את הקוד באיכות גבוהה"
                    defaultColor={getColor('after-item-2', '#ffffff')}
                    tag="li"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                  <UniversalEditableText
                    id="after-item-3"
                    defaultValue="המחשב מסדר גם את כל הקונפיגים"
                    defaultColor={getColor('after-item-3', '#ffffff')}
                    tag="li"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                  <UniversalEditableText
                    id="after-item-4"
                    defaultValue="המחשב יודע את כל הפתרונות מראש"
                    defaultColor={getColor('after-item-4', '#ffffff')}
                    tag="li"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                </ul>
              </div>
            </div>
            <div className="key-insight">
              <UniversalEditableText
                id="key-insight-text"
                defaultValue="💡 התובנה המרכזית: אני עדיין מפתח, אבל עכשיו אני מתמקד בלקבל החלטות אסטרטגיות, ולא בכתיבת קוד שגרה."
                defaultColor={getColor('key-insight-text', '#ffffff')}
                tag="p"
                isEditMode={isEditMode}
                onUpdate={updateContent}
                onColorUpdate={updateColor}
              />
            </div>
            
            {/* Quick Links to Resources */}
            <div className="quick-resources">
              <UniversalEditableText
                id="quick-resources-title"
                defaultValue="🔗 משאבים ללמידה:"
                defaultColor={getColor('quick-resources-title', '#ffffff')}
                tag="h4"
                isEditMode={isEditMode}
                onUpdate={updateContent}
                onColorUpdate={updateColor}
              />
              <div className="resource-links">
                <a href="https://github.com/nitzankahana/nitzan-portfolio" target="_blank" rel="noopener noreferrer" className="resource-link">
                  💻 קוד המקור של האתר הזה
                </a>
                <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" className="resource-link">
                  📚 Claude Code Documentation
                </a>
                <a href="https://modelcontextprotocol.io/" target="_blank" rel="noopener noreferrer" className="resource-link">
                  ⚙️ מדריך MCP רשמי
                </a>
                <a href="mailto:nitzan@example.com" className="resource-link">
                  📨 צור קשר לשיתוף ידע
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Components Overview */}
      <section className="metrics-section">
        <EditableText
          id="metrics-title"
          defaultValue="🏗️ הארכיטקטורה המטורפת"
          tag="h2"
          className="metrics-title"
          isEditMode={isEditMode}
          onUpdate={updateText}
          getValue={getText}
        />
        <div className="metrics-subtitle">
          <EditableText
            id="metrics-subtitle"
            defaultValue="כך בניתי תשתית שהופכת Claude Code ממטרד עוזר לכלי שמכפיל את הפרודוקטיביות שלי פי 100"
            tag="p"
            className="metrics-subtitle"
            isEditMode={isEditMode}
            onUpdate={updateText}
            getValue={getText}
          />
        </div>
        
        <div className="architecture-container">
          <div className="architecture-grid">
            <div className="architecture-component">
              <div className="component-icon">🔗</div>
              <UniversalEditableText
                id="mcp-servers-title"
                defaultValue="MCP Servers Network"
                defaultColor={getColor('mcp-servers-title', '#ffffff')}
                tag="div"
                className="component-title"
                isEditMode={isEditMode}
                onUpdate={updateContent}
                onColorUpdate={updateColor}
              />
              <UniversalEditableText
                id="mcp-servers-desc"
                defaultValue="גשר בין Claude Code לכל המערכות: GitHub, Vercel, מערכת קבצים, ועוד 4 שכבות שמאפשרות עבודה בקצב הזה"
                defaultColor={getColor('mcp-servers-desc', '#ffffff')}
                tag="div"
                className="component-description"
                isEditMode={isEditMode}
                onUpdate={updateContent}
                onColorUpdate={updateColor}
              />
            </div>
            
            <div className="architecture-component">
              <div className="component-icon">📦</div>
              <UniversalEditableText
                id="templates-title"
                defaultValue="Templates Registry"
                defaultColor={getColor('templates-title', '#ffffff')}
                tag="div"
                className="component-title"
                isEditMode={isEditMode}
                onUpdate={updateContent}
                onColorUpdate={updateColor}
              />
              <UniversalEditableText
                id="templates-desc"
                defaultValue="תבניות מוכנות שהפכו 3 שבועות עבודה ל-30 שניות. כל תבנית כוללת הכל: קוד, בדיקות, אבטחה, deployment"
                defaultColor={getColor('templates-desc', '#ffffff')}
                tag="div"
                className="component-description"
                isEditMode={isEditMode}
                onUpdate={updateContent}
                onColorUpdate={updateColor}
              />
            </div>
            
            <div className="architecture-component">
              <div className="component-icon">⚙️</div>
              <UniversalEditableText
                id="automation-title"
                defaultValue="Automation Pipeline"
                defaultColor={getColor('automation-title', '#ffffff')}
                tag="div"
                className="component-title"
                isEditMode={isEditMode}
                onUpdate={updateContent}
                onColorUpdate={updateColor}
              />
              <UniversalEditableText
                id="automation-desc"
                defaultValue="סקריפטים שרצים ברקע ודואגים שהכל עובד מושלם: הקמה, בדיקות, deployment - הכל אוטומטי"
                defaultColor={getColor('automation-desc', '#ffffff')}
                tag="div"
                className="component-description"
                isEditMode={isEditMode}
                onUpdate={updateContent}
                onColorUpdate={updateColor}
              />
            </div>
            
            <div className="architecture-component">
              <div className="component-icon">✅</div>
              <UniversalEditableText
                id="quality-gates-title"
                defaultValue="Quality Gates"
                defaultColor={getColor('quality-gates-title', '#ffffff')}
                tag="div"
                className="component-title"
                isEditMode={isEditMode}
                onUpdate={updateContent}
                onColorUpdate={updateColor}
              />
              <UniversalEditableText
                id="quality-gates-desc"
                defaultValue="מערכת שמבטיחה שכל פרויקט יוצא ברמת enterprise: בדיקות אוטומטיות, אבטחה, ביצועים"
                defaultColor={getColor('quality-gates-desc', '#ffffff')}
                tag="div"
                className="component-description"
                isEditMode={isEditMode}
                onUpdate={updateContent}
                onColorUpdate={updateColor}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demos */}
      <section id="demo-section" className="demo-section">
        <EditableText
          id="demo-section-title"
          defaultValue="💻 הדגמות אינטרקטיביות"
          tag="h2"
          isEditMode={isEditMode}
          onUpdate={updateText}
          getValue={getText}
        />
        <DemoCarousel currentDemo={currentDemo} setCurrentDemo={setCurrentDemo} />
        
        <div className="terminal-container">
          <InteractiveTerminal 
            title="🔍 מה קורה מתחת לכיפה - Live Demo"
            commands={[
              '# התחלה: איך המערכת מנתחת בקשה',
              'claude-code --analyze-request "אני רוצה אתר portfolio"',
              '🧠 AI Analysis: Portfolio website detected',
              '📋 Template Selection: React + Modern Design',
              '🎯 Features Needed: Responsive, SEO, CMS',
              '',
              '# שלב 1: הגדרת הפרויקט',
              'claude-code --init-project portfolio-site',
              '📁 Creating project structure...',
              '⚙️  Configuring build tools (Vite + React)',
              '🔧 Setting up development environment',
              '📦 Installing optimized dependencies',
              '',
              '# שלב 2: יצירה אוטומטית של קוד',
              'claude-code --generate-components',
              '🎨 Generating responsive components',
              '✍️  Writing clean, documented code',
              '🧪 Adding automated tests',
              '🔒 Implementing security best practices',
              '',
              '# שלב 3: אינטגרציה וביטחון',
              'claude-code --setup-integrations',
              '🔗 GitHub repository created',
              '🚀 Vercel deployment configured',
              '📊 Analytics & monitoring setup',
              '✅ All systems ready!'
            ]}
          />
        </div>
      </section>

      {/* Interactive Timeline Demo - One Command Creates Full Project */}
      <section className="timeline-demo-section">
        <div className="timeline-header">
          <EditableText
            id="timeline-demo-title"
            defaultValue="✨ הקסם האמיתי: פקודה אחת, פרויקט שלם"
            tag="h2"
            isEditMode={isEditMode}
            onUpdate={updateText}
            getValue={getText}
          />
          <EditableText
            id="timeline-demo-subtitle"
            defaultValue="איך המערכת הופכת רעיון לפרויקט מושלם תוך דקות ספורות"
            tag="p"
            className="timeline-subtitle"
            isEditMode={isEditMode}
            onUpdate={updateText}
            getValue={getText}
          />
        </div>
        
        <div className="magic-timeline">
          <div className="timeline-step">
            <div className="step-icon">🎯</div>
            <div className="step-content">
              <EditableText
                id="step-1-title"
                defaultValue="שלב 1: הבנת הבקשה"
                tag="h3"
                isEditMode={isEditMode}
                onUpdate={updateText}
                getValue={getText}
              />
              <EditableText
                id="step-1-desc"
                defaultValue="המערכת מנתחת את הבקשה ומזהה שאני רוצה אתר portfolio מקצועי"
                tag="p"
                isEditMode={isEditMode}
                onUpdate={updateText}
                getValue={getText}
              />
              <div className="step-code">claude-code "אני רוצה אתר portfolio מרשים"</div>
            </div>
          </div>
          
          <div className="timeline-step">
            <div className="step-icon">🏗️</div>
            <div className="step-content">
              <EditableText
                id="step-2-title"
                defaultValue="שלב 2: בחירת ארכיטקטורה"
                tag="h3"
                isEditMode={isEditMode}
                onUpdate={updateText}
                getValue={getText}
              />
              <EditableText
                id="step-2-desc"
                defaultValue="בחירה אוטומטית של React + TypeScript + Vite על בסיס best practices"
                tag="p"
                isEditMode={isEditMode}
                onUpdate={updateText}
                getValue={getText}
              />
              <div className="step-code">✓ React 18 + TypeScript ✓ Vite ✓ Modern CSS</div>
            </div>
          </div>
          
          <div className="timeline-step">
            <div className="step-icon">🎨</div>
            <div className="step-content">
              <EditableText
                id="step-3-title"
                defaultValue="שלב 3: יצירת קוד מקצועי"
                tag="h3"
                isEditMode={isEditMode}
                onUpdate={updateText}
                getValue={getText}
              />
              <EditableText
                id="step-3-desc"
                defaultValue="כתיבה של components מודולריים, responsive design, ואנימציות חלקות"
                tag="p"
                isEditMode={isEditMode}
                onUpdate={updateText}
                getValue={getText}
              />
              <div className="step-code">+ 15 קומפוננטים + CSS מתקדם + אינטראקטיביות</div>
            </div>
          </div>
          
          <div className="timeline-step">
            <div className="step-icon">🚀</div>
            <div className="step-content">
              <EditableText
                id="step-4-title"
                defaultValue="שלב 4: Deploy אוטומטי"
                tag="h3"
                isEditMode={isEditMode}
                onUpdate={updateText}
                getValue={getText}
              />
              <EditableText
                id="step-4-desc"
                defaultValue="העלאה לגיט, קונפיגרציית Vercel, והפעלת CI/CD pipeline"
                tag="p"
                isEditMode={isEditMode}
                onUpdate={updateText}
                getValue={getText}
              />
              <div className="step-code">→ GitHub → Vercel → Live Site ✅</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Timeline Component */}
      <EnhancedTimeline />

      {/* Architecture Overview */}
      <section className="architecture-section">
        <div className="architecture-header">
          <UniversalEditableText
            id="architecture-header-title"
            defaultValue="🏗️ ארכיטקטורת המערכת המתקדמת"
            defaultColor={getColor('architecture-header-title', '#ffffff')}
            tag="h2"
            isEditMode={isEditMode}
            onUpdate={updateContent}
            onColorUpdate={updateColor}
          />
          <button 
            className="detailed-view-btn"
            onClick={() => navigate('/architecture')}
          >
            🔍 עיון מפורט בארכיטקטורה
          </button>
        </div>
        <Enhanced3DArchitecture />
      </section>

      {/* Learning Resources & Open Source */}
      <section className="resources-section">
        <UniversalEditableText
          id="resources-section-title"
          defaultValue="📚 משאבים ללמידה וקוד מקור"
          defaultColor={getColor('resources-section-title', '#ffffff')}
          tag="h2"
          isEditMode={isEditMode}
          onUpdate={updateContent}
          onColorUpdate={updateColor}
        />
        <div className="resources-grid">
          <div className="resource-card">
            <div className="resource-icon">💻</div>
            <UniversalEditableText
              id="resource-1-title"
              defaultValue="קוד המקור של האתר הזה"
              defaultColor={getColor('resource-1-title', '#ffffff')}
              tag="h3"
              isEditMode={isEditMode}
              onUpdate={updateContent}
              onColorUpdate={updateColor}
            />
            <UniversalEditableText
              id="resource-1-desc"
              defaultValue="האתר שאתם רואים עכשיו זמין בGitHub עם כל הקומפוננטים והאינטראקטיביות"
              defaultColor={getColor('resource-1-desc', '#ffffff')}
              tag="p"
              isEditMode={isEditMode}
              onUpdate={updateContent}
              onColorUpdate={updateColor}
            />
            <a href="#github-repo" className="resource-link">🔗 GitHub Repository</a>
          </div>
          <div className="resource-card">
            <div className="resource-icon">⚙️</div>
            <UniversalEditableText
              id="resource-2-title"
              defaultValue="MCP קונפיגורציות"
              defaultColor={getColor('resource-2-title', '#ffffff')}
              tag="h3"
              isEditMode={isEditMode}
              onUpdate={updateContent}
              onColorUpdate={updateColor}
            />
            <UniversalEditableText
              id="resource-2-desc"
              defaultValue="7 שרתי MCP מוכנים לשימוש עם מדריכי התקנה מפורטים"
              defaultColor={getColor('resource-2-desc', '#ffffff')}
              tag="p"
              isEditMode={isEditMode}
              onUpdate={updateContent}
              onColorUpdate={updateColor}
            />
            <a href="#mcp-configs" className="resource-link">📝 תצורות MCP</a>
          </div>
          <div className="resource-card">
            <div className="resource-icon">🛠️</div>
            <UniversalEditableText
              id="resource-3-title"
              defaultValue="סקריפטי אוטומציה"
              defaultColor={getColor('resource-3-title', '#ffffff')}
              tag="h3"
              isEditMode={isEditMode}
              onUpdate={updateContent}
              onColorUpdate={updateColor}
            />
            <UniversalEditableText
              id="resource-3-desc"
              defaultValue="4,000+ שורות סקריפטים לאוטומציה של משימות פיתוח"
              defaultColor={getColor('resource-3-desc', '#ffffff')}
              tag="p"
              isEditMode={isEditMode}
              onUpdate={updateContent}
              onColorUpdate={updateColor}
            />
            <a href="#automation-scripts" className="resource-link">⚡ סקריפטי Bash</a>
          </div>
        </div>
        
        {/* Technical Implementation Guide */}
        <div className="implementation-guide">
          <div className="guide-content">
            <UniversalEditableText
              id="implementation-guide-title"
              defaultValue="🧠 איך לבנות מערכת דומה?"
              defaultColor={getColor('implementation-guide-title', '#ffffff')}
              tag="h3"
              isEditMode={isEditMode}
              onUpdate={updateContent}
              onColorUpdate={updateColor}
            />
            <div className="implementation-steps">
              <div className="step-card">
                <div className="step-number">1</div>
                <div className="step-content">
                  <UniversalEditableText
                    id="impl-step-1-title"
                    defaultValue="התקנת Claude Code + MCP"
                    defaultColor={getColor('impl-step-1-title', '#ffffff')}
                    tag="h4"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                  <UniversalEditableText
                    id="impl-step-1-desc"
                    defaultValue="התחלה עם התקנת Claude Code ושרתי MCP בסיסיים"
                    defaultColor={getColor('impl-step-1-desc', '#ffffff')}
                    tag="p"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                </div>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <div className="step-content">
                  <UniversalEditableText
                    id="impl-step-2-title"
                    defaultValue="בניית סקריפטי אוטומציה"
                    defaultColor={getColor('impl-step-2-title', '#ffffff')}
                    tag="h4"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                  <UniversalEditableText
                    id="impl-step-2-desc"
                    defaultValue="פיתוח סקריפטים למשימות חוזרות בתהליך הפיתוח"
                    defaultColor={getColor('impl-step-2-desc', '#ffffff')}
                    tag="p"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                </div>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <div className="step-content">
                  <UniversalEditableText
                    id="impl-step-3-title"
                    defaultValue="אינטגרציות חשכים"
                    defaultColor={getColor('impl-step-3-title', '#ffffff')}
                    tag="h4"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                  <UniversalEditableText
                    id="impl-step-3-desc"
                    defaultValue="חיבור עם GitHub, Vercel, וכלים נוספים"
                    defaultColor={getColor('impl-step-3-desc', '#ffffff')}
                    tag="p"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                </div>
              </div>
              <div className="step-card">
                <div className="step-number">4</div>
                <div className="step-content">
                  <UniversalEditableText
                    id="impl-step-4-title"
                    defaultValue="הרחבה ושיפור"
                    defaultColor={getColor('impl-step-4-title', '#ffffff')}
                    tag="h4"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                  <UniversalEditableText
                    id="impl-step-4-desc"
                    defaultValue="התאמה אישית לתהליכי העבודה שלכם"
                    defaultColor={getColor('impl-step-4-desc', '#ffffff')}
                    tag="p"
                    isEditMode={isEditMode}
                    onUpdate={updateContent}
                    onColorUpdate={updateColor}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Generation Form */}
      <section id="lead-form" className="lead-section">
        <LeadForm />
      </section>

      {/* Admin Panel for Edit Mode */}
      <AdminPanel
        isEditMode={isEditMode}
        hasChanges={hasChanges}
        onToggleEditMode={toggleEditMode}
        onSaveChanges={saveChanges}
        onResetChanges={resetChanges}
      />
      
      {/* Global Edit Panel */}
      <GlobalEditPanel isEditMode={isEditMode} />
      
      {/* Content Control Panel */}
      <ContentControlPanel 
        isEditMode={isEditMode}
        onExport={exportContent}
        onImport={importContent}
      />

      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="edit-mode-indicator">
          ✏️ מצב עריכה פעיל
        </div>
      )}
    </div>
  )
}

export default Home
