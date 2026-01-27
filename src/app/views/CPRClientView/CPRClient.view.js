"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CPRClientView = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _services2 = require("@ringcentral-integration/micro-auth/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _FileAttacher = require("@ringcentral-integration/next-widgets/components/MessageInput/FileAttacher");
var _utils = require("@ringcentral-integration/utils");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _rxjs = require("rxjs");
var _useFileUpload3 = require("use-file-upload");
var _trackEvents = require("../../../enums/trackEvents");
var _CPRClient = require("../../services/CPRClient");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var AUTO_LOG_META = {
  id: 'auto-log_𖩕',
  name: 'applicationLogs.zip',
  size: 0,
  base64Url: ''
};
var MINIMUM_SUBMISSION_DELAY = 500;
var MAX_USER_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10MB limit for individual user attachments
var CPRClientView = exports.CPRClientView = (_dec = (0, _nextCore.injectable)({
  name: 'CPRClientView'
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _CPRClient.CPRClient === "undefined" ? Object : _CPRClient.CPRClient, typeof _services.Toast === "undefined" ? Object : _services.Toast, typeof _services.BrowserLogger === "undefined" ? Object : _services.BrowserLogger]), _dec4 = Reflect.metadata("design:type", String), _dec5 = Reflect.metadata("design:type", Array), _dec6 = Reflect.metadata("design:type", Boolean), _dec7 = Reflect.metadata("design:type", Number), _dec8 = (0, _services2.track)(_trackEvents.trackEvents.cprLogsDownloaded), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [String]), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [Boolean]), _dec13 = (0, _nextCore.delegate)('server'), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [Boolean]), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [typeof FileMeta === "undefined" ? Object : FileMeta]), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", [Array]), _dec20 = (0, _nextCore.delegate)('server'), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", []), _dec23 = (0, _nextCore.delegate)('server'), _dec24 = Reflect.metadata("design:type", Function), _dec25 = Reflect.metadata("design:paramtypes", [String]), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", [Array]), _dec28 = (0, _nextCore.delegate)('server'), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", [Array]), _dec31 = (0, _nextCore.delegate)('server'), _dec32 = Reflect.metadata("design:type", Function), _dec33 = Reflect.metadata("design:paramtypes", [String]), _dec34 = (0, _services2.track)(_trackEvents.trackEvents.cprSubmitted), _dec35 = Reflect.metadata("design:type", Function), _dec36 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function CPRClientView(_cPRClient, _toast, _browserLogger) {
    var _this;
    _classCallCheck(this, CPRClientView);
    _this = _callSuper(this, CPRClientView);
    _this._cPRClient = _cPRClient;
    _this._toast = _toast;
    _this._browserLogger = _browserLogger;
    _initializerDefineProperty(_this, "details", _descriptor, _this);
    _initializerDefineProperty(_this, "attachments", _descriptor2, _this);
    _initializerDefineProperty(_this, "isSubmitting", _descriptor3, _this);
    _initializerDefineProperty(_this, "maxSizeInBytes", _descriptor4, _this);
    return _this;
  }
  _inherits(CPRClientView, _RcViewModule);
  return _createClass(CPRClientView, [{
    key: "downloadLogs",
    value: function downloadLogs() {
      this._browserLogger.saveLog();
    }
  }, {
    key: "_setDetails",
    value: function _setDetails(value) {
      this.details = value;
    }
  }, {
    key: "_setIsSubmitting",
    value: function _setIsSubmitting(value) {
      this.isSubmitting = value;
    }
  }, {
    key: "setIsSubmitting",
    value: function () {
      var _setIsSubmitting2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(value) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setIsSubmitting(value);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setIsSubmitting(_x) {
        return _setIsSubmitting2.apply(this, arguments);
      }
      return setIsSubmitting;
    }()
  }, {
    key: "_addAttachment",
    value: function _addAttachment(meta) {
      this.attachments.push(meta);
    }
  }, {
    key: "_setAttachments",
    value: function _setAttachments(value) {
      this.attachments = value;
    }
  }, {
    key: "resetForm",
    value: function () {
      var _resetForm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._setDetails('');
              this._setAttachments([]);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function resetForm() {
        return _resetForm.apply(this, arguments);
      }
      return resetForm;
    }()
  }, {
    key: "onDetailsValueChange",
    value: function () {
      var _onDetailsValueChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(value) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this._setDetails(value);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function onDetailsValueChange(_x2) {
        return _onDetailsValueChange.apply(this, arguments);
      }
      return onDetailsValueChange;
    }()
  }, {
    key: "sanitizeFilename",
    value: function sanitizeFilename(name) {
      return name.normalize('NFKD').replace(/(?:[\0-\x08\x0E-\x1F!-,\/:-@\[-\^`\{-\x9F\xA1-\xA9\xAB-\xB1\xB4\xB6-\xB8\xBB\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u036F\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482-\u0489\u0530\u0557\u0558\u055A-\u055F\u0589-\u05CF\u05EB-\u05EE\u05F3-\u061F\u064B-\u065F\u066A-\u066D\u0670\u06D4\u06D6-\u06E4\u06E7-\u06ED\u06FD\u06FE\u0700-\u070F\u0711\u0730-\u074C\u07A6-\u07B0\u07B2-\u07BF\u07EB-\u07F3\u07F6-\u07F9\u07FB-\u07FF\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u083F\u0859-\u085F\u086B-\u086F\u0888\u0890-\u089F\u08CA-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962-\u0965\u0970\u0981-\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA-\u09BC\u09BE-\u09CD\u09CF-\u09DB\u09DE\u09E2-\u09E5\u09F2\u09F3\u09FA\u09FB\u09FD-\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A-\u0A58\u0A5D\u0A5F-\u0A65\u0A70\u0A71\u0A75-\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA-\u0ABC\u0ABE-\u0ACF\u0AD1-\u0ADF\u0AE2-\u0AE5\u0AF0-\u0AF8\u0AFA-\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A-\u0B3C\u0B3E-\u0B5B\u0B5E\u0B62-\u0B65\u0B70\u0B78-\u0B82\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BCF\u0BD1-\u0BE5\u0BF3-\u0C04\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C3E-\u0C57\u0C5B\u0C5E\u0C5F\u0C62-\u0C65\u0C70-\u0C77\u0C7F\u0C81-\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA-\u0CBC\u0CBE-\u0CDB\u0CDF\u0CE2-\u0CE5\u0CF0\u0CF3-\u0D03\u0D0D\u0D11\u0D3B\u0D3C\u0D3E-\u0D4D\u0D4F-\u0D53\u0D57\u0D62-\u0D65\u0D79\u0D80-\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DE5\u0DF0-\u0E00\u0E31\u0E34-\u0E3F\u0E47-\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EB1\u0EB4-\u0EBC\u0EBE\u0EBF\u0EC5\u0EC7-\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F1F\u0F34-\u0F3F\u0F48\u0F6D-\u0F87\u0F8D-\u0FFF\u102B-\u103E\u104A-\u104F\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B-\u1368\u137D-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u1712-\u171E\u1732-\u173F\u1752-\u175F\u176D\u1771-\u177F\u17B4-\u17D6\u17D8-\u17DB\u17DD-\u17DF\u17EA-\u17EF\u17FA-\u180F\u181A-\u181F\u1879-\u187F\u1885\u1886\u18A9\u18AB-\u18AF\u18F6-\u18FF\u191F-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19FF\u1A17-\u1A1F\u1A55-\u1A7F\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1B04\u1B34-\u1B44\u1B4D-\u1B4F\u1B5A-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BFF\u1C24-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C8B-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1CFB-\u1CFF\u1DC0-\u1DFF\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u206F\u2072\u2073\u207A-\u207E\u208A-\u208F\u209D-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A-\u245F\u249C-\u24E9\u2500-\u2775\u2794-\u2BFF\u2CE5-\u2CEA\u2CEF-\u2CF1\u2CF4-\u2CFC\u2CFE\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7F\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF-\u2E2E\u2E30-\u2FFF\u3001-\u3004\u3008-\u3020\u302A-\u3030\u3036\u3037\u303D-\u3040\u3097-\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u3191\u3196-\u319F\u31C0-\u31EF\u3200-\u321F\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA66F-\uA67E\uA69E\uA69F\uA6F0-\uA716\uA720\uA721\uA789\uA78A\uA7DD-\uA7F0\uA802\uA806\uA80B\uA823-\uA82F\uA836-\uA83F\uA874-\uA881\uA8B4-\uA8CF\uA8DA-\uA8F1\uA8F8-\uA8FA\uA8FC\uA8FF\uA926-\uA92F\uA947-\uA95F\uA97D-\uA983\uA9B3-\uA9CE\uA9DA-\uA9DF\uA9E5\uA9FF\uAA29-\uAA3F\uAA43\uAA4C-\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAC3-\uAADA\uAADE\uAADF\uAAEB-\uAAF1\uAAF5-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABE3-\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB1E\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFE6F\uFE75\uFEFD\uFEFE\uFF00-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD06\uDD34-\uDD3F\uDD79-\uDD89\uDD8C-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEE0\uDEFC-\uDEFF\uDF24-\uDF2C\uDF4B-\uDF4F\uDF76-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6F\uDD7B\uDD8B\uDD93\uDD96\uDDA2\uDDB2\uDDBA\uDDBD-\uDDBF\uDDF4-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDF7F\uDF86\uDFB1\uDFBB-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC57\uDC77\uDC78\uDC9F-\uDCA6\uDCB0-\uDCDF\uDCF3\uDCF6-\uDCFA\uDD1C-\uDD1F\uDD3A-\uDD3F\uDD5A-\uDD7F\uDDB8-\uDDBB\uDDD0\uDDD1\uDE01-\uDE0F\uDE14\uDE18\uDE36-\uDE3F\uDE49-\uDE5F\uDE7F\uDEA0-\uDEBF\uDEC8\uDEE5-\uDEEA\uDEF0-\uDEFF\uDF36-\uDF3F\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDFA8\uDFB0-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCF9\uDD24-\uDD2F\uDD3A-\uDD3F\uDD66-\uDD6E\uDD86-\uDE5F\uDE7F\uDEAA-\uDEAF\uDEB2-\uDEC1\uDEC8-\uDEFF\uDF28-\uDF2F\uDF46-\uDF50\uDF55-\uDF6F\uDF82-\uDFAF\uDFCC-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC00-\uDC02\uDC38-\uDC51\uDC70\uDC73\uDC74\uDC76-\uDC82\uDCB0-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDD02\uDD27-\uDD35\uDD40-\uDD43\uDD45\uDD46\uDD48-\uDD4F\uDD73-\uDD75\uDD77-\uDD82\uDDB3-\uDDC0\uDDC5-\uDDCF\uDDDB\uDDDD-\uDDE0\uDDF5-\uDDFF\uDE12\uDE2C-\uDE3E\uDE41-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEDF-\uDEEF\uDEFA-\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A-\uDF3C\uDF3E-\uDF4F\uDF51-\uDF5C\uDF62-\uDF7F\uDF8A\uDF8C\uDF8D\uDF8F\uDFB6\uDFB8-\uDFD0\uDFD2\uDFD4-\uDFFF]|\uD805[\uDC35-\uDC46\uDC4B-\uDC4F\uDC5A-\uDC5E\uDC62-\uDC7F\uDCB0-\uDCC3\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDAF-\uDDD7\uDDDC-\uDDFF\uDE30-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEAB-\uDEB7\uDEB9-\uDEBF\uDECA-\uDECF\uDEE4-\uDEFF\uDF1B-\uDF2F\uDF3C-\uDF3F\uDF47-\uDFFF]|\uD806[\uDC2C-\uDC9F\uDCF3-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD30-\uDD3E\uDD40\uDD42-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD1-\uDDE0\uDDE2\uDDE4-\uDDFF\uDE01-\uDE0A\uDE33-\uDE39\uDE3B-\uDE4F\uDE51-\uDE5B\uDE8A-\uDE9C\uDE9E-\uDEAF\uDEF9-\uDFBF\uDFE1-\uDFEF\uDFFA-\uDFFF]|\uD807[\uDC09\uDC2F-\uDC3F\uDC41-\uDC4F\uDC6D-\uDC71\uDC90-\uDCFF\uDD07\uDD0A\uDD31-\uDD45\uDD47-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8A-\uDD97\uDD99-\uDD9F\uDDAA-\uDDAF\uDDDC-\uDDDF\uDDEA-\uDEDF\uDEF3-\uDF01\uDF03\uDF11\uDF34-\uDF4F\uDF5A-\uDFAF\uDFB1-\uDFBF\uDFD5-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD812-\uD817\uD819\uD824-\uD82A\uD82D\uD82E\uD830-\uD832\uD836\uD83D\uD83F\uD87C\uD87D\uD87F\uD88E-\uDBFF][\uDC00-\uDFFF]|\uD80B[\uDC00-\uDF8F\uDFF1-\uDFFF]|\uD80D[\uDC30-\uDC40\uDC47-\uDC5F]|\uD810[\uDFFB-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD818[\uDC00-\uDCFF\uDD1E-\uDD2F\uDD3A-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDE6F\uDEBF\uDECA-\uDECF\uDEEE-\uDEFF\uDF30-\uDF3F\uDF44-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDD3F\uDD6D-\uDD6F\uDD7A-\uDE3F\uDE97-\uDE9F\uDEB9\uDEBA\uDED4-\uDEFF\uDF4B-\uDF4F\uDF51-\uDF92\uDFA0-\uDFDF\uDFE2\uDFE4-\uDFF1\uDFF7-\uDFFF]|\uD823[\uDCD6-\uDCFE\uDD1F-\uDD7F\uDDF3-\uDFFF]|\uD82B[\uDC00-\uDFEF\uDFF4\uDFFC\uDFFF]|\uD82C[\uDD23-\uDD31\uDD33-\uDD4F\uDD53\uDD54\uDD56-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDFFF]|\uD833[\uDC00-\uDCEF\uDCFA-\uDFFF]|\uD834[\uDC00-\uDEBF\uDED4-\uDEDF\uDEF4-\uDF5F\uDF79-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD837[\uDC00-\uDEFF\uDF1F-\uDF24\uDF2B-\uDFFF]|\uD838[\uDC00-\uDC2F\uDC6E-\uDCFF\uDD2D-\uDD36\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDE8F\uDEAE-\uDEBF\uDEEC-\uDEEF\uDEFA-\uDFFF]|\uD839[\uDC00-\uDCCF\uDCEC-\uDCEF\uDCFA-\uDDCF\uDDEE\uDDEF\uDDFB-\uDEBF\uDEDF\uDEE3\uDEE6\uDEEE\uDEEF\uDEF5-\uDEFD\uDF00-\uDFDF\uDFE7\uDFEC\uDFEF\uDFFF]|\uD83A[\uDCC5\uDCC6\uDCD0-\uDCFF\uDD44-\uDD4A\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDC70\uDCAC\uDCB0\uDCB5-\uDD00\uDD2E\uDD3E-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDCFF\uDD0D-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEE0-\uDEFF]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEAE\uDEAF]|\uD87A[\uDFE1-\uDFEF]|\uD87B[\uDE5E-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDF4F]|\uD88D[\uDC7A-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g, '_').trim();
    }
  }, {
    key: "_addAttachments",
    value: function _addAttachments(files) {
      var _this2 = this;
      files.forEach(function (file) {
        var sanitizedFileName = _this2.sanitizeFilename(file.name);
        var duplicate = _this2.attachments.find(function (a) {
          return a.name === sanitizedFileName && a.size === file.size;
        });
        if (duplicate) {
          _this2._toast.info({
            message: (0, _i18n.t)('fileDuplicate')
          });
          return;
        }
        var current = _this2.attachments.reduce(function (s, a) {
          return s + a.size;
        }, 0) + file.size;
        if (current > MAX_USER_ATTACHMENT_SIZE) {
          _this2._toast.danger({
            message: (0, _i18n.t)('attachmentSize')
          });
          return;
        }
        _this2._addAttachment(file);
      });
    }
  }, {
    key: "addAttachments",
    value: function () {
      var _addAttachments2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(files) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this._addAttachments(files);
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function addAttachments(_x3) {
        return _addAttachments2.apply(this, arguments);
      }
      return addAttachments;
    }()
  }, {
    key: "removeAttachment",
    value: function () {
      var _removeAttachment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(id) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              this._setAttachments(this.attachments.filter(function (x) {
                return x.id !== id;
              }));
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function removeAttachment(_x4) {
        return _removeAttachment.apply(this, arguments);
      }
      return removeAttachment;
    }()
  }, {
    key: "submitReport",
    value: function () {
      var _submitReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _yield$firstValueFrom, _yield$firstValueFrom2, result;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (this.details.trim()) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2);
            case 1:
              this.setIsSubmitting(true);
              _context6.n = 2;
              return (0, _rxjs.firstValueFrom)((0, _rxjs.combineLatest)([(0, _rxjs.from)(this._cPRClient.sendCPR(this.details, this.attachments)),
              // submit report at least take 500ms, if not, wait that until 500ms
              (0, _rxjs.timer)(MINIMUM_SUBMISSION_DELAY)]));
            case 2:
              _yield$firstValueFrom = _context6.v;
              _yield$firstValueFrom2 = _slicedToArray(_yield$firstValueFrom, 1);
              result = _yield$firstValueFrom2[0];
              this.setIsSubmitting(false);
              if (result === null) {
                // when be null means that already show toast already, so check false only
                // do nothing
              } else if (result === false) {
                this._toast.danger({
                  message: (0, _i18n.t)('submitFailure')
                });
              } else {
                this._toast.success({
                  message: (0, _i18n.t)('submitSuccess')
                });
                this.resetForm();
              }
              return _context6.a(2, result);
          }
        }, _callee6, this);
      }));
      function submitReport() {
        return _submitReport.apply(this, arguments);
      }
      return submitReport;
    }()
  }, {
    key: "component",
    value: function component() {
      var _this3 = this;
      var _useConnector = (0, _nextCore.useConnector)(function () {
          return {
            details: _this3.details,
            attachments: _this3.attachments,
            isSubmitting: _this3.isSubmitting,
            downloading: _this3._browserLogger.downloading
          };
        }),
        details = _useConnector.details,
        attachments = _useConnector.attachments,
        isSubmitting = _useConnector.isSubmitting,
        downloading = _useConnector.downloading;
      var _useFileUpload = (0, _useFileUpload3.useFileUpload)(),
        _useFileUpload2 = _slicedToArray(_useFileUpload, 2),
        selectFile = _useFileUpload2[1];
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
        className: "typography-subtitle font-bold mb-2 text-neutral-b0",
        component: "p"
      }, (0, _i18n.t)('step2Title')), /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
        "data-sign": "step2Desc",
        className: "typography-mainText mb-4 text-neutral-b2",
        component: "p"
      }, (0, _i18n.t)('step2Description')), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_springUi.Textarea, {
        placeholder: (0, _i18n.t)('DescriptionPlaceholder'),
        className: "typography-mainText font-bold mb-4 text-neutral-b0",
        label: (0, _i18n.t)('DescriptionLabel'),
        rows: 3,
        fullWidth: true,
        value: details,
        onChange: function onChange(_ref) {
          var value = _ref.target.value;
          return _this3.onDetailsValueChange(value);
        },
        required: true,
        disabled: isSubmitting
      })), /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
        className: "typography-mainText mb-4",
        "data-sign": "attachFileBtn",
        variant: "text",
        color: "primary",
        size: "small",
        startIcon: /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
          symbol: _springIcon.AttachMd
        }),
        onClick: function onClick() {
          selectFile({
            accept: '*',
            multiple: true
          }, /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(result) {
              var files;
              return _regenerator().w(function (_context8) {
                while (1) switch (_context8.n) {
                  case 0:
                    if (!Array.isArray(result)) {
                      _context8.n = 2;
                      break;
                    }
                    _context8.n = 1;
                    return Promise.all(result.map(/*#__PURE__*/function () {
                      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(uploadFile) {
                        var name, size, file, base64Url;
                        return _regenerator().w(function (_context7) {
                          while (1) switch (_context7.n) {
                            case 0:
                              name = uploadFile.name, size = uploadFile.size, file = uploadFile.file;
                              _context7.n = 1;
                              return (0, _utils.fileToBase64)(file);
                            case 1:
                              base64Url = _context7.v;
                              return _context7.a(2, {
                                id: crypto.randomUUID(),
                                name: name,
                                size: size,
                                base64Url: base64Url
                              });
                          }
                        }, _callee7);
                      }));
                      return function (_x6) {
                        return _ref3.apply(this, arguments);
                      };
                    }()));
                  case 1:
                    files = _context8.v;
                    _this3.addAttachments(files);
                  case 2:
                    return _context8.a(2);
                }
              }, _callee8);
            }));
            return function (_x5) {
              return _ref2.apply(this, arguments);
            };
          }());
        },
        disabled: isSubmitting
      }, (0, _i18n.t)('attachFile')), /*#__PURE__*/_react["default"].createElement("div", {
        className: "typography-mainText mb-4",
        "data-sign": "attachments"
      }, /*#__PURE__*/_react["default"].createElement(_FileAttacher.FileInfoWithAction, {
        key: AUTO_LOG_META.id,
        symbol: _springIcon.FileMd,
        fileName: AUTO_LOG_META.name,
        FileIconProps: {
          className: 'mr-2 text-neutral-b1'
        },
        action: downloading ? /*#__PURE__*/_react["default"].createElement("div", {
          className: "flex items-center justify-center size-9"
        }, /*#__PURE__*/_react["default"].createElement(_springUi.CircularProgressIndicator, {
          variant: "indeterminate",
          size: "small",
          "data-sign": "downloading"
        })) : /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
          symbol: _springIcon.DownloadMd,
          "data-sign": "downloadButton",
          disabled: isSubmitting,
          variant: "icon",
          onClick: function onClick() {
            _this3.downloadLogs();
          },
          TooltipProps: {
            title: (0, _i18n.t)('downloadLogs'),
            placement: 'top'
          }
        })
      }), attachments.map(function (file) {
        return /*#__PURE__*/_react["default"].createElement(_FileAttacher.FileInfoWithAction, {
          key: file.id,
          symbol: _springIcon.FileMd,
          fileName: file.name,
          fileSize: file.size,
          FileIconProps: {
            className: 'mr-2 text-neutral-b1'
          },
          action: /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
            symbol: _springIcon.Xsm,
            "data-sign": "removeBtn",
            disabled: isSubmitting,
            variant: "icon",
            onClick: function onClick() {
              _this3.removeAttachment(file.id);
            }
          })
        });
      })), /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "submitButton"
      }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
        className: "typography-subtitle mb-4",
        "data-sign": "submitBtn",
        fullWidth: true,
        onClick: function onClick() {
          return _this3.submitReport();
        },
        disabled: !details.trim() || isSubmitting || downloading
      }, isSubmitting ? /*#__PURE__*/_react["default"].createElement(_springUi.CircularProgressIndicator, {
        variant: "indeterminate",
        size: "small"
      }) : (0, _i18n.t)('submit')))));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "details", [_nextCore.state, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "attachments", [_nextCore.state, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isSubmitting", [_nextCore.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "maxSizeInBytes", [_nextCore.state, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 120 * 1024 * 1024;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "downloadLogs", [_dec8, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "downloadLogs"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setDetails", [_nextCore.action, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "_setDetails"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setIsSubmitting", [_nextCore.action, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "_setIsSubmitting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIsSubmitting", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsSubmitting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addAttachment", [_nextCore.action, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "_addAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setAttachments", [_nextCore.action, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "_setAttachments"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetForm", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "resetForm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onDetailsValueChange", [_dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "onDetailsValueChange"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addAttachments", [_nextCore.action, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "_addAttachments"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addAttachments", [_dec28, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "addAttachments"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeAttachment", [_dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "removeAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "submitReport", [_dec34, _dec35, _dec36], Object.getOwnPropertyDescriptor(_class2.prototype, "submitReport"), _class2.prototype), _class2)) || _class) || _class) || _class);
//# sourceMappingURL=CPRClient.view.js.map
