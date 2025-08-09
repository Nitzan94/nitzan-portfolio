import React, { useState } from 'react'

function ArchitectureDiagram() {
  const [selectedNode, setSelectedNode] = useState(null)

  const nodes = [
    {
      id: 'claude',
      title: 'Claude Code',
      type: 'core',
      description: 'מנוע הAI המרכזי לפיתוח',
      connections: ['templates', 'mcp', 'automation']
    },
    {
      id: 'templates',
      title: 'Templates',
      type: 'service',
      description: '12 תבניות פרויקטים מוכנות',
      connections: ['github', 'vercel']
    },
    {
      id: 'mcp',
      title: 'MCP Servers',
      type: 'service', 
      description: '7 שרתי MCP לפונקציונליות מתקדמת',
      connections: ['memory', 'github', 'analytics']
    },
    {
      id: 'automation',
      title: 'Automation',
      type: 'feature',
      description: '4,000+ שורות קוד אוטומציה',
      connections: ['deploy', 'testing']
    },
    {
      id: 'github',
      title: 'GitHub',
      type: 'external',
      description: 'ניהול קוד ושיתוף פעולה',
      connections: ['vercel']
    },
    {
      id: 'vercel',
      title: 'Vercel',
      type: 'external',
      description: 'פריסה וחסון אוטומטיים',
      connections: []
    },
    {
      id: 'memory',
      title: 'Memory',
      type: 'mcp',
      description: 'זיכרון הקשר והחלטות',
      connections: []
    },
    {
      id: 'analytics',
      title: 'Analytics',
      type: 'mcp', 
      description: 'מעקב ואנליטיקה',
      connections: []
    }
  ]

  const getNodePosition = (index, total) => {
    // Create a more spread out, visually appealing layout
    const positions = [
      { x: 200, y: 80 },   // Claude Core - center top
      { x: 350, y: 160 },  // Templates - right
      { x: 300, y: 280 },  // MCP - bottom right
      { x: 100, y: 280 },  // Automation - bottom left
      { x: 50, y: 160 },   // GitHub - left
      { x: 200, y: 320 },  // Vercel - bottom center
      { x: 120, y: 80 },   // Memory - top left
      { x: 280, y: 80 }    // Analytics - top right
    ]
    
    return positions[index] || { x: 200, y: 150 }
  }

  const getNodeColor = (type) => {
    const colors = {
      core: '#FF6B6B',
      service: '#4ECDC4', 
      feature: '#45B7D1',
      external: '#96CEB4',
      mcp: '#FFEAA7'
    }
    return colors[type] || '#DDD'
  }

  const handleNodeClick = (node) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node)
  }

  return (
    <div className="architecture-diagram">
      <div className="diagram-container">
        <div className="diagram-instructions">
          <p>👆 לחץ על כל רכיב כדי לקבל הסבר מפורט</p>
        </div>
        <svg width="500" height="400" className="architecture-svg">
          {/* Connections */}
          {nodes.map(node => 
            node.connections.map(connId => {
              const sourcePos = getNodePosition(nodes.findIndex(n => n.id === node.id), nodes.length)
              const targetIndex = nodes.findIndex(n => n.id === connId)
              const targetPos = targetIndex >= 0 ? getNodePosition(targetIndex, nodes.length) : null
              
              if (!targetPos) return null
              
              return (
                <line
                  key={`${node.id}-${connId}`}
                  x1={sourcePos.x}
                  y1={sourcePos.y}
                  x2={targetPos.x}
                  y2={targetPos.y}
                  stroke="#E0E0E0"
                  strokeWidth="2"
                  className={selectedNode && (selectedNode.id === node.id || selectedNode.id === connId) ? 'connection-active' : 'connection'}
                />
              )
            })
          )}
          
          {/* Nodes */}
          {nodes.map((node, index) => {
            const pos = getNodePosition(index, nodes.length)
            const isSelected = selectedNode?.id === node.id
            const isConnected = selectedNode && (
              selectedNode.connections.includes(node.id) || 
              node.connections.includes(selectedNode.id)
            )
            
            return (
              <g key={node.id} className="node-group">
                {/* Pulsing effect for unselected nodes */}
                {!selectedNode && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={25}
                    fill={getNodeColor(node.type)}
                    opacity="0.3"
                    className="pulse-circle"
                  />
                )}
                
                {/* Main node circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 28 : 22}
                  fill={getNodeColor(node.type)}
                  stroke={isSelected ? '#333' : isConnected ? '#666' : '#FFF'}
                  strokeWidth={isSelected ? 4 : 2}
                  className="architecture-node"
                  onClick={() => handleNodeClick(node)}
                  style={{ cursor: 'pointer' }}
                />
                
                {/* Click hint icon */}
                {!selectedNode && (
                  <text
                    x={pos.x + 20}
                    y={pos.y - 15}
                    fontSize="12"
                    fill="#667eea"
                    className="click-hint"
                    style={{ pointerEvents: 'none' }}
                  >
                    👆
                  </text>
                )}
                
                {/* Node title */}
                <text
                  x={pos.x}
                  y={pos.y + 40}
                  textAnchor="middle"
                  className="node-label"
                  fontSize="14"
                  fontWeight="600"
                  fill="#333"
                >
                  {node.title}
                </text>
                
                {/* Node type badge */}
                <rect
                  x={pos.x - 25}
                  y={pos.y + 45}
                  width="50"
                  height="16"
                  rx="8"
                  fill={getNodeColor(node.type)}
                  opacity="0.8"
                />
                <text
                  x={pos.x}
                  y={pos.y + 55}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="white"
                >
                  {node.type}
                </text>
              </g>
            )
          })}
        </svg>
        
        {selectedNode && (
          <div className="node-details">
            <h4>{selectedNode.title}</h4>
            <p>{selectedNode.description}</p>
            <div className="node-type">
              סוג: <span className="type-badge" style={{backgroundColor: getNodeColor(selectedNode.type)}}>
                {selectedNode.type}
              </span>
            </div>
            {selectedNode.connections.length > 0 && (
              <div className="node-connections">
                <strong>קשרים:</strong>
                <div className="connections-list">
                  {selectedNode.connections.map(connId => {
                    const connNode = nodes.find(n => n.id === connId)
                    return connNode ? (
                      <span 
                        key={connId} 
                        className="connection-tag"
                        onClick={() => setSelectedNode(connNode)}
                      >
                        {connNode.title}
                      </span>
                    ) : null
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="legend">
        <h4>מקרא:</h4>
        <div className="legend-items">
          {Object.entries({
            core: 'ליבה',
            service: 'שירות', 
            feature: 'תכונה',
            external: 'חיצוני',
            mcp: 'MCP'
          }).map(([type, label]) => (
            <div key={type} className="legend-item">
              <div 
                className="legend-color" 
                style={{backgroundColor: getNodeColor(type)}}
              ></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArchitectureDiagram