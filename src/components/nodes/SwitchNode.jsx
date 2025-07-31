import { useCallback } from "react";
import { usePropagate, useSetOutputs } from "../hooks.js";
import BaseNode from "./BaseNode";

export function generateSwitchNodeData() {
  return {
    inputs: [],
    outputs: [0],
  };
}

export default function SwitchNode(props) {
  const propagate = usePropagate();
  const setOutputs = useSetOutputs();
  const toggle = useCallback(() => {
    setOutputs(props.id, (data) => (data.outputs[0] === 1 ? [0] : [1]));

    setTimeout(propagate, 0);
  }, [props.id, propagate, setOutputs]);

  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      outputs={props.data.outputs}
      width={80}
      height={80}
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
