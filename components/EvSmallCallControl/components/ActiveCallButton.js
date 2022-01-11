"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCallButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");

var _ActiveCall = _interopRequireDefault(require("@ringcentral/juno/es6/icon/ActiveCall.js"));

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ActiveCallButton = function ActiveCallButton(_ref) {
  var currentLocale = _ref.currentLocale,
      disableActive = _ref.disableActive,
      onActive = _ref.onActive,
      size = _ref.size,
      dataSign = _ref.dataSign;
  return /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
    "data-sign": dataSign,
    color: "interactive.b02",
    symbol: _ActiveCall["default"],
    size: size,
    disabled: disableActive,
    onClick: onActive,
    title: _i18n["default"].getString('activeCall', currentLocale)
  });
};

exports.ActiveCallButton = ActiveCallButton;
ActiveCallButton.defaultProps = {
  onActive: function onActive() {},
  disableActive: false,
  currentLocale: 'en-US',
  dataSign: 'activeCall'
};
//# sourceMappingURL=ActiveCallButton.js.map
