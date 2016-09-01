'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CallFooter = require('../CallFooter/CallFooter.react');

var _CallFooter2 = _interopRequireDefault(_CallFooter);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _prefix = (0, _style2.default)(['main', 'container', 'title', 'subtitle', 'avatar'], 'IncomingCall');

var main = _prefix.main;
var container = _prefix.container;
var title = _prefix.title;
var subtitle = _prefix.subtitle;
var avatar = _prefix.avatar;


var IncomingCall = function IncomingCall(props) {
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(main, container) },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: title },
        props.phoneNumber
      ),
      _react2.default.createElement(
        'div',
        { className: subtitle },
        'Call Incoming'
      ),
      _react2.default.createElement(
        'div',
        { className: avatar },
        _react2.default.createElement('img', { alt: 'avatar', src: 'http://placehold.it/150x150' })
      )
    ),
    _react2.default.createElement(_CallFooter2.default, {
      leftIcon: 'icon-uniAE',
      rightIcon: 'icon-uni44',
      onLeftClick: function onLeftClick() {
        return props.accept();
      },
      onRightClick: function onRightClick() {
        return props.bye();
      }
    })
  );
};

IncomingCall.defaultProps = {
  phoneNumber: 'Unknown'
};

IncomingCall.propTypes = {
  phoneNumber: _react2.default.PropTypes.string,
  accept: _react2.default.PropTypes.func,
  bye: _react2.default.PropTypes.func
};

exports.default = IncomingCall;