"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.map");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

var _TransportBase2 = _interopRequireDefault(require("../TransportBase"));

var _sleep = _interopRequireDefault(require("../sleep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

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

    _this._activeTabs = [];

    _this._getActiveTabs();

    chrome.tabs.onActivated.addListener( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.ensureActiveTabs(5);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    chrome.runtime.onConnect.addListener(function (port) {
      if (port.name === 'transport') {
        _this._ports.add(port);

        port.onMessage.addListener(function (_ref2) {
          var type = _ref2.type,
              requestId = _ref2.requestId,
              payload = _ref2.payload;

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
    value: function response(_ref3) {
      var requestId = _ref3.requestId,
          result = _ref3.result,
          error = _ref3.error;

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
    value: function push(_ref4) {
      var _this2 = this;

      var payload = _ref4.payload;
      var message = {
        type: this._events.push,
        payload: payload
      };

      var isOnActiveTabs = function isOnActiveTabs(port) {
        // Ensure tabs are still accessible (may be closed)
        // otherwise, give up pushing messages to that tab at this point
        if (port.sender && port.sender.tab) {
          var _this2$_activeTabs;

          return !!((_this2$_activeTabs = _this2._activeTabs) === null || _this2$_activeTabs === void 0 ? void 0 : _this2$_activeTabs.find(function (tab) {
            return tab && tab.id === port.sender.tab.id;
          }));
        }

        return false;
      }; // Since postMessage is really expensive,
      // we only send messages to those ports on active tabs.


      Array.from(this._ports).filter(function (port) {
        return isOnActiveTabs(port);
      }).forEach(function (port) {
        return port.postMessage(message);
      });
    }
  }, {
    key: "ensureActiveTabs",
    value: function () {
      var _ensureActiveTabs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var checkTime,
            isValid,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                checkTime = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 1;

                if (!(checkTime > 0)) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 4;
                return (0, _sleep["default"])(100);

              case 4:
                _context2.next = 6;
                return this._getActiveTabs();

              case 6:
                isValid = _context2.sent;

                if (isValid) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 10;
                return this.ensureActiveTabs(checkTime - 1);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function ensureActiveTabs() {
        return _ensureActiveTabs.apply(this, arguments);
      }

      return ensureActiveTabs;
    }()
  }, {
    key: "_getActiveTabs",
    value: function _getActiveTabs() {
      var _this3 = this;

      return new Promise(function (resolve) {
        try {
          chrome.tabs.query({
            active: true
          }, function (tabs) {
            _this3._activeTabs = tabs;
            resolve(Array.isArray(tabs));
          });
        } catch (error) {
          console.log(error);
          resolve(false);
        }
      });
    }
  }]);

  return ServerTransport;
}(_TransportBase2["default"]);

exports["default"] = ServerTransport;
//# sourceMappingURL=ServerTransport.js.map
