"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraftButton = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");
var _Draft = _interopRequireDefault(require("@ringcentral/juno-icon/es6/Draft.js"));
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var DraftButton = exports.DraftButton = function DraftButton(_ref) {
  var onClick = _ref.onClick,
    currentLocale = _ref.currentLocale,
    title = _ref.title,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
    symbol: _Draft["default"],
    title: title || t('title'),
    onClick: onClick,
    color: "action.primary",
    variant: "plain",
    "data-sign": "draftBtn",
    disabled: disabled
  });
};
//# sourceMappingURL=DraftButton.js.map
