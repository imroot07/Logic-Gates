import { useCallback, useEffect, useRef, useState } from "react";
import { useReactFlow } from "reactflow";
import BaseNode from "./BaseNode";

export default function DelayNode(props) {
  const { setNodes } = useReactFlow();
  const [delay, setDelay] = useState(1);

  //   const tick = useCallback(() => {
  //     console.log("2");

  //     setNodes((nodes) =>
  //       nodes.map((node) => {
  //         if (node.id === props.id) {
  //           node.data = {
  //             ...node.data,
  //             outputs: props.data.inputs ?? [0],
  //           };
  //         }

  //         return node;
  //       })
  //     );
  //   }, [props.data.inputs]);

  useEffect(() => {
    console.log("1");
  }, [props.data.inputs]);
  // const timeoutId = setTimeout(() => tick(), delay * 1000);

  // return () => clearTimeout(timeoutId);

  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      outputs={props.data.outputs}
      defaultInputs={[0]}
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
