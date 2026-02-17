// manage modal visibility with state (in AdminViewUserProfile?)
// pass visibility state, message and confirmation/cancellation handlers
    // down to the modal component via props
// modal component uses callback function (ie. onConfirm) on
    // user interaction w/button. logic executed, modal closed

import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({ show, title, message, onConfirm, onCancel }) => {
    if (!show) {
        return null;
    }

    return (
      <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer className="modal-actions">
          <Button variant="primary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ConfirmationModal;
