import { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { useReactFlow } from "reactflow";
import { uuidv4 } from "../utils";
import { defaultSelectionNodeTypes } from "./defaultSelectionNodeTypes";

export default function SelectionBar() {
  const { setNodes, getViewport } = useReactFlow();
  const [offsetCounter, setOffsetCounter] = useState(0);
  // const [selectionNodeTypes, setSelectionNodeTypes] = useState(
  //   defaultSelectionNodeTypes
  // );
  const selectionNodeTypes = defaultSelectionNodeTypes;

  return (
    <Container
      style={{
        backgroundColor: "var(--bgColorSecondary)",
        height: "100vh",
        padding: 5,
        overflowY: "scroll",
        borderRight: "1px solid white",
      }}
      onMouseLeave={() => setOffsetCounter(0)}
    >
      {selectionNodeTypes.map((nodeData, i) => (
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
                  type: nodeData.type,
                  data: nodeData.dataGenerator(),
                  position: {
                    x: (50 + 15 * offsetCounter - viewport.x) / viewport.zoom,
                    y: (50 + 15 * offsetCounter - viewport.y) / viewport.zoom,
                  },
                },
              ]);

              setOffsetCounter((curr) => curr + 1);
            }}
          >
            {nodeData.name}
          </Button>
        </Row>
      ))}
    </Container>
  );
}
