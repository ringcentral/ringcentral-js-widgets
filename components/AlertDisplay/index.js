"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _alertLevels = _interopRequireDefault(require("ringcentral-integration/modules/Alert/alertLevels"));

var _Message = _interopRequireDefault(require("../Message"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function AlertDisplay(props) {
  var RendererMessage = props.component;
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, props.className)
  }, props.messages.map(function (message) {
    var Renderer = props.getRenderer(message);
    if (!Renderer) return null;
    return _react["default"].createElement(RendererMessage, {
      animation: message.animation,
      duration: message.duration,
      key: message.id,
      level: message.level,
      message: _react["default"].createElement(Renderer, {
        message: message,
        currentLocale: props.currentLocale,
        brand: props.brand
      }),
      onDismiss: function onDismiss() {
        props.dismiss(message.id);
      }
    });
  }));
}

AlertDisplay.propTypes = {
  className: _propTypes["default"].string,
  messages: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    id: _propTypes["default"].string.isRequired,
    level: _propTypes["default"].oneOf(Object.keys(_alertLevels["default"])).isRequired,
    message: _propTypes["default"].string.isRequired,
    payload: _propTypes["default"].any
  })),
  getRenderer: _propTypes["default"].func,
  dismiss: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  animation: _propTypes["default"].string,
  brand: _propTypes["default"].string,
  duration: _propTypes["default"].number,
  component: _propTypes["default"].func
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
//# sourceMappingURL=index.js.map
