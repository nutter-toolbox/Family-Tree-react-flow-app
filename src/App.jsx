import { useState, useCallback, useEffect } from "react";
import html2canvas from "html2canvas";
import { useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import FlowCanvas from "./components/FlowCanvas";
import NodeModal from "./components/NodeModal";
import ExportButton from "./components/ExportButton";
import useNodeRelations from "./hooks/useNodeRelations";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Parent", secondLabel: "", toggle: false, gender: "M" },
    style: { backgroundColor: "#fff" },
  },
];
const initialEdges = [];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [newLabel, setNewLabel] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [gender, setGender] = useState("M");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
    setNewLabel(node.data.label);
    setAdditionalText(node.data.secondLabel || "");
    setToggle(node.data.toggle || false);
    setGender(node.data.gender || "M");
    setShowModal(true);
  };

  const handleLabelSubmit = (event) => {
    event.preventDefault();
    if (!selectedNode) return;

    const updatedNodes = nodes.map((node) =>
      node.id === selectedNode.id
        ? {
            ...node,
            data: {
              ...node.data,
              label: newLabel,
              secondLabel: toggle ? additionalText : node.data.secondLabel,
              toggle,
              gender,
            },
            style: { backgroundColor: toggle ? "#FF9999" : "#fff" },
          }
        : node
    );
    setNodes(updatedNodes);
    setShowModal(false);
  };

  const handleAddNode = () => {
    if (!selectedNode) return;
    const newNodeId = String(nodes.length + 1);
    const newNode = {
      id: newNodeId,
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      data: {
        label: `Child ${newNodeId}`,
        secondLabel: "",
        toggle: false,
        gender: "M",
      },
      style: { backgroundColor: "#fff" },
    };
    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [
      ...eds,
      {
        id: `e${selectedNode.id}-${newNodeId}`,
        source: selectedNode.id,
        target: newNodeId,
      },
    ]);
    setShowModal(false);
  };

  const handleToggle = () => setToggle(!toggle);

  const handleUpdateParentLabels = () => {
    const updatedNodes = nodes.map((node) => {
      if (node.id === selectedNode.id) {
        return {
          ...node,
          data: { ...node.data, secondLabel: additionalText, toggle, gender },
          style: { backgroundColor: toggle ? "#FF9999" : "#fff" },
        };
      }

      const isParent = edges.some(
        (edge) => edge.target === node.id && edge.source === selectedNode.id
      );
      return isParent
        ? {
            ...node,
            data: { ...node.data, secondLabel: additionalText },
          }
        : node;
    });

    setNodes(updatedNodes);
  };

  const { parentNodes, childNodes } = useNodeRelations(
    selectedNode,
    edges,
    nodes
  );

  const handleExport = () => {
    html2canvas(document.querySelector(".react-flow")).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "diagram.png";
      link.click();
    });
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <FlowCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
      />

      <ExportButton onClick={handleExport} />

      <NodeModal
        isOpen={showModal}
        isMobile={isMobile}
        node={selectedNode}
        gender={gender}
        toggle={toggle}
        newLabel={newLabel}
        additionalText={additionalText}
        onClose={() => setShowModal(false)}
        onLabelChange={(e) => setNewLabel(e.target.value)}
        onAdditionalTextChange={(e) => setAdditionalText(e.target.value)}
        onSubmit={handleLabelSubmit}
        onToggle={handleToggle}
        onGenderChange={setGender}
        onUpdateMarriage={handleUpdateParentLabels}
        onAddChild={handleAddNode}
        parentNodes={parentNodes}
        childNodes={childNodes}
        onChildClick={handleNodeClick}
      />
    </div>
  );
}
