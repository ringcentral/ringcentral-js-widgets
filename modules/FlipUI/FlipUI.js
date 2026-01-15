"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.map");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlipUI = void 0;
var _contactHelper = require("@ringcentral-integration/commons/lib/contactHelper");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _core = require("@ringcentral-integration/core");
var _dec, _dec2, _class, _class2;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var FlipUI = (_dec = (0, _di.Module)({
  name: 'FlipUI',
  deps: ['Locale', 'Webphone', 'ForwardingNumber', 'ExtensionPhoneNumber', 'RegionSettings', 'RouterInteraction', 'AccountInfo', {
    dep: 'FlipUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.sessionId, that._deps.webphone.sessions];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(FlipUI, _RcUIModuleV);
  var _super = _createSuper(FlipUI);
  function FlipUI(deps) {
    var _this;
    _classCallCheck(this, FlipUI);
    _this = _super.call(this, {
      deps: deps
    });
    _this.sessionId = null;
    return _this;
  }
  _createClass(FlipUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$session,
        _this2 = this;
      var sessionId = _ref.params.sessionId,
        _ref$showCustomPhoneL = _ref.showCustomPhoneLabel,
        showCustomPhoneLabel = _ref$showCustomPhoneL === void 0 ? false : _ref$showCustomPhoneL;
      this.sessionId = sessionId;
      return {
        sessionId: sessionId,
        // @ts-expect-error TS(2339): Property 'isOnFlip' does not exist on type '"" | N... Remove this comment to see the full error message
        isOnFlip: (_this$session = this.session) === null || _this$session === void 0 ? void 0 : _this$session.isOnFlip,
        currentLocale: this._deps.locale.currentLocale,
        flipNumbers: this._deps.forwardingNumber.flipNumbers.map(function (flipNumber) {
          // get phone label from extensionPhoneNumber
          var customLabel;
          if (showCustomPhoneLabel) {
            customLabel = (0, _contactHelper.getExtensionPhoneNumberLabel)(flipNumber.phoneNumber, _this2._deps.extensionPhoneNumber.numbers);
          }
          return _objectSpread(_objectSpread({}, flipNumber), {}, {
            label: customLabel || flipNumber.label
          });
        }),
        // @ts-expect-error TS(2322): Type '"" | NormalizedSession | null | undefined' i... Remove this comment to see the full error message
        session: this.session
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this3 = this;
      return {
        onFlip: function onFlip() {
          var _this3$_deps$webphone;
          return (_this3$_deps$webphone = _this3._deps.webphone).flip.apply(_this3$_deps$webphone, arguments);
        },
        onComplete: function onComplete() {
          var _this3$_deps$webphone2;
          return (_this3$_deps$webphone2 = _this3._deps.webphone).hangup.apply(_this3$_deps$webphone2, arguments);
        },
        onBack: function onBack() {
          return _this3._deps.routerInteraction.goBack();
        },
        onCallEnd: function onCallEnd() {
          return _this3._deps.routerInteraction.replace('/dialer');
        },
        formatPhone: function formatPhone(phoneNumber) {
          return (
            // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
            (0, _formatNumber.formatNumber)({
              phoneNumber: phoneNumber,
              areaCode: _this3._deps.regionSettings.areaCode,
              countryCode: _this3._deps.regionSettings.countryCode,
              maxExtensionLength: _this3._deps.accountInfo.maxExtensionNumberLength
            })
          );
        }
      };
    }
  }, {
    key: "session",
    get: function get() {
      var _this4 = this;
      return this.sessionId && this._deps.webphone.sessions.find(function (s) {
        return s.id === _this4.sessionId;
      });
    }
  }]);
  return FlipUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "session", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "session"), _class2.prototype)), _class2)) || _class);
exports.FlipUI = FlipUI;
//# sourceMappingURL=FlipUI.js.map
