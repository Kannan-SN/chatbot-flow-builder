import React, { useState, useEffect } from 'react';

const SettingsPanel = ({ selectedNode, onNodeUpdate, onBack }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setMessage(selectedNode.data.message || '');
    }
  }, [selectedNode]);

  const handleMessageChange = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    
    // Update node data immediately
    onNodeUpdate(selectedNode.id, { message: newMessage });
  };

  if (!selectedNode) {
    return null;
  }

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <button className="back-button" onClick={onBack}>
          ←
        </button>
        <span>Message</span>
      </div>
      
      <div className="settings-content">
        <label htmlFor="message-text">Text</label>
        <textarea
          id="message-text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter your message here..."
          rows={4}
        />
      </div>
    </div>
  );
};

export default SettingsPanel;