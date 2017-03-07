import { Base64 } from 'js-base64';

/**
 * encode string into base 64 (useful for strings containing special chars like & ot ?)
 * @param  {[string]} stringToEncode input raw string to encode in base 64
 * @return {[string]}                string encoded
 */
export const encodeBase64 = (stringToEncode) => {
  return Base64.encode(stringToEncode);
};

export default encodeBase64;
