import React from 'react'

function AdminPanel({ 
  isEditMode, 
  hasChanges, 
  onToggleEditMode, 
  onSaveChanges, 
  onResetChanges 
}) {
  if (!isEditMode && !hasChanges) {
    return (
      <div className="admin-trigger">
        <button
          className="admin-trigger-btn"
          onClick={onToggleEditMode}
          title="מצב עריכה למנהלים"
        >
          ⚙️
        </button>
      </div>
    )
  }

  return (
    <div className={`admin-panel ${isEditMode ? 'edit-mode' : ''}`}>
      <div className="admin-panel-header">
        <h3>🛠️ פאנל מנהל</h3>
        <button
          className="close-edit-mode"
          onClick={onToggleEditMode}
          title="סגור מצב עריכה"
        >
          ✕
        </button>
      </div>

      <div className="admin-panel-content">
        <div className="edit-status">
          <span className={`status-indicator ${isEditMode ? 'active' : ''}`}>
            {isEditMode ? '🟢 מצב עריכה פעיל' : '🔴 מצב עריכה כבוי'}
          </span>
          {hasChanges && (
            <span className="changes-indicator">
              ⚠️ יש שינויים לא שמורים
            </span>
          )}
        </div>

        <div className="admin-actions">
          <button
            className="admin-btn save-btn"
            onClick={onSaveChanges}
            disabled={!hasChanges}
            title={hasChanges ? 'שמור את כל השינויים' : 'אין שינויים לשמירה'}
          >
            💾 שמור שינויים
          </button>
          
          <button
            className="admin-btn reset-btn"
            onClick={onResetChanges}
            disabled={!hasChanges}
            title={hasChanges ? 'אפס את כל השינויים' : 'אין שינויים לאיפוס'}
          >
            🔄 אפס שינויים
          </button>
        </div>

        {isEditMode && (
          <div className="edit-instructions">
            <h4>📋 הוראות שימוש:</h4>
            <ul>
              <li>לחץ על כל טקסט כדי לערוך אותו</li>
              <li>Enter - שמור עריכה</li>
              <li>Escape - בטל עריכה</li>
              <li>Ctrl+Enter - שמור טקסט רב-שורות</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel