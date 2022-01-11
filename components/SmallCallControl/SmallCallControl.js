"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmallCallControl = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("./components");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SmallCallControl = function SmallCallControl(_ref) {
  var classes = _ref.classes,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["classes", "children"]);

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, classes === null || classes === void 0 ? void 0 : classes.root),
    "data-sign": "smallCallControl"
  }, children || /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.MuteCallButton, rest), /*#__PURE__*/_react["default"].createElement(_components.TransferCallButton, rest), /*#__PURE__*/_react["default"].createElement(_components.HoldCallButton, rest), /*#__PURE__*/_react["default"].createElement(_components.HangUpButton, rest)));
};

exports.SmallCallControl = SmallCallControl;
//# sourceMappingURL=SmallCallControl.js.map
