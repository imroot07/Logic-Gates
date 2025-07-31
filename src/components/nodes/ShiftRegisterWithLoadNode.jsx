import { useRef, useEffect, useMemo } from "react";
import { useReactFlow } from "reactflow";
import BaseNode from "./BaseNode";

export default function ShiftRegisterWithLoadNode(props) {
  const { setNodes } = useReactFlow();
  const loadSave = useRef(0);
  const save = useRef(0);
  const defaultInputs = useMemo(
    () => Array.from({ length: props.data.numRegisters + 3 }, () => 0),
    [props.data.numRegisters]
  );
  const defaultOutputs = useMemo(
    () => Array.from({ length: props.data.numRegisters }, () => 0),
    [props.data.numRegisters]
  );

  useEffect(() => {
    if (loadSave.current === 0 && props.data.inputs[2] === 1) {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === props.id) {
            node.data = {
              ...node.data,
              outputs: props.data.inputs.slice(3, props.data.inputs.length),
            };
          }

          return node;
        })
      );
    } else if (save.current === 0 && props.data.inputs[0] === 1) {
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
    }

    loadSave.current = props.data.inputs[2];
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
      height={props.data.numRegisters * 25 + 60}
    >
      ShRegL
    </BaseNode>
  );
}
