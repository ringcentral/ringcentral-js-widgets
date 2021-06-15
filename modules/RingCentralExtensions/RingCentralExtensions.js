"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

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

var _core = _interopRequireDefault(require("@rc-ex/core"));

var _debug = _interopRequireDefault(require("@rc-ex/debug"));

var _rcsdk = _interopRequireDefault(require("@rc-ex/rcsdk"));

var _ws = _interopRequireWildcard(require("@rc-ex/ws"));

var _core2 = require("@ringcentral-integration/core");

var _isomorphicWs = _interopRequireDefault(require("isomorphic-ws"));

var _proxify = require("../../lib/proxy/proxify");

var _di = require("../../lib/di");

var _webSocketReadyStates = require("./webSocketReadyStates");

var _dec, _class, _class2, _descriptor, _descriptor2;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var RingCentralExtensions = (_dec = (0, _di.Module)({
  name: 'RingCentralExtensions',
  deps: ['Client', {
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
      deps: deps
    });
    _this._sdk = void 0;
    _this._core = void 0;
    _this._webSocketExtension = void 0;
    _this._currentWs = void 0;

    _this._onSignedIn = function () {
      _this._setLoggedIn(true);
    };

    _this._onSignedOff = function () {
      _this._setLoggedIn(false);
    };

    _initializerDefineProperty(_this, "isLoggedIn", _descriptor, _assertThisInitialized(_this));

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
        var _this$_deps$ringCentr2;

        var _this$_deps$ringCentr, debugExtension, rcSdkExtension;

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
                this._sdk = this._deps.client.service;
                rcSdkExtension = new _rcsdk["default"]({
                  rcSdk: this._sdk
                });
                _context.next = 9;
                return this._core.installExtension(rcSdkExtension);

              case 9:
                // install WebSocketExtension
                this._webSocketExtension = new _ws["default"]((_this$_deps$ringCentr2 = this._deps.ringCentralExtensionsOptions) === null || _this$_deps$ringCentr2 === void 0 ? void 0 : _this$_deps$ringCentr2.webSocketOptions);
                _context.prev = 10;
                _context.next = 13;
                return this._core.installExtension(this._webSocketExtension);

              case 13:
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](10);
                // It tries to establish connection on install.
                // Catch the connection issue and ignore.
                console.error('[RingCentralExtensions] Establish websocket failed', _context.t0);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[10, 15]]);
      }));

      function _setupInfra() {
        return _setupInfra2.apply(this, arguments);
      }

      return _setupInfra;
    }()
  }, {
    key: "_bindPlatformEvents",
    value: function _bindPlatformEvents() {
      var platform = this._sdk.platform();

      platform.addListener(platform.events.loginSuccess, this._onSignedIn);
      platform.addListener(platform.events.loginError, this._onSignedOff);
      platform.addListener(platform.events.logoutSuccess, this._onSignedOff);
      platform.addListener(platform.events.logoutError, this._onSignedOff);
      platform.addListener(platform.events.refreshSuccess, this._onSignedIn);
      platform.addListener(platform.events.refreshError, this._onSignedOff);
    }
  }, {
    key: "_unbindPlatformEvents",
    value: function _unbindPlatformEvents() {
      var platform = this._sdk.platform();

      platform.removeListener(platform.events.loginSuccess, this._onSignedIn);
      platform.removeListener(platform.events.loginError, this._onSignedOff);
      platform.removeListener(platform.events.logoutSuccess, this._onSignedOff);
      platform.removeListener(platform.events.logoutError, this._onSignedOff);
      platform.removeListener(platform.events.refreshSuccess, this._onSignedIn);
      platform.removeListener(platform.events.refreshError, this._onSignedOff);
    }
  }, {
    key: "onInitOnce",
    value: function () {
      var _onInitOnce = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this2 = this,
            _this$_deps$sleepDete;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._setupInfra();

              case 2:
                // expose WebSocket events
                this._exposeConnectionEvents();

                this._webSocketExtension.eventEmitter.addListener(_ws.Events.newWebSocketObject, function () {
                  _this2._exposeConnectionEvents();
                });

                if (this._webSocketExtension.options.autoRecover) {
                  this._webSocketExtension.eventEmitter.addListener(_ws.Events.autoRecoverSuccess, function () {
                    _this2._exposeConnectionEvents();
                  });

                  this._webSocketExtension.eventEmitter.addListener(_ws.Events.autoRecoverFailed, function () {
                    _this2._exposeConnectionEvents();
                  });
                } // register SleepDetector


                (_this$_deps$sleepDete = this._deps.sleepDetector) === null || _this$_deps$sleepDete === void 0 ? void 0 : _this$_deps$sleepDete.on(this._deps.sleepDetector.events.detected, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!_this2.ready) {
                            _context2.next = 3;
                            break;
                          }

                          _context2.next = 3;
                          return _this2.recoverWebSocketConnection();

                        case 3:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })));
                (0, _core2.watch)(this, function () {
                  return _this2.isLoggedIn;
                }, function () {
                  if (!_this2.ready) {
                    return;
                  }

                  try {
                    if (_this2.isLoggedIn) {
                      _this2.recoverWebSocketConnection();
                    } else {
                      _this2.revokeWebSocketConnection();
                    }
                  } catch (ex) {
                    console.error('[RingCentralExtensions]', ex);
                  }
                });

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onInitOnce() {
        return _onInitOnce.apply(this, arguments);
      }

      return onInitOnce;
    }()
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var platform, loggedIn;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this._bindPlatformEvents();

                platform = this._sdk.platform();
                _context4.next = 4;
                return platform.loggedIn();

              case 4:
                loggedIn = _context4.sent;

                this._setLoggedIn(loggedIn);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onInit() {
        return _onInit.apply(this, arguments);
      }

      return onInit;
    }()
  }, {
    key: "onReset",
    value: function () {
      var _onReset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this._unbindPlatformEvents();

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function onReset() {
        return _onReset.apply(this, arguments);
      }

      return onReset;
    }()
  }, {
    key: "_setLoggedIn",
    value: function _setLoggedIn(loggedIn) {
      this.isLoggedIn = loggedIn;
    }
  }, {
    key: "recoverWebSocketConnection",
    value: function () {
      var _recoverWebSocketConnection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this.webSocketReadyState === _webSocketReadyStates.webSocketReadyStates.connecting)) {
                  _context6.next = 3;
                  break;
                }

                console.log('[RingCentralExtensions] > recoverWebSocketConnection > already connecting');
                return _context6.abrupt("return");

              case 3:
                _context6.next = 5;
                return this._webSocketExtension.recover();

              case 5:
                this._exposeConnectionEvents();

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function recoverWebSocketConnection() {
        return _recoverWebSocketConnection.apply(this, arguments);
      }

      return recoverWebSocketConnection;
    }()
  }, {
    key: "revokeWebSocketConnection",
    value: function () {
      var _revokeWebSocketConnection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._webSocketExtension.revoke();

              case 2:
                this._exposeConnectionEvents();

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
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
      return this._sdk;
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
}(_core2.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "_setLoggedIn", [_core2.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLoggedIn"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "isLoggedIn", [_core2.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "recoverWebSocketConnection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "recoverWebSocketConnection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "revokeWebSocketConnection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "revokeWebSocketConnection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_syncWebSocketReadyState", [_core2.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_syncWebSocketReadyState"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "webSocketReadyState", [_core2.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class);
exports.RingCentralExtensions = RingCentralExtensions;
//# sourceMappingURL=RingCentralExtensions.js.map
