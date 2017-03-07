import React, {
  Component,
  PropTypes
}                                       from 'react';

import {
  BootstrapTable,
  TableHeaderColumn
}                                       from 'react-bootstrap-table';
import IsFetching                       from '../isFetching/IsFetching';
import {
  div,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Button
}                                       from 'react-bootstrap';
import validate                         from 'validate.js';
import moment                           from 'moment';
import FormatEditColumn                 from './FormatEditColumn.jsx';
import Immutable                        from 'immutable';
import NullableEditor                   from './NullableEditor.jsx';
import NullableModalEditor              from './NullableModalEditor.jsx';
import IdentityEditor                   from './IdentityEditor.jsx';
import IdentityModalEditor              from './IdentityModalEditor.jsx';
import FormatEditColumnModifers         from './FormatEditColumnModifers.jsx';

const INSERT_NOT_COMMITTED_ROW_ID = '-1';
const AUTO_GEN_ROWID_REGEX = /^autovalue/i;

class DatasetColumnsTable extends Component {
  static propTypes = {
    interfaceName: PropTypes.string.isRequired,

    interfaceDatasetId:           PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isFetchingDatasetColDesc:     PropTypes.bool.isRequired,
    lastFetchTimeDatasetColDesc:  PropTypes.string.isRequired,
    interfaceDatasetColDesc:      PropTypes.instanceOf(Immutable.List).isRequired,

    fetchConfigInterfaceDatasetColumnDescription: PropTypes.func.isRequired,

    openConfirmDeleteModal: PropTypes.func.isRequired,

    onDatasetDelete:  PropTypes.func.isRequired,
    onDatasetInsert:  PropTypes.func.isRequired,
    onDatasetUpdate:  PropTypes.func.isRequired,
    onDatasetReset:   PropTypes.func.isRequired,

    addNotificationMessage: PropTypes.func.isRequired,
    showColumnModifiersTable: PropTypes.func.isRequired
  };

  // validation contraints
  constraints = {
    name: {
      presence: true,
      length: {
        minimum: 3,
        message: 'must be at least 3 characters'
      }
    },
    position: {
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
    },
    width: {
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
    },
    paddingChar: {
      // presence: false,
      // length: {
      //   minimum: 1,
      //   message: 'can\'t be empty'
      // },
      format: {
        pattern:  '^\s*|[0-9][0-9]*',
        flags: 'i',
        message: 'must be a positive integer'
      }
    },
    alignment: {
      presence: true,
      length: {
        minimum: 1,
        message: 'must be at least 1 character'
      }
    },
    description: {
      presence: true,
      length: {
        minimum: 3,
        message: 'must be at least 3 characters'
      }
    },
    default: {
      presence: false
      // length: {
      //   minimum: 1,
      //   message: 'must be at least 1 character'
      // }
    },
    dataType: {
      presence: false
      // length: {
      //   minimum: 1,
      //   message: 'must be at least 1 character'
      // }
    },
    numericPrecision: {
      // presence: false,
      // length: {
      //   minimum: 1,
      //   message: 'can\'t be empty'
      // },
      format: {
        pattern:  '^\s*|[0-9][0-9]*',
        flags: 'i',
        message: 'must be a positive integer'
      }
    },
    numericScale: {
      // presence: false,
      // length: {
      //   minimum: 1,
      //   message: 'can\'t be empty'
      // },
      format: {
        pattern:  '^\s*|[0-9][0-9]*',
        flags: 'i',
        message: 'must be a positive integer'
      }
    }
  };

  state = {
    loading: true,
    columns: []
  }

  componentDidMount() {
    const {
      interfaceDatasetId,
      fetchConfigInterfaceDatasetColumnDescription
    } =  this.props;
    Promise.all([
      fetchConfigInterfaceDatasetColumnDescription(interfaceDatasetId)
    ])
    .then(() => this.setState({ loading: false }))
    .catch(() => this.setState({ loading: false }));
  }

  componentWillReceiveProps(nextProps) {
    const { interfaceDatasetColDesc } = this.props;
    const { columns } = this.state;
    // first store fetch case (from nothing to data)
    if (!Immutable.is(interfaceDatasetColDesc, nextProps.interfaceDatasetColDesc)) {
      // props updated => set state:
      this.setState({ columns: nextProps.interfaceDatasetColDesc.toJS() });
      return;
    }
    // n store fetch case (from data to "same data") but state empty (need to refill)
    if (columns.length === 0 && nextProps.interfaceDatasetColDesc.size > 0) {
      // console.log('force refresh from props');
      this.setState({ columns: nextProps.interfaceDatasetColDesc.toJS() });
      return;
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { columns } = this.state;
    // force refresh
    if (columns.length > 0 && nextState.columns.length === 0) {
      // console.log('force refresh after columns reset');
      this.setState({ columns: nextProps.interfaceDatasetColDesc.toJS() });
      return;
    }
  }

  render() {
    const {
      interfaceName
    } = this.props;
    const { columns } = this.state;
    const { loading } = this.state;

    return (
      <div>
        <div>
          {
            loading === true
            ?
            <div>
              <Row style={{ marginBottom: '5px' }}>
                <Col
                  lg={12}
                  md={12}
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
              </Row>
            </div>
            :
            <div>
              <div>
                <Row>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}>
                    <BootstrapTable
                      ref="table"
                      data={columns}
                      striped
                      hover
                      pagination
                      csvFileName={`${interfaceName || 'not set'}-datasetColumns`}
                      options={{
                        insertText: 'add new dataset',
                        noDataText: 'Currently no dataset. Click on "add interface dataset" to add one',
                        handleConfirmDeleteRow: this.handleConfirmDeleteRow,
                        onDeleteRow: this.handlesOnDeleteRow,
                        afterInsertRow: this.handlesOnRowAdded
                      }}
                      cellEdit={{
                        mode: 'dbclick',
                        blurToSave: true,
                        beforeSaveCell: this.handelsBeforeSaveCell,
                        afterSaveCell: this.handelsAfterSaveCell
                      }}
                      search
                      exportCSV
                      insertRow
                      deleteRow
                      selectRow={{
                        mode: 'checkbox',
                        clickToSelect: true,
                        selected: [], // default select on table
                        bgColor: 'rgb(239, 72, 54)'
                        // onSelect: onRowSelect,
                        // onSelectAll: onSelectAll
                      }}
                      >
                      <TableHeaderColumn
                        isKey={true}
                        editable={false}
                        dataField="id"
                        width={'80px'}
                        dataFormat={this.formatIdField}
                        autoValue
                        // hiddenOnInsert
                        dataSort={true}>
                        id
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="name"
                        dataSort={true}
                        width={'250px'}
                        editable={{
                          type: 'input',
                          validator: this.columnNameValidator
                        }}
                        filter={{
                          type: 'TextFilter',
                          placeholder: 'filter'
                        }}>
                        name
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="position"
                        dataSort={true}
                        width={'80px'}
                        dataAlign="center"
                        // width={'160px'}
                        editable={{
                          type: 'number',
                          validator: this.columnPositionValidator
                        }}
                        filter={{
                          type: 'TextFilter',
                          placeholder: 'filter'
                        }}>
                        position
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="width"
                        dataSort={true}
                        width={'80px'}
                        dataAlign="center"
                        // width={'160px'}
                        editable={{
                          type: 'number',
                          validator: this.columnWidthValidator
                        }}
                        filter={{
                          type: 'TextFilter',
                          placeholder: 'filter'
                        }}>
                        width
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="paddingChar"
                        dataSort={true}
                        width={'80px'}
                        dataAlign="center"
                        // width={'160px'}
                        editable={{
                          type: 'number',
                          validator: this.columnPaddingCharValidator
                        }}
                        filter={{
                          type: 'TextFilter',
                          placeholder: 'filter'
                        }}>
                        padd. char
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="alignment"
                        dataSort={true}
                        dataAlign="center"
                        width={'80px'}
                        editable={ {
                          type: 'select',
                          options: { values: ['N', 'L', 'R'] },
                          validator: this.columnAlignmentValidator
                        }}
                        filter={{
                          type: 'TextFilter',
                          placeholder: 'filter'
                        }}>
                        alignment
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="description"
                        dataSort={true}
                        width={'160px'}
                        editable={{
                          type: 'input',
                          validator: this.columnDescriptionValidator
                        }}
                        filter={{
                          type: 'TextFilter',
                          placeholder: 'filter'
                        }}>
                        description
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="default"
                        dataSort={true}
                        editable={{
                          type: 'input',
                          validator: this.columnDefaultValidator
                        }}
                        filter={{
                          type: 'TextFilter',
                          placeholder: 'filter'
                        }}>
                        default
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="dataType"
                        dataSort={true}
                        editable={{
                          type: 'input',
                          validator: this.columnDataTypeValidator
                        }}
                        filter={{
                          type: 'TextFilter',
                          placeholder: 'filter'
                        }}>
                        data type
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="numericPrecision"
                        dataSort={true}
                        editable={{
                          type: 'input',
                          validator: this.columnNumericPrecisionValidator
                        }}
                        filter={{
                          type: 'TextFilter',
                          placeholder: 'filter'
                        }}>
                        numeric precision
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="numericScale"
                        dataSort={true}
                        editable={{
                          type: 'input',
                          validator: this.columnNumericScaleValidator
                        }}
                        filter={{
                          type: 'TextFilter',
                          placeholder: 'filter'
                        }}>
                        numeric scale
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="nullable"
                        dataSort={true}
                        dataAlign={'center'}
                        width={'140px'}
                        editable={{ type: 'checkbox' }}
                        dataFormat={this.nullableFormatter}
                        customEditor={ { getElement: this.createNullableModalEditor } }
                      >
                        nullable
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="identity"
                        dataSort={true}
                        dataAlign={'center'}
                        editable={{ type: 'checkbox' }}
                        width={'140px'}
                        dataFormat={this.identityFormatter}
                        customEditor={ { getElement: this.createIdentityModalEditor } }
                      >
                        identity
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        editable={false}
                        dataField="id"
                        hiddenOnInsert
                        dataSort={false}
                        dataAlign="center"
                        width={'90px'}
                        dataFormat={this.formatEditColumnModifers}>
                        Modifiers
                      </TableHeaderColumn>
                    </BootstrapTable>
                  </Col>
                </Row>
              </div>
            </div>
            }
          </div>
        {
          !loading &&
          <div>
            <Row>
              <Col
                xs={12}
                style={{margin: '10px'}}>
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
                    onClick={this.reset}>
                    Reset
                  </Button>
                </OverlayTrigger>
              </Col>
            </Row>
          </div>
        }
      </div>
    );
  }

  nullableFormatter = cell => {
    return (
      <div>
        {
          cell === true
          ? <i className="fa fa-2x fa-toggle-on" style={{ color: '#19AB27' }} aria-hidden="true" />
          : <i className="fa fa-2x fa-toggle-off" style={{ color: '#222' }} aria-hidden="true"/>
        }
      </div>
    );
  }

  createNullableEditor = (onUpdate, props) => (<NullableEditor onUpdate={ onUpdate } {...props}/>)

  createNullableModalEditor = (onUpdate, props) => (<NullableModalEditor onUpdate={ onUpdate } {...props}/>)

  createIdentityEditor = (onUpdate, props) => (<IdentityEditor onUpdate={ onUpdate } {...props}/>)

  createIdentityModalEditor = (onUpdate, props) => (<IdentityModalEditor onUpdate={ onUpdate } {...props}/>)

  identityFormatter = cell => {
    return (
      <div>
        {
          cell === true
          ? <i className="fa fa-2x fa-toggle-on" style={{ color: '#19AB27' }} aria-hidden="true" />
          : <i className="fa fa-2x fa-toggle-off" style={{ color: '#222' }} aria-hidden="true"/>
        }
      </div>
    );
  }

  /**
   * [formatEditColumn modififers]
   * @param  {String} cell  cell value
   * @param  {Object} row   row object
   * @return {Void}         [description]
   */
  formatEditColumnModifers = (cell, row) => (
    <FormatEditColumnModifers
      cell={cell}
      columnId={row.id}
      columnName={row.name}
      onClick={this.handlesOnEditColumnModifiers}
    />
  );

  handlesOnEditColumnModifiers = ({ columnId, columnName }) => {
    if (!columnId || String(columnId).length === 0) {
      const { addNotificationMessage } = this.props;
      const errorMessage = 'Could not edit this dataset rows (incorrect id)';
      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:    errorMessage,         // if message empty: it should not show notification
        level:      'error'               // one of 'sucess', 'error', 'info'
      });
      return false;
    }
    // display column modifiers table:
    const { showColumnModifiersTable }  = this.props;
    // set selected dataset Name in state (used for column table header)
    showColumnModifiersTable({ columnId, columnName });
    return true;
  }

  /**
   * force reset (datatble should rebind interfaceDatasetColDesc as before changes)
   * @param {event} event native event
   * @return {undefined}
   */
  reset = (event) => {
    if (event) {
      event.preventDefault();
    }
    const {onDatasetReset}  =this.props;
    // setting empty datasetColumns in state => will force refresh from props (see componentWillUpdate)
    this.setState({interfaceDatasetColDesc: []});
    // empty stores : interfaceDatasetColDescDeleted, updated and inserted
    onDatasetReset();
  }

  /**
   * Overrides default confirm function from react-bootstrap-table
   * will show confirm modal
   * @param  {Function} next    callback to call when delete is confirmed
   * @param  {Array=}   rowIds  array of rows keys to be deleted
   * @return {Bool}             nothing
   */
  handleConfirmDeleteRow = (next) => {
    // const rowIdsStr = rowIds.join(',');
    const { openConfirmDeleteModal } = this.props;
    openConfirmDeleteModal(next);
  }

  /**
   * react-bootstrap-table callback called when row deleted
   * @param  {Array} rowIds array of rows keys deleted
   * @return {Bool}         nothing
   */
  handlesOnDeleteRow = (rowIds) => {
    const  { onDatasetDelete } = this.props;
    rowIds.forEach(rowId => onDatasetDelete(rowId, rowId));
    return true;
  }

  /**
   * after table new row added
   * @param  {Any} row  row added Object
   * @return {Bool}     nothing
   */
  handlesOnRowAdded = row => {
    const  { onDatasetInsert } = this.props;
    onDatasetInsert(row);
    return true;
  }

  handelsBeforeSaveCell = (row, cellName, cellValue) => {
    if (cellName === 'name') {
      return this.columnNameValidator(cellValue);
    }
    if (cellName === 'postition') {
      return this.columnPositionValidator(cellValue);
    }
    if (cellName === 'width') {
      return this.columnWidthValidator(cellValue);
    }
    if (cellName === 'paddingChar') {
      return this.columnPaddingCharValidator(cellValue);
    }
    if (cellName === 'alignment') {
      return this.columnAlignmentValidator(cellValue);
    }
    if (cellName === 'description') {
      return this.columnDescriptionValidator(cellValue);
    }
    if (cellName === 'default') {
      return this.columnDefaultValidator(cellValue);
    }
    if (cellName === 'dataType') {
      return this.columnDataTypeValidator(cellValue);
    }
    if (cellName === 'numericPrecision') {
      return this.columnNumericPrecisionValidator(cellValue);
    }
    if (cellName === 'numericScale') {
      return this.columnNumericScaleValidator(cellValue);
    }
    if (cellName === 'nullable') {
      return true;
    }
    if (cellName === 'identity') {
      return true;
    }
    return false;
  }

  handelsAfterSaveCell = (row) => {
    const { onDatasetUpdate } = this.props;
    onDatasetUpdate(row);
  }

  /**
   * format id field (ie: escape autogenerated id value)
   * @param  {String} cell cell content/value
   * @return {Object}      cell formatted
   */
  formatIdField = cell => {
    // filter autogenerated id (from built-in insert modal)
    if (AUTO_GEN_ROWID_REGEX.test(cell)) {
      return (INSERT_NOT_COMMITTED_ROW_ID);
    }
    return cell;
  }

  columnNameValidator = (currentValue) => {
    const validation = validate({name: currentValue}, this.constraints);

    if (validation.name) {
      const { addNotificationMessage } = this.props;

      const firstErrorMessage = validation.name[0];
      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:    firstErrorMessage,     // if message empty: it should not show notification
        level:      'error'                // one of 'sucess', 'error', 'info'
      });
      return firstErrorMessage;
    }
    return true;
  }

  columnPositionValidator = currentValue => {
    const validation = validate({position: currentValue}, this.constraints);

    if (validation.position) {
      const { addNotificationMessage } = this.props;
      const firstErrorMessage = validation.position[0];

      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:  firstErrorMessage,     // if message empty: it should not show notification
        level:    'error'                // one of 'sucess', 'error', 'info'
      });
      return firstErrorMessage;
    }
    return true;
  }

  columnWidthValidator = currentValue => {
    const validation = validate({width: currentValue}, this.constraints);

    if (validation.width) {
      const { addNotificationMessage } = this.props;
      const firstErrorMessage = validation.width[0];

      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:  firstErrorMessage,     // if message empty: it should not show notification
        level:    'error'                // one of 'sucess', 'error', 'info'
      });
      return firstErrorMessage;
    }
    return true;
  }

  columnPaddingCharValidator = currentValue => {
    const validation = validate({paddingChar: currentValue}, this.constraints);

    if (validation.paddingChar) {
      const { addNotificationMessage } = this.props;
      const firstErrorMessage = validation.paddingChar[0];

      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:  firstErrorMessage,     // if message empty: it should not show notification
        level:    'error'                // one of 'sucess', 'error', 'info'
      });
      return firstErrorMessage;
    }
    return true;
  }

  columnAlignmentValidator = currentValue => {
    const validation = validate({alignment: currentValue}, this.constraints);

    if (validation.alignment) {
      const { addNotificationMessage } = this.props;
      const firstErrorMessage = validation.alignment[0];

      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:  firstErrorMessage,     // if message empty: it should not show notification
        level:    'error'                // one of 'sucess', 'error', 'info'
      });
      return firstErrorMessage;
    }
    return true;
  }

  columnDescriptionValidator = currentValue => {
    const validation = validate({description: currentValue}, this.constraints);

    if (validation.description) {
      const { addNotificationMessage } = this.props;
      const firstErrorMessage = validation.description[0];

      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:  firstErrorMessage,     // if message empty: it should not show notification
        level:    'error'                // one of 'sucess', 'error', 'info'
      });
      return firstErrorMessage;
    }
    return true;
  }

  columnDefaultValidator = currentValue => {
    const validation = validate({default: currentValue}, this.constraints);

    if (validation.default) {
      const { addNotificationMessage } = this.props;
      const firstErrorMessage = validation.default[0];

      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:  firstErrorMessage,     // if message empty: it should not show notification
        level:    'error'                // one of 'sucess', 'error', 'info'
      });
      return firstErrorMessage;
    }
    return true;
  }

  columnDataTypeValidator = currentValue => {
    const validation = validate({dataType: currentValue}, this.constraints);

    if (validation.dataType) {
      const { addNotificationMessage } = this.props;
      const firstErrorMessage = validation.dataType[0];

      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:  firstErrorMessage,     // if message empty: it should not show notification
        level:    'error'                // one of 'sucess', 'error', 'info'
      });
      return firstErrorMessage;
    }
    return true;
  }

  columnNumericPrecisionValidator = currentValue => {
    const validation = validate({numericPrecision: currentValue}, this.constraints);

    if (validation.numericPrecision) {
      const { addNotificationMessage } = this.props;
      const firstErrorMessage = validation.numericPrecision[0];

      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:  firstErrorMessage,     // if message empty: it should not show notification
        level:    'error'                // one of 'sucess', 'error', 'info'
      });
      return firstErrorMessage;
    }
    return true;
  }

  columnNumericScaleValidator = currentValue => {
    const validation = validate({numericScale: currentValue}, this.constraints);

    if (validation.numericScale) {
      const { addNotificationMessage } = this.props;
      const firstErrorMessage = validation.numericScale[0];

      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:  firstErrorMessage,     // if message empty: it should not show notification
        level:    'error'                // one of 'sucess', 'error', 'info'
      });
      return firstErrorMessage;
    }
    return true;
  }
}

export default DatasetColumnsTable;
