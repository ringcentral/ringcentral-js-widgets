"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.map");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("regenerator-runtime/runtime");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
