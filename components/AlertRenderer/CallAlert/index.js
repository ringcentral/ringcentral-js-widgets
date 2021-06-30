"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CallAlert;

require("core-js/modules/es6.string.link");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _callErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Call/callErrors"));

var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TELUS_ID = '7310';

function CallAlert(_ref) {
  var _ref$message = _ref.message,
      id = _ref$message.id,
      message = _ref$message.message,
      payload = _ref$message.payload,
      brand = _ref.brand,
      onAreaCodeLinkClick = _ref.onAreaCodeLinkClick,
      currentLocale = _ref.currentLocale;

  // If brand is Telus and special number is 911,
  // show messages of its own version.
  if (brand && brand.id === TELUS_ID && message === _callErrors["default"].specialNumber && payload && payload.phoneNumber === '911') {
    return /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('telus911', currentLocale));
  }

  if (message === _callErrors["default"].noAreaCode) {
    var areaCode = _i18n["default"].getString('areaCode', currentLocale);

    var areaCodeLink = onAreaCodeLinkClick ? /*#__PURE__*/_react["default"].createElement("a", {
      className: _styles["default"].link,
      onClick: function onClick(e) {
        e.preventDefault();
        onAreaCodeLinkClick({
          alertId: id
        });
      }
    }, areaCode) : areaCode;
    return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
      message: _i18n["default"].getString(message, currentLocale),
      values: {
        areaCodeLink: areaCodeLink
      }
    });
  }

  if (message === _callErrors["default"].noInternational) {
    return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
      message: _i18n["default"].getString(message, currentLocale),
      values: {
        brand: brand.fullName
      }
    });
  }

  return /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString(message, currentLocale));
}

CallAlert.propTypes = {
  onAreaCodeLinkClick: _propTypes["default"].func,
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired,
  brand: _propTypes["default"].object.isRequired,
  currentLocale: _propTypes["default"].string.isRequired
};
CallAlert.defaultProps = {
  onAreaCodeLinkClick: undefined
};

CallAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _callErrors["default"].noToNumber || message === _callErrors["default"].noAreaCode || message === _callErrors["default"].specialNumber || message === _callErrors["default"].connectFailed || message === _callErrors["default"].internalError || message === _callErrors["default"].notAnExtension || message === _callErrors["default"].networkError || message === _callErrors["default"].noInternational || message === _callErrors["default"].noRingoutEnable;
};
//# sourceMappingURL=index.js.map
