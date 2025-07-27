import React from 'react';

const NodesPanel = () => {
  // Handle drag start for adding new nodes
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="nodes-panel">
      <div className="panel-header">Nodes Panel</div>
      
      <div
        className="node-item"
        onDragStart={(event) => onDragStart(event, 'messageNode')}
        draggable
      >
        <div className="node-preview">
          <div className="node-icon">💬</div>
          <span>Message</span>
        </div>
      </div>
    </div>
  );
};

export default NodesPanel;