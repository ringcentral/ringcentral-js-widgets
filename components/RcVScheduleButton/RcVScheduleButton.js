"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcVScheduleButton = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

var _classnames = _interopRequireDefault(require("classnames"));

var _rcui = require("@ringcentral-integration/rcui");

var _react = _interopRequireDefault(require("react"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getI18nButtonString() {
  return _i18n["default"].getString('schedule');
}

var RcVScheduleButton = function RcVScheduleButton(props) {
  var hidden = props.hidden,
      disabled = props.disabled,
      meeting = props.meeting,
      onClick = props.onClick,
      currentLocale = props.currentLocale,
      showSaveAsDefault = props.showSaveAsDefault,
      update = props.update,
      buttonLabel = props.buttonLabel;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].inviteBox, !hidden ? _styles["default"].withShadow : _styles["default"].onlyButton, showSaveAsDefault ? null : _styles["default"].noCheckbox)
  }, showSaveAsDefault ? /*#__PURE__*/_react["default"].createElement(_rcui.RcCheckbox, {
    color: "primary",
    label: _i18n["default"].getString('saveAsDefault', currentLocale),
    "data-sign": "saveAsDefault",
    checked: meeting.saveAsDefault,
    onChange: function onChange() {
      update(_objectSpread(_objectSpread({}, meeting), {}, {
        saveAsDefault: !meeting.saveAsDefault
      }));
    }
  }) : null, /*#__PURE__*/_react["default"].createElement(_rcui.RcButton, {
    onClick: onClick,
    disabled: disabled,
    "data-sign": "videoScheduleButton",
    fullWidth: true
  }, buttonLabel || getI18nButtonString()));
};

exports.RcVScheduleButton = RcVScheduleButton;
//# sourceMappingURL=RcVScheduleButton.js.map
