'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('animate.css/animate.min.css');

var _sleep = require('ringcentral-integration/lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _Message = require('../Message');

var _Message2 = _interopRequireDefault(_Message);

var _AlertDisplay = require('../AlertDisplay');

var _AlertDisplay2 = _interopRequireDefault(_AlertDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ANIMATION_DURATION = 500;
var ENTRANCE_ANIMATION = 'fadeInDown';
var EXIT_ANIMATION = 'fadeOutUp';

function AnimationMessage(_ref) {
  var animation = _ref.animation,
      _ref$duration = _ref.duration,
      duration = _ref$duration === undefined ? ANIMATION_DURATION : _ref$duration,
      props = (0, _objectWithoutProperties3.default)(_ref, ['animation', 'duration']);

  var second = duration / 1000;
  return _react2.default.createElement(
    'div',
    {
      className: animation + ' animated',
      style: {
        animationDuration: second + 's'
      } },
    _react2.default.createElement(_Message2.default, props)
  );
}

AnimationMessage.propTypes = (0, _extends3.default)({}, _Message2.default.propTypes, {
  animation: _propTypes2.default.string,
  duration: _propTypes2.default.number
});

var AnimationAlert = function (_Component) {
  (0, _inherits3.default)(AnimationAlert, _Component);

  function AnimationAlert(props) {
    (0, _classCallCheck3.default)(this, AnimationAlert);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AnimationAlert.__proto__ || (0, _getPrototypeOf2.default)(AnimationAlert)).call(this, props));

    _this.state = {
      messages: _this.props.messages
    };
    return _this;
  }

  (0, _createClass3.default)(AnimationAlert, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var _props, _props$duration, duration, _props$entranceAnimat, entranceAnimation, _props$exitAnimation, exitAnimation, currentMessagesIDs, nextMessagesIDs, addedMessagesIDs, removedMessagesIDs, allMessagesIDs, allMessages, messages, stateWithAnimation, isCurrentEmpty;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _props = _this2.props, _props$duration = _props.duration, duration = _props$duration === undefined ? ANIMATION_DURATION : _props$duration, _props$entranceAnimat = _props.entranceAnimation, entranceAnimation = _props$entranceAnimat === undefined ? ENTRANCE_ANIMATION : _props$entranceAnimat, _props$exitAnimation = _props.exitAnimation, exitAnimation = _props$exitAnimation === undefined ? EXIT_ANIMATION : _props$exitAnimation;
                currentMessagesIDs = _this2.props.messages.map(function (message) {
                  return message.id;
                });
                nextMessagesIDs = nextProps.messages.map(function (message) {
                  return message.id;
                });
                addedMessagesIDs = nextMessagesIDs.filter(function (id) {
                  return !currentMessagesIDs.includes(id);
                });
                removedMessagesIDs = currentMessagesIDs.filter(function (id) {
                  return !nextMessagesIDs.includes(id);
                });
                allMessagesIDs = [].concat((0, _toConsumableArray3.default)(new _set2.default(currentMessagesIDs.concat(nextMessagesIDs))));
                allMessages = {};

                _this2.props.messages.concat(nextProps.messages).map(function (message) {
                  allMessages[message.id] = message;
                  return message;
                });
                messages = allMessagesIDs.map(function (id) {
                  var message = allMessages[id];
                  var isAddedMessage = addedMessagesIDs.includes(id);
                  var isRemovedMessage = removedMessagesIDs.includes(id);
                  var animation = void 0;
                  if (isAddedMessage) {
                    animation = entranceAnimation;
                  } else if (isRemovedMessage) {
                    animation = exitAnimation;
                  }
                  return (0, _extends3.default)({}, message, animation ? { animation: animation } : {}, {
                    duration: duration
                  });
                });
                stateWithAnimation = {
                  messages: messages
                };

                _this2.setState(stateWithAnimation);
                _context.next = 13;
                return (0, _sleep2.default)(duration);

              case 13:
                isCurrentEmpty = currentMessagesIDs.length === 0;

                _this2.setState({
                  messages: isCurrentEmpty ? messages : nextProps.messages
                });

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }))();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_AlertDisplay2.default, (0, _extends3.default)({}, this.props, { component: AnimationMessage, messages: this.state.messages }));
    }
  }]);
  return AnimationAlert;
}(_react.Component);

AnimationAlert.propTypes = (0, _extends3.default)({}, _AlertDisplay2.default.propTypes, {
  entranceAnimation: _propTypes2.default.string,
  exitAnimation: _propTypes2.default.string,
  duration: _propTypes2.default.number
});

AnimationAlert.defaultProps = (0, _extends3.default)({}, _AlertDisplay2.default.defaultProps);

exports.default = AnimationAlert;
//# sourceMappingURL=index.js.map
