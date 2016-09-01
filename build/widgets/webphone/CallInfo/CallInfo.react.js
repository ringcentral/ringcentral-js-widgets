'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _prefix = (0, _style2.default)(['title', 'time', 'subtitle'], 'CallInfo');

var title = _prefix.title;
var time = _prefix.time;
var subtitle = _prefix.subtitle;


function toHHMMSS(duration) {
  var sec = parseInt(duration, 10);
  var hours = Math.floor(sec / 3600);
  var minutes = Math.floor((sec - hours * 3600) / 60);
  var seconds = sec - hours * 3600 - minutes * 60;

  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  return hours + ':' + minutes + ':' + seconds;
}

var CallInfo = function CallInfo(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: title },
      props.phoneNumber
    ),
    _react2.default.createElement(
      'div',
      { className: time },
      props.duration > 0 ? toHHMMSS(props.duration) : 'Connecting'
    ),
    _react2.default.createElement(
      'div',
      { className: subtitle },
      'You are on a WebPhone call.'
    )
  );
};

CallInfo.propTypes = {
  phoneNumber: _react2.default.PropTypes.string,
  duration: _react2.default.PropTypes.number
};
CallInfo.defaultProps = {
  phoneNumber: 'Unknown'
};

exports.default = CallInfo;