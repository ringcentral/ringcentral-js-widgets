"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationItem = void 0;

var _rcui = require("@ringcentral-integration/rcui");

var _iconClose = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-close.svg"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getLevelType(level) {
  var type;

  switch (level) {
    case 'warning':
      // the error is yellow
      type = 'error';
      break;

    case 'danger':
      // the warn is red
      type = 'warn';
      break;

    default:
      type = level;
  }

  return type;
}

var NotificationItem = (0, _react.memo)(function (_ref) {
  var data = _ref.data,
      currentLocale = _ref.currentLocale,
      brand = _ref.brand,
      dismiss = _ref.dismiss,
      getRenderer = _ref.getRenderer,
      duration = _ref.duration,
      defaultAnimation = _ref.animation,
      defaultBackdropAnimation = _ref.backdropAnimation,
      defaultClasses = _ref.classes;
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
  return _react["default"].createElement("div", {
    className: _styles["default"].container
  }, backdrop && _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].backdrop, defaultClasses.backdrop, classes.backdrop, 'animated', backdropAnimation),
    style: animationStyle,
    onClick: onBackdropClick
  }), _react["default"].createElement(_rcui.RcSnackbarContent, {
    type: type,
    size: "small",
    fullWidth: true,
    loading: loading,
    classes: {
      root: (0, _classnames["default"])('animated', _styles["default"].snackbar, animation)
    },
    style: animationStyle,
    messageAlign: "left",
    message: _react["default"].createElement(Message, {
      message: data,
      currentLocale: currentLocale,
      brand: brand
    }),
    action: action !== null && action !== void 0 ? action : _react["default"].createElement(_rcui.RcSnackbarAction, {
      variant: "icon",
      symbol: _iconClose["default"],
      size: "small",
      onClick: function onClick() {
        dismiss(id);
      }
    })
  }));
});
exports.NotificationItem = NotificationItem;
NotificationItem.defaultProps = {
  duration: 500,
  classes: {}
};
//# sourceMappingURL=NotificationItem.js.map
