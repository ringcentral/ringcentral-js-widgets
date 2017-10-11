'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DialPad = require('../DialPad');

var _DialPad2 = _interopRequireDefault(_DialPad);

var _DialTextInput = require('../DialTextInput');

var _DialTextInput2 = _interopRequireDefault(_DialTextInput);

var _CallIdSelect = require('../CallIdSelect');

var _CallIdSelect2 = _interopRequireDefault(_CallIdSelect);

var _SpinnerOverlay = require('../SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _CircleButton = require('../CircleButton');

var _CircleButton2 = _interopRequireDefault(_CircleButton);

var _Answer = require('../../assets/images/Answer.svg');

var _Answer2 = _interopRequireDefault(_Answer);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DialerPanel(_ref) {
  var callButtonDisabled = _ref.callButtonDisabled,
      className = _ref.className,
      keepToNumber = _ref.keepToNumber,
      onCall = _ref.onCall,
      toNumber = _ref.toNumber,
      fromNumber = _ref.fromNumber,
      fromNumbers = _ref.fromNumbers,
      changeFromNumber = _ref.changeFromNumber,
      formatPhone = _ref.formatPhone,
      isWebphoneMode = _ref.isWebphoneMode,
      currentLocale = _ref.currentLocale,
      showSpinner = _ref.showSpinner;

  var onCallFunc = function onCallFunc() {
    if (!callButtonDisabled) {
      onCall();
    }
  };
  var content = showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, null) : null;
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, className) },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.inputFields },
      _react2.default.createElement(_DialTextInput2.default, {
        value: toNumber,
        onChangeEvent: function onChangeEvent(event) {
          keepToNumber(event.currentTarget.value);
        },
        onDelete: function onDelete() {
          keepToNumber('');
        },
        autoFocus: true
      }),
      _react2.default.createElement(_CallIdSelect2.default, {
        fromNumber: fromNumber,
        fromNumbers: fromNumbers,
        onChange: changeFromNumber,
        formatPhone: formatPhone,
        currentLocale: currentLocale,
        hidden: !isWebphoneMode
      })
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.dialButtons },
      _react2.default.createElement(_DialPad2.default, {
        className: _styles2.default.dialPad,
        onButtonOutput: function onButtonOutput(key) {
          keepToNumber(toNumber + key);
        }
      }),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.callBtnRow) },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.callBtn },
          _react2.default.createElement(_CircleButton2.default, {
            className: (0, _classnames2.default)(_styles2.default.dialBtn, callButtonDisabled && _styles2.default.disabled),
            onClick: onCallFunc,
            disabled: callButtonDisabled,
            icon: _Answer2.default,
            showBorder: false
          })
        )
      )
    ),
    content
  );
}
DialerPanel.propTypes = {
  className: _propTypes2.default.string,
  onCall: _propTypes2.default.func.isRequired,
  callButtonDisabled: _propTypes2.default.bool,
  isWebphoneMode: _propTypes2.default.bool,
  toNumber: _propTypes2.default.string,
  keepToNumber: _propTypes2.default.func,
  fromNumber: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string.isRequired,
  fromNumbers: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    phoneNumber: _propTypes2.default.string,
    usageType: _propTypes2.default.string
  })),
  changeFromNumber: _propTypes2.default.func,
  formatPhone: _propTypes2.default.func,
  showSpinner: _propTypes2.default.bool
};

DialerPanel.defaultProps = {
  className: null,
  fromNumber: null,
  callButtonDisabled: false,
  toNumber: '',
  fromNumbers: [],
  isWebphoneMode: false,
  changeFromNumber: function changeFromNumber() {
    return null;
  },
  keepToNumber: function keepToNumber() {
    return null;
  },
  formatPhone: function formatPhone(phoneNumber) {
    return phoneNumber;
  },
  showSpinner: false
};

exports.default = DialerPanel;
//# sourceMappingURL=index.js.map
