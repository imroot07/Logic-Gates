import { useRef, useEffect, useMemo } from "react";
import { useReactFlow } from "reactflow";
import BaseNode from "./BaseNode";

export default function MultiRegister(props) {
  const { setNodes } = useReactFlow();
  const save = useRef(0);
  const defaultInputs = useMemo(
    () => Array.from({ length: props.data.numRegisters + 1 }, () => 0),
    [props.data.numRegisters],
  );
  const defaultOutputs = useMemo(
    () => Array.from({ length: props.data.numRegisters }, () => 0),
    [props.data.numRegisters],
  );

  useEffect(() => {
    if (
      save.current === 0 &&
      props.data.inputs[0] === 1
    )
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === props.id) {
            node.data = {
              ...node.data,
              outputs: props.data.inputs.filter(
                (_, i) => i !== 0,
              ),
            };
          }

          return node;
        }),
      );

    save.current = props.data.inputs[0];
  }, [props.data.inputs]);

  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      outputs={props.data.outputs}
      defaultInputs={defaultInputs}
      defaultOutputs={defaultOutputs}
      width={80}
      height={props.data.numRegisters * 25 + 40}
    >
      Reg
    </BaseNode>
  );
}
