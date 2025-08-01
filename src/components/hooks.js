import { useCallback } from "react";
import { useReactFlow } from "reactflow";

export function useSetOutputs(id) {
  const { setNodes } = useReactFlow();

  const setOutputs = useCallback(
    (value) => {
      const newOutputs = typeof value == "function" ? value(node.data) : value;

      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                outputs: newOutputs,
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
