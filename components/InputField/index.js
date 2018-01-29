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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InputField(props) {
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, props.className) },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.label },
      props.label,
      _react2.default.createElement(
        'div',
        { className: _styles2.default.hint },
        props.labelHint
      )
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.inputHolder },
      props.children
    )
  );
}

InputField.propTypes = {
  children: _propTypes2.default.node,
  label: _propTypes2.default.node,
  labelHint: _propTypes2.default.node,
  className: _propTypes2.default.string
};
InputField.defaultProps = {
  children: undefined,
  label: undefined,
  labelHint: undefined,
  className: undefined
};

exports.default = InputField;
//# sourceMappingURL=index.js.map
