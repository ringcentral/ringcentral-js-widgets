"use strict";

require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _utils = require("@ringcentral-integration/utils");
var _Message = _interopRequireDefault(require("../Message"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var AlertDisplay = function AlertDisplay(_ref) {
  var _ref$getRenderer = _ref.getRenderer,
    getRenderer = _ref$getRenderer === void 0 ? _utils.emptyFn : _ref$getRenderer,
    _ref$brand = _ref.brand,
    brand = _ref$brand === void 0 ? 'RingCentral' : _ref$brand,
    _ref$component = _ref.component,
    RendererMessage = _ref$component === void 0 ? _Message["default"] : _ref$component,
    className = _ref.className,
    _ref$messages = _ref.messages,
    messages = _ref$messages === void 0 ? _utils.emptyArray : _ref$messages,
    dismiss = _ref.dismiss,
    currentLocale = _ref.currentLocale;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, messages.map(function (message) {
    var Renderer = getRenderer(message);
    if (!Renderer) return null;
    return /*#__PURE__*/_react["default"].createElement(RendererMessage, {
      animation: message.animation,
      duration: message.duration,
      key: message.id,
      level: message.level,
      message: /*#__PURE__*/_react["default"].createElement(Renderer, {
        message: message,
        currentLocale: currentLocale,
        brand: brand
      }),
      onDismiss: function onDismiss() {
        dismiss(message.id);
      }
    });
  }));
};
var _default = AlertDisplay;
exports["default"] = _default;
//# sourceMappingURL=AlertDisplay.js.map
