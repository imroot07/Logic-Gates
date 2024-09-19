import { useMemo } from "react";
import { useStore, useNodes, getBezierPath } from "reactflow";

export default function WireConnection({ fromX, fromY, toX, toY }) {
  const { connectionStartHandle } = useStore();
  const nodes = useNodes();
  const active = useMemo(() => {
    if (connectionStartHandle.type === "target") return false;

    const node = nodes.find((node) => node.id === connectionStartHandle.nodeId);

    if (node == null) return false;
    if (node.data.outputs == null) return false;

    return node.data.outputs[parseInt(connectionStartHandle.handleId)] === 1;
  }, [nodes]);

  return (
    <g>
      <circle
        cx={fromX}
        cy={fromY}
        fill={active ? "white" : "var(--connOffBg)"}
        r={2.5}
      />
      <path
        fill="none"
        stroke={active ? "white" : "var(--connOffBg)"}
        strokeWidth={1.5}
        className={active ? "animated" : null}
        d={
          getBezierPath({
            sourceX: fromX,
            sourceY: fromY,
            sourcePosition:
              connectionStartHandle.type === "target" ? "left" : "right",
            targetX: toX,
            targetY: toY,
            targetPosition:
              connectionStartHandle.type === "target" ? "right" : "left",
          })[0]
        }
      />
      <circle
        cx={toX}
        cy={toY}
        fill={active ? "white" : "var(--connOffBg)"}
        r={2.5}
      />
    </g>
  );
}
