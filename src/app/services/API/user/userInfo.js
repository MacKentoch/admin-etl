import {
  defaultOptions,
  checkStatus,
  parseJSON,
  getLocationOrigin
}                     from '../../utils/fetchTools';
import { appConfig }  from '../../../config';

export const getUserInfo = () => {
  const api = appConfig.userInfos.data.API;
  const url = `${getLocationOrigin()}/${api}`;
  const options = {...defaultOptions};

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => Promise.reject(error));
};
