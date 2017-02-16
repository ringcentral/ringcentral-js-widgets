'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IconField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IconField(props) {
  return _react2.default.createElement(
    'div',
    { className: props.className },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.content },
      props.children
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.iconHolder },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.icon },
        props.icon
      )
    )
  );
}

IconField.propTypes = {
  children: _react.PropTypes.node,
  icon: _react.PropTypes.node,
  className: _react.PropTypes.string
};
//# sourceMappingURL=index.js.map
