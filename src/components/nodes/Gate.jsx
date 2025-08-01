import BaseNode from "./BaseNode";

export function generateDefaultGateData(numInputs, gateFunction) {
  const inputs = Array.from({ length: numInputs }, () => 0);

  return {
    inputs,
    outputs: gateFunction(inputs),
    gateFunction,
  };
}

export default function Gate(props) {
  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      outputs={props.data.outputs}
    >
      {props.data.label}
    </BaseNode>
  );
}
