"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastItemPanel = void 0;
exports.getLevelType = getLevelType;
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["id", "level", "loading", "action", "children", "dismiss", "backdrop", "onClose", "allowDuplicates", "messageAlign", "fullWidth", "className"]; // import { Xmd } from '@ringcentral/spring-icon';
/* eslint-disable @typescript-eslint/no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function getLevelType(level) {
  var type;
  switch (level) {
    case 'warning':
      type = 'warning';
      break;
    case 'danger':
      type = 'error';
      break;
    case 'hint':
      type = 'neutral';
      break;
    default:
      type = level;
  }
  return type;
}
var ToastItemPanel = exports.ToastItemPanel = function ToastItemPanel(_ref) {
  var id = _ref.id,
    level = _ref.level,
    loading = _ref.loading,
    action = _ref.action,
    children = _ref.children,
    dismiss = _ref.dismiss,
    backdrop = _ref.backdrop,
    onClose = _ref.onClose,
    allowDuplicates = _ref.allowDuplicates,
    messageAlign = _ref.messageAlign,
    fullWidth = _ref.fullWidth,
    className = _ref.className,
    rest = _objectWithoutProperties(_ref, _excluded);
  var type = getLevelType(level);
  var snackbarContentRef = (0, _react.useRef)(null);
  var handleClose = action === undefined ? function () {
    dismiss(id, 'removeButtonClick');
  } : undefined;
  // TODO: spring ui still not support pass any props to close or custom action in correct place, need wait spring update
  // UXSYS-3822
  // UXSYS-3821
  (0, _react.useEffect)(function () {
    var _snackbarContentRef$c;
    if (!handleClose) return;
    var close = (_snackbarContentRef$c = snackbarContentRef.current) === null || _snackbarContentRef$c === void 0 ? void 0 : _snackbarContentRef$c.querySelector('.sui-alert-close');
    close === null || close === void 0 ? void 0 : close.setAttribute('data-sign', 'dismiss');
  });
  return /*#__PURE__*/_react["default"].createElement(_springUi.SnackbarContent, _extends({
    ref: snackbarContentRef,
    "aria-live": "polite",
    "aria-atomic": "true",
    "data-id": id,
    "data-sign": "Toast",
    "data-sign-type": type,
    severity: type
    // TODO: currently always show icon
    // icon={typeof children === 'string'}
    ,
    icon: true
    // TODO: still not support loading
    // loading={loading}
    // TODO: that action is render in wrong place, need wait spring update
    // action={
    //   action === undefined ? (
    //     <IconButton
    //       className="sui-snackbar-content-close"
    //       symbol={Xmd}
    //       variant="icon"
    //       shape="squircle"
    //       color="secondary"
    //       size="small"
    //       background={false}
    //       data-sign="dismiss"
    //       onClick={() => {
    //         dismiss(id, 'removeButtonClick');
    //       }}
    //     />
    //   ) : (
    //     action
    //   )
    // }
    ,
    action: action,
    onClose: handleClose
  }, rest, {
    className: (0, _clsx["default"])('min-w-auto flex-none', className)
  }), children);
};
//# sourceMappingURL=ToastItemPanel.js.map
