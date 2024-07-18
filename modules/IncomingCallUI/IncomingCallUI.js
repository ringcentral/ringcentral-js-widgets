"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncomingCallUI = void 0;
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _core = require("@ringcentral-integration/core");
var _checkShouldHidePhoneNumber = require("../../lib/checkShouldHidePhoneNumber");
var _dec, _dec2, _dec3, _dec4, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var IncomingCallUI = (_dec = (0, _di.Module)({
  name: 'IncomingCallUI',
  deps: ['Webphone', 'Locale', 'ContactSearch', 'RegionSettings', 'ForwardingNumber', 'Brand', 'ExtensionInfo', 'AppFeatures', 'AccountInfo', {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'IncomingCallUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.webphone.ringingCallOnView];
}), _dec3 = (0, _core.computed)(function (that) {
  var _that$_deps$contactMa;
  return [that.currentSession.from, (_that$_deps$contactMa = that._deps.contactMatcher) === null || _that$_deps$contactMa === void 0 ? void 0 : _that$_deps$contactMa.dataMapping];
}), _dec4 = (0, _core.computed)(function (that) {
  var _that$_deps$contactMa2;
  return [that.currentSession.to, (_that$_deps$contactMa2 = that._deps.contactMatcher) === null || _that$_deps$contactMa2 === void 0 ? void 0 : _that$_deps$contactMa2.dataMapping];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(IncomingCallUI, _RcUIModuleV);
  var _super = _createSuper(IncomingCallUI);
  function IncomingCallUI(deps) {
    _classCallCheck(this, IncomingCallUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(IncomingCallUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _ref$showContactDispl = _ref.showContactDisplayPlaceholder,
        showContactDisplayPlaceholder = _ref$showContactDispl === void 0 ? false : _ref$showContactDispl,
        _ref$showCallerIdName = _ref.showCallerIdName,
        showCallerIdName = _ref$showCallerIdName === void 0 ? false : _ref$showCallerIdName,
        showCallQueueName = _ref.showCallQueueName,
        sourceIcons = _ref.sourceIcons;
      return {
        sourceIcons: sourceIcons,
        brand: this._deps.brand.name,
        nameMatches: this.nameMatches,
        currentLocale: this._deps.locale.currentLocale,
        session: this.currentSession,
        activeSessionId: this._deps.webphone.activeSessionId,
        areaCode: this._deps.regionSettings.areaCode,
        countryCode: this._deps.regionSettings.countryCode,
        forwardingNumbers: this._deps.forwardingNumber.forwardingNumbers,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        searchContactList: this._deps.contactSearch.sortedResult,
        showCallQueueName: showCallQueueName,
        phoneNumber: this.phoneNumber,
        callerIdName: showCallerIdName ? this.callerIdName : undefined
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;
      var phoneTypeRenderer = _ref2.phoneTypeRenderer,
        phoneSourceNameRenderer = _ref2.phoneSourceNameRenderer,
        _ref2$getAvatarUrl = _ref2.getAvatarUrl,
        getAvatarUrl = _ref2$getAvatarUrl === void 0 ? function () {
          return null;
        } : _ref2$getAvatarUrl;
      return {
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        formatPhone: function formatPhone(phoneNumber) {
          var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3, _this$_deps$extension4, _this$_deps$extension5;
          return (
            // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
            (0, _formatNumber.formatNumber)({
              phoneNumber: phoneNumber,
              areaCode: _this._deps.regionSettings.areaCode,
              countryCode: _this._deps.regionSettings.countryCode,
              siteCode: (_this$_deps$extension = (_this$_deps$extension2 = _this._deps.extensionInfo) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.site) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.code) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : '',
              isMultipleSiteEnabled: (_this$_deps$extension4 = (_this$_deps$extension5 = _this._deps.extensionInfo) === null || _this$_deps$extension5 === void 0 ? void 0 : _this$_deps$extension5.isMultipleSiteEnabled) !== null && _this$_deps$extension4 !== void 0 ? _this$_deps$extension4 : false,
              maxExtensionLength: _this._deps.accountInfo.maxExtensionNumberLength
            })
          );
        },
        answer: function answer(sessionId) {
          var _this$_deps$conferenc;
          (_this$_deps$conferenc = _this._deps.conferenceCall) === null || _this$_deps$conferenc === void 0 ? void 0 : _this$_deps$conferenc.closeMergingPair();
          _this._deps.webphone.answer(sessionId);
        },
        reject: function reject(sessionId) {
          return _this._deps.webphone.reject(sessionId);
        },
        toVoiceMail: function toVoiceMail(sessionId) {
          return _this._deps.webphone.toVoiceMail(sessionId);
        },
        onForward: function onForward(sessionId, forwardNumber) {
          return _this._deps.webphone.forward(sessionId, forwardNumber);
        },
        replyWithMessage: function replyWithMessage(sessionId, message) {
          return _this._deps.webphone.replyWithMessage(sessionId, message);
        },
        toggleMinimized: function toggleMinimized(sessionId) {
          return _this._deps.webphone.toggleMinimized(sessionId);
        },
        updateSessionMatchedContact: function updateSessionMatchedContact(sessionId, contact) {
          return _this._deps.webphone.updateSessionMatchedContact(sessionId, contact);
        },
        getAvatarUrl: getAvatarUrl,
        hangup: function hangup(sessionId) {
          return _this._deps.webphone.hangup(sessionId);
        },
        onHold: function onHold(sessionId) {
          return _this._deps.webphone.hold(sessionId);
        },
        searchContact: function searchContact(pattern) {
          return _this._deps.contactSearch.debouncedSearch({
            searchString: pattern
          });
        }
      };
    }
  }, {
    key: "currentSession",
    get: function get() {
      var _this$_deps$webphone$;
      return (_this$_deps$webphone$ = this._deps.webphone.ringingCallOnView) !== null && _this$_deps$webphone$ !== void 0 ? _this$_deps$webphone$ : {};
    }
  }, {
    key: "fromMatches",
    get: function get() {
      var _this$_deps$contactMa, _this$_deps$contactMa2;
      return (_this$_deps$contactMa = (_this$_deps$contactMa2 = this._deps.contactMatcher) === null || _this$_deps$contactMa2 === void 0 ? void 0 : _this$_deps$contactMa2.dataMapping[this.currentSession.from]) !== null && _this$_deps$contactMa !== void 0 ? _this$_deps$contactMa : [];
    }
  }, {
    key: "toMatches",
    get: function get() {
      var _this$_deps$contactMa3, _this$_deps$contactMa4;
      return (_this$_deps$contactMa3 = (_this$_deps$contactMa4 = this._deps.contactMatcher) === null || _this$_deps$contactMa4 === void 0 ? void 0 : _this$_deps$contactMa4.dataMapping[this.currentSession.to]) !== null && _this$_deps$contactMa3 !== void 0 ? _this$_deps$contactMa3 : [];
    }
  }, {
    key: "nameMatches",
    get: function get() {
      var nameMatches = this.currentSession.direction === _callDirections["default"].outbound ? this.toMatches : this.fromMatches;
      return nameMatches;
    }
  }, {
    key: "phoneNumber",
    get: function get() {
      var phoneNumber = this.currentSession.direction === _callDirections["default"].outbound ? this.currentSession.to : this.currentSession.from;
      if (this._deps.appFeatures.isCDCEnabled && (0, _checkShouldHidePhoneNumber.checkShouldHidePhoneNumber)(phoneNumber, this.nameMatches)) {
        return null;
      }
      return phoneNumber;
    }
  }, {
    key: "callerIdName",
    get: function get() {
      return (0, _callLogHelpers.getWebphoneSessionDisplayName)(this.currentSession);
    }
  }]);
  return IncomingCallUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "currentSession", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "currentSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fromMatches", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "fromMatches"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toMatches", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "toMatches"), _class2.prototype)), _class2)) || _class);
exports.IncomingCallUI = IncomingCallUI;
//# sourceMappingURL=IncomingCallUI.js.map
