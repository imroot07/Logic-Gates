import BaseNode from "./BaseNode";

const spacing = 30;
const length = 40;
const width = 10;

export function generateDefaultSevenSegmentLampData() {
  return {
    inputs: [0, 0, 0, 0, 0, 0, 0],
    outputs: [],
  };
}

export default function SevenSegmentLamp(props) {
  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      outputs={props.data.outputs}
      style={{
        width: 120,
        height: 180,
      }}
    >
      <div
        className={
          props.data.inputs[0] === 1
            ? "powerStatusActive"
            : "powerStatusInactive"
        }
        style={{
          position: "absolute",
          borderRadius: 5,
          width: length,
          height: width,
          transform: `translate(0, -${spacing * 2}px)`,
          transition: "0.2s ease",
        }}
      ></div>
      <div
        className={
          props.data.inputs[1] === 1
            ? "powerStatusActive"
            : "powerStatusInactive"
        }
        style={{
          position: "absolute",
          borderRadius: 5,
          width: width,
          height: length,
          transform: `translate(${spacing}px, -${spacing}px)`,
          transition: "0.2s ease",
        }}
      ></div>
      <div
        className={
          props.data.inputs[2] === 1
            ? "powerStatusActive"
            : "powerStatusInactive"
        }
        style={{
          position: "absolute",
          borderRadius: 5,
          width: width,
          height: length,
          transform: `translate(${spacing}px, ${spacing}px)`,
          transition: "0.2s ease",
        }}
      ></div>
      <div
        className={
          props.data.inputs[3] === 1
            ? "powerStatusActive"
            : "powerStatusInactive"
        }
        style={{
          position: "absolute",
          borderRadius: 5,
          width: length,
          height: width,
          transform: `translate(0, ${spacing * 2}px)`,
          transition: "0.2s ease",
        }}
      ></div>
      <div
        className={
          props.data.inputs[4] === 1
            ? "powerStatusActive"
            : "powerStatusInactive"
        }
        style={{
          position: "absolute",
          borderRadius: 5,
          width: width,
          height: length,
          transform: `translate(-${spacing}px, ${spacing}px)`,
          transition: "0.2s ease",
        }}
      ></div>
      <div
        className={
          props.data.inputs[5] === 1
            ? "powerStatusActive"
            : "powerStatusInactive"
        }
        style={{
          position: "absolute",
          borderRadius: 5,
          width: width,
          height: length,
          transform: `translate(-${spacing}px, -${spacing}px)`,
          transition: "0.2s ease",
        }}
      ></div>
      <div
        className={
          props.data.inputs[6] === 1
            ? "powerStatusActive"
            : "powerStatusInactive"
        }
        style={{
          position: "absolute",
          borderRadius: 5,
          width: length,
          height: width,
          transition: "0.2s ease",
        }}
      ></div>
    </BaseNode>
  );
}
