"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkLineItem = void 0;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _LinkLine = _interopRequireDefault(require("../../LinkLine"));

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LinkLineItem = function LinkLineItem(_ref) {
  var show = _ref.show,
      name = _ref.name,
      customTitle = _ref.customTitle,
      currentLocale = _ref.currentLocale,
      onClick = _ref.onClick;

  if (!show) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement(_LinkLine["default"], {
    onClick: onClick
  }, customTitle || _i18n["default"].getString(name, currentLocale));
};

exports.LinkLineItem = LinkLineItem;
//# sourceMappingURL=LinkLineItem.js.map
