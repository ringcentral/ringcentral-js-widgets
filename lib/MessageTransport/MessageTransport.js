"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
var _TransportBase2 = _interopRequireDefault(require("../TransportBase"));
var _MessageTransporters = require("./MessageTransporters");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
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
}(_TransportBase2["default"]);
exports["default"] = MessageTransport;
//# sourceMappingURL=MessageTransport.js.map
