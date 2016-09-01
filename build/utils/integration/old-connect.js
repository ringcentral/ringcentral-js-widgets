'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connect;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function connect(mapActionsToProps) {
  return function wrapWithConnect(WrappedComponent) {
    var displayName = 'PhoneConnect(' + getDisplayName(WrappedComponent) + ')';
    var Connect = function Connect(props, context) {
      var mergedProps = Object.assign(mapActionsToProps(context.phone), props);
      return _react2.default.createElement(WrappedComponent, mergedProps);
    };
    Connect.contextTypes = {
      phone: _react2.default.PropTypes.object
    };
    Connect.displayName = displayName;
    return Connect;
  };
}