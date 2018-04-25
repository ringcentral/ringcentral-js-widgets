'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _callIconMap;

exports.default = LogBasicInfo;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DynamicsFont = require('ringcentral-widgets/assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _callResults = require('ringcentral-integration/enums/callResults');

var _callResults2 = _interopRequireDefault(_callResults);

var _telephonyStatus = require('ringcentral-integration/enums/telephonyStatus');

var _telephonyStatus2 = _interopRequireDefault(_telephonyStatus);

var _callLogHelpers = require('ringcentral-integration/lib/callLogHelpers');

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var callIconMap = (_callIconMap = {}, (0, _defineProperty3.default)(_callIconMap, _callResults2.default.missed, _DynamicsFont2.default.missed), (0, _defineProperty3.default)(_callIconMap, _callDirections2.default.inbound, _DynamicsFont2.default.inbound), (0, _defineProperty3.default)(_callIconMap, _callDirections2.default.outbound, _DynamicsFont2.default.outbound), (0, _defineProperty3.default)(_callIconMap, _telephonyStatus2.default.ringing, _DynamicsFont2.default.callHover), _callIconMap);
var colorStatusMap = {
  green: [_telephonyStatus2.default.callConnected, _telephonyStatus2.default.ringing, _callResults2.default.callAccepted, _callResults2.default.accepted],
  red: [_callResults2.default.missed, _callResults2.default.voicemail, _callResults2.default.rejected, _callResults2.default.blocked, _callResults2.default.noAnswer, _callResults2.default.busy, _callResults2.default.hangUp, _callResults2.default.declined],
  orange: [_telephonyStatus2.default.onHold, _telephonyStatus2.default.parkedCall]
};

function LogBasicInfo(props) {
  var _props$currentLog = props.currentLog,
      call = _props$currentLog.call,
      logName = _props$currentLog.logName,
      formatPhone = props.formatPhone,
      currentLocale = props.currentLocale;

  if (!call) return null;
  var direction = call.direction,
      to = call.to,
      from = call.from,
      duration = call.duration,
      result = call.result,
      telephonyStatus = call.telephonyStatus;

  var number = direction === _callDirections2.default.outbound ? to && (to.phoneNumber || to.extensionNumber) : from && (from.phoneNumber || from.extensionNumber);
  var formatNumber = formatPhone(number);
  var status = result || telephonyStatus;
  var active = !duration && duration !== 0;
  var missed = (0, _callLogHelpers.isMissed)(call);
  var green = colorStatusMap.green.includes(status);
  var red = colorStatusMap.red.includes(status);
  var orange = colorStatusMap.orange.includes(status);
  var isRinging = status === _telephonyStatus2.default.ringing;
  var title = missed ? _i18n2.default.getString(_callResults2.default.missed, currentLocale) : _i18n2.default.getString(direction, currentLocale);
  var statusI18n = _i18n2.default.getString(status, currentLocale);
  var iconClassName = (0, _classnames2.default)(_styles2.default.icon, isRinging && _styles2.default.ringing, isRinging && _DynamicsFont2.default.callHover, !isRinging && !missed && callIconMap[direction], missed && _styles2.default.missed, missed && callIconMap[_callResults2.default.missed], !isRinging && active && _styles2.default.active);
  var statusClassName = (0, _classnames2.default)(_styles2.default.status, green && _styles2.default.green, red && _styles2.default.red, orange && _styles2.default.orange);
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.callInfo },
    _react2.default.createElement(
      'div',
      {
        className: _styles2.default.callIcon,
        title: title },
      _react2.default.createElement('span', {
        className: iconClassName
      })
    ),
    _react2.default.createElement(
      'ul',
      { className: _styles2.default.callDisplay },
      _react2.default.createElement(
        'li',
        {
          className: _styles2.default.contact,
          title: logName },
        logName
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'span',
          {
            className: _styles2.default.number,
            title: formatNumber },
          formatNumber
        ),
        _react2.default.createElement(
          'span',
          { className: _styles2.default.separator },
          '|'
        ),
        _react2.default.createElement(
          'span',
          {
            className: statusClassName,
            title: statusI18n },
          statusI18n
        )
      )
    )
  );
}

LogBasicInfo.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  formatPhone: _propTypes2.default.func,
  currentLog: _propTypes2.default.object
};

LogBasicInfo.defaultProps = {
  formatPhone: function formatPhone(value) {
    return value;
  },
  currentLog: {}
};
//# sourceMappingURL=index.js.map
