"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebSocketSubscription = exports.SyncMessageTabEventName = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _background = _interopRequireDefault(require("../../lib/background"));
var _debounceThrottle = require("../../lib/debounce-throttle");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _webSocketReadyStates = require("../RingCentralExtensions/webSocketReadyStates");
var _normalizeEventFilter = require("./normalizeEventFilter");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
var DEFAULT_REFRESH_DELAY = process.env.NODE_ENV === 'test' ? 0 : 1000;
var SyncMessageTabEventName = 'WebSocketSubscription-syncMessage';
exports.SyncMessageTabEventName = SyncMessageTabEventName;
var WebSocketSubscription = (_dec = (0, _di.Module)({
  name: 'WebSocketSubscription',
  deps: ['Client', 'Storage', 'RingCentralExtensions', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'WebSocketSubscriptionOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(WebSocketSubscription, _RcModuleV);
  var _super = _createSuper(WebSocketSubscription);
  function WebSocketSubscription(deps) {
    var _this;
    _classCallCheck(this, WebSocketSubscription);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'WebSocketSubscription'
    });
    _this._wsSubscription = void 0;
    _initializerDefineProperty(_this, "subscriptionInfo", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "subscriptionChannel", _descriptor2, _assertThisInitialized(_this));
    _this._debouncedUpdateSubscription = (0, _debounceThrottle.promisedDebounce)({
      fn: _this._updateSubscription,
      threshold: DEFAULT_REFRESH_DELAY
    });
    _initializerDefineProperty(_this, "filters", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "message", _descriptor4, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(WebSocketSubscription, [{
    key: "onInitOnce",
    value: function () {
      var _onInitOnce = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._bindEvents();
              case 2:
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
                _context2.next = 2;
                return this._debouncedUpdateSubscriptionCatchCancel();
              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function onInitSuccess() {
        return _onInitSuccess.apply(this, arguments);
      }
      return onInitSuccess;
    }()
  }, {
    key: "onReset",
    value: function () {
      var _onReset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._debouncedUpdateSubscription.cancel();
              case 2:
                _context3.next = 4;
                return this._removeSubscription();
              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function onReset() {
        return _onReset.apply(this, arguments);
      }
      return onReset;
    }()
  }, {
    key: "_debouncedUpdateSubscriptionCatchCancel",
    value: function () {
      var _debouncedUpdateSubscriptionCatchCancel2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this._debouncedUpdateSubscription();
              case 3:
                _context4.next = 9;
                break;
              case 5:
                _context4.prev = 5;
                _context4.t0 = _context4["catch"](0);
                if (!(_context4.t0.message !== 'cancelled')) {
                  _context4.next = 9;
                  break;
                }
                throw _context4.t0;
              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 5]]);
      }));
      function _debouncedUpdateSubscriptionCatchCancel() {
        return _debouncedUpdateSubscriptionCatchCancel2.apply(this, arguments);
      }
      return _debouncedUpdateSubscriptionCatchCancel;
    }()
  }, {
    key: "_bindEvents",
    value: function () {
      var _bindEvents2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this2 = this;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                (0, _core.watch)(this, function () {
                  return _this2._deps.ringCentralExtensions.webSocketReadyState;
                }, /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(wsState) {
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            if (!(!_this2.ready || !wsState)) {
                              _context5.next = 2;
                              break;
                            }
                            return _context5.abrupt("return");
                          case 2:
                            if (!(wsState === _webSocketReadyStates.webSocketReadyStates.ready)) {
                              _context5.next = 7;
                              break;
                            }
                            _context5.next = 5;
                            return _this2._updateSubscription();
                          case 5:
                            _context5.next = 16;
                            break;
                          case 7:
                            if (!(wsState === _webSocketReadyStates.webSocketReadyStates.closing)) {
                              _context5.next = 12;
                              break;
                            }
                            _context5.next = 10;
                            return _this2._revokeSubscription();
                          case 10:
                            _context5.next = 16;
                            break;
                          case 12:
                            _context5.next = 14;
                            return _this2._debouncedUpdateSubscription.cancel();
                          case 14:
                            _context5.next = 16;
                            return _this2._removeSubscription();
                          case 16:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
                if (this.onlyOneTabConnected) {
                  (0, _core.watch)(this, function () {
                    return _this2._deps.tabManager.event;
                  }, function (event) {
                    _this2._tabEventHandler(event);
                  });
                }
              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function _bindEvents() {
        return _bindEvents2.apply(this, arguments);
      }
      return _bindEvents;
    }()
  }, {
    key: "_tabEventHandler",
    value: function _tabEventHandler(event) {
      if (!this.ready || !event) {
        return;
      }
      if (event.name === SyncMessageTabEventName) {
        this._notifyMessage(event.args[0]);
      }
    }
  }, {
    key: "_syncMessageToOtherTabs",
    value: function () {
      var _syncMessageToOtherTabs2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(message) {
        var _this$_deps$tabManage;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.send(SyncMessageTabEventName, message);
              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function _syncMessageToOtherTabs(_x2) {
        return _syncMessageToOtherTabs2.apply(this, arguments);
      }
      return _syncMessageToOtherTabs;
    }()
  }, {
    key: "_setTokens",
    value: function _setTokens(subscriptionInfo, subscriptionChannel) {
      this.subscriptionInfo = subscriptionInfo !== null && subscriptionInfo !== void 0 ? subscriptionInfo : null;
      this.subscriptionChannel = subscriptionChannel !== null && subscriptionChannel !== void 0 ? subscriptionChannel : null;
    }
  }, {
    key: "_saveTokens",
    value: function _saveTokens() {
      var _this$_wsSubscription;
      this._setTokens((_this$_wsSubscription = this._wsSubscription) === null || _this$_wsSubscription === void 0 ? void 0 : _this$_wsSubscription.subscriptionInfo, this._deps.ringCentralExtensions.webSocketExtension.ws.url);
    }
  }, {
    key: "_clearTokens",
    value: function _clearTokens() {
      this._setTokens(null, null);
    }
  }, {
    key: "_obtainSubscription",
    value: function () {
      var _obtainSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var _this3 = this,
          _subscription$subscri;
        var isNewChannel, subscription, isNewSubscription;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                isNewChannel = !this.subscriptionChannel || !(0, _normalizeEventFilter.isTheSameWebSocket)(this.subscriptionChannel, this._deps.ringCentralExtensions.webSocketExtension.ws.url);
                if (process.env.NODE_ENV !== 'test') {
                  console.log("[WebSocketSubscription] > _obtainSubscription > isNewChannel: ".concat(isNewChannel));
                }

                // For reduce the total number of subscriptions (ttl 24 hours, limited number 20),
                // Revoke existing subscription before creating new.
                if (!isNewChannel) {
                  _context8.next = 6;
                  break;
                }
                _context8.next = 5;
                return this._revokeSubscription();
              case 5:
                if (process.env.NODE_ENV !== 'test') {
                  console.log('[WebSocketSubscription] > _obtainSubscription > existing subscription revoked');
                }
              case 6:
                _context8.next = 8;
                return this._deps.ringCentralExtensions.webSocketExtension.subscribe(this.filters, function (message) {
                  _this3._notifyMessage(message);
                  if (_this3.onlyOneTabConnected) {
                    _this3._syncMessageToOtherTabs(message);
                  }
                }, isNewChannel ? null : this.subscriptionInfo);
              case 8:
                subscription = _context8.sent;
                isNewSubscription = !this.subscriptionInfo || this.subscriptionInfo.id !== ((_subscription$subscri = subscription.subscriptionInfo) === null || _subscription$subscri === void 0 ? void 0 : _subscription$subscri.id);
                if (isNewSubscription) {
                  if (process.env.NODE_ENV !== 'test') {
                    console.log('[WebSocketSubscription] > _obtainSubscription > subscription created');
                  }
                } else {
                  if (process.env.NODE_ENV !== 'test') {
                    console.log('[WebSocketSubscription] > _obtainSubscription > subscription recovered');
                  }
                }
                this._wsSubscription = subscription;
                this._saveTokens();
              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function _obtainSubscription() {
        return _obtainSubscription2.apply(this, arguments);
      }
      return _obtainSubscription;
    }()
  }, {
    key: "_refreshSubscription",
    value: function () {
      var _refreshSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!this._wsSubscription) {
                  _context9.next = 5;
                  break;
                }
                this._wsSubscription.eventFilters = this.filters;
                _context9.next = 4;
                return this._wsSubscription.refresh();
              case 4:
                this._saveTokens();
              case 5:
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
    key: "_revokeSubscription",
    value: function () {
      var _revokeSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                if (!this._wsSubscription) {
                  _context10.next = 6;
                  break;
                }
                _context10.next = 4;
                return this._wsSubscription.revoke();
              case 4:
                _context10.next = 9;
                break;
              case 6:
                if (!this.subscriptionInfo) {
                  _context10.next = 9;
                  break;
                }
                _context10.next = 9;
                return this._deps.client.service.platform()["delete"](this.subscriptionInfo.uri);
              case 9:
                _context10.next = 14;
                break;
              case 11:
                _context10.prev = 11;
                _context10.t0 = _context10["catch"](0);
                // ignore error of revoke request
                if (process.env.NODE_ENV !== 'test') {
                  console.warn("[WebSocketSubscription] > _revokeSubscription > ".concat(_context10.t0));
                }
              case 14:
                this._wsSubscription = undefined;
                this._clearTokens(); // once subscription is revoked, all tokens are expired
              case 16:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 11]]);
      }));
      function _revokeSubscription() {
        return _revokeSubscription2.apply(this, arguments);
      }
      return _revokeSubscription;
    }() // Remove client side subscription object only
  }, {
    key: "_removeSubscription",
    value: function () {
      var _removeSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (this._wsSubscription) {
                  this._wsSubscription.remove();
                  this._wsSubscription = undefined;
                }
              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function _removeSubscription() {
        return _removeSubscription2.apply(this, arguments);
      }
      return _removeSubscription;
    }()
  }, {
    key: "_updateSubscription",
    value: function () {
      var _updateSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var _this$_wsSubscription2, _this$_wsSubscription3;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (this._deps.ringCentralExtensions.isWebSocketReady) {
                  _context12.next = 2;
                  break;
                }
                return _context12.abrupt("return");
              case 2:
                if (!(this.filters.length === 0)) {
                  _context12.next = 6;
                  break;
                }
                _context12.next = 5;
                return this._revokeSubscription();
              case 5:
                return _context12.abrupt("return");
              case 6:
                if (this._wsSubscription) {
                  _context12.next = 11;
                  break;
                }
                _context12.next = 9;
                return this._obtainSubscription();
              case 9:
                _context12.next = 14;
                break;
              case 11:
                if (!(this.filters.map(function (x) {
                  return (0, _normalizeEventFilter.normalizeEventFilter)(x);
                }).sort().join(',') !== ((_this$_wsSubscription2 = (_this$_wsSubscription3 = this._wsSubscription.subscriptionInfo) === null || _this$_wsSubscription3 === void 0 ? void 0 : _this$_wsSubscription3.eventFilters) !== null && _this$_wsSubscription2 !== void 0 ? _this$_wsSubscription2 : []).map(function (x) {
                  return (0, _normalizeEventFilter.normalizeEventFilter)(x);
                }).sort().join(','))) {
                  _context12.next = 14;
                  break;
                }
                _context12.next = 14;
                return this._refreshSubscription();
              case 14:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function _updateSubscription() {
        return _updateSubscription2.apply(this, arguments);
      }
      return _updateSubscription;
    }()
  }, {
    key: "subscribe",
    value: function () {
      var _subscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var eventsFilters,
          oldLength,
          _args13 = arguments;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                eventsFilters = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : [];
                if (this.ready) {
                  _context13.next = 3;
                  break;
                }
                return _context13.abrupt("return");
              case 3:
                oldLength = this.filters.length;
                this._addFilters(eventsFilters);
                if (!(oldLength !== this.filters.length)) {
                  _context13.next = 8;
                  break;
                }
                _context13.next = 8;
                return this._debouncedUpdateSubscriptionCatchCancel();
              case 8:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
      function subscribe() {
        return _subscribe.apply(this, arguments);
      }
      return subscribe;
    }()
  }, {
    key: "unsubscribe",
    value: function () {
      var _unsubscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var eventsFilters,
          oldLength,
          _args14 = arguments;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                eventsFilters = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : [];
                if (this.ready) {
                  _context14.next = 3;
                  break;
                }
                return _context14.abrupt("return");
              case 3:
                oldLength = this.filters.length;
                this._removeFilters(eventsFilters);
                if (!(oldLength !== this.filters.length)) {
                  _context14.next = 8;
                  break;
                }
                _context14.next = 8;
                return this._debouncedUpdateSubscriptionCatchCancel();
              case 8:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));
      function unsubscribe() {
        return _unsubscribe.apply(this, arguments);
      }
      return unsubscribe;
    }()
  }, {
    key: "_addFilters",
    value: function _addFilters(eventsFilters) {
      this.filters = this.filters.concat(eventsFilters).filter(function (x, index, array) {
        return array.indexOf(x) === index;
      }); // remove duplicates
    }
  }, {
    key: "_removeFilters",
    value: function _removeFilters(eventsFilters) {
      this.filters = this.filters.filter(function (x) {
        return !eventsFilters.includes(x);
      });
    }
  }, {
    key: "_notifyMessage",
    value: function _notifyMessage(message) {
      this.message = message !== null && message !== void 0 ? message : null;
    }
  }, {
    key: "onlyOneTabConnected",
    get: function get() {
      return this._deps.ringCentralExtensions.disconnectOnInactive;
    }
  }]);
  return WebSocketSubscription;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "_bindEvents", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_bindEvents"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "subscriptionInfo", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "subscriptionChannel", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setTokens", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setTokens"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateSubscription", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateSubscription"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "subscribe", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "subscribe"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unsubscribe", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "unsubscribe"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addFilters", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeFilters", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_notifyMessage", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_notifyMessage"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "filters", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "message", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class);
exports.WebSocketSubscription = WebSocketSubscription;
//# sourceMappingURL=WebSocketSubscription.js.map
