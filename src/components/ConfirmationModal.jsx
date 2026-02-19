import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../styles/app.css";

const ConfirmationModal = ({ show, heading, body, onConfirm, onCancel }) => {

    return (
      <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer className="modal-actions">
          <Button 
            round
            className="btn-primary-soft"
            onClick={onCancel}>
            CANCEL
          </Button>
          <Button
            round 
            variant="btn-danger-soft" 
            onClick={onConfirm}
          >
            CONFIRM
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ConfirmationModal;
