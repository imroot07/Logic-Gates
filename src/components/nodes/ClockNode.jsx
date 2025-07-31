import { useCallback, useEffect, useRef, useState } from "react";
import { useReactFlow } from "reactflow";
import { useSetOutputs } from "../hooks.js";
import BaseNode from "./BaseNode";

export default function ClockNode(props) {
  const { setNodes } = useReactFlow();
  const [delay, setDelay] = useState(1);

  const tick = useCallback(() => {
    if (!getHasFocus()) return;

    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          node.data = {
            ...node.data,
            outputs: node.data.outputs[0] === 1 ? [0] : [1],
          };
        }

        return node;
      })
    );
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => tick(), delay * 1000);

    return () => clearInterval(intervalId);
  }, [delay]);

  return (
    <BaseNode
      id={props.id}
      outputs={props.data.outputs}
      defaultOutputs={[0]}
      width={80}
      height={60}
    >
      <input
        defaultValue="1"
        style={{
          width: 40,
          border: "none",
          borderRadius: 5,
        }}
        className="nodrag"
        onChange={(event) =>
          setDelay(
            Math.max(
              isNaN(parseFloat(event.target.value))
                ? 1
                : parseFloat(event.target.value),
              0.01
            )
          )
        }
      />
    </BaseNode>
  );
}
