import PropTypes from 'prop-types';

import { ReactFlow, MiniMap, Controls, Background } from '@xyflow/react';

FlowCanvas.propTypes = {
    nodes: PropTypes.array.isRequired,
    edges: PropTypes.array.isRequired,
    onNodesChange: PropTypes.func.isRequired,
    onEdgesChange: PropTypes.func.isRequired,
    onConnect: PropTypes.func.isRequired,
    onNodeClick: PropTypes.func.isRequired,
  };

export default function FlowCanvas({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onNodeClick }) {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      className="react-flow"
    >
      <Controls />
      <MiniMap />
      <Background variant="dots" gap={12} size={1} />
    </ReactFlow>
  );
}
