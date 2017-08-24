'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IconField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
  children: _propTypes2.default.node,
  icon: _propTypes2.default.node,
  className: _propTypes2.default.string
};
//# sourceMappingURL=index.js.map
