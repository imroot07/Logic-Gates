"use client";

import BaseNode from "./BaseNode";

export function generateDefaultStateGateData({ label, numInputs, initialStates, gateFunction }) {
    const inputs = Array.from({ length: numInputs }, () => 0);

    return {
        label,
        inputs,
        states: initialStates,
        outputs: gateFunction(inputs, initialStates)[0],
        gateFunction,
    };
}

export default function StateGate(props) {
    return (
        <BaseNode
            id={props.id}
            inputs={props.data.inputs}
            outputs={props.data.outputs}
        >
            {props.data.label}
        </BaseNode>
    );
}
