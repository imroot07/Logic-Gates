import { useMemo } from "react";
import { useReactFlow } from "reactflow";
import BaseNode from "./BaseNode";

export default function MultiSwitch(props) {
  const { setNodes } = useReactFlow();
  const toggle = (idx) => () =>
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          node.data = {
            ...node.data,
            outputs:
              node.data.outputs == null
                ? Array.from({ length: props.data.numSwitches }, () => 0)
                : node.data.outputs.map((value, i) =>
                    i === idx ? (value === 1 ? 0 : 1) : value
                  ),
          };
        }

        return node;
      })
    );
  const defaultOutputs = useMemo(
    () => Array.from({ length: props.data.numSwitches }, () => 0),
    [props.data.numSwitches]
  );

  return (
    <BaseNode
      id={props.id}
      outputs={props.data.outputs}
      defaultOutputs={defaultOutputs}
      width={80}
      height={props.data.numSwitches * 45 + 30}
    >
      <div
        style={{
          display: "block",
        }}
      >
        {Array.from({ length: props.data.numSwitches }).map((_, i) => (
          <div
            key={i}
            className={
              props.data.outputs[props.data.numSwitches - 1 - i] === 1
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
            onClick={toggle(props.data.numSwitches - 1 - i)}
          ></div>
        ))}
      </div>
    </BaseNode>
  );
}
