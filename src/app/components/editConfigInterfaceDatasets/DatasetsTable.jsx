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
  Grid,
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

const INSERT_NOT_COMMITTED_ROW_ID = '-1';
const AUTO_GEN_ROWID_REGEX = /^autovalue/i;

class DatasetsTable extends Component {
  static propTypes = {
    interfaceName: PropTypes.string.isRequired,

    interfaceId:                  PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    interfaceDatasets:            PropTypes.instanceOf(Immutable.List).isRequired,
    isFetchingDatasets:           PropTypes.bool.isRequired,
    lastFetchTimeDatasets:        PropTypes.string.isRequired,
    fetchConfigInterfaceDatasets: PropTypes.func.isRequired,

    openConfirmDeleteModal: PropTypes.func.isRequired,
    onDatasetDelete:        PropTypes.func.isRequired,
    onDatasetInsert:        PropTypes.func.isRequired,
    onDatasetUpdate:        PropTypes.func.isRequired,
    onDatasetReset:         PropTypes.func.isRequired,
    addNotificationMessage: PropTypes.func.isRequired,
    showDatasetColumnsTable:PropTypes.func.isRequired
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

  state = {
    loading: true,
    datasets: []
  };

  componentDidMount() {
    const {
      interfaceId,
      fetchConfigInterfaceDatasets
    } =  this.props;
    Promise.all([
      fetchConfigInterfaceDatasets(interfaceId)
    ])
    .then(() => this.setState({ loading: false }))
    .catch(() => this.setState({ loading: false }));
  }

  componentWillReceiveProps(nextProps) {
    const { interfaceDatasets } = this.props;
    const { datasets } = this.state;
    // first store fetch case (from nothing to data)
    if (!Immutable.is(interfaceDatasets, nextProps.interfaceDatasets)) {
      // props updated => set state:
      this.setState({ datasets: nextProps.interfaceDatasets.toJS() });
      return;
    }
    // n store fetch case (from data to "same data") but state empty (need to refill)
    if (datasets.length === 0 && nextProps.interfaceDatasets.size > 0) {
      // console.log('force refresh from props');
      this.setState({ datasets: nextProps.interfaceDatasets.toJS() });
      return;
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { datasets } = this.state;
    // force refresh
    if (datasets.length > 0 && nextState.datasets.length === 0) {
      // console.log('force refresh after datasets reset');
      this.setState({ datasets: nextProps.interfaceDatasets.toJS() });
      return;
    }
  }

  render() {
    const { interfaceName } = this.props;
    const { datasets, loading } = this.state;

    return (
      <div>
        <Grid>
          <Row style={{ marginBottom: '5px' }}>
            {
              loading === true
              ?
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
              :
              <Col
                lg={12}
                md={12}
                sm={12}
                xs={12}>
                <BootstrapTable
                  ref="table"
                  data={datasets}
                  striped
                  // headerStyle={ { background: '#4a4a4a',  color: '#f1f1f1' } }
                  hover
                  pagination
                  csvFileName={`${interfaceName}-datasets`}
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
                    width={'120px'}
                    dataFormat={this.formatIdField}
                    autoValue
                    // hiddenOnInsert
                    dataSort={true}>
                    id
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="tableName"
                    dataSort={true}
                    editable={{
                      type: 'input',
                      validator: this.tableNameValidator
                    }}
                    filter={{
                      type: 'TextFilter',
                      placeholder: 'filter'
                    }}>
                    table name
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="tablePrescedence"
                    dataSort={true}
                    dataAlign="center"
                    width={'160px'}
                    editable={{
                      type: 'number',
                      validator: this.tablePrescedenceValidator
                    }}
                    filter={{
                      type: 'TextFilter',
                      placeholder: 'filter'
                    }}>
                    table prescedence
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="nbCols"
                    hiddenOnInsert
                    dataSort={false}
                    dataAlign="center"
                    width={'120px'}
                    dataFormat={this.formatEditColumn}>
                    Columns
                  </TableHeaderColumn>
                </BootstrapTable>
              </Col>
            }
          </Row>
        </Grid>
        {
          !loading &&
          <Grid>
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
          </Grid>
        }
      </div>
    );
  }

  /**
   * [formatEditColumn description]
   * @param  {String} cell  cell value
   * @param  {Object} row   row object
   * @return {Void}         [description]
   */
  formatEditColumn = (cell, row) => (
    <FormatEditColumn
      cell={cell}
      datasetId={row.id}
      datasetName={row.tableName}
      onClick={this.handlesOnEditDatasetColumns}
    />
  );


  handlesOnEditDatasetColumns = ({ datasetId, datasetName }) => {
    if (!datasetId || String(datasetId).length === 0) {
      const { addNotificationMessage } = this.props;
      const errorMessage = 'Could not edit this dataset rows (incorrect id)';
      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:    errorMessage,         // if message empty: it should not show notification
        level:      'error'               // one of 'sucess', 'error', 'info'
      });
      return false;
    }
    // dispaly dataset columns table:
    const { showDatasetColumnsTable }  = this.props;
    // set selected dataset Name in state (used for column table header)
    showDatasetColumnsTable({ datasetId, datasetName });
    return true;
  }

  /**
   * force reset (datatble should rebind interfaceDatasets as before changes)
   * @param {event} event native event
   * @return {undefined}
   */
  reset = (event) => {
    if (event) {
      event.preventDefault();
    }
    const {onDatasetReset}  =this.props;
    // setting empty datasets in state => will force refresh from props (see componentWillUpdate)
    this.setState({datasets: []});
    // empty stores : interfaceDatasetsDeleted, updated and inserted
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
    if (cellName === 'tableName') {
      return this.tableNameValidator(cellValue);
    }
    if (cellName === 'tablePrescedence') {
      return this.tablePrescedenceValidator(cellValue);
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

  tableNameValidator = (currentValue) => {
    const validation = validate({tableName: currentValue}, this.constraints);

    if (validation.tableName) {
      const { addNotificationMessage } = this.props;

      const firstErrorMessage = validation.tableName[0];
      addNotificationMessage({
        actionTime: moment().format(),   // time change is the way to trigger a new notification (Component side)
        message:    firstErrorMessage,     // if message empty: it should not show notification
        level:      'error'                // one of 'sucess', 'error', 'info'
      });
      return firstErrorMessage;
    }
    return true;
  }

  tablePrescedenceValidator = currentValue => {
    const validation = validate({tablePrescedence: currentValue}, this.constraints);

    if (validation.tablePrescedence) {
      const { addNotificationMessage } = this.props;
      const firstErrorMessage = validation.tablePrescedence[0];

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

export default DatasetsTable;
