"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ContactInfo;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _phoneSourceNames = _interopRequireDefault(require("../../lib/phoneSourceNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ContactInfo(_ref) {
  var name = _ref.name,
      entityType = _ref.entityType,
      enableTitle = _ref.enableTitle,
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
      splitter = _ref.splitter;
  var phoneSourceName = phoneSourceNameRenderer ? phoneSourceNameRenderer(entityType) : _phoneSourceNames["default"].getString(entityType);
  var title = enableTitle ? "".concat(name, " ").concat(splitter, " ").concat(phoneSourceName) : undefined;
  return _react["default"].createElement("div", {
    className: _styles["default"].nameSection,
    title: title
  }, _react["default"].createElement("span", {
    className: _styles["default"].name
  }, name), _react["default"].createElement("span", {
    className: _styles["default"].spliter
  }, splitter), _react["default"].createElement("span", {
    className: _styles["default"].label
  }, phoneSourceName));
}

ContactInfo.propTypes = {
  entityType: _propTypes["default"].string.isRequired,
  name: _propTypes["default"].string.isRequired,
  phoneSourceNameRenderer: _propTypes["default"].func,
  splitter: _propTypes["default"].string.isRequired,
  enableTitle: _propTypes["default"].bool
};
ContactInfo.defaultProps = {
  phoneSourceNameRenderer: undefined,
  enableTitle: undefined
};
//# sourceMappingURL=ContactInfo.js.map
