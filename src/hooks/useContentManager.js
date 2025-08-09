import { useState, useEffect } from 'react'

// GitHub Gist configuration
const GIST_ID = 'ea7f454206ba60e8068a5c859228d805'
const GIST_USERNAME = 'Nitzan94'
const GIST_FILENAME = 'nitzan-portfolio-content.json'
const GIST_RAW_URL = `https://gist.githubusercontent.com/${GIST_USERNAME}/${GIST_ID}/raw/${GIST_FILENAME}`

const useContentManager = () => {
  const [content, setContent] = useState({})
  const [colors, setColors] = useState({})
  const [loading, setLoading] = useState(true)

  // Load content from Gist
  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      // נסה לטעון מ-Gist קודם
      if (GIST_ID !== 'YOUR_GIST_ID_HERE') {
        try {
          const response = await fetch(GIST_RAW_URL)
          if (response.ok) {
            const data = await response.json()
            if (data.content) {
              setContent(data.content)
              localStorage.setItem('site-content', JSON.stringify(data.content))
            }
            if (data.colors) {
              setColors(data.colors)
              localStorage.setItem('site-colors', JSON.stringify(data.colors))
            }
            console.log('תוכן נטען מ-Gist בהצלחה')
            setLoading(false)
            return
          }
        } catch (gistError) {
          console.log('לא ניתן לטעון מ-Gist, טוען מ-localStorage')
        }
      }
      
      // אם Gist לא זמין, טען מ-localStorage
      const savedContent = localStorage.getItem('site-content')
      const savedColors = localStorage.getItem('site-colors')
      
      if (savedContent) {
        setContent(JSON.parse(savedContent))
      }
      if (savedColors) {
        setColors(JSON.parse(savedColors))
      }
    } catch (error) {
      console.error('Error loading content:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateContent = (id, value) => {
    const newContent = { ...content, [id]: value }
    setContent(newContent)
    localStorage.setItem('site-content', JSON.stringify(newContent))
    
    // בעתיד - שמירה ל-Gist/Database
    // saveToGist(newContent)
  }

  const updateColor = (id, color) => {
    const newColors = { ...colors, [id]: color }
    setColors(newColors)
    localStorage.setItem('site-colors', JSON.stringify(newColors))
    
    // בעתיד - שמירה ל-Gist/Database
    // saveColorsToGist(newColors)
  }

  const getText = (id, defaultValue) => {
    return content[id] || defaultValue
  }

  const getColor = (id, defaultColor = '#ffffff') => {
    return colors[id] || defaultColor
  }

  const exportContent = () => {
    const data = {
      content,
      colors,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }
    
    // יצירת קובץ JSON להורדה
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = GIST_FILENAME
    a.click()
    
    // הצג הוראות לעדכון Gist
    alert(`
      📥 הקובץ הורד בהצלחה!
      
      כדי לעדכן את האתר לכל המבקרים:
      1. פתחי את ה-Gist שלך ב-GitHub
      2. לחצי על "Edit"
      3. החליפי את התוכן בקובץ שהורדת
      4. לחצי על "Update gist"
      
      Gist URL: https://gist.github.com/${GIST_USERNAME}/${GIST_ID}
    `)
  }

  const importContent = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (data.content) {
          setContent(data.content)
          localStorage.setItem('site-content', JSON.stringify(data.content))
        }
        if (data.colors) {
          setColors(data.colors)
          localStorage.setItem('site-colors', JSON.stringify(data.colors))
        }
        alert('התוכן יובא בהצלחה!')
      } catch (error) {
        alert('שגיאה בייבוא הקובץ')
      }
    }
    reader.readAsText(file)
  }

  return {
    content,
    colors,
    loading,
    updateContent,
    updateColor,
    getText,
    getColor,
    exportContent,
    importContent
  }
}

export default useContentManager