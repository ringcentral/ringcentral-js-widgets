"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Eula = void 0;
require("core-js/modules/es.string.link.js");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Eula = exports.Eula = function Eula(_ref) {
  var currentLocale = _ref.currentLocale,
    className = _ref.className,
    _ref$link = _ref.link,
    link = _ref$link === void 0 ? 'https://www.ringcentral.com/legal/eulatos.html' : _ref$link,
    dataSign = _ref.dataSign,
    onClick = _ref.onClick,
    label = _ref.label,
    useShortLabel = _ref.useShortLabel;
  var onClickHandler = _react["default"].useMemo(
  // @ts-expect-error TS(2322): Type '((e: MouseEvent<Element, MouseEvent>) => voi... Remove this comment to see the full error message
  function () {
    return onClick ? function (e) {
      return onClick(e, link);
    } : null;
  }, [onClick, link]);
  return /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
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
//# sourceMappingURL=Eula.js.map
