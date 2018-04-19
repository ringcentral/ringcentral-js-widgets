'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _formatDuration = require('../../lib/formatDuration');

var _formatDuration2 = _interopRequireDefault(_formatDuration);

var _Spinner = require('../Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCurrentStatus(_ref, currentLocale) {
  var direction = _ref.direction,
      result = _ref.result;

  if (direction === 'Inbound') {
    if (result === 'Missed') {
      return {
        status: _i18n2.default.getString('missed', currentLocale),
        icon: _DynamicsFont2.default.missed,
        isMissedCall: true
      };
    }
    return {
      status: _i18n2.default.getString('inBound', currentLocale),
      icon: _DynamicsFont2.default.inbound
    };
  }
  return {
    status: _i18n2.default.getString('outBound', currentLocale),
    icon: _DynamicsFont2.default.outbound
  };
}

function CallItem(_ref2) {
  var call = _ref2.call,
      dateTimeFormatter = _ref2.dateTimeFormatter,
      currentLocale = _ref2.currentLocale;
  var duration = call.duration,
      startTime = call.startTime;

  var _getCurrentStatus = getCurrentStatus(call, currentLocale),
      status = _getCurrentStatus.status,
      icon = _getCurrentStatus.icon,
      isMissedCall = _getCurrentStatus.isMissedCall;

  startTime = dateTimeFormatter({ utcTimestamp: new Date(startTime).getTime() });
  duration = (0, _formatDuration2.default)(duration);
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.callItem },
    _react2.default.createElement(
      'dl',
      { className: (0, _classnames2.default)(_styles2.default.dl, isMissedCall ? _styles2.default.missedCall : '') },
      _react2.default.createElement(
        'dt',
        { className: _styles2.default.status, title: status },
        _react2.default.createElement(
          'span',
          { className: _styles2.default.iconWrapper },
          _react2.default.createElement('i', { className: (0, _classnames2.default)(icon, _styles2.default.callIcon), title: status })
        ),
        _react2.default.createElement(
          'span',
          { title: status },
          status
        ),
        _react2.default.createElement(
          'small',
          { className: _styles2.default.duration, title: duration },
          duration
        )
      ),
      _react2.default.createElement(
        'dd',
        { className: _styles2.default.time, title: startTime },
        startTime
      )
    )
  );
}

CallItem.propTypes = {
  call: _propTypes2.default.object.isRequired,
  dateTimeFormatter: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired
};

var RecentActivityCalls = function (_Component) {
  (0, _inherits3.default)(RecentActivityCalls, _Component);

  function RecentActivityCalls() {
    (0, _classCallCheck3.default)(this, RecentActivityCalls);
    return (0, _possibleConstructorReturn3.default)(this, (RecentActivityCalls.__proto__ || (0, _getPrototypeOf2.default)(RecentActivityCalls)).apply(this, arguments));
  }

  (0, _createClass3.default)(RecentActivityCalls, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.currentLocale !== this.props.currentLocale || nextProps.calls !== this.props.calls || nextProps.isCallsLoaded !== this.props.isCallsLoaded;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentLocale = _props.currentLocale,
          calls = _props.calls,
          isCallsLoaded = _props.isCallsLoaded,
          dateTimeFormatter = _props.dateTimeFormatter;

      var callListView = null;
      if (!isCallsLoaded) {
        callListView = _react2.default.createElement(_Spinner2.default, { className: _styles2.default.spinner, ringWidth: 4 });
      } else if (calls.length > 0) {
        callListView = calls.map(function (call) {
          return _react2.default.createElement(CallItem, {
            key: call.id,
            call: call,
            currentLocale: currentLocale,
            dateTimeFormatter: dateTimeFormatter
          });
        });
      } else {
        callListView = _react2.default.createElement(
          'p',
          { className: _styles2.default.noRecords },
          _i18n2.default.getString('noRecords', currentLocale)
        );
      }
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.calls },
        callListView
      );
    }
  }]);
  return RecentActivityCalls;
}(_react.Component);

exports.default = RecentActivityCalls;


RecentActivityCalls.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  calls: _propTypes2.default.array.isRequired,
  isCallsLoaded: _propTypes2.default.bool.isRequired,
  dateTimeFormatter: _propTypes2.default.func.isRequired
};
//# sourceMappingURL=index.js.map
