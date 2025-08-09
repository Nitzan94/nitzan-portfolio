import { useState, useEffect, useCallback } from 'react'

// Custom hook for managing edit mode functionality
export function useEditMode() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [editData, setEditData] = useState({})
  const [hasChanges, setHasChanges] = useState(false)

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolio-edit-data')
    if (savedData) {
      try {
        setEditData(JSON.parse(savedData))
      } catch (error) {
        console.error('Failed to load edit data:', error)
      }
    }
  }, [])

  // Check for admin access (in production, this would be a proper auth system)
  useEffect(() => {
    const adminKey = localStorage.getItem('portfolio-admin-key')
    if (adminKey === 'nitzan-admin-2025') {
      // Admin authenticated, can enable edit mode
    }
  }, [])

  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    const adminKey = prompt('הכנס מפתח מנהל:')
    if (adminKey === 'nitzan-admin-2025') {
      localStorage.setItem('portfolio-admin-key', adminKey)
      setIsEditMode(prev => !prev)
    } else if (adminKey !== null) {
      alert('מפתח שגוי!')
    }
  }, [])

  // Update text content
  const updateText = useCallback((key, value) => {
    setEditData(prev => {
      const newData = { ...prev, [key]: value }
      localStorage.setItem('portfolio-edit-data', JSON.stringify(newData))
      setHasChanges(true)
      return newData
    })
  }, [])

  // Get text content (returns edited version if exists, otherwise default)
  const getText = useCallback((key, defaultValue) => {
    return editData[key] || defaultValue
  }, [editData])

  // Save changes to server (in production, this would be an API call)
  const saveChanges = useCallback(async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setHasChanges(false)
      alert('השינויים נשמרו בהצלחה!')
    } catch (error) {
      alert('שגיאה בשמירה: ' + error.message)
    }
  }, [])

  // Reset all changes
  const resetChanges = useCallback(() => {
    if (confirm('האם אתה בטוח שברצונך לאפס את כל השינויים?')) {
      setEditData({})
      localStorage.removeItem('portfolio-edit-data')
      setHasChanges(false)
    }
  }, [])

  return {
    isEditMode,
    editData,
    hasChanges,
    toggleEditMode,
    updateText,
    getText,
    saveChanges,
    resetChanges
  }
}