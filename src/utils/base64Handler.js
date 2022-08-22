"use strict";

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeBase64DataUrl = decodeBase64DataUrl;
exports.isBase64DataUrl = isBase64DataUrl;
var REGEXP_BASE64_DATA_URL = /^(data:\w+\/[a-zA-Z+\-.]+;base64,)?(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/i;

function isBase64DataUrl(value) {
  return REGEXP_BASE64_DATA_URL.test(value);
}

function decodeBase64DataUrl(dataURL) {
  if (isBase64DataUrl(dataURL)) {
    return atob(dataURL.split('base64,')[1]);
  }

  return '';
}
//# sourceMappingURL=base64Handler.js.map
