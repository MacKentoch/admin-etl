import React, {PureComponent, PropTypes} from 'react';
import {
  Grid,
  Row,
  Col,
  Button,
  Tooltip,
  OverlayTrigger
}                                       from 'react-bootstrap';
import { reduxForm, Field  }            from 'redux-form/immutable';
import Immutable                        from 'immutable';
import TabContentTitle                  from '../tabContentTitle/TabContentTitle.jsx';
import IsFetching                       from '../isFetching/IsFetching';
import InputFormClearBtn                from '../../components/inputFormClearBtn/InputFormClearBtn.jsx';

const NO_TYPE_SELECTED = 'select a type';
const NO_DIRECTION_SELECTED = 'select a direction';
const NO_FORMAT_SELECTED = 'select a format';

class EditConfigInterface extends PureComponent {
  static propTypes = {
    // redux-form:
    fieldDisabled:  PropTypes.bool,
    handleSubmit:   PropTypes.func.isRequired,
    change:         PropTypes.func.isRequired,
    initialize:     PropTypes.func.isRequired,

    // passed from parent (and comes from route param)
    interfaceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    // editInterface:
    isFetching:     PropTypes.bool.isRequired,
    lastFetchTime:  PropTypes.string.isRequired,
    interfaceProps: PropTypes.instanceOf(Immutable.Map).isRequired,

    interfacesTypes:              PropTypes.instanceOf(Immutable.List).isRequired,
    isFetchingInterfacesTypes:    PropTypes.bool.isRequired,
    lastTimeFetchInterfacesTypes: PropTypes.string.isRequired,

    interfacesDirections:              PropTypes.instanceOf(Immutable.List).isRequired,
    isFetchingInterfacesDirections:    PropTypes.bool.isRequired,
    lastTimeFetchInterfacesDirections: PropTypes.string.isRequired,

    interfacesFormats:              PropTypes.instanceOf(Immutable.List).isRequired,
    isFetchingInterfacesFormats:    PropTypes.bool.isRequired,
    lastTimeFetchInterfacesFormats: PropTypes.string.isRequired,

    // action creators
    //  -> editInterface:
    fetchConfigInterfaceEdit:     PropTypes.func.isRequired,
    fetchInterfaceTypes:          PropTypes.func.isRequired,
    fetchInterfaceDirections:     PropTypes.func.isRequired,
    fetchInterfaceFormats:        PropTypes.func.isRequired
  };

  static defaultProps = {
    interfaceProps: new Map(),
    interfaceId: 0
  };

  // validation contraints
  constraints = {
    name: {
      presence: {
        message: 'is required'
      },
      length: {
        minimum: 3,
        message: 'must be at least 3 characters'
      }
    },
    type: {
      presence: {
        message: 'is required'
      },
      exclusion: {
        within: [NO_TYPE_SELECTED],
        message: "'%{value}' is not allowed"
      }
    },
    direction: {
      presence: {
        message: 'is required'
      },
      exclusion: {
        within: [NO_DIRECTION_SELECTED],
        message: "'%{value}' is not allowed"
      }
    }
  };

  state = {
    loading: true
  };

  componentDidMount() {
    const  {
      interfaceId,
      fetchConfigInterfaceEdit,
      fetchInterfaceTypes,
      fetchInterfaceDirections,
      fetchInterfaceFormats
    } =  this.props;

    Promise.all([
      fetchConfigInterfaceEdit(interfaceId),
      fetchInterfaceTypes(),
      fetchInterfaceDirections(),
      fetchInterfaceFormats()
    ])
    .then(() => this.setState({ loading: false }))
    .catch(() => this.setState({ loading: false }));
  }

  componentWillReceiveProps(nextProps) {
    const { interfaceProps } = this.props;
    if (interfaceProps !== nextProps.interfaceProps) {
      // force init form.editInterfaceForm (since from parent prop "interfaceProps")
      // types, directions and formats come in same time since Promise.all
      this.initForm(nextProps.interfaceProps);
    }
  }

  render() {
    const { handleSubmit, interfaceProps } = this.props;
    const { loading } = this.state;

    return (
      <div id="CONFIG_INTERFACE">
        <TabContentTitle
          title={(
            <div className="text-center">
              <h3 >
                <i className="fa fa-pencil" aria-hidden="true" />
                &nbsp;
                <b>
                  {interfaceProps.get('name')}
                </b>
              </h3>
              <p className="small">
                <i>
                  (dbo.CONFIG_INTERFACE)
                </i>
              </p>
            </div>
          )}
        />
        <Grid>
          <Row style={{ marginBottom: '5px' }}>
            {
              loading
              ?
              <Col
                lg={10}
                lgOffset={1}
                md={10}
                mdOffset={1}
                sm={12}
                xs={12}>
                <div
                  // style={{display: 'block', height: '150px'}}
                >
                  <IsFetching
                    text="fetching..."
                    showText
                    size={32}
                  />
                </div>
                </Col>
              :
              <Col
                lg={10}
                lgOffset={2}
                md={10}
                mdOffset={2}
                sm={12}
                xs={12}>
                <form
                  id="editInterfaceForm"
                  className="form-vertical"
                  onSubmit={handleSubmit}>
                  {/* Id */}
                  <Field
                    label="Id"
                    name="id"
                    disabled={true}
                    component={this.renderInput}
                    type="text"
                  />
                  {/* Name */}
                  <Field
                    label="Name"
                    name="name"
                    component={this.renderInput}
                    type="text"
                  />
                  {/* Type */}
                  <Field
                    label="Type"
                    name="type"
                    component={this.renderTypeSelect}
                  />
                  {/* Direction */}
                  <Field
                    label="Direction"
                    name="direction"
                    component={this.renderDirectionSelect}
                  />
                  {/* Format */}
                  <Field
                    label="Format"
                    name="format"
                    component={this.renderFormatSelect}
                  />
                  {/* Separator */}
                  <Field
                    label="Separator"
                    name="separator"
                    component={this.renderInput}
                    type="text"
                  />
                  {/* delimiter */}
                  <Field
                    label="Delimiter"
                    name="delimiter"
                    component={this.renderInput}
                    type="text"
                  />
                  {/* eolCharacter */}
                  <Field
                    label="EOL Character"
                    name="eolCharacter"
                    component={this.renderInput}
                    type="text"
                  />
                  {/* reference */}
                  <Field
                    label="Reference"
                    name="reference"
                    component={this.renderInput}
                    type="text"
                  />
                  <Grid>
                    <Row>
                      <Col
                        lg={8}
                        lgOffset={2}
                        md={8}
                        mdOffset={2}
                        sm={12}
                        xs={12}>
                        <OverlayTrigger
                          placeholder="bottom"
                          overlay={(
                            <Tooltip id="tooltipSubmitBtn">
                              <strong>
                                Save changes
                              </strong>
                              &nbsp;
                              <i>
                                (apply changes to database)
                              </i>
                            </Tooltip>
                          )}>
                          <Button
                            className="orange_button"
                            bsStyle="primary"
                            type="submit">
                            Commit
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placeholder="bottom"
                          overlay={(
                            <Tooltip id="tooltipSubmitBtn">
                              <strong>
                                Reset all values
                              </strong>
                              &nbsp;
                              <i>
                                (refresh them from database)
                              </i>
                            </Tooltip>
                          )}>
                          <Button
                            bsStyle="danger"
                            onClick={this.cancel}>
                            Reset
                          </Button>
                        </OverlayTrigger>
                      </Col>
                    </Row>
                  </Grid>
                </form>
              </Col>
            }
          </Row>
        </Grid>
      </div>
    );
  }

  initForm = (data = new Map()) => {
    const { initialize } = this.props;
    initialize(data);
  }

  cancel = () => {
    const { reset } = this.props;
    reset();
  }

  change = (field =  '', value = '') => {
    const { change } = this.props;
    change(field, value);
  }

  renderInput = ({ input, disabled, label, type, meta: { touched, error } }) => {
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label className="col-lg-2 col-md-2 col-xs-2 col-sm-2 control-label">
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
            <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
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

  renderTypeSelect = ({ input, label, disabled, meta: { touched, error } }) => {
    const { interfacesTypes } = this.props;

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label className="col-lg-2 col-md-2 col-xs-2 col-sm-2 control-label">
            {label}
          </label>
          <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6">
            <select
              className="form-control"
              {...input}>
              <option>
                {NO_TYPE_SELECTED}
              </option>
              {
                interfacesTypes.map(
                  (interfaceType, idx) => (
                    <option key={idx}>
                      {interfaceType}
                    </option>
                  )
                )
              }
            </select>
            {
              touched && error &&
                <span className="text-danger">
                {error}
              </span>
            }
          </div>
          {
            disabled !== true &&
            <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
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

  renderDirectionSelect = ({ input, label, disabled, meta: { touched, error } }) => {
    const { interfacesDirections } = this.props;

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label className="col-lg-2 col-md-2 col-xs-2 col-sm-2 control-label">
            {label}
          </label>
          <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6">
            <select
              className="form-control"
              {...input}>
              <option>
                {NO_DIRECTION_SELECTED}
              </option>
              {
                interfacesDirections.map(
                  (interfaceDirection, idx) => (
                    <option key={idx}>
                      {interfaceDirection}
                    </option>
                  )
                )
              }
            </select>
            {
              touched && error &&
                <span className="text-danger">
                {error}
              </span>
            }
          </div>
          {
            disabled !== true &&
            <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
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

  renderFormatSelect = ({ input, label, disabled, meta: { touched, error } }) => {
    const { interfacesFormats } = this.props;

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label className="col-lg-2 col-md-2 col-xs-2 col-sm-2 control-label">
            {label}
          </label>
          <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6">
            <select
              className="form-control"
              {...input}>
              <option>
                {NO_FORMAT_SELECTED}
              </option>
              {
                interfacesFormats.map(
                  (interfaceFormat, idx) => (
                    <option key={idx}>
                      {interfaceFormat}
                    </option>
                  )
                )
              }
            </select>
            {
              touched && error &&
                <span className="text-danger">
                {error}
              </span>
            }
          </div>
          {
            disabled !== true &&
            <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
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

  handlesSubmit = values => {
    // const { saveChanges } = this.props;
    // to do
    //
    //validate here
    //
    //
    //save here if ok
  }
}

export default reduxForm(
  {
    form: 'editInterfaceForm',
    destroyOnUnmount: false
  }
)(EditConfigInterface);


// const EditConfigInterfaceForm =  reduxForm(
//   {form: 'editInterfaceForm'},
//   EditConfigInterface.validate
// )(EditConfigInterface);
//
// export default connect(
//   state => ({
//     initialValues: state.getIn(['editInterface', 'interface']) // pull initial values from store
//   }),
//   { load: editInterfaceActions.fetchConfigInterfaceEditIfNeeded }  // bind load
// )(EditConfigInterfaceForm);
