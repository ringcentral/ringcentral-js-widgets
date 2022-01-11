"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingCentralExtensions = void 0;

require("regenerator-runtime/runtime");

var _isomorphicWs = _interopRequireDefault(require("isomorphic-ws"));

var _core = _interopRequireDefault(require("@rc-ex/core"));

var _debug = _interopRequireDefault(require("@rc-ex/debug"));

var _rcsdk = _interopRequireDefault(require("@rc-ex/rcsdk"));

var _ws = _interopRequireWildcard(require("@rc-ex/ws"));

var _core2 = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _proxify = require("../../lib/proxy/proxify");

var _webSocketReadyStates = require("./webSocketReadyStates");

var _dec, _class, _class2, _descriptor, _descriptor2;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var RingCentralExtensions = (_dec = (0, _di.Module)({
  name: 'RingCentralExtensions',
  deps: ['Auth', 'Client', 'Storage', {
    dep: 'SleepDetector',
    optional: true
  }, {
    dep: 'RingCentralExtensionsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(RingCentralExtensions, _RcModuleV);

  var _super = _createSuper(RingCentralExtensions);

  // infra
  // refs
  function RingCentralExtensions(deps) {
    var _this;

    _classCallCheck(this, RingCentralExtensions);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'RingCentralExtensions'
    });
    _this._core = void 0;
    _this._webSocketExtension = void 0;
    _this._currentWs = void 0;

    _initializerDefineProperty(_this, "cachedWsc", _descriptor, _assertThisInitialized(_this));

    _this._syncWsStatusHandler = function () {
      _this._syncWebSocketReadyState();
    };

    _initializerDefineProperty(_this, "webSocketReadyState", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(RingCentralExtensions, [{
    key: "_setupInfra",
    value: function () {
      var _setupInfra2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$_deps$ringCentr2,
            _wsOptions$wscToken,
            _this$cachedWsc,
            _this2 = this;

        var _this$_deps$ringCentr, debugExtension, rcSdkExtension, wsOptions;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._core = new _core["default"](); // install DebugExtension

                if (!this.debugMode) {
                  _context.next = 5;
                  break;
                }

                debugExtension = new _debug["default"]((_this$_deps$ringCentr = this._deps.ringCentralExtensionsOptions) === null || _this$_deps$ringCentr === void 0 ? void 0 : _this$_deps$ringCentr.debugOptions);
                _context.next = 5;
                return this._core.installExtension(debugExtension);

              case 5:
                // install RcSdkExtension
                rcSdkExtension = new _rcsdk["default"]({
                  rcSdk: this.sdk
                });
                _context.next = 8;
                return this._core.installExtension(rcSdkExtension);

              case 8:
                // install WebSocketExtension
                wsOptions = (_this$_deps$ringCentr2 = this._deps.ringCentralExtensionsOptions) === null || _this$_deps$ringCentr2 === void 0 ? void 0 : _this$_deps$ringCentr2.webSocketOptions;
                this._webSocketExtension = new _ws["default"](_objectSpread(_objectSpread({}, wsOptions), {}, {
                  wscToken: (_wsOptions$wscToken = wsOptions === null || wsOptions === void 0 ? void 0 : wsOptions.wscToken) !== null && _wsOptions$wscToken !== void 0 ? _wsOptions$wscToken : (_this$cachedWsc = this.cachedWsc) === null || _this$cachedWsc === void 0 ? void 0 : _this$cachedWsc.token
                }));

                this._webSocketExtension.eventEmitter.addListener(_ws.Events.newWsc, function (wsc) {
                  _this2._cacheWsc(wsc);
                });

                _context.prev = 11;
                _context.next = 14;
                return this._core.installExtension(this._webSocketExtension);

              case 14:
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](11);
                // It tries to establish connection on install.
                // Catch the connection issue and ignore.
                console.error('[RingCentralExtensions] Establish websocket failed', _context.t0);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[11, 16]]);
      }));

      function _setupInfra() {
        return _setupInfra2.apply(this, arguments);
      }

      return _setupInfra;
    }()
  }, {
    key: "onInitOnce",
    value: function () {
      var _onInitOnce = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this3 = this,
            _this$_deps$sleepDete;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._setupInfra();

              case 2:
                // expose WebSocket events
                this._exposeConnectionEvents();

                this._webSocketExtension.eventEmitter.addListener(_ws.Events.newWebSocketObject, /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ws) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (!ws._onCreated) {
                              _context2.next = 3;
                              break;
                            }

                            _context2.next = 3;
                            return ws._onCreated();

                          case 3:
                            // expose events
                            _this3._exposeConnectionEvents();

                          case 4:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());

                if (this._webSocketExtension.options.autoRecover) {
                  this._webSocketExtension.eventEmitter.addListener(_ws.Events.autoRecoverSuccess, function () {
                    _this3._exposeConnectionEvents();
                  });

                  this._webSocketExtension.eventEmitter.addListener(_ws.Events.autoRecoverFailed, function () {
                    _this3._exposeConnectionEvents();
                  });
                } // register SleepDetector


                (_this$_deps$sleepDete = this._deps.sleepDetector) === null || _this$_deps$sleepDete === void 0 ? void 0 : _this$_deps$sleepDete.on(this._deps.sleepDetector.events.detected, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          if (!_this3.ready) {
                            _context3.next = 3;
                            break;
                          }

                          _context3.next = 3;
                          return _this3.recoverWebSocketConnection();

                        case 3:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }))); // hook auth events

                this._deps.auth.addAfterLoggedInHandler(function () {
                  _this3.recoverWebSocketConnection();
                });

                this._deps.auth.addBeforeLogoutHandler(function () {
                  _this3.revokeWebSocketConnection();
                });

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onInitOnce() {
        return _onInitOnce.apply(this, arguments);
      }

      return onInitOnce;
    }()
  }, {
    key: "_cacheWsc",
    value: function _cacheWsc(wsc) {
      this.cachedWsc = wsc;
    }
  }, {
    key: "recoverWebSocketConnection",
    value: function () {
      var _recoverWebSocketConnection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._webSocketExtension.recover();

              case 2:
                this._exposeConnectionEvents();

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function recoverWebSocketConnection() {
        return _recoverWebSocketConnection.apply(this, arguments);
      }

      return recoverWebSocketConnection;
    }()
  }, {
    key: "revokeWebSocketConnection",
    value: function () {
      var _revokeWebSocketConnection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._webSocketExtension.revoke();

              case 2:
                this._exposeConnectionEvents();

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function revokeWebSocketConnection() {
        return _revokeWebSocketConnection.apply(this, arguments);
      }

      return revokeWebSocketConnection;
    }()
  }, {
    key: "_exposeConnectionEvents",
    value: function _exposeConnectionEvents() {
      if (this._currentWs) {
        this._currentWs.removeEventListener('close', this._syncWsStatusHandler);

        this._currentWs.removeEventListener('open', this._syncWsStatusHandler);

        this._currentWs.removeEventListener('error', this._syncWsStatusHandler);

        this._currentWs = null;
      }

      this._currentWs = this._webSocketExtension.ws;

      if (this._currentWs) {
        this._currentWs.addEventListener('close', this._syncWsStatusHandler);

        this._currentWs.addEventListener('open', this._syncWsStatusHandler);

        this._currentWs.addEventListener('error', this._syncWsStatusHandler);
      }

      this._syncWebSocketReadyState();
    }
  }, {
    key: "_syncWebSocketReadyState",
    value: function _syncWebSocketReadyState() {
      var _this$_webSocketExten;

      var readyState = (_this$_webSocketExten = this._webSocketExtension.ws) === null || _this$_webSocketExten === void 0 ? void 0 : _this$_webSocketExten.readyState;

      this._setWebSocketReadyState(readyState);
    }
  }, {
    key: "_setWebSocketReadyState",
    value: function _setWebSocketReadyState(readyState) {
      switch (readyState) {
        case _isomorphicWs["default"].CONNECTING:
          this.webSocketReadyState = _webSocketReadyStates.webSocketReadyStates.connecting;
          break;

        case _isomorphicWs["default"].OPEN:
          this.webSocketReadyState = _webSocketReadyStates.webSocketReadyStates.open;
          break;

        case _isomorphicWs["default"].CLOSING:
          this.webSocketReadyState = _webSocketReadyStates.webSocketReadyStates.closing;
          break;

        case _isomorphicWs["default"].CLOSED:
          this.webSocketReadyState = _webSocketReadyStates.webSocketReadyStates.closed;
          break;

        default:
          this.webSocketReadyState = null;
          break;
      }

      console.log("[RingCentralExtensions] > webSocketReadyState > ".concat(this.webSocketReadyState));
    }
  }, {
    key: "debugMode",
    get: function get() {
      var _this$_deps$ringCentr3, _this$_deps$ringCentr4;

      return (_this$_deps$ringCentr3 = (_this$_deps$ringCentr4 = this._deps.ringCentralExtensionsOptions) === null || _this$_deps$ringCentr4 === void 0 ? void 0 : _this$_deps$ringCentr4.debugMode) !== null && _this$_deps$ringCentr3 !== void 0 ? _this$_deps$ringCentr3 : false;
    }
  }, {
    key: "sdk",
    get: function get() {
      return this._deps.client.service;
    }
  }, {
    key: "core",
    get: function get() {
      return this._core;
    }
  }, {
    key: "webSocketExtension",
    get: function get() {
      return this._webSocketExtension;
    }
  }]);

  return RingCentralExtensions;
}(_core2.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "_cacheWsc", [_core2.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_cacheWsc"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "cachedWsc", [_core2.storage, _core2.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "recoverWebSocketConnection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "recoverWebSocketConnection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "revokeWebSocketConnection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "revokeWebSocketConnection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setWebSocketReadyState", [_core2.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setWebSocketReadyState"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "webSocketReadyState", [_core2.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class);
exports.RingCentralExtensions = RingCentralExtensions;
//# sourceMappingURL=RingCentralExtensions.js.map
