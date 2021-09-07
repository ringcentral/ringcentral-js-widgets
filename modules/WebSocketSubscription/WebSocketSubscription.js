"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

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
exports.WebSocketSubscription = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.sort");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _proxify = require("../../lib/proxy/proxify");

var _debounceThrottle = require("../../lib/debounce-throttle");

var _webSocketReadyStates = require("../RingCentralExtensions/webSocketReadyStates");

var _normalizeEventFilter = require("./normalizeEventFilter");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3;

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DEFAULT_REFRESH_DELAY = 2 * 1000;
var WebSocketSubscription = (_dec = (0, _di.Module)({
  deps: ['Storage', 'RingCentralExtensions', {
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

    _initializerDefineProperty(_this, "cachedSubscriptionInfo", _descriptor, _assertThisInitialized(_this));

    _this._debouncedUpdateSubscription = (0, _debounceThrottle.debounce)({
      fn: _this._updateSubscription,
      threshold: _this._refreshDelay
    });

    _initializerDefineProperty(_this, "filters", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "message", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(WebSocketSubscription, [{
    key: "_isWebSocketOpened",
    value: function _isWebSocketOpened() {
      var readyState = this._deps.ringCentralExtensions.webSocketReadyState;
      return readyState === _webSocketReadyStates.webSocketReadyStates.open || readyState === _webSocketReadyStates.webSocketReadyStates.closing;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      (0, _core.watch)(this, function () {
        return _this2._isWebSocketOpened();
      }, function (isOpened) {
        if (!_this2.ready) {
          return;
        }

        if (isOpened) {
          _this2._debouncedUpdateSubscription();
        } else {
          _this2._debouncedUpdateSubscription.cancel();
        }
      });
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._isWebSocketOpened()) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return this._debouncedUpdateSubscription();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onInit() {
        return _onInit.apply(this, arguments);
      }

      return onInit;
    }()
  }, {
    key: "onReset",
    value: function () {
      var _onReset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._debouncedUpdateSubscription.cancel();

              case 2:
                this._wsSubscription = null;

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onReset() {
        return _onReset.apply(this, arguments);
      }

      return onReset;
    }()
  }, {
    key: "_createSubscription",
    value: function () {
      var _createSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this._deps.ringCentralExtensions.webSocketExtension.ws) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                _context3.next = 4;
                return this._deps.ringCentralExtensions.webSocketExtension.subscribe(this.filters, function (message) {
                  _this3._notifyMessage(message);
                }, this.cachedSubscriptionInfo);

              case 4:
                this._wsSubscription = _context3.sent;

                this._cacheSubscriptionInfo(this._wsSubscription.subscriptionInfo);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _createSubscription() {
        return _createSubscription2.apply(this, arguments);
      }

      return _createSubscription;
    }()
  }, {
    key: "_cacheSubscriptionInfo",
    value: function _cacheSubscriptionInfo(subscriptionInfo) {
      this.cachedSubscriptionInfo = subscriptionInfo;
    }
  }, {
    key: "_refreshSubscription",
    value: function () {
      var _refreshSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this._wsSubscription) {
                  _context4.next = 4;
                  break;
                }

                this._wsSubscription.eventFilters = this.filters;
                _context4.next = 4;
                return this._wsSubscription.refresh();

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _refreshSubscription() {
        return _refreshSubscription2.apply(this, arguments);
      }

      return _refreshSubscription;
    }()
  }, {
    key: "_revokeSubscription",
    value: function () {
      var _revokeSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this._wsSubscription) {
                  _context5.next = 4;
                  break;
                }

                _context5.next = 3;
                return this._wsSubscription.revoke();

              case 3:
                this._wsSubscription = null;

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _revokeSubscription() {
        return _revokeSubscription2.apply(this, arguments);
      }

      return _revokeSubscription;
    }()
  }, {
    key: "_updateSubscription",
    value: function () {
      var _updateSubscription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this$_wsSubscription;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this.filters.length === 0)) {
                  _context6.next = 4;
                  break;
                }

                _context6.next = 3;
                return this._revokeSubscription();

              case 3:
                return _context6.abrupt("return");

              case 4:
                if (this._isWebSocketOpened()) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return");

              case 6:
                if (this._wsSubscription) {
                  _context6.next = 11;
                  break;
                }

                _context6.next = 9;
                return this._createSubscription();

              case 9:
                _context6.next = 14;
                break;

              case 11:
                if (!(this.filters.map(function (x) {
                  return (0, _normalizeEventFilter.normalizeEventFilter)(x);
                }).sort().join(',') !== ((_this$_wsSubscription = this._wsSubscription.subscriptionInfo) === null || _this$_wsSubscription === void 0 ? void 0 : _this$_wsSubscription.eventFilters.map(function (x) {
                  return (0, _normalizeEventFilter.normalizeEventFilter)(x);
                }).sort().join(',')))) {
                  _context6.next = 14;
                  break;
                }

                _context6.next = 14;
                return this._refreshSubscription();

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _updateSubscription() {
        return _updateSubscription2.apply(this, arguments);
      }

      return _updateSubscription;
    }()
  }, {
    key: "subscribe",
    value: function () {
      var _subscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var eventsFilters,
            oldLength,
            _args7 = arguments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                eventsFilters = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : [];

                if (this.ready) {
                  _context7.next = 3;
                  break;
                }

                return _context7.abrupt("return");

              case 3:
                oldLength = this.filters.length;

                this._addFilters(eventsFilters);

                if (!(oldLength !== this.filters.length)) {
                  _context7.next = 8;
                  break;
                }

                _context7.next = 8;
                return this._debouncedUpdateSubscription();

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function subscribe() {
        return _subscribe.apply(this, arguments);
      }

      return subscribe;
    }()
  }, {
    key: "unsubscribe",
    value: function () {
      var _unsubscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var eventsFilters,
            oldLength,
            _args8 = arguments;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                eventsFilters = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : [];

                if (this.ready) {
                  _context8.next = 3;
                  break;
                }

                return _context8.abrupt("return");

              case 3:
                oldLength = this.filters.length;

                this._removeFilters(eventsFilters);

                if (!(oldLength !== this.filters.length)) {
                  _context8.next = 8;
                  break;
                }

                _context8.next = 8;
                return this._debouncedUpdateSubscription();

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
      this.message = message;
    }
  }, {
    key: "_refreshDelay",
    get: function get() {
      var _this$_deps$webSocket;

      var delay = (_this$_deps$webSocket = this._deps.webSocketSubscriptionOptions) === null || _this$_deps$webSocket === void 0 ? void 0 : _this$_deps$webSocket.refreshDelay;
      return Math.max(0, delay !== null && delay !== void 0 ? delay : DEFAULT_REFRESH_DELAY);
    }
  }]);

  return WebSocketSubscription;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cachedSubscriptionInfo", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_cacheSubscriptionInfo", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_cacheSubscriptionInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "subscribe", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "subscribe"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unsubscribe", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "unsubscribe"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addFilters", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeFilters", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeFilters"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_notifyMessage", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_notifyMessage"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "filters", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "message", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class);
exports.WebSocketSubscription = WebSocketSubscription;
//# sourceMappingURL=WebSocketSubscription.js.map
