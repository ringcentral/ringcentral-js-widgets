"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
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
    className: (0, _clsx["default"])(_styles["default"].root, className),
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
