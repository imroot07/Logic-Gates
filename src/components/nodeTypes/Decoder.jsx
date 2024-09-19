import { useEffect, useMemo } from "react";
import { useReactFlow } from "reactflow";
import BaseNode from "./BaseNode";

export default function Decoder(props) {
  const { setNodes } = useReactFlow();
  const numOutputs = 2 ** props.data.numInputs;
  const defaultInputs = useMemo(
    () => Array.from({ length: props.data.numInputs }, () => 0),
    [props.data.numInputs]
  );
  const defaultOutputs = useMemo(
    () => Array.from({ length: numOutputs }, () => 0),
    [props.data.numInputs]
  );

  useEffect(
    () =>
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === props.id) {
            const outputs = Array.from({ length: numOutputs }, () => 0);

            outputs[
              props.data.inputs.reduce(
                (total, curr, i) => total + (curr === 1 ? 2 ** i : 0),
                0
              )
            ] = 1;

            node.data = {
              ...node.data,
              outputs,
            };
          }

          return node;
        })
      ),
    [props.data.inputs]
  );

  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      outputs={props.data.outputs}
      defaultInputs={defaultInputs}
      defaultOutputs={defaultOutputs}
      width={80}
      height={numOutputs * 25 + 30}
    >
      Dcdr
    </BaseNode>
  );
}
