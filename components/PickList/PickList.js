"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickList = void 0;

require("core-js/modules/es6.array.map");

var _rcui = require("@ringcentral-integration/rcui");

var _react = _interopRequireDefault(require("react"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
      InputProps = _ref.InputProps;
  return /*#__PURE__*/_react["default"].createElement(_rcui.RcLineSelect, {
    "data-sign": dataSign,
    fullWidth: true,
    required: required,
    label: label,
    value: value,
    InputProps: InputProps,
    onChange: function onChange(_ref2) {
      var value = _ref2.target.value;

      _onChange(value);
    },
    renderValue: renderValue
  }, options.map(function (item, i) {
    var label = item[optionLabelKey];
    return /*#__PURE__*/_react["default"].createElement(_rcui.RcMenuItem, {
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
