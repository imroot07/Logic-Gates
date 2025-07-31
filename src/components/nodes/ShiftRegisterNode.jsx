import { useRef, useEffect, useMemo } from "react";
import { useReactFlow } from "reactflow";
import BaseNode from "./BaseNode";

export default function ShiftRegisterNode(props) {
  const { setNodes } = useReactFlow();
  const save = useRef(0);
  const defaultOutputs = useMemo(
    () => Array.from({ length: props.data.numRegisters }, () => 0),
    [props.data.numRegisters]
  );

  useEffect(() => {
    if (save.current === 0 && props.data.inputs[0] === 1)
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === props.id) {
            let outputs = [...props.data.outputs];
            outputs.pop();
            outputs.unshift(props.data.inputs[1]);
            node.data = {
              ...node.data,
              outputs,
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
      defaultOutputs={defaultOutputs}
      width={80}
      height={props.data.numRegisters * 25 + 40}
    >
      ShReg
    </BaseNode>
  );
}
