'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DialPad = require('../DialPad');

var _DialPad2 = _interopRequireDefault(_DialPad);

var _DialTextInput = require('../DialTextInput');

var _DialTextInput2 = _interopRequireDefault(_DialTextInput);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DialerPanel(_ref) {
  var callButtonDisabled = _ref.callButtonDisabled,
      className = _ref.className,
      keepToNumber = _ref.keepToNumber,
      onCall = _ref.onCall,
      toNumber = _ref.toNumber;

  var onCallFunc = function onCallFunc() {
    !callButtonDisabled && onCall();
  };
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, className) },
    _react2.default.createElement(_DialTextInput2.default, {
      value: toNumber,
      onChangeEvent: function onChangeEvent(event) {
        keepToNumber(event.currentTarget.value);
      },
      onDelete: function onDelete() {
        keepToNumber('');
      }
    }),
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
          _react2.default.createElement(
            'svg',
            { className: _styles2.default.btnSvg, viewBox: '0 0 500 500' },
            _react2.default.createElement(
              'g',
              {
                className: (0, _classnames2.default)(_styles2.default.btnSvgGroup, callButtonDisabled && _styles2.default.disabled),
                onClick: onCallFunc
              },
              _react2.default.createElement('circle', {
                className: _styles2.default.circle,
                cx: '250',
                cy: '250',
                r: '200'
              }),
              _react2.default.createElement('text', {
                className: _styles2.default.btnValue,
                x: '0',
                dx: '167.5155',
                y: '0',
                dy: '300',
                dangerouslySetInnerHTML: {
                  __html: '&#xe953;'
                } })
            )
          )
        )
      )
    )
  );
}
DialerPanel.propTypes = {
  className: _react.PropTypes.string,
  onCall: _react.PropTypes.func.isRequired,
  callButtonDisabled: _react.PropTypes.bool,
  toNumber: _react.PropTypes.string,
  keepToNumber: _react.PropTypes.func
};

exports.default = DialerPanel;
//# sourceMappingURL=index.js.map
