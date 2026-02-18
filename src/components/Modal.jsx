import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function InfoModal({ show, hide, heading, body, body2 }) {
  return (
    <>
      <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>{heading}
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>{body}</p>
            <p>{body2}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={hide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
