import ReactiveButton from "react-bootstrap/Button";
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
          <ReactiveButton 
            round
            className="btn-primary-soft" 
            onClick={hide}>
            Close
          </ReactiveButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
