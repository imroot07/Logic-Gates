import { useEffect, useRef, useState } from "react";
import { useReactFlow } from "reactflow";
import BaseNode from "./BaseNode";
import { getHasFocus } from "../../utils";

export default function Clock(props) {
  const { setNodes } = useReactFlow();
  const [delay, setDelay] = useState(1);
  const requestRef = useRef();
  const startTimeRef = useRef(performance.now());
  const active = useRef(false);

  const tick = (time) => {
    const elapsed = time - startTimeRef.current;

    if (elapsed >= delay * 1000) {
      const num = Math.floor(elapsed / delay / 1000);

      startTimeRef.current += delay * 1000 * num;
      active.current = (num % 2 === 0) === active.current;

      if (getHasFocus()) {
        setNodes((nodes) =>
          nodes.map((node) => {
            if (node.id === props.id) {
              node.data = {
                ...node.data,
                outputs: active.current ? [0] : [1],
              };
            }

            return node;
          }),
        );
      }
    }

    requestRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(requestRef.current);
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
              0.01,
            ),
          )
        }
      />
    </BaseNode>
  );
}
