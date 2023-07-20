"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var PhoneNumber = function PhoneNumber(_ref) {
  var formatPhone = _ref.formatPhone,
    usageType = _ref.usageType,
    currentLocale = _ref.currentLocale,
    phoneNumber = _ref.phoneNumber;
  var usageTypeDom = usageType ? /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].usageType
  }, _i18n["default"].getString(usageType, currentLocale)) : null;
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].phoneNumber
  }, usageTypeDom, /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "phoneNumber"
  }, formatPhone(phoneNumber)));
};
PhoneNumber.propTypes = {
  formatPhone: _propTypes["default"].func.isRequired,
  phoneNumber: _propTypes["default"].string,
  usageType: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired
};
PhoneNumber.defaultProps = {
  phoneNumber: null,
  usageType: null
};
// phone number formatting becomes expensive when there are lots of numbers
// memo makes this a pure component to reduce rendering cost
var FromField = /*#__PURE__*/(0, _react.memo)(function FromField(_ref2) {
  var className = _ref2.className,
    fromNumber = _ref2.fromNumber,
    fromNumbers = _ref2.fromNumbers,
    onChange = _ref2.onChange,
    formatPhone = _ref2.formatPhone,
    hidden = _ref2.hidden,
    disabled = _ref2.disabled,
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
  return /*#__PURE__*/_react["default"].createElement(_DropdownSelect["default"], {
    className: (0, _classnames["default"])(_styles["default"].root, className),
    iconClassName: _styles["default"].selectIcon,
    value: fromNumber,
    label: "".concat(_i18n["default"].getString('from', currentLocale), ":"),
    onChange: onChange,
    options: options,
    disabled: disabled,
    renderValue: function renderValue(value) {
      if (value === 'anonymous') {
        return /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('Blocked', currentLocale));
      }
      return /*#__PURE__*/_react["default"].createElement(PhoneNumber, {
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
        return /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('Blocked', currentLocale));
      }
      return /*#__PURE__*/_react["default"].createElement(PhoneNumber, {
        formatPhone: formatPhone,
        phoneNumber: option.phoneNumber,
        usageType: option.usageType,
        currentLocale: currentLocale
      });
    }
  });
});

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'Named... Remove this comment to see the full error message
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
  className: _propTypes["default"].string,
  disabled: _propTypes["default"].bool
};

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'Na... Remove this comment to see the full error message
FromField.defaultProps = {
  fromNumber: null,
  className: undefined,
  showAnonymous: true,
  disabled: false
};
var _default = FromField;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
