"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeInput = exports.MINS = exports.HOURS = exports.DAYS = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _react = _interopRequireDefault(require("react"));

var _Box = require("@ringcentral/juno/es6/components/Box/Box.js");

var _Button = require("@ringcentral/juno/es6/components/Buttons/Button/Button.js");

var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");

var _styledComponents = _interopRequireWildcard(require("@ringcentral/juno/es6/foundation/styled-components.js"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  && {\n    box-shadow: none;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var MINS = 0;
exports.MINS = MINS;
var HOURS = 1;
exports.HOURS = HOURS;
var DAYS = 2;
exports.DAYS = DAYS;
var TimeButton = (0, _styledComponents["default"])(_Button.RcButton)(_templateObject());
TimeButton.defaultProps = {
  size: 'xsmall',
  radius: 'round',
  keepElevation: false
};

var TimeInput = function TimeInput(_ref) {
  var timeValue = _ref.timeValue,
      onTimeValueChange = _ref.onTimeValueChange,
      inputRef = _ref.inputRef,
      currentLocale = _ref.currentLocale,
      timeUnit = _ref.timeUnit,
      onSelectTimeUnit = _ref.onSelectTimeUnit;

  var handleSelectTimeUnit = function handleSelectTimeUnit(e, unit) {
    e.stopPropagation();
    onSelectTimeUnit(unit);
  };

  var theme = (0, _styledComponents.RcUseTheme)();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].timeInput
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].timeValue
  }, /*#__PURE__*/_react["default"].createElement("input", {
    maxLength: 2,
    value: timeValue,
    onChange: onTimeValueChange,
    ref: inputRef
  })), /*#__PURE__*/_react["default"].createElement(_Box.RcBox, {
    marginLeft: (0, _spacing.spacing)(2)({
      theme: theme
    }),
    clone: true
  }, /*#__PURE__*/_react["default"].createElement(TimeButton, {
    onClick: function onClick(e) {
      return handleSelectTimeUnit(e, MINS);
    },
    variant: timeUnit === MINS ? 'contained' : 'text'
  }, _i18n["default"].getString('min', currentLocale))), /*#__PURE__*/_react["default"].createElement(TimeButton, {
    variant: timeUnit === HOURS ? 'contained' : 'text',
    onClick: function onClick(e) {
      return handleSelectTimeUnit(e, HOURS);
    }
  }, _i18n["default"].getString('hours', currentLocale)), /*#__PURE__*/_react["default"].createElement(TimeButton, {
    variant: timeUnit === DAYS ? 'contained' : 'text',
    onClick: function onClick(e) {
      return handleSelectTimeUnit(e, DAYS);
    }
  }, _i18n["default"].getString('days', currentLocale)));
};

exports.TimeInput = TimeInput;
TimeInput.defaultProps = {
  timeValue: '',
  timeUnit: MINS
};
//# sourceMappingURL=TimeInput.js.map
