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
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlipUI = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
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
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var FlipUI = exports.FlipUI = (_dec = (0, _di.Module)({
  name: 'FlipUI',
  deps: ['Locale', 'Webphone', 'ForwardingNumber', 'ExtensionPhoneNumber', 'RegionSettings', 'RouterInteraction', 'AccountInfo', {
    dep: 'FlipUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.sessionId, that._deps.webphone.sessions];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  function FlipUI(deps) {
    var _this;
    _classCallCheck(this, FlipUI);
    _this = _callSuper(this, FlipUI, [{
      deps: deps
    }]);
    _this.sessionId = null;
    return _this;
  }
  _inherits(FlipUI, _RcUIModuleV);
  return _createClass(FlipUI, [{
    key: "session",
    get: function get() {
      var _this2 = this;
      return this.sessionId && this._deps.webphone.sessions.find(function (s) {
        return s.id === _this2.sessionId;
      });
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$session,
        _this3 = this;
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
            customLabel = (0, _contactHelper.getExtensionPhoneNumberLabel)(flipNumber.phoneNumber, _this3._deps.extensionPhoneNumber.numbers);
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
      var _this4 = this;
      return {
        onFlip: function onFlip() {
          var _this4$_deps$webphone;
          return (_this4$_deps$webphone = _this4._deps.webphone).flip.apply(_this4$_deps$webphone, arguments);
        },
        onComplete: function onComplete() {
          var _this4$_deps$webphone2;
          return (_this4$_deps$webphone2 = _this4._deps.webphone).hangup.apply(_this4$_deps$webphone2, arguments);
        },
        onBack: function onBack() {
          return _this4._deps.routerInteraction.goBack();
        },
        onCallEnd: function onCallEnd() {
          return _this4._deps.routerInteraction.replace('/dialer');
        },
        formatPhone: function formatPhone(phoneNumber) {
          return (
            // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
            (0, _formatNumber.formatNumber)({
              phoneNumber: phoneNumber,
              areaCode: _this4._deps.regionSettings.areaCode,
              countryCode: _this4._deps.regionSettings.countryCode,
              maxExtensionLength: _this4._deps.accountInfo.maxExtensionNumberLength
            })
          );
        }
      };
    }
  }]);
}(_core.RcUIModuleV2), _applyDecoratedDescriptor(_class2.prototype, "session", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "session"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=FlipUI.js.map
