"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Eula = void 0;

require("core-js/modules/es6.string.link");

var _react = _interopRequireDefault(require("react"));

var _Link = require("@ringcentral/juno/es6/components/Link/Link.js");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Eula = function Eula(_ref) {
  var currentLocale = _ref.currentLocale,
      className = _ref.className,
      _ref$link = _ref.link,
      link = _ref$link === void 0 ? 'https://www.ringcentral.com/legal/eulatos.html' : _ref$link,
      dataSign = _ref.dataSign,
      onClick = _ref.onClick,
      label = _ref.label,
      useShortLabel = _ref.useShortLabel;

  var onClickHandler = _react["default"].useMemo(function () {
    return onClick ? function (e) {
      return onClick(e, link);
    } : null;
  }, [onClick, link]);

  return /*#__PURE__*/_react["default"].createElement(_Link.RcLink, {
    color: "content.brand",
    variant: "inherit",
    className: className,
    href: link,
    rel: "noopener noreferrer",
    target: "_blank",
    onClick: onClickHandler,
    "data-sign": dataSign
  }, label !== null && label !== void 0 ? label : _i18n["default"].getString(useShortLabel ? 'eulaAbbr' : 'eula', currentLocale));
};

exports.Eula = Eula;
//# sourceMappingURL=Eula.js.map
