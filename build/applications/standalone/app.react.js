'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _webphone = require('./containers/webphone');

var _webphone2 = _interopRequireDefault(_webphone);

var _auth = require('./containers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _app = require('./app.css');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(props) {
  return _react2.default.createElement(
    'div',
    { className: _app2.default.app },
    props.loggedIn ? _react2.default.createElement(_webphone2.default, null) : _react2.default.createElement(_auth2.default, null)
  );
};

App.propTypes = {
  loggedIn: _react2.default.PropTypes.bool
};

// todo: enums
exports.default = (0, _reactRedux.connect)(function (state) {
  return { loggedIn: state.common.auth.status === 'LOGGED_IN' };
})(App);