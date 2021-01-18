"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvSmallCallControl = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _SmallCallControl = require("../SmallCallControl");

var _components = require("./components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var EvSmallCallControl = function EvSmallCallControl(_ref) {
  var isOnActive = _ref.isOnActive,
      showMuteButton = _ref.showMuteButton,
      rest = _objectWithoutProperties(_ref, ["isOnActive", "showMuteButton"]);

  return /*#__PURE__*/_react["default"].createElement(_SmallCallControl.SmallCallControl, rest, /*#__PURE__*/_react["default"].createElement(_SmallCallControl.HoldCallButton, rest), showMuteButton && /*#__PURE__*/_react["default"].createElement(_SmallCallControl.MuteCallButton, rest), /*#__PURE__*/_react["default"].createElement(_SmallCallControl.TransferCallButton, rest), isOnActive ? /*#__PURE__*/_react["default"].createElement(_components.ActiveCallButton, rest) : /*#__PURE__*/_react["default"].createElement(_SmallCallControl.HandUpButton, rest));
};

exports.EvSmallCallControl = EvSmallCallControl;
EvSmallCallControl.defaultProps = {
  isOnActive: false,
  showMuteButton: false
};
//# sourceMappingURL=EvSmallCallControl.js.map
