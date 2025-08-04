"use client";

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
import { uuidv4 } from "../utils";
import "./Flow.css";

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const shiftKey = useRef(false);
  const ctrlKey = useRef(false);

  const onConnect = useCallback(
    (connection) => {
      setEdges((currEdges) => {
        const sourceNode = nodes.find((node) => node.id === connection.source);
        const targetNode = nodes.find((node) => node.id === connection.target);

        if (shiftKey.current) {
          const usedSourceHandles = currEdges
            .filter((edge) => edge.source === sourceNode.id)
            .map((edge) => parseInt(edge.sourceHandle));
          const usedTargetHandles = currEdges
            .filter((edge) => edge.target === targetNode.id)
            .map((edge) => parseInt(edge.targetHandle));

          const sourceHandles = Array.from(
            { length: sourceNode.data.outputs.length },
            (_, i) => i
          ).filter((i) => !usedSourceHandles.includes(i));
          const targetHandles = Array.from(
            { length: targetNode.data.inputs.length },
            (_, i) => i
          ).filter((i) => !usedTargetHandles.includes(i));

          const numEdges = Math.min(sourceHandles.length, targetHandles.length);

          let newEdges = currEdges;

          for (let i = 0; i < numEdges; i++) {
            const isActive = sourceNode.data.outputs[sourceHandles[i]] === 1;
            const newConnection = {
              source: connection.source,
              target: connection.target,
              sourceHandle: String(sourceHandles[i]),
              targetHandle: String(targetHandles[i]),
              style: {
                ...connection.style,
                stroke: isActive ? "white" : "var(--connOffBg)",
                strokeWidth: 1.5,
                animation: isActive ? "dashdraw 0.5s linear infinite" : null,
                strokeDasharray: isActive ? 5 : null,
              },
            };

            newEdges = addEdge(newConnection, newEdges);
          }

          return newEdges;
        } else {
          const isActive =
            sourceNode.data.outputs[parseInt(connection.sourceHandle)] === 1;

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
            currEdges
          );
        }
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
          if (shiftKey.current) {
            if (e.source !== edge.source || e.target !== edge.target)
              return true;
          } else {
            if (e.id !== edge.id) {
              return true;
            }
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      // console.log(event.code);

      switch (event.code) {
        case "ShiftLeft":
          shiftKey.current = true;
          break;
        case "ControlLeft":
          ctrlKey.current = true;
          break;
        default:
          break;
      }
    };
    const handleKeyUp = (event) => {
      switch (event.code) {
        case "ShiftLeft":
          shiftKey.current = false;
          break;
        case "ControlLeft":
          ctrlKey.current = false;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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
