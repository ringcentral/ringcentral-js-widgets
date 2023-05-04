import url from 'url';

/**
 * @function
 * @param {String} callbackUri
 * @return {String} code
 */
export default function parseCallbackUri(callbackUri: any) {
  const { query } = url.parse(callbackUri, true);
  if (query.error) {
    // @ts-expect-error TS(2345): Argument of type 'string | string[]' is not assign... Remove this comment to see the full error message
    const error = new Error(query.error);
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        error[key] = query[key];
      }
    }
    throw error;
  }
  return query.code;
}
