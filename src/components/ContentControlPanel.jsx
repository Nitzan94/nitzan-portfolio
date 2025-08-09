import React, { useRef, useState } from 'react'
import GistSetup from './GistSetup'

function ContentControlPanel({ isEditMode, onExport, onImport }) {
  const fileInputRef = useRef(null)
  const [showGistSetup, setShowGistSetup] = useState(false)
  
  if (!isEditMode) return null
  
  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && onImport) {
      onImport(file)
    }
  }
  
  return (
    <div className="content-control-panel">
      <h3>🎯 ניהול תוכן האתר</h3>
      
      <div className="panel-info">
        <p>⚠️ חשוב: השינויים נשמרים רק במחשב שלך כרגע</p>
        <p>כדי שאחרים יראו את השינויים:</p>
        <ol>
          <li>לחץ על "ייצא תוכן"</li>
          <li>שלח לי את הקובץ</li>
          <li>אני אעלה אותו לשרת</li>
        </ol>
      </div>
      
      <div className="panel-actions">
        <button onClick={onExport} className="export-btn">
          📥 ייצא תוכן
        </button>
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="import-btn"
        >
          📤 ייבא תוכן
        </button>
        
        <button 
          onClick={() => setShowGistSetup(true)}
          className="gist-setup-btn"
        >
          🔗 הגדר Gist
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        
        <button 
          onClick={() => {
            if (confirm('האם אתה בטוח? כל השינויים יימחקו!')) {
              localStorage.clear()
              window.location.reload()
            }
          }}
          className="reset-all-btn"
        >
          🗑️ מחק הכל
        </button>
      </div>
      
      <div className="panel-instructions">
        <h4>איך לערוך:</h4>
        <ul>
          <li>🖱️ לחץ על כל טקסט עם ✏️</li>
          <li>🎨 בחר צבע לכל טקסט</li>
          <li>💾 השינויים נשמרים אוטומטית</li>
          <li>📥 ייצא את השינויים כשסיימת</li>
        </ul>
      </div>
      
      {showGistSetup && (
        <GistSetup 
          onSetup={(config) => {
            console.log('Gist configured:', config)
            setShowGistSetup(false)
            window.location.reload() // טען מחדש עם ההגדרות החדשות
          }}
        />
      )}
    </div>
  )
}

export default ContentControlPanel