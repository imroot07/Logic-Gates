import { useEffect, useMemo } from "react";
import { useReactFlow } from "reactflow";
import BaseNode from "./BaseNode";

export default function TableGate(props) {
  const { setNodes } = useReactFlow();
  const defaultInputs = useMemo(
    () => Array.from({ length: props.data.numInputs }, () => 0),
    [props.data.numInputs],
  );

  useEffect(
    () =>
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === props.id) {
            node.data = {
              ...node.data,
              outputs: props.data.table[
                props.data.inputs.reduce(
                  (total, curr, i) => total + (curr === 1 ? 2 ** i : 0),
                  0,
                )
              ].map((value, i) =>
                value === "latch" ? props.data.outputs[i] ?? 0 : value,
              ),
            };
          }

          return node;
        }),
      ),
    [props.data.inputs],
  );

  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      outputs={props.data.outputs}
      defaultInputs={defaultInputs}
      defaultOutputs={props.data.table[0].map((value, i) =>
        value === "latch" ? props.data.outputs[i] ?? 0 : value,
      )}
      width={props.data.width ?? 80}
      height={props.data.height ?? 60}
    >
      {props.data.label}
    </BaseNode>
  );
}
