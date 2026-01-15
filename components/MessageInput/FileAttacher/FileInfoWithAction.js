"use strict";

require("core-js/modules/es.array.index-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileInfoWithAction = exports.DeleteButton = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("../styles.scss"));
var _FileName = require("./FileName");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
var DeleteButton = function DeleteButton(_ref) {
  var onClick = _ref.onClick;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    size: "small",
    color: "neutral.f07",
    onClick: onClick,
    "data-sign": "removeFileIconButton",
    symbol: _junoIcon.Close
  });
};
exports.DeleteButton = DeleteButton;
var FileInfoWithAction = function FileInfoWithAction(_ref2) {
  var fileName = _ref2.fileName,
    symbol = _ref2.symbol,
    FileIconProps = _ref2.FileIconProps,
    action = _ref2.action,
    rest = _objectWithoutProperties(_ref2, ["fileName", "symbol", "FileIconProps", "action"]);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: _styles["default"].fileInfoItem,
    "data-sign": "file-info"
  }, rest), /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, _extends({
    size: "small",
    role: "presentation",
    "aria-label": "File type icon",
    symbol: symbol
  }, FileIconProps)), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].fileNameWrapper
  }, /*#__PURE__*/_react["default"].createElement(_FileName.FileName, {
    fileName: fileName
  })), action && /*#__PURE__*/_react["default"].createElement("div", null, action));
};
exports.FileInfoWithAction = FileInfoWithAction;
//# sourceMappingURL=FileInfoWithAction.js.map
