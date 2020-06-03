"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationPanel = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.array.for-each");

require("animate.css/animate.min.css");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _NotificationItem = require("./NotificationItem");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var NotificationPanel = function NotificationPanel(_ref) {
  var messages = _ref.messages,
      className = _ref.className,
      exitAnimation = _ref.exitAnimation,
      entranceAnimation = _ref.entranceAnimation,
      backdropEntranceAnimation = _ref.backdropEntranceAnimation,
      backdropExitAnimation = _ref.backdropExitAnimation,
      duration = _ref.duration,
      rest = _objectWithoutProperties(_ref, ["messages", "className", "exitAnimation", "entranceAnimation", "backdropEntranceAnimation", "backdropExitAnimation", "duration"]);

  var _useState = (0, _react.useState)(messages),
      _useState2 = _slicedToArray(_useState, 2),
      currentMessages = _useState2[0],
      setCurrentMessages = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      timer = _useState4[0],
      setTimer = _useState4[1];

  (0, _react.useEffect)(function () {
    // if length is gratter means that is delete item.
    if (currentMessages.length > messages.length) {
      currentMessages.forEach(function (cm) {
        // if that can't find this id, that means that is delete
        if (!messages.some(function (m) {
          return m.id === cm.id;
        })) {
          cm.animation = exitAnimation;
          cm.backdropAnimation = backdropExitAnimation;
        } else {
          cm.animation = '';
          cm.backdropAnimation = '';
        }
      });
      setCurrentMessages(_toConsumableArray(currentMessages));

      if (duration > 0) {
        var timerId = setTimeout(function () {
          setCurrentMessages(messages);
        }, duration);
        setTimer(timerId);
      }
    } else {
      if (timer) {
        clearTimeout(timer);
      }

      setCurrentMessages(messages);
    }
  }, [messages]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, currentMessages.map(function (data, i) {
    var _data$backdropAnimati, _data$animation;

    return /*#__PURE__*/_react["default"].createElement(_NotificationItem.NotificationItem, _extends({}, rest, {
      data: data,
      duration: duration,
      backdropAnimation: (_data$backdropAnimati = data.backdropAnimation) !== null && _data$backdropAnimati !== void 0 ? _data$backdropAnimati : backdropEntranceAnimation,
      animation: (_data$animation = data.animation) !== null && _data$animation !== void 0 ? _data$animation : entranceAnimation,
      key: i
    }));
  }));
};

exports.NotificationPanel = NotificationPanel;
NotificationPanel.defaultProps = {
  entranceAnimation: 'fadeInDown',
  exitAnimation: 'fadeOutUp',
  backdropEntranceAnimation: 'fadeIn',
  backdropExitAnimation: 'fadeOut',
  duration: 500
};
//# sourceMappingURL=NotificationPanel.js.map
