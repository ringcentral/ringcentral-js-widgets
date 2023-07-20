"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationItem = void 0;
exports.getLevelType = getLevelType;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var NotificationItem = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var data = _ref.data,
    currentLocale = _ref.currentLocale,
    brand = _ref.brand,
    dismiss = _ref.dismiss,
    getRenderer = _ref.getRenderer,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 0 : _ref$duration,
    defaultAnimation = _ref.animation,
    defaultBackdropAnimation = _ref.backdropAnimation,
    _ref$classes = _ref.classes;
  _ref$classes = _ref$classes === void 0 ? {} : _ref$classes;
  var _ref$classes$snackbar = _ref$classes.snackbar,
    snackbarClass = _ref$classes$snackbar === void 0 ? {} : _ref$classes$snackbar,
    _ref$classes$backdrop = _ref$classes.backdrop,
    backdropClass = _ref$classes$backdrop === void 0 ? undefined : _ref$classes$backdrop,
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
    className: (0, _classnames["default"])(_styles["default"].backdrop, backdropClass, classes.backdrop, 'animated', backdropAnimation),
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
      root: (0, _classnames["default"])('animated', _styles["default"].snackbar, animation)
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
      onClick: function onClick() {
        dismiss(id);
      }
    }) : action
  }));
});
exports.NotificationItem = NotificationItem;
NotificationItem.defaultProps = {
  duration: 500,
  classes: {},
  size: 'small',
  messageAlign: 'left',
  fullWidth: true
};
//# sourceMappingURL=NotificationItem.js.map
