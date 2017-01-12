'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('font-awesome/css/font-awesome.css');

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
        _react2.default.createElement('i', { className: (0, _classnames2.default)('fa', 'fa-times') })
      )
    )
  );
}
Message.propTypes = {
  level: _react.PropTypes.string.isRequired,
  message: _react.PropTypes.node.isRequired,
  onDismiss: _react.PropTypes.func.isRequired
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
  className: _react.PropTypes.string,
  messages: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    id: _react.PropTypes.string.isRequired,
    level: _react.PropTypes.string.isRequired,
    message: _react.PropTypes.string.isRequired,
    payload: _react.PropTypes.any
  })),
  getRenderer: _react.PropTypes.func,
  dismiss: _react.PropTypes.func.isRequired,
  currentLocale: _react.PropTypes.string.isRequired
};
AlertDisplay.defaultProps = {
  getRenderer: function getRenderer() {
    return undefined;
  }
};

exports.default = AlertDisplay;
//# sourceMappingURL=index.js.map
