"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("regenerator-runtime/runtime");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reselect = require("reselect");

var _ramda = require("ramda");

var _withPhone = _interopRequireDefault(require("../../lib/withPhone"));

var _CallsOnholdPanel = _interopRequireDefault(require("../../components/CallsOnholdPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CallsOnholdContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(CallsOnholdContainer, _Component);

  function CallsOnholdContainer(props) {
    var _this;

    _classCallCheck(this, CallsOnholdContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CallsOnholdContainer).call(this, props));
    _this.getCalls = (0, _reselect.createSelector)(function () {
      return _this.props.calls;
    }, function () {
      return _this.props.fromSessionId;
    }, function (calls, fromSessionId) {
      return (0, _ramda.filter)(function (call) {
        return call.webphoneSession && !_this.props.isConferenceSession(call.webphoneSession) && call.webphoneSession.id !== fromSessionId;
      }, calls);
    });
    return _this;
  }

  _createClass(CallsOnholdContainer, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement(_CallsOnholdPanel["default"], _extends({}, this.props, {
        calls: this.getCalls()
      }));
    }
  }]);

  return CallsOnholdContainer;
}(_react.Component);

CallsOnholdContainer.propTypes = {
  calls: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  fromSessionId: _propTypes["default"].string.isRequired,
  isConferenceSession: _propTypes["default"].func.isRequired
};

function mapToProps(_, _ref) {
  var phone = _ref.phone,
      callMonitor = _ref.phone.callMonitor,
      params = _ref.params,
      props = _objectWithoutProperties(_ref, ["phone", "phone", "params"]);

  var fromSessionId = params.fromSessionId;
  var baseProps = phone.activeCallsUI.getUIProps(_objectSpread({}, props));
  return _objectSpread({}, baseProps, {
    calls: callMonitor.calls,
    fromSessionId: fromSessionId
  });
}

function mapToFunctions(_, _ref2) {
  var params = _ref2.params,
      phone = _ref2.phone,
      _ref2$phone = _ref2.phone,
      webphone = _ref2$phone.webphone,
      conferenceCall = _ref2$phone.conferenceCall,
      routerInteraction = _ref2$phone.routerInteraction,
      callMonitor = _ref2$phone.callMonitor,
      getAvatarUrl = _ref2.getAvatarUrl,
      props = _objectWithoutProperties(_ref2, ["params", "phone", "phone", "getAvatarUrl"]);

  var fromSessionId = params.fromSessionId;
  var baseProps = phone.activeCallsUI.getUIFunctions(_objectSpread({
    params: params
  }, props));
  return _objectSpread({}, baseProps, {
    onMerge: function onMerge(sessionId) {
      var sessions, confId, confSessionId;
      return regeneratorRuntime.async(function onMerge$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // to track user click merge
              callMonitor.callsOnHoldClickMergeTrack();
              _context.next = 3;
              return regeneratorRuntime.awrap(conferenceCall.parseMergingSessions({
                sessionId: sessionId,
                sessionIdToMergeWith: fromSessionId
              }));

            case 3:
              sessions = _context.sent;

              if (!sessions) {
                _context.next = 9;
                break;
              }

              confId = conferenceCall.conferences && Object.keys(conferenceCall.conferences)[0];

              if (confId) {
                confSessionId = conferenceCall.conferences[confId].sessionId;
                routerInteraction.push("/calls/active/".concat(confSessionId));
              } else {
                routerInteraction.goBack();
              }

              _context.next = 9;
              return regeneratorRuntime.awrap(conferenceCall.mergeSessions(sessions));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    onBackButtonClick: function onBackButtonClick() {
      if (webphone.sessions.length) {
        routerInteraction.goBack();
        return;
      }

      phone.routerInteraction.go(-2);
    },
    onAdd: function onAdd() {
      // to track use click add button
      callMonitor.callsOnHoldClickAddTrack();
      routerInteraction.push("/conferenceCall/dialer/".concat(params.fromNumber, "/").concat(params.fromSessionId));
    },
    getAvatarUrl: getAvatarUrl,
    isConferenceSession: function isConferenceSession() {
      return conferenceCall.isConferenceSession.apply(conferenceCall, arguments);
    },
    webphoneHangup: function webphoneHangup() {
      var _args2 = arguments;
      return regeneratorRuntime.async(function webphoneHangup$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // track user click hangup on calls onhold page
              callMonitor.callsOnHoldClickHangupTrack();
              return _context2.abrupt("return", webphone && webphone.hangup.apply(webphone, _args2));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  });
}

var CallsOnholdPage = (0, _withPhone["default"])((0, _reactRedux.connect)(mapToProps, mapToFunctions)(CallsOnholdContainer));
var _default = CallsOnholdPage;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
