"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneBookPanel = void 0;

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _Tooltip = require("ringcentral-widgets/components/Rcui/Tooltip");

var _toolTipDelayTime = require("ringcentral-widgets/lib/toolTipDelayTime");

var _ListItemWithScrollCheck = require("../ListItemWithScrollCheck");

var _SearchSelectField = require("../SearchSelectField");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PhoneBookPanel = function PhoneBookPanel(_ref) {
  var currentLocale = _ref.currentLocale,
      goBack = _ref.goBack,
      transferPhoneBook = _ref.transferPhoneBook,
      transferPhoneBookSelectedIndex = _ref.transferPhoneBookSelectedIndex,
      changeTransferPhoneBookSelected = _ref.changeTransferPhoneBookSelected,
      searchPhoneBook = _ref.searchPhoneBook,
      transferCountryOptions = _ref.transferCountryOptions;
  return /*#__PURE__*/_react["default"].createElement(_SearchSelectField.SearchSelectField, {
    open: true,
    onBackClick: goBack,
    title: _i18n["default"].getString('phoneBookTransfer', currentLocale),
    placeholder: _i18n["default"].getString('search', currentLocale),
    options: transferPhoneBook,
    searchOption: searchPhoneBook,
    currentLocale: currentLocale,
    listRenderer: function listRenderer(transferPhoneBook, scrollCheck) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, transferPhoneBook.map(function (_ref2, i) {
        var countryId = _ref2.countryId,
            destination = _ref2.destination,
            name = _ref2.name;
        var country = transferCountryOptions.find(function (country) {
          return country.countryId === countryId;
        });
        if (typeof country === 'undefined' || country === null) return null;
        var countryName = country.countryId !== 'USA' ? country.countryName || country.countryId : '';
        var phoneBookName = "".concat(name, " ").concat(countryName);
        return /*#__PURE__*/_react["default"].createElement(_ListItemWithScrollCheck.ListItemWithScrollCheck, {
          onClick: function onClick() {
            return changeTransferPhoneBookSelected(i);
          },
          selected: i === transferPhoneBookSelectedIndex,
          key: i,
          className: _styles["default"].phoneBookItem,
          scrollCheck: scrollCheck,
          "data-sign": "phoneContact"
        }, /*#__PURE__*/_react["default"].createElement("p", {
          className: _styles["default"].phoneBookName
        }, /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
          title: phoneBookName,
          enterDelay: _toolTipDelayTime.TOOLTIP_DEFAULT_DELAY_TIME
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: _styles["default"].content
        }, phoneBookName))), /*#__PURE__*/_react["default"].createElement("p", {
          className: _styles["default"].phoneBookDest
        }, destination));
      }));
    }
  });
};

exports.PhoneBookPanel = PhoneBookPanel;
//# sourceMappingURL=PhoneBookPanel.js.map
