"use client";

import { useCallback } from "react";
import { useSetOutputs } from "../hooks";
import BaseNode from "./BaseNode";

export function generateDefaultSwitchData() {
  return {
    inputs: [],
    outputs: [0],
  };
}

export default function Switch(props) {
  const setOutputs = useSetOutputs(props.id);
  const toggle = useCallback(
    () => setOutputs((data) => (data.outputs[0] === 1 ? [0] : [1])),
    [setOutputs]
  );

  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      outputs={props.data.outputs}
      style={{
        width: 80,
        height: 80,
      }}
    >
      <div
        className={
          props.data.outputs[0] === 1
            ? "powerStatusActive"
            : "powerStatusInactive"
        }
        style={{
          borderRadius: 5,
          width: 40,
          height: 40,
          transition: "0.2s ease",
        }}
        onClick={toggle}
      ></div>
    </BaseNode>
  );
}
