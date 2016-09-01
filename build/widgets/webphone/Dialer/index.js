'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _prefix = (0, _style2.default)(['dialer', 'dialerButton', 'dialerNumber', 'dialerSymbol', 'line'], 'Dialer');

var dialer = _prefix.dialer;
var dialerButton = _prefix.dialerButton;
var dialerNumber = _prefix.dialerNumber;
var dialerSymbol = _prefix.dialerSymbol;
var line = _prefix.line;


var Dialer = function Dialer(props) {
  return _react2.default.createElement(
    'div',
    { className: dialer },
    [[{ 1: '' }, { 2: 'ABC' }, { 3: 'DEF' }], [{ 4: 'GHI' }, { 5: 'JKL' }, { 6: 'MNO' }], [{ 7: 'PQRS' }, { 8: 'TUV' }, { 9: 'WXYZ' }], [{ '*': '' }, { 0: '+' }, { '#': '' }]].map(function (row, index) {
      return _react2.default.createElement(
        'div',
        {
          key: 'line-' + index,
          className: line
        },
        row.map(function (symbol) {
          return _react2.default.createElement(
            'button',
            {
              key: Object.keys(symbol)[0],
              onClick: function onClick() {
                return props.handleClick(Object.keys(symbol)[0]);
              },
              className: dialerButton
            },
            _react2.default.createElement(
              'div',
              { className: dialerNumber },
              Object.keys(symbol)[0]
            ),
            _react2.default.createElement(
              'div',
              { className: dialerSymbol },
              symbol[Object.keys(symbol)[0]]
            )
          );
        })
      );
    })
  );
};

Dialer.propTypes = {
  handleClick: _react2.default.PropTypes.func,
  scale: _react2.default.PropTypes.number
};

exports.default = Dialer;