import moment         from 'moment';
import { fromJS }     from 'immutable';
// --------------------------------
// CONSTANTS
// --------------------------------
const ADD_NOTIFICATION_MESSAGE = 'ADD_NOTIFICATION_MESSAGE';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = fromJS({
  actionTime: '',   // time change is the way to trigger a new notification (Component side)
  message:  '',     // if message empty: it should not show notification
  level:    'info'  // one of 'sucess', 'error', 'info'
});

export default function (state = initialState, action) {
  const currentTime = moment().format();

  switch (action.type) {
  case ADD_NOTIFICATION_MESSAGE:
    return state.merge({
      actionTime: currentTime,
      message:    action.notification.message ? action.notification.message : initialState.message,
      level:      action.notification.level ? action.notification.level : initialState.level
    });
  default:
    return state;
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------

export function addNotificationMessage(notification = {...initialState}) {
  return {
    type: ADD_NOTIFICATION_MESSAGE,
    notification
  };
}
