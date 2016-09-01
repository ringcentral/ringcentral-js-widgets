'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _List = require('../../shared/List/');

var _Flip = require('./Flip.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Flip = function Flip(props) {
  return _react2.default.createElement(
    'div',
    { className: _Flip.flip },
    _react2.default.createElement(
      'div',
      { className: _Flip.flipTitle },
      'Flip to'
    ),
    _react2.default.createElement(
      _List.List,
      null,
      props.numbers.map(function (number, index) {
        return _react2.default.createElement(
          _List.ListItem,
          {
            className: _Flip.flipItem,
            key: index,
            onClick: function onClick() {
              return props.flip(number.flipNumber);
            },
            clickable: true
          },
          _react2.default.createElement(
            'div',
            { className: _Flip.flipItemTitle },
            number.phoneNumber
          ),
          _react2.default.createElement(
            'div',
            { className: _Flip.flipItemSubtitle },
            number.label
          )
        );
      })
    )
  );
};

Flip.propTypes = {
  flipNumbers: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    value: _react2.default.PropTypes.string.isRequired,
    type: _react2.default.PropTypes.string.isRequired
  })),
  flip: _react2.default.PropTypes.object
};

Flip.defaultProps = {
  numbers: []
};

exports.default = Flip;