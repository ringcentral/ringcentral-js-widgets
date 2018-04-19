'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DialPad;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DialButton = require('../DialButton');

var _DialButton2 = _interopRequireDefault(_DialButton);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyConfig = [[{ value: '1', text: '' }, { value: '2', text: 'ABC', dx: '175' }, { value: '3', text: 'DEF', dx: '180' }], [{ value: '4', text: 'GHI', dx: '175' }, { value: '5', text: 'JKL', dx: '180' }, { value: '6', text: 'MNO', dx: '155' }], [{ value: '7', text: 'PQRS', dx: '140' }, { value: '8', text: 'TUV', dx: '175' }, { value: '9', text: 'WXYZ', dx: '140' }], [{ value: '*', text: '' }, {
  value: '0', text: '+', alternativeValue: '+', dx: '220'
}, { value: '#', text: '' }]];

function DialPad(_ref) {
  var className = _ref.className,
      hideSpecial = _ref.hideSpecial,
      onButtonPress = _ref.onButtonPress,
      onButtonOutput = _ref.onButtonOutput,
      alternativeTimeout = _ref.alternativeTimeout,
      dialButtonVolume = _ref.dialButtonVolume,
      dialButtonMuted = _ref.dialButtonMuted;

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, className) },
    keyConfig.map(function (row, rowIdx) {
      return _react2.default.createElement(
        'div',
        { key: rowIdx, className: _styles2.default.row },
        row.map(function (btn) {
          if (hideSpecial && (btn.value === '*' || btn.value === '#')) {
            return _react2.default.createElement('div', { key: btn.value, className: _styles2.default.btnPlaceholder });
          }
          return _react2.default.createElement(_DialButton2.default, {
            key: btn.value,
            btn: btn,
            className: _styles2.default.btnPlaceholder,
            onPress: onButtonPress,
            onOutput: onButtonOutput,
            alternativeTimeout: alternativeTimeout,
            volume: dialButtonVolume,
            muted: dialButtonMuted
          });
        })
      );
    })
  );
}

DialPad.propTypes = {
  className: _propTypes2.default.string,
  hideSpecial: _propTypes2.default.bool,
  onButtonPress: _propTypes2.default.func,
  onButtonOutput: _propTypes2.default.func,
  alternativeTimeout: _propTypes2.default.number,
  dialButtonVolume: _propTypes2.default.number,
  dialButtonMuted: _propTypes2.default.bool
};

DialPad.defaultProps = {
  className: undefined,
  hideSpecial: false,
  onButtonPress: undefined,
  onButtonOutput: undefined,
  alternativeTimeout: undefined,
  dialButtonVolume: 1,
  dialButtonMuted: false
};
//# sourceMappingURL=index.js.map
