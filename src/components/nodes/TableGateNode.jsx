import { useEffect, useMemo } from "react";
import { usePropagate, useSetOutputs } from "../hooks.js";
import BaseNode from "./BaseNode";

export function generateTableGateNodeData(table, label) {
  return {
    inputs: Array.from({ length: Math.log2(table.length) }, () => 0),
    outputs: table[0],
    table,
    label,
  };
}

export default function TableGateNode(props) {
  const propagate = usePropagate();
  const setOutputs = useSetOutputs();
  const inputsString = useMemo(
    () => JSON.stringify(props.data.inputs),
    [props.data.inputs]
  );

  useEffect(() => {
    setOutputs(props.id, (data) =>
      data.table[
        data.inputs.reduce(
          (total, curr, i) => total + (curr === 1 ? 2 ** i : 0),
          0
        )
      ].map((value, i) => (value === "latch" ? data.outputs[i] ?? 0 : value))
    );

    setTimeout(propagate, 0);
  }, [inputsString, props.id, setOutputs, propagate]);

  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      outputs={props.data.outputs}
      width={props.data.width ?? 80}
      height={props.data.height ?? 60}
    >
      {props.data.label}
    </BaseNode>
  );
}
