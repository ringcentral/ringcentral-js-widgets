"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CallAlert = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.string.link");

var _react = _interopRequireDefault(require("react"));

var _callErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Call/callErrors"));

var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallAlert = function CallAlert(_ref) {
  var _ref$message = _ref.message,
      id = _ref$message.id,
      message = _ref$message.message,
      payload = _ref$message.payload,
      brand = _ref.brand,
      onAreaCodeLinkClick = _ref.onAreaCodeLinkClick,
      currentLocale = _ref.currentLocale;

  if (message === _callErrors["default"].noAreaCode) {
    var areaCode = _i18n["default"].getString('areaCode', currentLocale);

    var areaCodeLink = onAreaCodeLinkClick ? /*#__PURE__*/_react["default"].createElement("a", {
      className: _styles["default"].link,
      onClick: function onClick(e) {
        e.preventDefault();
        onAreaCodeLinkClick({
          alertId: id
        });
      },
      "data-sign": "setAreaCode"
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
        brand: brand.name
      }
    });
  }

  return /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString(message, currentLocale));
};

exports.CallAlert = CallAlert;
CallAlert.defaultProps = {
  onAreaCodeLinkClick: undefined
};

CallAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _callErrors["default"].emergencyNumber || message === _callErrors["default"].noToNumber || message === _callErrors["default"].noAreaCode || message === _callErrors["default"].connectFailed || message === _callErrors["default"].internalError || message === _callErrors["default"].notAnExtension || message === _callErrors["default"].networkError || message === _callErrors["default"].noInternational || message === _callErrors["default"].noRingoutEnable;
};

var _default = CallAlert;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
