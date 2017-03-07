import moment from 'moment';
import { Map, List, fromJS } from 'immutable';
import { appConfig } from '../../config';
import interfaceMockData from '../../mocks/interfaceConfigMock.json';
import interfacesTypeMock from '../../mocks/distinctTypeInterfaces.json';
import interfacesDirectionsMock from '../../mocks/distinctDirectionsInterfaces.json';
import interfacesFormatsMock from '../../mocks/distinctFormatsInterfaces.json';
import getLocationOrigin from '../../services/utils/getLocationOrigin';

// --------------------------------
// CONSTANTS
// --------------------------------
const REQUEST_ALL_CONFIG_INTERFACE  = 'REQUEST_ALL_CONFIG_INTERFACE';
const RECEIVED_ALL_CONFIG_INTERFACE = 'RECEIVED_ALL_CONFIG_INTERFACE';
const ERROR_ALL_CONFIG_INTERFACE    = 'ERROR_ALL_CONFIG_INTERFACE';

const REQUEST_CONFIG_INTERFACE_TYPES  = 'REQUEST_CONFIG_INTERFACE_TYPES';
const RECEIVED_CONFIG_INTERFACE_TYPES = 'RECEIVED_CONFIG_INTERFACE_TYPES';
const ERROR_CONFIG_INTERFACE_TYPES    = 'ERROR_CONFIG_INTERFACE_TYPES';

const REQUEST_CONFIG_INTERFACE_DIRECTIONS  = 'REQUEST_CONFIG_INTERFACE_DIRECTIONS';
const RECEIVED_CONFIG_INTERFACE_DIRECTIONS = 'RECEIVED_CONFIG_INTERFACE_DIRECTIONS';
const ERROR_CONFIG_INTERFACE_DIRECTIONS    = 'ERROR_CONFIG_INTERFACE_DIRECTIONS';

const REQUEST_CONFIG_INTERFACE_FORMATS  = 'REQUEST_CONFIG_INTERFACE_FORMATS';
const RECEIVED_CONFIG_INTERFACE_FORMATS = 'RECEIVED_CONFIG_INTERFACE_FORMATS';
const ERROR_CONFIG_INTERFACE_FORMATS    = 'ERROR_CONFIG_INTERFACE_FORMATS';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = Map({
  isFetching:     false,
  listInterfaces: List(),
  actionTime:     null,

  // distinct value for interfaces types ('ELEGIBILITY', 'UHI', etc...):
  isFetchingInterfacesTypes:    false,
  lastTimeFetchInterfacesTypes:  '',
  interfacesTypes:               List(),
  // distinct value for interfaces types ('IN', 'OUT', etc...):
  isFetchingInterfacesDirections:    false,
  lastTimeFetchInterfacesDirections:  '',
  interfacesDirections:               List(),
  // distinct value for interfaces Format ('TABLE', 'CSV', etc...):
  isFetchingInterfacesFormats:    false,
  lastTimeFetchInterfacesFormats:  '',
  interfacesFormats:               List()
});

export default function (state = initialState, action) {
  const currentTime = moment().format();

  switch (action.type) {

  case REQUEST_ALL_CONFIG_INTERFACE:
  case ERROR_ALL_CONFIG_INTERFACE:
    return state.merge({
      actionTime: currentTime,
      isFetching: action.isFetching
    });

  case RECEIVED_ALL_CONFIG_INTERFACE:
    return state
            .merge({
              actionTime:   currentTime,
              isFetching:   action.isFetching
            })
            .set('listInterfaces', fromJS(action.payload));

  case REQUEST_CONFIG_INTERFACE_TYPES:
  case ERROR_CONFIG_INTERFACE_TYPES:
    return state.merge({
      actionTime:                   currentTime,
      isFetchingInterfacesTypes:    true
    });

  case RECEIVED_CONFIG_INTERFACE_TYPES:
    return state
            .merge({
              actionTime:                     currentTime,
              lastTimeFetchInterfacesTypes:   currentTime,
              isFetchingInterfacesTypes:      false
            })
            .set('interfacesTypes', fromJS(action.payload));

  case REQUEST_CONFIG_INTERFACE_DIRECTIONS:
  case ERROR_CONFIG_INTERFACE_DIRECTIONS:
    return state.merge({
      actionTime:                     currentTime,
      isFetchingInterfacesDirections: true
    });

  case RECEIVED_CONFIG_INTERFACE_DIRECTIONS:
    return state
            .merge({
              actionTime:                          currentTime,
              lastTimeFetchInterfacesDirections:   currentTime,
              isFetchingInterfacesDirections:      false
            })
            .set('interfacesDirections', fromJS(action.payload));

  case REQUEST_CONFIG_INTERFACE_FORMATS:
  case ERROR_CONFIG_INTERFACE_FORMATS:
    return state.merge({
      actionTime:                     currentTime,
      isFetchingInterfacesFormats: true
    });

  case RECEIVED_CONFIG_INTERFACE_FORMATS:
    return state
            .merge({
              actionTime:                       currentTime,
              lastTimeFetchInterfacesFormats:   currentTime,
              isFetchingInterfacesFormats:      false
            })
            .set('interfacesFormats', fromJS(action.payload));

  default:
    return state;
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------
function fetchConfigInterfaces() {
  return dispatch => {
    // /////////////////////////////
    // mock fetch
    // /////////////////////////////
    if (appConfig.DEV_MODE) {
      // return Promise.resolve(dispatch(receivedConfigInterfaces([...interfaceMockData])));
      return Promise.resolve(
        dispatch({
          type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
          fetch: {
            type: 'FETCH_MOCK',
            actionTypes: {
              request:  REQUEST_ALL_CONFIG_INTERFACE,
              success:  RECEIVED_ALL_CONFIG_INTERFACE,
              fail:     ERROR_ALL_CONFIG_INTERFACE
            },
            mockResult: [...interfaceMockData]
          }
        })
      );
    }
    // /////////////////////////////
    // real fetch
    // /////////////////////////////
    const url = `${getLocationOrigin()}/${appConfig.interfaces.data.API}`;
    const method  ='get';
    const options = {};

    return dispatch({
      type: 'FETCH_MIDDLEWARE', // just for convieniance for debug
      fetch: {
        type: 'FETCH',
        actionTypes: {
          request:  REQUEST_ALL_CONFIG_INTERFACE,
          success:  RECEIVED_ALL_CONFIG_INTERFACE,
          fail:     ERROR_ALL_CONFIG_INTERFACE
        },
        url,
        method,
        options
      }
    });
  };
}
export function fetchConfigInterfacesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchConfigInterfaces(getState())) {
      return dispatch(fetchConfigInterfaces());
    }
    return Promise.resolve();
  };
}
function shouldFetchConfigInterfaces(state) {
  const interfaces = state.get('interfaces');
  if (interfaces.get('isFetching')) {
    return false;
  } else {
    return true;
  }
}

function fetchConfigInterfaceTypes() {
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
              request:  REQUEST_CONFIG_INTERFACE_TYPES,
              success:  RECEIVED_CONFIG_INTERFACE_TYPES,
              fail:     ERROR_CONFIG_INTERFACE_TYPES
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
          request:  REQUEST_CONFIG_INTERFACE_TYPES,
          success:  RECEIVED_CONFIG_INTERFACE_TYPES,
          fail:     ERROR_CONFIG_INTERFACE_TYPES
        },
        url,
        method,
        options
      }
    });
  };
}
export function fetchConfigInterfaceTypesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchConfigInterfaceTypes(getState())) {
      return dispatch(fetchConfigInterfaceTypes());
    }
    return Promise.resolve();
  };
}
function shouldFetchConfigInterfaceTypes(state) {
  const interfacesStore = state.get('interfaces');
  if (interfacesStore.get('isFetchingInterfacesTypes')) {
    return false;
  } else {
    return true;
  }
}

function fetchConfigInterfaceDirections() {
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
              request:  REQUEST_CONFIG_INTERFACE_DIRECTIONS,
              success:  RECEIVED_CONFIG_INTERFACE_DIRECTIONS,
              fail:     ERROR_CONFIG_INTERFACE_DIRECTIONS
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
          request:  REQUEST_CONFIG_INTERFACE_DIRECTIONS,
          success:  RECEIVED_CONFIG_INTERFACE_DIRECTIONS,
          fail:     ERROR_CONFIG_INTERFACE_DIRECTIONS
        },
        url,
        method,
        options
      }
    });
  };
}
export function fetchConfigInterfaceDirectionsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchConfigInterfaceDirections(getState())) {
      return dispatch(fetchConfigInterfaceDirections());
    }
    return Promise.resolve();
  };
}
function shouldFetchConfigInterfaceDirections(state) {
  const interfacesStore = state.get('interfaces');
  if (interfacesStore.get('isFetchingInterfacesDirections')) {
    return false;
  } else {
    return true;
  }
}

function fetchConfigInterfaceFormats() {
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
              request:  REQUEST_CONFIG_INTERFACE_FORMATS,
              success:  RECEIVED_CONFIG_INTERFACE_FORMATS,
              fail:     ERROR_CONFIG_INTERFACE_FORMATS
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
          request:  REQUEST_CONFIG_INTERFACE_FORMATS,
          success:  RECEIVED_CONFIG_INTERFACE_FORMATS,
          fail:     ERROR_CONFIG_INTERFACE_FORMATS
        },
        url,
        method,
        options
      }
    });
  };
}
export function fetchConfigInterfaceFormatsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchConfigInterfaceFormats(getState())) {
      return dispatch(fetchConfigInterfaceFormats());
    }
    return Promise.resolve();
  };
}
function shouldFetchConfigInterfaceFormats(state) {
  const interfacesStore = state.get('interfaces');
  if (interfacesStore.get('isFetchingInterfacesFormats')) {
    return false;
  } else {
    return true;
  }
}
