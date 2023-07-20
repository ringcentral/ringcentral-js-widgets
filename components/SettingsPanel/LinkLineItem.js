"use strict";

require("core-js/modules/es.array.index-of");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.keys");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkLineItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _LinkLine = require("../LinkLine");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var LinkLineItem = function LinkLineItem(_ref) {
  var show = _ref.show,
    name = _ref.name,
    customTitle = _ref.customTitle,
    currentLocale = _ref.currentLocale,
    onClick = _ref.onClick,
    dataSign = _ref.dataSign,
    pendoSignName = _ref.pendoSignName,
    rest = _objectWithoutProperties(_ref, ["show", "name", "customTitle", "currentLocale", "onClick", "dataSign", "pendoSignName"]);
  if (!show) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement(_LinkLine.LinkLine, _extends({
    hideUnderline: true
    // @ts-expect-error TS(2322): Type '(() => any) | undefined' is not assignable t... Remove this comment to see the full error message
    ,
    onClick: onClick,
    dataSign: dataSign,
    pendoSignName: pendoSignName
  }, rest), customTitle || _i18n["default"].getString(name, currentLocale));
};
exports.LinkLineItem = LinkLineItem;
//# sourceMappingURL=LinkLineItem.js.map
