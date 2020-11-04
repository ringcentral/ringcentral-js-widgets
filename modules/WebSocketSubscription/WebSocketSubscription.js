"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebSocketSubscription = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.sort");

require("regenerator-runtime/runtime");

var _core = _interopRequireDefault(require("@rc-ex/core"));

var _rcsdk = _interopRequireDefault(require("@rc-ex/rcsdk"));

var _ws = _interopRequireWildcard(require("@rc-ex/ws"));

var _isomorphicWs = _interopRequireDefault(require("isomorphic-ws"));

var _ramda = require("ramda");

var _core2 = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _debounceThrottle = require("../../lib/debounce-throttle");

var _normalizeEventFilter = require("./normalizeEventFilter");

var _webSocketReadyState = require("./webSocketReadyState");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DEFAULT_REFRESH_DELAY = 2 * 1000;
var WebSocketSubscription = (_dec = (0, _di.Module)({
  deps: ['Client', 'Auth', 'SleepDetector', {
    dep: 'WebSocketSubscriptionOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(WebSocketSubscription, _RcModuleV);

  var _super = _createSuper(WebSocketSubscription);

  function WebSocketSubscription(deps) {
    var _this;

    _classCallCheck(this, WebSocketSubscription);

    _this = _super.call(this, {
      deps: deps
    });
    _this._wsExtension = void 0;
    _this._wsSubscription = void 0;
    _this._currentWs = void 0;
    _this._syncWsStatusHandler = void 0;
    _this._debouncedRefreshSubscription = void 0;

    _initializerDefineProperty(_this, "filters", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "message", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "wsReadyState", _descriptor3, _assertThisInitialized(_this));

    _this._syncWsStatusHandler = function () {
      _this._syncWebSocketReadyState();
    };

    _this._debouncedRefreshSubscription = (0, _debounceThrottle.promisedDebounce)({
      fn: _this._refreshSubscription,
      threshold: _this._refreshDelay
    });
    return _this;
  }

  _createClass(WebSocketSubscription, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return _get(_getPrototypeOf(WebSocketSubscription.prototype), "_shouldInit", this).call(this) && this._deps.auth.loggedIn;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return _get(_getPrototypeOf(WebSocketSubscription.prototype), "_shouldReset", this).call(this) || this.ready && this._deps.auth.notLoggedIn;
    }
  }, {
    key: "onInitOnce",
    value: function () {
      var _onInitOnce = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this$_deps$webSocket,
            _this$_deps$webSocket2,
            _this$_deps$webSocket3,
            _this2 = this;

        var rc, sdk, ringCentralExtension;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                rc = new _core["default"]();
                sdk = this._deps.client.service;
                ringCentralExtension = new _rcsdk["default"](sdk);
                _context2.next = 5;
                return rc.installExtension(ringCentralExtension);

              case 5:
                this._wsExtension = new _ws["default"]({
                  restOverWebSocket: (_this$_deps$webSocket = this._deps.webSocketSubscriptionOptions) === null || _this$_deps$webSocket === void 0 ? void 0 : _this$_deps$webSocket.restOverWebSocket,
                  debugMode: (_this$_deps$webSocket2 = this._deps.webSocketSubscriptionOptions) === null || _this$_deps$webSocket2 === void 0 ? void 0 : _this$_deps$webSocket2.debugMode,
                  autoRecover: (_this$_deps$webSocket3 = this._deps.webSocketSubscriptionOptions) === null || _this$_deps$webSocket3 === void 0 ? void 0 : _this$_deps$webSocket3.autoRecover
                });
                _context2.next = 8;
                return rc.installExtension(this._wsExtension);

              case 8:
                this._exposeConnectionEvents();

                if (this._wsExtension.autoRecover) {
                  this._wsExtension.eventEmitter.on(_ws.Events.autoRecoverSuccess, function () {
                    _this2._exposeConnectionEvents();
                  });
                }

                this._deps.sleepDetector.on(this._deps.sleepDetector.events.detected, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!_this2.ready) {
                            _context.next = 3;
                            break;
                          }

                          _context.next = 3;
                          return _this2._recoverConnection();

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onInitOnce() {
        return _onInitOnce.apply(this, arguments);
      }

      return onInitOnce;
    }()
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.filters.length) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 3;
                return this._recoverConnection();

              case 3:
                _context3.next = 5;
                return this._debouncedRefreshSubscription();

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onInit() {
        return _onInit.apply(this, arguments);
      }

      return onInit;
    }()
  }, {
    key: "onReset",
    value: function () {
      var _onReset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this._debouncedRefreshSubscription.cancel();

                _context4.next = 3;
                return this._revokeConnection();

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onReset() {
        return _onReset.apply(this, arguments);
      }

      return onReset;
    }()
  }, {
    key: "_recoverConnection",
    value: function () {
      var _recoverConnection2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._wsExtension.recover();

              case 2:
                this._exposeConnectionEvents();

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _recoverConnection() {
        return _recoverConnection2.apply(this, arguments);
      }

      return _recoverConnection;
    }()
  }, {
    key: "_revokeConnection",
    value: function () {
      var _revokeConnection2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._wsExtension.revoke();

              case 2:
                this._exposeConnectionEvents();

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _revokeConnection() {
        return _revokeConnection2.apply(this, arguments);
      }

      return _revokeConnection;
    }()
  }, {
    key: "_exposeConnectionEvents",
    value: function _exposeConnectionEvents() {
      if (this._currentWs) {
        this._currentWs.removeEventListener('close', this._syncWsStatusHandler);

        this._currentWs.removeEventListener('open', this._syncWsStatusHandler);

        this._currentWs.removeEventListener('error', this._syncWsStatusHandler);
      }

      this._currentWs = this._wsExtension.ws;

      if (this._currentWs) {
        this._currentWs.addEventListener('close', this._syncWsStatusHandler);

        this._currentWs.addEventListener('open', this._syncWsStatusHandler);

        this._currentWs.addEventListener('error', this._syncWsStatusHandler);
      }

      this._syncWebSocketReadyState();
    }
  }, {
    key: "_createSubscription",
    value: function () {
      var _createSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._wsExtension.subscribe(this.filters, function (message) {
                  _this3._notifyMessage(message);
                });

              case 2:
                this._wsSubscription = _context7.sent;

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _createSubscription() {
        return _createSubscription2.apply(this, arguments);
      }

      return _createSubscription;
    }()
  }, {
    key: "_revokeSubscription",
    value: function () {
      var _revokeSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this._wsSubscription) {
                  _context8.next = 4;
                  break;
                }

                _context8.next = 3;
                return this._wsSubscription.revoke();

              case 3:
                this._wsSubscription = null;

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _revokeSubscription() {
        return _revokeSubscription2.apply(this, arguments);
      }

      return _revokeSubscription;
    }()
  }, {
    key: "_refreshSubscription",
    value: function () {
      var _refreshSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _this$_wsSubscription;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (this._wsSubscription) {
                  _context9.next = 5;
                  break;
                }

                _context9.next = 3;
                return this._createSubscription();

              case 3:
                _context9.next = 9;
                break;

              case 5:
                if ((0, _ramda.equals)(this.filters.map(function (x) {
                  return (0, _normalizeEventFilter.normalizeEventFilter)(x);
                }).sort(), (_this$_wsSubscription = this._wsSubscription.subscriptionInfo) === null || _this$_wsSubscription === void 0 ? void 0 : _this$_wsSubscription.eventFilters.map(function (x) {
                  return (0, _normalizeEventFilter.normalizeEventFilter)(x);
                }).sort())) {
                  _context9.next = 9;
                  break;
                }

                this._wsSubscription.eventFilters = this.filters;
                _context9.next = 9;
                return this._wsSubscription.refresh();

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function _refreshSubscription() {
        return _refreshSubscription2.apply(this, arguments);
      }

      return _refreshSubscription;
    }()
  }, {
    key: "subscribe",
    value: function () {
      var _subscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var eventsFilters,
            oldFilters,
            _args10 = arguments;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                eventsFilters = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : [];

                if (!this.ready) {
                  _context10.next = 7;
                  break;
                }

                oldFilters = this.filters;

                this._addFilters(eventsFilters);

                if (!(oldFilters.length !== this.filters.length)) {
                  _context10.next = 7;
                  break;
                }

                _context10.next = 7;
                return this._debouncedRefreshSubscription();

              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function subscribe() {
        return _subscribe.apply(this, arguments);
      }

      return subscribe;
    }()
  }, {
    key: "unsubscribe",
    value: function () {
      var _unsubscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var eventsFilters,
            oldFilters,
            _args11 = arguments;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                eventsFilters = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : [];
                oldFilters = this.filters;

                this._removeFilters(eventsFilters);

                if (!(this.filters.length === 0)) {
                  _context11.next = 8;
                  break;
                }

                _context11.next = 6;
                return this._revokeSubscription();

              case 6:
                _context11.next = 11;
                break;

              case 8:
                if (!(oldFilters.length !== this.filters.length)) {
                  _context11.next = 11;
                  break;
                }

                _context11.next = 11;
                return this._debouncedRefreshSubscription();

              case 11:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function unsubscribe() {
        return _unsubscribe.apply(this, arguments);
      }

      return unsubscribe;
    }()
  }, {
    key: "_addFilters",
    value: function _addFilters(eventsFilters) {
      var filterMap = {};
      this.filters = this.filters.concat(eventsFilters).filter(function (f) {
        if (!filterMap[f]) {
          filterMap[f] = true;
          return true;
        }

        return false;
      });
    }
  }, {
    key: "_removeFilters",
    value: function _removeFilters(eventsFilters) {
      var filterMap = {};
      eventsFilters.forEach(function (f) {
        filterMap[f] = true;
      });
      this.filters = this.filters.filter(function (f) {
        return !filterMap[f];
      });
    }
  }, {
    key: "_notifyMessage",
    value: function _notifyMessage(message) {
      this.message = message;
    }
  }, {
    key: "_syncWebSocketReadyState",
    value: function _syncWebSocketReadyState() {
      var _this$_wsExtension$ws;

      var wsReadyState = (_this$_wsExtension$ws = this._wsExtension.ws) === null || _this$_wsExtension$ws === void 0 ? void 0 : _this$_wsExtension$ws.readyState;

      switch (wsReadyState) {
        case _isomorphicWs["default"].CONNECTING:
          this.wsReadyState = _webSocketReadyState.webSocketReadyState.connecting;
          break;

        case _isomorphicWs["default"].OPEN:
          this.wsReadyState = _webSocketReadyState.webSocketReadyState.open;
          break;

        case _isomorphicWs["default"].CLOSING:
          this.wsReadyState = _webSocketReadyState.webSocketReadyState.closing;
          break;

        case _isomorphicWs["default"].CLOSED:
          this.wsReadyState = _webSocketReadyState.webSocketReadyState.closed;
          break;

        default:
          this.wsReadyState = null;
          break;
      }

      console.log(this.wsReadyState);
    }
  }, {
    key: "_refreshDelay",
    get: function get() {
      var _this$_deps$webSocket4, _this$_deps$webSocket5;

      return Math.max(0, (_this$_deps$webSocket4 = (_this$_deps$webSocket5 = this._deps.webSocketSubscriptionOptions) === null || _this$_deps$webSocket5 === void 0 ? void 0 : _this$_deps$webSocket5.refreshDelay) !== null && _this$_deps$webSocket4 !== void 0 ? _this$_deps$webSocket4 : DEFAULT_REFRESH_DELAY);
    }
  }]);

  return WebSocketSubscription;
}(_core2.RcModuleV2), _temp), (_applyDecoratedDescriptor(_class2.prototype, "subscribe", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "subscribe"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unsubscribe", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "unsubscribe"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addFilters", [_core2.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeFilters", [_core2.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_notifyMessage", [_core2.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_notifyMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_syncWebSocketReadyState", [_core2.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_syncWebSocketReadyState"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "filters", [_core2.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "message", [_core2.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "wsReadyState", [_core2.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class);
exports.WebSocketSubscription = WebSocketSubscription;
//# sourceMappingURL=WebSocketSubscription.js.map
