import React, { useState } from 'react'

function GlobalEditPanel({ isEditMode }) {
  const [globalColor, setGlobalColor] = useState('#ffffff')
  const [fontSize, setFontSize] = useState('16')
  const [fontFamily, setFontFamily] = useState('default')
  
  const applyGlobalColor = () => {
    // Apply to all text elements
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, li, td, th, .editable-text')
    elements.forEach(el => {
      el.style.color = globalColor
      // Save to localStorage if it has an ID
      const id = el.getAttribute('data-edit-id')
      if (id) {
        localStorage.setItem(`color-${id}`, globalColor)
      }
    })
  }
  
  const applyGlobalFontSize = () => {
    const elements = document.querySelectorAll('p, li, td, th, .editable-text')
    elements.forEach(el => {
      el.style.fontSize = `${fontSize}px`
    })
  }
  
  const applyGlobalFont = () => {
    const fontMap = {
      default: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      arial: "Arial, sans-serif",
      georgia: "Georgia, serif",
      courier: "'Courier New', monospace",
      comic: "'Comic Sans MS', cursive"
    }
    
    document.body.style.fontFamily = fontMap[fontFamily]
  }
  
  const resetAll = () => {
    if (confirm('האם אתה בטוח שברצונך לאפס את כל השינויים?')) {
      // Clear all localStorage color settings
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith('color-')) {
          localStorage.removeItem(key)
        }
      })
      
      // Reset styles
      const elements = document.querySelectorAll('[style]')
      elements.forEach(el => {
        if (el.style.color) el.style.color = ''
        if (el.style.fontSize) el.style.fontSize = ''
      })
      
      document.body.style.fontFamily = ''
      
      // Reload to apply defaults
      window.location.reload()
    }
  }
  
  if (!isEditMode) return null
  
  return (
    <div className="global-edit-panel">
      <div className="panel-header">
        <h3>🎨 עריכה גלובלית</h3>
        <button className="close-panel" onClick={() => document.querySelector('.global-edit-panel').style.display = 'none'}>
          ✕
        </button>
      </div>
      
      <div className="panel-section">
        <h4>צבע טקסט גלובלי</h4>
        <div className="global-control">
          <input
            type="color"
            value={globalColor}
            onChange={(e) => setGlobalColor(e.target.value)}
            className="global-color-picker"
          />
          <button onClick={applyGlobalColor} className="apply-btn">
            החל על כל הטקסטים
          </button>
        </div>
        
        <div className="color-presets-global">
          <button onClick={() => { setGlobalColor('#ffffff'); applyGlobalColor() }} style={{ background: '#ffffff' }} />
          <button onClick={() => { setGlobalColor('#4ade80'); applyGlobalColor() }} style={{ background: '#4ade80' }} />
          <button onClick={() => { setGlobalColor('#667eea'); applyGlobalColor() }} style={{ background: '#667eea' }} />
          <button onClick={() => { setGlobalColor('#ff6b6b'); applyGlobalColor() }} style={{ background: '#ff6b6b' }} />
          <button onClick={() => { setGlobalColor('#ffd93d'); applyGlobalColor() }} style={{ background: '#ffd93d' }} />
        </div>
      </div>
      
      <div className="panel-section">
        <h4>גודל טקסט</h4>
        <div className="global-control">
          <input
            type="range"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="font-size-slider"
          />
          <span>{fontSize}px</span>
          <button onClick={applyGlobalFontSize} className="apply-btn">
            החל
          </button>
        </div>
      </div>
      
      <div className="panel-section">
        <h4>גופן</h4>
        <select 
          value={fontFamily} 
          onChange={(e) => setFontFamily(e.target.value)}
          className="font-selector"
        >
          <option value="default">ברירת מחדל</option>
          <option value="arial">Arial</option>
          <option value="georgia">Georgia</option>
          <option value="courier">Courier New</option>
          <option value="comic">Comic Sans</option>
        </select>
        <button onClick={applyGlobalFont} className="apply-btn">
          החל
        </button>
      </div>
      
      <div className="panel-section">
        <button onClick={resetAll} className="reset-btn">
          🔄 אפס הכל
        </button>
      </div>
    </div>
  )
}

export default GlobalEditPanel