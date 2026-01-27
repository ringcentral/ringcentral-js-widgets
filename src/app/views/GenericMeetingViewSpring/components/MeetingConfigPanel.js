"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingConfigPanel = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _nextCore = require("@ringcentral-integration/next-core");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _reactUse = require("react-use");
var _i18n = _interopRequireDefault(require("../i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var MeetingConfigPanel = exports.MeetingConfigPanel = function MeetingConfigPanel(_ref) {
  var meetingTitle = _ref.meetingTitle,
    meetingDate = _ref.meetingDate,
    meetingTime = _ref.meetingTime,
    meetingDuration = _ref.meetingDuration,
    hourOptions = _ref.hourOptions,
    minuteOptions = _ref.minuteOptions,
    disabled = _ref.disabled,
    isLoading = _ref.isLoading,
    onMeetingTitleChange = _ref.onMeetingTitleChange,
    onMeetingDateChange = _ref.onMeetingDateChange,
    onMeetingTimeChange = _ref.onMeetingTimeChange,
    onMeetingDurationChange = _ref.onMeetingDurationChange,
    onScheduleMeeting = _ref.onScheduleMeeting;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useAsyncState = (0, _reactHooks.useAsyncState)(meetingTitle, onMeetingTitleChange),
    _useAsyncState2 = _slicedToArray(_useAsyncState, 2),
    meetingTitleState = _useAsyncState2[0],
    setMeetingTitleState = _useAsyncState2[1];
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    scheduleButtonLoading = _useState2[0],
    setScheduleButtonLoading = _useState2[1];
  var mounted = (0, _reactUse.usePromise)();
  var handleScheduleMeeting = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setScheduleButtonLoading(true);
            _context.n = 1;
            return mounted(onScheduleMeeting());
          case 1:
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            _nextCore.logger.error('Failed to schedule meeting:', _t);
          case 3:
            _context.p = 3;
            setScheduleButtonLoading(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function handleScheduleMeeting() {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-2 w-full"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-1 w-full",
    "data-sign": "meetingTitleSection"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-descriptorMini text-neutral-b0"
  }, t('meetingTitle')), /*#__PURE__*/_react["default"].createElement(_springUi.TextField, {
    key: "meeting-title-field",
    fullWidth: true,
    size: "medium",
    value: meetingTitleState,
    onChange: function onChange(e) {
      var newValue = e.target.value;
      setMeetingTitleState(newValue);
    },
    disabled: disabled,
    clearBtn: false
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-descriptorMini text-neutral-b0"
  }, t('date')), /*#__PURE__*/_react["default"].createElement(_springUi.DatePicker, {
    fullWidth: true,
    RootProps: {
      'data-sign': 'meetingDatePicker'
    },
    label: null,
    variant: "outlined",
    value: meetingDate,
    onChange: function onChange(date) {
      if (date) {
        onMeetingDateChange(date);
      }
    },
    size: "medium",
    disabled: disabled,
    clearBtn: false
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-1",
    "data-sign": "meetingTimePickerSection"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-descriptorMini text-neutral-b0"
  }, t('time')), /*#__PURE__*/_react["default"].createElement(_springUi.TimePicker, {
    fullWidth: true,
    RootProps: {
      'data-sign': 'meetingTimePicker'
    },
    isTwelveHourSystem: true,
    variant: "outlined",
    value: meetingTime,
    onChange: function onChange(time) {
      if (time) {
        onMeetingTimeChange(time);
      }
    },
    size: "medium",
    dateMode: true,
    disabled: disabled,
    clearBtn: false
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-1 w-full"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-descriptorMini text-neutral-b0"
  }, t('duration')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-wrap gap-2 w-full"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Select, {
    variant: "outlined",
    size: "medium",
    className: "flex-1 min-w-0",
    "data-sign": "meetingDurationHours",
    value: meetingDuration.hours,
    onChange: function onChange(e) {
      return onMeetingDurationChange({
        hours: e.target.value,
        minutes: meetingDuration.minutes
      });
    },
    renderValue: function renderValue(value) {
      return "".concat(value, " ").concat(t('hour'));
    },
    disabled: disabled
  }, hourOptions.map(function (option) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.Option, {
      key: option.value,
      value: option.value
    }, "".concat(option.value, " ").concat(t('hour')));
  })), /*#__PURE__*/_react["default"].createElement(_springUi.Select, {
    variant: "outlined",
    size: "medium",
    className: "flex-1 min-w-0",
    "data-sign": "meetingDurationMinutes",
    value: meetingDuration.minutes,
    onChange: function onChange(e) {
      return onMeetingDurationChange({
        hours: meetingDuration.hours,
        minutes: e.target.value
      });
    },
    renderValue: function renderValue(value) {
      return "".concat(value, " ").concat(t('minute'));
    },
    disabled: disabled
  }, minuteOptions.map(function (option) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.Option, {
      key: option.value,
      value: option.value
    }, "".concat(option.value, " ").concat(t('minute')));
  })))), /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    fullWidth: true,
    onClick: handleScheduleMeeting,
    disabled: disabled || isLoading || scheduleButtonLoading,
    loading: scheduleButtonLoading,
    "data-sign": "videoScheduleButton"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-subtitleMini text-neutral-high-contrast-b0"
  }, t('scheduleVideoMeeting'))));
};
//# sourceMappingURL=MeetingConfigPanel.js.map
