'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.HeaderButton = HeaderButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HeaderButton(props) {
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.button, props.disabled && _styles2.default.disabled),
      onClick: props.disabled ? undefined : props.onClick,
      title: props.title
    },
    props.label
  );
}
HeaderButton.propTypes = {
  onClick: _propTypes2.default.func,
  label: _propTypes2.default.node,
  disabled: _propTypes2.default.bool,
  title: _propTypes2.default.string
};

HeaderButton.defaultProps = {
  title: undefined
};

function Header(props) {
  var label = null;
  if (props.children) {
    label = _react2.default.createElement(
      'div',
      { className: _styles2.default.label },
      props.children
    );
  }
  var leftButtons = props.buttons.filter(function (b) {
    return b.placement !== 'right' && !b.hidden;
  }).map(function (b, idx) {
    return _react2.default.createElement(HeaderButton, (0, _extends3.default)({ key: idx }, b));
  });
  var rightButtons = props.buttons.filter(function (b) {
    return b.placement === 'right' && !b.hidden;
  }).map(function (b, idx) {
    return _react2.default.createElement(HeaderButton, (0, _extends3.default)({ key: idx }, b));
  });

  return _react2.default.createElement(
    'header',
    { className: (0, _classnames2.default)(_styles2.default.root, props.className) },
    label,
    leftButtons.length ? _react2.default.createElement(
      'div',
      { className: _styles2.default.leftButtons },
      leftButtons
    ) : null,
    rightButtons.length ? _react2.default.createElement(
      'div',
      { className: _styles2.default.rightButtons },
      rightButtons
    ) : null
  );
}

Header.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  buttons: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.node.isRequired,
    onClick: _propTypes2.default.funcs,
    placement: _propTypes2.default.oneOf(['left', 'right'])
  }))
};

Header.defaultProps = {
  buttons: []
};

exports.default = Header;
//# sourceMappingURL=index.js.map
