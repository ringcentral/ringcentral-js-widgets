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
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericMeetingViewSpring = void 0;
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.pad-start.js");
require("core-js/modules/es.string.search.js");
var _meetingHelper = require("@ringcentral-integration/commons/helpers/meetingHelper");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireWildcard(require("react"));
var _services2 = require("../../services");
var _shared = require("../shared");
var _GenericMeetingPanelSpring = require("./components/GenericMeetingPanelSpring");
var _constants = require("./constants");
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var GenericMeetingViewSpring = exports.GenericMeetingViewSpring = (_dec = (0, _nextCore.injectable)({
  name: 'GenericMeetingViewSpring'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('GenericMeetingViewSpringOptions')(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services2.GenericMeeting === "undefined" ? Object : _services2.GenericMeeting, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.Brand === "undefined" ? Object : _services.Brand, typeof GenericMeetingViewSpringOptions === "undefined" ? Object : GenericMeetingViewSpringOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = /*#__PURE__*/function (_RcViewModule) {
  function GenericMeetingViewSpring(_genericMeeting, _router, _brand, _genericMeetingViewOptions) {
    var _this;
    _classCallCheck(this, GenericMeetingViewSpring);
    _this = _callSuper(this, GenericMeetingViewSpring);
    _this._genericMeeting = _genericMeeting;
    _this._router = _router;
    _this._brand = _brand;
    _this._genericMeetingViewOptions = _genericMeetingViewOptions;
    return _this;
  }
  _inherits(GenericMeetingViewSpring, _RcViewModule);
  return _createClass(GenericMeetingViewSpring, [{
    key: "getUIProps",
    value: function getUIProps() {
      var _this2 = this;
      var meeting = this.meeting;
      var defaultSettings = this._genericMeeting.ready ? this._genericMeeting.defaultSetting : {};

      // Merge meeting with default settings to ensure all fields are present
      var mergedMeeting = _objectSpread(_objectSpread({}, defaultSettings), meeting);

      // Get current meeting data or defaults
      var currentDate = (mergedMeeting === null || mergedMeeting === void 0 ? void 0 : mergedMeeting.startTime) ? new Date(mergedMeeting.startTime) : new Date((0, _meetingHelper.getInitializedStartTime)());

      // RCV meetings have duration directly
      var durationInMinutes = (mergedMeeting === null || mergedMeeting === void 0 ? void 0 : mergedMeeting.duration) || _constants.MEETING_CONFIG.DEFAULT_DURATION_MINUTES;
      var hours = Math.floor(durationInMinutes / 60).toString().padStart(2, '0');
      var minutes = (durationInMinutes % 60).toString().padStart(2, '0');

      // Handle password logic based on personal meeting ID usage
      var isPersonalMeetingEnabled = (mergedMeeting === null || mergedMeeting === void 0 ? void 0 : mergedMeeting.usePersonalMeetingId) || false;

      // Use the utility function for password resolution
      var meetingPassword = this.meetingPassword;

      // Construct personal meeting link from joinUrl
      var personalMeeting = this._genericMeeting.ready ? this._genericMeeting.personalMeeting : null;
      var personalMeetingLink = (0, _constants.constructPersonalMeetingLink)((personalMeeting === null || personalMeeting === void 0 ? void 0 : personalMeeting.joinUri) || (personalMeeting === null || personalMeeting === void 0 ? void 0 : personalMeeting.joinUrl));

      // Calculate disabled states using utility function
      var disabledStates = (0, _shared.calculateDisabledStates)(this._genericMeeting, mergedMeeting);
      return _objectSpread(_objectSpread({
        // Meeting Configuration
        meetingTitle: function () {
          var currentTitle = meeting === null || meeting === void 0 ? void 0 : meeting.name;
          if (currentTitle === undefined || currentTitle === null) {
            return _this2._genericMeeting.ready ? _this2._genericMeeting.defaultTopic : _constants.MEETING_CONFIG.DEFAULT_MEETING_TITLE;
          }
          return currentTitle;
        }(),
        meetingDate: currentDate,
        meetingTime: currentDate,
        meetingDuration: {
          hours: hours,
          minutes: minutes
        },
        // General Settings
        requirePassword: (mergedMeeting === null || mergedMeeting === void 0 ? void 0 : mergedMeeting.isMeetingSecret) || false,
        meetingPassword: meetingPassword,
        whoCanJoin: (0, _shared.getWhoCanJoinValue)(mergedMeeting),
        useWaitingRoom: (mergedMeeting === null || mergedMeeting === void 0 ? void 0 : mergedMeeting.waitingRoomMode) !== 0,
        waitingRoomParticipants: (0, _shared.getWaitingRoomValue)(mergedMeeting),
        startMeetingAfterJoin: !(mergedMeeting === null || mergedMeeting === void 0 ? void 0 : mergedMeeting.allowJoinBeforeHost),
        // Personal Meeting Settings
        isPersonalMeetingEnabled: isPersonalMeetingEnabled,
        personalMeetingLink: personalMeetingLink,
        // UI State
        isLoading: this.showSpinner,
        isUpdating: this._genericMeeting.isUpdating,
        disabled: !this._genericMeeting.ready || this._genericMeeting.isUpdating,
        // Options
        whoCanJoinOptions: (0, _shared.getWhoCanJoinOptions)(this._brand),
        waitingRoomOptions: (0, _shared.getWaitingRoomOptions)(mergedMeeting),
        hourOptions: this.getHourOptions(),
        minuteOptions: this.getMinuteOptions()
      }, disabledStates), {}, {
        brandConfig: this._brand.brandConfig,
        // Additional properties
        isRCV: true
      });
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this3 = this;
      // Create a getter function for settings that accounts for personal meeting toggling
      var getSettings = function getSettings() {
        // The meeting state already contains the correct settings (personal or regular)
        // based on the usePersonalMeetingId toggle, so we just return the current meeting
        return _this3._genericMeeting.meeting;
      };
      return {
        onMeetingTitleChange: function onMeetingTitleChange(title) {
          var meeting = _this3.meeting;
          _this3._genericMeeting.updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), {}, {
            name: title
          }));
          _this3._genericMeeting.updateHasSettingsChanged(true);
        },
        onMeetingDateChange: function onMeetingDateChange(date) {
          var currentMeeting = _this3.meeting;
          var currentStartTime = (currentMeeting === null || currentMeeting === void 0 ? void 0 : currentMeeting.startTime) || (0, _meetingHelper.getInitializedStartTime)();
          var startTimeDate = new Date(currentStartTime);

          // Use the helper function to update only the date part
          var newStartTime = (0, _meetingHelper.updateFullYear)(startTimeDate, date);

          // Make a copy of the meeting object to avoid mutating directly
          var meeting = _objectSpread({}, currentMeeting);
          meeting.startTime = newStartTime; // Use `as any` because TS might expect a specific Date format

          _this3._genericMeeting.updateMeetingSettings(meeting);
          _this3._genericMeeting.updateHasSettingsChanged(true);
        },
        onMeetingTimeChange: function onMeetingTimeChange(time) {
          var currentMeeting = _this3.meeting;
          var currentStartTime = (currentMeeting === null || currentMeeting === void 0 ? void 0 : currentMeeting.startTime) || (0, _meetingHelper.getInitializedStartTime)();
          var startTimeDate = new Date(currentStartTime);

          // Use the helper function to update only the time part
          var newStartTime = (0, _meetingHelper.updateFullTime)(startTimeDate, time);

          // Make a copy of the meeting object to avoid mutating directly
          var meeting = _objectSpread({}, currentMeeting);
          meeting.startTime = newStartTime.getTime(); // Use `as any` because TS might expect a specific Date format

          _this3._genericMeeting.updateMeetingSettings(meeting);
          _this3._genericMeeting.updateHasSettingsChanged(true);
        },
        onMeetingDurationChange: function onMeetingDurationChange(duration) {
          var durationInMinutes = parseInt(duration.hours) * 60 + parseInt(duration.minutes);
          var currentMeeting = _this3.meeting;
          _this3._genericMeeting.updateMeetingSettings(_objectSpread(_objectSpread({}, currentMeeting), {}, {
            duration: durationInMinutes
          }));
          _this3._genericMeeting.updateHasSettingsChanged(true);
        },
        // Use utility functions for common handlers
        onRequirePasswordChange: (0, _shared.createRequirePasswordChangeHandler)(this._genericMeeting, getSettings),
        onPasswordChange: (0, _shared.createPasswordChangeHandler)(this._genericMeeting, getSettings),
        onWhoCanJoinChange: (0, _shared.createWhoCanJoinChangeHandler)(this._genericMeeting, getSettings),
        onUseWaitingRoomChange: (0, _shared.createUseWaitingRoomChangeHandler)(this._genericMeeting, getSettings),
        onWaitingRoomParticipantsChange: (0, _shared.createWaitingRoomParticipantsChangeHandler)(this._genericMeeting, getSettings),
        onStartMeetingAfterJoinChange: (0, _shared.createStartMeetingAfterJoinChangeHandler)(this._genericMeeting, getSettings),
        onPersonalMeetingToggle: function onPersonalMeetingToggle(enabled) {
          _this3._genericMeeting.switchUsePersonalMeetingId(enabled);
          _this3._genericMeeting.updateHasSettingsChanged(true);
        },
        onScheduleMeeting: function () {
          var _onScheduleMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
            var result, _t;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.p = _context.n) {
                case 0:
                  _context.p = 0;
                  _context.n = 1;
                  return _this3._genericMeeting.schedule(_this3.meeting);
                case 1:
                  result = _context.v;
                  return _context.a(2, result);
                case 2:
                  _context.p = 2;
                  _t = _context.v;
                  console.error('Failed to schedule meeting:', _t);
                case 3:
                  return _context.a(2);
              }
            }, _callee, null, [[0, 2]]);
          }));
          function onScheduleMeeting() {
            return _onScheduleMeeting.apply(this, arguments);
          }
          return onScheduleMeeting;
        }(),
        init: function init() {
          return _this3._genericMeeting.init();
        },
        viewPersonalMeetingSettings: function () {
          var _viewPersonalMeetingSettings = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  _context2.n = 1;
                  return _this3._router.push('/meeting/personalMeetingSettings');
                case 1:
                  return _context2.a(2);
              }
            }, _callee2);
          }));
          function viewPersonalMeetingSettings() {
            return _viewPersonalMeetingSettings.apply(this, arguments);
          }
          return viewPersonalMeetingSettings;
        }()
      };
    }
  }, {
    key: "getHourOptions",
    value: function getHourOptions() {
      return (0, _constants.getDurationOptions)().HOURS;
    }
  }, {
    key: "getMinuteOptions",
    value: function getMinuteOptions() {
      return (0, _constants.getDurationOptions)().MINUTES;
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
      var _this4 = this,
        _this$_genericMeeting;
      var navigationState = props.location.search;
      var _useRef = (0, _react.useRef)(this.getUIFunctions()),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        return _objectSpread(_objectSpread({}, _this4.getUIProps()), {}, {
          navigationState: navigationState
        });
      });
      var Component = ((_this$_genericMeeting = this._genericMeetingViewOptions) === null || _this$_genericMeeting === void 0 ? void 0 : _this$_genericMeeting.component) || _GenericMeetingPanelSpring.GenericMeetingPanelSpring;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=GenericMeetingView.view.js.map
