'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SmCallControl = require('../../components/SmCallControl');

var _SmCallControl2 = _interopRequireDefault(_SmCallControl);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var phone = _ref.phone;
  var activeCallControl = phone.activeCallControl;
  var activeSessions = activeCallControl.activeSessions;

  return {
    activeCallControl: activeCallControl,
    activeSessions: activeSessions
  };
} /**
   * @file small call contrl
   * detail: https://jira.ringcentral.com/browse/RCINT-8248
   */

function mapToFunctions(_, _ref2) {
  var phone = _ref2.phone;
  var activeCallControl = phone.activeCallControl;

  return {
    mute: activeCallControl.mute.bind(activeCallControl),
    unmute: activeCallControl.unmute.bind(activeCallControl),
    hangUp: activeCallControl.hangUp.bind(activeCallControl),
    reject: activeCallControl.reject.bind(activeCallControl)
  };
}

/* eslint-disable react/prefer-stateless-function */

var SmCallCtrlContainer = function (_Component) {
  (0, _inherits3.default)(SmCallCtrlContainer, _Component);

  function SmCallCtrlContainer() {
    (0, _classCallCheck3.default)(this, SmCallCtrlContainer);
    return (0, _possibleConstructorReturn3.default)(this, (SmCallCtrlContainer.__proto__ || (0, _getPrototypeOf2.default)(SmCallCtrlContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(SmCallCtrlContainer, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          currentLocale = _props.currentLocale,
          activeSessions = _props.activeSessions,
          sessionId = _props.sessionId;

      var currentSession = activeSessions[sessionId];
      if (!currentSession) {
        return null;
      }
      var props = {
        onMute: function () {
          var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    return _context.abrupt('return', _this2.props.mute(sessionId));

                  case 1:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this2);
          }));

          function onMute() {
            return _ref3.apply(this, arguments);
          }

          return onMute;
        }(),
        onUnmute: function () {
          var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    return _context2.abrupt('return', _this2.props.unmute(sessionId));

                  case 1:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this2);
          }));

          function onUnmute() {
            return _ref4.apply(this, arguments);
          }

          return onUnmute;
        }(),
        onHangup: function () {
          var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt('return', _this2.props.hangUp(sessionId));

                  case 1:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, _this2);
          }));

          function onHangup() {
            return _ref5.apply(this, arguments);
          }

          return onHangup;
        }(),
        onReject: function () {
          var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    return _context4.abrupt('return', _this2.props.reject(sessionId));

                  case 1:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, _callee4, _this2);
          }));

          function onReject() {
            return _ref6.apply(this, arguments);
          }

          return onReject;
        }(),
        isOnMute: currentSession.isOnMute,
        callStatus: currentSession.callStatus,
        callDirection: currentSession.direction,
        currentLocale: currentLocale
      };
      return _react2.default.createElement(_SmCallControl2.default, props);
    }
  }]);
  return SmCallCtrlContainer;
}(_react.Component);

SmCallCtrlContainer.propTypes = {
  currentLocale: _propTypes2.default.string,
  activeCallControl: _propTypes2.default.object,
  activeSessions: _propTypes2.default.object,
  sessionId: _propTypes2.default.string,
  status: _propTypes2.default.string,
  mute: _propTypes2.default.func.isRequired,
  unmute: _propTypes2.default.func.isRequired,
  hangUp: _propTypes2.default.func.isRequired,
  reject: _propTypes2.default.func.isRequired
};

SmCallCtrlContainer.defaultProps = {
  currentLocale: 'en-US',
  activeCallControl: {},
  activeSessions: {},
  sessionId: '',
  status: ''
};
exports.default = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(SmCallCtrlContainer));
//# sourceMappingURL=index.js.map
