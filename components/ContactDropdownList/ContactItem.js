"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactItem = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");

var _ListItem = require("@ringcentral/juno/es6/components/List/ListItem/ListItem.js");

var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));

var _ContactInfo = require("./ContactInfo");

var _ContactPhone = require("./ContactPhone");

var _DoNotCallIndicator = require("./DoNotCallIndicator");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  font-size: 13px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledListItem = (0, _styledComponents["default"])(_ListItem.RcListItem)(_templateObject(), (0, _newPalette.palette2)('neutral', 'f04'));

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
