import { useCallback } from "react";
import { useSetOutputs } from "../hooks";
import BaseNode from "./BaseNode";

export function generateDefaultButtonData() {
  return {
    inputs: [],
    outputs: [0],
  };
}

export default function Button(props) {
  const setOutputs = useSetOutputs(props.id);
  const toggleOn = useCallback(
    (event) => {
      if (event.button === 0) setOutputs([1]);
    },
    [setOutputs]
  );
  const toggleOff = useCallback(() => setOutputs([0]), [setOutputs]);

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
