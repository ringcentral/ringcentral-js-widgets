"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyButton = CopyButton;
exports.MoveDownButton = MoveDownButton;
exports.MoveUpButton = MoveUpButton;
exports.RemoveButton = RemoveButton;
exports["default"] = MuiIconButton;
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _utils = require("@rjsf/utils");
var _react = _interopRequireDefault(require("react"));
var _excluded = ["icon", "color", "uiSchema", "registry"],
  _excluded2 = ["iconType"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function MuiIconButton(props) {
  var icon = props.icon,
    color = props.color,
    uiSchema = props.uiSchema,
    registry = props.registry,
    otherProps = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, _extends({}, otherProps, {
    size: "small",
    color: color
  }), icon);
}
function CopyButton(props) {
  var translateString = props.registry.translateString;
  return /*#__PURE__*/_react["default"].createElement(MuiIconButton, _extends({
    title: translateString(_utils.TranslatableString.CopyButton)
  }, props, {
    icon: /*#__PURE__*/_react["default"].createElement(_springIcon.CopyMd, {
      fontSize: "small"
    })
  }));
}
function MoveDownButton(props) {
  var translateString = props.registry.translateString;
  return /*#__PURE__*/_react["default"].createElement(MuiIconButton, _extends({
    title: translateString(_utils.TranslatableString.MoveDownButton)
  }, props, {
    icon: /*#__PURE__*/_react["default"].createElement(_springIcon.ArrowDownMd, {
      fontSize: "small"
    })
  }));
}
function MoveUpButton(props) {
  var translateString = props.registry.translateString;
  return /*#__PURE__*/_react["default"].createElement(MuiIconButton, _extends({
    title: translateString(_utils.TranslatableString.MoveUpButton)
  }, props, {
    icon: /*#__PURE__*/_react["default"].createElement(_springIcon.ArrowUpMd, {
      fontSize: "small"
    })
  }));
}
function RemoveButton(props) {
  var iconType = props.iconType,
    otherProps = _objectWithoutProperties(props, _excluded2);
  var translateString = otherProps.registry.translateString;
  return /*#__PURE__*/_react["default"].createElement(MuiIconButton, _extends({
    title: translateString(_utils.TranslatableString.RemoveButton)
  }, otherProps, {
    color: "secondary",
    icon: /*#__PURE__*/_react["default"].createElement(_springIcon.MinusMd, {
      fontSize: iconType === 'default' ? 'medium' : 'small'
    })
  }));
}
//# sourceMappingURL=IconButton.js.map
