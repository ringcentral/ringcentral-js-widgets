"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
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
exports.PersonalMeetingSettingsViewSpring = void 0;
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireWildcard(require("react"));
var _services2 = require("../../services");
var _constants = require("../GenericMeetingViewSpring/constants");
var _shared = require("../shared");
var _PersonalMeetingSettingsPanelSpring = require("./components/PersonalMeetingSettingsPanelSpring");
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
var PersonalMeetingSettingsViewSpring = exports.PersonalMeetingSettingsViewSpring = (_dec = (0, _nextCore.injectable)({
  name: 'PersonalMeetingSettingsViewSpring'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('PersonalMeetingSettingsViewSpringOptions')(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services2.GenericMeeting === "undefined" ? Object : _services2.GenericMeeting, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.Brand === "undefined" ? Object : _services.Brand, typeof PersonalMeetingSettingsViewSpringOptions === "undefined" ? Object : PersonalMeetingSettingsViewSpringOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = /*#__PURE__*/function (_RcViewModule) {
  function PersonalMeetingSettingsViewSpring(_genericMeeting, _router, _brand, _personalMeetingSettingsViewOptions) {
    var _this;
    _classCallCheck(this, PersonalMeetingSettingsViewSpring);
    _this = _callSuper(this, PersonalMeetingSettingsViewSpring);
    _this._genericMeeting = _genericMeeting;
    _this._router = _router;
    _this._brand = _brand;
    _this._personalMeetingSettingsViewOptions = _personalMeetingSettingsViewOptions;
    return _this;
  }
  _inherits(PersonalMeetingSettingsViewSpring, _RcViewModule);
  return _createClass(PersonalMeetingSettingsViewSpring, [{
    key: "getUIProps",
    value: function getUIProps() {
      // Get personal meeting settings
      var personalMeetingSettings = this._genericMeeting.ready ? this._genericMeeting.defaultSetting : {};

      // Get personal meeting data
      var personalMeeting = this._genericMeeting.ready ? this._genericMeeting.meeting : null;
      var mergedMeeting = _objectSpread(_objectSpread({}, personalMeetingSettings), personalMeeting);

      // Construct personal meeting link from joinUrl
      var personalMeetingLink = (0, _constants.constructPersonalMeetingLink)((mergedMeeting === null || mergedMeeting === void 0 ? void 0 : mergedMeeting.joinUri) || (mergedMeeting === null || mergedMeeting === void 0 ? void 0 : mergedMeeting.joinUrl));

      // Get password from personal meeting settings using utility function
      var meetingPassword = this.meetingPassword;

      // Calculate disabled states using utility function
      var disabledStates = (0, _shared.calculateDisabledStates)(this._genericMeeting, mergedMeeting);
      return _objectSpread(_objectSpread({
        // Personal Meeting Settings
        requirePassword: (mergedMeeting === null || mergedMeeting === void 0 ? void 0 : mergedMeeting.isMeetingSecret) || false,
        meetingPassword: meetingPassword,
        whoCanJoin: (0, _shared.getWhoCanJoinValue)(mergedMeeting),
        useWaitingRoom: (mergedMeeting === null || mergedMeeting === void 0 ? void 0 : mergedMeeting.waitingRoomMode) !== 0,
        waitingRoomParticipants: (0, _shared.getWaitingRoomValue)(mergedMeeting),
        startMeetingAfterJoin: !(mergedMeeting === null || mergedMeeting === void 0 ? void 0 : mergedMeeting.allowJoinBeforeHost),
        personalMeetingLink: personalMeetingLink,
        // UI State
        isLoading: this.showSpinner,
        isUpdating: this._genericMeeting.isUpdating,
        disabled: !this._genericMeeting.ready || this._genericMeeting.isUpdating,
        brandConfig: this._brand.brandConfig,
        // Options
        whoCanJoinOptions: (0, _shared.getWhoCanJoinOptions)(this._brand),
        waitingRoomOptions: (0, _shared.getWaitingRoomOptions)(mergedMeeting)
      }, disabledStates), {}, {
        // Explicitly set locked states for clarity
        isRequirePasswordLocked: disabledStates.isRequirePasswordLocked,
        isJoinBeforeHostLocked: disabledStates.isJoinBeforeHostLocked,
        isWaitingRoomLocked: disabledStates.isWaitingRoomLocked,
        isAuthUserTypeLocked: disabledStates.isAuthUserTypeLocked,
        // Additional properties
        isRCV: true
      });
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;
      // Create a getter function that always returns the most current settings
      var getSettings = function getSettings() {
        return _this2._genericMeeting.meeting;
      };
      return {
        // Use factory functions for common handlers
        onRequirePasswordChange: (0, _shared.createRequirePasswordChangeHandler)(this._genericMeeting, getSettings),
        onPasswordChange: (0, _shared.createPasswordChangeHandler)(this._genericMeeting, getSettings),
        onWhoCanJoinChange: (0, _shared.createWhoCanJoinChangeHandler)(this._genericMeeting, getSettings),
        onUseWaitingRoomChange: (0, _shared.createUseWaitingRoomChangeHandler)(this._genericMeeting, getSettings),
        onWaitingRoomParticipantsChange: (0, _shared.createWaitingRoomParticipantsChangeHandler)(this._genericMeeting, getSettings),
        onStartMeetingAfterJoinChange: (0, _shared.createStartMeetingAfterJoinChangeHandler)(this._genericMeeting, getSettings),
        onBackClick: function onBackClick() {
          _this2._router.push('/meeting?from=personalMeetingSettings');
        }
      };
    }
  }, {
    key: "meeting",
    get: function get() {
      var defaultValue = {};
      if (!this._genericMeeting.ready) return defaultValue;
      return this._genericMeeting.meeting || defaultValue;
    }
  }, {
    key: "meetingPassword",
    get: function get() {
      return this.meeting.meetingPassword || '';
    }
  }, {
    key: "showSpinner",
    get: function get() {
      return !this._genericMeeting.ready;
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_personalMeetin;
      var _useRef = (0, _react.useRef)(this.getUIFunctions()),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        return _this3.getUIProps();
      });
      var Component = ((_this$_personalMeetin = this._personalMeetingSettingsViewOptions) === null || _this$_personalMeetin === void 0 ? void 0 : _this$_personalMeetin.component) || _PersonalMeetingSettingsPanelSpring.PersonalMeetingSettingsPanelSpring;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=PersonalMeetingSettings.view.js.map
