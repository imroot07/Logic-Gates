import { useRef, useEffect } from "react";
import { useReactFlow } from "reactflow";
import BaseNode from "./BaseNode";

export default function RegisterNode(props) {
  const { setNodes } = useReactFlow();
  const save = useRef(0);

  useEffect(() => {
    if (save.current === 0 && props.data.inputs[0] === 1)
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === props.id) {
            node.data = {
              ...node.data,
              outputs: [props.data.inputs[1]],
            };
          }

          return node;
        })
      );

    save.current = props.data.inputs[0];
  }, [props.data.inputs]);

  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      outputs={props.data.outputs}
      defaultInputs={[0, 0]}
      defaultOutputs={[0]}
      width={80}
      height={60}
    >
      Reg
    </BaseNode>
  );
}
