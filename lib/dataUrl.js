"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataUrlToInline = dataUrlToInline;
exports.isBase64DataUrl = isBase64DataUrl;

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.index-of");

var REGEXP_BASE64_DATA_URL = /^(data:\w+\/[a-zA-Z+\-.]+;base64,)?(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/i;

function isBase64DataUrl(value) {
  return REGEXP_BASE64_DATA_URL.test(value);
}

function dataUrlToInline(dataURL) {
  if (dataURL.indexOf('base64') > -1) {
    return atob(dataURL.split('base64,')[1]);
  }

  return '';
}
//# sourceMappingURL=dataUrl.js.map
