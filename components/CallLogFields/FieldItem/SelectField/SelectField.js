"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectField = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

var _rcui = require("@ringcentral-integration/rcui");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SelectField = function SelectField(_ref) {
  var options = _ref.options,
      rest = _objectWithoutProperties(_ref, ["options"]);

  return /*#__PURE__*/_react["default"].createElement(_rcui.RcLineSelect, rest, options.map(function (item, i) {
    return /*#__PURE__*/_react["default"].createElement(_rcui.RcMenuItem, {
      key: i,
      value: !item.value ? undefined : "".concat(item.value),
      "data-sign": "option".concat(i),
      disabled: item.disabled
    }, item.label);
  }));
};

exports.SelectField = SelectField;
//# sourceMappingURL=SelectField.js.map
