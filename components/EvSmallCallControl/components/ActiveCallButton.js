"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCallButton = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("../i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ActiveCallButton = exports.ActiveCallButton = function ActiveCallButton(_ref) {
  var currentLocale = _ref.currentLocale,
    disableActive = _ref.disableActive,
    onActive = _ref.onActive,
    size = _ref.size,
    dataSign = _ref.dataSign;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    "data-sign": dataSign,
    color: "interactive.b02",
    symbol: _junoIcon.ActiveCall,
    size: size,
    disabled: disableActive,
    onClick: onActive,
    title: _i18n["default"].getString('activeCall', currentLocale)
  });
};
ActiveCallButton.defaultProps = {
  onActive: function onActive() {},
  disableActive: false,
  currentLocale: 'en-US',
  dataSign: 'activeCall'
};
//# sourceMappingURL=ActiveCallButton.js.map
