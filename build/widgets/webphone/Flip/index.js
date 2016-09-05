'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _List = require('../../shared/List/');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('../../shared/ListItem/');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _prefix = (0, _style2.default)(['flip', 'flipTitle', 'flipItem', 'flipItemTitle', 'flipItemSubtitle'], 'Flip');

var flip = _prefix.flip;
var flipTitle = _prefix.flipTitle;
var flipItem = _prefix.flipItem;
var flipItemTitle = _prefix.flipItemTitle;
var flipItemSubtitle = _prefix.flipItemSubtitle;


var Flip = function Flip(props) {
  return _react2.default.createElement(
    'div',
    { className: flip },
    _react2.default.createElement(
      'div',
      { className: flipTitle },
      'Flip to'
    ),
    _react2.default.createElement(
      _List2.default,
      null,
      props.numbers.map(function (number, index) {
        return _react2.default.createElement(
          _ListItem2.default,
          {
            className: flipItem,
            key: index,
            onClick: function onClick() {
              return props.flip(number.flipNumber);
            },
            clickable: true
          },
          _react2.default.createElement(
            'div',
            { className: flipItemTitle },
            number.phoneNumber
          ),
          _react2.default.createElement(
            'div',
            { className: flipItemSubtitle },
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