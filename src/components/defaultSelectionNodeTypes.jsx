"use client";

import { Generators } from "./nodes";
import { sevenSegmentEncoderTable } from "./tables/sevenSegmentEncoderTable";
import { inverterTable8 } from "./tables/inverterTable";
import { multiplexerTable8 } from "./tables/multiplexerTable";

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
    name: "8 Switch",
    type: "multiSwitch",
    dataGenerator: () => Generators.generateDefaultMultiSwitchData(8),
  },
  {
    name: "Constant",
    type: "gate",
    dataGenerator: () =>
      Generators.generateDefaultGateData({
        label: "Cnst",
        numInputs: 0,
        gateFunction: () => [1],
      }),
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
    name: "8 Lamp",
    type: "multiLamp",
    dataGenerator: () => Generators.generateDefaultMultiLampData(8),
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
  {
    name: "Imply Gate",
    type: "gate",
    dataGenerator: () =>
      Generators.generateDefaultGateData({
        label: "Imply",
        numInputs: 2,
        gateFunction: (inputs) =>
          ((inputs[0] !== 1) || (inputs[1] === 1)) ? [1] : [0],
      }),
  },
  {
    name: "Adder Tile",
    type: "gate",
    dataGenerator: () =>
      Generators.generateDefaultGateData({
        label: "AT",
        numInputs: 3,
        gateFunction: (inputs) => {
          let count = 0;

          if (inputs[0] === 1) count++;
          if (inputs[1] === 1) count++;
          if (inputs[2] === 1) count++;

          return [(count == 1 || count == 3) ? 1 : 0, (count > 1) ? 1 : 0];
        },
      }),
  },
  {
    name: "8 Inverter",
    type: "gate",
    dataGenerator: () => Generators.generateDefaultGateData({
      label: "8Inv",
      numInputs: 9,
      gateFunction: (inputs) => {
        const index = inputs.reduce(
          (total, curr, i) => total + (curr === 1 ? 2 ** i : 0),
          0
        );

        return inverterTable8[index];
      }
    })
  },
  {
    name: "8 Multiplexer",
    type: "gate",
    dataGenerator: () => Generators.generateDefaultGateData({
      label: "8Mplx",
      numInputs: 17,
      gateFunction: (inputs) => {
        const index = inputs.reduce(
          (total, curr, i) => total + (curr === 1 ? 2 ** i : 0),
          0
        );

        return multiplexerTable8[index];
      }
    })
  },
  {
    name: "7 Seg Decoder",
    type: "gate",
    dataGenerator: () =>
      Generators.generateDefaultGateData({
        label: "7SEn",
        numInputs: 4,
        gateFunction: (inputs) => {
          const index = inputs.reduce(
            (total, curr, i) => total + (curr === 1 ? 2 ** i : 0),
            0
          );

          return sevenSegmentEncoderTable[index];
        },
      }),
  },
  {
    name: "ALU",
    type: "gate",
    dataGenerator: () => Generators.generateDefaultGateData({
      label: "ALU",
      numInputs: 18,
      gateFunction: (inputs) => {
        const invertB = inputs[0] === 1;
        const add1 = inputs[1] === 1;
        const numberA = parseInt(inputs.slice(2, 10).reverse().reduce((total, curr) => total + curr, ""), 2);
        const numberB = parseInt(inputs.slice(10, 18).map(val => (invertB === (val === 1)) ? 0 : 1).reverse().reduce((total, curr) => total + curr, ""), 2);
        const total = numberA + numberB + (add1 ? 1 : 0);
        const binaryString = ("00000000" + total.toString(2)).slice(-8);

        return binaryString.split("").map(bit => parseInt(bit)).reverse();
      }
    })
  },
  {
    name: "Register",
    type: "stateGate",
    dataGenerator: () => Generators.generateDefaultStateGateData({
      label: "Reg",
      numInputs: 2,
      initialStates: {
        prevInput: 0,
        prevOutput: 0,
      },
      gateFunction: (inputs, states) => {
        if (inputs[0] === 1 && states.prevInput !== 1) {
          return [
            [inputs[1]],
            {
              ...states,
              prevInput: 1,
              prevOutput: inputs[1]
            }
          ];
        }

        return [[states.prevOutput], {
          ...states,
          prevInput: inputs[0],
        }];
      }
    })
  },
  {
    name: "Register 8",
    type: "stateGate",
    dataGenerator: () => Generators.generateDefaultStateGateData({
      label: "8Reg",
      numInputs: 9,
      initialStates: {
        prevInput: 0,
        prevOutputs: [0, 0, 0, 0, 0, 0, 0, 0],
      },
      gateFunction: (inputs, states) => {
        if (inputs[0] === 1 && states.prevInput !== 1) {
          return [
            inputs.slice(-8),
            {
              ...states,
              prevInput: 1,
              prevOutputs: inputs.slice(-8)
            }
          ];
        }

        return [states.prevOutputs, {
          ...states,
          prevInput: inputs[0],
        }];
      }
    })
  }
];
