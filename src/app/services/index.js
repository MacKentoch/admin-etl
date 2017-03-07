// utils:
import {
  defaultOptions,
  postMethod,
  checkStatus,
  parseJSON,
  getLocationOrigin,
  encodeBase64
}                     from './utils/fetchTools';
// API
import {
  getUserInfo
}                     from './API';

// date tools
import {
  getLastThreeMonthNames,
  isValidDateOrReturnDefault
}                     from './utils/dateTools';
// localStorage
import {
  getSideMenuState,
  setSideMenuState
}                     from './localStorage/ui/uiConfig';
// asp.net date converted better formatted for JS
import {
  cleanAspDotNetStringDate
}                     from './utils/aspNetDateCleaner';
import {
  limitStringToNChars
}                     from './utils/stringManipulation';

export {
  // utils:
  defaultOptions,
  postMethod,
  checkStatus,
  parseJSON,
  getLocationOrigin,
  encodeBase64,
  limitStringToNChars,

  // API
  getUserInfo,

  // date tools
  getLastThreeMonthNames,
  isValidDateOrReturnDefault,

  // asp.net date converted better formatted for JS
  cleanAspDotNetStringDate,

  // localStorage
  getSideMenuState,
  setSideMenuState
};
