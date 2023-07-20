// const apiUrlPrefixRegex: RegExp = /^\/restapi\/v[\d]\.[\d]/;
const accountRegex = /\/account\/[\d]+/;
const extensionRegex = /\/extension\/[\d]+/;
const totalActiveCallsRegex = /&totalActiveCalls/;

/**
 * @description Convert the subscription filters from base subscription object
 *  to the generic event filters we use to subscribe
 * @param {String} filter
 * @returns {String} normalizedFilter
 */
export function normalizeEventFilter(filter = ''): string {
  return filter
    .replace(accountRegex, '/account/~')
    .replace(extensionRegex, '/extension/~')
    .replace(totalActiveCallsRegex, '');
}

export function isTheSameWebSocket(firstUrl: string, secondUrl: string) {
  const first = new URL(firstUrl);
  const second = new URL(secondUrl);
  const isEqual =
    first.origin === second.origin &&
    first.pathname === second.pathname &&
    first.searchParams.get('access_token') ===
      second.searchParams.get('access_token');
  return isEqual;
}
