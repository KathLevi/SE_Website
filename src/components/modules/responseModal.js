import React from "react";
import { Modal, Button } from "react-bootstrap";

const ResponseModal = props => (
  <Modal
    size="lg"
    className="response-modal"
    show={props.show}
    onHide={props.closeModal}
  >
    <Modal.Header closeButton>
      <Modal.Title>Server response</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{props.message}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.closeModal}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default ResponseModal;
