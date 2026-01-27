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
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncomingCallView = void 0;
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _IncomingCallView = require("@ringcentral-integration/widgets/components/IncomingCallView");
var _checkShouldHidePhoneNumber = require("@ringcentral-integration/widgets/lib/checkShouldHidePhoneNumber");
var _react = _interopRequireWildcard(require("react"));
var _services4 = require("../../services");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _class, _class2;
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
var IncomingCallView = exports.IncomingCallView = (_dec = (0, _nextCore.injectable)({
  name: 'IncomingCallView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 9);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('IncomingCallViewOptions')(target, undefined, 10);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _services4.Webphone === "undefined" ? Object : _services4.Webphone, typeof _services3.Locale === "undefined" ? Object : _services3.Locale, typeof _services2.ContactSearch === "undefined" ? Object : _services2.ContactSearch, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services4.ForwardingNumber === "undefined" ? Object : _services4.ForwardingNumber, typeof _services3.Brand === "undefined" ? Object : _services3.Brand, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof IncomingCallViewOptions === "undefined" ? Object : IncomingCallViewOptions]), _dec6 = (0, _nextCore.computed)(function (that) {
  return [that._webphone.ringingCallOnView];
}), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec9 = (0, _nextCore.computed)(function (that) {
  var _that$_contactMatcher;
  return [that.currentSession.from, (_that$_contactMatcher = that._contactMatcher) === null || _that$_contactMatcher === void 0 ? void 0 : _that$_contactMatcher.dataMapping];
}), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", []), _dec10 = (0, _nextCore.computed)(function (that) {
  var _that$_contactMatcher2;
  return [that.currentSession.to, (_that$_contactMatcher2 = that._contactMatcher) === null || _that$_contactMatcher2 === void 0 ? void 0 : _that$_contactMatcher2.dataMapping];
}), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function IncomingCallView(_webphone, _locale, _contactSearch, _regionSettings, _forwardingNumber, _brand, _extensionInfo, _appFeatures, _accountInfo, _contactMatcher, _incomingCallViewOptions) {
    var _this;
    _classCallCheck(this, IncomingCallView);
    _this = _callSuper(this, IncomingCallView);
    _this._webphone = _webphone;
    _this._locale = _locale;
    _this._contactSearch = _contactSearch;
    _this._regionSettings = _regionSettings;
    _this._forwardingNumber = _forwardingNumber;
    _this._brand = _brand;
    _this._extensionInfo = _extensionInfo;
    _this._appFeatures = _appFeatures;
    _this._accountInfo = _accountInfo;
    _this._contactMatcher = _contactMatcher;
    _this._incomingCallViewOptions = _incomingCallViewOptions;
    return _this;
  }
  _inherits(IncomingCallView, _RcViewModule);
  return _createClass(IncomingCallView, [{
    key: "currentSession",
    get: function get() {
      var _this$_webphone$ringi;
      return (_this$_webphone$ringi = this._webphone.ringingCallOnView) !== null && _this$_webphone$ringi !== void 0 ? _this$_webphone$ringi : {};
    }
  }, {
    key: "fromMatches",
    get: function get() {
      var _this$_contactMatcher, _this$_contactMatcher2;
      return (_this$_contactMatcher = (_this$_contactMatcher2 = this._contactMatcher) === null || _this$_contactMatcher2 === void 0 ? void 0 : _this$_contactMatcher2.dataMapping[this.currentSession.from]) !== null && _this$_contactMatcher !== void 0 ? _this$_contactMatcher : [];
    }
  }, {
    key: "toMatches",
    get: function get() {
      var _this$_contactMatcher3, _this$_contactMatcher4;
      return (_this$_contactMatcher3 = (_this$_contactMatcher4 = this._contactMatcher) === null || _this$_contactMatcher4 === void 0 ? void 0 : _this$_contactMatcher4.dataMapping[this.currentSession.to]) !== null && _this$_contactMatcher3 !== void 0 ? _this$_contactMatcher3 : [];
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
      if (this._appFeatures.isCDCEnabled && (0, _checkShouldHidePhoneNumber.checkShouldHidePhoneNumber)(phoneNumber, this.nameMatches)) {
        return null;
      }
      return phoneNumber;
    }
  }, {
    key: "name",
    get: function get() {
      return (0, _callLogHelpers.getWebphoneSessionDisplayName)(this.currentSession);
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _ref$showContactDispl = _ref.showContactDisplayPlaceholder,
        showContactDisplayPlaceholder = _ref$showContactDispl === void 0 ? false : _ref$showContactDispl,
        showCallQueueName = _ref.showCallQueueName,
        sourceIcons = _ref.sourceIcons;
      return {
        sourceIcons: sourceIcons,
        brand: this._brand.name,
        nameMatches: this.nameMatches,
        currentLocale: this._locale.currentLocale,
        session: this.currentSession,
        activeSessionId: this._webphone.activeSessionId,
        areaCode: this._regionSettings.areaCode,
        countryCode: this._regionSettings.countryCode,
        forwardingNumbers: this._forwardingNumber.forwardingNumbers,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        searchContactList: this._contactSearch.sortedResult,
        showCallQueueName: showCallQueueName,
        phoneNumber: this.phoneNumber,
        name: this.name
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this2 = this;
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
          var _this2$_extensionInfo, _this2$_extensionInfo2, _this2$_extensionInfo3, _this2$_extensionInfo4, _this2$_extensionInfo5;
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this2._regionSettings.areaCode,
            countryCode: _this2._regionSettings.countryCode,
            siteCode: (_this2$_extensionInfo = (_this2$_extensionInfo2 = _this2._extensionInfo) === null || _this2$_extensionInfo2 === void 0 ? void 0 : (_this2$_extensionInfo3 = _this2$_extensionInfo2.site) === null || _this2$_extensionInfo3 === void 0 ? void 0 : _this2$_extensionInfo3.code) !== null && _this2$_extensionInfo !== void 0 ? _this2$_extensionInfo : '',
            isMultipleSiteEnabled: (_this2$_extensionInfo4 = (_this2$_extensionInfo5 = _this2._extensionInfo) === null || _this2$_extensionInfo5 === void 0 ? void 0 : _this2$_extensionInfo5.isMultipleSiteEnabled) !== null && _this2$_extensionInfo4 !== void 0 ? _this2$_extensionInfo4 : false,
            maxExtensionLength: _this2._accountInfo.maxExtensionNumberLength
          });
        },
        answer: function answer(sessionId) {
          _this2._webphone.answer(sessionId);
        },
        reject: function reject(sessionId) {
          return _this2._webphone.reject(sessionId);
        },
        toVoiceMail: function toVoiceMail(sessionId) {
          return _this2._webphone.toVoiceMail(sessionId);
        },
        onForward: function onForward(sessionId, forwardNumber) {
          return _this2._webphone.forward(sessionId, forwardNumber);
        },
        replyWithMessage: function replyWithMessage(sessionId, message) {
          return _this2._webphone.replyWithMessage(sessionId, message);
        },
        toggleMinimized: function toggleMinimized(sessionId) {
          return _this2._webphone.toggleMinimized(sessionId);
        },
        updateSessionMatchedContact: function updateSessionMatchedContact(sessionId, contact) {
          return _this2._webphone.updateSessionMatchedContact(sessionId, contact);
        },
        getAvatarUrl: getAvatarUrl,
        hangup: function hangup(sessionId) {
          return _this2._webphone.hangup(sessionId);
        },
        onHold: function onHold(sessionId) {
          return _this2._webphone.hold(sessionId);
        },
        searchContact: function searchContact(pattern) {
          return _this2._contactSearch.debouncedSearch({
            searchString: pattern
          });
        }
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_incomingCallVi;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_incomingCallVi = this._incomingCallViewOptions) === null || _this$_incomingCallVi === void 0 ? void 0 : _this$_incomingCallVi.component) || _IncomingCallView.IncomingCallView;

      // TODO: fix type
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "currentSession", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "currentSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fromMatches", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "fromMatches"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toMatches", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "toMatches"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=IncomingCall.view.js.map
