import moment from 'moment';
import { fromJS } from 'immutable';

// --------------------------------
// CONSTANTS
// --------------------------------
const ENTER_HOME_VIEW  = 'ENTER_HOME_VIEW';
const LEAVE_HOME_VIEW  = 'LEAVE_HOME_VIEW';
const ENTER_INTERFACE_VIEW  = 'ENTER_INTERFACE_VIEW';
const LEAVE_INTERFACE_VIEW  = 'LEAVE_INTERFACE_VIEW';
const ENTER_LIST_INTERFACES_VIEW  = 'ENTER_LIST_INTERFACES_VIEW';
const LEAVE_LIST_INTERFACES_VIEW  = 'LEAVE_LIST_INTERFACES_VIEW';
const ENTER_EDIT_INTERFACE_VIEW  = 'ENTER_EDIT_INTERFACE_VIEW';
const LEAVE_EDIT_INTERFACE_VIEW  = 'LEAVE_EDIT_INTERFACE_VIEW';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = fromJS({
  currentView:  'not set',
  viewDetails:  '',
  enterTime:    null,
  leaveTime:    null
});

export default function (state = initialState, action) {
  const currentTime = moment().format();

  switch (action.type) {

  case ENTER_HOME_VIEW:
  case ENTER_INTERFACE_VIEW:
  case ENTER_LIST_INTERFACES_VIEW:
  case ENTER_EDIT_INTERFACE_VIEW:
    if (state.get('currentView') !== action.currentView) {
      return state.merge({
        currentView:  action.currentView,
        viewDetails:  action.viewDetails,
        enterTime:    currentTime,
        leaveTime:    null
      });
    }
    return state;

  case LEAVE_HOME_VIEW:
  case LEAVE_INTERFACE_VIEW:
  case LEAVE_LIST_INTERFACES_VIEW:
  case LEAVE_EDIT_INTERFACE_VIEW:
    if (state.get('currentView') === action.currentView) {
      return state.merge({
        currentView:  action.currentView,
        viewDetails:  action.viewDetails,
        leaveTime:    currentTime
      });
    }
    return state;

  default:
    return state;
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------
export function enterHome() {
  return {
    type:         ENTER_HOME_VIEW,
    currentView:  'HOME',
    viewDetails:  ''
  };
}

export function leaveHome() {
  return {
    type:         LEAVE_HOME_VIEW,
    currentView:  'HOME',
    viewDetails:  ''
  };
}

export function enterInterfaces() {
  return {
    type:         ENTER_INTERFACE_VIEW,
    currentView:  'INTERFACES',
    viewDetails:  ''
  };
}

export function leaveInterfaces() {
  return {
    type:         LEAVE_INTERFACE_VIEW,
    currentView:  'INTERFACES',
    viewDetails:  ''
  };
}

export function enterListInterfaces() {
  return {
    type:         ENTER_LIST_INTERFACES_VIEW,
    currentView:  'LIST_INTERFACES',
    viewDetails:  ''
  };
}

export function leaveListInterfaces() {
  return {
    type:         LEAVE_LIST_INTERFACES_VIEW,
    currentView:  'LIST_INTERFACES',
    viewDetails:  ''
  };
}

export function enterEditInterface() {
  return {
    type:         ENTER_EDIT_INTERFACE_VIEW,
    currentView:  'EDIT_INTERFACE',
    viewDetails:  ''
  };
}

export function leaveEditInterface() {
  return {
    type:         LEAVE_EDIT_INTERFACE_VIEW,
    currentView:  'EDIT_INTERFACE',
    viewDetails:  ''
  };
}
