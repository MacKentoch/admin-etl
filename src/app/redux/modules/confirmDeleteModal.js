import moment from 'moment';
import {fromJS} from 'immutable';

// --------------------------------
// CONSTANTS
// --------------------------------
const OPEN_CONFIRM_DELETE_MODAL   = 'OPEN_CONFIRM_DELETE_MODAL';
const CANCEL_CONFIRM_DELETE_MODAL  = 'CANCEL_CONFIRM_DELETE_MODAL';
const CONFIRM_CONFIRM_DELETE_MODAL  = 'CONFIRM_CONFIRM_DELETE_MODAL';

// --------------------------------
// REDUCER
// --------------------------------
/* eslint-disable no-console */
const defaultConfirmCallBack = () => {
  console.log('delete confirmed');
};
/* eslint-enable no-console */

let confirmCallback = defaultConfirmCallBack;

const initialState = fromJS({
  opened:           false,
  // last action time (any action):
  actionTime:       ''
});

export default function (state = initialState, action) {
  const currentTime = moment().format();

  switch (action.type) {
  case OPEN_CONFIRM_DELETE_MODAL:
    return state.merge({
      actionTime:       currentTime,
      opened:           true
    });

  case CANCEL_CONFIRM_DELETE_MODAL:
    return state.merge({
      actionTime:   currentTime,
      opened:       false
    });

  case CONFIRM_CONFIRM_DELETE_MODAL:
    return state.merge({
      actionTime:   currentTime,
      opened:       false
    });

  default:
    return state;
  }
}

// --------------------------------
// ACTIONS CERATORS
// --------------------------------
export function openModal(callback = defaultConfirmCallBack) {
  confirmCallback = callback;
  return {
    type: OPEN_CONFIRM_DELETE_MODAL
  };
}

export function cancel() {
  // reset callback:
  confirmCallback = defaultConfirmCallBack;
  return {
    type: CANCEL_CONFIRM_DELETE_MODAL
  };
}

export function confirm() {
  confirmCallback();
  return {
    type: CONFIRM_CONFIRM_DELETE_MODAL
  };
}
