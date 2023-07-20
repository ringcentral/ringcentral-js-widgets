"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SyncTokensTabEventName = exports.RingCentralExtensions = exports.InactiveTabEventName = void 0;
require("regenerator-runtime/runtime");
var _isomorphicWs = _interopRequireDefault(require("isomorphic-ws"));
var _core = _interopRequireDefault(require("@rc-ex/core"));
var _debug = _interopRequireDefault(require("@rc-ex/debug"));
var _rcsdk = _interopRequireDefault(require("@rc-ex/rcsdk"));
var _ws = _interopRequireWildcard(require("@rc-ex/ws"));
var _core2 = require("@ringcentral-integration/core");
var _background = _interopRequireDefault(require("../../lib/background"));
var _debounceThrottle = require("../../lib/debounce-throttle");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _webSocketReadyStates = require("./webSocketReadyStates");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
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
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
var RECOVER_DEBOUNCE_THRESHOLD = process.env.NODE_ENV === 'test' ? 0 : 1000;
var InactiveTabEventName = 'RingCentralExtensions-inactive';
exports.InactiveTabEventName = InactiveTabEventName;
var SyncTokensTabEventName = 'RingCentralExtensions-syncTokens';
exports.SyncTokensTabEventName = SyncTokensTabEventName;
var RingCentralExtensions = (_dec = (0, _di.Module)({
  name: 'RingCentralExtensions',
  deps: ['Auth', 'Client', 'Storage', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'SleepDetector',
    optional: true
  }, {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'RingCentralExtensionsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(RingCentralExtensions, _RcModuleV);
  var _super = _createSuper(RingCentralExtensions);
  function RingCentralExtensions(deps) {
    var _this;
    _classCallCheck(this, RingCentralExtensions);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'RingCentralExtensions'
    });
    // infra
    _this._core = void 0;
    _this._webSocketExtension = void 0;
    // refs
    _this._removeWsListener = void 0;
    _this._wsConnectionReady = void 0;
    _this._debouncedOnTabActive = (0, _debounceThrottle.debounce)({
      threshold: RECOVER_DEBOUNCE_THRESHOLD,
      fn: _this._onTabActive
    });
    _initializerDefineProperty(_this, "wsToken", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "wsTokenExpiresAt", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "wscToken", _descriptor3, _assertThisInitialized(_this));
    _this._syncWsReadyState = function () {
      var _this$_webSocketExten;
      var readyState = (_this$_webSocketExten = _this._webSocketExtension.ws) === null || _this$_webSocketExten === void 0 ? void 0 : _this$_webSocketExten.readyState;
      _this._setWebSocketReadyState(readyState);
    };
    _initializerDefineProperty(_this, "webSocketReadyState", _descriptor4, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(RingCentralExtensions, [{
    key: "onInitOnce",
    value: function () {
      var _onInitOnce = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._setupInfra();
              case 2:
                _context.next = 4;
                return this._bindEvents();
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function onInitOnce() {
        return _onInitOnce.apply(this, arguments);
      }
      return onInitOnce;
    }()
  }, {
    key: "onInitSuccess",
    value: function () {
      var _onInitSuccess = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.recoverWebSocketConnection();
              case 3:
                _context2.next = 8;
                break;
              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2["catch"](0);
                if (process.env.NODE_ENV !== 'test') {
                  console.log("onInitSuccess error: ".concat(_context2.t0));
                }
              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 5]]);
      }));
      function onInitSuccess() {
        return _onInitSuccess.apply(this, arguments);
      }
      return onInitSuccess;
    }()
  }, {
    key: "_setupInfra",
    value: function () {
      var _setupInfra2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this$_deps$ringCentr2,
          _wsOptions$wscToken,
          _this$wscToken,
          _this2 = this;
        var _this$_deps$ringCentr, debugExtension, rcSdkExtension, wsOptions;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this._core = new _core["default"]();

                // install DebugExtension
                if (!(process.env.NODE_ENV !== 'production' && this.debugMode)) {
                  _context4.next = 5;
                  break;
                }
                debugExtension = new _debug["default"]((_this$_deps$ringCentr = this._deps.ringCentralExtensionsOptions) === null || _this$_deps$ringCentr === void 0 ? void 0 : _this$_deps$ringCentr.debugOptions);
                _context4.next = 5;
                return this._core.installExtension(debugExtension);
              case 5:
                // install RcSdkExtension
                rcSdkExtension = new _rcsdk["default"]({
                  rcSdk: this.sdk
                });
                _context4.next = 8;
                return this._core.installExtension(rcSdkExtension);
              case 8:
                // install WebSocketExtension
                wsOptions = (_this$_deps$ringCentr2 = this._deps.ringCentralExtensionsOptions) === null || _this$_deps$ringCentr2 === void 0 ? void 0 : _this$_deps$ringCentr2.webSocketOptions;
                this._webSocketExtension = new _ws["default"](_objectSpread(_objectSpread({}, wsOptions), {}, {
                  wscToken: (_wsOptions$wscToken = wsOptions === null || wsOptions === void 0 ? void 0 : wsOptions.wscToken) !== null && _wsOptions$wscToken !== void 0 ? _wsOptions$wscToken : (_this$wscToken = this.wscToken) === null || _this$wscToken === void 0 ? void 0 : _this$wscToken.token
                }));
                this._useTokens();
                this._webSocketExtension.eventEmitter.addListener(_ws.Events.newWsc, function () {
                  _this2._saveTokens();
                });
                // expose WebSocket events
                this._webSocketExtension.eventEmitter.addListener(_ws.Events.newWebSocketObject, /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ws) {
                    var _ws$_onCreated;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return (_ws$_onCreated = ws._onCreated) === null || _ws$_onCreated === void 0 ? void 0 : _ws$_onCreated.call(ws);
                          case 2:
                            // expose events
                            _this2._exposeConnectionEvents();
                          case 3:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
                this._webSocketExtension.eventEmitter.addListener(_ws.Events.connectionReady, function () {
                  _this2._wsConnectionReady = true;
                  _this2._syncWsReadyState();
                });
                if (!(this._deps.auth.loggedIn && (!this.disconnectOnInactive || this.isTabActive))) {
                  _context4.next = 17;
                  break;
                }
                _context4.next = 17;
                return this._installWebSocketExtension();
              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function _setupInfra() {
        return _setupInfra2.apply(this, arguments);
      }
      return _setupInfra;
    }()
  }, {
    key: "_installWebSocketExtension",
    value: function () {
      var _installWebSocketExtension2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.allowSwitchConnection) {
                  _context5.next = 2;
                  break;
                }
                return _context5.abrupt("return");
              case 2:
                _context5.prev = 2;
                if (process.env.NODE_ENV !== 'test') {
                  console.log('[RingCentralExtensions] > WebSocketExtension > install');
                }
                _context5.next = 6;
                return this._core.installExtension(this._webSocketExtension);
              case 6:
                _context5.next = 11;
                break;
              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](2);
                // It tries to establish connection on install.
                // Catch the connection issue and ignore.
                if (process.env.NODE_ENV !== 'test') {
                  console.error('[RingCentralExtensions] > WebSocketExtension > install failed', _context5.t0);
                }
              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 8]]);
      }));
      function _installWebSocketExtension() {
        return _installWebSocketExtension2.apply(this, arguments);
      }
      return _installWebSocketExtension;
    }()
  }, {
    key: "_bindEvents",
    value: function () {
      var _bindEvents2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this$_webSocketExten2,
          _this3 = this,
          _this$_deps$sleepDete;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if ((_this$_webSocketExten2 = this._webSocketExtension.options.autoRecover) === null || _this$_webSocketExten2 === void 0 ? void 0 : _this$_webSocketExten2.enabled) {
                  this._webSocketExtension.eventEmitter.addListener(_ws.Events.autoRecoverSuccess, function () {
                    _this3._exposeConnectionEvents();
                  });
                  this._webSocketExtension.eventEmitter.addListener(_ws.Events.autoRecoverFailed, function () {
                    _this3._exposeConnectionEvents();
                  });
                }

                // register SleepDetector
                (_this$_deps$sleepDete = this._deps.sleepDetector) === null || _this$_deps$sleepDete === void 0 ? void 0 : _this$_deps$sleepDete.on('detected', function () {
                  _this3.recoverWebSocketConnection();
                });

                // hook auth events
                this._deps.auth.addAfterLoggedInHandler(function () {
                  _this3.recoverWebSocketConnection();
                });
                this._deps.auth.addBeforeLogoutHandler(function () {
                  _this3.revokeWebSocketConnection();
                });

                // multiple tabs support
                if (!this.disconnectOnInactive) {
                  _context7.next = 13;
                  break;
                }
                this._setSharedState();
                (0, _core2.watch)(this, function () {
                  return _this3.isWebSocketReady;
                }, function () {
                  _this3._setSharedState();
                });
                (0, _core2.watch)(this, function () {
                  return _this3.isTabActive;
                }, /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(tabActive) {
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            if (!tabActive) {
                              _context6.next = 6;
                              break;
                            }
                            if (process.env.NODE_ENV !== 'test') {
                              console.log('[RingCentralExtensions] > tab > active');
                            }
                            _context6.next = 4;
                            return _this3._debouncedOnTabActive();
                          case 4:
                            _context6.next = 9;
                            break;
                          case 6:
                            if (process.env.NODE_ENV !== 'test') {
                              console.log('[RingCentralExtensions] > tab > inactive');
                            }
                            _context6.next = 9;
                            return _this3._debouncedOnTabActive.cancel();
                          case 9:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    }, _callee6);
                  }));
                  return function (_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }());
                (0, _core2.watch)(this, function () {
                  return _this3.allowSwitchConnection;
                }, function (allow) {
                  if (allow && _this3.isTabActive) {
                    _this3._onTabActive();
                  }
                });
                (0, _core2.watch)(this, function () {
                  return _this3._deps.tabManager.event;
                }, function (event) {
                  _this3._tabMessageHandler(event);
                });
                if (!this.isTabActive) {
                  _context7.next = 13;
                  break;
                }
                _context7.next = 13;
                return this._inactiveOtherTabs();
              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function _bindEvents() {
        return _bindEvents2.apply(this, arguments);
      }
      return _bindEvents;
    }()
  }, {
    key: "_setSharedState",
    value: function _setSharedState() {
      if (this._deps.availabilityMonitor && this._deps.tabManager) {
        var key = "ws-".concat(this._deps.tabManager.id);
        this._deps.availabilityMonitor.setSharedState(key, {
          webSocketReady: this.isWebSocketReady
        });
      }
    }
  }, {
    key: "_onTabActive",
    value: function () {
      var _onTabActive2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(!this.ready || !this.isTabActive)) {
                  _context8.next = 2;
                  break;
                }
                return _context8.abrupt("return");
              case 2:
                _context8.next = 4;
                return this._inactiveOtherTabs();
              case 4:
                // recover WebSocket for current tab and other tabs will being disconnected automatically
                this.recoverWebSocketConnection();
              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function _onTabActive() {
        return _onTabActive2.apply(this, arguments);
      }
      return _onTabActive;
    }()
  }, {
    key: "_tabMessageHandler",
    value: function _tabMessageHandler(event) {
      if (!this.ready || !event) {
        return;
      }
      if (event.name === InactiveTabEventName) {
        // as an inactive tab, disable auto recover
        this._webSocketExtension.options.autoRecover.enabled = false;
      } else if (event.name === SyncTokensTabEventName) {
        // as an inactive tab, sync and use with tokens that are received from active tab
        this._setTokens(event.args[0], event.args[1], event.args[2]);
        this._useTokens();
      }
    }
  }, {
    key: "_inactiveOtherTabs",
    value: function () {
      var _inactiveOtherTabs2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _this$_deps$tabManage, _this$_deps$ringCentr3, _this$_deps$ringCentr4, _this$_deps$ringCentr5;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (this.allowSwitchConnection) {
                  _context9.next = 2;
                  break;
                }
                return _context9.abrupt("return");
              case 2:
                _context9.next = 4;
                return (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.send(InactiveTabEventName);
              case 4:
                // when auto recover of active tab is NOT configured as disabled
                if (((_this$_deps$ringCentr3 = this._deps.ringCentralExtensionsOptions) === null || _this$_deps$ringCentr3 === void 0 ? void 0 : (_this$_deps$ringCentr4 = _this$_deps$ringCentr3.webSocketOptions) === null || _this$_deps$ringCentr4 === void 0 ? void 0 : (_this$_deps$ringCentr5 = _this$_deps$ringCentr4.autoRecover) === null || _this$_deps$ringCentr5 === void 0 ? void 0 : _this$_deps$ringCentr5.enabled) !== false) {
                  // enable auto recover
                  this._webSocketExtension.options.autoRecover.enabled = true;
                }
              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function _inactiveOtherTabs() {
        return _inactiveOtherTabs2.apply(this, arguments);
      }
      return _inactiveOtherTabs;
    }()
  }, {
    key: "_syncTokensToOtherTabs",
    value: function () {
      var _syncTokensToOtherTabs2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var _this$_deps$tabManage2;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.send(SyncTokensTabEventName, this.wsToken, this.wsTokenExpiresAt, this.wscToken);
              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
      function _syncTokensToOtherTabs() {
        return _syncTokensToOtherTabs2.apply(this, arguments);
      }
      return _syncTokensToOtherTabs;
    }()
  }, {
    key: "_useTokens",
    value: function _useTokens() {
      this._webSocketExtension.wsToken = this.wsToken;
      this._webSocketExtension.wsTokenExpiresAt = this.wsTokenExpiresAt;
      this._webSocketExtension.wsc = this.wscToken;
    }
  }, {
    key: "_saveTokens",
    value: function _saveTokens() {
      this._setTokens(this._webSocketExtension.wsToken, this._webSocketExtension.wsTokenExpiresAt, this._webSocketExtension.wsc);
      if (this.disconnectOnInactive) {
        this._syncTokensToOtherTabs();
      }
    }
  }, {
    key: "_clearTokens",
    value: function _clearTokens() {
      this._setTokens(null, 0, null);
      if (this.disconnectOnInactive) {
        this._syncTokensToOtherTabs();
      }
    }
  }, {
    key: "_setTokens",
    value: function _setTokens(wsToken, wsTokenExpiresAt, wscToken) {
      this.wsToken = wsToken !== null && wsToken !== void 0 ? wsToken : null;
      this.wsTokenExpiresAt = wsTokenExpiresAt !== null && wsTokenExpiresAt !== void 0 ? wsTokenExpiresAt : 0;
      this.wscToken = wscToken !== null && wscToken !== void 0 ? wscToken : null;
    }
  }, {
    key: "recoverWebSocketConnection",
    value: function () {
      var _recoverWebSocketConnection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (this.ready) {
                  _context11.next = 2;
                  break;
                }
                return _context11.abrupt("return");
              case 2:
                if (this._deps.auth.loggedIn) {
                  _context11.next = 4;
                  break;
                }
                return _context11.abrupt("return");
              case 4:
                if (!(this.disconnectOnInactive && !this.isTabActive)) {
                  _context11.next = 6;
                  break;
                }
                return _context11.abrupt("return");
              case 6:
                if (this.allowSwitchConnection) {
                  _context11.next = 8;
                  break;
                }
                return _context11.abrupt("return");
              case 8:
                if (this._webSocketExtension.rc) {
                  _context11.next = 13;
                  break;
                }
                _context11.next = 11;
                return this._installWebSocketExtension();
              case 11:
                _context11.next = 15;
                break;
              case 13:
                _context11.next = 15;
                return this._webSocketExtension.recover();
              case 15:
                this._exposeConnectionEvents();
              case 16:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function recoverWebSocketConnection() {
        return _recoverWebSocketConnection.apply(this, arguments);
      }
      return recoverWebSocketConnection;
    }()
  }, {
    key: "revokeWebSocketConnection",
    value: function () {
      var _revokeWebSocketConnection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!(!this.ready || !this.isWebSocketReady)) {
                  _context12.next = 2;
                  break;
                }
                return _context12.abrupt("return");
              case 2:
                if (!(this.disconnectOnInactive && !this.isTabActive)) {
                  _context12.next = 4;
                  break;
                }
                return _context12.abrupt("return");
              case 4:
                _context12.next = 6;
                return this._webSocketExtension.revoke(true);
              case 6:
                this._exposeConnectionEvents();
                this._clearTokens();
              case 8:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function revokeWebSocketConnection() {
        return _revokeWebSocketConnection.apply(this, arguments);
      }
      return revokeWebSocketConnection;
    }()
  }, {
    key: "_exposeConnectionEvents",
    value: function _exposeConnectionEvents() {
      var _this$_removeWsListen,
        _this4 = this;
      (_this$_removeWsListen = this._removeWsListener) === null || _this$_removeWsListen === void 0 ? void 0 : _this$_removeWsListen.call(this);
      var ws = this._webSocketExtension.ws;
      if (ws) {
        ws.addEventListener('close', this._syncWsReadyState);
        ws.addEventListener('open', this._syncWsReadyState);
        ws.addEventListener('error', this._syncWsReadyState);
        this._removeWsListener = function () {
          ws.removeEventListener('close', _this4._syncWsReadyState);
          ws.removeEventListener('open', _this4._syncWsReadyState);
          ws.removeEventListener('error', _this4._syncWsReadyState);
        };
      }
      this._syncWsReadyState();
    }
  }, {
    key: "_setWebSocketReadyState",
    value: function _setWebSocketReadyState(readyState) {
      var state;
      switch (readyState) {
        case _isomorphicWs["default"].CONNECTING:
          {
            state = _webSocketReadyStates.webSocketReadyStates.connecting;
            break;
          }
        case _isomorphicWs["default"].OPEN:
          {
            if (this._wsConnectionReady) {
              state = _webSocketReadyStates.webSocketReadyStates.ready;
            } else {
              state = _webSocketReadyStates.webSocketReadyStates.open;
            }
            break;
          }
        case _isomorphicWs["default"].CLOSING:
          {
            state = _webSocketReadyStates.webSocketReadyStates.closing;
            break;
          }
        case _isomorphicWs["default"].CLOSED:
          {
            state = _webSocketReadyStates.webSocketReadyStates.closed;
            this._wsConnectionReady = false;
            break;
          }
        default:
          {
            state = null;
            this._wsConnectionReady = undefined;
            break;
          }
      }
      if (process.env.NODE_ENV !== 'test' && this.webSocketReadyState !== state) {
        console.log("[RingCentralExtensions] > webSocketReadyState > ".concat(this.webSocketReadyState, " -> ").concat(state));
      }
      this.webSocketReadyState = state;
    }
  }, {
    key: "isWebSocketReady",
    get: function get() {
      return this.webSocketReadyState === _webSocketReadyStates.webSocketReadyStates.ready;
    }
  }, {
    key: "debugMode",
    get: function get() {
      var _this$_deps$ringCentr6, _this$_deps$ringCentr7;
      return (_this$_deps$ringCentr6 = (_this$_deps$ringCentr7 = this._deps.ringCentralExtensionsOptions) === null || _this$_deps$ringCentr7 === void 0 ? void 0 : _this$_deps$ringCentr7.debugMode) !== null && _this$_deps$ringCentr6 !== void 0 ? _this$_deps$ringCentr6 : false;
    }
  }, {
    key: "isTabActive",
    get: function get() {
      return !!(this._deps.tabManager && this._deps.tabManager.ready && this._deps.tabManager.active);
    }
  }, {
    key: "disconnectOnInactive",
    get: function get() {
      var _this$_deps$ringCentr8, _this$_deps$ringCentr9;
      return (_this$_deps$ringCentr8 = (_this$_deps$ringCentr9 = this._deps.ringCentralExtensionsOptions) === null || _this$_deps$ringCentr9 === void 0 ? void 0 : _this$_deps$ringCentr9.disconnectOnInactive) !== null && _this$_deps$ringCentr8 !== void 0 ? _this$_deps$ringCentr8 : false;
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
  }, {
    key: "allowSwitchConnection",
    get: function get() {
      var _this$_deps$availabil, _this$_deps$availabil2;
      if (((_this$_deps$availabil = this._deps.availabilityMonitor) === null || _this$_deps$availabil === void 0 ? void 0 : _this$_deps$availabil.hasCallSession) && ((_this$_deps$availabil2 = this._deps.availabilityMonitor) === null || _this$_deps$availabil2 === void 0 ? void 0 : _this$_deps$availabil2.hasWebSocketReady)) {
        return false;
      }
      return true;
    }
  }]);
  return RingCentralExtensions;
}(_core2.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "_setupInfra", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_setupInfra"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_bindEvents", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_bindEvents"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setTokens", [_core2.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setTokens"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "wsToken", [_core2.storage, _core2.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "wsTokenExpiresAt", [_core2.storage, _core2.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "wscToken", [_core2.storage, _core2.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "recoverWebSocketConnection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "recoverWebSocketConnection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "revokeWebSocketConnection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "revokeWebSocketConnection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setWebSocketReadyState", [_core2.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setWebSocketReadyState"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "webSocketReadyState", [_core2.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class);
exports.RingCentralExtensions = RingCentralExtensions;
//# sourceMappingURL=RingCentralExtensions.js.map
