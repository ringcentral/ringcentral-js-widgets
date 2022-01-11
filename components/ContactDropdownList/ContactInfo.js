"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactInfo = void 0;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _phoneSourceNames = _interopRequireDefault(require("../../lib/phoneSourceNames"));

var _splitter = require("./splitter");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ContactInfo = function ContactInfo(_ref) {
  var name = _ref.name,
      entityType = _ref.entityType,
      titleEnabled = _ref.titleEnabled,
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
      doNotCall = _ref.doNotCall;
  var phoneSourceName = phoneSourceNameRenderer ? phoneSourceNameRenderer(entityType) : _phoneSourceNames["default"].getString(entityType);
  var nameTitle = "".concat(name, " ").concat(_splitter.splitter, " ").concat(phoneSourceName);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames2["default"])(_styles["default"].nameSection, _defineProperty({}, _styles["default"].dncNameSection, doNotCall)),
    title: titleEnabled && nameTitle,
    "data-sign": "contactNameSection"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].name
  }, name), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].splitter
  }, _splitter.splitter), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].label
  }, phoneSourceName));
};

exports.ContactInfo = ContactInfo;
ContactInfo.defaultProps = {
  titleEnabled: undefined,
  phoneSourceNameRenderer: undefined,
  doNotCall: false
};
//# sourceMappingURL=ContactInfo.js.map
