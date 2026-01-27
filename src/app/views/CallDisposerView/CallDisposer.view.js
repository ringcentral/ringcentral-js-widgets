"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
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
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
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
exports.CallDisposerView = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _SaveLogButton = _interopRequireDefault(require("@ringcentral-integration/widgets/components/SaveLogButton"));
var _react = _interopRequireWildcard(require("react"));
var _CallLogPanelSimple = _interopRequireDefault(require("../../components/CallLogPanelSimple"));
var _services3 = require("../../services");
var _CallLogCallCtrlView = require("../CallLogCallCtrlView");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _class, _class2;
/* eslint-disable @typescript-eslint/no-explicit-any */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
var CallDisposerView = exports.CallDisposerView = (_dec = (0, _nextCore.injectable)({
  name: 'CallDisposerView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('CallLogViewOptions')(target, undefined, 12);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 13);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _services2.Locale === "undefined" ? Object : _services2.Locale, typeof _services.RateLimiter === "undefined" ? Object : _services.RateLimiter, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services2.DateTimeFormat === "undefined" ? Object : _services2.DateTimeFormat, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.ConnectivityMonitor === "undefined" ? Object : _services.ConnectivityMonitor, typeof _services3.CallingSettings === "undefined" ? Object : _services3.CallingSettings, typeof _services3.ForwardingNumber === "undefined" ? Object : _services3.ForwardingNumber, typeof _services3.CallMonitor === "undefined" ? Object : _services3.CallMonitor, typeof _services3.CallHistory === "undefined" ? Object : _services3.CallHistory, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof CallDisposerViewOptions === "undefined" ? Object : CallDisposerViewOptions, typeof _CallLogCallCtrlView.CallLogCallCtrlView === "undefined" ? Object : _CallLogCallCtrlView.CallLogCallCtrlView]), _dec6 = (0, _services.track)(_trackEvents.trackEvents.clickParticipantsIcon), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec9 = (0, _services.track)(_trackEvents.trackEvents.clickRemoveParticipant), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", []), _dec10 = (0, _nextCore.computed)(function (that) {
  return [that._callMonitor.allCalls, that._callHistory.calls, that.currentTelephonySessionId];
}), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function CallDisposerView(_locale, _rateLimiter, _regionSettings, _dateTimeFormat, _router, _appFeatures, _connectivityMonitor, _callingSettings, _forwardingNumber, _callMonitor, _callHistory, _accountInfo, _callDisposerViewOptions, _callLogCallCtrlView) {
    var _this;
    _classCallCheck(this, CallDisposerView);
    _this = _callSuper(this, CallDisposerView);
    _this._locale = _locale;
    _this._rateLimiter = _rateLimiter;
    _this._regionSettings = _regionSettings;
    _this._dateTimeFormat = _dateTimeFormat;
    _this._router = _router;
    _this._appFeatures = _appFeatures;
    _this._connectivityMonitor = _connectivityMonitor;
    _this._callingSettings = _callingSettings;
    _this._forwardingNumber = _forwardingNumber;
    _this._callMonitor = _callMonitor;
    _this._callHistory = _callHistory;
    _this._accountInfo = _accountInfo;
    _this._callDisposerViewOptions = _callDisposerViewOptions;
    _this._callLogCallCtrlView = _callLogCallCtrlView;
    _this.params = {};
    _this.currentTelephonySessionId = undefined;
    _this.formRef = void 0;
    return _this;
  }
  _inherits(CallDisposerView, _RcViewModule);
  return _createClass(CallDisposerView, [{
    key: "getUIProps",
    value: function getUIProps(props) {
      this.currentTelephonySessionId = this.params.telephonySessionId;
      var call = this.currentCall;
      return {
        schema: {
          type: 'object',
          required: ['subject'],
          properties: {
            subject: {
              type: 'string',
              title: 'Subject',
              "default": 'IBC: +15012140016'
            },
            description: {
              type: 'string',
              title: 'Note',
              "default": undefined
            }
          }
        },
        currentLog: {
          call: call,
          logName: 'hell world',
          currentLogCall: {},
          customLogFields: [],
          task: {
            subject: 'IBC: +15012140016',
            description: undefined
          }
        },
        currentLocale: this._locale.currentLocale,
        header: true,
        showSpinner: !(this._locale.ready && this._regionSettings.ready && this._dateTimeFormat.ready && this._appFeatures.ready),
        disableLinks: !this._connectivityMonitor.connectivity || this._rateLimiter.restricted,
        forwardingNumbers: this._forwardingNumber.forwardingNumbers
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(props) {
      var _this2 = this;
      var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
        t = _useLocale.t;
      return {
        onSaveCallLog: function onSaveCallLog() {
          var _this2$formRef, _this2$formRef$curren;
          (_this2$formRef = _this2.formRef) === null || _this2$formRef === void 0 ? void 0 : (_this2$formRef$curren = _this2$formRef.current) === null || _this2$formRef$curren === void 0 ? void 0 : _this2$formRef$curren.submit();
        },
        // @ts-ignore
        onSubmitCallLog: function onSubmitCallLog(_ref) {
          var formData = _ref.formData;
          console.log('Data submitted: ', formData);
        },
        // @ts-ignore
        onUpdateCallLog: function onUpdateCallLog(_ref2) {
          var formData = _ref2.formData;
          console.log('Data updated: ', formData);
        },
        // renderEditLogSection: renderEditLogSection(),
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this2._regionSettings.areaCode,
            countryCode: _this2._regionSettings.countryCode,
            maxExtensionLength: _this2._accountInfo.maxExtensionNumberLength
          }) || t('unknown');
        },
        goBack: function goBack() {
          _this2._router.goBack();
        },
        // TODO: fix types
        renderSaveLogButton: function renderSaveLogButton(props) {
          return /*#__PURE__*/_react["default"].createElement(_SaveLogButton["default"], props);
        },
        // TODO: fix types
        dateTimeFormatter: function dateTimeFormatter(_ref3) {
          var utcTimestamp = _ref3.utcTimestamp;
          return _this2._dateTimeFormat.formatDateTime({
            utcTimestamp: utcTimestamp,
            name: 'CALL_LOG_DATETIME_FORMATTER'
          });
        }
      };
    }
  }, {
    key: "clickParticipantsIconTrack",
    value: function clickParticipantsIconTrack() {
      //
    }
  }, {
    key: "clickRemoveParticipantTrack",
    value: function clickRemoveParticipantTrack() {
      //
    }
  }, {
    key: "currentCall",
    get: function get() {
      var _this3 = this;
      return [].concat(_toConsumableArray(this._callMonitor.allCalls), _toConsumableArray(this._callHistory.calls)).find(function (call) {
        return call.telephonySessionId === _this3.currentTelephonySessionId;
      }) || {};
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this4 = this,
        _this$_callDisposerVi;
      this.params = (0, _nextCore.useParams)();
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this4.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_callDisposerVi = this._callDisposerViewOptions) === null || _this$_callDisposerVi === void 0 ? void 0 : _this$_callDisposerVi.component) || _CallLogPanelSimple["default"];
      this.formRef = (0, _react.useRef)();
      // @ts-ignore
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions, {
        formRef: this.formRef
      }));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "clickParticipantsIconTrack", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "clickParticipantsIconTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clickRemoveParticipantTrack", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "clickRemoveParticipantTrack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentCall", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "currentCall"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallDisposer.view.js.map
