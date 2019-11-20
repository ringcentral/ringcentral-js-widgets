"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ContactEntry;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _ContactInfo = _interopRequireDefault(require("./ContactInfo"));

var _ContactPhone = _interopRequireDefault(require("./ContactPhone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ContactEntry(_ref) {
  var active = _ref.active,
      ContactInfoRenderer = _ref.contactInfoRenderer,
      ContactPhoneRenderer = _ref.contactPhoneRenderer,
      currentLocale = _ref.currentLocale,
      entityType = _ref.entityType,
      formatContactPhone = _ref.formatContactPhone,
      name = _ref.name,
      onClick = _ref.onClick,
      onHover = _ref.onHover,
      phoneNumber = _ref.phoneNumber,
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
      phoneType = _ref.phoneType,
      phoneTypeRenderer = _ref.phoneTypeRenderer,
      splitter = _ref.splitter,
      enableTitle = _ref.enableTitle;
  var className = (0, _classnames["default"])(_styles["default"].contactItem, active && _styles["default"].active);
  return _react["default"].createElement("li", {
    className: className,
    onMouseOver: onHover
  }, _react["default"].createElement("div", {
    className: _styles["default"].clickable,
    onClick: onClick
  }, _react["default"].createElement(ContactInfoRenderer, {
    currentLocale: currentLocale,
    name: name,
    entityType: entityType,
    phoneType: phoneType,
    phoneNumber: phoneNumber,
    formatContactPhone: formatContactPhone,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    enableTitle: enableTitle,
    splitter: splitter
  }), _react["default"].createElement(ContactPhoneRenderer, {
    currentLocale: currentLocale,
    name: name,
    entityType: entityType,
    phoneType: phoneType,
    phoneNumber: phoneNumber,
    formatContactPhone: formatContactPhone,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    enableTitle: enableTitle,
    splitter: splitter
  })));
}

ContactEntry.propTypes = {
  active: _propTypes["default"].bool.isRequired,
  contactInfoRenderer: _propTypes["default"].func,
  contactPhoneRenderer: _propTypes["default"].func,
  currentLocale: _propTypes["default"].string.isRequired,
  entityType: _propTypes["default"].string.isRequired,
  formatContactPhone: _propTypes["default"].func.isRequired,
  name: _propTypes["default"].string.isRequired,
  onClick: _propTypes["default"].func.isRequired,
  onHover: _propTypes["default"].func.isRequired,
  phoneNumber: _propTypes["default"].string.isRequired,
  phoneSourceNameRenderer: _propTypes["default"].func,
  phoneType: _propTypes["default"].string.isRequired,
  phoneTypeRenderer: _propTypes["default"].func,
  splitter: _propTypes["default"].string.isRequired,
  enableTitle: _propTypes["default"].bool
};
ContactEntry.defaultProps = {
  contactInfoRenderer: _ContactInfo["default"],
  contactPhoneRenderer: _ContactPhone["default"],
  phoneSourceNameRenderer: undefined,
  phoneTypeRenderer: undefined,
  enableTitle: undefined
};
//# sourceMappingURL=ContactEntry.js.map
