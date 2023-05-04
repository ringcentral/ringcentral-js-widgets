import qs from 'qs';
import url from 'url';

/**
 * @function
 * @param {String} callbackUri
 * @return {Object}
 */
export default function parseCallbackUri(callbackUri: any) {
  const { query, hash } = url.parse(callbackUri, true);
  const hashObject = hash ? qs.parse(hash.replace(/^#/, '')) : {};
  if (query.error || hashObject.error) {
    // @ts-expect-error TS(2345): Argument of type 'string | ParsedQs | string[] | P... Remove this comment to see the full error message
    const error = new Error(query.error || hashObject.error);
    // eslint-disable-next-line guard-for-in
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        error[key] = query[key];
      }
      if (Object.prototype.hasOwnProperty.call(hashObject, key)) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
