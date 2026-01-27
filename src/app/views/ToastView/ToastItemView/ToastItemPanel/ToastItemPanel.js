"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._ToastItemPanel = exports.ToastItemPanel = void 0;
exports.getLevelType = getLevelType;
var _SnackbarAction = require("@ringcentral/juno/es6/components/Snackbar/SnackbarAction/SnackbarAction.js");
var _SnackbarContent = require("@ringcentral/juno/es6/components/Snackbar/SnackbarContent/SnackbarContent.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _Close = _interopRequireDefault(require("@ringcentral/juno-icon/es6/Close.js"));
var _react = _interopRequireDefault(require("react"));
var _templateObject;
var _excluded = ["id", "level", "loading", "action", "children", "dismiss", "backdrop", "onClose", "allowDuplicates"];
/* eslint-disable @typescript-eslint/no-unused-vars */
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function getLevelType(level) {
  var type;
  switch (level) {
    case 'warning':
      type = 'warn';
      break;
    case 'danger':
      type = 'error';
      break;
    // in juno, not support neutral, so use info instead
    case 'hint':
      type = 'info';
      break;
    default:
      type = level;
  }
  return type;
}
var _ToastItemPanel = exports._ToastItemPanel = function _ToastItemPanel(_ref) {
  var id = _ref.id,
    level = _ref.level,
    loading = _ref.loading,
    action = _ref.action,
    children = _ref.children,
    dismiss = _ref.dismiss,
    backdrop = _ref.backdrop,
    onClose = _ref.onClose,
    allowDuplicates = _ref.allowDuplicates,
    rest = _objectWithoutProperties(_ref, _excluded);
  var type = getLevelType(level);
  return /*#__PURE__*/_react["default"].createElement(_SnackbarContent.RcSnackbarContent, _extends({
    "aria-live": "polite",
    "data-id": id,
    "aria-atomic": "true",
    "data-sign": "Toast",
    "data-sign-type": type,
    type: type,
    loading: loading,
    action: action === undefined ? /*#__PURE__*/_react["default"].createElement(_SnackbarAction.RcSnackbarAction, {
      variant: "icon",
      symbol: _Close["default"],
      size: "small",
      "data-sign": "dismiss",
      onClick: function onClick() {
        dismiss(id, 'removeButtonClick');
      }
    }) : action
  }, rest, {
    message: children
  }));
};
var ToastItemPanel = exports.ToastItemPanel = (0, _styledComponents["default"])(_ToastItemPanel)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  min-width: auto;\n  flex: none;\n"])));
//# sourceMappingURL=ToastItemPanel.js.map
