"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.some");
require("core-js/modules/es.object.keys");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationPanel = void 0;
require("animate.css/animate.min.css");
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _juno = require("@ringcentral/juno");
var _NotificationItem = require("./NotificationItem");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; } // TODO: should use juno animation to do that
var NotificationPanel = function NotificationPanel(_ref) {
  var _ref$entranceAnimatio = _ref.entranceAnimation,
    entranceAnimation = _ref$entranceAnimatio === void 0 ? 'fadeInDown' : _ref$entranceAnimatio,
    _ref$exitAnimation = _ref.exitAnimation,
    exitAnimation = _ref$exitAnimation === void 0 ? 'fadeOutUp' : _ref$exitAnimation,
    _ref$backdropEntrance = _ref.backdropEntranceAnimation,
    backdropEntranceAnimation = _ref$backdropEntrance === void 0 ? 'fadeIn' : _ref$backdropEntrance,
    _ref$backdropExitAnim = _ref.backdropExitAnimation,
    backdropExitAnimation = _ref$backdropExitAnim === void 0 ? 'fadeOut' : _ref$backdropExitAnim,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 500 : _ref$duration,
    messages = _ref.messages,
    className = _ref.className,
    rest = _objectWithoutProperties(_ref, ["entranceAnimation", "exitAnimation", "backdropEntranceAnimation", "backdropExitAnimation", "duration", "messages", "className"]);
  var _useState = (0, _react.useState)(messages),
    _useState2 = _slicedToArray(_useState, 2),
    currentMessages = _useState2[0],
    setCurrentMessages = _useState2[1];
  var _useSleep = (0, _juno.useSleep)(),
    sleep = _useSleep.sleep,
    cancel = _useSleep.cancel;
  (0, _react.useEffect)(function () {
    var updatedMessages = [];
    // if length is grater means that is delete item.
    if (currentMessages.length > messages.length) {
      currentMessages.forEach(function (currentMessage) {
        var updatedMessage = _objectSpread({}, currentMessage);
        // if that can't find this id, that means that is delete
        if (!messages.some(function (m) {
          return m.id === currentMessage.id;
        })) {
          updatedMessage.animation = exitAnimation;
          updatedMessage.backdropAnimation = backdropExitAnimation;
        } else {
          updatedMessage.animation = '';
          updatedMessage.backdropAnimation = '';
        }
        updatedMessages.push(updatedMessage);
      });
      setCurrentMessages(updatedMessages);
      if (duration > 0) {
        sleep(duration).then(function () {
          setCurrentMessages(messages);
        })["catch"](function () {
          // ignore cancel
        });
      }
    } else {
      cancel();
      setCurrentMessages(messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
//# sourceMappingURL=NotificationPanel.js.map
