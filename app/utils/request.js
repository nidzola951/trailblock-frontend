import 'whatwg-fetch';
import config from '../config/config';
import { localStorageGet } from './helpers';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  console.log(response);
  console.log(response.json);
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 403) {
    window.location.replace(`${config.host}/login`);
  }
  return response;
} // --> OFF

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */

/* eslint no-param-reassign: 0 */
export default function request(url, options) {
  const accessToken = localStorageGet('access_token');
  if (options.headers === undefined) {
    if (config.gatewayAuthId === null) {
      options.headers = {
        'Auth-Token': accessToken
      };
    } else {
      options.headers = {
        'Gateway-Auth-Id': config.gatewayAuthId
      };
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (config.gatewayAuthId === null) {
      options.headers['Auth-Token'] = accessToken;
    } else {
      options.headers['Gateway-Auth-Id'] = config.gatewayAuthId;
    }
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
