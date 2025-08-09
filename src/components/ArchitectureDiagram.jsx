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
    const angle = (index * 2 * Math.PI) / total
    const radius = 120
    const centerX = 200
    const centerY = 150
    
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    }
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
        <svg width="400" height="300" className="architecture-svg">
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
              <g key={node.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 25 : 20}
                  fill={getNodeColor(node.type)}
                  stroke={isSelected ? '#333' : isConnected ? '#666' : '#FFF'}
                  strokeWidth={isSelected ? 3 : 2}
                  className="architecture-node"
                  onClick={() => handleNodeClick(node)}
                  style={{ cursor: 'pointer' }}
                />
                <text
                  x={pos.x}
                  y={pos.y + 35}
                  textAnchor="middle"
                  className="node-label"
                  fontSize="12"
                  fill="#333"
                >
                  {node.title}
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