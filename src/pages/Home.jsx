import React, { useState, useEffect, useRef } from 'react'
import InteractiveTerminal from '../components/InteractiveTerminal'
import MetricsCard from '../components/MetricsCard'
import DemoCarousel from '../components/DemoCarousel'
import ArchitectureDiagram from '../components/ArchitectureDiagram'
import LeadForm from '../components/LeadForm'
import EditableText from '../components/EditableText'
import AdminPanel from '../components/AdminPanel'
import { useEditMode } from '../hooks/useEditMode'

function Home() {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [metrics, setMetrics] = useState({
    automation: { value: 4000, unit: 'Lines' },
    servers: { value: 7, unit: 'MCP Servers' },
    templates: { value: 12, unit: 'Templates' },
    projects: { value: 50, unit: 'Projects' }
  })

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
            defaultValue="🚀 מערכת Claude Code ברמה עולמית"
            tag="h1"
            className="hero-title"
            isEditMode={isEditMode}
            onUpdate={updateText}
            getValue={getText}
          />
          <EditableText
            id="hero-subtitle"
            defaultValue="4,000+ שורות אוטומציה | 7 שרתי MCP | תבניות ארגוניות"
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
                defaultValue="🎯 צפה בהדגמה חיה"
                tag="span"
                isEditMode={isEditMode}
                onUpdate={updateText}
                getValue={getText}
              />
            </button>
            <button 
              className="secondary-cta"
              onClick={() => document.getElementById('lead-form').scrollIntoView()}
            >
              <EditableText
                id="secondary-cta-text"
                defaultValue="📚 רוצה ללמוד איך?"
                tag="span"
                isEditMode={isEditMode}
                onUpdate={updateText}
                getValue={getText}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Metrics Dashboard */}
      <section className="metrics-section">
        <EditableText
          id="metrics-title"
          defaultValue="📊 המערכת במספרים"
          tag="h2"
          isEditMode={isEditMode}
          onUpdate={updateText}
          getValue={getText}
        />
        <div className="metrics-grid">
          <MetricsCard 
            title="אוטומציה"
            value={metrics.automation.value}
            unit={metrics.automation.unit}
            icon="⚡"
            trend="+127%"
          />
          <MetricsCard 
            title="שרתי MCP"
            value={metrics.servers.value}
            unit={metrics.servers.unit}
            icon="🖥️"
            trend="+250%"
          />
          <MetricsCard 
            title="תבניות"
            value={metrics.templates.value}
            unit={metrics.templates.unit}
            icon="📋"
            trend="+400%"
          />
          <MetricsCard 
            title="פרויקטים"
            value={metrics.projects.value}
            unit={metrics.projects.unit}
            icon="🎯"
            trend="+300%"
          />
        </div>
      </section>

      {/* Interactive Demos */}
      <section id="demo-section" className="demo-section">
        <h2>💻 הדגמות אינטרקטיביות</h2>
        <DemoCarousel currentDemo={currentDemo} setCurrentDemo={setCurrentDemo} />
        
        <div className="terminal-container">
          <InteractiveTerminal 
            title="יצירת פרויקט חדש"
            commands={[
              'cd ~/claude-projects',
              './new-project.sh amazing-app --type react --interactive',
              'Selecting React + TypeScript + Vite template...',
              '✅ Project created successfully!',
              '🚀 GitHub repository created and configured',
              '📦 Dependencies installed',
              '⚡ Vercel deployment ready'
            ]}
          />
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="architecture-section">
        <h2>🏗️ ארכיטקטורת המערכת</h2>
        <ArchitectureDiagram />
      </section>

      {/* Success Stories */}
      <section className="success-section">
        <h2>🌟 סיפורי הצלחה</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"המערכת של ניצן חסכה לנו 40 שעות עבודה בשבוע"</p>
            <span>- מנהל פיתוח, חברת היי-טק</span>
          </div>
          <div className="testimonial-card">
            <p>"האוטומציה שלה שינתה לנו את כל תהליך הפיתוח"</p>
            <span>- CTO, סטארט-אפ טכנולוגי</span>
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
