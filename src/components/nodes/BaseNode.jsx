"use client";

import { useMemo } from "react";
import { Handle, Position, useEdges } from "reactflow";

const handleSpacing = 25;
const handlePadding = 0.75;

function percent(i, n) {
  return (i + handlePadding) / (n - 1 + 2 * handlePadding);
}

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
            top: `${100 - 100 * percent(i, props.inputs.length)}%`,
          }}
          isConnectable={!existingConnections.includes(String(i))}
        ></Handle>
      ))}
      <div
        className="gate"
        style={{
          width: 80,
          height: Math.max(
            50,
            handleSpacing *
              (Math.max(props.inputs.length, props.outputs.length) -
                1 +
                2 * handlePadding)
          ),
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
            top: `${100 - 100 * percent(i, props.outputs.length)}%`,
          }}
        ></Handle>
      ))}
    </>
  );
}
