"use strict";

require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.last-index-of");
require("core-js/modules/es.array-buffer.constructor");
require("core-js/modules/es.array-buffer.slice");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
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
exports.readAudioFile = exports.isWav = exports.isMp3 = exports.isAudioFile = exports.getFileNameWithoutExt = exports.fileToArrayBuffer = void 0;
require("regenerator-runtime/runtime");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var isMp3 = function isMp3(buf) {
  if (!buf || buf.length < 3) {
    return false;
  }
  return buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33 || buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0 || buf[0] === 0x54 && buf[1] === 0x41 && buf[2] === 0x47;
};
exports.isMp3 = isMp3;
var isWav = function isWav(buf) {
  if (!buf || buf.length < 12) {
    return false;
  }
  return buf[0] === 82 && buf[1] === 73 && buf[2] === 70 && buf[3] === 70 && buf[8] === 87 && buf[9] === 65 && buf[10] === 86 && buf[11] === 69;
};
exports.isWav = isWav;
var fileToArrayBuffer = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var reader = new FileReader();
              reader.onload = function (event) {
                var _event$target;
                if (((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.result) instanceof ArrayBuffer) {
                  resolve(event.target.result);
                } else {
                  reject(new Error('Failed to convert file to ArrayBuffer.'));
                }
              };
              reader.onerror = function (event) {
                var _event$target2;
                reject(new Error('Error reading file: ' + ((_event$target2 = event.target) === null || _event$target2 === void 0 ? void 0 : _event$target2.error)));
              };
              reader.readAsArrayBuffer(file);
            }));
          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function fileToArrayBuffer(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.fileToArrayBuffer = fileToArrayBuffer;
var isAudioFile = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(file) {
    var arrayBuffer, signature;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fileToArrayBuffer(file);
          case 2:
            arrayBuffer = _context2.sent;
            signature = new Uint8Array(arrayBuffer);
            return _context2.abrupt("return", isMp3(signature) || isWav(signature));
          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function isAudioFile(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
exports.isAudioFile = isAudioFile;
var readAudioFile = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(file) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              var reader = new FileReader();
              reader.onload = function () {
                resolve({
                  fileName: file.name,
                  dataUrl: reader.result
                });
              };
              reader.onerror = function () {
                reject('upload failed');
              };
              reader.readAsDataURL(file);
            }));
          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function readAudioFile(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
exports.readAudioFile = readAudioFile;
var getFileNameWithoutExt = function getFileNameWithoutExt(fileName) {
  var lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) return fileName;
  return fileName.substring(0, lastDotIndex);
};
exports.getFileNameWithoutExt = getFileNameWithoutExt;
//# sourceMappingURL=helper.js.map
