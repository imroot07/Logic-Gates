import { useCallback, useEffect, useRef, useState } from "react";
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
import { nodeTypes } from "./nodeTypes";
import { useTickSimulation } from "./hooks";
import "./Flow.css";

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (connection) => {
      setEdges((els) => {
        const isActive =
          nodes.find((node) => node.id === connection.source).data.outputs[
            parseInt(connection.sourceHandle)
          ] === 1;

        return addEdge(
          {
            ...connection,
            style: {
              ...connection.style,
              stroke: isActive ? "white" : "var(--connOffBg)",
              strokeWidth: 1.5,
              animation: isActive ? "dashdraw 0.5s linear infinite" : null,
              strokeDasharray: isActive ? 5 : null,
            },
          },
          els
        );
      });
    },
    [setEdges, nodes]
  );
  const onEdgesDelete = useCallback(
    (eds) => {
      setNodes((nds) =>
        nds.map((node) => {
          const targetEdges = eds.filter((edge) => edge.target === node.id);

          if (targetEdges.length === 0) return node;

          return {
            ...node,
            data: {
              ...node.data,
              inputs: node.data.inputs.map((value, i) =>
                targetEdges.find((e) => parseInt(e.targetHandle) === i) == null
                  ? value
                  : 0
              ),
            },
          };
        })
      );
    },
    [setNodes]
  );
  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();

      // if (!window.confirm("Are you sure you want to delete this node?")) {
      //   return;
      // }

      const removedEdges = [];

      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setEdges((eds) =>
        eds.filter((e) => {
          if (e.source !== node.id && e.target !== node.id) {
            return true;
          }

          removedEdges.push(e);

          return false;
        })
      );

      onEdgesDelete(removedEdges);
    },
    [setNodes, setEdges, onEdgesDelete]
  );
  const onEdgeContextMenu = useCallback(
    (event, edge) => {
      event.preventDefault();

      // if (!window.confirm("Are you sure you want to delete this edge?")) {
      //   return;
      // }

      const removedEdges = [];

      setEdges((eds) =>
        eds.filter((e) => {
          if (e.id !== edge.id) {
            return true;
          }

          removedEdges.push(e);

          return false;
        })
      );

      onEdgesDelete(removedEdges);
    },
    [setEdges, onEdgesDelete]
  );

  const tickSimulation = useTickSimulation();
  const requestRef = useRef();

  const tick = useCallback(() => {
    tickSimulation(5);

    // requestRef.current = requestAnimationFrame(tick);

    requestRef.current = setTimeout(tick, 20);
  }, [tickSimulation]);

  useEffect(() => {
    // requestRef.current = requestAnimationFrame(tick);

    // return () => cancelAnimationFrame(requestRef.current);

    requestRef.current = setTimeout(tick, 500);

    return () => clearTimeout(requestRef.current);
  }, [tick]);

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
