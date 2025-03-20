"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.map");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TRANSPORTER_TYPES = void 0;
require("regenerator-runtime/runtime");
var uuid = _interopRequireWildcard(require("uuid"));
var _TransportBase2 = require("../TransportBase");
var _MessageTransporters = require("./MessageTransporters");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var TRANSPORTER_TYPES = {
  POST_MESSAGE: 'postMessage',
  EVENT_EMITTER: 'eventEmitter'
};
exports.TRANSPORTER_TYPES = TRANSPORTER_TYPES;
var MessageTransport = /*#__PURE__*/function (_TransportBase) {
  _inherits(MessageTransport, _TransportBase);
  var _super = _createSuper(MessageTransport);
  function MessageTransport(_ref) {
    var _this;
    var _ref$transporterType = _ref.transporterType,
      transporterType = _ref$transporterType === void 0 ? TRANSPORTER_TYPES.POST_MESSAGE : _ref$transporterType,
      _ref$transporterDirec = _ref.transporterDirection,
      transporterDirection = _ref$transporterDirec === void 0 ? _MessageTransporters.TRANSPORTER_DIRECTION.TO_EXTERNAL : _ref$transporterDirec,
      _ref$targetWindow = _ref.targetWindow,
      targetWindow = _ref$targetWindow === void 0 ? window : _ref$targetWindow,
      origin = _ref.origin,
      options = _objectWithoutProperties(_ref, ["transporterType", "transporterDirection", "targetWindow", "origin"]);
    _classCallCheck(this, MessageTransport);
    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      name: 'MessageTransport'
    }));
    _this._addReceiver = void 0;
    _this._createEmitter = void 0;
    _this._targetWindow = void 0;
    _this._origin = void 0;
    _this._myRequests = void 0;
    _this._othersRequests = void 0;
    _this._postMessage = void 0;
    _this._transporter = void 0;
    _this._onMessage = function (event) {
      // TODO: confirm if the message is from iframe
      if (_this._origin && event.origin !== _this._origin) {
        return;
      }
      var _event$data = event.data,
        type = _event$data.type,
        payload = _event$data.payload,
        requestId = _event$data.requestId,
        result = _event$data.result,
        error = _event$data.error;
      switch (type) {
        case _this._events.push:
          if (payload) {
            _this.emit(_this._events.push, payload);
          }
          break;
        case _this._events.response:
          if (requestId && _this._myRequests.has(requestId)) {
            if (error) {
              _this._myRequests.get(requestId).reject(new Error(error));
            } else {
              _this._myRequests.get(requestId).resolve(result);
            }
          }
          break;
        case _this._events.request:
          if (requestId && payload) {
            _this._othersRequests.set(requestId, payload);
            _this.emit(_this._events.request, {
              requestId: requestId,
              payload: payload
            });
          }
          break;
        default:
          break;
      }
    };
    _this.dispose = function () {
      if (_this._transporter instanceof _MessageTransporters.PostMessageTransporter) {
        _this._transporter.dispose(_this._onMessage);
      }
    };
    switch (transporterType) {
      case TRANSPORTER_TYPES.EVENT_EMITTER:
        _this._transporter = new _MessageTransporters.EventEmitterTransporter({
          direction: transporterDirection
        });
        break;
      default:
      case TRANSPORTER_TYPES.POST_MESSAGE:
        _this._transporter = new _MessageTransporters.PostMessageTransporter();
        break;
    }
    _this._addReceiver = _this._transporter.addReceiver;
    _this._createEmitter = _this._transporter.createEmitter;
    _this._targetWindow = targetWindow;
    _this._origin = origin;
    _this._myRequests = new Map();
    _this._othersRequests = new Map();
    _this._postMessage = _this._createEmitter(_this._targetWindow);
    _this._addReceiver(_this._onMessage);
    return _this;
  }
  _createClass(MessageTransport, [{
    key: "addListeners",
    value: function addListeners(_ref2) {
      var push = _ref2.push,
        response = _ref2.response,
        request = _ref2.request;
      if (typeof push === 'function') {
        this.on(this._events.push, push);
      }
      if (typeof response === 'function') {
        this.on(this._events.response, response);
      }
      if (typeof request === 'function') {
        this.on(this._events.request, request);
      }
    } /** T is request data, K is response data */
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref3) {
        var _this2 = this;
        var payload, requestId, promise, timeout;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                payload = _ref3.payload;
                requestId = uuid.v4();
                promise = new Promise(function (resolve, reject) {
                  _this2._myRequests.set(requestId, {
                    resolve: resolve,
                    reject: reject
                  });
                  _this2._postMessage({
                    type: _this2._events.request,
                    requestId: requestId,
                    payload: payload
                  });
                });
                timeout = setTimeout(function () {
                  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
                  timeout = null;
                  _this2._myRequests.get(requestId).reject(new Error("".concat(_this2._events.timeout, ": ").concat(JSON.stringify(payload))));
                }, this._timeout);
                return _context.abrupt("return", promise.then(function (result) {
                  if (timeout) clearTimeout(timeout);
                  _this2._myRequests["delete"](requestId);
                  return Promise.resolve(result);
                })["catch"](function (error) {
                  if (timeout) clearTimeout(timeout);
                  _this2._myRequests["delete"](requestId);
                  return Promise.reject(error);
                }));
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function request(_x) {
        return _request.apply(this, arguments);
      }
      return request;
    }()
    /**
     * Send message without response
     * @param {payload}
     */
  }, {
    key: "send",
    value: function send(_ref4) {
      var payload = _ref4.payload;
      this._postMessage({
        type: this._events.push,
        payload: payload
      });
    }
  }, {
    key: "response",
    value: function response(_ref5) {
      var requestId = _ref5.requestId,
        result = _ref5.result,
        error = _ref5.error;
      var request = this._othersRequests.get(requestId);
      if (request) {
        this._othersRequests["delete"](requestId);
        this._postMessage({
          type: this._events.response,
          requestId: requestId,
          result: result,
          error: error instanceof Error ? error.message : error
        });
      }
      return {
        result: result,
        error: error,
        requestId: requestId
      };
    }
  }]);
  return MessageTransport;
}(_TransportBase2.TransportBase);
exports["default"] = MessageTransport;
//# sourceMappingURL=MessageTransport.js.map
