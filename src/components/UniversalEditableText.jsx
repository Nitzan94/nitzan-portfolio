import React, { useState, useRef, useEffect } from 'react'

function UniversalEditableText({ 
  id, 
  defaultValue, 
  defaultColor = '#ffffff',
  isEditMode, 
  onUpdate,
  onColorUpdate,
  tag: Tag = 'p',
  className = '',
  style = {}
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(defaultValue)
  const [tempColor, setTempColor] = useState(defaultColor)
  const textRef = useRef(null)

  useEffect(() => {
    // Apply color on mount and when it changes
    if (textRef.current) {
      textRef.current.style.color = defaultColor
    }
  }, [defaultColor])

  const startEditing = () => {
    if (!isEditMode) return
    setTempValue(defaultValue)
    setTempColor(defaultColor)
    setIsEditing(true)
  }

  const saveChanges = () => {
    if (onUpdate) onUpdate(id, tempValue)
    if (onColorUpdate) onColorUpdate(id, tempColor)
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setTempValue(defaultValue)
    setTempColor(defaultColor)
    setIsEditing(false)
  }

  if (isEditMode && isEditing) {
    return (
      <div className="universal-edit-container">
        <textarea
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="universal-edit-input"
          rows={3}
          autoFocus
        />
        
        <div className="universal-edit-controls">
          <div className="color-section">
            <label>צבע טקסט:</label>
            <input
              type="color"
              value={tempColor}
              onChange={(e) => setTempColor(e.target.value)}
              className="color-input"
            />
            <div className="quick-colors">
              {['#ffffff', '#4ade80', '#667eea', '#ff6b6b', '#ffd93d'].map(color => (
                <button
                  key={color}
                  className="quick-color"
                  style={{ background: color }}
                  onClick={() => setTempColor(color)}
                />
              ))}
            </div>
          </div>
          
          <div className="action-buttons">
            <button onClick={saveChanges} className="save-btn">
              ✓ שמור
            </button>
            <button onClick={cancelEdit} className="cancel-btn">
              ✕ בטל
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Tag 
      ref={textRef}
      className={`${className} ${isEditMode ? 'editable-universal' : ''}`}
      onClick={startEditing}
      style={{
        ...style,
        color: defaultColor,
        cursor: isEditMode ? 'pointer' : 'inherit',
        position: 'relative'
      }}
    >
      {defaultValue}
      {isEditMode && (
        <span className="edit-indicator-universal">✏️</span>
      )}
    </Tag>
  )
}

export default UniversalEditableText