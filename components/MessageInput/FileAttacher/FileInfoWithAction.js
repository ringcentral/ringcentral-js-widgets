"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileInfoWithAction = exports.DeleteButton = void 0;
require("core-js/modules/es.number.to-fixed.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _TextMiddleEllipsis = require("./TextMiddleEllipsis");
var _i18n = _interopRequireDefault(require("./i18n"));
var _excluded = ["fileName", "fileSize", "symbol", "FileIconProps", "action"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var DeleteButton = exports.DeleteButton = function DeleteButton(_ref) {
  var onClick = _ref.onClick;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    size: "small",
    variant: "icon",
    color: "secondary",
    TooltipProps: {
      title: t('remove')
    },
    onClick: onClick,
    "data-sign": "removeFileIconButton",
    symbol: _springIcon.Xmd
  });
};
var FileInfoWithAction = exports.FileInfoWithAction = function FileInfoWithAction(_ref2) {
  var fileName = _ref2.fileName,
    fileSize = _ref2.fileSize,
    symbol = _ref2.symbol,
    FileIconProps = _ref2.FileIconProps,
    action = _ref2.action,
    rest = _objectWithoutProperties(_ref2, _excluded);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({}, rest, {
    className: "flex items-center h-[42px] p-[10px] w-full gap-2 rounded shadow",
    "data-sign": "file-info"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Icon, _extends({
    size: "small",
    role: "presentation",
    "aria-label": "File type icon",
    symbol: symbol
  }, FileIconProps)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center flex-1 overflow-hidden"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 overflow-hidden whitespace-nowrap"
  }, /*#__PURE__*/_react["default"].createElement(_TextMiddleEllipsis.TextMiddleEllipsis, null, fileName)), fileSize !== undefined && /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-shrink-0 ml-2 whitespace-nowrap text-right"
  }, (fileSize / 1024).toFixed(1), " KB")), action && /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-shrink-0"
  }, action));
};
//# sourceMappingURL=FileInfoWithAction.js.map
