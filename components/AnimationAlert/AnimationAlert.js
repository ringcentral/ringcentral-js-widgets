"use strict";

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("animate.css/animate.min.css");

var _ramda = require("ramda");

var _react = _interopRequireWildcard(require("react"));

var _sleep = _interopRequireDefault(require("ringcentral-integration/lib/sleep"));

var _AlertDisplay = _interopRequireDefault(require("../AlertDisplay"));

var _AnimationAlertUtils = require("./AnimationAlertUtils");

var _AnimationMessage = require("./AnimationMessage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ENTRANCE_ANIMATION = 'fadeInDown';
var EXIT_ANIMATION = 'fadeOutUp';

var AnimationAlert =
/*#__PURE__*/
function (_Component) {
  _inherits(AnimationAlert, _Component);

  function AnimationAlert() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AnimationAlert);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AnimationAlert)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.mounted = void 0;
    _this.state = {
      messages: _this.props.messages
    };
    return _this;
  }

  _createClass(AnimationAlert, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var messages = this.props.messages;
      if (messages === nextProps.messages) return;

      (function _callee() {
        var _this2$props, duration, entranceAnimation, exitAnimation, currentMessagesIDs, nextMessagesIDs, addedMessagesIDs, removedMessagesIDs, allMessagesIDs, allMessages, nextMessages, isCurrentEmpty;

        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this2$props = _this2.props, duration = _this2$props.duration, entranceAnimation = _this2$props.entranceAnimation, exitAnimation = _this2$props.exitAnimation;
                currentMessagesIDs = messages.map(function (message) {
                  return message.id;
                });
                nextMessagesIDs = nextProps.messages.map(function (message) {
                  return message.id;
                });
                addedMessagesIDs = nextMessagesIDs.filter(function (id) {
                  return !(0, _ramda.contains)(id, currentMessagesIDs);
                });
                removedMessagesIDs = currentMessagesIDs.filter(function (id) {
                  return !(0, _ramda.contains)(id, nextMessagesIDs);
                });
                allMessagesIDs = _toConsumableArray(new Set(currentMessagesIDs.concat(nextMessagesIDs)));
                allMessages = {};
                messages.concat(nextProps.messages).map(function (message) {
                  allMessages[message.id] = message;
                  return message;
                });
                nextMessages = allMessagesIDs.map(function (id) {
                  var message = allMessages[id];
                  var isAddedMessage = (0, _ramda.contains)(id, addedMessagesIDs);
                  var isRemovedMessage = (0, _ramda.contains)(id, removedMessagesIDs);
                  var animation;

                  if (isAddedMessage) {
                    animation = entranceAnimation;
                  } else if (isRemovedMessage) {
                    animation = exitAnimation;
                  }

                  return _objectSpread({}, message, {}, animation ? {
                    animation: animation
                  } : {}, {
                    duration: duration
                  });
                });

                if (nextMessages.length > 0) {
                  _this2.setState({
                    messages: nextMessages
                  });
                }

                _context.next = 12;
                return regeneratorRuntime.awrap((0, _sleep["default"])(duration));

              case 12:
                if (_this2.mounted) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return");

              case 14:
                isCurrentEmpty = currentMessagesIDs.length === 0;

                _this2.setState({
                  messages: isCurrentEmpty ? nextMessages : nextProps.messages
                });

              case 16:
              case "end":
                return _context.stop();
            }
          }
        });
      })();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState.messages !== this.state.messages;
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement(_AlertDisplay["default"], _extends({}, this.props, {
        component: _AnimationMessage.AnimationMessage,
        messages: this.state.messages
      }));
    }
  }]);

  return AnimationAlert;
}(_react.Component);

AnimationAlert.defaultProps = _objectSpread({}, _AlertDisplay["default"].defaultProps, {
  entranceAnimation: ENTRANCE_ANIMATION,
  exitAnimation: EXIT_ANIMATION,
  duration: _AnimationAlertUtils.ANIMATION_DURATION
});
var _default = AnimationAlert;
exports["default"] = _default;
//# sourceMappingURL=AnimationAlert.js.map
