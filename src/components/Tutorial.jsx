import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function Tutorial() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* The floating button in the corner */}
      <Button
        variant="info"
        onClick={handleShow}
        className="shadow-lg"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
        }} // Applying the inline/built-in styles here
        aria-label="Open Tutorial and Instructions"
      >
        {/* <QuestionCircleFill size={24} className="me-1" /> */}
        Help
      </Button>

      {/* The Modal/Popup Window */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>🌐 Logic Gates Tutorial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Welcome to the Logic Gate Simulation! This is your comprehensive
            guide on how to use the drag-and-drop interface.
          </p>
          <hr />
          <h3>Step 1: Adding Logic Gates</h3>
          <p>
            To begin, click and drag a gate (e.g., AND, OR, NOT) from the
            Selection Bar on the left side of the screen and drop it onto the
            main flow canvas. You can add as many gates as you need to build
            your circuit.
          </p>
          <h3>Step 2: Connecting Components</h3>
          <p>
            Click on the output handle (a small circle) of one gate or input
            component. Then, drag the connection line and click on the input
            handle of another gate. To delete a connection, click on an existing
            connection line to select it, then press the Delete key, or
            right-click. Holding SHIFT while performing either of these
            operations will affect all connections that go between the two
            nodes.
          </p>
          <h3>Step 3: Interacting with Inputs</h3>
          <p>
            The Input Component (a switch or toggle) allows you to control the
            simulation. Click the input component on the canvas to toggle its
            state between ON (true) and OFF (false). Observe how the changes
            propagate through the connected gates!
          </p>
          <h3>Step 4: Viewing the Output</h3>
          <p>
            The Output Component (a light or display) shows the final result of
            the circuit. When the output is true, the display will turn white.
            When the output is false, it will show appear dark.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
