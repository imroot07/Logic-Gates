import { useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import Switch from "./nodeTypes/Switch";
import MultiSwitch from "./nodeTypes/MultiSwitch";
import Lamp from "./nodeTypes/Lamp";
import MultiLamp from "./nodeTypes/MultiLamp";
import SevenSegmentLamp from "./nodeTypes/SevenSegmentLamp";
import TableGate from "./nodeTypes/TableGate";
import Decoder from "./nodeTypes/Decoder";
import Register from "./nodeTypes/Register";
import MultiRegister from "./nodeTypes/MultiRegister";
import ShiftRegister from "./nodeTypes/ShiftRegister";
import Clock from "./nodeTypes/Clock";
import WireConnection from "./WireConnection";
import "./Flow.css";

const nodeTypes = {
  switch: Switch,
  multiSwitch: MultiSwitch,
  lamp: Lamp,
  multiLamp: MultiLamp,
  sevenSegmentLamp: SevenSegmentLamp,
  tableGate: TableGate,
  decoder: Decoder,
  register: Register,
  multiRegister: MultiRegister,
  shiftRegister: ShiftRegister,
  clock: Clock,
};

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    (connection) =>
      setEdges((els) => {
        const active =
          nodes.find((node) => node.id === connection.source).data.outputs[
            parseInt(connection.sourceHandle)
          ] === 1;

        return addEdge(
          {
            ...connection,
            style: {
              ...connection.style,
              stroke: active ? "white" : "var(--connOffBg)",
              strokeWidth: 1.5,
              animation: active ? "dashdraw 0.5s linear infinite" : null,
              strokeDasharray: active ? 5 : null,
            },
          },
          els
        );
      }),
    [nodes]
  );

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        node.data = {
          ...node.data,
          inputs: node.data.inputs.map((_, i) => {
            const edge = edges.find(
              (edge) =>
                edge.target === node.id && edge.targetHandle === String(i)
            );

            if (edge == null) return 0;

            return nodes.find((node) => node.id === edge.source).data.outputs[
              parseInt(edge.sourceHandle)
            ];
          }),
        };

        return node;
      })
    );

    setEdges((edges) =>
      edges.map((edge) => {
        const active =
          nodes.find((node) => node.id === edge.source).data.outputs[
            parseInt(edge.sourceHandle)
          ] === 1;

        edge.style = {
          ...edge.style,
          stroke: active ? "white" : "var(--connOffBg)",
          strokeWidth: 1.5,
          animation: active ? "dashdraw 0.5s linear infinite" : null,
          strokeDasharray: active ? 5 : null,
        };

        return edge;
      })
    );
  }, [nodes]);

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineComponent={WireConnection}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          id="1"
          gap={40}
          color="#181b2b"
          variant={BackgroundVariant.Lines}
        />

        <Background
          id="2"
          gap={200}
          color="#25293d"
          variant={BackgroundVariant.Lines}
        />
        <Controls />
        <MiniMap
          style={{
            borderRadius: 15,
            overflow: "hidden",
          }}
          nodeColor={(node) => {
            switch (node.type) {
              case "switch":
              case "multiSwitch":
                return "#6ede87";
              case "lamp":
              case "multiLamp":
                return "#dbcb3b";
              case "register":
              case "multiRegister":
                return "#4374d9";
              default:
                return "#878787";
            }
          }}
        />
      </ReactFlow>
    </div>
  );
}
