"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickList = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _MenuItem = require("@ringcentral/juno/es6/components/Menu/MenuItem/MenuItem.js");

var _Select = require("@ringcentral/juno/es6/components/Forms/Select/Select.js");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var PickList = function PickList(_ref) {
  var options = _ref.options,
      _ref$optionValueKey = _ref.optionValueKey,
      optionValueKey = _ref$optionValueKey === void 0 ? 'id' : _ref$optionValueKey,
      _ref$optionLabelKey = _ref.optionLabelKey,
      optionLabelKey = _ref$optionLabelKey === void 0 ? 'label' : _ref$optionLabelKey,
      label = _ref.label,
      value = _ref.value,
      required = _ref.required,
      _onChange = _ref.onChange,
      dataSign = _ref.dataSign,
      renderItem = _ref.renderItem,
      renderValue = _ref.renderValue,
      InputProps = _ref.InputProps,
      rest = _objectWithoutProperties(_ref, ["options", "optionValueKey", "optionLabelKey", "label", "value", "required", "onChange", "dataSign", "renderItem", "renderValue", "InputProps"]);

  return /*#__PURE__*/_react["default"].createElement(_Select.RcSelect, _extends({
    "data-sign": dataSign,
    fullWidth: true,
    gutterBottom: true,
    required: required,
    label: label,
    value: value,
    InputProps: InputProps,
    onChange: function onChange(_ref2) {
      var value = _ref2.target.value;

      _onChange(value);
    },
    renderValue: renderValue
  }, rest), options.map(function (item, i) {
    var label = item[optionLabelKey];
    return /*#__PURE__*/_react["default"].createElement(_MenuItem.RcMenuItem, {
      key: i,
      value: item[optionValueKey],
      "data-sign": "option".concat(i)
    }, renderItem ? renderItem(item) : /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].menuItem,
      title: label
    }, label));
  }));
};

exports.PickList = PickList;
//# sourceMappingURL=PickList.js.map
