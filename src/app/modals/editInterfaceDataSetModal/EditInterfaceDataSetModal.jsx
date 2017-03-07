import React, {
  PureComponent,
  PropTypes
}                             from 'react';
// import Immutable              from 'immutable';
import {
  Grid,
  Row,
  Col,
  Modal,
  Button,
  Tooltip,
  OverlayTrigger
}                             from 'react-bootstrap';
import {
  reduxForm,
  Field,
  SubmissionError
}                             from 'redux-form/immutable';
import validate               from 'validate.js';
import moment                 from 'moment';
import InputFormClearBtn      from '../../components/inputFormClearBtn/InputFormClearBtn.jsx';


class EditInterfaceDataSetModal extends PureComponent {
  static propTypes = {
    // redux-form:
    fieldDisabled:  PropTypes.bool,
    handleSubmit:   PropTypes.func.isRequired,
    change:         PropTypes.func.isRequired,
    initialize:     PropTypes.func.isRequired,
    submitting:     PropTypes.bool.isRequired,
    // formProps passed from store when opening modal:
    interfaceId:    PropTypes.number.isRequired,
    interfaceName:  PropTypes.string.isRequired,
    isOpened:       PropTypes.bool.isRequired,
    // notification module
    addNotificationMessage: PropTypes.func.isRequired,
    // parent callback
    onCancel:         PropTypes.func.isRequired,
    closeModal:       PropTypes.func.isRequired,
    insertNewDataset: PropTypes.func.isRequired
  };

  // validation contraints
  constraints = {
    tableName: {
      presence: true,
      length: {
        minimum: 3,
        message: 'must be at least 3 characters'
      }
    },
    tablePrescedence: {
      presence: true,
      length: {
        minimum: 1,
        message: 'can\'t be empty'
      },
      format: {
        pattern: '^[1-9][0-9]*',
        flags: 'i',
        message: 'must be a positive integer'
      }
    }
  };

  render() {
    const {
      handleSubmit,
      onCancel,
      submitting,
      interfaceName,
      isOpened
    } = this.props;

    return (
      <Modal
        show={isOpened}
        onHide={onCancel}
        bsSize="large"
        aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-sm">
            Add new dataset to
            <span className="label label-info label-interface">
              {interfaceName}
            </span>
            interface
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            id="editInterfaceDataSetModal"
            className="form-vertical"
            onSubmit={handleSubmit(this.handlesOnValid)}>
            {/* tableName */}
            <Field
              label="table name"
              name="tableName"
              component={this.renderInput}
              type="text"
            />
            {/* Name */}
            <Field
              label="table prescedence"
              name="tablePrescedence"
              component={this.renderInput}
              type="text"
            />
            <br />
            <Grid fluid>
              <Row>
                <Col
                  xs={6}
                  xsPush ={4}>
                  <OverlayTrigger
                    placeholder="bottom"
                    overlay={(
                      <Tooltip id="tooltipSubmitBtn">
                        <strong>
                          Apply changes
                        </strong>
                        &nbsp;
                        <i>
                          (apply changes in memory - no commit to database -)
                        </i>
                      </Tooltip>
                    )}>
                    <Button
                      className="orange_button"
                      bsStyle="primary"
                      block
                      type="submit"
                      disabled={submitting}>
                      <i className="fa fa-check" aria-hidden="true" />
                      &nbsp;
                      Apply
                    </Button>
                  </OverlayTrigger>
                </Col>
              </Row>
            </Grid>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <OverlayTrigger
            placeholder="bottom"
            overlay={(
              <Tooltip id="tooltipSubmitBtn">
                <strong>
                  Cancel changes
                </strong>
              </Tooltip>
            )}>
            <Button
              bsStyle="default"
              onClick={onCancel}>
              Close
            </Button>
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    );
  }

  handlesOnValid = (values) => {
    const { insertNewDataset, closeModal, interfaceId } = this.props;
    const tableNameValidation = validate({tableName: values.get('tableName')}, this.constraints);
    const tablePrescedenceValidation = validate({tablePrescedence: values.get('tablePrescedence')}, this.constraints);

    const errors = {};

    if (tableNameValidation.tableName) {
      const { addNotificationMessage } = this.props;
      const firstErrorMessage = tableNameValidation.tableName[0];

      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:    firstErrorMessage,   // if message empty: it should not show notification
        level:      'error'              // one of 'sucess', 'error', 'info'
      });

      errors._error = 'add new dataset failed';
      errors.tableName = firstErrorMessage || 'tableName is not valid';
    }

    if (tablePrescedenceValidation.tablePrescedence) {
      const { addNotificationMessage } = this.props;
      const firstErrorMessage = tablePrescedenceValidation.tablePrescedence[0];

      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:    firstErrorMessage,   // if message empty: it should not show notification
        level:      'error'              // one of 'sucess', 'error', 'info'
      });

      errors._error = 'add new dataset failed';
      errors.tablePrescedence = firstErrorMessage || 'tablePrescedence is not valid';
    }

    // if errors Obj has at least 1 own enumerable property
    // => there were an error duriong validation=> throw it
    if (Object.keys(errors).length > 0) {
      throw new SubmissionError(errors);
    }

    // when all ok:
    insertNewDataset({
      id: -1,
      interfaceId: interfaceId,
      tableName: values.get('tableName'),
      tablePrescedence: parseInt(values.get('tablePrescedence'), 10)
    });

    closeModal();
  }

  renderInput = ({ input, disabled, label, type, meta: { touched, error } }) => {
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label className="col-lg-4 col-md-4 col-xs-4 col-sm-4 control-label">
            {label}
          </label>
          <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6">
            <input
              className="form-control"
              {...input}
              disabled={disabled === true ? true : false}
              type={type}
              placeholder={label}
            />
            {
              touched && error &&
              <span className="text-danger">
                {error}
              </span>
            }
          </div>
          {
            disabled !== true &&
            <div className="col-lg-2 col-md-2 col-xs-2 col-sm-2">
              <div style={{display: 'inline-block'}}>
                <InputFormClearBtn
                  name={input.name}
                  onClick={this.change}
                />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }

  change = (field =  '', value = '') => {
    const { change } = this.props;
    change(field, value);
  }
}

export default reduxForm(
  {
    form: 'editInterfaceDataSetModal',
    destroyOnUnmount: true
  },
  EditInterfaceDataSetModal.validate
)(EditInterfaceDataSetModal);
