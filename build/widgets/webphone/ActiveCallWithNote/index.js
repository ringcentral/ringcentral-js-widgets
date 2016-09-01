'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CallInfo = require('../CallInfo');

var _CallInfo2 = _interopRequireDefault(_CallInfo);

var _CallFooter = require('../CallFooter');

var _CallFooter2 = _interopRequireDefault(_CallFooter);

var _Note = require('../Note');

var _Note2 = _interopRequireDefault(_Note);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _prefix = (0, _style2.default)(['main', 'container', 'list'], 'ActiveCallWithNote');

var main = _prefix.main;
var container = _prefix.container;
var list = _prefix.list;

var durationInterval = void 0;

var ActiveCall = function (_React$PureComponent) {
  _inherits(ActiveCall, _React$PureComponent);

  function ActiveCall() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ActiveCall);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ActiveCall)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      openedPanel: null,
      duration: 0
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ActiveCall, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enums = this.props.enums;
      if (this.props.webphoneStatus === 'CALL_CONNECTED') {
        this.startToCountDuration();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.webphoneStatus === 'CALL_CONNECTED' && this.props.webphoneStatus === 'CALL_CONNECTING') {
        this.startToCountDuration();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (durationInterval) {
        window.clearInterval(durationInterval);
        durationInterval = null;
      }
    }
  }, {
    key: 'startToCountDuration',
    value: function startToCountDuration() {
      var _this2 = this;

      durationInterval = window.setInterval(function () {
        return _this2.setState({ duration: _this2.state.duration + 1 });
      }, 1000);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      function contain(arr, target) {
        return arr && target && arr.indexOf(target) !== -1;
      }
      var content = function content() {
        return _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(main, container) },
          _react2.default.createElement(_CallInfo2.default, _extends({}, _this3.props.callInfo, { duration: _this3.state.duration })),
          _react2.default.createElement(
            'select',
            { className: list },
            _react2.default.createElement(
              'option',
              null,
              'Contacts'
            ),
            _react2.default.createElement(
              'option',
              null,
              'Number'
            ),
            _react2.default.createElement(
              'option',
              null,
              'Phone'
            )
          ),
          _react2.default.createElement(_Note2.default, null),
          _react2.default.createElement(_CallFooter2.default, {
            leftIcon: (0, _classnames2.default)({
              'icon-uniCE': !contain(_this3.props.operationStatus, 'MUTED'),
              'icon-uni7B': contain(_this3.props.operationStatus, 'MUTED')
            }),
            rightIcon: 'icon-uni44',
            onLeftClick: function onLeftClick() {
              return _this3.props.mute(!contain(_this3.props.operationStatus, 'MUTED'));
            },
            onRightClick: _this3.props.bye
          })
        );
      };

      return _react2.default.createElement(
        'div',
        { className: main },
        content()
      );
    }
  }]);

  return ActiveCall;
}(_react2.default.PureComponent);

ActiveCall.propTypes = {
  callInfo: _react2.default.PropTypes.object,

  disabledOperation: _react2.default.PropTypes.array,
  operationStatus: _react2.default.PropTypes.array,
  webphoneStatus: _react2.default.PropTypes.oneOf(['CALL_CONNECTED', 'CALL_CONNECTING'])
};
exports.default = ActiveCall;