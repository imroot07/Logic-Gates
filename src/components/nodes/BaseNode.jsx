import { useMemo } from "react";
import { Handle, Position, useEdges } from "reactflow";

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
      {props.inputs?.map((value, i) => (
        <Handle
          key={i}
          id={String(i)}
          type="target"
          position={Position.Left}
          className={value === 1 ? "powerStatusActive" : "powerStatusInactive"}
          style={{
            // width: "10px",
            // height: "10px",
            top: `${
              100 - (100 / (props.inputs.length * 3 + 1)) * (i * 3 + 2)
            }%`,
          }}
          isConnectable={!existingConnections.includes(String(i))}
        ></Handle>
      ))}
      <div
        className="gate"
        style={{
          width: props.width,
          height: props.height,
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
            // width: "10px",
            // height: "10px",
            top: `${
              100 - (100 / (props.outputs.length * 3 + 1)) * (i * 3 + 2)
            }%`,
          }}
        ></Handle>
      ))}
    </>
  );
}
