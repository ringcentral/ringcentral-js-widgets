"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.join");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Video = exports.AudioOptionsDropdown = exports.AudioOptionsCheckbox = exports.AudioOptions = void 0;
require("react-widgets/dist/css/react-widgets.css");
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _CheckBox = _interopRequireDefault(require("../CheckBox"));
var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));
var _MeetingSection = _interopRequireDefault(require("../MeetingSection"));
var _Switch = _interopRequireDefault(require("../Switch"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Video = function Video(_ref) {
  var disabled = _ref.disabled,
    currentLocale = _ref.currentLocale,
    meeting = _ref.meeting,
    update = _ref.update;
  return /*#__PURE__*/_react["default"].createElement(_MeetingSection["default"], {
    title: _i18n["default"].getString('video', currentLocale),
    withSwitch: true
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].videoDiv
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].labelLight, _styles["default"].fixTopMargin, _styles["default"].videoDescribe)
  }, _i18n["default"].getString('videoDescribe', currentLocale)), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].spaceBetween, _styles["default"].fixTopMargin)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].labelLight
  }, _i18n["default"].getString('host', currentLocale)), /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
    disable: disabled,
    checked: meeting.startHostVideo,
    onChange: function onChange(startHostVideo) {
      update(_objectSpread(_objectSpread({}, meeting), {}, {
        startHostVideo: startHostVideo
      }));
    },
    dataSign: "videoHostToggle"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].spaceBetween, _styles["default"].fixTopMargin)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].labelLight
  }, _i18n["default"].getString('participants', currentLocale)), /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
    disable: disabled,
    checked: meeting.startParticipantsVideo,
    onChange: function onChange(startParticipantsVideo) {
      update(_objectSpread(_objectSpread({}, meeting), {}, {
        startParticipantsVideo: startParticipantsVideo
      }));
    },
    dataSign: "videoParticipantToggle"
  }))));
};
exports.Video = Video;
var AudioOptionsCheckbox = function AudioOptionsCheckbox(_ref2) {
  var disabled = _ref2.disabled,
    update = _ref2.update,
    meeting = _ref2.meeting,
    data = _ref2.data;
  return /*#__PURE__*/_react["default"].createElement(_CheckBox["default"], {
    disabled: disabled,
    onSelect: function onSelect(_ref3) {
      var key = _ref3.key;
      var audioOptions = key.split('_');
      update(_objectSpread(_objectSpread({}, meeting), {}, {
        audioOptions: audioOptions
      }));
    },
    valueField: "key",
    textField: "text",
    selected: meeting.audioOptions.join('_'),
    data: data
  });
};
exports.AudioOptionsCheckbox = AudioOptionsCheckbox;
var AudioOptionsDropdown = function AudioOptionsDropdown(_ref4) {
  var disabled = _ref4.disabled,
    update = _ref4.update,
    meeting = _ref4.meeting,
    data = _ref4.data;
  return /*#__PURE__*/_react["default"].createElement(_DropdownSelect["default"], {
    disabled: disabled,
    className: (0, _classnames["default"])(_styles["default"].dropdownSelect),
    value: meeting.audioOptions.join('_'),
    onChange: function onChange(_ref5) {
      var key = _ref5.key;
      var audioOptions = key.split('_');
      update(_objectSpread(_objectSpread({}, meeting), {}, {
        audioOptions: audioOptions
      }));
    },
    options: data,
    valueFunction: function valueFunction(option) {
      return option.text;
    },
    renderValue: function renderValue(value) {
      return data.find(function (item) {
        return item.key === value;
      }).text;
    },
    renderFunction: function renderFunction(option) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        title: option.text
      }, option.text);
    },
    dropdownAlign: "left",
    titleEnabled: true
  });
};
exports.AudioOptionsDropdown = AudioOptionsDropdown;
var AudioOptions = function AudioOptions(_ref6) {
  var disabled = _ref6.disabled,
    currentLocale = _ref6.currentLocale,
    update = _ref6.update,
    meeting = _ref6.meeting,
    data = _ref6.data,
    audioOptionToggle = _ref6.audioOptionToggle;
  var audioOptions = audioOptionToggle ? /*#__PURE__*/_react["default"].createElement(AudioOptionsDropdown, {
    disabled: disabled,
    update: update,
    meeting: meeting,
    data: data
  }) : /*#__PURE__*/_react["default"].createElement(AudioOptionsCheckbox, {
    disabled: disabled,
    update: update,
    meeting: meeting,
    data: data
  });
  return /*#__PURE__*/_react["default"].createElement(_MeetingSection["default"], {
    title: _i18n["default"].getString('audioOptions', currentLocale),
    withSwitch: true
  }, audioOptions);
};
exports.AudioOptions = AudioOptions;
//# sourceMappingURL=VideoAudioOptions.js.map
