import React from 'react';
import SettingsPanel from './SettingsPanel';
import NodesPanel from './NodePanel';

const Sidebar = ({ 
  selectedNode, 
  onNodeUpdate, 
  onDeselectNode,
  showSettings 
}) => {
  return (
    <div className="sidebar">
      {showSettings && selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          onNodeUpdate={onNodeUpdate}
          onBack={onDeselectNode}
        />
      ) : (
        <NodesPanel />
      )}
    </div>
  );
};

export default Sidebar;