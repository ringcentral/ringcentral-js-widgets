"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallingSettingsView = void 0;
require("core-js/modules/es.function.name.js");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _CallingSettingsPanel = require("@ringcentral-integration/widgets/components/CallingSettingsPanel");
var _react = _interopRequireWildcard(require("react"));
var _CallingSettingsPanel2 = require("./CallingSettingsPanel");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var CallingSettingsView = exports.CallingSettingsView = (_dec = (0, _nextCore.injectable)({
  name: 'CallingSettingsView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('CallingSettingsViewOptions')(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services.Brand === "undefined" ? Object : _services.Brand, typeof _services.Locale === "undefined" ? Object : _services.Locale, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof CallingSettingsViewOptions === "undefined" ? Object : CallingSettingsViewOptions]), _dec5 = (0, _nextCore.dynamic)('Theme'), _dec6 = Reflect.metadata("design:type", typeof Theme === "undefined" ? Object : Theme), _dec7 = (0, _nextCore.dynamic)('CallingSettings'), _dec8 = Reflect.metadata("design:type", typeof CallingSettings === "undefined" ? Object : CallingSettings), _dec9 = (0, _nextCore.dynamic)('Webphone'), _dec0 = Reflect.metadata("design:type", typeof Webphone === "undefined" ? Object : Webphone), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function CallingSettingsView(_brand, _locale, _router, _callingSettingsViewOptions) {
    var _this;
    _classCallCheck(this, CallingSettingsView);
    _this = _callSuper(this, CallingSettingsView);
    _this._brand = _brand;
    _this._locale = _locale;
    _this._router = _router;
    _this._callingSettingsViewOptions = _callingSettingsViewOptions;
    _initializerDefineProperty(_this, "_theme", _descriptor, _this);
    _initializerDefineProperty(_this, "_callingSettings", _descriptor2, _this);
    _initializerDefineProperty(_this, "_webphone", _descriptor3, _this);
    return _this;
  }
  _inherits(CallingSettingsView, _RcViewModule);
  return _createClass(CallingSettingsView, [{
    key: "showSetting",
    get: function get() {
      return !!this._callingSettings;
    }
  }, {
    key: "showSpinner",
    get: function get() {
      var _this$_callingSetting;
      return !(((_this$_callingSetting = this._callingSettings) === null || _this$_callingSetting === void 0 ? void 0 : _this$_callingSetting.ready) && this._brand.ready && this._locale.ready && (!this._webphone || this._webphone.ready));
    }
  }, {
    key: "locationSearchable",
    get: function get() {
      var _this$_callingSetting2, _this$_callingSetting3;
      return !!((_this$_callingSetting2 = (_this$_callingSetting3 = this._callingSettingsViewOptions) === null || _this$_callingSetting3 === void 0 ? void 0 : _this$_callingSetting3.locationSearchable) !== null && _this$_callingSetting2 !== void 0 ? _this$_callingSetting2 : true);
    }
  }, {
    key: "ringtoneSettings",
    get: function get() {
      var _this$_callingSetting4, _this$_callingSetting5;
      return !!((_this$_callingSetting4 = (_this$_callingSetting5 = this._callingSettingsViewOptions) === null || _this$_callingSetting5 === void 0 ? void 0 : _this$_callingSetting5.ringtoneSettings) !== null && _this$_callingSetting4 !== void 0 ? _this$_callingSetting4 : false);
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(props) {
      var _this$_callingSetting6, _this$_callingSetting7, _this$_webphone, _this$_webphone2, _this$_webphone3, _this$_webphone4, _this$_webphone5, _this$_webphone6, _this$_webphone7, _this$_webphone8, _this$_brand$brandCon;
      return {
        currentLocale: this._locale.currentLocale,
        callWithOptions: this._callingSettings.callWithOptions,
        callWith: this._callingSettings.callWith,
        myLocation: this._callingSettings.myLocation,
        ringoutPrompt: this._callingSettings.ringoutPrompt,
        defaultRingoutPrompt: this._callingSettings.defaultRingoutPrompt,
        availableNumbersWithLabel: this._callingSettings.availableNumbersWithLabel,
        disabled: (_this$_callingSetting6 = (_this$_callingSetting7 = this._callingSettingsViewOptions) === null || _this$_callingSetting7 === void 0 ? void 0 : _this$_callingSetting7.disabled) !== null && _this$_callingSetting6 !== void 0 ? _this$_callingSetting6 : !!(this._webphone && this._webphone.sessions.length > 0),
        showSpinner:
        // in spring-ui, we don't show spinner in calling settings panel
        process.env.THEME_SYSTEM !== 'spring-ui' && this.showSpinner,
        locationSearchable: this.locationSearchable,
        showRingToneSettings: this.ringtoneSettings && this._callingSettings.isChangeRingToneAllowed,
        incomingAudioFile: (_this$_webphone = this._webphone) === null || _this$_webphone === void 0 ? void 0 : _this$_webphone.incomingAudioFile,
        incomingAudio: (_this$_webphone2 = this._webphone) === null || _this$_webphone2 === void 0 ? void 0 : _this$_webphone2.incomingAudio,
        outgoingAudioFile: (_this$_webphone3 = this._webphone) === null || _this$_webphone3 === void 0 ? void 0 : _this$_webphone3.outgoingAudioFile,
        outgoingAudio: (_this$_webphone4 = this._webphone) === null || _this$_webphone4 === void 0 ? void 0 : _this$_webphone4.outgoingAudio,
        defaultIncomingAudioFile: (_this$_webphone5 = this._webphone) === null || _this$_webphone5 === void 0 ? void 0 : _this$_webphone5.defaultIncomingAudioFile,
        defaultIncomingAudio: (_this$_webphone6 = this._webphone) === null || _this$_webphone6 === void 0 ? void 0 : _this$_webphone6.defaultIncomingAudio,
        defaultOutgoingAudioFile: (_this$_webphone7 = this._webphone) === null || _this$_webphone7 === void 0 ? void 0 : _this$_webphone7.outgoingAudioFile,
        defaultOutgoingAudio: (_this$_webphone8 = this._webphone) === null || _this$_webphone8 === void 0 ? void 0 : _this$_webphone8.outgoingAudio,
        jupiterAppName: this._callingSettings.jupiterAppName,
        softphoneAppName: (_this$_brand$brandCon = this._brand.brandConfig.callWithSoftphone) === null || _this$_brand$brandCon === void 0 ? void 0 : _this$_brand$brandCon.name
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(props) {
      var _this2 = this;
      return {
        onBackButtonClick: function onBackButtonClick() {
          var _this2$_theme;
          return (0, _views.slideOutViewTransition)(function () {
            return _this2._router.goBack();
          }, (_this2$_theme = _this2._theme) === null || _this2$_theme === void 0 ? void 0 : _this2$_theme.reducedMotion);
        },
        onSave: function onSave(_ref) {
          var callWith = _ref.callWith,
            myLocation = _ref.myLocation,
            ringoutPrompt = _ref.ringoutPrompt,
            incomingAudio = _ref.incomingAudio,
            incomingAudioFile = _ref.incomingAudioFile,
            outgoingAudio = _ref.outgoingAudio,
            outgoingAudioFile = _ref.outgoingAudioFile;
          _this2._callingSettings.setData({
            callWith: callWith,
            myLocation: myLocation,
            ringoutPrompt: ringoutPrompt
          }, true);
          if (_this2._webphone && callWith === _this2._callingSettings.callingOptions.browser) {
            _this2._webphone.setRingtone({
              incomingAudio: incomingAudio,
              incomingAudioFile: incomingAudioFile,
              outgoingAudio: outgoingAudio,
              outgoingAudioFile: outgoingAudioFile
            });
          }
        }
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_callingSetting9;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        var _this$_callingSetting8;
        var _Component = ((_this$_callingSetting8 = this._callingSettingsViewOptions) === null || _this$_callingSetting8 === void 0 ? void 0 : _this$_callingSetting8.component) || _CallingSettingsPanel2.CallingSettingsPanel;
        return /*#__PURE__*/_react["default"].createElement(_Component, _extends({}, _props, uiFunctions));
      }
      var Component = ((_this$_callingSetting9 = this._callingSettingsViewOptions) === null || _this$_callingSetting9 === void 0 ? void 0 : _this$_callingSetting9.component) || _CallingSettingsPanel.CallingSettingsPanel;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_theme", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_callingSettings", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_webphone", [_dec9, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallingSettings.view.js.map
