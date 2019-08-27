"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Alert;
exports.AlertPropTypes = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Alert(_ref) {
  var message = _ref.message,
      appName = _ref.appName,
      brand = _ref.brand,
      sourceName = _ref.sourceName,
      clickHereLink = _ref.clickHereLink,
      callback = _ref.callback;
  var clickHereLinkComp = clickHereLink ? _react["default"].createElement("a", {
    onClick: callback
  }, clickHereLink) : null;
  return message ? _react["default"].createElement("div", {
    className: _styles["default"].alert
  }, _react["default"].createElement(_FormattedMessage["default"], {
    message: message,
    values: {
      appName: appName,
      brand: brand,
      sourceName: sourceName,
      clickHereLink: clickHereLinkComp
    }
  })) : null;
}

var AlertPropTypes = {
  message: _propTypes["default"].string.isRequired,
  appName: _propTypes["default"].string,
  brand: _propTypes["default"].string,
  sourceName: _propTypes["default"].string,
  clickHereLink: _propTypes["default"].string,
  callback: _propTypes["default"].func
};
exports.AlertPropTypes = AlertPropTypes;
Alert.propTypes = AlertPropTypes;
Alert.defaultProps = {
  clickHereLink: null,
  callback: null,
  appName: null,
  brand: null,
  sourceName: null
};
//# sourceMappingURL=index.js.map
