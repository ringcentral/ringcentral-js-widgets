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

var _isBlank = require('ringcentral-integration/lib/isBlank');

var _isBlank2 = _interopRequireDefault(_isBlank);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CALL_YOU = 0;
var CALL_ME = 1;
var ON_MY_WAY = 2;
var CUSTOM_MESSAGE = 3;

var MINS = 0;
var HOURS = 1;
var DAYS = 2;

var cleanRegex = /[^\d]/g;

function TimeInput(props) {
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.timeInput },
    _react2.default.createElement(
      'span',
      { className: _styles2.default.timeValue },
      _react2.default.createElement('input', {
        maxLength: 2,
        value: props.timeValue,
        onChange: props.onTimeValueChange,
        ref: props.inputRef
      })
    ),
    _react2.default.createElement(
      'span',
      {
        onClick: function onClick() {
          return props.onSelectTimeUnit(MINS);
        },
        className: props.timeUnit === MINS ? _styles2.default.timeUnitSelected : null },
      _i18n2.default.getString('min', props.currentLocale)
    ),
    _react2.default.createElement(
      'span',
      {
        className: props.timeUnit === HOURS ? _styles2.default.timeUnitSelected : null,
        onClick: function onClick() {
          return props.onSelectTimeUnit(HOURS);
        } },
      _i18n2.default.getString('hours', props.currentLocale)
    ),
    _react2.default.createElement(
      'span',
      {
        className: props.timeUnit === DAYS ? _styles2.default.timeUnitSelected : null,
        onClick: function onClick() {
          return props.onSelectTimeUnit(DAYS);
        } },
      _i18n2.default.getString('days', props.currentLocale)
    )
  );
}

TimeInput.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  timeValue: _propTypes2.default.string,
  timeUnit: _propTypes2.default.number,
  inputRef: _propTypes2.default.func.isRequired,
  onTimeValueChange: _propTypes2.default.func.isRequired,
  onSelectTimeUnit: _propTypes2.default.func.isRequired
};

TimeInput.defaultProps = {
  timeValue: '',
  timeUnit: MINS
};

var ReplyWithMessage = function (_Component) {
  (0, _inherits3.default)(ReplyWithMessage, _Component);

  function ReplyWithMessage(props) {
    (0, _classCallCheck3.default)(this, ReplyWithMessage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ReplyWithMessage.__proto__ || (0, _getPrototypeOf2.default)(ReplyWithMessage)).call(this, props));

    _this.state = {
      type: ON_MY_WAY,
      customValue: '',
      callYouTimeValue: '',
      callYouTimeUnit: MINS,
      callMeTimeValue: '',
      callMeTimeUnit: MINS
    };

    _this.onSelectType = function (index) {
      _this.setState({
        type: index
      });
      _this.props.onChange(_this._getValue());
    };

    _this.onCustomValueChange = function (e) {
      var value = e.target.value;
      _this.setState({
        customValue: value
      });
      _this.props.onChange(_this._getValue());
    };

    _this.onCallYouTimeValueChange = function (e) {
      var value = e.target.value;
      _this.setState({
        callYouTimeValue: value.replace(cleanRegex, '')
      });
    };

    _this.onCallYouTimeUnitChange = function (unit) {
      _this.setState({
        callYouTimeUnit: unit
      });
    };

    _this.onCallMeTimeValueChange = function (e) {
      var value = e.target.value;
      _this.setState({
        callMeTimeValue: value.replace(cleanRegex, '')
      });
    };

    _this.onCallMeTimeUnitChange = function (unit) {
      _this.setState({
        callMeTimeUnit: unit
      });
    };

    _this.onReply = function () {
      _this.props.onReply(_this._getValue());
    };
    _this.onCallYouInputRef = function (input) {
      _this.callYouInputRef = input;
    };
    _this.onCallMeInputRef = function (input) {
      _this.callMeInputRef = input;
    };
    return _this;
  }

  (0, _createClass3.default)(ReplyWithMessage, [{
    key: '_getValue',
    value: function _getValue() {
      var value = { replyType: 0 };
      if (this.state.type === CUSTOM_MESSAGE) {
        value.replyText = this.state.customValue;
      }
      if (this.state.type === ON_MY_WAY) {
        value.replyText = 'On my way';
      }
      if (this.state.type < 2) {
        value.replyType = 1;
        value.callbackDirection = this.state.type;
        if (this.state.type === 0) {
          value.timeValue = this.state.callYouTimeValue;
          value.timeUnits = this.state.callYouTimeUnit;
          value.replyText = this.state.callYouTimeValue;
        } else {
          value.timeValue = this.state.callMeTimeValue;
          value.timeUnits = this.state.callMeTimeUnit;
          value.replyText = this.state.callMeTimeValue;
        }
      }
      return value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          onCancel = _props.onCancel,
          currentLocale = _props.currentLocale,
          disabled = _props.disabled;

      var disableButton = (0, _isBlank2.default)(this._getValue().replyText) || disabled;
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, className) },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.messages },
          _react2.default.createElement(
            'div',
            {
              onClick: function onClick() {
                _this2.onSelectType(CALL_YOU);
                setTimeout(function () {
                  _this2.callYouInputRef.focus();
                }, 100);
              },
              className: (0, _classnames2.default)(_styles2.default.messageItem, this.state.type === CALL_YOU ? _styles2.default.active : null)
            },
            _react2.default.createElement(
              'div',
              { className: _styles2.default.label },
              _i18n2.default.getString('willCallYouBackIn', currentLocale),
              '...'
            ),
            _react2.default.createElement(
              'div',
              { className: _styles2.default.inputField },
              _react2.default.createElement(TimeInput, {
                currentLocale: currentLocale,
                timeValue: this.state.callYouTimeValue,
                timeUnit: this.state.callYouTimeUnit,
                onTimeValueChange: this.onCallYouTimeValueChange,
                onSelectTimeUnit: this.onCallYouTimeUnitChange,
                inputRef: this.onCallYouInputRef
              })
            )
          ),
          _react2.default.createElement(
            'div',
            {
              onClick: function onClick() {
                _this2.onSelectType(CALL_ME);
                setTimeout(function () {
                  _this2.callMeInputRef.focus();
                }, 100);
              },
              className: (0, _classnames2.default)(_styles2.default.messageItem, this.state.type === CALL_ME ? _styles2.default.active : null)
            },
            _react2.default.createElement(
              'div',
              { className: _styles2.default.label },
              _i18n2.default.getString('callMeBackIn', currentLocale),
              '...'
            ),
            _react2.default.createElement(
              'div',
              { className: _styles2.default.inputField },
              _react2.default.createElement(TimeInput, {
                currentLocale: currentLocale,
                timeValue: this.state.callMeTimeValue,
                timeUnit: this.state.callMeTimeUnit,
                onTimeValueChange: this.onCallMeTimeValueChange,
                onSelectTimeUnit: this.onCallMeTimeUnitChange,
                inputRef: this.onCallMeInputRef
              })
            )
          ),
          _react2.default.createElement(
            'div',
            {
              onClick: function onClick() {
                return _this2.onSelectType(ON_MY_WAY);
              },
              className: (0, _classnames2.default)(_styles2.default.messageItem, this.state.type === ON_MY_WAY ? _styles2.default.active : null)
            },
            _react2.default.createElement(
              'div',
              { className: _styles2.default.label },
              _i18n2.default.getString('onMyWay', currentLocale)
            )
          ),
          _react2.default.createElement(
            'div',
            {
              onClick: function onClick() {
                _this2.onSelectType(CUSTOM_MESSAGE);
                setTimeout(function () {
                  _this2.customValueInput.focus();
                }, 100);
              },
              className: (0, _classnames2.default)(_styles2.default.messageItem, this.state.type === CUSTOM_MESSAGE ? _styles2.default.active : null)
            },
            _react2.default.createElement(
              'div',
              { className: _styles2.default.label },
              _i18n2.default.getString('customMessage', currentLocale)
            ),
            _react2.default.createElement(
              'div',
              { className: _styles2.default.inputField },
              _react2.default.createElement('textarea', {
                value: this.state.customValue,
                maxLength: 50,
                onChange: this.onCustomValueChange,
                ref: function ref(input) {
                  _this2.customValueInput = input;
                }
              })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.buttonGroup },
          _react2.default.createElement(
            _Button2.default,
            {
              className: _styles2.default.cancelButton,
              onClick: onCancel
            },
            _i18n2.default.getString('cancel', currentLocale)
          ),
          _react2.default.createElement(
            _Button2.default,
            {
              className: (0, _classnames2.default)(_styles2.default.replyButton, disableButton ? _styles2.default.disabled : null),
              onClick: this.props.disabled ? function () {} : this.onReply,
              disabled: disableButton
            },
            _react2.default.createElement(
              'span',
              { className: _styles2.default.buttonText },
              _i18n2.default.getString('reply', currentLocale)
            )
          )
        )
      );
    }
  }]);
  return ReplyWithMessage;
}(_react.Component);

exports.default = ReplyWithMessage;


ReplyWithMessage.propTypes = {
  className: _propTypes2.default.string,
  onCancel: _propTypes2.default.func.isRequired,
  onReply: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func,
  disabled: _propTypes2.default.bool.isRequired
};

ReplyWithMessage.defaultProps = {
  className: null,
  onChange: undefined
};
//# sourceMappingURL=index.js.map
