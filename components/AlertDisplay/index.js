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

// TODO animation

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

function AlertDisplay(props) {
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, props.className) },
    props.messages.map(function (message) {
      var Renderer = props.getRenderer(message);
      if (!Renderer) return null;
      return _react2.default.createElement(Message, {
        key: message.id,
        level: message.level,
        message: _react2.default.createElement(Renderer, {
          message: message,
          currentLocale: props.currentLocale
        }),
        onDismiss: function onDismiss() {
          props.dismiss(message.id);
        }
      });
    })
  );
}
AlertDisplay.propTypes = {
  className: _propTypes2.default.string,
  messages: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    level: _propTypes2.default.oneOf(['success', 'info', 'warning', 'danger']).isRequired,
    message: _propTypes2.default.string.isRequired,
    payload: _propTypes2.default.any
  })),
  getRenderer: _propTypes2.default.func,
  dismiss: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired
};
AlertDisplay.defaultProps = {
  getRenderer: function getRenderer() {
    return undefined;
  }
};

exports.default = AlertDisplay;
//# sourceMappingURL=index.js.map
