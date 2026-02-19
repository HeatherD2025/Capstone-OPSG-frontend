import ReactiveButton from "reactive-button";
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
            onClick={hide}
            type="button"
            rounded
            idleText="CLOSE"
            loadingText="LOADING"
            variant="secondary"
            className="btn-primary-soft"
            style={{
              marginRight: "18px",
              width: "150px",
              fontSize: "12px",
              backgroundColor: "#558e89",
            }}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
