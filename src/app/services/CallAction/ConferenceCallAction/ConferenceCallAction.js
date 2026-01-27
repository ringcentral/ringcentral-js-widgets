"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConferenceCallAction = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _components = require("@ringcentral-integration/micro-auth/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _RemoveMemberBorder = _interopRequireDefault(require("@ringcentral/juno-icon/es6/RemoveMemberBorder.js"));
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _hooks2 = require("../../../hooks");
var _ActiveCallControl = require("../../ActiveCallControl");
var _CallMonitor = require("../../CallMonitor");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
/* eslint-disable react-hooks/rules-of-hooks */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var ConferenceCallAction = exports.ConferenceCallAction = (_dec = (0, _nextCore.injectable)({
  name: 'ConferenceCallAction'
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _views.ModalView === "undefined" ? Object : _views.ModalView, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _CallMonitor.CallMonitor === "undefined" ? Object : _CallMonitor.CallMonitor, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin]), _dec4 = (0, _nextCore.dynamic)('CallAction'), _dec5 = Reflect.metadata("design:type", typeof CallAction === "undefined" ? Object : CallAction), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [Boolean]), _dec8 = (0, _nextCore.delegate)('server'), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [Boolean]), _dec1 = Reflect.metadata("design:type", String), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [String]), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", []), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [Object]), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [Object]), _dec18 = (0, _nextCore.delegate)('server'), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [String]), _dec21 = (0, _nextCore.delegate)('server'), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", [String, typeof RemoveParticipantConfirmOptions === "undefined" ? Object : RemoveParticipantConfirmOptions]), _dec24 = (0, _nextCore.delegate)('server'), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function ConferenceCallAction(_modalView, _portManager, _callMonitor, _storage) {
    var _this;
    _classCallCheck(this, ConferenceCallAction);
    _this = _callSuper(this, ConferenceCallAction);
    _this._modalView = _modalView;
    _this._portManager = _portManager;
    _this._callMonitor = _callMonitor;
    _this._storage = _storage;
    _initializerDefineProperty(_this, "_callAction", _descriptor, _this);
    // TODO: key storage migration from MergeCallConfirmView
    _initializerDefineProperty(_this, "doNotAskAgain", _descriptor2, _this);
    _initializerDefineProperty(_this, "openedPartyId", _descriptor3, _this);
    _this.isCallMergeable = function (call, mergeIntoTelephonySessionId) {
      var ringing = (0, _ActiveCallControl.isRingingCall)(call);
      return !(0, _ActiveCallControl.isOtherDeviceCall)(call) && !ringing && call.telephonySessionId !== mergeIntoTelephonySessionId;
    };
    _initializerDefineProperty(_this, "mergeConfirm", _descriptor4, _this);
    _initializerDefineProperty(_this, "leaveConfirm", _descriptor5, _this);
    _initializerDefineProperty(_this, "removeParticipantConfirm", _descriptor6, _this);
    _initializerDefineProperty(_this, "participantsList", _descriptor7, _this);
    _this._storage.enable(_this);
    if (_this._portManager.shared) {
      _this._portManager.onServer(function () {
        _this.bindClearModalListener();
      });
    } else {
      _this.bindClearModalListener();
    }
    return _this;
  }
  _inherits(ConferenceCallAction, _RcModule);
  return _createClass(ConferenceCallAction, [{
    key: "_setDoNotAskAgain",
    value: function _setDoNotAskAgain(value) {
      this.doNotAskAgain = value;
    }
  }, {
    key: "setDoNotAskAgain",
    value: function () {
      var _setDoNotAskAgain2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(value) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setDoNotAskAgain(value);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setDoNotAskAgain(_x) {
        return _setDoNotAskAgain2.apply(this, arguments);
      }
      return setDoNotAskAgain;
    }()
  }, {
    key: "setOpenedPartyId",
    value: function setOpenedPartyId(val) {
      this.openedPartyId = val;
    }
  }, {
    key: "mergeCalls",
    get: function get() {
      var _this$_callAction$dis,
        _this$_callAction$act,
        _this$_callAction$act2,
        _this2 = this;
      var displayCallAllInfo = (_this$_callAction$dis = this._callAction.displayCallAllInfo) === null || _this$_callAction$dis === void 0 ? void 0 : _this$_callAction$dis.call;

      // when that is ringing call, never able to merge to another call
      if ((0, _ActiveCallControl.isRingingCall)(displayCallAllInfo)) {
        return [];
      }
      var displayTelephonySessionId = (_this$_callAction$act = this._callAction.activeCallInfo) === null || _this$_callAction$act === void 0 ? void 0 : (_this$_callAction$act2 = _this$_callAction$act.call) === null || _this$_callAction$act2 === void 0 ? void 0 : _this$_callAction$act2.telephonySessionId;
      return this._callAction.displayCallList.filter(function (call) {
        return _this2.isCallMergeable(call, displayTelephonySessionId);
      });
    }
  }, {
    key: "MergeConfirm",
    value: function MergeConfirm(_ref) {
      var _this3 = this;
      var call = _ref.call;
      var _useModalItemView = (0, _views.useModalItemView)(),
        action = _useModalItemView.action;
      var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
        t = _useLocale.t;
      var _useConnector = (0, _nextCore.useConnector)(function () {
          return {
            doNotAskAgain: _this3.doNotAskAgain
          };
        }),
        doNotAskAgain = _useConnector.doNotAskAgain;
      var _useState = (0, _react.useState)(doNotAskAgain),
        _useState2 = _slicedToArray(_useState, 2),
        tmpDoNotAskAgain = _useState2[0],
        setTmpDoNotAskAgain = _useState2[1];
      var _useContactRenderInfo = (0, _hooks2.useContactRenderInfoFromCall)(call),
        DisplayName = _useContactRenderInfo.DisplayName;
      var displayName = /*#__PURE__*/_react["default"].createElement(DisplayName, null);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "m-4 flex flex-col gap-3",
        "data-sign": "mergeCallConfirmation"
      }, /*#__PURE__*/_react["default"].createElement("h3", {
        className: "font-bold typography-title"
      }, t('mergeTitle')), /*#__PURE__*/_react["default"].createElement("p", {
        className: "typography-mainText",
        "data-sign": "confirmMessage"
      }, /*#__PURE__*/_react["default"].createElement(_components2.FormattedMessage, {
        message: t('mergeMessage'),
        values: {
          contactName: call.isConferenceCall ? t('conferenceCall') : displayName
        }
      })), /*#__PURE__*/_react["default"].createElement(_springUi.FormLabel, {
        "data-sign": "doNotAsk",
        label: t('mergeDoNotAsk'),
        placement: "end"
      }, /*#__PURE__*/_react["default"].createElement(_springUi.Checkbox, {
        checked: tmpDoNotAskAgain,
        onChange: function onChange(e) {
          setTmpDoNotAskAgain(e.target.checked);
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex flex-col gap-2 mt-2"
      }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
        fullWidth: true,
        size: "xlarge",
        "data-sign": "confirmMerge",
        onClick: function onClick() {
          action === null || action === void 0 ? void 0 : action.confirm({
            doNotAskAgain: tmpDoNotAskAgain
          });
        }
      }, t('mergeConfirm')), /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
        fullWidth: true,
        "data-sign": "cancelMerge",
        size: "xlarge",
        variant: "outlined",
        onClick: function onClick() {
          action === null || action === void 0 ? void 0 : action.cancel();
        }
      }, t('mergeCancel'))));
    }
  }, {
    key: "ParticipantsList",
    value: function ParticipantsList(_ref2) {
      var _this4 = this;
      var call = _ref2.call;
      var _useLocale2 = (0, _hooks.useLocale)(_i18n["default"]),
        t = _useLocale2.t;
      var _useContactRenderInfo2 = (0, _hooks2.useContactRenderInfoFromCall)(call, {
          phoneNumberDisplayMode: 'unknown'
        }),
        conferenceParticipantsInfoFnList = _useContactRenderInfo2.conferenceParticipantsInfoFnList;
      var _useConnector2 = (0, _nextCore.useConnector)(function () {
          return {
            activeCallInfo: _this4._callAction.activeCallInfo
          };
        }),
        activeCallInfo = _useConnector2.activeCallInfo;
      var participants = (call === null || call === void 0 ? void 0 : call.conferenceParticipants) || [];
      var length = participants.length;
      var formattedPhoneNumberFn = (0, _components.useFormattedPhoneNumberFn)();
      if (!call) return null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "participantsListModal"
      }, /*#__PURE__*/_react["default"].createElement("h3", {
        "data-sign": "participantsHeader",
        className: "font-bold m-4 typography-title"
      }, t('participants'), " (", length, ")"), /*#__PURE__*/_react["default"].createElement(_springUi.List, null, conferenceParticipantsInfoFnList === null || conferenceParticipantsInfoFnList === void 0 ? void 0 : conferenceParticipantsInfoFnList.map(function (conferenceParticipantInfoFn, index) {
        var _activeCallInfo$meta;
        var _conferenceParticipan = conferenceParticipantInfoFn({
            phoneNumberDisplayMode: 'unknown'
          }),
          data = _conferenceParticipan.data,
          renderInfo = _conferenceParticipan.renderInfo,
          Avatar = _conferenceParticipan.Avatar,
          result = _conferenceParticipan.result,
          displayName = _conferenceParticipan.displayName;
        var partyId = data.partyId,
          isHost = data.isHost;
        var dialToPhoneNumber = renderInfo.dialToPhoneNumber,
          type = renderInfo.type;
        var primaryDisplay = isHost ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, result, " (".concat(t('host'), ")")) : result;
        return /*#__PURE__*/_react["default"].createElement(_springUi.ListItem, {
          key: "".concat(call.telephonySessionId, "-").concat(index),
          size: "large",
          divider: false,
          "data-sign": isHost ? "participantItemHost" : "participantItem"
        }, /*#__PURE__*/_react["default"].createElement(Avatar, null), /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
          primary:
          /*#__PURE__*/
          // entityDetailLinkId ? (
          //   <RcLink
          //     variant="inherit"
          //     onClick={() => {
          //       return openEntityDetailLink
          //         ? openEntityDetailLink(entityDetailLinkId)
          //         : window.open(entityDetailLink, '_blank');
          //     }}
          //   >
          //     {displayName}
          //   </RcLink>
          // ) : (
          _react["default"].createElement("span", {
            "data-sign": "participantName"
          }, primaryDisplay)
          // )
          ,
          secondary: isHost || dialToPhoneNumber === 'anonymous' ? null : /*#__PURE__*/_react["default"].createElement("span", {
            "data-sign": "participantNumber"
          }, /*#__PURE__*/_react["default"].createElement(_components.FormattedPhoneNumber, {
            phoneNumber: dialToPhoneNumber
          }))
        }), !isHost && /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
          "data-sign": "removeParticipantButton",
          color: "secondary",
          disabled: activeCallInfo === null || activeCallInfo === void 0 ? void 0 : (_activeCallInfo$meta = activeCallInfo.meta) === null || _activeCallInfo$meta === void 0 ? void 0 : _activeCallInfo$meta.actionsDisabled,
          background: false,
          symbol: _RemoveMemberBorder["default"],
          TooltipProps: {
            title: t('removeParticipant'),
            placement: 'left'
          },
          onClick: function onClick() {
            _this4.confirmRemoveParticipant(partyId, {
              displayName: type === 'unknown' && dialToPhoneNumber ? formattedPhoneNumberFn(dialToPhoneNumber) : displayName
            });
          }
        }));
      })));
    }
  }, {
    key: "bindClearModalListener",
    value: function bindClearModalListener() {
      var _this5 = this;
      (0, _nextCore.fromWatchValue)(this, function () {
        return _this5._callAction;
      }).pipe((0, _rxjs.switchMap)(function (callAction) {
        if (!callAction) return _rxjs.EMPTY;

        // when id changed, close conference related all modals
        var closeAllWhenIdChange$ = callAction.displayCallTelephonyIdChange$.pipe((0, _rxjs.tap)(function () {
          _this5._modalView.close(_this5.mergeConfirm);
          _this5._modalView.close(_this5.leaveConfirm);
          _this5._modalView.close(_this5.removeParticipantConfirm);
          _this5._modalView.close(_this5.participantsList);
        }));

        // close remove participant confirm modal when partyId not exist anymore
        var closeRemovePartyWhenPartyNotExist$ = (0, _nextCore.fromWatchValue)(_this5, function () {
          var _this5$_callAction$di, _this5$_callAction$di2;
          return [_this5.openedPartyId, (_this5$_callAction$di = _this5._callAction.displayCallAllInfo) === null || _this5$_callAction$di === void 0 ? void 0 : (_this5$_callAction$di2 = _this5$_callAction$di.call) === null || _this5$_callAction$di2 === void 0 ? void 0 : _this5$_callAction$di2.conferenceParticipants];
        }, {
          multiple: true
        }).pipe((0, _rxjs.filter)(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 1),
            partyId = _ref4[0];
          return !!partyId;
        }), (0, _rxjs.tap)(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
            partyId = _ref6[0],
            conferenceParticipants = _ref6[1];
          var openedRemovePartyStillExist = conferenceParticipants === null || conferenceParticipants === void 0 ? void 0 : conferenceParticipants.some(function (participant) {
            return participant.partyId === partyId;
          });
          if (!openedRemovePartyStillExist) {
            _this5._modalView.close(_this5.removeParticipantConfirm);
          }
        }));
        return (0, _rxjs.merge)(closeAllWhenIdChange$, closeRemovePartyWhenPartyNotExist$);
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "mergeConfirmProcess",
    value: function () {
      var _mergeConfirmProcess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(toMergeWithTelephonySessionId) {
        var _this6 = this;
        var _this$mergeCalls$, mergeId, result;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!(this.mergeCalls.length === 1)) {
                _context2.n = 1;
                break;
              }
              mergeId = (_this$mergeCalls$ = this.mergeCalls[0]) === null || _this$mergeCalls$ === void 0 ? void 0 : _this$mergeCalls$.telephonySessionId;
              return _context2.a(2, mergeId);
            case 1:
              if (!this.doNotAskAgain) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2, toMergeWithTelephonySessionId);
            case 2:
              result = this._modalView.open(this.mergeConfirm, {
                toMergeWithTelephonySessionId: toMergeWithTelephonySessionId
              });
              return _context2.a(2, result.closed.then(function (answer) {
                if (answer) {
                  _nextCore.logger.log('mergeConfirmProcess', answer);
                  if (_typeof(answer) === 'object' && 'doNotAskAgain' in answer) {
                    _this6._setDoNotAskAgain(answer.doNotAskAgain);
                  }
                  return toMergeWithTelephonySessionId;
                }
                return undefined;
              }));
          }
        }, _callee2, this);
      }));
      function mergeConfirmProcess(_x2) {
        return _mergeConfirmProcess.apply(this, arguments);
      }
      return mergeConfirmProcess;
    }()
  }, {
    key: "openParticipantsList",
    value: function openParticipantsList(telephonySessionId) {
      this._modalView.open(this.participantsList, {
        telephonySessionId: telephonySessionId
      });
    }
  }, {
    key: "confirmRemoveParticipant",
    value: function () {
      var _confirmRemoveParticipant = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(partyId, options) {
        var _this7 = this;
        var result;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this.setOpenedPartyId(partyId);
              result = this._modalView.open(this.removeParticipantConfirm, options);
              return _context3.a(2, result.closed.then(function (answer) {
                if (answer) {
                  return _this7._callAction.onActiveActions('removeParticipant', partyId);
                }
              }));
          }
        }, _callee3, this);
      }));
      function confirmRemoveParticipant(_x3, _x4) {
        return _confirmRemoveParticipant.apply(this, arguments);
      }
      return confirmRemoveParticipant;
    }()
  }, {
    key: "leaveConfirmProcess",
    value: function () {
      var _leaveConfirmProcess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var result;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              result = this._modalView.open(this.leaveConfirm);
              return _context4.a(2, result.closed);
          }
        }, _callee4, this);
      }));
      function leaveConfirmProcess() {
        return _leaveConfirmProcess.apply(this, arguments);
      }
      return leaveConfirmProcess;
    }()
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_callAction", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "doNotAskAgain", [_nextCore.userStorage, _nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setDoNotAskAgain", [_nextCore.action, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "_setDoNotAskAgain"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setDoNotAskAgain", [_dec8, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "setDoNotAskAgain"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "openedPartyId", [_nextCore.state, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setOpenedPartyId", [_nextCore.action, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "setOpenedPartyId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mergeCalls", [_nextCore.computed, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "mergeCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "MergeConfirm", [_nextCore.autobind, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "MergeConfirm"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "mergeConfirm", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;
    return this._modalView.create({
      view: function view() {
        var _useModalItemView2 = (0, _views.useModalItemView)(),
          props = _useModalItemView2.props;
        var _ref7 = props.payload,
          toMergeWithTelephonySessionId = _ref7.toMergeWithTelephonySessionId;
        var _useConnector3 = (0, _nextCore.useConnector)(function () {
            return _objectSpread({}, _this8._callAction.getAllInfoByTelephonySessionId(toMergeWithTelephonySessionId));
          }),
          call = _useConnector3.call;
        if (!call) return null;
        return /*#__PURE__*/_react["default"].createElement(_this8.MergeConfirm, {
          call: call
        });
      },
      props: function props() {
        return {
          type: 'drawer',
          header: null,
          disableBackdropClick: false,
          'aria-label': 'merge confirm'
        };
      }
    });
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "leaveConfirm", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return this._modalView.create({
      view: function view() {
        var _useLocale3 = (0, _hooks.useLocale)(_i18n["default"]),
          t = _useLocale3.t;
        var _useModalItemView3 = (0, _views.useModalItemView)(),
          action = _useModalItemView3.action;
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "m-4"
        }, /*#__PURE__*/_react["default"].createElement("h3", {
          "data-sign": "leaveOrEndCallTitle",
          className: "font-bold mb-2 text-center typography-title"
        }, t('leaveOrEndCall')), /*#__PURE__*/_react["default"].createElement("div", {
          className: "flex flex-col gap-2"
        }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
          fullWidth: true,
          size: "xlarge",
          "data-sign": "leaveCall",
          onClick: function onClick() {
            action === null || action === void 0 ? void 0 : action.confirm();
          }
        }, t('leaveCall')), /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
          fullWidth: true,
          size: "xlarge",
          "data-sign": "endCallForEveryone",
          variant: "outlined",
          onClick: function onClick() {
            action === null || action === void 0 ? void 0 : action.cancel();
          }
        }, t('endCallForEveryone'))));
      },
      props: function props() {
        return {
          type: 'drawer',
          header: null,
          disableBackdropClick: false,
          'aria-label': 'confirm leave or end call'
        };
      }
    });
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "removeParticipantConfirm", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this9 = this;
    return this._modalView.create({
      view: function view() {
        var _useLocale4 = (0, _hooks.useLocale)(_i18n["default"]),
          t = _useLocale4.t;
        var _useModalItemView4 = (0, _views.useModalItemView)(),
          props = _useModalItemView4.props,
          action = _useModalItemView4.action;
        var _ref8 = props.payload,
          displayName = _ref8.displayName;
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "m-4",
          "data-sign": "removeParticipantModal"
        }, /*#__PURE__*/_react["default"].createElement("h3", {
          "data-sign": "removeParticipantTitle",
          className: "font-bold typography-title"
        }, t('removeTitle')), /*#__PURE__*/_react["default"].createElement("p", {
          className: "mt-4 mb-8"
        }, /*#__PURE__*/_react["default"].createElement(_components2.FormattedMessage, {
          message: t('removeDescription'),
          values: {
            name: displayName || ''
          }
        })), /*#__PURE__*/_react["default"].createElement("div", {
          className: "flex flex-col gap-2"
        }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
          fullWidth: true,
          size: "xlarge",
          "data-sign": "confirmRemoveButton",
          onClick: function onClick() {
            action === null || action === void 0 ? void 0 : action.confirm();
          }
        }, t('confirmButtonText')), /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
          fullWidth: true,
          size: "xlarge",
          "data-sign": "cancelRemoveButton",
          variant: "outlined",
          onClick: function onClick() {
            action === null || action === void 0 ? void 0 : action.cancel();
          }
        }, t('cancelButtonText'))));
      },
      props: function props() {
        return {
          type: 'drawer',
          header: null,
          disableBackdropClick: false,
          'aria-label': 'confirm remove participant',
          onClose: function onClose() {
            _this9.setOpenedPartyId(null);
          }
        };
      }
    });
  }
}), _applyDecoratedDescriptor(_class2.prototype, "ParticipantsList", [_nextCore.autobind, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "ParticipantsList"), _class2.prototype), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "participantsList", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this0 = this;
    return this._modalView.create({
      view: function view() {
        var _useModalItemView5 = (0, _views.useModalItemView)(),
          props = _useModalItemView5.props;
        var _ref9 = props.payload,
          telephonySessionId = _ref9.telephonySessionId;
        var _useConnector4 = (0, _nextCore.useConnector)(function () {
            return _objectSpread({}, _this0._callAction.getAllInfoByTelephonySessionId(telephonySessionId));
          }),
          call = _useConnector4.call;
        if (!call) return null;
        return /*#__PURE__*/_react["default"].createElement(_this0.ParticipantsList, {
          call: call
        });
      },
      props: function props() {
        return {
          type: 'drawer',
          header: null,
          disableBackdropClick: false,
          'aria-label': 'participants list'
        };
      }
    });
  }
}), _applyDecoratedDescriptor(_class2.prototype, "mergeConfirmProcess", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "mergeConfirmProcess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "confirmRemoveParticipant", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "confirmRemoveParticipant"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "leaveConfirmProcess", [_dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "leaveConfirmProcess"), _class2.prototype), _class2)) || _class) || _class) || _class);
//# sourceMappingURL=ConferenceCallAction.js.map
