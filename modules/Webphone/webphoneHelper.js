"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBrowerSupport = isBrowerSupport;
function isBrowerSupport() {
  var isChrome = !!navigator.userAgent.match(/Chrom(e|ium)/);
  if (!isChrome) {
    return false;
  }
  var chromeVersion = parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10);
  if (chromeVersion >= 51) {
    return true;
  }
  return false;
}
//# sourceMappingURL=webphoneHelper.js.map
