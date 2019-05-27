"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

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

var _ramda = require("ramda");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

require("animate.css/animate.min.css");

var _sleep = _interopRequireDefault(require("ringcentral-integration/lib/sleep"));

var _Message = _interopRequireDefault(require("../Message"));

var _AlertDisplay = _interopRequireDefault(require("../AlertDisplay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ANIMATION_DURATION = 500;
var ENTRANCE_ANIMATION = 'fadeInDown';
var EXIT_ANIMATION = 'fadeOutUp';

function AnimationMessage(_ref) {
  var animation = _ref.animation,
      duration = _ref.duration,
      props = _objectWithoutProperties(_ref, ["animation", "duration"]);

  var second = duration / 1000;
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])([animation, 'animated']),
    style: {
      animationDuration: "".concat(second, "s")
    }
  }, _react["default"].createElement(_Message["default"], props));
}

AnimationMessage.propTypes = _objectSpread({}, _Message["default"].propTypes, {
  animation: _propTypes["default"].string,
  duration: _propTypes["default"].number
});
AnimationMessage.defaultProps = {
  animation: undefined,
  duration: ANIMATION_DURATION
};

var AnimationAlert =
/*#__PURE__*/
function (_Component) {
  _inherits(AnimationAlert, _Component);

  function AnimationAlert(props) {
    var _this;

    _classCallCheck(this, AnimationAlert);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AnimationAlert).call(this, props));
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

      if (this.props.messages === nextProps.messages) return;

      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this2$props, duration, entranceAnimation, exitAnimation, currentMessagesIDs, nextMessagesIDs, addedMessagesIDs, removedMessagesIDs, allMessagesIDs, allMessages, messages, stateWithAnimation, isCurrentEmpty;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this2$props = _this2.props, duration = _this2$props.duration, entranceAnimation = _this2$props.entranceAnimation, exitAnimation = _this2$props.exitAnimation;
                currentMessagesIDs = _this2.props.messages.map(function (message) {
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

                _this2.props.messages.concat(nextProps.messages).map(function (message) {
                  allMessages[message.id] = message;
                  return message;
                });

                messages = allMessagesIDs.map(function (id) {
                  var message = allMessages[id];
                  var isAddedMessage = (0, _ramda.contains)(id, addedMessagesIDs);
                  var isRemovedMessage = (0, _ramda.contains)(id, removedMessagesIDs);
                  var animation;

                  if (isAddedMessage) {
                    animation = entranceAnimation;
                  } else if (isRemovedMessage) {
                    animation = exitAnimation;
                  }

                  return _objectSpread({}, message, animation ? {
                    animation: animation
                  } : {}, {
                    duration: duration
                  });
                });
                stateWithAnimation = {
                  messages: messages
                };

                if (messages.length > 0) {
                  _this2.setState(stateWithAnimation);
                }

                _context.next = 13;
                return (0, _sleep["default"])(duration);

              case 13:
                if (_this2.mounted) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt("return");

              case 15:
                isCurrentEmpty = currentMessagesIDs.length === 0;

                _this2.setState({
                  messages: isCurrentEmpty ? messages : nextProps.messages
                });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(nextState.messages === this.state.messages || nextProps.messages === this.state.props);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement(_AlertDisplay["default"], _extends({}, this.props, {
        component: AnimationMessage,
        messages: this.state.messages
      }));
    }
  }]);

  return AnimationAlert;
}(_react.Component);

AnimationAlert.propTypes = _objectSpread({}, _AlertDisplay["default"].propTypes, {
  entranceAnimation: _propTypes["default"].string,
  exitAnimation: _propTypes["default"].string,
  duration: _propTypes["default"].number
});
AnimationAlert.defaultProps = _objectSpread({}, _AlertDisplay["default"].defaultProps, {
  entranceAnimation: ENTRANCE_ANIMATION,
  exitAnimation: EXIT_ANIMATION,
  duration: ANIMATION_DURATION
});
var _default = AnimationAlert;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
