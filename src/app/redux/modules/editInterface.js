import moment from 'moment';
import { Map, List, fromJS } from 'immutable';
import { appConfig } from '../../config';
import interfaceMockData from '../../mocks/interfaceConfigMock.json';
import interfacesTypeMock from '../../mocks/distinctTypeInterfaces.json';
import interfacesDirectionsMock from '../../mocks/distinctDirectionsInterfaces.json';
import interfacesFormatsMock from '../../mocks/distinctFormatsInterfaces.json';
import interfaceDatasetsMock from '../../mocks/interfaceConfigDatasets.json';
import interfaceDatasetColDescDescriptionMock from '../../mocks/interfaceConfigDatasetColDescription.json';
import interfaceDatasetColDescModifiersMock from '../../mocks/interfaceConfigDatasetColModifiers.json';
import getLocationOrigin from '../../services/utils/getLocationOrigin';
import modifiersFunctionsMock from '../../mocks/distinctModifierFunction.json';

// --------------------------------
// CONSTANTS
// --------------------------------
const REQUEST_CONFIG_INTERFACE_EDIT  = 'REQUEST_CONFIG_INTERFACE_EDIT';
const RECEIVED_CONFIG_INTERFACE_EDIT = 'RECEIVED_CONFIG_INTERFACE_EDIT';
const ERROR_CONFIG_INTERFACE_EDIT    = 'ERROR_CONFIG_INTERFACE_EDIT';

const REQUEST_CONFIG_INTERFACE_INTERFACE_TYPES_EDIT  = 'REQUEST_CONFIG_INTERFACE_INTERFACE_TYPES_EDIT';
const RECEIVED_CONFIG_INTERFACE_INTERFACE_TYPES_EDIT = 'RECEIVED_CONFIG_INTERFACE_INTERFACE_TYPES_EDIT';
const ERROR_CONFIG_INTERFACE_INTERFACE_TYPES_EDIT    = 'ERROR_CONFIG_INTERFACE_INTERFACE_TYPES_EDIT';

const REQUEST_CONFIG_INTERFACE_INTERFACE_DIRECTIONS_EDIT  = 'REQUEST_CONFIG_INTERFACE_INTERFACE_DIRECTIONS_EDIT';
const RECEIVED_CONFIG_INTERFACE_INTERFACE_DIRECTIONS_EDIT = 'RECEIVED_CONFIG_INTERFACE_INTERFACE_DIRECTIONS_EDIT';
const ERROR_CONFIG_INTERFACE_INTERFACE_DIRECTIONS_EDIT    = 'ERROR_CONFIG_INTERFACE_INTERFACE_DIRECTIONS_EDIT';

const REQUEST_CONFIG_INTERFACE_INTERFACE_FORMATS_EDIT  = 'REQUEST_CONFIG_INTERFACE_INTERFACE_FORMATS_EDIT';
const RECEIVED_CONFIG_INTERFACE_INTERFACE_FORMATS_EDIT = 'RECEIVED_CONFIG_INTERFACE_INTERFACE_FORMATS_EDIT';
const ERROR_CONFIG_INTERFACE_INTERFACE_FORMATS_EDIT    = 'ERROR_CONFIG_INTERFACE_INTERFACE_FORMATS_EDIT';

const REQUEST_CONFIG_INTERFACE_COLUMN_MODIFIER_FUNCT_EDIT  = 'REQUEST_CONFIG_INTERFACE_COLUMN_MODIFIER_FUNCT_EDIT';
const RECEIVED_CONFIG_INTERFACE_COLUMN_MODIFIER_FUNCT_EDIT = 'RECEIVED_CONFIG_INTERFACE_COLUMN_MODIFIER_FUNCT_EDIT';
const ERROR_CONFIG_INTERFACE_COLUMN_MODIFIER_FUNCT_EDIT    = 'ERROR_CONFIG_INTERFACE_COLUMN_MODIFIER_FUNCT_EDIT';

// fetches interface datasets list
const REQUEST_CONFIG_INTERFACE_DATASETS_EDIT  = 'REQUEST_CONFIG_INTERFACE_DATASETS_EDIT';
const RECEIVED_CONFIG_INTERFACE_DATASETS_EDIT = 'RECEIVED_CONFIG_INTERFACE_DATASETS_EDIT';
const ERROR_CONFIG_INTERFACE_DATASETS_EDIT    = 'ERROR_CONFIG_INTERFACE_DATASETS_EDIT';

// fetches interface datasets list
const REQUEST_ADD_NEW_INTERFACE_DATASET  = 'REQUEST_ADD_NEW_INTERFACE_DATASET';
const RECEIVED_ADD_NEW_INTERFACE_DATASET = 'RECEIVED_ADD_NEW_INTERFACE_DATASET';
const ERROR_ADD_NEW_INTERFACE_DATASET    = 'ERROR_ADD_NEW_INTERFACE_DATASET';

const ON_DATASET_UPDATE_INTERFACE_DATASETS_EDIT = 'ON_DATASET_UPDATE_INTERFACE_DATASETS_EDIT';
const ON_DATASET_INSERT_INTERFACE_DATASETS_EDIT = 'ON_DATASET_INSERT_INTERFACE_DATASETS_EDIT';
const ON_DATASET_DELETE_INTERFACE_DATASETS_EDIT = 'ON_DATASET_DELETE_INTERFACE_DATASETS_EDIT';
const ON_DATASET_RESET_INTERFACE_DATASETS_EDIT  = 'ON_DATASET_RESET_INTERFACE_DATASETS_EDIT';

// fetches interface datasets columns description list
const REQUEST_CONFIG_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT = 'REQUEST_CONFIG_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT';
const RECEIVED_CONFIG_INTERFACEDATASET_COLUMN_DESCRIPTION_EDIT = 'RECEIVED_CONFIG_INTERFACEDATASET_COLUMN_DESCRIPTION_EDIT';
const ERROR_CONFIG_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT   = 'ERROR_CONFIG_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT';

const ON_DATASET_UPDATE_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT = 'ON_DATASET_UPDATE_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT';
const ON_DATASET_INSERT_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT = 'ON_DATASET_INSERT_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT';
const ON_DATASET_DELETE_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT = 'ON_DATASET_DELETE_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT';
const ON_DATASET_RESET_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT  = 'ON_DATASET_RESET_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT';

// fetches interface datasets columns modifiers list
const REQUEST_CONFIG_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT = 'REQUEST_CONFIG_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT';
const RECEIVED_CONFIG_INTERFACEDATASET_COLUMN_MODIFIERS_EDIT = 'RECEIVED_CONFIG_INTERFACEDATASET_COLUMN_MODIFIERS_EDIT';
const ERROR_CONFIG_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT   = 'ERROR_CONFIG_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT';

const ON_DATASET_UPDATE_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT = 'ON_DATASET_UPDATE_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT';
const ON_DATASET_INSERT_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT = 'ON_DATASET_INSERT_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT';
const ON_DATASET_DELETE_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT = 'ON_DATASET_DELETE_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT';
const ON_DATASET_RESET_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT  = 'ON_DATASET_RESET_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT';

// --------------------------------
// REDUCER
// --------------------------------

// regex for autogenerated row ids from react-bootstrap-table:
const AUTO_GEN_ROWID_REGEX = /^autovalue/i;

const initialState = Map({
  // interfaces (CONFIG_INTERFACE lines):
  isFetching:     false,
  lastFetchTime:  '',
  interface:      Map(),

  // interfaces (CONFIG_INTERFACE_DATASET lines):
  isFetchingDatasets:         false,
  lastFetchTimeDatasets:      '',
  interfaceDatasets:          List(), // initial fetch result: all datasets as in db (before changes)
  interfaceDatasetsInserted:  List(),  // feed with new datasets added comared to db
  interfaceDatasetsUpdated:   List(),   // feed with updated existing datasets
  interfaceDatasetsDeleted:   List(),   // feed with deleted existing datasets
  changesNeedCommit:          false, // when applied change to datasets => set to true (indicator to informs changes inserted, updated or deleted or not saved into database)

  // interfaces (CONFIG_INTERFACE_DATASET_COLUMN_DESCRIPTIONS lines):
  interfaceDatasetId:               0, // = selected datasetId: not used: will be stored in component state
  isFetchingDatasetColDesc:         false,
  lastFetchTimeDatasetColDesc:      '',
  interfaceDatasetColDesc:          List(),
  interfaceDatasetsColDescInserted: List(),  // feed with new datasets added comared to db
  interfaceDatasetsColDescUpdated:  List(),   // feed with updated existing datasets
  interfaceDatasetsColDescDeleted:  List(),   // feed with deleted existing datasets
  colDescChangesNeedCommit:         false, // when applied change to datasets => set to true (indicator to informs changes inserted, updated or deleted or not saved into database)

  // interfaces (CONFIG_INTERFACE_DATASET_COLUMN_MODIFIERS lines):
  isFetchingDatasetColMod:         false,
  lastFetchTimeDatasetColMod:      '',
  interfaceDatasetColMod:          List(),
  interfaceDatasetsColModInserted: List(),  // feed with new datasets added comared to db
  interfaceDatasetsColModUpdated:  List(),   // feed with updated existing datasets
  interfaceDatasetsColModDeleted:  List(),   // feed with deleted existing datasets
  colModChangesNeedCommit:         false, // when applied change to datasets => set to true (indicator to informs changes inserted, updated or deleted or not saved into database)

  // distinct value for interfaces types ('ELEGIBILITY', 'UHI', etc...):
  isFetchingInterfacesTypes:      false,
  lastTimeFetchInterfacesTypes:   '',
  interfacesTypes:                List(),
  // distinct value for interfaces types ('IN', 'OUT', etc...):
  isFetchingInterfacesDirections:     false,
  lastTimeFetchInterfacesDirections:  '',
  interfacesDirections:               List(),
  // distinct value for interfaces Format ('TABLE', 'CSV', etc...):
  isFetchingInterfacesFormats:      false,
  lastTimeFetchInterfacesFormats:  '',
  interfacesFormats:               List(),
  // distinct value for column modifiers functions ('UPPER', 'DATE_FORMAT', etc...):
  isFetchingColumnModFunctions:      false,
  lastTimeFetchColumnModFunctions:  '',
  columnModFunctions:               List(),
  // last action time (any action):
  actionTime: ''
});

export default function (state = initialState, action) {
  const currentTime = moment().format();
  switch (action.type) {
  // interface datasets columns description list
  case REQUEST_CONFIG_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT:
    return state.merge({
      actionTime: currentTime,
      isFetchingDatasetColDesc: true,
      interfaceDatasetId: 0
    });

  case ERROR_CONFIG_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT:
    return state.merge({
      actionTime: currentTime,
      isFetchingDatasetColDesc: false
    });

  case RECEIVED_CONFIG_INTERFACEDATASET_COLUMN_DESCRIPTION_EDIT:
    return state.merge({
      actionTime: currentTime,
      isFetchingDatasetColDesc: false,
      lastFetchTimeDatasetColDesc: currentTime
    })
    .set('interfaceDatasetColDesc', fromJS(action.payload));

  case ON_DATASET_UPDATE_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT:
    const columnDescIndex = state
                            .get('interfaceDatasetsColDescUpdated')
                            .toSeq() // performance boost
                            .findIndex(colDesc => colDesc.get('id') === action.colDesc.id);

    let updatedListColDesc;
    if (columnDescIndex <= -1) {
      updatedListColDesc = state
                            .get('interfaceDatasetsColDescUpdated')
                            .push(fromJS(action.colDesc));
    } else {
      updatedListColDesc = state
                          .get('interfaceDatasetsColDescUpdated')
                          .toSeq() // performance boost
                          .map(
                            colDesc => {
                              if (colDesc.get('id') === action.colDesc.id) {
                                return fromJS(action.colDesc);
                              }
                              return colDesc;
                            }
                          )
                          .toList();
    }

    return state
    .set('colDescChangesNeedCommit', true)
    .set('interfaceDatasetsColDescUpdated', updatedListColDesc);

  case ON_DATASET_INSERT_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT:
    return state
      .update('interfaceDatasetsColDescInserted', colsDesc => colsDesc.push(fromJS(action.colDesc)))
      .set('colDescChangesNeedCommit', true);

  case ON_DATASET_RESET_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT:
    return state
    .set('interfaceDatasetsColDescInserted', List())
    .set('interfaceDatasetsColDescUpdated', List())
    .set('interfaceDatasetsColDescDeleted', List())
    .set('colDescChangesNeedCommit', false);

  case ON_DATASET_DELETE_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT:
    const immutableColDescFilterId = immutableDataset => String(immutableDataset.get('id')) !== String(action.datasetId);
    const isAutoGenColDescId = rawId => AUTO_GEN_ROWID_REGEX.test(rawId);

    return state
      .update('interfaceDatasetsColDescDeleted', ids => isAutoGenColDescId(action.colDescId) ? ids : ids.push(action.colDescId))
      .update('interfaceDatasetsColDescInserted', colsDesc => colsDesc.filter(immutableColDescFilterId))
      .update('interfaceDatasetsColDescUpdated', colsDesc => colsDesc.filter(immutableColDescFilterId))
      .set('colDescChangesNeedCommit', true);

  // interface datasets columns modifiers list
  case REQUEST_CONFIG_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT:
    return state.merge({
      actionTime: currentTime,
      isFetchingDatasetColMod: true
    });

  case ERROR_CONFIG_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT:
    return state.merge({
      actionTime: currentTime,
      isFetchingDatasetColMod: false
    });

  case RECEIVED_CONFIG_INTERFACEDATASET_COLUMN_MODIFIERS_EDIT:
    return state.merge({
      actionTime: currentTime,
      isFetchingDatasetColMod: false,
      lastFetchTimeDatasetColMod: currentTime
    })
    .set('interfaceDatasetColMod', fromJS(action.payload));

  case ON_DATASET_UPDATE_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT:
    const columnModIndex = state
                            .get('interfaceDatasetsColDescUpdated')
                            .toSeq() // performance boost
                            .findIndex(colMod => colMod.get('id') === action.colMod.id);

    let updatedListColMod;
    if (columnModIndex <= -1) {
      updatedListColMod = state
                            .get('interfaceDatasetsColDescUpdated')
                            .push(fromJS(action.colMod));
    } else {
      updatedListColMod = state
                          .get('interfaceDatasetsColDescUpdated')
                          .toSeq() // performance boost
                          .map(
                            colMod => {
                              if (colMod.get('id') === action.colMod.id) {
                                return fromJS(action.colMod);
                              }
                              return colMod;
                            }
                          )
                          .toList();
    }

    return state
    .set('colModChangesNeedCommit', true)
    .set('interfaceDatasetsColModUpdated', updatedListColMod);

  case ON_DATASET_INSERT_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT:
    return state
      .update('interfaceDatasetsColModInserted', colsMod => colsMod.push(fromJS(action.colMod)))
      .set('colModChangesNeedCommit', true);

  case ON_DATASET_RESET_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT:
    return state
    .set('interfaceDatasetsColModInserted', List())
    .set('interfaceDatasetsColModUpdated', List())
    .set('interfaceDatasetsColModDeleted', List())
    .set('colModChangesNeedCommit', false);

  case ON_DATASET_DELETE_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT:
    const immutableColModFilterId = immutableColMod => String(immutableColMod.get('id')) !== String(action.columnId);
    const isAutoGenColModId = rawId => AUTO_GEN_ROWID_REGEX.test(rawId);

    return state
      .update('interfaceDatasetsColModDeleted', ids => isAutoGenColModId(action.colModId) ? ids : ids.push(action.colModId))
      .update('interfaceDatasetsColModInserted', colsMod => colsMod.filter(immutableColModFilterId))
      .update('interfaceDatasetsColModUpdated', colsMod => colsMod.filter(immutableColModFilterId))
      .set('colModChangesNeedCommit', true);

    // interface datasets
  case ON_DATASET_RESET_INTERFACE_DATASETS_EDIT:
    return state
    .set('interfaceDatasetsInserted', List())
    .set('interfaceDatasetsUpdated', List())
    .set('interfaceDatasetsDeleted', List())
    .set('changesNeedCommit', false);

  case REQUEST_CONFIG_INTERFACE_EDIT:
  case ERROR_CONFIG_INTERFACE_EDIT:
    return state.merge({
      actionTime: currentTime,
      isFetching: true
    });

  case RECEIVED_CONFIG_INTERFACE_EDIT:
    return state.mergeDeep({
      actionTime:     currentTime,
      lastFetchTime:  currentTime,
      isFetching:     false
    })
    .set('interface', fromJS(action.payload));

  // interface types list
  case REQUEST_CONFIG_INTERFACE_INTERFACE_TYPES_EDIT:
  case ERROR_CONFIG_INTERFACE_INTERFACE_TYPES_EDIT:
    return state.merge({
      actionTime:                   currentTime,
      isFetchingInterfacesTypes:    true
    });

  case RECEIVED_CONFIG_INTERFACE_INTERFACE_TYPES_EDIT:
    return state.mergeDeep({
      actionTime:                     currentTime,
      lastTimeFetchInterfacesTypes:   currentTime,
      isFetchingInterfacesTypes:      false
    })
    .set('interfacesTypes', fromJS(action.payload));

  // interface directions list
  case REQUEST_CONFIG_INTERFACE_INTERFACE_DIRECTIONS_EDIT:
  case ERROR_CONFIG_INTERFACE_INTERFACE_DIRECTIONS_EDIT:
    return state.merge({
      actionTime:                     currentTime,
      isFetchingInterfacesDirections: true
    });

  case RECEIVED_CONFIG_INTERFACE_INTERFACE_DIRECTIONS_EDIT:
    return state.mergeDeep({
      actionTime:                          currentTime,
      lastTimeFetchInterfacesDirections:   currentTime,
      isFetchingInterfacesDirections:      false
    })
    .set('interfacesDirections', fromJS(action.payload));

  // interface formats list
  case REQUEST_CONFIG_INTERFACE_INTERFACE_FORMATS_EDIT:
  case ERROR_CONFIG_INTERFACE_INTERFACE_FORMATS_EDIT:
    return state.merge({
      actionTime:                  currentTime,
      isFetchingInterfacesFormats: true
    });

  case RECEIVED_CONFIG_INTERFACE_INTERFACE_FORMATS_EDIT:
    return state.merge({
      actionTime:                       currentTime,
      lastTimeFetchInterfacesFormats:   currentTime,
      isFetchingInterfacesFormats:      false
    })
    .set('interfacesFormats', fromJS(action.payload));

  // interface column modififers list
  case REQUEST_CONFIG_INTERFACE_COLUMN_MODIFIER_FUNCT_EDIT:
  case ERROR_CONFIG_INTERFACE_COLUMN_MODIFIER_FUNCT_EDIT:
    return state.merge({
      actionTime:                   currentTime,
      isFetchingColumnModFunctions: true
    });

  case RECEIVED_CONFIG_INTERFACE_COLUMN_MODIFIER_FUNCT_EDIT:
    return state.merge({
      actionTime:                       currentTime,
      lastTimeFetchColumnModFunctions:  currentTime,
      isFetchingColumnModFunctions:     false
    })
    .set('columnModFunctions', fromJS(action.payload));

  // interface datasets
  case REQUEST_CONFIG_INTERFACE_DATASETS_EDIT:
  case ERROR_CONFIG_INTERFACE_DATASETS_EDIT:
    return state.merge({
      actionTime:         currentTime,
      isFetchingDatasets: true
    });

  case RECEIVED_CONFIG_INTERFACE_DATASETS_EDIT:
    return state.merge({
      actionTime:                 currentTime,
      lastFetchTimeDatasets:      currentTime,
      isFetchingDatasets:         false,
      changesNeedCommit:          false // changes are no more committed since refresh from DB
    })
    .set('interfaceDatasets', fromJS(action.payload))
    .set('interfaceDatasetsInserted', List())
    .set('interfaceDatasetsUpdated', List())
    .set('interfaceDatasetsDeleted', List())
    ;

  case REQUEST_ADD_NEW_INTERFACE_DATASET:
  case ERROR_ADD_NEW_INTERFACE_DATASET:
    return state.merge({
      actionTime: currentTime,
      isFetching: true
    });
  case RECEIVED_ADD_NEW_INTERFACE_DATASET:
    return state.update('interfaceDatasets', interfaceDatasets =>
      interfaceDatasets.push(fromJS(action.dataset))
    );

  case ON_DATASET_UPDATE_INTERFACE_DATASETS_EDIT:
    const datasetIndex = state
                            .get('interfaceDatasetsUpdated')
                            .toSeq() // performance boost
                            .findIndex(dataset => dataset.get('id') === action.dataset.id);

    let updatedListDatasets;
    if (datasetIndex <= -1) {
      updatedListDatasets = state
                            .get('interfaceDatasetsUpdated')
                            .push(fromJS(action.dataset));
    } else {
      updatedListDatasets = state
                          .get('interfaceDatasetsUpdated')
                          .toSeq() // performance boost
                          .map(
                            dataset => {
                              if (dataset.get('id') === action.dataset.id) {
                                return fromJS(action.dataset);
                              }
                              return dataset;
                            }
                          )
                          .toList();
    }

    return state
    .set('changesNeedCommit', true)
    .set('interfaceDatasetsUpdated', updatedListDatasets);

  case ON_DATASET_INSERT_INTERFACE_DATASETS_EDIT:
    return state
      .update('interfaceDatasetsInserted', datasets => datasets.push(fromJS(action.dataset)))
      .set('changesNeedCommit', true);

  case ON_DATASET_DELETE_INTERFACE_DATASETS_EDIT:
    // const primitiveFilterId = primitive => String(primitive.get('id')) !== String(action.datasetId);
    const immutableFilterId = immutableDataset => String(immutableDataset.get('id')) !== String(action.datasetId);
    const isAutoGenId = rawId => AUTO_GEN_ROWID_REGEX.test(rawId);

    return state
      .update('interfaceDatasetsDeleted', ids => isAutoGenId(action.datasetId) ? ids : ids.push(action.datasetId))
      .update('interfaceDatasetsInserted', datasets => datasets.filter(immutableFilterId))
      .update('interfaceDatasetsUpdated', datasets => datasets.filter(immutableFilterId))
      .set('changesNeedCommit', true);

  default:
    return state;
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------
function fetchConfigInterfaceEdit(interfaceId) {
  return dispatch => {
    // /////////////////////////////
    // mock fetch
    // /////////////////////////////
    if (appConfig.DEV_MODE) {
      const mockResult = interfaceMockData.filter(interf => Number(interf.id) === Number(interfaceId));
      if (Array.isArray(mockResult) && mockResult.length === 1) {
        return Promise.resolve(
          dispatch({
            type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
            fetch: {
              type: 'FETCH_MOCK',
              actionTypes: {
                request:  REQUEST_CONFIG_INTERFACE_EDIT,
                success:  RECEIVED_CONFIG_INTERFACE_EDIT,
                fail:     ERROR_CONFIG_INTERFACE_EDIT
              },
              mockResult: {...mockResult[0]}
            }
          })
        );
      }
      // SHOW notification
      return Promise.reject(
        dispatch({
          type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
          notification: {
            message: 'Supplied Interfaces Id does not match any existing interfaces...',
            level: 'error'
          }
        })
      );
    }

    // /////////////////////////////
    // real fetch
    // /////////////////////////////
    const url = `${getLocationOrigin()}/${appConfig.interface.data.API}/${interfaceId}`;
    const method  ='get';
    const options = {};

    return dispatch({
      type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
      fetch: {
        type: 'FETCH',
        actionTypes: {
          request:  REQUEST_CONFIG_INTERFACE_EDIT,
          success:  RECEIVED_CONFIG_INTERFACE_EDIT,
          fail:     ERROR_CONFIG_INTERFACE_EDIT
        },
        url,
        method,
        options
      }
    });
  };
}
export function fetchConfigInterfaceEditIfNeeded(interfaceId = 0) {
  return (dispatch, getState) => {
    if (isNaN(interfaceId) || interfaceId <= 0)  {
      const ERROR_MSG = 'Fetching a config interface needs a valid interfaceId';
      dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
      return Promise.reject(ERROR_MSG);
    }
    if (shouldFetchConfigInterfaceEdit(getState())) {
      return dispatch(fetchConfigInterfaceEdit(interfaceId));
    }
    return Promise.resolve();
  };
}
function shouldFetchConfigInterfaceEdit(state) {
  const editInterfaceStore = state.get('editInterface');
  if (editInterfaceStore.get('isFetching')) {
    return false;
  } else {
    return true;
  }
}

function fetchConfigInterfaceInterfaceTypesEdit() {
  return dispatch => {
    // /////////////////////////////
    // mock fetch
    // /////////////////////////////
    if (appConfig.DEV_MODE) {
      return Promise.resolve(
        dispatch({
          type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
          fetch: {
            type: 'FETCH_MOCK',
            actionTypes: {
              request:  REQUEST_CONFIG_INTERFACE_INTERFACE_TYPES_EDIT,
              success:  RECEIVED_CONFIG_INTERFACE_INTERFACE_TYPES_EDIT,
              fail:     ERROR_CONFIG_INTERFACE_INTERFACE_TYPES_EDIT
            },
            mockResult: interfacesTypeMock.types
          }
        })
      );
    }

    // /////////////////////////////
    // real fetch
    // /////////////////////////////
    const url = `${getLocationOrigin()}/${appConfig.interfaceTypes.data.API}`;
    const method = 'get';
    const options = {};
    return dispatch({
      type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
      fetch: {
        type: 'FETCH',
        actionTypes: {
          request:  REQUEST_CONFIG_INTERFACE_INTERFACE_TYPES_EDIT,
          success:  RECEIVED_CONFIG_INTERFACE_INTERFACE_TYPES_EDIT,
          fail:     ERROR_CONFIG_INTERFACE_INTERFACE_TYPES_EDIT
        },
        url,
        method,
        options
      }
    });
  };
}
export function fetchConfigInterfaceInterfaceTypesEditIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchConfigInterfaceInterfaceTypesEdit(getState())) {
      return dispatch(fetchConfigInterfaceInterfaceTypesEdit());
    }
    return Promise.resolve();
  };
}
function shouldFetchConfigInterfaceInterfaceTypesEdit(state) {
  const editInterfaceStore = state.get('editInterface');
  if (editInterfaceStore.get('isFetchingInterfacesTypes')) {
    return false;
  } else {
    return true;
  }
}

function fetchConfigInterfaceInterfaceDirectionsEdit() {
  return dispatch => {
    // /////////////////////////////
    // mock fetch
    // /////////////////////////////
    if (appConfig.DEV_MODE) {
      return Promise.resolve(
        dispatch({
          type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
          fetch: {
            type: 'FETCH_MOCK',
            actionTypes: {
              request:  REQUEST_CONFIG_INTERFACE_INTERFACE_DIRECTIONS_EDIT,
              success:  RECEIVED_CONFIG_INTERFACE_INTERFACE_DIRECTIONS_EDIT,
              fail:     ERROR_CONFIG_INTERFACE_INTERFACE_DIRECTIONS_EDIT
            },
            mockResult: interfacesDirectionsMock.directions
          }
        })
      );
    }

    // /////////////////////////////
    // real fetch
    // /////////////////////////////
    const url = `${getLocationOrigin()}/${appConfig.interfaceDirections.data.API}`;
    const method = 'get';
    const options = {};
    return dispatch({
      type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
      fetch: {
        type: 'FETCH',
        actionTypes: {
          request:  REQUEST_CONFIG_INTERFACE_INTERFACE_DIRECTIONS_EDIT,
          success:  RECEIVED_CONFIG_INTERFACE_INTERFACE_DIRECTIONS_EDIT,
          fail:     ERROR_CONFIG_INTERFACE_INTERFACE_DIRECTIONS_EDIT
        },
        url,
        method,
        options
      }
    });
  };
}
export function fetchConfigInterfaceInterfaceDirectionsEditIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchConfigInterfaceInterfaceDirectionsEdit(getState())) {
      return dispatch(fetchConfigInterfaceInterfaceDirectionsEdit());
    }
    return Promise.resolve();
  };
}
function shouldFetchConfigInterfaceInterfaceDirectionsEdit(state) {
  const editInterfaceStore = state.get('editInterface');
  if (editInterfaceStore.get('isFetchingInterfacesDirections')) {
    return false;
  } else {
    return true;
  }
}

function fetchConfigInterfaceInterfaceFormatsEdit() {
  return dispatch => {
    // /////////////////////////////
    // mock fetch
    // /////////////////////////////
    if (appConfig.DEV_MODE) {
      return Promise.resolve(
        dispatch({
          type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
          fetch: {
            type: 'FETCH_MOCK',
            actionTypes: {
              request:  REQUEST_CONFIG_INTERFACE_INTERFACE_FORMATS_EDIT,
              success:  RECEIVED_CONFIG_INTERFACE_INTERFACE_FORMATS_EDIT,
              fail:     ERROR_CONFIG_INTERFACE_INTERFACE_FORMATS_EDIT
            },
            mockResult: interfacesFormatsMock.formats
          }
        })
      );
    }

    // /////////////////////////////
    // real fetch
    // /////////////////////////////
    const url = `${getLocationOrigin()}/${appConfig.interfaceFormats.data.API}`;
    const method = 'get';
    const options = {};
    return dispatch({
      type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
      fetch: {
        type: 'FETCH',
        actionTypes: {
          request:  REQUEST_CONFIG_INTERFACE_INTERFACE_FORMATS_EDIT,
          success:  RECEIVED_CONFIG_INTERFACE_INTERFACE_FORMATS_EDIT,
          fail:     ERROR_CONFIG_INTERFACE_INTERFACE_FORMATS_EDIT
        },
        url,
        method,
        options
      }
    });
  };
}
export function fetchConfigInterfaceInterfaceFormatsEditIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchConfigInterfaceInterfaceFormatsEdit(getState())) {
      return dispatch(fetchConfigInterfaceInterfaceFormatsEdit());
    }
    return Promise.resolve();
  };
}
function shouldFetchConfigInterfaceInterfaceFormatsEdit(state) {
  const editInterfaceStore = state.get('editInterface');
  if (editInterfaceStore.get('isFetchingInterfacesFormats')) {
    return false;
  } else {
    return true;
  }
}

function fetchConfigInterfaceColumnModFctEdit() {
  return dispatch => {
    // /////////////////////////////
    // mock fetch
    // /////////////////////////////
    if (appConfig.DEV_MODE) {
      return Promise.resolve(
        dispatch({
          type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
          fetch: {
            type: 'FETCH_MOCK',
            actionTypes: {
              request:  REQUEST_CONFIG_INTERFACE_COLUMN_MODIFIER_FUNCT_EDIT,
              success:  RECEIVED_CONFIG_INTERFACE_COLUMN_MODIFIER_FUNCT_EDIT,
              fail:     ERROR_CONFIG_INTERFACE_COLUMN_MODIFIER_FUNCT_EDIT
            },
            mockResult: modifiersFunctionsMock
          }
        })
      );
    }

    // /////////////////////////////
    // real fetch
    // /////////////////////////////
    const url = `${getLocationOrigin()}/${appConfig.columnModFct.data.API}`;
    const method = 'get';
    const options = {};
    return dispatch({
      type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
      fetch: {
        type: 'FETCH',
        actionTypes: {
          request:  REQUEST_CONFIG_INTERFACE_COLUMN_MODIFIER_FUNCT_EDIT,
          success:  RECEIVED_CONFIG_INTERFACE_COLUMN_MODIFIER_FUNCT_EDIT,
          fail:     ERROR_CONFIG_INTERFACE_COLUMN_MODIFIER_FUNCT_EDIT
        },
        url,
        method,
        options
      }
    });
  };
}
export function fetchConfigInterfaceColumnModFctEditIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchConfigInterfaceColumnModFctEditEdit(getState())) {
      return dispatch(fetchConfigInterfaceColumnModFctEdit());
    }
    return Promise.resolve();
  };
}
function shouldFetchConfigInterfaceColumnModFctEditEdit(state) {
  const editInterfaceStore = state.get('editInterface');
  if (editInterfaceStore.get('isFetchingColumnModFunctions')) {
    return false;
  } else {
    return true;
  }
}


function fetchConfigInterfaceDatasetsEdit(interfaceId) {
  return dispatch => {
    // /////////////////////////////
    // mock fetch
    // /////////////////////////////
    if (appConfig.DEV_MODE) {
      const mockResult = interfaceDatasetsMock.filter(dataset => Number(dataset.interfaceId) === Number(interfaceId));
      if (mockResult) {
        return Promise.resolve(
          dispatch({
            type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
            fetch: {
              type: 'FETCH_MOCK',
              actionTypes: {
                request:  REQUEST_CONFIG_INTERFACE_DATASETS_EDIT,
                success:  RECEIVED_CONFIG_INTERFACE_DATASETS_EDIT,
                fail:     ERROR_CONFIG_INTERFACE_DATASETS_EDIT
              },
              mockResult: [...mockResult]
            }
          })
        );
      }
      // SHOW notification
      return Promise.reject(
        dispatch({
          type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
          notification: {
            message: 'Supplied Interfaces Id does not match any existing interfaces...',
            level: 'error'
          }
        })
      );
    }

    // /////////////////////////////
    // real fetch
    // /////////////////////////////
    const url = `${getLocationOrigin()}/${appConfig.interfaceDatasets.data.API}/${interfaceId}`;
    const method  ='get';
    const options = {};

    return dispatch({
      type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
      fetch: {
        type: 'FETCH',
        actionTypes: {
          request:  REQUEST_CONFIG_INTERFACE_DATASETS_EDIT,
          success:  RECEIVED_CONFIG_INTERFACE_DATASETS_EDIT,
          fail:     ERROR_CONFIG_INTERFACE_DATASETS_EDIT
        },
        url,
        method,
        options
      }
    });
  };
}
export function fetchConfigInterfaceDatasetsEditIfNeeded(interfaceId = 0) {
  return (dispatch, getState) => {
    if (isNaN(interfaceId) || parseInt(interfaceId, 10) <= 0)  {
      const ERROR_MSG = 'Fetching config interface Datasets needs a valid interfaceId';
      dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
      return Promise.reject(ERROR_MSG);
    }

    if (shouldFetchConfigInterfaceDatasetsEdit(getState())) {
      return dispatch(fetchConfigInterfaceDatasetsEdit(interfaceId));
    }

    return Promise.resolve();
  };
}
function shouldFetchConfigInterfaceDatasetsEdit(state) {
  const editInterfaceStore = state.get('editInterface');
  if (editInterfaceStore.get('isFetchingDatasets')) {
    return false;
  } else {
    return true;
  }
}
export function onDatasetUpdate(dataset = null) {
  return dispatch => {
    if (!dataset) {
      const ERROR_MSG = 'Error while updating dataset: updates are cancelled';
      return dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
    }
    return dispatch({
      type: ON_DATASET_UPDATE_INTERFACE_DATASETS_EDIT,
      dataset
    });
  };
}
export function onDatasetInsert(dataset = null) {
  return dispatch => {
    if (!dataset) {
      const ERROR_MSG = 'Error while adding a new dataset:  cancelled';
      return dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
    }
    return dispatch({
      type: ON_DATASET_INSERT_INTERFACE_DATASETS_EDIT,
      dataset
    });
  };
}
export function onDatasetDelete(dataset = null, datasetId = null) {
  return dispatch => {
    if (!dataset) {
      const ERROR_MSG = 'Error while deleting dataset (dataset undefined): delete cancelled';
      return dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
    }
    if (!datasetId) {
      const ERROR_MSG = 'Error while deleting dataset (missing id): delete cancelled';
      return dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
    }
    return dispatch({
      type: ON_DATASET_DELETE_INTERFACE_DATASETS_EDIT,
      dataset,
      datasetId
    });
  };
}
export function onDatasetReset() {
  return {
    type: ON_DATASET_RESET_INTERFACE_DATASETS_EDIT
  };
}


function fetchConfigInterfaceDatasetColumnDescriptionEdit(datasetId) {
  return dispatch => {
    // /////////////////////////////
    // mock fetch
    // /////////////////////////////
    if (appConfig.DEV_MODE) {
      const mockResult = interfaceDatasetColDescDescriptionMock.filter(dataset => Number(dataset.datasetId) === Number(datasetId));
      if (mockResult) {
        return Promise.resolve(
          dispatch({
            type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
            fetch: {
              type: 'FETCH_MOCK',
              actionTypes: {
                request:  REQUEST_CONFIG_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT,
                success:  RECEIVED_CONFIG_INTERFACEDATASET_COLUMN_DESCRIPTION_EDIT,
                fail:     ERROR_CONFIG_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT
              },
              mockResult: [...mockResult]
            }
          })
        );
      }
      // SHOW notification
      return Promise.reject(
        dispatch({
          type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
          notification: {
            message: 'Supplied Interfaces Id does not match any existing interfaces...',
            level: 'error'
          }
        })
      );
    }

    // /////////////////////////////
    // real fetch
    // /////////////////////////////
    const url = `${getLocationOrigin()}/${appConfig.interfaceDatasetColumnDescription.data.API}/${datasetId}`;
    const method  ='get';
    const options = {};

    return dispatch({
      type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
      fetch: {
        type: 'FETCH',
        actionTypes: {
          request:  REQUEST_CONFIG_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT,
          success:  RECEIVED_CONFIG_INTERFACEDATASET_COLUMN_DESCRIPTION_EDIT,
          fail:     ERROR_CONFIG_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT
        },
        url,
        method,
        options
      }
    });
  };
}
export function fetchConfigInterfaceDatasetColumnDescriptionEditIfNeeded(datasetId = 0) {
  return (dispatch, getState) => {
    if (isNaN(datasetId) || parseInt(datasetId, 10) <= 0)  {
      const ERROR_MSG = 'Fetching config interface Dataset column description needs a valid datasetId';
      dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
      return Promise.reject(ERROR_MSG);
    }

    if (shouldFetchConfigInterfaceDatasetColumnDescriptionEdit(getState())) {
      return dispatch(fetchConfigInterfaceDatasetColumnDescriptionEdit(datasetId));
    }

    return Promise.resolve();
  };
}
function shouldFetchConfigInterfaceDatasetColumnDescriptionEdit(state) {
  const editInterfaceStore = state.get('editInterface');
  if (editInterfaceStore.get('isFetchingDatasetColDesc')) {
    return false;
  } else {
    return true;
  }
}
export function onDatasetColDescUpdate(colDesc = null) {
  return dispatch => {
    if (!colDesc) {
      const ERROR_MSG = 'Error while updating: updates are cancelled';
      return dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
    }
    return dispatch({
      type: ON_DATASET_UPDATE_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT,
      colDesc
    });
  };
}
export function onDatasetColDescInsert(colDesc = null) {
  return dispatch => {
    if (!colDesc) {
      const ERROR_MSG = 'Error while adding a new column description:  cancelled';
      return dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
    }
    return dispatch({
      type: ON_DATASET_INSERT_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT,
      colDesc
    });
  };
}
export function onDatasetColDescDelete(colDesc = null, colDescId = null) {
  return dispatch => {
    if (!colDesc) {
      const ERROR_MSG = 'Error while deleting column description (column undefined): delete cancelled';
      return dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
    }
    if (!colDescId) {
      const ERROR_MSG = 'Error while deleting column description (missing id): delete cancelled';
      return dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
    }
    return dispatch({
      type: ON_DATASET_DELETE_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT,
      colDesc,
      colDescId
    });
  };
}
export function onDatasetColDescReset() {
  return {
    type: ON_DATASET_RESET_INTERFACE_DATASET_COLUMN_DESCRIPTION_EDIT
  };
}


function fetchConfigInterfaceDatasetColumnModifiersEdit(columnId) {
  return dispatch => {
    // /////////////////////////////
    // mock fetch
    // /////////////////////////////
    if (appConfig.DEV_MODE) {
      const mockResult = interfaceDatasetColDescModifiersMock.filter(columnModifier => Number(columnModifier.columnId) === Number(columnId));
      if (mockResult) {
        return Promise.resolve(
          dispatch({
            type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
            fetch: {
              type: 'FETCH_MOCK',
              actionTypes: {
                request:  REQUEST_CONFIG_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT,
                success:  RECEIVED_CONFIG_INTERFACEDATASET_COLUMN_MODIFIERS_EDIT,
                fail:     ERROR_CONFIG_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT
              },
              mockResult: [...mockResult]
            }
          })
        );
      }
      // SHOW notification
      return Promise.reject(
        dispatch({
          type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
          notification: {
            message: 'Supplied column Id does not match any existing column modifiers...',
            level: 'error'
          }
        })
      );
    }

    // /////////////////////////////
    // real fetch
    // /////////////////////////////
    const url     = `${getLocationOrigin()}/${appConfig.interfaceDatasetColumnModifiers.data.API}/${columnId}`;
    const method  ='get';
    const options = {};

    return dispatch({
      type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
      fetch: {
        type: 'FETCH',
        actionTypes: {
          request:  REQUEST_CONFIG_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT,
          success:  RECEIVED_CONFIG_INTERFACEDATASET_COLUMN_MODIFIERS_EDIT,
          fail:     ERROR_CONFIG_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT
        },
        url,
        method,
        options
      }
    });
  };
}
export function fetchConfigInterfaceDatasetColumnModifiersEditIfNeeded(columnId = 0) {
  return (dispatch, getState) => {
    if (isNaN(columnId) || parseInt(columnId, 10) <= 0)  {
      const ERROR_MSG = 'Fetching config interface column modifiers needs a valid columnId';
      dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
      return Promise.reject(ERROR_MSG);
    }
    if (shouldFetchConfigInterfaceDatasetColumnModifiersEdit(getState())) {
      return dispatch(fetchConfigInterfaceDatasetColumnModifiersEdit(columnId));
    }
    return Promise.resolve();
  };
}
function shouldFetchConfigInterfaceDatasetColumnModifiersEdit(state) {
  const editInterfaceStore = state.get('editInterface');
  if (editInterfaceStore.get('isFetchingDatasetColMod')) {
    return false;
  } else {
    return true;
  }
}
export function onDatasetColModUpdate(colMod = null) {
  return dispatch => {
    if (!colMod) {
      const ERROR_MSG = 'Error while updating: updates are cancelled';
      return dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
    }
    return dispatch({
      type: ON_DATASET_UPDATE_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT,
      colMod
    });
  };
}
export function onDatasetColModInsert(colMod = null) {
  return dispatch => {
    if (!colMod) {
      const ERROR_MSG = 'Error while adding a new column modifier:  cancelled';
      return dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
    }
    return dispatch({
      type: ON_DATASET_INSERT_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT,
      colMod
    });
  };
}
export function onDatasetColModDelete(colMod = null, colModId = null) {
  return dispatch => {
    if (!colMod) {
      const ERROR_MSG = 'Error while deleting column modifier (column undefined): delete cancelled';
      return dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
    }
    if (!colModId) {
      const ERROR_MSG = 'Error while deleting column modifier (missing id): delete cancelled';
      return dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
    }
    return dispatch({
      type: ON_DATASET_DELETE_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT,
      colMod,
      colModId
    });
  };
}
export function onDatasetColModReset() {
  return {
    type: ON_DATASET_RESET_INTERFACE_DATASET_COLUMN_MODIFIERS_EDIT
  };
}

// function fetchConfigInterfaceDatatsetAddNewDataset(interfaceId) {
//   return dispatch => {
//     // /////////////////////////////
//     // mock fetch
//     // /////////////////////////////
//     if (appConfig.DEV_MODE) {
//       const mockResult = interfaceDatasetsMock.filter(dataset => Number(dataset.interfaceId) === Number(interfaceId));
//       if (mockResult) {
//         return Promise.resolve(
//           dispatch({
//             type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
//             fetch: {
//               type: 'FETCH_MOCK',
//               actionTypes: {
//                 request:  REQUEST_CONFIG_INTERFACE_DATASETS_EDIT,
//                 success:  RECEIVED_CONFIG_INTERFACE_DATASETS_EDIT,
//                 fail:     ERROR_CONFIG_INTERFACE_DATASETS_EDIT
//               },
//               mockResult: [...mockResult]
//             }
//           })
//         );
//       }
//       // SHOW notification
//       return Promise.reject(
//         dispatch({
//           type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
//           notification: {
//             message: 'Supplied Interfaces Id does not match any existing interfaces...',
//             level: 'error'
//           }
//         })
//       );
//     }
//
//     // /////////////////////////////
//     // real fetch
//     // /////////////////////////////
//     const url = `${getLocationOrigin()}/${appConfig.interfaceDatasets.data.API}/${interfaceId}`;
//     const method  ='get';
//     const options = {};
//
//     return dispatch({
//       type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
//       fetch: {
//         type: 'FETCH',
//         actionTypes: {
//           request:  REQUEST_CONFIG_INTERFACE_DATASETS_EDIT,
//           success:  RECEIVED_CONFIG_INTERFACE_DATASETS_EDIT,
//           fail:     ERROR_CONFIG_INTERFACE_DATASETS_EDIT
//         },
//         url,
//         method,
//         options
//       }
//     });
//   };
// }
// export function fetchConfigInterfaceDatatsetAddNewDataset(interfaceId = 0, dataset: null) {
//   return (dispatch, getState) => {
//     if (isNaN(interfaceId) || parseInt(interfaceId, 10) <= 0)  {
//       const ERROR_MSG = 'Fetching config interface Datasets needs a valid interfaceId';
//       dispatch({
//         type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
//         notification: {
//           message: ERROR_MSG,
//           level: 'error'
//         }
//       });
//       return Promise.reject(ERROR_MSG);
//     }
//
//     if (!dataset)  {
//       const ERROR_MSG = 'Can\'t save new Dataset: dataset is undefined';
//       dispatch({
//         type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
//         notification: {
//           message: ERROR_MSG,
//           level: 'error'
//         }
//       });
//       return Promise.reject(ERROR_MSG);
//     }
//     return dispatch(fetchConfigInterfaceDatasetsEdit(interfaceId));
//   };
// }
//

// export function addNewInterfaceDataSet(tableName = 'not defined', tablePrescedence = 1) {
//   return {
//     type: ADD_NEW_INTERFACE_DATASET,
//     dataset: {
//       tableName,
//       tablePrescedence
//     }
//   };
// }
