import { Base64 } from 'js-base64';

/*
* utils pour "whatwg-fetch" = option par default a extend au besoin
*/
export const defaultOptions = {
  credentials: 'same-origin'
};
/*
* utils pour "whatwg-fetch" => method post
*/
export const postMethod = {
  method: 'POST'
};
/*
* utils post a json body
*/
export const jsonHeader = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};
/*
* utils pour "whatwg-fetch" = gestion personnalisée des statuts en erreur
*/
export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(status.statusText);
    error.response = response;
    throw error;
  }
};
/*
* utils pour "whatwg-fetch" : sugar pour parse.JSON de la reponse
*/
export const parseJSON = (response) => {
  return response.json();
};
/*
* utils definir l'url des requetes quelque soit l'environnment, le serveur
*/
export const getLocationOrigin = () => {
  if (!window.location.origin) {
    window.location.origin = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`;
  }
  return window.location.origin;
};
/*
* utils pour encode url param: evite les aléas des chars speciaux
*/
export const encodeBase64 = (stringToEncode) => {
  return Base64.encode(stringToEncode);
};
