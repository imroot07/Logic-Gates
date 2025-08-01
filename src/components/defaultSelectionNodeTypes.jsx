import { Generators } from "./nodes";

// Table gate function
// data.table[
//         data.inputs.reduce(
//           (total, curr, i) => total + (curr === 1 ? 2 ** i : 0),
//           0
//         )
//       ].map((value, i) => (value === "latch" ? data.outputs[i] ?? 0 : value))

// Decoder gate function
// const outputs = Array.from({ length: numOutputs }, () => 0);

//             outputs[
//               props.data.inputs.reduce(
//                 (total, curr, i) => total + (curr === 1 ? 2 ** i : 0),
//                 0
//               )
//             ] = 1;

export const defaultSelectionNodeTypes = [
  {
    name: "Button",
    type: "button",
    dataGenerator: () => Generators.generateDefaultButtonData(),
  },
  {
    name: "Switch",
    type: "switch",
    dataGenerator: () => Generators.generateDefaultSwitchData(),
  },
  {
    name: "4 Switch",
    type: "multiSwitch",
    dataGenerator: () => Generators.generateDefaultMultiSwitchData(4),
  },
  {
    name: "Clock",
    type: "clock",
    dataGenerator: () => Generators.generateDefaultClockData(),
  },
  {
    name: "Lamp",
    type: "lamp",
    dataGenerator: () => Generators.generateDefaultLampData(),
  },
  {
    name: "4 Lamp",
    type: "multiLamp",
    dataGenerator: () => Generators.generateDefaultMultiLampData(4),
  },
  {
    name: "7 Segment",
    type: "sevenSegmentLamp",
    dataGenerator: () => Generators.generateDefaultSevenSegmentLampData(),
  },
  {
    name: "Not Gate",
    type: "gate",
    dataGenerator: () =>
      Generators.generateDefaultGateData({
        label: "Not",
        numInputs: 1,
        gateFunction: (inputs) => (inputs[0] === 1 ? [0] : [1]),
      }),
  },
  {
    name: "Or Gate",
    type: "gate",
    dataGenerator: () =>
      Generators.generateDefaultGateData({
        label: "Or",
        numInputs: 2,
        gateFunction: (inputs) =>
          inputs[0] === 1 || inputs[1] === 1 ? [1] : [0],
      }),
  },
  {
    name: "Nor Gate",
    type: "gate",
    dataGenerator: () =>
      Generators.generateDefaultGateData({
        label: "Nor",
        numInputs: 2,
        gateFunction: (inputs) =>
          inputs[0] === 1 || inputs[1] === 1 ? [0] : [1],
      }),
  },
  {
    name: "And Gate",
    type: "gate",
    dataGenerator: () =>
      Generators.generateDefaultGateData({
        label: "And",
        numInputs: 2,
        gateFunction: (inputs) =>
          inputs[0] === 1 && inputs[1] === 1 ? [1] : [0],
      }),
  },
  {
    name: "Nand Gate",
    type: "gate",
    dataGenerator: () =>
      Generators.generateDefaultGateData({
        label: "Nand",
        numInputs: 2,
        gateFunction: (inputs) =>
          inputs[0] === 1 && inputs[1] === 1 ? [0] : [1],
      }),
  },
  {
    name: "Xor Gate",
    type: "gate",
    dataGenerator: () =>
      Generators.generateDefaultGateData({
        label: "Xor",
        numInputs: 2,
        gateFunction: (inputs) =>
          (inputs[0] === 1) !== (inputs[1] === 1) ? [1] : [0],
      }),
  },
  {
    name: "Xnor Gate",
    type: "gate",
    dataGenerator: () =>
      Generators.generateDefaultGateData({
        label: "Xnor",
        numInputs: 2,
        gateFunction: (inputs) =>
          (inputs[0] === 1) === (inputs[1] === 1) ? [1] : [0],
      }),
  },
  // {
  //   name: "SR Latch",
  //   type: "gate",
  //   dataGenerator: () =>
  //     Generators.generateDefaultGateData({
  //       label: "Xor",
  //       numInputs: 2,
  //       gateFunction: (inputs) =>
  //         (inputs[0] === 1) === (inputs[1] === 1) ? [0] : [1],
  //     }),
  // },
];
