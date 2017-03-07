'use strict';

const DEFAULT_CHAR_LIMIT = 25; // default string truncation limit

export const limitStringToNChars = (str, nbCharsLimit = DEFAULT_CHAR_LIMIT) => {
  if (typeof str === 'string' && str.trim().length > 0) {
    if (str.length > nbCharsLimit) {
      const maxIndexMinusThreeDots = nbCharsLimit - 3; // when string is truncated we'll add 3 dots but result string won't be greater than nbCharsLimit

      return str
              .slice(0, maxIndexMinusThreeDots)
              .concat('...');
    } else {
      // no cut:
      return str;
    }
  } else {
    return str;
  }
};
