"use client";

import BaseNode from "./BaseNode";

export function generateDefaultGateData({ label, numInputs, gateFunction }) {
  const inputs = Array.from({ length: numInputs }, () => 0);

  return {
    label,
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
