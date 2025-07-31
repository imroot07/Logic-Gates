import { useCallback } from "react";
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
import WireConnection from "./WireConnection";
import { nodeTypes } from "./nodes/nodeTypes.jsx";
import "./Flow.css";
import { usePropagate } from "./hooks.js";

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const propagate = usePropagate();

  const onConnect = useCallback(
    (connection) => {
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
      });

      setTimeout(propagate, 0);
    },
    [setEdges, nodes, propagate]
  );
  const onEdgesDelete = useCallback(
    () => setTimeout(propagate, 0),
    [propagate]
  );
  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();

    // if (!window.confirm("Are you sure you want to delete this node?")) {
    //   return;
    // }

    setNodes((nds) => nds.filter((n) => n.id !== node.id));
    setEdges((eds) =>
      eds.filter((e) => e.source !== node.id && e.target !== node.id)
    );

    setTimeout(propagate, 0);
  }, []);
  const onEdgeContextMenu = useCallback((event, edge) => {
    event.preventDefault();

    // if (!window.confirm("Are you sure you want to delete this edge?")) {
    //   return;
    // }

    setEdges((eds) => eds.filter((e) => e.id !== edge.id));

    setTimeout(propagate, 0);
  });

  // useEffect(() => {
  //   setNodes((nodes) =>
  //     nodes.map((node) => {
  //       node.data.inputs = node.data.inputs.map((_, i) => {
  //         const edge = edges.find(
  //           (edge) => edge.target === node.id && edge.targetHandle === String(i)
  //         );

  //         if (edge == null) return 0;

  //         const n = nodes.find((node) => node.id === edge.source);

  //         if (n == null) return 0;

  //         return n.data.outputs[parseInt(edge.sourceHandle)];
  //       });

  //       return node;
  //     })
  //   );

  //   setEdges((edges) =>
  //     edges.map((edge) => {
  //       const n = nodes.find((node) => node.id === edge.source);
  //       const active =
  //         n == null ? false : n.data.outputs[parseInt(edge.sourceHandle)] === 1;

  //       edge.style = {
  //         ...edge.style,
  //         stroke: active ? "white" : "var(--connOffBg)",
  //         strokeWidth: 1.5,
  //         animation: active ? "dashdraw 0.5s linear infinite" : null,
  //         strokeDasharray: active ? 5 : null,
  //       };

  //       return edge;
  //     })
  //   );
  // }, [nodes]);

  // useEffect(() => {}, [edges]);

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onEdgesDelete={onEdgesDelete}
        onConnect={onConnect}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
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
              case "button":
              case "switch":
              case "multiSwitch":
                return "#6ede87";
              case "lamp":
              case "multiLamp":
                return "#dbcb3b";
              case "register":
              case "multiRegister":
              case "shiftRegister":
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
