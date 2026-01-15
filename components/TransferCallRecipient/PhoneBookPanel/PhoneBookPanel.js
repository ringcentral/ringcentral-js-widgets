"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneBookPanel = void 0;
var _Tooltip = require("@ringcentral-integration/widgets/components/Rcui/Tooltip");
var _toolTipDelayTime = require("@ringcentral-integration/widgets/lib/toolTipDelayTime");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _FormatPhoneNumber = require("../../../lib/FormatPhoneNumber");
var _SelectList = require("../../SelectList");
var _i18n = _interopRequireDefault(require("../i18n"));
var _styles = _interopRequireDefault(require("../styles.scss"));
var _i18n2 = _interopRequireDefault(require("./i18n"));
var _styles2 = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PhoneBookPanel = exports.PhoneBookPanel = function PhoneBookPanel(_ref) {
  var currentLocale = _ref.currentLocale,
    goBack = _ref.goBack,
    transferPhoneBook = _ref.transferPhoneBook,
    transferPhoneBookSelectedIndex = _ref.transferPhoneBookSelectedIndex,
    changeTransferPhoneBookSelected = _ref.changeTransferPhoneBookSelected,
    searchPhoneBook = _ref.searchPhoneBook;
  return /*#__PURE__*/_react["default"].createElement(_SelectList.SelectList, {
    onBackClick: goBack,
    title: _i18n2["default"].getString('phoneBookTransfer', currentLocale),
    placeholder: _i18n["default"].getString('search', currentLocale),
    options: transferPhoneBook,
    searchOption: searchPhoneBook,
    currentLocale: currentLocale,
    renderListItem: function renderListItem(_ref2) {
      var option = _ref2.option,
        i = _ref2.index;
      var destination = option.destination,
        phoneBookName = option.phoneBookName,
        phoneBookItemIndex = option.phoneBookItemIndex;
      return /*#__PURE__*/_react["default"].createElement(_SelectList.ListItem, {
        onClick: function onClick() {
          return changeTransferPhoneBookSelected(phoneBookItemIndex);
        },
        selected: i === transferPhoneBookSelectedIndex,
        key: i,
        className: _styles["default"].listItem,
        "data-sign": "phoneContact"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles2["default"].full
      }, /*#__PURE__*/_react["default"].createElement("p", {
        className: _styles2["default"].phoneBookName
      }, /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
        title: phoneBookName,
        enterDelay: _toolTipDelayTime.TOOLTIP_LONG_DELAY_TIME
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].ellipsis
      }, phoneBookName))), /*#__PURE__*/_react["default"].createElement("p", {
        className: (0, _clsx["default"])(_styles2["default"].phoneBookDest, _styles2["default"].ellipsis)
      }, (0, _FormatPhoneNumber.formatPhoneNumber)({
        phoneNumber: destination,
        currentLocale: currentLocale
      }))));
    }
  });
};
//# sourceMappingURL=PhoneBookPanel.js.map
