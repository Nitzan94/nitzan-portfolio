import React, { useState, useRef, useEffect } from 'react'

function EditableText({ 
  id, 
  defaultValue, 
  isEditMode, 
  onUpdate, 
  getValue, 
  tag: Tag = 'p',
  className = '',
  placeholder = 'לחץ לעריכה...',
  multiline = false
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState('')
  const [tempColor, setTempColor] = useState('#ffffff')
  const inputRef = useRef(null)
  const textRef = useRef(null)

  const currentValue = getValue(id, defaultValue)
  const savedColor = localStorage.getItem(`color-${id}`) || '#ffffff'

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])
  
  useEffect(() => {
    // Apply saved color on mount
    if (textRef.current && savedColor) {
      textRef.current.style.color = savedColor
    }
  }, [savedColor])

  const startEditing = () => {
    if (!isEditMode) return
    setTempValue(currentValue)
    const currentColor = textRef.current?.style?.color || savedColor || '#ffffff'
    setTempColor(currentColor)
    setIsEditing(true)
  }

  const saveEdit = () => {
    onUpdate(id, tempValue)
    localStorage.setItem(`color-${id}`, tempColor)
    if (textRef.current) {
      textRef.current.style.color = tempColor
    }
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setTempValue('')
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      saveEdit()
    } else if (e.key === 'Escape') {
      cancelEdit()
    } else if (e.key === 'Enter' && multiline && e.ctrlKey) {
      e.preventDefault()
      saveEdit()
    }
  }

  const handleBlur = () => {
    // Small delay to allow clicking save button
    setTimeout(() => {
      if (document.activeElement?.classList.contains('edit-save-btn')) {
        return
      }
      cancelEdit()
    }, 100)
  }

  if (isEditMode && isEditing) {
    return (
      <div className={`editable-container editing ${className}`}>
        {multiline ? (
          <textarea
            ref={inputRef}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="editable-input multiline"
            rows={4}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="editable-input"
          />
        )}
        <div className="edit-controls">
          <div className="color-picker-container">
            <label htmlFor={`color-${id}`} className="color-label">צבע:</label>
            <input
              id={`color-${id}`}
              type="color"
              value={tempColor}
              onChange={(e) => setTempColor(e.target.value)}
              className="color-picker"
              title="בחר צבע לטקסט"
            />
            <div className="color-presets">
              <button 
                className="color-preset"
                style={{ background: '#ffffff' }}
                onClick={() => setTempColor('#ffffff')}
                title="לבן"
              />
              <button 
                className="color-preset"
                style={{ background: '#4ade80' }}
                onClick={() => setTempColor('#4ade80')}
                title="ירוק"
              />
              <button 
                className="color-preset"
                style={{ background: '#667eea' }}
                onClick={() => setTempColor('#667eea')}
                title="סגול"
              />
              <button 
                className="color-preset"
                style={{ background: '#ff6b6b' }}
                onClick={() => setTempColor('#ff6b6b')}
                title="אדום"
              />
            </div>
          </div>
          <button
            className="edit-save-btn"
            onClick={saveEdit}
            title="שמור (Enter)"
          >
            ✓
          </button>
          <button
            className="edit-cancel-btn"
            onClick={cancelEdit}
            title="בטל (Escape)"
          >
            ✕
          </button>
        </div>
      </div>
    )
  }

  return (
    <Tag 
      ref={textRef}
      className={`editable-text ${isEditMode ? 'editable' : ''} ${className}`}
      onClick={startEditing}
      title={isEditMode ? 'לחץ לעריכה' : ''}
      style={{
        cursor: isEditMode ? 'pointer' : 'default',
        position: 'relative'
      }}
    >
      {currentValue || (isEditMode ? placeholder : defaultValue)}
      {isEditMode && (
        <span className="edit-indicator" title="ניתן לעריכה">
          ✏️
        </span>
      )}
    </Tag>
  )
}

export default EditableText