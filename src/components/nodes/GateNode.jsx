import BaseNode from "./BaseNode";

export default function GateNode(props) {
  return (
    <BaseNode
      id={props.id}
      inputs={props.data.inputs}
      outputs={props.data.outputs}
      width={80}
      height={Math.max(
        70,
        Math.max(props.data.inputs.length, props.data.outputs.length) * 25,
      )}
    ></BaseNode>
  );
}
