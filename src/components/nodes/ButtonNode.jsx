import { useCallback } from "react";
import { useSetOutputs, usePropagate } from "../hooks.js";
import BaseNode from "./BaseNode";

export function generateButtonNodeData() {
  return {
    inputs: [],
    outputs: [0],
  };
}

export default function ButtonNode(props) {
  const propagate = usePropagate();
  const setOutputs = useSetOutputs();
  const toggleOn = useCallback((event) => {
    if (event.button === 0) setOutputs(props.id, () => [1]);

    setTimeout(propagate, 0);
  }, []);
  const toggleOff = useCallback(() => {
    setOutputs(props.id, () => [0]);
    
    setTimeout(propagate, 0);
  }, []);

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
          "nodrag " +
          (props.data.outputs[0] === 1
            ? "powerStatusActive"
            : "powerStatusInactive")
        }
        style={{
          borderRadius: "50%",
          width: 40,
          height: 40,
          transition: "0.2s ease",
        }}
        onMouseDown={toggleOn}
        onMouseUp={toggleOff}
        onMouseLeave={toggleOff}
      ></div>
    </BaseNode>
  );
}
