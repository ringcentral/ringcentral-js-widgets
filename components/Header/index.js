'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
      onClick: props.onClick
    },
    props.label
  );
}
HeaderButton.propTypes = {
  onClick: _react.PropTypes.func,
  label: _react.PropTypes.node,
  disabled: _react.PropTypes.bool
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
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  buttons: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.node.isRequired,
    onClick: _react.PropTypes.funcs,
    placement: _react.PropTypes.oneOf(['left', 'right'])
  }))
};

Header.defaultProps = {
  buttons: []
};

exports.default = Header;
//# sourceMappingURL=index.js.map
