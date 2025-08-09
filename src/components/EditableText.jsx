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
  const inputRef = useRef(null)
  const textRef = useRef(null)

  const currentValue = getValue(id, defaultValue)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const startEditing = () => {
    if (!isEditMode) return
    setTempValue(currentValue)
    setIsEditing(true)
  }

  const saveEdit = () => {
    onUpdate(id, tempValue)
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