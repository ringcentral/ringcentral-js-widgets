"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectField = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _MenuItem = require("@ringcentral/juno/es6/components/Menu/MenuItem/MenuItem.js");

var _Select = require("@ringcentral/juno/es6/components/Forms/Select/Select.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SelectField = function SelectField(_ref) {
  var options = _ref.options,
      labelClassName = _ref.labelClassName,
      rest = _objectWithoutProperties(_ref, ["options", "labelClassName"]);

  return /*#__PURE__*/_react["default"].createElement(_Select.RcSelect, _extends({
    gutterBottom: true
  }, rest), options.map(function (item, i) {
    return /*#__PURE__*/_react["default"].createElement(_MenuItem.RcMenuItem, {
      key: i,
      value: !item.value ? undefined : "".concat(item.value),
      "data-sign": "option".concat(i),
      disabled: item.disabled,
      title: item.label
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: labelClassName
    }, item.label));
  }));
};

exports.SelectField = SelectField;
//# sourceMappingURL=SelectField.js.map
