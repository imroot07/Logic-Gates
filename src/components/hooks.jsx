import { useCallback } from "react";
import { useReactFlow } from "reactflow";

export function useSetOutputs(id) {
  const { setNodes } = useReactFlow();

  const setOutputs = useCallback(
    (value) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                outputs: typeof value === "function" ? value(node.data) : value,
              },
            };
          }

          return node;
        })
      );
    },
    [setNodes, id]
  );

  return setOutputs;
}

export function useTickSimulation() {
  const { getNodes, setNodes, getEdges, setEdges } = useReactFlow();

  const tickSimulation = useCallback(
    (ticks) => {
      const nodes = getNodes();
      const edges = getEdges();

      let currNodes = nodes;
      let currEdges = edges;

      let newNodes;
      let newEdges;

      for (let i = 0; i < (ticks ?? 1); i++) {
        newNodes = currNodes.map((node) => {
          if (node.type !== "gate") return node;

          return {
            ...node,
            data: {
              ...node.data,
              outputs: node.data.gateFunction(node.data.inputs),
            },
          };
        });

        newEdges = currEdges.map((edge) => {
          // const sourceNode = currNodes.find((node) => node.id === edge.source);
          // const targetNode = currNodes.find((node) => node.id === edge.target);
          const sourceNode = newNodes.find((node) => node.id === edge.source);
          const targetNode = newNodes.find((node) => node.id === edge.target);
          const isActive =
            sourceNode == null
              ? false
              : sourceNode.data.outputs[parseInt(edge.sourceHandle)] === 1;

          if (sourceNode != null && targetNode != null) {
            newNodes = newNodes.map((node) => {
              if (node.id !== targetNode.id) return node;

              return {
                ...node,
                data: {
                  ...node.data,
                  inputs: node.data.inputs.map((value, i) =>
                    parseInt(edge.targetHandle) === i
                      ? isActive
                        ? 1
                        : 0
                      : value
                  ),
                },
              };
            });
          }

          return {
            ...edge,
            style: {
              ...edge.style,
              stroke: isActive ? "white" : "var(--connOffBg)",
              strokeWidth: 1.5,
              animation: isActive ? "dashdraw 0.5s linear infinite" : null,
              strokeDasharray: isActive ? 5 : null,
            },
          };
        });

        currNodes = newNodes;
        currEdges = newEdges;
      }

      setNodes(currNodes);
      setEdges(currEdges);
    },
    [getNodes, setNodes, getEdges, setEdges]
  );

  return tickSimulation;
}
