"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.filter");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("regenerator-runtime/runtime");
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _loaderUtils = _interopRequireDefault(require("loader-utils"));
var _generateLoaderContent = _interopRequireDefault(require("../generateLoaderContent"));
var _isLoaderFile = _interopRequireWildcard(require("../isLoaderFile"));
var _isLocaleFile = _interopRequireWildcard(require("../isLocaleFile"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 *
 * locale loader can work with options like below
 * ```
 * {
 *   loader: '@ringcentral-integration/locale-loader',
 *   options: {
 *     supportedLocales,
 *     chunk,
 *   },
 * }
 * ```
 *
 * - `supportedLocales` to support locales
 * * `chunk`
 *   * be `boolean` will toggle that chunk mode.
 *   * be `function` can be method with `(locale: string) => boolean`, provide you a way to specify which language be chunked.
 *
 * @example
 * ```ts
 * chunk: (local: string) => {
 *   return local !== 'en-US'; // en-US will not be chunked, that will be package into main script directly
 * }
 * ```
 */
module.exports = function localeLoader(content) {
  var _options$chunk,
    _this = this;
  var callback = this.async();
  var options = _loaderUtils["default"].getOptions(this) || {};
  var supportedLocales = options.supportedLocales || [];
  var chunk = !(0, _isLoaderFile.noChunks)(content) && ((_options$chunk = options.chunk) !== null && _options$chunk !== void 0 ? _options$chunk : true);
  if ((0, _isLoaderFile["default"])(content)) {
    _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var files;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _fsExtra["default"].readdir(_this.context);
            case 2:
              files = _context.sent.filter(function (f) {
                return (0, _isLocaleFile["default"])(f);
              }).filter((0, _isLocaleFile.localeFilter)(supportedLocales));
              callback(null, (0, _generateLoaderContent["default"])({
                files: files,
                chunk: chunk,
                supportedLocales: supportedLocales
              }));
            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  } else {
    callback(null, content);
  }
};
//# sourceMappingURL=index.js.map
