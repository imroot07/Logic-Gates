import { useMemo } from "react";
import BaseNode from "./BaseNode";

export function generateMultiLampNodeData(numLamps) {
  return {
    inputs: Array.from({ length: numLamps }, () => 0),
    outputs: [],
  };
}

export default function MultiLampNode(props) {
  const numLamps = props.data.inputs.length;

  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      outputs={props.data.outputs}
      width={80}
      height={numLamps * 45 + 30}
    >
      <div
        style={{
          display: "block",
        }}
      >
        {Array.from({ length: numLamps }).map((_, i) => (
          <div
            key={i}
            className={
              "centerItems " +
              (props.data.inputs[numLamps - 1 - i] === 1
                ? "powerStatusActive"
                : "powerStatusInactive")
            }
            style={{
              borderRadius: 5,
              width: 35,
              height: 35,
              transition: "0.2s ease",
              margin: 10,
            }}
          >
            <div
              style={{
                borderRadius: 2,
                width: 15,
                height: 15,
                backgroundColor: "var(--nodeBg)",
              }}
            ></div>
          </div>
        ))}
      </div>
    </BaseNode>
  );
}
