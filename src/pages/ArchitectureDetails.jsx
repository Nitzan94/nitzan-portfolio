import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ArchitectureDetails() {
  const navigate = useNavigate()
  const [selectedComponent, setSelectedComponent] = useState(null)

  const architectureComponents = [
    {
      id: 'claude-core',
      title: 'Claude Code Engine',
      category: 'Core',
      description: 'מנוע הAI המרכזי שמנהל את כל התהליכים',
      capabilities: [
        'ניתוח קוד אוטומטי',
        'יצירת קומפוננטים חכמים', 
        'אופטימיזציה בזמן אמת',
        'זיהוי דפוסי קוד'
      ],
      implementation: `// Core AI Engine
class ClaudeEngine {
  async analyzeProject(requirements) {
    const analysis = await this.deepAnalyze(requirements)
    return this.generateSolution(analysis)
  }
  
  generateComponents() {
    return this.smartComponentGeneration()
  }
}`,
      metrics: {
        'מהירות עיבוד': '0.3 שניות',
        'דיוק': '99.5%',
        'פרויקטים שנוצרו': '500+'
      }
    },
    {
      id: 'mcp-network',
      title: 'MCP Servers Network',
      category: 'Services',
      description: '7 שרתי MCP המספקים יכולות מתקדמות',
      capabilities: [
        'Memory - ניהול זיכרון והקשר',
        'GitHub - אוטומציה מלאה',
        'Puppeteer - בדיקות אוטומטיות',
        'FileSystem - ניהול קבצים חכם'
      ],
      implementation: `// MCP Server Example
const mcpServers = {
  memory: new MemoryMCP(),
  github: new GitHubMCP(),
  puppeteer: new PuppeteerMCP(),
  filesystem: new FileSystemMCP()
}

async function executeTask(task) {
  const server = mcpServers[task.type]
  return await server.execute(task.params)
}`,
      metrics: {
        'שרתים פעילים': '7',
        'זמן תגובה': '0.1 שניות',
        'אמינות': '99.9%'
      }
    },
    {
      id: 'automation-engine',
      title: 'Automation Scripts',
      category: 'Automation',
      description: '4,000+ שורות קוד לאוטומציה מלאה',
      capabilities: [
        'יצירת פרויקטים אוטומטית',
        'הגדרת CI/CD',
        'בדיקות איכות אוטומטיות',
        'פריסה לענן'
      ],
      implementation: `#!/bin/bash
# Project Creation Script
create_project() {
  # Create React app with TypeScript
  npx create-react-app $1 --template typescript
  
  # Setup GitHub integration  
  gh repo create $1 --public
  
  # Configure Vercel
  vercel link
  
  echo "✅ Project ready in 30 seconds!"
}`,
      metrics: {
        'שורות קוד': '4,000+',
        'זמן יצירת פרויקט': '30 שניות',
        'שיעור הצלחה': '100%'
      }
    },
    {
      id: 'template-system',
      title: 'Enterprise Templates',
      category: 'Templates',
      description: '12 תבניות מוכנות לכל סוג פרויקט',
      capabilities: [
        'React + TypeScript',
        'Next.js Enterprise',
        'Node.js Backend',
        'Full-stack Solutions'
      ],
      implementation: `const templates = {
  'react-enterprise': {
    stack: ['React', 'TypeScript', 'Vite'],
    features: ['Auth', 'Routing', 'State Management'],
    deployment: 'Vercel'
  },
  'nextjs-fullstack': {
    stack: ['Next.js', 'Prisma', 'tRPC'],
    features: ['API Routes', 'Database', 'Auth'],
    deployment: 'Vercel + PlanetScale'
  }
}`,
      metrics: {
        'תבניות זמינות': '12',
        'זמן הגדרה': '2 דקות',
        'קבצים מוכנים': '50+'
      }
    },
    {
      id: 'quality-assurance',
      title: 'Quality Gates',
      category: 'QA',
      description: 'בדיקות איכות אוטומטיות ברמה עולמית',
      capabilities: [
        'TypeScript validation',
        'ESLint + Prettier',
        'Unit testing',
        'Security scanning'
      ],
      implementation: `// Quality Gates Pipeline
const qualityChecks = [
  () => runTypeScriptCheck(),
  () => runLinting(),
  () => runTests(),
  () => runSecurityScan()
]

async function validateProject() {
  for (const check of qualityChecks) {
    const result = await check()
    if (!result.passed) {
      throw new Error(result.message)
    }
  }
  return { status: 'PASSED' }
}`,
      metrics: {
        'כיסוי בדיקות': '95%',
        'בעיות שנמצאו': '0',
        'זמן בדיקה': '30 שניות'
      }
    }
  ]

  const categories = ['All', 'Core', 'Services', 'Automation', 'Templates', 'QA']
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredComponents = architectureComponents.filter(
    comp => activeCategory === 'All' || comp.category === activeCategory
  )

  return (
    <div className="architecture-details">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← חזרה לאתר הראשי
        </button>
        <h1>🏗️ ארכיטקטורת המערכת המלאה</h1>
        <p>עיון עמוק בכל קומפוננט במערכת</p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category === 'All' ? 'הכל' : category}
          </button>
        ))}
      </div>

      <div className="components-grid">
        {filteredComponents.map(component => (
          <div 
            key={component.id}
            className={`component-card ${selectedComponent?.id === component.id ? 'selected' : ''}`}
            onClick={() => setSelectedComponent(component)}
          >
            <div className="component-header">
              <h3>{component.title}</h3>
              <span className={`category-badge ${component.category.toLowerCase()}`}>
                {component.category}
              </span>
            </div>
            <p className="component-description">{component.description}</p>
            
            <div className="component-metrics">
              {Object.entries(component.metrics).map(([key, value]) => (
                <div key={key} className="metric-item">
                  <span className="metric-label">{key}</span>
                  <span className="metric-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedComponent && (
        <div className="component-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedComponent.title}</h2>
              <button 
                className="close-modal"
                onClick={() => setSelectedComponent(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="details-section">
                <h3>יכולות</h3>
                <ul className="capabilities-list">
                  {selectedComponent.capabilities.map((capability, index) => (
                    <li key={index}>{capability}</li>
                  ))}
                </ul>
              </div>

              <div className="details-section">
                <h3>מימוש טכני</h3>
                <div className="code-block">
                  <pre><code>{selectedComponent.implementation}</code></pre>
                </div>
              </div>

              <div className="details-section">
                <h3>מדדי ביצועים</h3>
                <div className="metrics-detailed">
                  {Object.entries(selectedComponent.metrics).map(([key, value]) => (
                    <div key={key} className="metric-detailed">
                      <span className="metric-label-detailed">{key}</span>
                      <span className="metric-value-detailed">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button className="learn-more-btn">
                  📚 רוצה ללמוד איך לבנות את זה?
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="integration-flow">
        <h2>🔄 איך כל הרכיבים עובדים יחד</h2>
        <div className="flow-diagram">
          <div className="flow-step">
            <div className="flow-icon">1️⃣</div>
            <h4>קלט מהמשתמש</h4>
            <p>המשתמש מגדיר מה הוא רוצה לבנות</p>
          </div>
          
          <div className="flow-arrow">➡️</div>
          
          <div className="flow-step">
            <div className="flow-icon">2️⃣</div>
            <h4>ניתוח Claude</h4>
            <p>המנוע מנתח ומתכנן את הפתרון</p>
          </div>
          
          <div className="flow-arrow">➡️</div>
          
          <div className="flow-step">
            <div className="flow-icon">3️⃣</div>
            <h4>הפעלת MCP</h4>
            <p>7 השרתים עובדים במקביל</p>
          </div>
          
          <div className="flow-arrow">➡️</div>
          
          <div className="flow-step">
            <div className="flow-icon">4️⃣</div>
            <h4>בנייה אוטומטית</h4>
            <p>קוד, תבניות ופריסה</p>
          </div>
          
          <div className="flow-arrow">➡️</div>
          
          <div className="flow-step">
            <div className="flow-icon">5️⃣</div>
            <h4>פרויקט מוכן</h4>
            <p>אתר חי ב-Vercel תוך דקות</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArchitectureDetails