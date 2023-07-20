"use strict";

require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array-buffer.constructor");
require("core-js/modules/es.array-buffer.slice");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
require("core-js/modules/es.string.split");
require("core-js/modules/es.typed-array.uint8-array");
require("core-js/modules/es.typed-array.copy-within");
require("core-js/modules/es.typed-array.every");
require("core-js/modules/es.typed-array.fill");
require("core-js/modules/es.typed-array.filter");
require("core-js/modules/es.typed-array.find");
require("core-js/modules/es.typed-array.find-index");
require("core-js/modules/es.typed-array.for-each");
require("core-js/modules/es.typed-array.includes");
require("core-js/modules/es.typed-array.index-of");
require("core-js/modules/es.typed-array.iterator");
require("core-js/modules/es.typed-array.join");
require("core-js/modules/es.typed-array.last-index-of");
require("core-js/modules/es.typed-array.map");
require("core-js/modules/es.typed-array.reduce");
require("core-js/modules/es.typed-array.reduce-right");
require("core-js/modules/es.typed-array.reverse");
require("core-js/modules/es.typed-array.set");
require("core-js/modules/es.typed-array.slice");
require("core-js/modules/es.typed-array.some");
require("core-js/modules/es.typed-array.sort");
require("core-js/modules/es.typed-array.subarray");
require("core-js/modules/es.typed-array.to-locale-string");
require("core-js/modules/es.typed-array.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64ToBlob = base64ToBlob;
exports.base64ToFile = base64ToFile;
exports.decodeBase64DataUrl = decodeBase64DataUrl;
exports.fileToBinary = exports.fileToBase64 = void 0;
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
var fileToBase64 = function fileToBase64(file) {
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
exports.fileToBase64 = fileToBase64;
var fileToBinary = function fileToBinary(file) {
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
exports.fileToBinary = fileToBinary;
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
  return new File([blob], filename);
}
//# sourceMappingURL=base64Handler.js.map
