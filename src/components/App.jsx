import SelectionBar from "./SelectionBar";
import Flow from "./Flow";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { ReactFlowProvider } from "reactflow";

export default function App() {
  return (
    <ReactFlowProvider>
      <Container fluid>
        <Row>
          <Col md={1} style={{ width: "200px", padding: 0 }}>
            <SelectionBar></SelectionBar>
          </Col>
          <Col ms={8} style={{ padding: 0 }}>
            <Flow></Flow>
          </Col>
        </Row>
      </Container>
    </ReactFlowProvider>
  );
}
