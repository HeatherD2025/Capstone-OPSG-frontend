// import ReactiveButton from "reactive-button";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export default function InfoModal({ show, hide, heading, body, body2 }) {
  return (
    <>
      <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>{heading}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>{body}</p>
            <p>{body2}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            round
            className="btn-primary-soft" 
            onClick={hide}>
            CLOSE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
