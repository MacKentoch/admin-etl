import moment from 'moment';
import axios from 'axios';
import { fromJS } from 'immutable';
import { appConfig } from '../../config';
import userInfosMockData from '../../mocks/userInfosMock.json';
import getLocationOrigin from '../../services/utils/getLocationOrigin';

// --------------------------------
// CONSTANTS
// --------------------------------
export const REQUEST_USER_INFOS_DATA   = 'REQUEST_USER_INFOS_DATA';
export const RECEIVED_USER_INFOS_DATA  = 'RECEIVED_USER_INFOS_DATA';
export const ERROR_USER_INFOS_DATA     = 'ERROR_USER_INFOS_DATA';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = fromJS({
  isFetching: false,
  userInfos: {
    login: null,
    firstname: '',
    lastname: '',
    picture: null
  },
  isConnected: false,
  time: null
});

export default function (state = initialState, action) {
  const currentTime = moment().format();

  switch (action.type) {

  case REQUEST_USER_INFOS_DATA:
  case ERROR_USER_INFOS_DATA:
    return state.merge({
      actionTime:   currentTime,
      isFetching:   action.isFetching,
      isConnected:  action.isConnected
    });

  case RECEIVED_USER_INFOS_DATA:
    return state.mergeDeep({
      actionTime:   currentTime,
      isFetching:   action.isFetching,
      isConnected:  action.isConnected,
      userInfos:    action.userInfos
    });

  default:
    return state;
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------
function requestUserInfosData() {
  return {
    type:         REQUEST_USER_INFOS_DATA,
    isFetching:   true,
    userInfos:    null,
    isConnected:  false
  };
}
function receivedUserInfosData(userInfos) {
  return {
    type:         RECEIVED_USER_INFOS_DATA,
    isFetching:   false,
    userInfos,
    isConnected:  true
  };
}
function errorUserInfosData() {
  return {
    type:         ERROR_USER_INFOS_DATA,
    isFetching:   false,
    userInfos:    null,
    isConnected:  false
  };
}

function fetchUserInfosData() {
  return dispatch => {
    dispatch(requestUserInfosData());

    if (appConfig.DEV_MODE) {
      return Promise.resolve(dispatch(receivedUserInfosData(Map({...userInfosMockData}))));
    }

    const url = `${getLocationOrigin()}/${appConfig.userInfos.data.API}`;
    const options = {credentials: 'same-origin'};
    return axios
          .get(url, options)
          .then(data => dispatch(receivedUserInfosData(data)))
          .catch(err => dispatch(errorUserInfosData(err)));
  };
}

export function fetchUserInfoDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchUserInfoData(getState())) {
      return dispatch(fetchUserInfosData());
    }
    return Promise.resolve();
  };
}

function shouldFetchUserInfoData(state) {
  const userInfos = state.get('user');
  if (userInfos.get('isFetching')) {
    return false;
  }
  // if (!userInfos.getIn('userInfos', 'login')) {
  //   return true;
  // }
  return false;
}
