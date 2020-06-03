"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.promise");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.bind");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _uuid = _interopRequireDefault(require("uuid"));

var _TransportBase2 = _interopRequireDefault(require("../TransportBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var DEFAULT_DEVICE = {
  addReceiver: function addReceiver(receiveMessage) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$useCapture = _ref.useCapture,
        useCapture = _ref$useCapture === void 0 ? false : _ref$useCapture;

    window.addEventListener('message', receiveMessage, useCapture);
  },
  createEmitter: function createEmitter(sendTarget) {
    // Always specify an exact target origin, not *,
    // when you use postMessage to send data to other windows.
    // A malicious site can change the location of the window without your knowledge,
    // and therefore it can intercept the data sent using postMessage.
    return function (message) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$targetOrigin = _ref2.targetOrigin,
          targetOrigin = _ref2$targetOrigin === void 0 ? '*' : _ref2$targetOrigin,
          callback = _ref2.callback;

      sendTarget.postMessage(message, targetOrigin);
      if (typeof callback === 'function') callback();
    };
  }
};

var MessageTransport = /*#__PURE__*/function (_TransportBase) {
  _inherits(MessageTransport, _TransportBase);

  var _super = _createSuper(MessageTransport);

  function MessageTransport(_ref3) {
    var _this;

    var _ref3$addReceiver = _ref3.addReceiver,
        addReceiver = _ref3$addReceiver === void 0 ? DEFAULT_DEVICE.addReceiver : _ref3$addReceiver,
        _ref3$createEmitter = _ref3.createEmitter,
        createEmitter = _ref3$createEmitter === void 0 ? DEFAULT_DEVICE.createEmitter : _ref3$createEmitter,
        _ref3$targetWindow = _ref3.targetWindow,
        targetWindow = _ref3$targetWindow === void 0 ? window : _ref3$targetWindow,
        origin = _ref3.origin,
        options = _objectWithoutProperties(_ref3, ["addReceiver", "createEmitter", "targetWindow", "origin"]);

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

    _this._addReceiver = addReceiver;
    _this._createEmitter = createEmitter;
    _this._targetWindow = targetWindow;
    _this._origin = origin;
    _this._myRequests = new Map();
    _this._othersRequests = new Map();
    _this._postMessage = _this._createEmitter(_this._targetWindow);

    _this._addReceiver(_this._onMessage.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(MessageTransport, [{
    key: "addListeners",
    value: function addListeners(_ref4) {
      var push = _ref4.push,
          response = _ref4.response,
          request = _ref4.request;

      if (typeof push === 'function') {
        this.on(this._events.push, push);
      }

      if (typeof response === 'function') {
        this.on(this._events.response, response);
      }

      if (typeof request === 'function') {
        this.on(this._events.request, request);
      }
    }
    /** T is request data, K is response data */

  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref5) {
        var _this2 = this;

        var payload, requestId, promise, timeout;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                payload = _ref5.payload;
                requestId = _uuid["default"].v4();
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
  }, {
    key: "response",
    value: function response(_ref6) {
      var requestId = _ref6.requestId,
          result = _ref6.result,
          error = _ref6.error;

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
