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

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Message(props) {
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.alertHolder },
    _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(_styles2.default[props.level]) },
      props.message,
      _react2.default.createElement(
        'div',
        {
          className: _styles2.default.dismiss,
          onClick: props.onDismiss },
        _react2.default.createElement('i', { className: _DynamicsFont2.default.close })
      )
    )
  );
}

Message.propTypes = {
  level: _propTypes2.default.string.isRequired,
  message: _propTypes2.default.node.isRequired,
  onDismiss: _propTypes2.default.func.isRequired
};

exports.default = Message;
//# sourceMappingURL=index.js.map
