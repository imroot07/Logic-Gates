import { useMemo } from "react";
import { Handle, Position, useEdges } from "reactflow";

const handlePadding = 0;

export default function BaseNode(props) {
  const edges = useEdges();
  const existingConnections = useMemo(
    () =>
      edges
        .filter((edge) => edge.target === props.id)
        .map((edge) => edge.targetHandle),
    [edges, props.id]
  );

  return (
    <>
      {props.inputs?.map((value, i) => {
        const percent = (i + 0.5) / props.inputs.length;

        return (
          <Handle
            key={i}
            id={String(i)}
            type="target"
            position={Position.Left}
            className={
              value === 1 ? "powerStatusActive" : "powerStatusInactive"
            }
            style={{
              top: `${100 - 100 * percent}%`,
            }}
            isConnectable={!existingConnections.includes(String(i))}
          ></Handle>
        );
      })}
      <div
        className="gate"
        style={{
          width: 80,
          height:
            25 * (Math.max(props.inputs.length, props.outputs.length) - 1) + 40,
          ...props.style,
        }}
      >
        {props.children}
      </div>
      {props.outputs?.map((value, i) => (
        <Handle
          key={i}
          id={String(i)}
          type="source"
          position={Position.Right}
          className={value === 1 ? "powerStatusActive" : "powerStatusInactive"}
          style={{
            top: `${100 - (100 * (i + 1)) / (props.outputs.length + 1)}%`,
          }}
        ></Handle>
      ))}
    </>
  );
}
