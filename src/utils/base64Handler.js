"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64ToBlob = base64ToBlob;
exports.base64ToFile = base64ToFile;
exports.decodeBase64DataUrl = decodeBase64DataUrl;
exports.fileToBinary = exports.fileToBase64 = void 0;
exports.isBase64DataUrl = isBase64DataUrl;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array-buffer.constructor.js");
require("core-js/modules/es.array-buffer.slice.js");
require("core-js/modules/es.data-view.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.typed-array.uint8-array.js");
require("core-js/modules/es.typed-array.copy-within.js");
require("core-js/modules/es.typed-array.every.js");
require("core-js/modules/es.typed-array.fill.js");
require("core-js/modules/es.typed-array.filter.js");
require("core-js/modules/es.typed-array.find.js");
require("core-js/modules/es.typed-array.find-index.js");
require("core-js/modules/es.typed-array.for-each.js");
require("core-js/modules/es.typed-array.includes.js");
require("core-js/modules/es.typed-array.index-of.js");
require("core-js/modules/es.typed-array.iterator.js");
require("core-js/modules/es.typed-array.join.js");
require("core-js/modules/es.typed-array.last-index-of.js");
require("core-js/modules/es.typed-array.map.js");
require("core-js/modules/es.typed-array.reduce.js");
require("core-js/modules/es.typed-array.reduce-right.js");
require("core-js/modules/es.typed-array.reverse.js");
require("core-js/modules/es.typed-array.set.js");
require("core-js/modules/es.typed-array.slice.js");
require("core-js/modules/es.typed-array.some.js");
require("core-js/modules/es.typed-array.sort.js");
require("core-js/modules/es.typed-array.subarray.js");
require("core-js/modules/es.typed-array.to-locale-string.js");
require("core-js/modules/es.typed-array.to-string.js");
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
var fileToBase64 = exports.fileToBase64 = function fileToBase64(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function (e) {
      resolve(e.target.result);
    };
    reader.onerror = function (err) {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};
var fileToBinary = exports.fileToBinary = function fileToBinary(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function (e) {
      resolve(e.target.result);
    };
    reader.onerror = function (err) {
      reject(err);
    };
    reader.readAsBinaryString(file);
  });
};
function base64ToBlob(base64Image) {
  var split = base64Image.split(',');
  var type = split[0].replace('data:', '').replace(';base64', '');
  var byteString = atob(split[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], {
    type: type
  });
}
function base64ToFile(base64Image, filename) {
  var blob = base64ToBlob(base64Image);
  return new File([blob], filename, {
    type: blob.type
  });
}
//# sourceMappingURL=base64Handler.js.map
