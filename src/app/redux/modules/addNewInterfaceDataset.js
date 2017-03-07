import moment from 'moment';
import {fromJS} from 'immutable';

// --------------------------------
// CONSTANTS
// --------------------------------
const OPEN_ADD_NEW_INTERACE_DATASET_MODAL = 'OPEN_ADD_NEW_INTERACE_DATASET_MODAL';
const CLOSE_ADD_NEW_INTERACE_DATASET_MODAL = 'CLOSE_ADD_NEW_INTERACE_DATASET_MODAL';

// --------------------------------
// REDUCER
// --------------------------------

const initialState = fromJS({
  opened:        false,
  // last action time (any action):
  actionTime:    '',
  interfaceName: '',
  interfaceId:    0
});

export default function (state = initialState, action) {
  const currentTime = moment().format();

  switch (action.type) {
  case OPEN_ADD_NEW_INTERACE_DATASET_MODAL:
    return state.merge({
      actionTime:       currentTime,
      opened:         true,
      interfaceName:  action.interfaceName,
      interfaceId:    action.interfaceId
    });

  case CLOSE_ADD_NEW_INTERACE_DATASET_MODAL:
    return state.merge({
      actionTime:     currentTime,
      opened:         false,
      interfaceName:  initialState.get('interfaceName'),
      interfaceId:    initialState.get('interfaceId')
    });

  default:
    return state;
  }
}

// --------------------------------
// ACTIONS CERATORS
// --------------------------------
export function openModal(interfaceId = 0, interfaceName = '') {
  return dispatch => {
    if (interfaceId <= 0) {
      const ERROR_MSG = 'Could not add new dataset: interface Id not set';
      return  dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
    }

    if (interfaceName.length === 0) {
      const ERROR_MSG = 'Could not add new dataset: dataset name not set';
      return  dispatch({
        type: 'FORCE_MIDDLEWARE_ADD_NOTIFICATION_MESSAGE',
        notification: {
          message: ERROR_MSG,
          level: 'error'
        }
      });
    }

    return dispatch({
      type: OPEN_ADD_NEW_INTERACE_DATASET_MODAL,
      interfaceId,
      interfaceName
    });
  };
}

export function closeModal() {
  return {
    type: CLOSE_ADD_NEW_INTERACE_DATASET_MODAL
  };
}
