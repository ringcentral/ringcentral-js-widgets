"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.map");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _Message = _interopRequireDefault(require("../Message"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AlertDisplay = function AlertDisplay(_ref) {
  var RendererMessage = _ref.component,
      className = _ref.className,
      messages = _ref.messages,
      dismiss = _ref.dismiss,
      currentLocale = _ref.currentLocale,
      brand = _ref.brand,
      getRenderer = _ref.getRenderer;
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

AlertDisplay.defaultProps = {
  getRenderer: function getRenderer() {
    return undefined;
  },
  component: _Message["default"],
  brand: 'RingCentral'
};
var _default = AlertDisplay;
exports["default"] = _default;
//# sourceMappingURL=AlertDisplay.js.map
