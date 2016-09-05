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

var _Ratio = require('../../shared/Ratio/');

var _Ratio2 = _interopRequireDefault(_Ratio);

var _Flip = require('../Flip');

var _Flip2 = _interopRequireDefault(_Flip);

var _Transfer = require('../Transfer');

var _Transfer2 = _interopRequireDefault(_Transfer);

var _CallConsole = require('../CallConsole');

var _CallConsole2 = _interopRequireDefault(_CallConsole);

var _Dialer = require('../Dialer');

var _Dialer2 = _interopRequireDefault(_Dialer);

var _CallInfo = require('../CallInfo');

var _CallInfo2 = _interopRequireDefault(_CallInfo);

var _CallFooter = require('../CallFooter');

var _CallFooter2 = _interopRequireDefault(_CallFooter);

var _Closable = require('../Closable');

var _Closable2 = _interopRequireDefault(_Closable);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _prefix = (0, _style2.default)(['main', 'container'], 'ActiveCall');

var main = _prefix.main;
var container = _prefix.container;


var durationInterval = void 0;

/**
 * When accept an incoming call or make a outbound call, this component need to be displayed.
 * This component display current status and avaliable operations of active phone call.
 * By default it support 7 operations (Transfer, Flip, Record, Hold, DTMF, Park, and Mute).
 * Some operations are mutual exclusive like Hold and Record,
 * you can use operationStatus to inform the panel which state the phone call is in. 
 */

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
        if (_this3.state.openedPanel === 'keypad') {
          return _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(main, container) },
            _react2.default.createElement(_CallInfo2.default, _extends({}, _this3.props.callInfo, { duration: _this3.state.duration })),
            _react2.default.createElement(
              _Ratio2.default,
              { size: 0.9 },
              _react2.default.createElement(_Dialer2.default, { handleClick: function handleClick(number) {
                  return _this3.props.dtmf(number);
                } })
            ),
            _react2.default.createElement(_CallFooter2.default, {
              leftIcon: 'icon-uni40',
              rightIcon: 'icon-uni44',
              onLeftClick: function onLeftClick() {
                return _this3.setState({ openedPanel: null });
              },
              onRightClick: _this3.props.bye
            })
          );
        } else if (_this3.state.openedPanel === 'flip') {
          return _react2.default.createElement(
            _Closable2.default,
            { onClose: function onClose() {
                return _this3.setState({ openedPanel: null });
              }, className: main },
            _react2.default.createElement(_Flip2.default, _this3.props.flip)
          );
        } else if (_this3.state.openedPanel === 'transfer') {
          return _react2.default.createElement(
            _Closable2.default,
            { onClose: function onClose() {
                return _this3.setState({ openedPanel: null });
              }, className: main },
            _react2.default.createElement(_Transfer2.default, _this3.props.transfer)
          );
        }
        return _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(main, container) },
          _react2.default.createElement(_CallInfo2.default, _extends({}, _this3.props.callInfo, { duration: _this3.state.duration })),
          _react2.default.createElement(_CallConsole2.default, {
            status: _this3.props.operationStatus,
            disabledOperation: _this3.props.disabledOperation,
            disabled: _this3.props.webphoneStatus !== 'CALL_CONNECTED',
            handleHoldClick: function handleHoldClick(flag) {
              return _this3.props.hold(flag);
            },
            handleRecordClick: function handleRecordClick(flag) {
              return _this3.props.record(flag);
            },
            handleKeypadClick: function handleKeypadClick() {
              return _this3.setState({ openedPanel: 'keypad' });
            },
            handleFlipClick: function handleFlipClick() {
              return _this3.setState({ openedPanel: 'flip' });
            },
            handleTransferClick: function handleTransferClick() {
              return _this3.setState({ openedPanel: 'transfer' });
            },
            handleParkClick: function handleParkClick() {
              return _this3.props.park();
            }
          }),
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
  /**
   * @link Flip
   * Props pass to <Flip /> components.
   */
  flip: _react2.default.PropTypes.object,
  /**
   * @link Transfer
   * Props pass to <Transfer /> components.
   */
  transfer: _react2.default.PropTypes.object,
  /**
   * @link CallInfo
   * Props pass to <CallInfo /> components.
   */
  callInfo: _react2.default.PropTypes.object,

  /**
   * Method bind to the button which at right-bottom corner.
   */
  bye: _react2.default.PropTypes.func,
  park: _react2.default.PropTypes.func,
  record: _react2.default.PropTypes.func,
  hold: _react2.default.PropTypes.func,
  /**
   * Method bind to the button which at left-bottom corner.
   */
  mute: _react2.default.PropTypes.func,
  dtmf: _react2.default.PropTypes.func,
  /**
   * Operation which is disabled will display in grey color.
   */
  disabledOperation: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.oneOf(['record', 'flip', 'transfer', 'park'])),
  /**
   * Current status of each operations.
   */
  operationStatus: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.oneOf(['RECORDING', 'HOLDING', 'MUTED'])),
  /**
   * Current phone call status.
   */
  webphoneStatus: _react2.default.PropTypes.oneOf(['CALL_CONNECTED', 'CALL_CONNECTING'])
};
ActiveCall.defaultProps = {
  disabledOperation: [],
  operationStatus: [],
  webphoneStatus: 'CALL_CONNECTING'
};
exports.default = ActiveCall;