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
  var message = _ref.message,
      currentLocale = _ref.currentLocale,
      brand = _ref.brand,
      dismiss = _ref.dismiss,
      getRenderer = _ref.getRenderer,
      animation = _ref.animation,
      duration = _ref.duration;
  var Message = getRenderer(message);
  var second = duration / 1000;
  var id = message.id,
      level = message.level,
      loading = message.loading,
      action = message.action;
  var type = getLevelType(level);
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(animation, _styles["default"].message, 'animated'),
    style: {
      animationDuration: "".concat(second, "s")
    }
  }, _react["default"].createElement(_rcui.RcSnackbarContent, {
    type: type,
    size: "small",
    fullWidth: true,
    loading: loading,
    classes: {
      root: _styles["default"].snackbar
    },
    message: _react["default"].createElement(Message, {
      message: message,
      currentLocale: currentLocale,
      brand: brand
    }),
    action: action !== null && action !== void 0 ? action : _react["default"].createElement(_rcui.RcSnackbarAction, {
      variant: "icon",
      icon: "close",
      size: "small",
      onClick: function onClick() {
        dismiss(id);
      }
    })
  }));
});
exports.NotificationItem = NotificationItem;
NotificationItem.defaultProps = {
  duration: 500
};
//# sourceMappingURL=NotificationItem.js.map
