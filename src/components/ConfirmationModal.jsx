import { Modal } from "react-bootstrap";
import ReactiveButton from "reactive-button";

const ConfirmationModal = ({ show, heading, body, onConfirm, onCancel }) => {

    return (
      <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer className="modal-actions">
          <ReactiveButton 
            rounded
            className="btn-primary-soft"
            onClick={onCancel}>
            Cancel
          </ReactiveButton>
          <ReactiveButton
            rounded 
            variant="btn-danger" onClick={onConfirm}>
            Confirm
          </ReactiveButton>
        </Modal.Footer>
      </Modal>
    )
}

export default ConfirmationModal;
