import React, { useState, useEffect, useRef } from 'react'

function InteractiveTerminal({ title, commands }) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [completedCommands, setCompletedCommands] = useState([])
  const terminalRef = useRef(null)

  const startDemo = () => {
    setIsStarted(true)
    setCurrentCommandIndex(0)
    setCompletedCommands([])
    setCurrentText('')
    setIsTyping(true)
  }

  useEffect(() => {
    if (!isStarted || !isTyping || currentCommandIndex >= commands.length) {
      return
    }

    const command = commands[currentCommandIndex]
    let charIndex = 0

    const typeCommand = () => {
      if (charIndex <= command.length) {
        setCurrentText(command.slice(0, charIndex))
        charIndex++
        setTimeout(typeCommand, 50 + Math.random() * 50) // Realistic typing speed
      } else {
        // Command completed
        setTimeout(() => {
          setCompletedCommands(prev => [...prev, command])
          setCurrentText('')
          setCurrentCommandIndex(prev => prev + 1)
          
          if (currentCommandIndex + 1 >= commands.length) {
            setIsTyping(false)
          }
        }, 1000)
      }
    }

    setTimeout(typeCommand, 500)
  }, [currentCommandIndex, isStarted, isTyping, commands])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [completedCommands, currentText])

  return (
    <div className="interactive-terminal">
      <div className="terminal-header">
        <div className="terminal-controls">
          <div className="control close"></div>
          <div className="control minimize"></div>
          <div className="control maximize"></div>
        </div>
        <div className="terminal-title">{title}</div>
        <button 
          className="terminal-replay" 
          onClick={startDemo}
          disabled={isTyping}
        >
          {isStarted ? '🔄 השעתק' : '▶️ התחל'}
        </button>
      </div>
      
      <div className="terminal-body" ref={terminalRef}>
        {completedCommands.map((command, index) => (
          <div key={index} className="terminal-line completed">
            {command.startsWith('✅') || command.startsWith('🚀') || command.startsWith('📦') || command.startsWith('⚡') ? (
              <span className="success-output">{command}</span>
            ) : command.includes('$') || command.includes('./') || command.includes('cd') ? (
              <><span className="prompt">nitzan@claude:~$ </span><span className="command">{command}</span></>
            ) : (
              <span className="output">{command}</span>
            )}
          </div>
        ))}
        
        {isTyping && currentText && (
          <div className="terminal-line current">
            <span className="prompt">nitzan@claude:~$ </span>
            <span className="command">{currentText}</span>
            <span className="cursor">█</span>
          </div>
        )}
        
        {!isStarted && (
          <div className="terminal-placeholder">
            <div className="placeholder-text">לחץ 'התחל' כדי לראות הדגמה חיה</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InteractiveTerminal