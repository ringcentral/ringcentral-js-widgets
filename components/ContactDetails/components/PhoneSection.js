"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneSection = void 0;
var _phoneTypeHelper = require("@ringcentral-integration/commons/lib/phoneTypeHelper");
var _clsx = _interopRequireDefault(require("clsx"));
var _ramda = require("ramda");
var _react = _interopRequireDefault(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../../assets/DynamicsFont/DynamicsFont.scss"));
var _i18n = _interopRequireDefault(require("../i18n"));
var _styles = _interopRequireDefault(require("../styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * TODO
 * 1. Refactor phone type and phoneTypeOrder into modules
 * 2. RawNumberDisplay
 */

var PhoneList = function PhoneList(_ref) {
  var label = _ref.label,
    children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].item
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].label
  }, /*#__PURE__*/_react["default"].createElement("span", null, label)), /*#__PURE__*/_react["default"].createElement("ul", {
    className: _styles["default"].content
  }, children));
};
var PhoneListItem = function PhoneListItem(_ref2) {
  var contact = _ref2.contact,
    currentLocale = _ref2.currentLocale,
    disableLinks = _ref2.disableLinks,
    formatNumber = _ref2.formatNumber,
    isCallButtonDisabled = _ref2.isCallButtonDisabled,
    isMultipleSiteEnabled = _ref2.isMultipleSiteEnabled,
    canCallButtonShow = _ref2.canCallButtonShow,
    canTextButtonShow = _ref2.canTextButtonShow,
    onClickToDial = _ref2.onClickToDial,
    onClickToSMS = _ref2.onClickToSMS,
    phoneNumber = _ref2.phoneNumber,
    rawPhoneNumber = _ref2.rawPhoneNumber,
    phoneType = _ref2.phoneType;
  var formattedNumber = formatNumber(phoneNumber);
  // User will see, for example: (650) 123-4567
  var displayedPhoneNumber = rawPhoneNumber || formattedNumber;
  // User will use, for example: +16501234567
  // In multi-site feature, "user will see" and "user will use" are the same
  var usedPhoneNumber = isMultipleSiteEnabled && phoneType === 'extension' ? formattedNumber : phoneNumber;
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: _styles["default"].clearBoth
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].text, _styles["default"].number)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "contactNumber",
    "aria-label": phoneType,
    title: usedPhoneNumber
  }, displayedPhoneNumber)), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].menu
  }, canCallButtonShow(phoneType) ? /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    "data-sign": "call",
    className: (0, _clsx["default"])(isCallButtonDisabled && _styles["default"].disabled),
    title: "".concat(_i18n["default"].getString('call', currentLocale), " ").concat(usedPhoneNumber),
    disabled: isCallButtonDisabled,
    onClick: function onClick() {
      return onClickToDial(contact, usedPhoneNumber);
    }
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: _DynamicsFont["default"].call
  })) : null, canTextButtonShow(phoneType) ? /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: (0, _clsx["default"])(disableLinks && _styles["default"].disabled),
    "data-sign": "text",
    title: "".concat(_i18n["default"].getString('text', currentLocale), " ").concat(usedPhoneNumber),
    disabled: disableLinks,
    onClick: function onClick() {
      return onClickToSMS(contact, usedPhoneNumber);
    }
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: _DynamicsFont["default"].composeText
  })) : null));
};
var PhoneSection = function PhoneSection(_ref3) {
  var contact = _ref3.contact,
    currentLocale = _ref3.currentLocale,
    disableLinks = _ref3.disableLinks,
    isCallButtonDisabled = _ref3.isCallButtonDisabled,
    isMultipleSiteEnabled = _ref3.isMultipleSiteEnabled,
    formatNumber = _ref3.formatNumber,
    canCallButtonShow = _ref3.canCallButtonShow,
    canTextButtonShow = _ref3.canTextButtonShow,
    onClickToDial = _ref3.onClickToDial,
    onClickToSMS = _ref3.onClickToSMS;
  if (contact && contact.phoneNumbers && contact.phoneNumbers.length) {
    var sortedPhoneNumbers = (0, _phoneTypeHelper.sortByPhoneTypes)((0, _phoneTypeHelper.filterByPhoneTypes)(contact.phoneNumbers));
    var phoneMap = (0, _ramda.reduce)(function (acc, item) {
      if (item.phoneType !== acc.lastType) {
        // @ts-expect-error TS(2322): Type '"business" | "extension" | "home" | "mobile"... Remove this comment to see the full error message
        acc.lastType = item.phoneType;
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        acc.map[item.phoneType] = [];
      }
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      acc.map[item.phoneType].push(item);
      return acc;
    }, {
      map: {},
      lastType: null
    }, sortedPhoneNumbers).map;
    return /*#__PURE__*/_react["default"].createElement("section", {
      className: (0, _clsx["default"])(_styles["default"].section, _styles["default"].contacts),
      "aria-label": "phone"
    }, (0, _ramda.map)(function (phoneType) {
      return /*#__PURE__*/_react["default"].createElement(PhoneList, {
        key: phoneType,
        label: _i18n["default"].getString(phoneType, currentLocale)
      }, (0, _ramda.map)(function (_ref4) {
        var phoneNumber = _ref4.phoneNumber,
          rawPhoneNumber = _ref4.rawPhoneNumber;
        return /*#__PURE__*/_react["default"].createElement(PhoneListItem, {
          key: phoneNumber,
          phoneNumber: phoneNumber,
          rawPhoneNumber: rawPhoneNumber,
          phoneType: phoneType,
          contact: contact,
          canCallButtonShow: canCallButtonShow,
          canTextButtonShow: canTextButtonShow,
          formatNumber: formatNumber,
          currentLocale: currentLocale,
          isCallButtonDisabled: isCallButtonDisabled,
          isMultipleSiteEnabled: isMultipleSiteEnabled,
          disableLinks: disableLinks,
          onClickToDial: onClickToDial,
          onClickToSMS: onClickToSMS
        });
      }, phoneMap[phoneType]));
    }, (0, _ramda.keys)(phoneMap)));
  }
  return null;
};
exports.PhoneSection = PhoneSection;
//# sourceMappingURL=PhoneSection.js.map
