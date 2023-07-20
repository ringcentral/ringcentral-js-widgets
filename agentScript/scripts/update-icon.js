"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.map");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("regenerator-runtime/runtime");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var fontPaths = ['iconfont', 'CCenter', 'fontawesome-webfont', 'glyphicons-halflings-regular', 'Roboto-Thin', 'Roboto-ThinItalic', 'Roboto-Light', 'Roboto-LightItalic', 'Roboto-Regular', 'Roboto-Italic', 'Roboto-Medium', 'Roboto-MediumItalic', 'Roboto-Black', 'Roboto-BlackItalic', 'Roboto-Bold', 'Roboto-BoldItalic'];
var exts = ['eot', 'woff2', 'woff', 'ttf'];
_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var result, _loop, _i, _fontPaths;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          result = [];
          _loop = function _loop() {
            var fontPath = _fontPaths[_i];
            var urls = exts.map(function (ext) {
              var url = "https://engage.ringcentral.com/voice/script-studio/assets/fonts/".concat(fontPath, ".").concat(ext, "}");
              return url;
            });
            result = [].concat(_toConsumableArray(result), _toConsumableArray(urls));
          };
          for (_i = 0, _fontPaths = fontPaths; _i < _fontPaths.length; _i++) {
            _loop();
          }
          // TODO: auto get those file
          console.log(result);
        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();
//# sourceMappingURL=update-icon.js.map
