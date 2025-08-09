import React, { useState } from 'react'

function GistSetup({ onSetup }) {
  const [gistUrl, setGistUrl] = useState('')
  const [showInstructions, setShowInstructions] = useState(false)
  
  const handleSetup = () => {
    // Extract Gist ID from URL
    const match = gistUrl.match(/gist\.github\.com\/([^\/]+)\/([a-f0-9]+)/)
    if (match) {
      const username = match[1]
      const gistId = match[2]
      
      // Save to localStorage
      localStorage.setItem('gist-config', JSON.stringify({ username, gistId }))
      
      alert(`✅ Gist הוגדר בהצלחה! 
      
      Username: ${username}
      Gist ID: ${gistId}
      
      האתר יטען את התוכן מה-Gist בטעינה הבאה.`)
      
      if (onSetup) onSetup({ username, gistId })
    } else {
      alert('❌ URL לא תקין. אנא הכנס URL של Gist מ-GitHub')
    }
  }
  
  return (
    <div className="gist-setup-modal">
      <div className="gist-setup-content">
        <h2>🔗 הגדרת GitHub Gist</h2>
        
        <div className="setup-instructions">
          <h3>איך להגדיר את ה-Gist:</h3>
          <ol>
            <li>
              <strong>יצירת Gist חדש:</strong>
              <a href="https://gist.github.com/new" target="_blank" rel="noopener noreferrer">
                לחץ כאן ליצירת Gist חדש
              </a>
            </li>
            <li>
              <strong>הגדרות ה-Gist:</strong>
              <ul>
                <li>Filename: <code>nitzan-portfolio-content.json</code></li>
                <li>Content: <code>{`{}`}</code> (נעדכן אחר כך)</li>
                <li>סוג: Public Gist</li>
              </ul>
            </li>
            <li>
              <strong>לחץ על "Create public gist"</strong>
            </li>
            <li>
              <strong>העתק את ה-URL של ה-Gist והדבק כאן:</strong>
            </li>
          </ol>
        </div>
        
        <div className="gist-input-section">
          <input
            type="text"
            placeholder="https://gist.github.com/username/gist_id"
            value={gistUrl}
            onChange={(e) => setGistUrl(e.target.value)}
            className="gist-url-input"
          />
          <button onClick={handleSetup} className="setup-btn">
            ✅ הגדר Gist
          </button>
        </div>
        
        <div className="example-section">
          <h4>דוגמה ל-URL תקין:</h4>
          <code>https://gist.github.com/nitzankahana/a1b2c3d4e5f6789abcdef123456</code>
        </div>
        
        <button 
          onClick={() => setShowInstructions(!showInstructions)}
          className="toggle-instructions"
        >
          {showInstructions ? '🔼 הסתר הוראות' : '🔽 הצג הוראות מפורטות'}
        </button>
        
        {showInstructions && (
          <div className="detailed-instructions">
            <h3>📚 הוראות מפורטות:</h3>
            <p>
              ה-Gist מאפשר לשמור את כל השינויים שלך באינטרנט כך שכל מי שנכנס לאתר יראה אותם.
            </p>
            <p>
              <strong>למה Gist?</strong> זה חינם, פשוט, ולא דורש שרת.
            </p>
            <p>
              <strong>איך זה עובד?</strong> כשתעשי שינויים ותייצאי אותם, תעלי את הקובץ ל-Gist והאתר יקרא משם.
            </p>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .gist-setup-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }
        
        .gist-setup-content {
          background: #1a1a2e;
          border: 2px solid #667eea;
          border-radius: 20px;
          padding: 40px;
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .gist-setup-content h2 {
          color: #667eea;
          text-align: center;
          margin-bottom: 30px;
        }
        
        .setup-instructions {
          background: rgba(102,126,234,0.1);
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 30px;
        }
        
        .setup-instructions h3 {
          color: #fff;
          margin-bottom: 15px;
        }
        
        .setup-instructions ol {
          color: #f8f9fa;
          line-height: 1.8;
        }
        
        .setup-instructions li {
          margin-bottom: 10px;
        }
        
        .setup-instructions a {
          color: #667eea;
          margin-left: 10px;
        }
        
        .setup-instructions code {
          background: #000;
          padding: 2px 8px;
          border-radius: 4px;
          color: #50fa7b;
        }
        
        .gist-input-section {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .gist-url-input {
          flex: 1;
          padding: 15px;
          background: rgba(255,255,255,0.1);
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 10px;
          color: white;
          font-size: 1rem;
        }
        
        .setup-btn {
          padding: 15px 30px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s;
        }
        
        .setup-btn:hover {
          transform: scale(1.05);
        }
        
        .example-section {
          background: #000;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        
        .example-section h4 {
          color: #667eea;
          margin-bottom: 10px;
        }
        
        .example-section code {
          color: #50fa7b;
          word-break: break-all;
        }
        
        .toggle-instructions {
          width: 100%;
          padding: 10px;
          background: rgba(102,126,234,0.2);
          border: 1px solid #667eea;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .toggle-instructions:hover {
          background: rgba(102,126,234,0.3);
        }
        
        .detailed-instructions {
          margin-top: 20px;
          padding: 20px;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        
        .detailed-instructions h3 {
          color: #667eea;
          margin-bottom: 15px;
        }
        
        .detailed-instructions p {
          color: #f8f9fa;
          line-height: 1.6;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  )
}

export default GistSetup