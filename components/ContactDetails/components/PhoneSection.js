"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneSection = void 0;

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ramda = require("ramda");

var _phoneTypes = _interopRequireDefault(require("ringcentral-integration/enums/phoneTypes"));

var _phoneTypeHelper = require("ringcentral-integration/lib/phoneTypeHelper");

var _DynamicsFont = _interopRequireDefault(require("../../../assets/DynamicsFont/DynamicsFont.scss"));

var _styles = _interopRequireDefault(require("../styles.scss"));

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PhoneList = function PhoneList(_ref) {
  var label = _ref.label,
      children = _ref.children;
  return _react["default"].createElement("div", {
    className: _styles["default"].item
  }, _react["default"].createElement("div", {
    className: _styles["default"].label
  }, _react["default"].createElement("span", null, label)), _react["default"].createElement("ul", {
    className: _styles["default"].content
  }, children));
};

var PhoneListItem = function PhoneListItem(_ref2) {
  var contact = _ref2.contact,
      currentLocale = _ref2.currentLocale,
      disableLinks = _ref2.disableLinks,
      formatNumber = _ref2.formatNumber,
      internalSmsPermission = _ref2.internalSmsPermission,
      isClickToDialEnabled = _ref2.isClickToDialEnabled,
      isCallButtonDisabled = _ref2.isCallButtonDisabled,
      isClickToTextEnabled = _ref2.isClickToTextEnabled,
      onClickToDial = _ref2.onClickToDial,
      onClickToSMS = _ref2.onClickToSMS,
      outboundSmsPermission = _ref2.outboundSmsPermission,
      phoneNumber = _ref2.phoneNumber,
      rawPhoneNumber = _ref2.rawPhoneNumber,
      phoneType = _ref2.phoneType;
  var formattedNumber = rawPhoneNumber || formatNumber(phoneNumber);
  var showCallButton = !(!isClickToDialEnabled || phoneType === _phoneTypes["default"].fax);
  var showTextButton = !(!isClickToTextEnabled || phoneType === _phoneTypes["default"].fax || phoneType === _phoneTypes["default"].extension && !internalSmsPermission || phoneType !== _phoneTypes["default"].extension && !outboundSmsPermission);
  return _react["default"].createElement("li", null, _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].text, _styles["default"].number)
  }, _react["default"].createElement("span", {
    "data-sign": "contactNumber",
    title: phoneNumber
  }, formattedNumber)), _react["default"].createElement("div", {
    className: _styles["default"].menu
  }, showCallButton ? _react["default"].createElement("button", {
    type: "button",
    className: (0, _classnames["default"])(isCallButtonDisabled && _styles["default"].disabled),
    title: "".concat(_i18n["default"].getString('call', currentLocale), " ").concat(phoneNumber),
    disabled: isCallButtonDisabled,
    onClick: function onClick() {
      return onClickToDial(contact, phoneNumber);
    }
  }, _react["default"].createElement("i", {
    className: _DynamicsFont["default"].call
  })) : null, showTextButton ? _react["default"].createElement("button", {
    type: "button",
    className: (0, _classnames["default"])(disableLinks && _styles["default"].disabled),
    title: "".concat(_i18n["default"].getString('text', currentLocale), " ").concat(phoneNumber),
    disabled: disableLinks,
    onClick: function onClick() {
      return onClickToSMS(contact, phoneNumber);
    }
  }, _react["default"].createElement("i", {
    className: _DynamicsFont["default"].composeText
  })) : null));
};

var PhoneSection = function PhoneSection(_ref3) {
  var contact = _ref3.contact,
      currentLocale = _ref3.currentLocale,
      disableLinks = _ref3.disableLinks,
      isClickToDialEnabled = _ref3.isClickToDialEnabled,
      isCallButtonDisabled = _ref3.isCallButtonDisabled,
      isClickToTextEnabled = _ref3.isClickToTextEnabled,
      formatNumber = _ref3.formatNumber,
      internalSmsPermission = _ref3.internalSmsPermission,
      onClickToDial = _ref3.onClickToDial,
      onClickToSMS = _ref3.onClickToSMS,
      outboundSmsPermission = _ref3.outboundSmsPermission;

  if (contact && contact.phoneNumbers && contact.phoneNumbers.length) {
    var sortedPhoneNumbers = (0, _phoneTypeHelper.sortByPhoneTypes)((0, _phoneTypeHelper.filterByPhoneTypes)(contact.phoneNumbers));
    var phoneMap = (0, _ramda.reduce)(function (acc, item) {
      if (item.phoneType !== acc.lastType) {
        acc.lastType = item.phoneType;
        acc.map[item.phoneType] = [];
      }

      acc.map[item.phoneType].push(item);
      return acc;
    }, {
      map: {},
      lastType: null
    }, sortedPhoneNumbers).map;
    return _react["default"].createElement("div", {
      className: (0, _classnames["default"])(_styles["default"].section, _styles["default"].contacts)
    }, (0, _ramda.map)(function (phoneType) {
      return _react["default"].createElement(PhoneList, {
        key: phoneType,
        label: _i18n["default"].getString(phoneType, currentLocale)
      }, (0, _ramda.map)(function (_ref4) {
        var phoneNumber = _ref4.phoneNumber,
            rawPhoneNumber = _ref4.rawPhoneNumber;
        return _react["default"].createElement(PhoneListItem, {
          key: phoneNumber,
          phoneNumber: phoneNumber,
          rawPhoneNumber: rawPhoneNumber,
          phoneType: phoneType,
          contact: contact,
          formatNumber: formatNumber,
          currentLocale: currentLocale,
          isClickToDialEnabled: isClickToDialEnabled,
          isCallButtonDisabled: isCallButtonDisabled,
          isClickToTextEnabled: isClickToTextEnabled,
          disableLinks: disableLinks,
          internalSmsPermission: internalSmsPermission,
          onClickToDial: onClickToDial,
          onClickToSMS: onClickToSMS,
          outboundSmsPermission: outboundSmsPermission
        });
      }, phoneMap[phoneType]));
    }, (0, _ramda.keys)(phoneMap)));
  }

  return null;
};

exports.PhoneSection = PhoneSection;
//# sourceMappingURL=PhoneSection.js.map
