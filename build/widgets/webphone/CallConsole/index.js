'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

var _Icon = require('../../shared/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Ratio = require('../../shared/Ratio');

var _Ratio2 = _interopRequireDefault(_Ratio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _prefix = (0, _style2.default)(['button', 'disabled', 'word', 'icon', 'panel', 'line'], 'CallConsole');

var button = _prefix.button;
var disabled = _prefix.disabled;
var word = _prefix.word;
var icon = _prefix.icon;
var panel = _prefix.panel;
var line = _prefix.line;


function iconClass(iconId) {
  return (0, _classnames2.default)(icon);
}

var CallConsole = function CallConsole(props) {
  var _classNames, _classNames2, _classNames3, _classNames4, _classNames5, _classNames6;

  function contain(arr, target) {
    return arr && target && arr.indexOf(target) !== -1;
  }
  function isDisabled(action) {
    return props.disabled || action && contain(props.disabledOperation, action);
  }
  function ratio(child) {
    return _react2.default.createElement(
      _Ratio2.default,
      { size: 2.6 },
      child
    );
  }
  function noop() {}
  // TODO: replace constant with enums
  return _react2.default.createElement(
    'div',
    { className: panel },
    _react2.default.createElement(
      'div',
      { className: line },
      _react2.default.createElement(
        'button',
        {
          className: (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, button, true), _defineProperty(_classNames, disabled, isDisabled()), _classNames)),
          onClick: isDisabled() ? noop : function (event) {
            return props.handleHoldClick(!contain(props.status, 'HOLDING'));
          }
        },
        ratio(_react2.default.createElement(_Icon2.default, { id: contain(props.status, 'HOLDING') ? 'icon-uni35' : 'icon-uni28' })),
        _react2.default.createElement(
          'div',
          { className: word },
          'Hold'
        )
      ),
      _react2.default.createElement(
        'button',
        {
          className: (0, _classnames2.default)((_classNames2 = {}, _defineProperty(_classNames2, button, true), _defineProperty(_classNames2, disabled, isDisabled()), _classNames2)),
          onClick: isDisabled('dtmf') ? noop : props.handleKeypadClick
        },
        ratio(_react2.default.createElement(_Icon2.default, { id: 'icon-uni21' })),
        _react2.default.createElement(
          'div',
          { className: word },
          'Keypad'
        )
      ),
      _react2.default.createElement(
        'button',
        {
          className: (0, _classnames2.default)((_classNames3 = {}, _defineProperty(_classNames3, button, true), _defineProperty(_classNames3, disabled, isDisabled('record')), _classNames3)),
          onClick: isDisabled('record') ? noop : function () {
            return props.handleRecordClick(!contain(props.status, 'RECORDING'));
          }
        },
        ratio(_react2.default.createElement(_Icon2.default, { id: contain(props.status, 'RECORDING') ? 'icon-uni30' : 'icon-uni24' })),
        _react2.default.createElement(
          'div',
          { className: word },
          'Record'
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: line },
      _react2.default.createElement(
        'button',
        {
          className: (0, _classnames2.default)((_classNames4 = {}, _defineProperty(_classNames4, button, true), _defineProperty(_classNames4, disabled, isDisabled('flip')), _classNames4)),
          onClick: isDisabled('flip') ? noop : props.handleFlipClick
        },
        ratio(_react2.default.createElement(_Icon2.default, { id: 'icon-uni27' })),
        _react2.default.createElement(
          'div',
          { className: word },
          'Flip'
        )
      ),
      _react2.default.createElement(
        'button',
        {
          className: (0, _classnames2.default)((_classNames5 = {}, _defineProperty(_classNames5, button, true), _defineProperty(_classNames5, disabled, isDisabled('transfer')), _classNames5)),
          onClick: isDisabled('transfer') ? noop : props.handleTransferClick
        },
        ratio(_react2.default.createElement(_Icon2.default, { id: 'icon-uni23' })),
        _react2.default.createElement(
          'div',
          { className: word },
          'Transfer'
        )
      ),
      _react2.default.createElement(
        'button',
        {
          className: (0, _classnames2.default)((_classNames6 = {}, _defineProperty(_classNames6, button, true), _defineProperty(_classNames6, disabled, isDisabled('park')), _classNames6)),
          onClick: isDisabled('park') ? noop : props.handleParkClick
        },
        ratio(_react2.default.createElement(_Icon2.default, { id: 'icon-uni22' })),
        _react2.default.createElement(
          'div',
          { className: word },
          'Park'
        )
      )
    )
  );
};

CallConsole.propTypes = {
  status: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.oneOf(['RECORDING', 'HOLDING', 'MUTED'])),
  disabledOperation: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.oneOf(['record', 'flip', 'transfer', 'park'])),
  disabled: _react2.default.PropTypes.bool,
  handleHoldClick: _react2.default.PropTypes.func,
  handleRecordClick: _react2.default.PropTypes.func,
  handleKeypadClick: _react2.default.PropTypes.func,
  handleFlipClick: _react2.default.PropTypes.func,
  handleTransferClick: _react2.default.PropTypes.func,
  handleParkClick: _react2.default.PropTypes.func
};

exports.default = CallConsole;