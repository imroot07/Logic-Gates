import BaseNode from "./BaseNode";
import { useReactFlow } from "reactflow";

export default function Switch(props) {
  const { setNodes } = useReactFlow();
  const toggle = () =>
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          node.data = {
            ...node.data,
            outputs: node.data.outputs[0] === 1 ? [0] : [1],
          };
        }

        return node;
      }),
    );

  return (
    <BaseNode
      id={props.id}
      outputs={props.data.outputs}
      defaultOutputs={[0]}
      width={80}
      height={80}
    >
      <div
        className={
          props.data.outputs[0] === 1
            ? "powerStatusActive"
            : "powerStatusInactive"
        }
        style={{
          borderRadius: 5,
          width: 40,
          height: 40,
          transition: "0.2s ease",
        }}
        onClick={toggle}
      ></div>
    </BaseNode>
  );
}
