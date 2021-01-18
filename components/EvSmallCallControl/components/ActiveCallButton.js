"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCallButton = void 0;

var _ActiveCall = _interopRequireDefault(require("@ringcentral/juno/icon/ActiveCall"));

var _react = _interopRequireDefault(require("react"));

var _CircleIconButton = require("../../CircleIconButton");

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ActiveCallButton = function ActiveCallButton(_ref) {
  var currentLocale = _ref.currentLocale,
      disableActive = _ref.disableActive,
      onActive = _ref.onActive,
      size = _ref.size,
      dataSign = _ref.dataSign;
  return /*#__PURE__*/_react["default"].createElement(_CircleIconButton.CircleIconButton, {
    dataSign: dataSign,
    symbol: _ActiveCall["default"],
    title: _i18n["default"].getString('activeCall', currentLocale),
    onClick: onActive,
    disabled: disableActive,
    size: size,
    active: true
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
