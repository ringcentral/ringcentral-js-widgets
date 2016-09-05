'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialPad = require('../DialPad');

var _DialPad2 = _interopRequireDefault(_DialPad);

var _ActiveCall = require('../ActiveCall');

var _ActiveCall2 = _interopRequireDefault(_ActiveCall);

var _ActiveCallWithNote = require('../ActiveCallWithNote');

var _ActiveCallWithNote2 = _interopRequireDefault(_ActiveCallWithNote);

var _IncomingCall = require('../IncomingCall');

var _IncomingCall2 = _interopRequireDefault(_IncomingCall);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _prefix = (0, _style2.default)(['main'], 'WebPhone');

var main = _prefix.main;


var remoteMedia = void 0;
var localMedia = void 0;

var WebPhone = function WebPhone(props) {
  function content() {
    if (props.status === 'ON_CALL') {
      return _react2.default.createElement(_ActiveCall2.default, _extends({}, props.activeCall, { enums: props.enums }));
    } else if (props.status === 'ON_INCOMING_CALL') {
      return _react2.default.createElement(_IncomingCall2.default, props.incomingCall);
    }
    return _react2.default.createElement(_DialPad2.default, _extends({}, props.dialPad, {
      disabled: props.status === 'DISABLED',
      remoteMedia: remoteMedia,
      localMedia: localMedia,
      getString: props.getString
    }));
  }
  return _react2.default.createElement(
    'div',
    { className: main },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('video', {
        ref: function ref(_ref) {
          remoteMedia = _ref;
        },
        id: 'remoteVideo',
        hidden: 'hidden'
      }),
      _react2.default.createElement('video', {
        ref: function ref(_ref2) {
          localMedia = _ref2;
        },
        id: 'localVideo',
        hidden: 'hidden',
        muted: 'muted'
      })
    ),
    content()
  );
};

WebPhone.propTypes = {
  /**
   * @link ActiveCall
   * Props pass to <ActiveCall /> components.
   */
  activeCall: _react2.default.PropTypes.object,
  /**
   * @link IncomingCall
   * Props pass to <IncomingCall /> components.
   */
  incomingCall: _react2.default.PropTypes.object,
  /**
   * @link DialPad
   * Props pass to <DialPad /> components.
   */
  dialPad: _react2.default.PropTypes.object,

  enums: _react2.default.PropTypes.object,
  status: _react2.default.PropTypes.oneOf(['ON_CALL', 'ON_INCOMING_CALL', 'IDLE', 'DISABLED']),
  getString: _react2.default.PropTypes.func
};

exports.default = WebPhone;