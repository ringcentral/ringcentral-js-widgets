import qs from 'qs';
import url from 'url';

/**
 * @function
 * @param {String} callbackUri
 * @return {Object}
 */
export default function parseCallbackUri(callbackUri) {
  const { query, hash } = url.parse(callbackUri, true);
  const hashObject = hash ? qs.parse(hash.replace(/^#/, '')) : {};
  if (query.error || hashObject.error) {
    const error = new Error(query.error || hashObject.error);
    // eslint-disable-next-line guard-for-in
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        error[key] = query[key];
      }
      if (Object.prototype.hasOwnProperty.call(hashObject, key)) {
        error[key] = query[key];
      }
    }
    throw error;
  }

  return {
    ...query,
    ...hashObject,
  };
}
