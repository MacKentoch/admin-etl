import React, {PureComponent, PropTypes} from 'react';
import {
  Modal,
  Button
  // OverlayTrigger,
  // Tooltip
}                                       from 'react-bootstrap';

class ConfirmDeleteModal extends PureComponent  {
  static propTypes = {
    isOpened:   PropTypes.bool,
    onCancel:   PropTypes.func,
    onConfirm:  PropTypes.func,
    titleText:  PropTypes.string
  };

  static defaultProps = {
    isOpened:   false,
    titleText:  'Delete confirmation needed'
  };

  render() {
    const {isOpened, onCancel, onConfirm, titleText} = this.props;
    return (
      <Modal
        show={isOpened}
        onHide={onCancel}
        bsSize="small"
        aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-sm">
            { titleText }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h2>
              <i className="fa fa-exclamation-circle warning-icon--red" aria-hidden="true" />&nbsp;
              You are about to
              &nbsp;
              <i className="fa fa-trash-o warning-icon--red" aria-hidden="true" />
            </h2>
            <h3 className="label-danger text-center">
              Please confirm!
            </h3>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="default"
            onClick={onCancel}>
            Cancel
          </Button>
          <Button
            bsStyle="danger"
            onClick={onConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmDeleteModal;
