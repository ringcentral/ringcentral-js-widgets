import url from 'url';

/**
 * @function
 * @param {String} callbackUri
 * @return {String} code
 */
export default function parseCallbackUri(callbackUri) {
  const { query } = url.parse(callbackUri, true);
  if (query.error) {
    const error = new Error(query.error);
    for (const key in query) {
      if (query::Object.prototype.hasOwnProperty(key)) {
        error[key] = query[key];
      }
    }
    throw error;
  }
  return query.code;
}
