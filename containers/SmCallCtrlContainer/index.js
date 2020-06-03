"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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


var SmCallCtrlContainer = /*#__PURE__*/function (_Component) {
  _inherits(SmCallCtrlContainer, _Component);

  var _super = _createSuper(SmCallCtrlContainer);

  function SmCallCtrlContainer() {
    _classCallCheck(this, SmCallCtrlContainer);

    return _super.apply(this, arguments);
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
        onMute: function () {
          var _onMute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    return _context.abrupt("return", _this.props.mute(telephonySessionId));

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function onMute() {
            return _onMute.apply(this, arguments);
          }

          return onMute;
        }(),
        onUnmute: function () {
          var _onUnmute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    return _context2.abrupt("return", _this.props.unmute(telephonySessionId));

                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function onUnmute() {
            return _onUnmute.apply(this, arguments);
          }

          return onUnmute;
        }(),
        onHangup: function () {
          var _onHangup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt("return", _this.props.hangUp(telephonySessionId));

                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          function onHangup() {
            return _onHangup.apply(this, arguments);
          }

          return onHangup;
        }(),
        onReject: function () {
          var _onReject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    return _context4.abrupt("return", _this.props.reject(telephonySessionId));

                  case 1:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          function onReject() {
            return _onReject.apply(this, arguments);
          }

          return onReject;
        }(),
        isOnMute: currentSession.isOnMute,
        callStatus: currentSession.callStatus,
        callDirection: currentSession.direction,
        currentLocale: currentLocale
      };
      return /*#__PURE__*/_react["default"].createElement(_SmCallControl["default"], props);
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
