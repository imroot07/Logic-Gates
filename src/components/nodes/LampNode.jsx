import BaseNode from "./BaseNode";

export function generateLampNodeData() {
  return {
    inputs: [0],
    outputs: [],
  };
}

export default function LampNode(props) {
  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      outputs={props.data.outputs}
      width={80}
      height={80}
    >
      <div
        className={
          "centerItems " +
          (props.data.inputs[0] === 1
            ? "powerStatusActive"
            : "powerStatusInactive")
        }
        style={{
          borderRadius: 5,
          width: 50,
          height: 50,
          transition: "0.2s ease",
        }}
      >
        <div
          style={{
            borderRadius: 2,
            width: 20,
            height: 20,
            backgroundColor: "var(--nodeBg)",
          }}
        ></div>
      </div>
    </BaseNode>
  );
}
