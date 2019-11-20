"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.bind");

var _reactRedux = require("react-redux");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SmCallControl = _interopRequireDefault(require("../../components/SmCallControl"));

var _withPhone = _interopRequireDefault(require("../../lib/withPhone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function mapToProps(_, _ref) {
  var phone = _ref.phone,
      sessionId = _ref.sessionId;
  var activeCallControl = phone.activeCallControl;
  var telephonySessionId = activeCallControl.sessionIdToTelephonySessionIdMapping[sessionId];
  var currentSession = activeCallControl.getActiveSession(telephonySessionId);
  return {
    activeCallControl: activeCallControl,
    currentSession: currentSession,
    telephonySessionId: telephonySessionId
  };
}

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


var SmCallCtrlContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(SmCallCtrlContainer, _Component);

  function SmCallCtrlContainer() {
    _classCallCheck(this, SmCallCtrlContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(SmCallCtrlContainer).apply(this, arguments));
  }

  _createClass(SmCallCtrlContainer, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          currentLocale = _this$props.currentLocale,
          telephonySessionId = _this$props.telephonySessionId,
          currentSession = _this$props.currentSession;

      if (!currentSession) {
        return null;
      }

      var props = {
        onMute: function onMute() {
          return regeneratorRuntime.async(function onMute$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", _this.props.mute(telephonySessionId));

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          });
        },
        onUnmute: function onUnmute() {
          return regeneratorRuntime.async(function onUnmute$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", _this.props.unmute(telephonySessionId));

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          });
        },
        onHangup: function onHangup() {
          return regeneratorRuntime.async(function onHangup$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt("return", _this.props.hangUp(telephonySessionId));

                case 1:
                case "end":
                  return _context3.stop();
              }
            }
          });
        },
        onReject: function onReject() {
          return regeneratorRuntime.async(function onReject$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt("return", _this.props.reject(telephonySessionId));

                case 1:
                case "end":
                  return _context4.stop();
              }
            }
          });
        },
        isOnMute: currentSession.isOnMute,
        callStatus: currentSession.callStatus,
        callDirection: currentSession.direction,
        currentLocale: currentLocale
      };
      return _react["default"].createElement(_SmCallControl["default"], props);
    }
  }]);

  return SmCallCtrlContainer;
}(_react.Component);

SmCallCtrlContainer.propTypes = {
  currentLocale: _propTypes["default"].string,
  activeCallControl: _propTypes["default"].object,
  activeSessions: _propTypes["default"].object,
  telephonySessionId: _propTypes["default"].string,
  status: _propTypes["default"].string,
  mute: _propTypes["default"].func.isRequired,
  unmute: _propTypes["default"].func.isRequired,
  hangUp: _propTypes["default"].func.isRequired,
  reject: _propTypes["default"].func.isRequired,
  currentSession: _propTypes["default"].any
};
SmCallCtrlContainer.defaultProps = {
  currentLocale: 'en-US',
  activeCallControl: {},
  activeSessions: {},
  telephonySessionId: '',
  status: '',
  currentSession: undefined
};

var _default = (0, _withPhone["default"])((0, _reactRedux.connect)(mapToProps, mapToFunctions)(SmCallCtrlContainer));

exports["default"] = _default;
//# sourceMappingURL=index.js.map
