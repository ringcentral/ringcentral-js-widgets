"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactItem = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _ContactInfo = require("./ContactInfo");
var _ContactPhone = require("./ContactPhone");
var _DoNotCallIndicator = require("./DoNotCallIndicator");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  font-size: 13px;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledListItem = (0, _juno.styled)(_juno.RcListItem)(_templateObject(), (0, _juno.palette2)('neutral', 'f04'));
var ContactItem = function ContactItem(_ref) {
  var currentLocale = _ref.currentLocale,
    active = _ref.active,
    onHover = _ref.onHover,
    onClick = _ref.onClick,
    name = _ref.name,
    entityType = _ref.entityType,
    phoneType = _ref.phoneType,
    phoneNumber = _ref.phoneNumber,
    formatContactPhone = _ref.formatContactPhone,
    titleEnabled = _ref.titleEnabled,
    doNotCall = _ref.doNotCall,
    phoneTypeRenderer = _ref.phoneTypeRenderer,
    phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
    ContactInfoRenderer = _ref.contactInfoRenderer,
    ContactPhoneRenderer = _ref.contactPhoneRenderer;
  if (!ContactInfoRenderer) {
    ContactInfoRenderer = _ContactInfo.ContactInfo;
  }
  if (!ContactPhoneRenderer) {
    ContactPhoneRenderer = _ContactPhone.ContactPhone;
  }
  return /*#__PURE__*/_react["default"].createElement(StyledListItem, {
    className: _styles["default"].contactItem,
    onMouseOver: onHover,
    selected: active,
    "data-sign": "contactItem"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].clickable,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement(ContactInfoRenderer, {
    currentLocale: currentLocale,
    name: name,
    entityType: entityType,
    phoneType: phoneType,
    phoneNumber: phoneNumber,
    formatContactPhone: formatContactPhone,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    titleEnabled: titleEnabled,
    doNotCall: doNotCall
  }), /*#__PURE__*/_react["default"].createElement(_DoNotCallIndicator.DoNotCallIndicator, {
    doNotCall: doNotCall,
    currentLocale: currentLocale
  }), /*#__PURE__*/_react["default"].createElement(ContactPhoneRenderer, {
    currentLocale: currentLocale,
    name: name,
    entityType: entityType,
    phoneType: phoneType,
    phoneNumber: phoneNumber,
    formatContactPhone: formatContactPhone,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    titleEnabled: titleEnabled
  })));
};
exports.ContactItem = ContactItem;
ContactItem.defaultProps = {
  titleEnabled: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  contactInfoRenderer: undefined,
  contactPhoneRenderer: undefined,
  doNotCall: false
};
//# sourceMappingURL=ContactItem.js.map
