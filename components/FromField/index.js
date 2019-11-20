"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function PhoneNumber(_ref) {
  var formatPhone = _ref.formatPhone,
      usageType = _ref.usageType,
      currentLocale = _ref.currentLocale,
      phoneNumber = _ref.phoneNumber;
  var usageTypeDom = usageType ? _react["default"].createElement("span", {
    className: _styles["default"].usageType
  }, _i18n["default"].getString(usageType, currentLocale)) : null;
  return _react["default"].createElement("span", {
    className: _styles["default"].phoneNumber
  }, usageTypeDom, _react["default"].createElement("span", null, formatPhone(phoneNumber)));
}

PhoneNumber.propTypes = {
  formatPhone: _propTypes["default"].func.isRequired,
  phoneNumber: _propTypes["default"].string,
  usageType: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired
};
PhoneNumber.defaultProps = {
  phoneNumber: null,
  usageType: null
}; // phone number formatting becomes expensive when there are lots of numbers
// memo makes this a pure component to reduce rendering cost

var FromField = (0, _react.memo)(function FromField(_ref2) {
  var className = _ref2.className,
      fromNumber = _ref2.fromNumber,
      fromNumbers = _ref2.fromNumbers,
      onChange = _ref2.onChange,
      formatPhone = _ref2.formatPhone,
      hidden = _ref2.hidden,
      showAnonymous = _ref2.showAnonymous,
      currentLocale = _ref2.currentLocale;

  if (hidden) {
    return null;
  }

  var options = _toConsumableArray(fromNumbers);

  if (showAnonymous) {
    options.push({
      phoneNumber: 'anonymous'
    });
  }

  return _react["default"].createElement(_DropdownSelect["default"], {
    className: (0, _classnames["default"])(_styles["default"].root, className),
    iconClassName: _styles["default"].selectIcon,
    value: fromNumber,
    label: "".concat(_i18n["default"].getString('from', currentLocale), ":"),
    onChange: onChange,
    options: options,
    renderValue: function renderValue(value) {
      if (value === 'anonymous') {
        return _react["default"].createElement("span", null, _i18n["default"].getString('Blocked', currentLocale));
      }

      return _react["default"].createElement(PhoneNumber, {
        formatPhone: formatPhone,
        phoneNumber: value,
        currentLocale: currentLocale
      });
    },
    valueFunction: function valueFunction(option) {
      return option.phoneNumber;
    },
    renderFunction: function renderFunction(option) {
      if (option.phoneNumber === 'anonymous') {
        return _react["default"].createElement("span", null, _i18n["default"].getString('Blocked', currentLocale));
      }

      return _react["default"].createElement(PhoneNumber, {
        formatPhone: formatPhone,
        phoneNumber: option.phoneNumber,
        usageType: option.usageType,
        currentLocale: currentLocale
      });
    }
  });
});
FromField.propTypes = {
  fromNumber: _propTypes["default"].string,
  formatPhone: _propTypes["default"].func.isRequired,
  fromNumbers: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    phoneNumber: _propTypes["default"].string,
    usageType: _propTypes["default"].string
  })).isRequired,
  onChange: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  hidden: _propTypes["default"].bool.isRequired,
  showAnonymous: _propTypes["default"].bool,
  className: _propTypes["default"].string
};
FromField.defaultProps = {
  fromNumber: null,
  className: undefined,
  showAnonymous: true
};
var _default = FromField;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
