import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

import MessageNode from './MessageNode';
import Sidebar from './Sidebar';
import { validateFlow } from '../utils/validation';

import 'reactflow/dist/style.css';
import '../styles/FlowBuilder.css';

// Define custom node types
const nodeTypes = {
  messageNode: MessageNode,
};

const initialNodes = [];
const initialEdges = [];

const FlowBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [saveError, setSaveError] = useState('');

  // Handle node selection
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  // Handle clicking on empty space to deselect
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Handle edge connections with validation
  const onConnect = useCallback(
    (params) => {
      // Check if source handle already has a connection
      const sourceHasConnection = edges.some(
        edge => edge.source === params.source && edge.sourceHandle === params.sourceHandle
      );
      
      if (sourceHasConnection) {
        alert('Source handle can only have one outgoing connection');
        return;
      }

      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  // Handle drag and drop of new nodes
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { message: `test message ${nodes.length + 1}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes.length, setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Update node data
  const onNodeUpdate = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    );
  }, [setNodes]);

  // Handle save functionality with validation
  const onSave = useCallback(() => {
    const { isValid, errorMessage } = validateFlow(nodes, edges);
    
    if (!isValid) {
      setSaveError(errorMessage);
      setTimeout(() => setSaveError(''), 3000); // Clear error after 3 seconds
      return;
    }

    setSaveError('');
    alert('Flow saved successfully!');
    console.log('Saved flow:', { nodes, edges });
  }, [nodes, edges]);

  return (
    <div className="flow-builder">
      <div className="flow-builder-header">
        {saveError && (
          <div className="error-message">
            {saveError}
          </div>
        )}
        <button className="save-button" onClick={onSave}>
          Save Changes
        </button>
      </div>

      <div className="flow-builder-content">
        <div className="flow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>

        <Sidebar
          selectedNode={selectedNode}
          onNodeUpdate={onNodeUpdate}
          onDeselectNode={() => setSelectedNode(null)}
          showSettings={selectedNode !== null}
        />
      </div>
    </div>
  );
};

// Wrap with ReactFlowProvider
const FlowBuilderWrapper = () => (
  <ReactFlowProvider>
    <FlowBuilder />
  </ReactFlowProvider>
);

export default FlowBuilderWrapper;