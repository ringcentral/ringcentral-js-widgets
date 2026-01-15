"use strict";

require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSDKNonISO8859Chars = exports.removeNonISO8859Chars = void 0;
var removeNonISO8859Chars = function removeNonISO8859Chars(str) {
  if (typeof str !== 'string') {
    return str;
  }
  // Match all non-ISO-8859-1 characters and replace them with the empty string.
  // eslint-disable-next-line no-control-regex
  return str.replace(/[^\u0000-\u00FF]/g, '');
};
exports.removeNonISO8859Chars = removeNonISO8859Chars;
var removeSDKNonISO8859Chars = function removeSDKNonISO8859Chars(sdkConfig) {
  // issue: https://github.com/ringcentral/ringcentral-js/issues/272
  if (typeof sdkConfig.appName === 'string') {
    sdkConfig.appName = removeNonISO8859Chars(sdkConfig.appName);
  }
  return sdkConfig;
};
exports.removeSDKNonISO8859Chars = removeSDKNonISO8859Chars;
//# sourceMappingURL=removeNonISO8859Chars.js.map
