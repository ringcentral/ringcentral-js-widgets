// const apiUrlPrefixRegex: RegExp = /^\/restapi\/v[\d]\.[\d]/;
const accountRegex: RegExp = /\/account\/[\d]+/;
const extensionRegex: RegExp = /\/extension\/[\d]+/;
const totalActiveCallsRegex: RegExp = /&totalActiveCalls/;

/**
 * @description Convert the subscription filters from base subscription object
 *  to the generic event filters we use to subscribe
 * @param {String} filter
 * @returns {String} normalizedFilter
 */
export function normalizeEventFilter(filter: string = ''): string {
  return filter
    .replace(accountRegex, '/account/~')
    .replace(extensionRegex, '/extension/~')
    .replace(totalActiveCallsRegex, '');
}
