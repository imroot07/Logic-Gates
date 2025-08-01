import { useCallback, useMemo } from "react";
import { useSetOutputs } from "../hooks";
import BaseNode from "./BaseNode";

export function generateDefaultMultiSwitchData(numSwitches) {
  return {
    inputs: [],
    outputs: Array.from({ length: numSwitches }, () => 0),
  };
}

export default function MultiSwitch(props) {
  const setOutputs = useSetOutputs(props.id);
  const toggle = useCallback(
    (idx) => () =>
      setOutputs((data) =>
        data.outputs.map((value, i) =>
          i === idx ? (value === 1 ? 0 : 1) : value
        )
      ),
    [setOutputs]
  );
  const numSwitches = props.data.outputs.length;

  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      outputs={props.data.outputs}
      style={{
        width: 80,
        height: numSwitches * 45 + 30,
      }}
    >
      <div
        style={{
          display: "block",
        }}
      >
        {Array.from({ length: numSwitches }).map((_, i) => (
          <div
            key={i}
            className={
              props.data.outputs[numSwitches - 1 - i] === 1
                ? "powerStatusActive"
                : "powerStatusInactive"
            }
            style={{
              borderRadius: 5,
              width: 30,
              height: 30,
              transition: "0.2s ease",
              margin: 15,
            }}
            onClick={toggle(numSwitches - 1 - i)}
          ></div>
        ))}
      </div>
    </BaseNode>
  );
}
