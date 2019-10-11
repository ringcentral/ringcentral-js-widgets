/**
 * Created by Sophie, edited by Bruce
 */
import { pathOr } from 'ramda';
import highAvailabilityAPI from './highAvailabilityAPI';
import availability from './availabilityStatus';

export const TMP_HA_ERROR_CODE = 'MaintenanceMode';
export const HA_ERROR_CODE = 'CMN-211';
export const HA_ERROR_STATUS = 503;

export function extractUrl({ url }) {
  if (url === '') {
    return '';
  }

  const filteredUrl =
    (url.match(/\/restapi(.*)/gi) && url.match(/\/restapi(.*)/gi)[0]) || '';
  const splitUrl = filteredUrl.split('?')[0] || '';
  return splitUrl;
}

/** Check if this damn error is HA error. */
export function isHAError(error) {
  const status = pathOr(-1, ['apiResponse', '_response', 'status'], error);
  const errors = pathOr([], ['apiResponse', '_json', 'errors'], error);

  let errorCodeIn = false;
  for (const e of errors) {
    if (pathOr('', ['errorCode'], e) === HA_ERROR_CODE) {
      errorCodeIn = true;
      break;
    }
  }

  // Result from `status` and `errorCode`.
  let validHAError = status === HA_ERROR_STATUS && errorCodeIn;
  if (!validHAError) {
    // Result from temp error code, expecially for `presence`.
    const resErrorCode = pathOr(
      null,
      ['apiResponse', '_json', 'errorCode'],
      error,
    );
    validHAError = resErrorCode === TMP_HA_ERROR_CODE;
  }

  return validHAError;
}

/**
 * Generate 1 ~ 120 seconds
 *
 * @export
 * @returns 1 ~ 120 seconds
 */
export function generateRandomNumber(max = 120, min = 1) {
  return Math.random() * (max - min) + min;
}

/**
 * Get availability level by path of url
 * TODO: Use lru cache to improve performance?
 */
function getAvailabilityLevel(path, method) {
  for (const api of highAvailabilityAPI) {
    if (path.match(api.reg) && method in api) {
      return api[method];
    }
  }
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
  if (!filteredUrl) {
    return false;
  }

  const condition = getAvailabilityLevel(filteredUrl, method);
  if (!condition) {
    console.error(
      `url: ${url} method: ${method} is not set in high or limited available API`,
    );
    // If a core API is not in the list, the request should be launched.
    return true;
  }

  return condition === availability.HIGH;
}
