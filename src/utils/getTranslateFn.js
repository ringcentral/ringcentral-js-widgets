"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.some");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTranslateFn = void 0;
var _i18n = require("@ringcentral-integration/i18n");
var _format = require("./format");
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); } /* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * provide method to work translate and format string
 */
var getTranslateFn = function getTranslateFn() {
  for (var _len = arguments.length, i18nInput = new Array(_len), _key = 0; _key < _len; _key++) {
    i18nInput[_key] = arguments[_key];
  }
  var i18nInstances = Array.isArray(i18nInput) ? i18nInput : [i18nInput];
  if (process.env.NODE_ENV !== 'production') {
    var TranslateError = /*#__PURE__*/function (_Error) {
      _inherits(TranslateError, _Error);
      var _super = _createSuper(TranslateError);
      function TranslateError(message) {
        var _this;
        _classCallCheck(this, TranslateError);
        _this = _super.call(this, message);
        _this.name = 'TranslateError';
        return _this;
      }
      return TranslateError;
    }( /*#__PURE__*/_wrapNativeSuper(Error));
    if (i18nInstances.length > 1) {
      var _i18nInstances = _toArray(i18nInstances),
        firstI18n = _i18nInstances[0],
        rest = _i18nInstances.slice(1);
      rest.forEach(function (nextI18n) {
        Object.keys(firstI18n._cache[_i18n.RUNTIME.defaultLocale] || {}).forEach(function (key) {
          if (Object.prototype.hasOwnProperty.call(nextI18n._cache[_i18n.RUNTIME.defaultLocale], key)) {
            // eslint-disable-next-line no-console
            console.warn(new TranslateError("[i18n] i18n files has duplicated key \"".concat(key, "\"")), {
              duplicatedKey: key,
              i18nInstances: i18nInstances
            });
          }
        });
      });
    }
  }
  return function (key) {
    var i18nString = key;
    i18nInstances.some(function (i18nInstance) {
      var result = i18nInstance.getString(key);
      if (result !== key) {
        i18nString = result;
        return true;
      }
      return false;
    });
    for (var _len2 = arguments.length, options = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      options[_key2 - 1] = arguments[_key2];
    }
    if (options.length > 0) {
      return _format.format.apply(void 0, [i18nString].concat(options));
    }
    return i18nString;
  };
};
exports.getTranslateFn = getTranslateFn;
//# sourceMappingURL=getTranslateFn.js.map
