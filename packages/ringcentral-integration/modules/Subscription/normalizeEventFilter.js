const apiUrlPrefixRegex = /^\/restapi\/v[\d]\.[\d]/;
const accountRegex = /\/account\/[\d]+/;
const extensionRegex = /\/extension\/[\d]+/;
const totalActiveCallsRegex = /&totalActiveCalls/;

/**
 * @description Convert the subscription filters from base subscription object
 *  to the generic event filters we use to subscribe
 * @param {String[]} filters
 * @returns {String[]} normalizedFilters
 */
export function normalizeEventFilter(filter = '') {
  return filter
    .replace(apiUrlPrefixRegex, '')
    .replace(accountRegex, '/account/~')
    .replace(extensionRegex, '/extension/~')
    .replace(totalActiveCallsRegex, '');
}
