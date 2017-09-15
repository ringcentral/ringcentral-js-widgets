'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _alertLevels = require('ringcentral-integration/modules/Alert/alertLevels');

var _alertLevels2 = _interopRequireDefault(_alertLevels);

var _Message = require('../Message');

var _Message2 = _interopRequireDefault(_Message);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AlertDisplay(props) {
  var RendererMessage = props.component;
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, props.className) },
    props.messages.map(function (message) {
      var Renderer = props.getRenderer(message);
      if (!Renderer) return null;
      return _react2.default.createElement(RendererMessage, {
        animation: message.animation,
        duration: message.duration,
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
    level: _propTypes2.default.oneOf((0, _keys2.default)(_alertLevels2.default)).isRequired,
    message: _propTypes2.default.string.isRequired,
    payload: _propTypes2.default.any
  })),
  getRenderer: _propTypes2.default.func,
  dismiss: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  animation: _propTypes2.default.string,
  duration: _propTypes2.default.number,
  component: _propTypes2.default.func
};
AlertDisplay.defaultProps = {
  getRenderer: function getRenderer() {
    return undefined;
  },
  component: _Message2.default
};

exports.default = AlertDisplay;
//# sourceMappingURL=index.js.map
