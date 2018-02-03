import url from 'url';
import qs from 'qs';

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
    for (const key in query) {
      if (query::Object.prototype.hasOwnProperty(key)) {
        error[key] = query[key];
      }
      if (hashObject::Object.prototype.hasOwnProperty(key)) {
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
