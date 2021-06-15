"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Option = void 0;

require("core-js/modules/es6.object.define-property");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Option = function Option(_ref) {
  var _option$data$icon, _option$data;

  var option = _ref.option,
      isOption = _ref.isOption,
      _ref$stylesFromProps = _ref.stylesFromProps,
      stylesFromProps = _ref$stylesFromProps === void 0 ? {} : _ref$stylesFromProps;

  var currentStyles = _objectSpread(_objectSpread({}, _styles["default"]), stylesFromProps);

  var icon = (_option$data$icon = option === null || option === void 0 ? void 0 : (_option$data = option.data) === null || _option$data === void 0 ? void 0 : _option$data.icon) !== null && _option$data$icon !== void 0 ? _option$data$icon : null;
  var _option$disabled = option.disabled,
      disabled = _option$disabled === void 0 ? false : _option$disabled,
      dataSign = option.dataSign;
  return /*#__PURE__*/_react["default"].createElement("div", {
    title: option.text,
    "data-sign": dataSign,
    className: (0, _classnames["default"])(disabled ? currentStyles.disabled : null, isOption && !disabled ? currentStyles.option : currentStyles.value)
  }, icon ? /*#__PURE__*/_react["default"].createElement("i", {
    dangerouslySetInnerHTML: {
      __html: icon
    },
    role: "presentation",
    className: (0, _classnames["default"])([currentStyles.icon, currentStyles.marginRight5])
  }) : null, /*#__PURE__*/_react["default"].createElement("span", null, option.text));
};

exports.Option = Option;
//# sourceMappingURL=DropdownSelectOptions.js.map
