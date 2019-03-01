/**
 * Created by Sophie, edited by Bruce
 */
import { pathOr, indexOf } from 'ramda';
import highAvailabilityAPI from './highAvailabilityAPI';
import availability from './availabilityStatus';

export const HA_ERROR_CODE = 'CMN-211';
export const HA_ERROR_STATUS = 503;
export const PRESENCE_REG_EXP = /\/restapi\/v1.0\/account\/~\/extension\/\d*\/presence/gi;

export function extractUrl({ url }) {
  const filteredUrl = (url.match(/\/restapi(.*)/gi) && (url.match(/\/restapi(.*)/gi)[0])) || '';
  const splitUrl = filteredUrl.split('?')[0] || '';
  return splitUrl;
}

// Check if this damn error is HA error.
export function isHAError(error) {
  const status = pathOr(-1, ['apiResponse', '_response', 'status'], error);
  const errorCode = pathOr('N/A', ['apiResponse', '_json', 'errorCode'], error);
  const isHAErrorIn = indexOf(HA_ERROR_CODE, pathOr([], ['apiResponse', '_json', 'errors'], error)) > -1;

  return (
    status === HA_ERROR_STATUS
    && (errorCode === HA_ERROR_CODE || isHAErrorIn)
  );
}

/**
 * Generate 0 ~ 3000 seconds
 *
 * @export
 * @returns 0 ~ 3000 seconds
 */
export function generateRandomNumber() {
  return Math.floor(Math.random() * 3000);
}

/**
 * Check if an api is *High* or *Limited*
 *
 * @export
 * @param {*} { url, method }
 * @returns boolean
 */
export function isHAEnabledAPI({ url, method }) {
  const filteredUrl = extractUrl({ url });
  const condition = pathOr('N/A', [filteredUrl, method], highAvailabilityAPI);

  if (PRESENCE_REG_EXP.test(filteredUrl) || condition === availability.HIGH) {
    return true;
  } else if (condition === availability.LIMITED) {
    return false;
  }

  console.error(
    `url: ${url} method: ${method} is not set in high or limited available API`
  );

  return false;
}
