import moment         from 'moment';
import {
  getSideMenuState,
  setSideMenuState
}                     from '../../services';
import {fromJS}       from 'immutable';

// --------------------------------
// CONSTANTS
// --------------------------------
export const OPEN_SIDE_MENU   = 'OPEN_SIDE_MENU';
export const CLOSE_SIDE_MENU  = 'CLOSE_SIDE_MENU';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = fromJS({
  isCollapsed: false,
  time: null
});

export default function sideMenu(state = initialState, action) {
  const currentTime = moment().format();

  switch (action.type) {

  case OPEN_SIDE_MENU:
    return state.merge({
      isCollapsed:  action.isCollapsed,
      time:         currentTime
    });

  case CLOSE_SIDE_MENU:
    return state.merge({
      isCollapsed:  action.isCollapsed,
      time:         currentTime
    });

  default:
    return state;
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------

export function openSideMenu() {
  setSideMenuStateToLocalStorage(true);
  return {
    type:         OPEN_SIDE_MENU,
    isCollapsed:  false
  };
}

export function closeSideMenu()  {
  setSideMenuStateToLocalStorage(false);
  return {
    type:         CLOSE_SIDE_MENU,
    isCollapsed:  true
  };
}

export function toggleSideMenu() {
  return (dispatch, getState) => {
    const sideMenuStore  = getState().get('sidemenu');
    const isCollapsed = sideMenuStore.get('isCollapsed');

    setSideMenuStateToLocalStorage(!isCollapsed);

    if (isCollapsed) {
      return dispatch(openSideMenu());
    }
    return dispatch(closeSideMenu());
  };
}

// initilize sideMenu form localStorage (should be called only once on init)
export function initSideMenu() {
  return dispatch => {
    // sideMenu state from localStorage: set opened or closed menu
    if (getSideMenuState()) {
      return dispatch(openSideMenu());
    }
    return dispatch(closeSideMenu());
  };
}

function setSideMenuStateToLocalStorage(state) {
  setSideMenuState(state);
}
