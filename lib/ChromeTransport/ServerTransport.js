"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerTransport = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.map");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

var _ramda = require("ramda");

var _TransportBase2 = _interopRequireDefault(require("../TransportBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/* global chrome */
var ServerTransport = /*#__PURE__*/function (_TransportBase) {
  _inherits(ServerTransport, _TransportBase);

  var _super = _createSuper(ServerTransport);

  function ServerTransport(options) {
    var _this;

    _classCallCheck(this, ServerTransport);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      name: 'ChromeTransport'
    }));
    _this._ports = new Set();
    _this._requests = new Map(); // Keep active tabs up to date

    _this._activeTabIds = null;

    _this._getActiveTabIds();

    chrome.tabs.onActivated.addListener(function () {
      return _this._getActiveTabIds();
    });
    chrome.runtime.onConnect.addListener(function (port) {
      if (port.name === 'transport') {
        _this._ports.add(port);

        port.onMessage.addListener(function (_ref) {
          var type = _ref.type,
              requestId = _ref.requestId,
              payload = _ref.payload;

          if (type === _this._events.request && requestId && payload) {
            _this._requests.set(requestId, port);

            _this.emit(_this._events.request, {
              requestId: requestId,
              payload: payload
            });
          }
        });
        port.onDisconnect.addListener(function () {
          _this._ports["delete"](port);
        });
      }
    });
    return _this;
  }

  _createClass(ServerTransport, [{
    key: "response",
    value: function response(_ref2) {
      var requestId = _ref2.requestId,
          result = _ref2.result,
          error = _ref2.error;

      var port = this._requests.get(requestId);

      if (port) {
        this._requests["delete"](requestId);

        if (error instanceof Error) {
          error = error.message;
        }

        port.postMessage({
          type: this._events.response,
          requestId: requestId,
          result: result,
          error: error
        });
      }
    }
  }, {
    key: "push",
    value: function push(_ref3) {
      var _this2 = this;

      var payload = _ref3.payload;
      var message = {
        type: this._events.push,
        payload: payload
      }; // Since postMessage is really expensive,
      // we only send messages to those ports on active tabs.

      (0, _ramda.forEach)(function (port) {
        if (port.sender && port.sender.tab && ( // send to all instances if app failed to query active tabs
        !_this2._activeTabIds || _this2._activeTabIds[port.sender.tab.id])) {
          port.postMessage(message);
        }
      }, this._ports);
    }
  }, {
    key: "_getActiveTabIds",
    value: function _getActiveTabIds() {
      var _this3 = this;

      return new Promise(function (resolve) {
        try {
          chrome.tabs.query({
            active: true
          }, function (tabs) {
            _this3._activeTabIds = Array.isArray(tabs) ? // convert tabs array into tabs id truth mapping
            (0, _ramda.reduce)(function (acc, tab) {
              if (tab.id) {
                acc[tab.id] = true;
              }

              return acc;
            }, {}, tabs) : null;
            resolve(!!_this3._activeTabIds);
          });
        } catch (error) {
          _this3._activeTabIds = null;
          console.log(error);
          resolve(false);
        }
      });
    }
  }]);

  return ServerTransport;
}(_TransportBase2["default"]);

exports.ServerTransport = ServerTransport;
//# sourceMappingURL=ServerTransport.js.map
