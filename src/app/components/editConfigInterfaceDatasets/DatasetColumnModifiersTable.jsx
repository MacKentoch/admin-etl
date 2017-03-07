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
// import FormatEditColumn                 from './FormatEditColumn.jsx';
import Immutable                        from 'immutable';
import NullableEditor                   from './NullableEditor.jsx';
import NullableModalEditor              from './NullableModalEditor.jsx';
import IdentityEditor                   from './IdentityEditor.jsx';
import IdentityModalEditor              from './IdentityModalEditor.jsx';
// import FormatEditColumnModifers         from './FormatEditColumnModifers.jsx';

const INSERT_NOT_COMMITTED_ROW_ID = '-1';
const AUTO_GEN_ROWID_REGEX = /^autovalue/i;

class DatasetColumnModifiersTable extends Component {
  static propTypes = {
    columnName: PropTypes.string.isRequired,
    columnId:           PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

    // distinct column modifiers (for dropdownlist)
    columnModFunctions:               PropTypes.instanceOf(Immutable.List).isRequired,
    isFetchingColumnModFunctions:     PropTypes.bool.isRequired,
    lastTimeFetchColumnModFunctions:  PropTypes.string.isRequired,
    fetchColumnModifiersFct:          PropTypes.func.isRequired,

    // editInterface (column modifiers):
    interfaceDatasetColMod:      PropTypes.instanceOf(Immutable.List).isRequired,
    isFetchingDatasetColMod:     PropTypes.bool.isRequired,
    lastFetchTimeDatasetColMod:  PropTypes.string.isRequired,
    fetchConfigInterfaceDatasetColumnModifiers: PropTypes.func.isRequired,
    onDatasetColModUpdate:               PropTypes.func.isRequired,
    onDatasetColModInsert:               PropTypes.func.isRequired,
    onDatasetColModDelete:               PropTypes.func.isRequired,
    onDatasetColModReset:                PropTypes.func.isRequired,

    openConfirmDeleteModal:   PropTypes.func.isRequired,
    addNotificationMessage:   PropTypes.func.isRequired

    // showDatasetColumnsTable: PropTypes.func.isRequired
  };

  // validation contraints
  constraints = {
    functionName: {
      presence: true,
      length: {
        minimum: 3,
        message: 'must be at least 3 characters'
      }
    },
    param1: {
      presence: false
    },
    param2: {
      presence: false
    },
    param3: {
      presence: false
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
    }
  };

  state = {
    loading: true,
    columnModifiers: []
  }

  componentDidMount() {
    const {
      columnId,
      fetchColumnModifiersFct,
      fetchConfigInterfaceDatasetColumnModifiers
    } =  this.props;
    Promise.all([
      fetchColumnModifiersFct(),
      fetchConfigInterfaceDatasetColumnModifiers(columnId)
    ])
    .then(() => this.setState({ loading: false }))
    .catch(() => this.setState({ loading: false }));
  }

  componentWillReceiveProps(nextProps) {
    const { interfaceDatasetColMod } = this.props;
    const { columnModifiers } = this.state;
    // first store fetch case (from nothing to data)
    if (!Immutable.is(interfaceDatasetColMod, nextProps.interfaceDatasetColMod)) {
      // props updated => set state:
      this.setState({ columnModifiers: nextProps.interfaceDatasetColMod.toJS() });
      return;
    }
    // n store fetch case (from data to "same data") but state empty (need to refill)
    if (columnModifiers.length === 0 && nextProps.interfaceDatasetColMod.size > 0) {
      // console.log('force refresh from props');
      this.setState({ columnModifiers: nextProps.interfaceDatasetColMod.toJS() });
      return;
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { columnModifiers } = this.state;
    // force refresh
    if (columnModifiers.length > 0 && nextState.columnModifiers.length === 0) {
      // console.log('force refresh after columnModifiers reset');
      this.setState({ columnModifiers: nextProps.interfaceDatasetColMod.toJS() });
      return;
    }
  }

  render() {
    const {
      columnName,
      columnModFunctions
    } = this.props;
    const { columnModifiers } = this.state;
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
                      data={columnModifiers}
                      striped
                      hover
                      pagination
                      csvFileName={`${columnName || 'not set'}-modifiers`}
                      options={{
                        insertText: 'add new column modifier',
                        noDataText: 'Currently no modifier. Click on "add new column modifier" to add one',
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
                        dataField="functionName"
                        dataSort={true}
                        dataAlign="center"
                        width={'200px'}
                        editable={{
                          type: 'select',
                          options: { values: [...columnModFunctions] },
                          validator: this.columnFunctionNameValidator
                        }}
                        filter={{
                          type: 'TextFilter',
                          placeholder: 'filter'
                        }}>
                        function
                      </TableHeaderColumn>

                      <TableHeaderColumn
                        dataField="param1"
                        dataSort={true}
                        dataAlign="center"
                        // width={'160px'}
                        editable={{
                          type: 'input',
                          validator: this.columnParam1Validator
                        }}
                        filter={{
                          type: 'TextFilter',
                          placeholder: 'filter'
                        }}>
                        param1
                      </TableHeaderColumn>

                      <TableHeaderColumn
                        dataField="param2"
                        dataSort={true}
                        dataAlign="center"
                        // width={'160px'}
                        editable={{
                          type: 'input',
                          validator: this.columnParam2Validator
                        }}
                        filter={{
                          type: 'TextFilter',
                          placeholder: 'filter'
                        }}>
                        param2
                      </TableHeaderColumn>

                      <TableHeaderColumn
                        dataField="param3"
                        dataSort={true}
                        dataAlign="center"
                        // width={'160px'}
                        editable={{
                          type: 'input',
                          validator: this.columnParam3Validator
                        }}
                        filter={{
                          type: 'TextFilter',
                          placeholder: 'filter'
                        }}>
                        param3
                      </TableHeaderColumn>

                      <TableHeaderColumn
                        dataField="position"
                        dataSort={true}
                        width={'80px'}
                        dataAlign="center"
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

  // /**
  //  * [formatEditColumn modififers]
  //  * @param  {String} cell  cell value
  //  * @param  {Object} row   row object
  //  * @return {Void}         [description]
  //  */
  // formatEditColumnModifers = (cell, row) => (
  //   <FormatEditColumnModifers
  //     cell={cell}
  //     columnId={row.id}
  //     columnName={row.name}
  //     onClick={this.handlesOnEditColumnModifiers}
  //   />
  // );

  // handlesOnEditColumnModifiers = ({ columnId, columnName }) => {
  //   if (!columnId || String(columnId).length === 0) {
  //     const { addNotificationMessage } = this.props;
  //     const errorMessage = 'Could not edit this dataset rows (incorrect id)';
  //     addNotificationMessage({
  //       actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
  //       message:    errorMessage,         // if message empty: it should not show notification
  //       level:      'error'               // one of 'sucess', 'error', 'info'
  //     });
  //     return false;
  //   }
  //   // display column modifiers table:
  //   const { showColumnModifiersTable }  = this.props;
  //   // set selected dataset Name in state (used for column table header)
  //   showColumnModifiersTable({ columnId, columnName });
  //   return true;
  // }

  /**
   * force reset (datatble should rebind interfaceDatasetColDesc as before changes)
   * @param {event} event native event
   * @return {undefined}
   */
  reset = (event) => {
    if (event) {
      event.preventDefault();
    }
    const {onDatasetColModReset}  =this.props;
    // setting empty datasetColumns in state => will force refresh from props (see componentWillUpdate)
    this.setState({interfaceDatasetColMod: []});
    // empty stores : interfaceDatasetColDescDeleted, updated and inserted
    onDatasetColModReset();
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
    const  { onDatasetColModDelete } = this.props;
    rowIds.forEach(rowId => onDatasetColModDelete(rowId, rowId));
    return true;
  }

  /**
   * after table new row added
   * @param  {Any} row  row added Object
   * @return {Bool}     nothing
   */
  handlesOnRowAdded = row => {
    const  { onDatasetColModInsert } = this.props;
    onDatasetColModInsert(row);
    return true;
  }

  handelsBeforeSaveCell = (row, cellName, cellValue) => {
    if (cellName === 'functionName') {
      return this.columnFunctionNameValidator(cellValue);
    }
    if (cellName === 'param1') {
      return this.columnParam1Validator(cellValue);
    }
    if (cellName === 'param2') {
      return this.columnParam2Validator(cellValue);
    }
    if (cellName === 'param3') {
      return this.columnParam3Validator(cellValue);
    }
    if (cellName === 'postition') {
      return this.columnPositionValidator(cellValue);
    }
    return false;
  }

  handelsAfterSaveCell = (row) => {
    const { onDatasetColModUpdate } = this.props;
    onDatasetColModUpdate(row);
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

  columnFunctionNameValidator = (currentValue) => {
    const validation = validate({functionName: currentValue}, this.constraints);

    if (validation.functionName) {
      const { addNotificationMessage } = this.props;

      const firstErrorMessage = validation.functionName[0];
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

  columnParam1Validator = currentValue => {
    const validation = validate({param1: currentValue}, this.constraints);

    if (validation.param1) {
      const { addNotificationMessage } = this.props;
      const firstErrorMessage = validation.param1[0];

      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:  firstErrorMessage,     // if message empty: it should not show notification
        level:    'error'                // one of 'sucess', 'error', 'info'
      });
      return firstErrorMessage;
    }
    return true;
  }

  columnParam2Validator = currentValue => {
    const validation = validate({param2: currentValue}, this.constraints);

    if (validation.param2) {
      const { addNotificationMessage } = this.props;
      const firstErrorMessage = validation.param2[0];

      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:  firstErrorMessage,     // if message empty: it should not show notification
        level:    'error'                // one of 'sucess', 'error', 'info'
      });
      return firstErrorMessage;
    }
    return true;
  }

  columnParam3Validator = currentValue => {
    const validation = validate({param3: currentValue}, this.constraints);

    if (validation.param3) {
      const { addNotificationMessage } = this.props;
      const firstErrorMessage = validation.param3[0];

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

export default DatasetColumnModifiersTable;
