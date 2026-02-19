import { Modal } from "react-bootstrap";
import ReactiveButton from "reactive-button";
import "../styles/app.css";

const ConfirmationModal = ({ show, heading, body, onConfirm, onCancel }) => {

    return (
      <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer className="modal-actions">
          <ReactiveButton 
            onClick={onCancel}
            type="button"
            rounded
            idleText="CANCEL"
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
          <ReactiveButton
            onClick={onConfirm}
            type="button"
            rounded 
            idleText="CONFIRM"
            loadingText="LOADING"
            variant="secondary"
            className="btn-primary-soft"
            style={{
              width: "150px",
              fontSize: "12px",
              backgroundColor: "#b37070ff",
            }}
          />
        </Modal.Footer>
      </Modal>
    )
}

export default ConfirmationModal;
