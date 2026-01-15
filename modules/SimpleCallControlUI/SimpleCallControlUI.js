"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleCallControlUI = void 0;
require("core-js/modules/es.function.name.js");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _i18n = _interopRequireDefault(require("../../components/SimpleCallControlPanel/i18n"));
var _utils = require("../../components/SimpleCallControlPanel/utils");
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var SimpleCallControlUI = exports.SimpleCallControlUI = (_dec = (0, _di.Module)({
  name: 'SimpleCallControlUI',
  deps: ['Locale', 'RouterInteraction', 'Brand', 'RegionSettings', 'ActiveCallControl', 'AccountInfo', {
    dep: 'SimpleCallControlUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  function SimpleCallControlUI(deps) {
    _classCallCheck(this, SimpleCallControlUI);
    return _callSuper(this, SimpleCallControlUI, [{
      deps: deps
    }]);
  }
  _inherits(SimpleCallControlUI, _RcUIModuleV);
  return _createClass(SimpleCallControlUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var sessionId = _ref.params.sessionId,
        renderContactName = _ref.renderContactName;
      var activeSession = this._deps.activeCallControl.activeSession;
      var nameMatches = [];
      if (activeSession && !renderContactName) {
        // TODO: check activeSession type
        nameMatches = activeSession.direction === _callDirections["default"].outbound ?
        // @ts-expect-error TS(2339): Property 'toMatches' does not exist on type 'Parti... Remove this comment to see the full error message
        activeSession.toMatches :
        // @ts-expect-error TS(2339): Property 'fromMatches' does not exist on type 'Par... Remove this comment to see the full error message
        activeSession.fromMatches;
      }
      var phoneNumber;
      if (activeSession) {
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        phoneNumber = activeSession.direction === _callDirections["default"].outbound ? activeSession.to : activeSession.from;
      }
      var fallBackName = _i18n["default"].getString('Unknown', this._deps.locale.currentLocale);
      if (renderContactName) {
        var _pickFallBackInfo = (0, _utils.pickFallBackInfo)(activeSession, renderContactName({
            // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
            sessionId: activeSession && activeSession.sessionId,
            telephonySessionId: sessionId
          }), this._deps.locale.currentLocale),
          fallBackNameFromThirdParty = _pickFallBackInfo.fallBackName,
          fallBackNumber = _pickFallBackInfo.fallBackNumber;
        phoneNumber = fallBackNumber;
        fallBackName = fallBackNameFromThirdParty;
      }
      return {
        currentLocale: this._deps.locale.currentLocale,
        activeSession: activeSession,
        sessionId: sessionId,
        areaCode: this._deps.regionSettings.areaCode,
        countryCode: this._deps.regionSettings.countryCode,
        nameMatches: nameMatches,
        // @ts-expect-error TS(2454): Variable 'phoneNumber' is used before being assign... Remove this comment to see the full error message
        phoneNumber: phoneNumber,
        fallBackName: fallBackName,
        brandName: this._deps.brand.name,
        controlBusy: this._deps.activeCallControl.busy,
        maxExtensionNumberLength: this._deps.accountInfo.maxExtensionNumberLength
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;
      var sessionId = _ref2.params.sessionId;
      return {
        onBackButtonClick: function onBackButtonClick() {
          _this._deps.routerInteraction.goBack();
        },
        setActiveSessionId: function setActiveSessionId(sessionId) {
          _this._deps.activeCallControl.setActiveSessionId(sessionId);
        },
        onTransfer: function onTransfer(sessionId) {
          _this._deps.routerInteraction.push("/transfer/".concat(sessionId, "/active"));
        },
        onMute: function onMute() {
          return _this._deps.activeCallControl.mute(sessionId);
        },
        onUnmute: function onUnmute() {
          return _this._deps.activeCallControl.unmute(sessionId);
        },
        onHold: function onHold() {
          return _this._deps.activeCallControl.hold(sessionId);
        },
        onUnhold: function onUnhold() {
          return _this._deps.activeCallControl.unhold(sessionId);
        },
        onHangup: function onHangup() {
          return _this._deps.activeCallControl.hangUp(sessionId);
        }
      };
    }
  }]);
}(_core.RcUIModuleV2)) || _class);
//# sourceMappingURL=SimpleCallControlUI.js.map
