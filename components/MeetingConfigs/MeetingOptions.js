"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingOptions = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _MeetingSection = _interopRequireDefault(require("../MeetingSection"));
var _Switch = _interopRequireDefault(require("../Switch"));
var _constants = require("./constants");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var MeetingOptions = function MeetingOptions(_ref) {
  var disabled = _ref.disabled,
    currentLocale = _ref.currentLocale,
    meeting = _ref.meeting,
    update = _ref.update,
    that = _ref.that,
    meetingOptionToggle = _ref.meetingOptionToggle,
    passwordPlaceholderEnable = _ref.passwordPlaceholderEnable;
  var passwordPlaceholder = passwordPlaceholderEnable ? _i18n["default"].getString('password', currentLocale) : '';
  return /*#__PURE__*/_react["default"].createElement(_MeetingSection["default"], {
    title: _i18n["default"].getString('meetingOptions', currentLocale),
    className: _styles["default"].meetingOptions
    // when there is a default meeting password or `allowJoinBeforeHost` toggle opened
    // then expand the meeting option section
    ,
    toggle: meetingOptionToggle || !!meeting.password || meeting.allowJoinBeforeHost,
    withSwitch: true
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingOptionsDiv
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].spaceBetween, _styles["default"].fixTopMargin)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: (0, _classnames["default"])(_styles["default"].labelLight, _styles["default"].defaultShrink)
  }, _i18n["default"].getString('requirePassword', currentLocale)), /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
    disable: disabled,
    checked: meeting._requireMeetingPassword,
    onChange: function onChange(_requireMeetingPassword) {
      if (_requireMeetingPassword) {
        setTimeout(function () {
          that.password.focus();
        }, 100);
      }
      update(_objectSpread(_objectSpread({}, meeting), {}, {
        _requireMeetingPassword: _requireMeetingPassword,
        password: ''
      }));
    },
    dataSign: "requirePasswordToggle"
  })), meeting._requireMeetingPassword || meeting.password ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].passwordBox
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].labelLight
  }, _i18n["default"].getString('password', currentLocale)), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    disabled: disabled,
    placeholder: passwordPlaceholder,
    className: _styles["default"].password,
    ref: function ref(_ref3) {
      that.password = _ref3;
    },
    value: meeting.password || '',
    onChange: function onChange(_ref2) {
      var target = _ref2.target;
      if (_constants.PASSWORD_REGEX.test(target.value)) {
        update(_objectSpread(_objectSpread({}, meeting), {}, {
          password: target.value
        }));
      }
    },
    "data-sign": "requirePasswordInput",
    spellCheck: false
  })) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].spaceBetween, _styles["default"].fixTopMargin)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: (0, _classnames["default"])(_styles["default"].labelLight, _styles["default"].defaultShrink)
  }, _i18n["default"].getString('enableJoinBeforeHost', currentLocale)), /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
    disable: disabled,
    checked: meeting.allowJoinBeforeHost,
    onChange: function onChange(allowJoinBeforeHost) {
      update(_objectSpread(_objectSpread({}, meeting), {}, {
        allowJoinBeforeHost: allowJoinBeforeHost
      }));
    },
    dataSign: "enableJoinToggle"
  }))));
};
exports.MeetingOptions = MeetingOptions;
//# sourceMappingURL=MeetingOptions.js.map
