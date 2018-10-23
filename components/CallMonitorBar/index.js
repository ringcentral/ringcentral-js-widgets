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

exports.CallInfoBar = CallInfoBar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formatMessage = require('format-message');

var _formatMessage2 = _interopRequireDefault(_formatMessage);

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
      _i18n2.default.getString('viewCalls', currentLocale)
    ) : null
  );
}
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

var CallMonitorBar = function (_Component) {
  (0, _inherits3.default)(CallMonitorBar, _Component);

  function CallMonitorBar(props) {
    (0, _classCallCheck3.default)(this, CallMonitorBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallMonitorBar.__proto__ || (0, _getPrototypeOf2.default)(CallMonitorBar)).call(this, props));

    _this.state = {
      hoverBar: false
    };
    _this.showBtn = function () {
      if (_this.props.currentCalls.length > 0) {
        _this.setState({
          hoverBar: true
        });
      }
    };
    _this.hideBtn = function () {
      _this.setState({
        hoverBar: false
      });
    };
    return _this;
  }

  (0, _createClass3.default)(CallMonitorBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          ringingCalls = _props.ringingCalls,
          onHoldCalls = _props.onHoldCalls,
          currentCalls = _props.currentCalls,
          currentLocale = _props.currentLocale,
          onCurrentCallBtnClick = _props.onCurrentCallBtnClick,
          onViewCallBtnClick = _props.onViewCallBtnClick,
          shouldDisplayCurrentCallBtn = _props.shouldDisplayCurrentCallBtn,
          shouldDisplayViewCallsBtn = _props.shouldDisplayViewCallsBtn;


      var numberOfIncomingCalls = ringingCalls.length;
      var numberOfOnHoldCalls = onHoldCalls.length;

      return _react2.default.createElement(
        'div',
        { className: _styles2.default.bar, onMouseOver: this.showBtn, onMouseLeave: this.hideBtn },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.box },
          _react2.default.createElement(
            _CarrouselBar2.default,
            { hoverBar: this.state.hoverBar },
            numberOfOnHoldCalls > 0 ? _react2.default.createElement(CallInfoBar, {
              label: numberOfOnHoldCalls === 1 ? (0, _formatMessage2.default)(_i18n2.default.getString('callOnHold', currentLocale), { numberOf: numberOfOnHoldCalls }) : (0, _formatMessage2.default)(_i18n2.default.getString('callsOnHold', currentLocale), { numberOf: numberOfOnHoldCalls }),
              currentLocale: currentLocale,
              onClick: onViewCallBtnClick,
              shouldDisplayViewCallsBtn: shouldDisplayViewCallsBtn
            }) : null,
            numberOfIncomingCalls > 0 ? _react2.default.createElement(CallInfoBar, {
              label: numberOfIncomingCalls === 1 ? (0, _formatMessage2.default)(_i18n2.default.getString('incomingCall', currentLocale), { numberOf: numberOfIncomingCalls }) : (0, _formatMessage2.default)(_i18n2.default.getString('incomingCalls', currentLocale), { numberOf: numberOfIncomingCalls }),
              currentLocale: currentLocale,
              onClick: onViewCallBtnClick,
              shouldDisplayViewCallsBtn: shouldDisplayViewCallsBtn
            }) : null,
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
          )
        )
      );
    }
  }]);
  return CallMonitorBar;
}(_react.Component);

exports.default = CallMonitorBar;

CallMonitorBar.propTypes = {
  ringingCalls: _propTypes2.default.array,
  currentCalls: _propTypes2.default.array,
  onHoldCalls: _propTypes2.default.array,
  currentLocale: _propTypes2.default.string.isRequired,
  onCurrentCallBtnClick: _propTypes2.default.func,
  onViewCallBtnClick: _propTypes2.default.func,
  shouldDisplayCurrentCallBtn: _propTypes2.default.bool,
  shouldDisplayViewCallsBtn: _propTypes2.default.bool
};
CallMonitorBar.defaultProps = {
  ringingCalls: [],
  currentCalls: [],
  onHoldCalls: [],
  onCurrentCallBtnClick: undefined,
  onViewCallBtnClick: undefined,
  shouldDisplayCurrentCallBtn: false,
  shouldDisplayViewCallsBtn: false
};
//# sourceMappingURL=index.js.map
