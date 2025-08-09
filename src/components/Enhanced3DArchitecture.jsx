import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import UniversalEditableText from './UniversalEditableText'
import { useEditMode } from '../hooks/useEditMode'
import useContentManager from '../hooks/useContentManager'

function Enhanced3DArchitecture() {
  const [selectedNode, setSelectedNode] = useState(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  // Add edit mode functionality
  const { isEditMode } = useEditMode()
  const { updateContent, updateColor, getColor } = useContentManager()

  const nodes = [
    {
      id: 'claude',
      title: 'Claude Core',
      type: 'core',
      description: 'מנוע הAI המרכזי לפיתוח',
      connections: ['templates', 'mcp', 'automation'],
      position: { x: 50, y: 30 },
      color: '#FF6B6B',
      size: 120
    },
    {
      id: 'templates',
      title: 'Templates',
      type: 'service',
      description: '12 תבניות פרויקטים מוכנות',
      connections: ['github', 'vercel'],
      position: { x: 75, y: 50 },
      color: '#4ECDC4',
      size: 100
    },
    {
      id: 'mcp',
      title: 'MCP Servers',
      type: 'service', 
      description: '7 שרתי MCP לפונקציונליות מתקדמת',
      connections: ['memory', 'github', 'analytics'],
      position: { x: 70, y: 75 },
      color: '#45B7D1',
      size: 110
    },
    {
      id: 'automation',
      title: 'Automation',
      type: 'feature',
      description: '4,000+ שורות קוד אוטומציה',
      connections: ['deploy', 'testing'],
      position: { x: 25, y: 75 },
      color: '#96CEB4',
      size: 100
    },
    {
      id: 'github',
      title: 'GitHub',
      type: 'external',
      description: 'ניהול קוד ושיתוף פעולה',
      connections: ['vercel'],
      position: { x: 15, y: 50 },
      color: '#FFEAA7',
      size: 90
    },
    {
      id: 'vercel',
      title: 'Vercel',
      type: 'external',
      description: 'פריסה וחסון אוטומטיים',
      connections: [],
      position: { x: 50, y: 85 },
      color: '#FD79A8',
      size: 90
    },
    {
      id: 'memory',
      title: 'Memory',
      type: 'mcp',
      description: 'זיכרון הקשר והחלטות',
      connections: [],
      position: { x: 85, y: 25 },
      color: '#A29BFE',
      size: 75
    },
    {
      id: 'analytics',
      title: 'Analytics',
      type: 'mcp', 
      description: 'מעקב ואנליטיקה',
      connections: [],
      position: { x: 90, y: 65 },
      color: '#6C5CE7',
      size: 75
    }
  ]

  useEffect(() => {
    if (isInView) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  const handleNodeClick = (node) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node)
  }

  const isConnected = (nodeId1, nodeId2) => {
    const node1 = nodes.find(n => n.id === nodeId1)
    const node2 = nodes.find(n => n.id === nodeId2)
    return node1?.connections.includes(nodeId2) || node2?.connections.includes(nodeId1)
  }

  const getConnectionPath = (node1, node2) => {
    const x1 = node1.position.x
    const y1 = node1.position.y
    const x2 = node2.position.x
    const y2 = node2.position.y
    
    // Create curved path
    const midX = (x1 + x2) / 2
    const midY = (y1 + y2) / 2
    const offset = 10
    
    return `M ${x1} ${y1} Q ${midX + offset} ${midY + offset} ${x2} ${y2}`
  }

  return (
    <div ref={ref} className="enhanced-3d-architecture">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="architecture-header"
      >
        <UniversalEditableText
          id="3d-arch-title"
          defaultValue="🏗️ ארכיטקטורת המערכת המתקדמת"
          defaultColor={getColor('3d-arch-title', '#ffffff')}
          tag="h2"
          className="architecture-title"
          isEditMode={isEditMode}
          onUpdate={updateContent}
          onColorUpdate={updateColor}
        />
        <div className="architecture-instructions">
          <UniversalEditableText
            id="3d-arch-instructions"
            defaultValue="👆 לחץ על כל רכיב כדי לקבל הסבר מפורט | ✨ רחף עם העכבר לאפקטים"
            defaultColor={getColor('3d-arch-instructions', '#ffffff')}
            tag="p"
            isEditMode={isEditMode}
            onUpdate={updateContent}
            onColorUpdate={updateColor}
          />
        </div>
      </motion.div>

      <div className="architecture-canvas">
        <svg
          viewBox="0 0 100 100"
          className="architecture-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Animated Background Grid */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <motion.path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </pattern>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>

          <rect width="100" height="100" fill="url(#grid)" opacity={isAnimating ? 1 : 0.3} />

          {/* Connections */}
          {nodes.map(node => 
            node.connections.map(connId => {
              const connectedNode = nodes.find(n => n.id === connId)
              if (!connectedNode) return null

              const isHighlighted = 
                selectedNode && (selectedNode.id === node.id || selectedNode.id === connId) ||
                hoveredNode && (hoveredNode === node.id || hoveredNode === connId)

              return (
                <motion.path
                  key={`${node.id}-${connId}`}
                  d={getConnectionPath(node, connectedNode)}
                  fill="none"
                  stroke={isHighlighted ? "#667eea" : "rgba(255,255,255,0.3)"}
                  strokeWidth={isHighlighted ? 2 : 1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? {
                    pathLength: 1,
                    opacity: isHighlighted ? 1 : 0.6
                  } : {}}
                  transition={{ 
                    duration: 2,
                    delay: Math.random() * 1.5,
                    ease: "easeInOut"
                  }}
                  className="connection-line"
                />
              )
            })
          )}

          {/* Data Flow Animation */}
          {isAnimating && nodes.map(node =>
            node.connections.map(connId => {
              const connectedNode = nodes.find(n => n.id === connId)
              if (!connectedNode) return null

              return (
                <motion.circle
                  key={`flow-${node.id}-${connId}`}
                  r="0.8"
                  fill="#4ade80"
                  initial={{
                    offsetDistance: "0%",
                    opacity: 0
                  }}
                  animate={{
                    offsetDistance: "100%",
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "linear"
                  }}
                  style={{
                    offsetPath: `path('${getConnectionPath(node, connectedNode)}')`
                  }}
                />
              )
            })
          )}

          {/* Nodes */}
          {nodes.map((node, index) => {
            const isSelected = selectedNode?.id === node.id
            const isHovered = hoveredNode === node.id
            const isConnectedToSelected = selectedNode && 
              (selectedNode.connections.includes(node.id) || 
               node.connections.includes(selectedNode.id))

            return (
              <g key={node.id}>
                {/* Pulsing Background */}
                {(isSelected || isHovered) && (
                  <motion.circle
                    cx={node.position.x}
                    cy={node.position.y}
                    r={node.size / 200 * 1.5}
                    fill="url(#nodeGlow)"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}

                {/* Main Node */}
                <motion.circle
                  cx={node.position.x}
                  cy={node.position.y}
                  r={node.size / 200}
                  fill={node.color}
                  stroke={isSelected ? "#ffffff" : isConnectedToSelected ? "#cccccc" : "rgba(255,255,255,0.5)"}
                  strokeWidth={isSelected ? 0.8 : 0.3}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { 
                    scale: isHovered ? 1.2 : 1, 
                    opacity: 1,
                    boxShadow: isSelected ? "0 0 20px rgba(255,255,255,0.5)" : "none"
                  } : {}}
                  whileHover={{ scale: 1.2 }}
                  transition={{ 
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "backOut"
                  }}
                  onClick={() => handleNodeClick(node)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: 'pointer' }}
                  className="architecture-node-3d"
                />

                {/* Node Icon/Text */}
                <motion.text
                  x={node.position.x}
                  y={node.position.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={node.size / 200 * 8}
                  fill="white"
                  fontWeight="600"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {node.title.charAt(0)}
                </motion.text>

                {/* Node Label */}
                <motion.text
                  x={node.position.x}
                  y={node.position.y + node.size / 200 + 4}
                  textAnchor="middle"
                  fontSize="2.5"
                  fill="white"
                  fontWeight="500"
                  initial={{ opacity: 0, y: node.position.y + node.size / 200 + 6 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    y: node.position.y + node.size / 200 + 4 
                  } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.8 }}
                  style={{ pointerEvents: 'none' }}
                >
                  {node.title}
                </motion.text>

                {/* Type Badge */}
                <motion.rect
                  x={node.position.x - 4}
                  y={node.position.y + node.size / 200 + 6}
                  width="8"
                  height="2"
                  rx="1"
                  fill={node.color}
                  opacity="0.8"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 1 }}
                />
                <motion.text
                  x={node.position.x}
                  y={node.position.y + node.size / 200 + 7}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="1.5"
                  fill="white"
                  fontWeight="600"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 1.2 }}
                  style={{ pointerEvents: 'none' }}
                >
                  {node.type.toUpperCase()}
                </motion.text>
              </g>
            )
          })}
        </svg>

        {/* Node Details Panel */}
        {selectedNode && (
          <motion.div
            className="node-details-panel"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            <div className="panel-header">
              <h3>{selectedNode.title}</h3>
              <button 
                className="close-panel"
                onClick={() => setSelectedNode(null)}
              >
                ✕
              </button>
            </div>
            <div className="panel-content">
              <p className="node-description">{selectedNode.description}</p>
              <div className="node-meta">
                <span className="node-type-badge" style={{ backgroundColor: selectedNode.color }}>
                  {selectedNode.type}
                </span>
              </div>
              {selectedNode.connections.length > 0 && (
                <div className="node-connections">
                  <strong>חיבורים:</strong>
                  <div className="connections-grid">
                    {selectedNode.connections.map(connId => {
                      const connNode = nodes.find(n => n.id === connId)
                      return connNode ? (
                        <motion.button
                          key={connId}
                          className="connection-chip"
                          style={{ borderColor: connNode.color }}
                          onClick={() => setSelectedNode(connNode)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {connNode.title}
                        </motion.button>
                      ) : null
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Architecture Legend */}
      <motion.div
        className="architecture-legend"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <h4>מקרא:</h4>
        <div className="legend-items">
          {Object.entries({
            core: { label: 'ליבה', color: '#FF6B6B' },
            service: { label: 'שירות', color: '#4ECDC4' }, 
            feature: { label: 'תכונה', color: '#96CEB4' },
            external: { label: 'חיצוני', color: '#FFEAA7' },
            mcp: { label: 'MCP', color: '#A29BFE' }
          }).map(([type, config]) => (
            <div key={type} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: config.color }}
              />
              <span>{config.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Enhanced3DArchitecture