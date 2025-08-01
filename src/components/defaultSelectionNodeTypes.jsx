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
      Generators.generateDefaultGateData(1, (inputs) =>
        inputs[0] === 1 ? [0] : [1]
      ),
  },
  {
    name: "Or Gate",
    type: "gate",
    dataGenerator: () =>
      Generators.generateDefaultGateData(2, (inputs) =>
        inputs[0] === 1 || inputs[1] === 1 ? [1] : [0]
      ),
  },
];
