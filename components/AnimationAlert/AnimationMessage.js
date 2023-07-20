"use strict";

require("core-js/modules/es.array.index-of");
require("core-js/modules/es.object.keys");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationMessage = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Message = _interopRequireDefault(require("../Message"));
var _AnimationAlertUtils = require("./AnimationAlertUtils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var AnimationMessage = function AnimationMessage(_ref) {
  var animation = _ref.animation,
    duration = _ref.duration,
    props = _objectWithoutProperties(_ref, ["animation", "duration"]);
  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
  var second = duration / 1000;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])([animation, 'animated']),
    style: {
      animationDuration: "".concat(second, "s")
    }
  }, /*#__PURE__*/_react["default"].createElement(_Message["default"], props));
};
exports.AnimationMessage = AnimationMessage;
AnimationMessage.defaultProps = {
  animation: undefined,
  duration: _AnimationAlertUtils.ANIMATION_DURATION
};
//# sourceMappingURL=AnimationMessage.js.map
