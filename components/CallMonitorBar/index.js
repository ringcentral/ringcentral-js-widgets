'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallInfoBar = CallInfoBar;
exports.default = CallMonitorBar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DurationCounter = require('../DurationCounter');

var _DurationCounter2 = _interopRequireDefault(_DurationCounter);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _CarrouselBar = require('../CarrouselBar');

var _CarrouselBar2 = _interopRequireDefault(_CarrouselBar);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CallInfoBar(_ref) {
  var label = _ref.label,
      onClick = _ref.onClick,
      currentLocale = _ref.currentLocale,
      shouldDisplayViewCallsBtn = _ref.shouldDisplayViewCallsBtn;

  return _react2.default.createElement(
    'div',
    { className: _styles2.default.bar },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.currentCallInfo, onClick: onClick },
      label
    ),
    shouldDisplayViewCallsBtn ? _react2.default.createElement(
      _Button2.default,
      {
        className: _styles2.default.viewCallsBtn,
        onClick: onClick
      },
      _i18n2.default.getString('viewCall', currentLocale)
    ) : null
  );
}
// import formatMessage from 'format-message';

CallInfoBar.propTypes = {
  label: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  currentLocale: _propTypes2.default.string,
  shouldDisplayViewCallsBtn: _propTypes2.default.bool
};
CallInfoBar.defaultProps = {
  label: '',
  onClick: undefined,
  currentLocale: '',
  shouldDisplayViewCallsBtn: false
};

function CallMonitorBar(_ref2) {
  var currentCalls = _ref2.currentCalls,
      currentLocale = _ref2.currentLocale,
      onCurrentCallBtnClick = _ref2.onCurrentCallBtnClick,
      shouldDisplayCurrentCallBtn = _ref2.shouldDisplayCurrentCallBtn;

  // const numberOfIncomingCalls = ringingCalls.length;
  // const numberOfOnHoldCalls = onHoldCalls.length;
  return _react2.default.createElement(
    _CarrouselBar2.default,
    null,
    currentCalls.length > 0 ? _react2.default.createElement(
      'div',
      { className: _styles2.default.bar },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.duration, onClick: onCurrentCallBtnClick },
        _react2.default.createElement(_DurationCounter2.default, {
          startTime: currentCalls[0].startTime
        })
      ),
      shouldDisplayCurrentCallBtn && onCurrentCallBtnClick ? _react2.default.createElement(
        _Button2.default,
        {
          className: _styles2.default.currentCallBtn,
          onClick: onCurrentCallBtnClick
        },
        _i18n2.default.getString('currentCall', currentLocale)
      ) : null
    ) : null
  );
}
CallMonitorBar.propTypes = {
  // ringingCalls: PropTypes.array,
  currentCalls: _propTypes2.default.array,
  // onHoldCalls: PropTypes.array,
  currentLocale: _propTypes2.default.string.isRequired,
  onCurrentCallBtnClick: _propTypes2.default.func,
  // onViewCallBtnClick: PropTypes.func,
  shouldDisplayCurrentCallBtn: _propTypes2.default.bool
  // shouldDisplayViewCallsBtn: PropTypes.bool,
};
CallMonitorBar.defaultProps = {
  // ringingCalls: [],
  currentCalls: [],
  // onHoldCalls: [],
  onCurrentCallBtnClick: undefined,
  // onViewCallBtnClick: undefined,
  shouldDisplayCurrentCallBtn: false
  // shouldDisplayViewCallsBtn: false,
};
//# sourceMappingURL=index.js.map
