import { useMemo } from "react";
import BaseNode from "./BaseNode";

export default function MultiLamp(props) {
  const defaultInputs = useMemo(
    () => Array.from({ length: props.data.numLamps }, () => 0),
    [props.data.numLamps]
  );

  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      defaultInputs={defaultInputs}
      width={80}
      height={props.data.numLamps * 45 + 30}
    >
      <div
        style={{
          display: "block",
        }}
      >
        {Array.from({ length: props.data.numLamps }).map((_, i) => (
          <div
            key={i}
            className={
              "centerItems " +
              (props.data.inputs[props.data.numLamps - 1 - i] === 1
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
