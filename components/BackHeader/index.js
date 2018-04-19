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

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BackHeader = function BackHeader(props) {
  var buttons = props.buttons || [];
  var defaultBackButton = _react2.default.createElement('i', { className: (0, _classnames2.default)(_DynamicsFont2.default.arrow, _styles2.default.iconRotate) });
  buttons.push({
    label: props.backButton || defaultBackButton,
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
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  backButton: _propTypes2.default.node,
  buttons: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.node.isRequired,
    onClick: _propTypes2.default.funcs,
    placement: _propTypes2.default.oneOf(['left', 'right'])
  })),
  onBackClick: _propTypes2.default.func
};

BackHeader.defaultProps = {
  className: '',
  buttons: undefined,
  backButton: undefined
};
//# sourceMappingURL=index.js.map
