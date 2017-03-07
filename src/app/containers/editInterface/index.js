import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../redux/modules/views';
import { EditInterface }      from '../../views';
import * as editInterfaceActions  from '../../redux/modules/editInterface';
import * as notificationActions from '../../redux/modules/notification';
import * as addNewInterfaceDatasetActions from '../../redux/modules/addNewInterfaceDataset';
import * as confirmDeleteModalActions from '../../redux/modules/confirmDeleteModal';

const mapStateToProps = (state) => {
  return {
    // views:
    currentView: state.getIn(['views', 'currentView']),

    // editInterface: information on selected interface
    isFetching:     state.getIn(['editInterface', 'isFetching']),
    lastFetchTime:  state.getIn(['editInterface', 'lastFetchTime']),
    interfaceProps: state.getIn(['editInterface', 'interface']),

    // all selected interface datasets
    isFetchingDatasets:     state.getIn(['editInterface', 'isFetchingDatasets']),
    lastFetchTimeDatasets:  state.getIn(['editInterface', 'lastFetchTimeDatasets']),
    interfaceDatasets:      state.getIn(['editInterface', 'interfaceDatasets']),

    // all selected datasets columns description
    interfaceDatasetId:           state.getIn(['editInterface', 'interfaceDatasetId']),
    isFetchingDatasetColDesc:     state.getIn(['editInterface', 'isFetchingDatasetColDesc']),
    lastFetchTimeDatasetColDesc:  state.getIn(['editInterface', 'lastFetchTimeDatasetColDesc']),
    interfaceDatasetColDesc:      state.getIn(['editInterface', 'interfaceDatasetColDesc']),

    // all selected column modifiers
    isFetchingDatasetColMod:     state.getIn(['editInterface', 'isFetchingDatasetColMod']),
    lastFetchTimeDatasetColMod:  state.getIn(['editInterface', 'lastFetchTimeDatasetColMod']),
    interfaceDatasetColMod:      state.getIn(['editInterface', 'interfaceDatasetColMod']),

    // for dropdown list interface type
    interfacesTypes:              state.getIn(['editInterface', 'interfacesTypes']),
    isFetchingInterfacesTypes:    state.getIn(['editInterface', 'isFetchingInterfacesTypes']),
    lastTimeFetchInterfacesTypes: state.getIn(['editInterface', 'lastTimeFetchInterfacesTypes']),

    // for dropdown list interface direction
    interfacesDirections:              state.getIn(['editInterface', 'interfacesDirections']),
    isFetchingInterfacesDirections:    state.getIn(['editInterface', 'isFetchingInterfacesDirections']),
    lastTimeFetchInterfacesDirections: state.getIn(['editInterface', 'lastTimeFetchInterfacesDirections']),

    // for dropdown list column modifiers functions
    columnModFunctions:              state.getIn(['editInterface', 'columnModFunctions']),
    isFetchingColumnModFunctions:    state.getIn(['editInterface', 'isFetchingColumnModFunctions']),
    lastTimeFetchColumnModFunctions: state.getIn(['editInterface', 'lastTimeFetchColumnModFunctions']),


    // for dropdown list interface type
    interfacesFormats:              state.getIn(['editInterface', 'interfacesFormats']),
    isFetchingInterfacesFormats:    state.getIn(['editInterface', 'isFetchingInterfacesFormats']),
    lastTimeFetchInterfacesFormats: state.getIn(['editInterface', 'lastTimeFetchInterfacesFormats'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        // views:
        enterEditInterface: viewsActions.enterEditInterface,
        leaveEditInterface: viewsActions.leaveEditInterface,
        // notifications:
        addNotificationMessage: notificationActions.addNotificationMessage,
        // editInterface (general):
        fetchConfigInterfaceEdit:     editInterfaceActions.fetchConfigInterfaceEditIfNeeded,
        fetchInterfaceTypes:          editInterfaceActions.fetchConfigInterfaceInterfaceTypesEditIfNeeded,
        fetchInterfaceDirections:     editInterfaceActions.fetchConfigInterfaceInterfaceDirectionsEditIfNeeded,
        fetchInterfaceFormats:        editInterfaceActions.fetchConfigInterfaceInterfaceFormatsEditIfNeeded,
        fetchColumnModifiersFct:      editInterfaceActions.fetchConfigInterfaceColumnModFctEditIfNeeded,
        // editInterface (all datasets):
        fetchConfigInterfaceDatasets: editInterfaceActions.fetchConfigInterfaceDatasetsEditIfNeeded,
        onDatasetUpdate:              editInterfaceActions.onDatasetUpdate,
        onDatasetInsert:              editInterfaceActions.onDatasetInsert,
        onDatasetDelete:              editInterfaceActions.onDatasetDelete,
        onDatasetReset:               editInterfaceActions.onDatasetReset,
        // editInterface (columns description):
        fetchConfigInterfaceDatasetColumnDescription: editInterfaceActions.fetchConfigInterfaceDatasetColumnDescriptionEditIfNeeded,
        onDatasetColDescUpdate:               editInterfaceActions.onDatasetColDescUpdate,
        onDatasetColDescInsert:               editInterfaceActions.onDatasetColDescInsert,
        onDatasetColDescDelete:               editInterfaceActions.onDatasetColDescDelete,
        onDatasetColDescReset:                editInterfaceActions.onDatasetColDescReset,
        // editInterface (selected column modifiers):
        fetchConfigInterfaceDatasetColumnModifiers: editInterfaceActions.fetchConfigInterfaceDatasetColumnModifiersEditIfNeeded,
        onDatasetColModUpdate:               editInterfaceActions.onDatasetColModUpdate,
        onDatasetColModInsert:               editInterfaceActions.onDatasetColModInsert,
        onDatasetColModDelete:               editInterfaceActions.onDatasetColModDelete,
        onDatasetColModReset:                editInterfaceActions.onDatasetColModReset,
        // modal add new dataset to interface
        openAddDataSetModal:  addNewInterfaceDatasetActions.openModal,
        closeAddDataSetModal: addNewInterfaceDatasetActions.closeModal,
        // confirmDeleteModal
        openConfirmDeleteModal: confirmDeleteModalActions.openModal
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditInterface);
