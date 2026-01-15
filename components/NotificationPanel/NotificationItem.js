"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationItem = void 0;
exports.getLevelType = getLevelType;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function getLevelType(level) {
  var type;
  switch (level) {
    case 'warning':
      type = 'warn';
      break;
    case 'danger':
      type = 'error';
      break;
    default:
      type = level;
  }
  return type;
}
var NotificationItem = exports.NotificationItem = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var data = _ref.data,
    currentLocale = _ref.currentLocale,
    brand = _ref.brand,
    dismiss = _ref.dismiss,
    getRenderer = _ref.getRenderer,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 0 : _ref$duration,
    defaultAnimation = _ref.animation,
    defaultBackdropAnimation = _ref.backdropAnimation,
    _ref$classes = _ref.classes,
    _ref$classes2 = _ref$classes === void 0 ? {} : _ref$classes,
    _ref$classes2$snackba = _ref$classes2.snackbar,
    snackbarClass = _ref$classes2$snackba === void 0 ? {} : _ref$classes2$snackba,
    _ref$classes2$backdro = _ref$classes2.backdrop,
    backdropClass = _ref$classes2$backdro === void 0 ? undefined : _ref$classes2$backdro,
    size = _ref.size,
    messageAlign = _ref.messageAlign,
    fullWidth = _ref.fullWidth;
  var Message = getRenderer(data);
  var second = duration / 1000;
  var id = data.id,
    level = data.level,
    _data$classes = data.classes,
    classes = _data$classes === void 0 ? {} : _data$classes,
    loading = data.loading,
    action = data.action,
    _data$animation = data.animation,
    animation = _data$animation === void 0 ? defaultAnimation : _data$animation,
    _data$backdropAnimati = data.backdropAnimation,
    backdropAnimation = _data$backdropAnimati === void 0 ? defaultBackdropAnimation : _data$backdropAnimati,
    backdrop = data.backdrop,
    onBackdropClick = data.onBackdropClick;
  var type = getLevelType(level);
  var animationStyle = (0, _react.useMemo)(function () {
    return {
      animationDuration: "".concat(second, "s")
    };
  }, [second]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].container
  }, backdrop && /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].backdrop, backdropClass, classes.backdrop, 'animated', backdropAnimation),
    style: animationStyle,
    onClick: onBackdropClick
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcSnackbarContent, {
    "data-sign": "notification",
    "data-sign-type": type,
    type: type,
    size: size,
    fullWidth: fullWidth,
    loading: loading,
    classes: (0, _juno.combineProps)({
      root: (0, _clsx["default"])('animated', _styles["default"].snackbar, animation)
    }, snackbarClass),
    style: animationStyle,
    messageAlign: messageAlign,
    message: /*#__PURE__*/_react["default"].createElement(Message, {
      message: data,
      currentLocale: currentLocale,
      brand: brand
    }),
    action: action === undefined ? /*#__PURE__*/_react["default"].createElement(_juno.RcSnackbarAction, {
      variant: "icon",
      symbol: _junoIcon.Close,
      size: "small",
      "data-sign": "snackbarActionClose",
      onClick: function onClick() {
        dismiss(id);
      }
    }) : action
  }));
});
NotificationItem.defaultProps = {
  duration: 500,
  classes: {},
  size: 'small',
  messageAlign: 'left',
  fullWidth: true
};
//# sourceMappingURL=NotificationItem.js.map
