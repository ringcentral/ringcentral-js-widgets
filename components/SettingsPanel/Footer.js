"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _Eula = require("../Eula");

var _IconLine = _interopRequireDefault(require("../IconLine"));

var _Line = _interopRequireDefault(require("../Line"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Footer = function Footer(_ref) {
  var loginNumber = _ref.loginNumber,
      currentLocale = _ref.currentLocale,
      version = _ref.version,
      versionContainer = _ref.versionContainer,
      onLogoutButtonClick = _ref.onLogoutButtonClick,
      eulaLabel = _ref.eulaLabel,
      eulaLink = _ref.eulaLink,
      onEulaLinkClick = _ref.onEulaLinkClick;

  var versionArea = versionContainer || /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].versionContainer,
    "data-sign": "version"
  }, _i18n["default"].getString('version', currentLocale), " ", version);

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("section", {
    className: _styles["default"].section
  }, /*#__PURE__*/_react["default"].createElement(_Line["default"], {
    noBorder: true
  }, /*#__PURE__*/_react["default"].createElement(_Eula.Eula, {
    dataSign: "eula",
    currentLocale: currentLocale,
    link: eulaLink,
    label: eulaLabel,
    onClick: onEulaLinkClick
  }))), /*#__PURE__*/_react["default"].createElement("section", {
    className: _styles["default"].section
  }, /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
    noBorder: true,
    dataSign: "logoutButton",
    onClick: onLogoutButtonClick,
    icon: /*#__PURE__*/_react["default"].createElement("span", {
      className: (0, _classnames["default"])(_styles["default"].logoutIcon, _DynamicsFont["default"].logout)
    })
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column'
    }
  }, _i18n["default"].getString('logout', currentLocale), /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "loginNumber",
    className: _styles["default"].loginNumber
  }, loginNumber)))), versionArea);
};

exports.Footer = Footer;
//# sourceMappingURL=Footer.js.map
