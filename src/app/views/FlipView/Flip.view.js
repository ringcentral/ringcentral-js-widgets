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
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlipView = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _FlipPanel = _interopRequireDefault(require("@ringcentral-integration/widgets/components/FlipPanel"));
var _react = _interopRequireWildcard(require("react"));
var _services3 = require("../../services");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var FlipView = exports.FlipView = (_dec = (0, _nextCore.injectable)({
  name: 'FlipView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('FlipViewOptions')(target, undefined, 6);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services2.Locale === "undefined" ? Object : _services2.Locale, typeof _services3.Webphone === "undefined" ? Object : _services3.Webphone, typeof _services3.ForwardingNumber === "undefined" ? Object : _services3.ForwardingNumber, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof FlipViewOptions === "undefined" ? Object : FlipViewOptions]), _dec5 = (0, _nextCore.computed)(function (that) {
  return [that.sessionId, that._webphone.sessions];
}), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function FlipView(_locale, _webphone, _forwardingNumber, _regionSettings, _router, _accountInfo, _flipViewOptions) {
    var _this;
    _classCallCheck(this, FlipView);
    _this = _callSuper(this, FlipView);
    _this._locale = _locale;
    _this._webphone = _webphone;
    _this._forwardingNumber = _forwardingNumber;
    _this._regionSettings = _regionSettings;
    _this._router = _router;
    _this._accountInfo = _accountInfo;
    _this._flipViewOptions = _flipViewOptions;
    _this.params = {};
    return _this;
  }
  _inherits(FlipView, _RcViewModule);
  return _createClass(FlipView, [{
    key: "sessionId",
    get: function get() {
      return this.params.sessionId;
    }
  }, {
    key: "session",
    get: function get() {
      var _this2 = this;
      return this.sessionId ? this._webphone.sessions.find(function (s) {
        return s.id === _this2.sessionId;
      }) : null;
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var _this$session;
      return {
        sessionId: this.sessionId,
        isOnFlip: !!((_this$session = this.session) === null || _this$session === void 0 ? void 0 : _this$session.isOnFlip),
        currentLocale: this._locale.currentLocale,
        flipNumbers: this._forwardingNumber.flipNumbers,
        session: this.session
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this3 = this;
      return {
        onFlip: function onFlip() {
          var _this3$_webphone;
          return (_this3$_webphone = _this3._webphone).flip.apply(_this3$_webphone, arguments);
        },
        onComplete: function onComplete() {
          var _this3$_webphone2;
          return (_this3$_webphone2 = _this3._webphone).hangup.apply(_this3$_webphone2, arguments);
        },
        onBack: function onBack() {
          return _this3._router.goBack();
        },
        onCallEnd: function onCallEnd() {
          return _this3._router.replace('/dialer');
        },
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this3._regionSettings.areaCode,
            countryCode: _this3._regionSettings.countryCode,
            maxExtensionLength: _this3._accountInfo.maxExtensionNumberLength
          });
        }
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this4 = this,
        _this$_flipViewOption;
      this.params = (0, _nextCore.useParams)();
      var _useRef = (0, _react.useRef)(this.getUIFunctions()),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this4.getUIProps();
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_flipViewOption = this._flipViewOptions) === null || _this$_flipViewOption === void 0 ? void 0 : _this$_flipViewOption.component) || _FlipPanel["default"];
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "session", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "session"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Flip.view.js.map
