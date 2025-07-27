import React from 'react';
import { Handle, Position } from 'reactflow';

const MessageNode = ({ data, selected }) => {
  return (
    <div className={`message-node ${selected ? 'selected' : ''}`}>
      {/* Target Handle - can have multiple connections */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
      />
      
      <div className="node-header">
        <div className="node-icon">💬</div>
        <div className="node-title">Send Message</div>
      </div>
      
      <div className="node-content">
        {data.message || 'Click to edit message'}
      </div>
      
      {/* Source Handle - only one connection allowed */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default MessageNode;