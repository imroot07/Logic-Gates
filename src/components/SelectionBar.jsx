import { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { useReactFlow } from "reactflow";
import { uuidv4 } from "../utils";
import { sevenSegmentEncoderTable } from "./tables/sevenSegmentEncoderTable.js";
import { fourBitSwapperTable } from "./tables/fourBitSwapperTable.js";
import { fourBitFlowTable } from "./tables/fourBitFlowTable.js";

export default function SelectionBar() {
  const { setNodes, getViewport } = useReactFlow();
  const [nodeTypes, setNodeTypes] = useState([
    {
      name: "Switch",
      type: "switch",
      data: {},
    },
    {
      name: "4 Bit Switch",
      type: "multiSwitch",
      data: {
        numSwitches: 4,
      },
    },
    {
      name: "Lamp",
      type: "lamp",
      data: {},
    },
    {
      name: "4 Bit Lamp",
      type: "multiLamp",
      data: {
        numLamps: 4,
      },
    },
    {
      name: "7 Seg Lamp",
      type: "sevenSegmentLamp",
      data: {},
    },
    {
      name: "Not Gate",
      type: "tableGate",
      data: {
        numInputs: 1,
        table: [[1], [0]],
        label: "Not",
      },
    },
    {
      name: "Or Gate",
      type: "tableGate",
      data: {
        numInputs: 2,
        table: [[0], [1], [1], [1]],
        label: "Or",
      },
    },
    {
      name: "4 Or Gate",
      type: "tableGate",
      data: {
        numInputs: 4,
        table: [
          [0],
          [1],
          [1],
          [1],
          [1],
          [1],
          [1],
          [1],
          [1],
          [1],
          [1],
          [1],
          [1],
          [1],
          [1],
          [1],
        ],
        label: "4 Or",
      },
    },
    {
      name: "Nor Gate",
      type: "tableGate",
      data: {
        numInputs: 2,
        table: [[1], [0], [0], [0]],
        label: "Nor",
      },
    },
    {
      name: "And Gate",
      type: "tableGate",
      data: {
        numInputs: 2,
        table: [[0], [0], [0], [1]],
        label: "And",
      },
    },
    {
      name: "Nand Gate",
      type: "tableGate",
      data: {
        numInputs: 2,
        table: [[1], [1], [1], [0]],
        label: "Nand",
      },
    },
    {
      name: "Xor Gate",
      type: "tableGate",
      data: {
        numInputs: 2,
        table: [[0], [1], [1], [0]],
        label: "Xor",
      },
    },
    {
      name: "Xnor Gate",
      type: "tableGate",
      data: {
        numInputs: 2,
        table: [[1], [0], [0], [1]],
        label: "Xnor",
      },
    },
    {
      name: "Constant",
      type: "tableGate",
      data: {
        numInputs: 0,
        table: [[1]],
        label: "Cnst",
      },
    },
    {
      name: "4 Bit Decoder",
      type: "decoder",
      data: {
        numInputs: 4,
      },
    },
    {
      name: "7 Seg Encoder",
      type: "tableGate",
      data: {
        height: 280,
        numInputs: 10,
        table: sevenSegmentEncoderTable,
        label: "7Sg-En",
      },
    },
    {
      name: "4 Bit Swapper",
      type: "tableGate",
      data: {
        height: 280,
        numInputs: 9,
        table: fourBitSwapperTable,
        label: "4B-Swp",
      },
    },
    {
      name: "4 Bit Flow Gate",
      type: "tableGate",
      data: {
        height: 150,
        numInputs: 5,
        table: fourBitFlowTable,
        label: "4B Flow",
      },
    },
    {
      name: "Half Adder",
      type: "tableGate",
      data: {
        numInputs: 2,
        table: [
          [0, 0],
          [1, 0],
          [1, 0],
          [0, 1],
        ],
        label: "H-A",
      },
    },
    {
      name: "Adder Tile",
      type: "tableGate",
      data: {
        numInputs: 3,
        table: [
          [0, 0],
          [1, 0],
          [1, 0],
          [0, 1],
          [1, 0],
          [0, 1],
          [0, 1],
          [1, 1],
        ],
        label: "A-T",
      },
    },
    {
      name: "SR Latch",
      type: "tableGate",
      data: {
        numInputs: 2,
        table: [
          ["latch", "latch"],
          [0, 1],
          [1, 0],
          [0, 0],
        ],
        label: "SR-L",
      },
    },
    {
      name: "D Latch",
      type: "tableGate",
      data: {
        numInputs: 2,
        table: [
          ["latch", "latch"],
          [0, 1],
          ["latch", "latch"],
          [1, 0],
        ],
        label: "D-L",
      },
    },
    {
      name: "Register",
      type: "register",
      data: {},
    },
    {
      name: "4 Bit Register",
      type: "multiRegister",
      data: {
        numRegisters: 4,
      },
    },
    {
      name: "Shift Reg",
      type: "shiftRegister",
      data: {
        numRegisters: 4,
      },
    },
    {
      name: "Clock",
      type: "clock",
      data: {},
    },
  ]);

  return (
    <Container
      style={{
        backgroundColor: "var(--bgColorSecondary)",
        height: "100vh",
        padding: 5,
        overflowY: "scroll",
        borderRight: "1px solid white",
      }}
    >
      {nodeTypes.map((nodeData, i) => (
        <Row key={i} style={{ margin: 0, padding: 7 }}>
          <Button
            variant="dark"
            style={{ padding: 10 }}
            onClick={() => {
              const viewport = getViewport();

              setNodes((nodes) => [
                ...nodes,
                {
                  id: uuidv4(),
                  data: {
                    inputs: [],
                    outputs: [],
                    ...nodeData.data,
                  },
                  position: {
                    x: (50 - viewport.x) / viewport.zoom,
                    y: (50 - viewport.y) / viewport.zoom,
                  },
                  type: nodeData.type,
                },
              ]);
            }}
          >
            {nodeData.name}
          </Button>
        </Row>
      ))}
    </Container>
  );
}
