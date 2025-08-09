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
import AdminPanel from '../components/AdminPanel'
import { useEditMode } from '../hooks/useEditMode'

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
            <a 
              className="secondary-cta"
              href="https://github.com/nitzankahana/nitzan-portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <EditableText
                id="secondary-cta-text"
                defaultValue="📖 קוד מקור ותיעוד"
                tag="span"
                isEditMode={isEditMode}
                onUpdate={updateText}
                getValue={getText}
              />
            </a>
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
            <h3>השינוי האמיתי באופן שבו אנחנו מפתחים:</h3>
            <div className="before-after">
              <div className="before">
                <h4>👨‍💻 לפני - כתיבת קוד מנואלית</h4>
                <ul>
                  <li>חושב מה אני רוצה</li>
                  <li>כותב קוד שורה אחר שורה</li>
                  <li>מתקן באגים ונלחם עם קונפיגים</li>
                  <li>מוצא פתרונות ב-Google/Stack Overflow</li>
                </ul>
              </div>
              <div className="after">
                <h4>עכשיו - שיחה עם המחשב 🤖</h4>
                <ul>
                  <li>מבין מה אני רוצה ומסביר למחשב</li>
                  <li>המחשב כותב את הקוד באיכות גבוהה</li>
                  <li>המחשב מסדר גם את כל הקונפיגים</li>
                  <li>המחשב יודע את כל הפתרונות מראש</li>
                </ul>
              </div>
            </div>
            <div className="key-insight">
              <p>💡 <strong>התובנה המרכזית:</strong> אני עדיין מפתח, אבל עכשיו אני מתמקד בלקבל החלטות אסטרטגיות, ולא בכתיבת קוד שגרה.</p>
            </div>
            
            {/* Quick Links to Resources */}
            <div className="quick-resources">
              <h4>🔗 משאבים ללמידה:</h4>
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
          defaultValue="🛠️ רכיבי המערכת המרכזיים"
          tag="h2"
          isEditMode={isEditMode}
          onUpdate={updateText}
          getValue={getText}
        />
        <div className="metrics-grid">
          <MetricsCard 
            title="שורות אוטומציה"
            value={metrics.automation.value}
            unit="Lines Code"
            icon="⚡"
            trend="Quality First"
          />
          <MetricsCard 
            title="MCP Servers"
            value={metrics.servers.value}
            unit="Active Plugins"
            icon="🖥️"
            trend="Modular"
          />
          <MetricsCard 
            title="Project Templates"
            value={metrics.templates.value}
            unit="Ready to Use"
            icon="📋"
            trend="Production Ready"
          />
          <MetricsCard 
            title="Built Projects"
            value={metrics.projects.value}
            unit="Successfully"
            icon="🎯"
            trend="Zero Errors"
          />
        </div>
      </section>

      {/* Interactive Demos */}
      <section id="demo-section" className="demo-section">
        <h2>💻 הדגמות אינטרקטיביות</h2>
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

      {/* Build Process Timeline */}
      <EnhancedTimeline />

      {/* Architecture Overview */}
      <section className="architecture-section">
        <div className="architecture-header">
          <h2>🏗️ ארכיטקטורת המערכת המתקדמת</h2>
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
        <h2>📚 משאבים ללמידה וקוד מקור</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <div className="resource-icon">💻</div>
            <h3>קוד המקור של האתר הזה</h3>
            <p>האתר שאתם רואים עכשיו זמין בGitHub עם כל הקומפוננטים והאינטראקטיביות</p>
            <a href="#github-repo" className="resource-link">🔗 GitHub Repository</a>
          </div>
          <div className="resource-card">
            <div className="resource-icon">⚙️</div>
            <h3>MCP קונפיגורציות</h3>
            <p>7 שרתי MCP מוכנים לשימוש עם מדריכי התקנה מפורטים</p>
            <a href="#mcp-configs" className="resource-link">📝 תצורות MCP</a>
          </div>
          <div className="resource-card">
            <div className="resource-icon">🛠️</div>
            <h3>סקריפטי אוטומציה</h3>
            <p>4,000+ שורות סקריפטים לאוטומציה של משימות פיתוח</p>
            <a href="#automation-scripts" className="resource-link">⚡ סקריפטי Bash</a>
          </div>
        </div>
        
        {/* Technical Implementation Guide */}
        <div className="implementation-guide">
          <div className="guide-content">
            <h3>🧠 איך לבנות מערכת דומה?</h3>
            <div className="implementation-steps">
              <div className="step-card">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>התקנת Claude Code + MCP</h4>
                  <p>התחלה עם התקנת Claude Code ושרתי MCP בסיסיים</p>
                </div>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>בניית סקריפטי אוטומציה</h4>
                  <p>פיתוח סקריפטים למשימות חוזרות בתהליך הפיתוח</p>
                </div>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>אינטגרציות חשכים</h4>
                  <p>חיבור עם GitHub, Vercel, וכלים נוספים</p>
                </div>
              </div>
              <div className="step-card">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>הרחבה ושיפור</h4>
                  <p>התאמה אישית לתהליכי העבודה שלכם</p>
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
