import BaseNode from "./BaseNode";

export function generateDefaultMultiLampData(numLamps) {
  return {
    inputs: Array.from({ length: numLamps }, () => 0),
    outputs: [],
  };
}

export default function MultiLamp(props) {
  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      outputs={props.data.outputs}
      style={{
        width: 80,
        height: props.data.inputs.length * 45 + 30,
      }}
    >
      <div
        style={{
          display: "block",
        }}
      >
        {Array.from({ length: props.data.inputs.length }).map((_, i) => (
          <div
            key={i}
            className={
              "centerItems " +
              (props.data.inputs[props.data.inputs.length - 1 - i] === 1
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
