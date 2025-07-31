import { useCallback } from "react";
import { useReactFlow } from "reactflow";

export function useSetOutputs() {
  const { setNodes } = useReactFlow();

  const setOutputs = useCallback(
    (id, cb) =>
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                outputs: cb(node.data),
              },
            };
          }

          return node;
        })
      ),
    [setNodes]
  );

  return setOutputs;
}

export function usePropagate() {
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();

  // useCallback ensures this function has a stable reference
  const propagateUpdates = useCallback(() => {
    // Get the most current state of the graph
    const nodes = getNodes();
    const edges = getEdges();

    // --- Calculate the new state without immediately setting it ---

    // Calculate new inputs for every node
    const newNodes = nodes.map((node) => {
      // For each node, find its new input values
      const newInputs = node.data.inputs.map((_, i) => {
        // Find the edge connected to this input handle
        const edge = edges.find(
          (edge) => edge.target === node.id && edge.targetHandle === String(i)
        );

        if (!edge) return 0; // No connection, so input is 0

        // Find the source node of that edge
        const sourceNode = nodes.find((n) => n.id === edge.source);

        if (!sourceNode) return 0; // Source node not found

        // The new input value is the source node's output value
        const outputValue =
          sourceNode.data.outputs[parseInt(edge.sourceHandle)];
        return outputValue ?? 0;
      });

      // Return a new node object with the updated inputs
      // This is still an IMMUTABLE update
      return {
        ...node,
        data: {
          ...node.data,
          inputs: newInputs,
        },
      };
    });

    // Calculate new styles for every edge
    const newEdges = edges.map((edge) => {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      const isActive = sourceNode
        ? sourceNode.data.outputs[parseInt(edge.sourceHandle)] === 1
        : false;

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

    // --- Apply the new state in a single, atomic update ---
    setNodes(newNodes);
    setEdges(newEdges);
  }, [getNodes, getEdges, setNodes, setEdges]);

  return propagateUpdates;
}
