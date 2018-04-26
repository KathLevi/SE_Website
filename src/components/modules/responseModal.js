import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ResponseModal = props => (
  <Modal
    isOpen={props.show}
    toggle={props.closeModal}
    className={props.className}
  >
    <ModalHeader toggle={props.closeModal}>Server response</ModalHeader>
    <ModalBody>{props.message}</ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={props.closeModal}>
        Do Something
      </Button>{" "}
      <Button color="secondary" onClick={props.closeModal}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
);

export default ResponseModal;
