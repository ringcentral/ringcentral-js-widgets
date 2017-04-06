'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BackHeader = function BackHeader(props) {
  var buttons = props.buttons;
  buttons.push({
    label: _react2.default.createElement('i', { className: (0, _classnames2.default)(_DynamicsFont2.default.arrow, _styles2.default.iconRotate) }),
    onClick: props.onBackClick,
    placement: 'left'
  });
  return _react2.default.createElement(
    _Header2.default,
    {
      buttons: buttons,
      className: props.className },
    props.children
  );
};
exports.default = BackHeader;


BackHeader.propTypes = {
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  buttons: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.node.isRequired,
    onClick: _react.PropTypes.funcs,
    placement: _react.PropTypes.oneOf(['left', 'right'])
  })),
  onBackClick: _react.PropTypes.func
};

BackHeader.defaultProps = {
  className: '',
  buttons: []
};
//# sourceMappingURL=index.js.map
