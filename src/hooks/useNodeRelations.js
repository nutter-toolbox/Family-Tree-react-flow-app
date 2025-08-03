import { useMemo } from 'react';

export default function useNodeRelations(selectedNode, edges, nodes) {
  return useMemo(() => {
    if (!selectedNode) return { parentNodes: [], childNodes: [] };

    const parents = [];
    const children = [];

    edges.forEach(edge => {
      if (edge.target === selectedNode.id) {
        const parentNode = nodes.find(n => n.id === edge.source);
        if (parentNode) parents.push(parentNode);
      } else if (edge.source === selectedNode.id) {
        const childNode = nodes.find(n => n.id === edge.target);
        if (childNode) children.push(childNode);
      }
    });

    return { parentNodes: parents, childNodes: children };
  }, [selectedNode, edges, nodes]);
}
