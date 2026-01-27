"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsCard = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SettingsCard = exports.SettingsCard = function SettingsCard(_ref) {
  var mainText = _ref.mainText,
    descriptor = _ref.descriptor,
    className = _ref.className,
    mainTextClassName = _ref.mainTextClassName,
    descriptorClassName = _ref.descriptorClassName,
    children = _ref.children,
    dataSign = _ref.dataSign;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('bg-neutral-b5/90 rounded-lg overflow-hidden', className),
    "data-sign": dataSign
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-4 py-4"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('typography-mainText text-neutral-b1 break-words', mainTextClassName)
  }, mainText), descriptor && /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('typography-descriptor text-neutral-b2', descriptorClassName)
  }, descriptor), children)));
};
//# sourceMappingURL=SettingsCard.js.map
