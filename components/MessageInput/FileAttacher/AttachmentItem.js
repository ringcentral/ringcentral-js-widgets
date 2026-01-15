"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttachmentItem = void 0;
require("core-js/modules/es.function.name.js");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("../styles.scss"));
var _FileInfoWithAction = require("./FileInfoWithAction");
var _excluded = ["name", "onActionClick", "FileIconProps"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var AttachmentItem = exports.AttachmentItem = function AttachmentItem(_ref) {
  var name = _ref.name,
    onActionClick = _ref.onActionClick,
    FileIconProps = _ref.FileIconProps,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: _styles["default"].attachmentItem
  }, rest), /*#__PURE__*/_react["default"].createElement(_FileInfoWithAction.FileInfoWithAction, {
    symbol: _junoIcon.FileBorder,
    fileName: name,
    FileIconProps: FileIconProps,
    action: /*#__PURE__*/_react["default"].createElement(_FileInfoWithAction.DeleteButton, {
      onClick: onActionClick
    })
  }));
};
//# sourceMappingURL=AttachmentItem.js.map
