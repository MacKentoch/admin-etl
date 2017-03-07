import React, {Component, PropTypes} from 'react';

import Immutable                        from 'immutable';
import TabContentTitle                  from '../tabContentTitle/TabContentTitle.jsx';
import DatasetTableHeader               from './DatasetTableHeader.jsx';
import DatasetsTable                    from './DatasetsTable.jsx';
import DatasetColumnTableHeader         from './DatasetColumnTableHeader.jsx';
import DatasetColumnsTable              from './DatasetColumnsTable.jsx';
import DatasetColumnModifiersHeader     from './DatasetColumnModifiersHeader.jsx';
import DatasetColumnModifiersTable      from './DatasetColumnModifiersTable.jsx';

const NO_DATASET_SELECTED_ID = 0;
const NO_DATASET_SELECTED_NAME = 0;

const NO_COLUMN_SELECTED_ID = 0;
const NO_COLUMN_SELECTED_NAME = 0;

const TABLE_TYPE = ['datasets', 'column_description', 'column_modifiers'];

class EditConfigInterfaceDatasets extends Component {
  static propTypes = {
    // passed from parent (and comes from route param)
    interfaceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    interfaceName: PropTypes.string.isRequired,

    // editInterface:
    isFetching:     PropTypes.bool.isRequired,
    lastFetchTime:  PropTypes.string.isRequired,
    interfaceProps: PropTypes.instanceOf(Immutable.Map).isRequired,

    interfaceDatasets:      PropTypes.instanceOf(Immutable.List).isRequired,
    isFetchingDatasets:     PropTypes.bool.isRequired,
    lastFetchTimeDatasets:  PropTypes.string.isRequired,

    interfaceDatasetId:           PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isFetchingDatasetColDesc:     PropTypes.bool.isRequired,
    lastFetchTimeDatasetColDesc:  PropTypes.string.isRequired,
    interfaceDatasetColDesc:      PropTypes.instanceOf(Immutable.List).isRequired,

    // distinct column modifiers (for dropdownlist)
    columnModFunctions:              PropTypes.instanceOf(Immutable.List).isRequired,
    isFetchingColumnModFunctions:    PropTypes.bool.isRequired,
    lastTimeFetchColumnModFunctions: PropTypes.string.isRequired,
    fetchColumnModifiersFct:     PropTypes.func.isRequired,

    // editInterface (column modifiers):
    isFetchingDatasetColMod:     PropTypes.bool.isRequired,
    lastFetchTimeDatasetColMod:  PropTypes.string.isRequired,
    interfaceDatasetColMod:      PropTypes.instanceOf(Immutable.List).isRequired,

    // action creators
    //  -> editInterface (general):
    fetchConfigInterfaceDatasets: PropTypes.func.isRequired,
    onDatasetUpdate:              PropTypes.func.isRequired,
    onDatasetInsert:              PropTypes.func.isRequired,
    onDatasetDelete:              PropTypes.func.isRequired,
    onDatasetReset:               PropTypes.func.isRequired,

    // editInterface (all columns description):
    fetchConfigInterfaceDatasetColumnDescription: PropTypes.func.isRequired,
    onDatasetColDescUpdate:               PropTypes.func.isRequired,
    onDatasetColDescInsert:               PropTypes.func.isRequired,
    onDatasetColDescDelete:               PropTypes.func.isRequired,
    onDatasetColDescReset:                PropTypes.func.isRequired,
    // editInterface (all column modifiers):
    fetchConfigInterfaceDatasetColumnModifiers: PropTypes.func.isRequired,
    onDatasetColModUpdate:               PropTypes.func.isRequired,
    onDatasetColModInsert:               PropTypes.func.isRequired,
    onDatasetColModDelete:               PropTypes.func.isRequired,
    onDatasetColModReset:                PropTypes.func.isRequired,

    openConfirmDeleteModal:       PropTypes.func.isRequired,
    //  -> notifications:
    addNotificationMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    interfaceProps: new Map()
  };

  state = {
    tableType: TABLE_TYPE[0],

    selectedDatasetId: NO_DATASET_SELECTED_ID,
    selectedDatasetName: NO_DATASET_SELECTED_NAME,

    selectedColumnId: NO_COLUMN_SELECTED_ID,
    selectedColumnName: NO_COLUMN_SELECTED_NAME
  };

  render() {
    const { interfaceProps, interfaceName } = this.props;
    const {
      tableType,
      selectedDatasetId,
      selectedDatasetName,
      selectedColumnId,
      selectedColumnName
    } = this.state;
    const {
      openConfirmDeleteModal,
      onDatasetDelete,
      onDatasetInsert,
      onDatasetUpdate,
      onDatasetReset,
      addNotificationMessage,
      onDatasetColDescUpdate,
      onDatasetColDescInsert,
      onDatasetColDescDelete,
      onDatasetColDescReset,
      onDatasetColModUpdate,
      onDatasetColModInsert,
      onDatasetColModDelete,
      onDatasetColModReset
    } = this.props;
    const {
      // interfaceDatasetId,
      interfaceId,
      interfaceDatasets,
      isFetchingDatasets,
      columnModFunctions,
      isFetchingColumnModFunctions,
      lastTimeFetchColumnModFunctions,
      lastFetchTimeDatasets,
      isFetchingDatasetColDesc,
      fetchConfigInterfaceDatasets,
      lastFetchTimeDatasetColDesc,
      interfaceDatasetColDesc,
      fetchColumnModifiersFct,
      fetchConfigInterfaceDatasetColumnDescription,
      fetchConfigInterfaceDatasetColumnModifiers,
      interfaceDatasetColMod,
      isFetchingDatasetColMod,
      lastFetchTimeDatasetColMod
    } = this.props;

    return (
      <div id="CONFIG_INTERFACE_DATASET">
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
                  (dbo.CONFIG_INTERFACE_DATASET)
                </i>
              </p>
            </div>
          )}
        />
        {/* dataset table (defaut view) */}
        {
          tableType === TABLE_TYPE[0] &&
          <div>
            <DatasetTableHeader />
            <DatasetsTable
              interfaceName={interfaceName}
              interfaceId={interfaceId}
              interfaceDatasets={interfaceDatasets}
              isFetchingDatasets={isFetchingDatasets}
              lastFetchTimeDatasets={lastFetchTimeDatasets}
              fetchConfigInterfaceDatasets={fetchConfigInterfaceDatasets}
              openConfirmDeleteModal={openConfirmDeleteModal}
              onDatasetDelete={onDatasetDelete}
              onDatasetInsert={onDatasetInsert}
              onDatasetUpdate={onDatasetUpdate}
              onDatasetReset={onDatasetReset}
              addNotificationMessage={addNotificationMessage}
              showDatasetColumnsTable={this.handlesShowDatasetColumnsTable}
            />
          </div>
        }
        {/* dataset columns */}
        {
          tableType === TABLE_TYPE[1] &&
          <div>
            <DatasetColumnTableHeader
              datasetName={selectedDatasetName}
              backToDatasetsTables={this.handlesShowDatasetsTables}
            />
            <DatasetColumnsTable
              interfaceName={interfaceName}
              interfaceDatasetId={selectedDatasetId}
              isFetchingDatasetColDesc={isFetchingDatasetColDesc}
              lastFetchTimeDatasetColDesc={lastFetchTimeDatasetColDesc}
              interfaceDatasetColDesc={interfaceDatasetColDesc}
              fetchConfigInterfaceDatasetColumnDescription={fetchConfigInterfaceDatasetColumnDescription}
              openConfirmDeleteModal={openConfirmDeleteModal}
              onDatasetDelete={onDatasetColDescDelete}
              onDatasetInsert={onDatasetColDescInsert}
              onDatasetUpdate={onDatasetColDescUpdate}
              onDatasetReset={onDatasetColDescReset}
              addNotificationMessage={addNotificationMessage}
              backToDatasetsTables={this.handlesShowDatasetsTables}
              showColumnModifiersTable={this.handlesShowColumnsModifiersTable}
            />
          </div>
        }
        {
          tableType === TABLE_TYPE[2] &&
          <div>
            <DatasetColumnModifiersHeader
              columnName={selectedColumnName}
              datasetId={selectedDatasetId}
              datasetName={selectedDatasetName}
              backToColumnsTables={this.handlesShowDatasetColumnsTable}
            />
            <DatasetColumnModifiersTable
              columnName={selectedColumnName}
              columnId={selectedColumnId}
              // distinct column modifiers (for dropdownlist)
              columnModFunctions={columnModFunctions}
              isFetchingColumnModFunctions={isFetchingColumnModFunctions}
              lastTimeFetchColumnModFunctions={lastTimeFetchColumnModFunctions}
              fetchColumnModifiersFct={fetchColumnModifiersFct}
              // editInterface (column modifiers):
              interfaceDatasetColMod={interfaceDatasetColMod}
              isFetchingDatasetColMod={isFetchingDatasetColMod}
              lastFetchTimeDatasetColMod={lastFetchTimeDatasetColMod}
              fetchConfigInterfaceDatasetColumnModifiers={fetchConfigInterfaceDatasetColumnModifiers}
              onDatasetColModUpdate={onDatasetColModUpdate}
              onDatasetColModInsert={onDatasetColModInsert}
              onDatasetColModDelete={onDatasetColModDelete}
              onDatasetColModReset={onDatasetColModReset}

              openConfirmDeleteModal={openConfirmDeleteModal}
              addNotificationMessage={addNotificationMessage}

              // showDatasetColumnsTable={this.handlesShowDatasetColumnsTable}
            />
          </div>
        }
      </div>
    );
  }

  handlesShowDatasetColumnsTable = ({ datasetId, datasetName }) => {
    this.setState({
      tableType:            TABLE_TYPE[1],
      selectedDatasetId:    datasetId,
      selectedDatasetName:  datasetName,
      selectedColumnId:     NO_COLUMN_SELECTED_ID,
      selectedColumnName:   NO_COLUMN_SELECTED_NAME
    });
  }

  handlesShowColumnsModifiersTable = ({ columnId, columnName }) => {
    this.setState({
      tableType:            TABLE_TYPE[2],
      // selectedDatasetId:    columnId,
      // selectedDatasetName:  columnName,
      selectedColumnId:     columnId,
      selectedColumnName:   columnName
    });
  }

  handlesShowDatasetsTables = () => {
    this.setState({
      tableType:            TABLE_TYPE[0],
      selectedDatasetId:    NO_DATASET_SELECTED_ID,
      selectedDatasetName:  NO_DATASET_SELECTED_NAME,
      selectedColumnId:     NO_COLUMN_SELECTED_ID,
      selectedColumnName:   NO_COLUMN_SELECTED_NAME
    });
  }
}

export default EditConfigInterfaceDatasets;
