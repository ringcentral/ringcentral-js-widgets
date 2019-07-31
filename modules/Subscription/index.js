"use strict";

require("core-js/modules/es6.array.map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _ramda = require("ramda");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _loginStatus = _interopRequireDefault(require("../Auth/loginStatus"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _getSubscriptionReducer = _interopRequireWildcard(require("./getSubscriptionReducer"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _normalizeEventFilter = require("./normalizeEventFilter");

var _dec, _class, _class2;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DEFAULT_TIME_TO_RETRY = 60 * 1000;
/**
 * @class
 * @description Subscription module to subscibe notification
 */

var Subscription = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Client', 'Storage', {
    dep: 'SubscriptionOptions',
    optional: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(Subscription, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {Storage} params.storage - storage module instance
   * @param {Number} params.timeToRetry - time to retry, default 60 seconds
   */
  function Subscription(_ref) {
    var _this;

    var auth = _ref.auth,
        client = _ref.client,
        storage = _ref.storage,
        _ref$timeToRetry = _ref.timeToRetry,
        timeToRetry = _ref$timeToRetry === void 0 ? DEFAULT_TIME_TO_RETRY : _ref$timeToRetry,
        options = _objectWithoutProperties(_ref, ["auth", "client", "storage", "timeToRetry"]);

    _classCallCheck(this, Subscription);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Subscription).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));
    _this._auth = auth;
    _this._client = client;
    _this._storage = storage;
    _this._timeToRetry = timeToRetry;
    _this._cacheStorageKey = 'cachedSubscription';
    _this._reducer = (0, _getSubscriptionReducer["default"])(_this.actionTypes);

    _this._storage.registerReducer({
      key: _this._cacheStorageKey,
      reducer: (0, _getSubscriptionReducer.getCachedSubscriptionReducer)(_this.actionTypes)
    });

    _this._resetPromise = null;
    _this._removePromise = null;
    _this._retryTimeoutId = null;
    _this._registerTimeoutId = null;
    return _this;
  }

  _createClass(Subscription, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this2._auth.loginStatus === _loginStatus["default"].loggedIn && _this2._storage.ready && _this2.status === _moduleStatuses["default"].pending) {
                  _this2._startSleepDetection();

                  _this2.store.dispatch({
                    type: _this2.actionTypes.initSuccess
                  });
                } else if ((_this2._auth.loginStatus === _loginStatus["default"].notLoggedIn || !_this2._storage.ready) && _this2.ready) {
                  _this2.reset();
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));

      this._auth.addBeforeLogoutHandler(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this2.ready) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return _this2.reset();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));
    }
  }, {
    key: "_startSleepDetection",
    value: function _startSleepDetection() {
      this._stopSleepDetection();

      this._detectSleep();
    } // TODO Use SleepDetector module after

  }, {
    key: "_stopSleepDetection",
    value: function _stopSleepDetection() {
      if (this._sleepTimeout) {
        clearTimeout(this._sleepTimeout);
        this._sleepTimeout = null;
      }
    }
  }, {
    key: "_detectSleep",
    value: function _detectSleep() {
      var _this3 = this;

      var t = Date.now();
      this._sleepTimeout = setTimeout(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(_this3.ready && _this3._subscription && Date.now() - t > 20 * 1000)) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 3;
                return _this3.remove();

              case 3:
                _context3.next = 5;
                return _this3._subscribe();

              case 5:
                _this3._detectSleep();

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })), 10 * 1000);
    }
  }, {
    key: "_createSubscription",
    value: function _createSubscription() {
      var _this4 = this;

      this._subscription = this._client.service.createSubscription();

      if (this.cachedSubscription) {
        try {
          this._subscription.setSubscription(this.cachedSubscription);
        } catch (error) {
          this._subscription = this._client.service.createSubscription();
        }
      }

      this._subscription.on(this._subscription.events.notification, function (message) {
        _this4.store.dispatch({
          type: _this4.actionTypes.notification,
          message: message
        });
      });

      this._subscription.on(this._subscription.events.removeSuccess, function () {
        _this4.store.dispatch({
          type: _this4.actionTypes.removeSuccess
        });
      });

      this._subscription.on(this._subscription.events.removeError, function (error) {
        _this4.store.dispatch({
          type: _this4.actionTypes.removeError,
          error: error
        });
      });

      this._subscription.on(this._subscription.events.renewSuccess, function () {
        if (_this4._subscription) {
          _this4.store.dispatch({
            type: _this4.actionTypes.renewSuccess,
            subscription: _this4._subscription.subscription()
          });
        }
      });

      this._subscription.on(this._subscription.events.renewError, function (error) {
        if (_this4._subscription) {
          _this4._subscription.reset();

          _this4._subscription = null;
        }

        _this4.store.dispatch({
          type: _this4.actionTypes.renewError,
          error: error
        });

        if (_this4._auth.loginStatus === _loginStatus["default"].loggedIn && _this4._storage.ready) {
          // immediately start the retry process after the first renewError
          _this4._retry(0);
        }
      });

      this._subscription.on(this._subscription.events.subscribeSuccess, function () {
        if (_this4._subscription) {
          _this4.store.dispatch({
            type: _this4.actionTypes.subscribeSuccess,
            subscription: _this4._subscription.subscription()
          });
        }
      });

      this._subscription.on(this._subscription.events.subscribeError, function (error) {
        _this4.store.dispatch({
          type: _this4.actionTypes.subscribeError,
          error: error
        });

        if (_this4._auth.loginStatus === _loginStatus["default"].loggedIn && _this4._storage.ready) {
          _this4._retry();
        }
      });
    }
  }, {
    key: "_register",
    value: function _register() {
      var _this5 = this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;

      if (this._registerTimeoutId) {
        clearTimeout(this._registerTimeoutId);
      }

      this._registerTimeoutId = setTimeout(function () {
        _this5._registerTimeoutId = null;

        _this5.store.dispatch({
          type: _this5.actionTypes.subscribe
        });

        if (_this5._subscription && !(0, _ramda.equals)((0, _ramda.map)(_normalizeEventFilter.normalizeEventFilter, _this5._subscription.eventFilters()).sort(), (0, _ramda.map)(_normalizeEventFilter.normalizeEventFilter, _this5.filters).sort())) {
          _this5._subscription.setEventFilters(_this5.filters);

          _this5._subscription.register();
        }
      }, delay);
    }
  }, {
    key: "_subscribe",
    value: function _subscribe(delay) {
      if (!this._subscription) {
        this._createSubscription();
      }

      this._register(delay);
    }
  }, {
    key: "subscribe",
    value: function () {
      var _subscribe2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var events,
            delay,
            oldFilters,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                events = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : [];
                delay = _args4.length > 1 ? _args4[1] : undefined;

                if (!this.ready) {
                  _context4.next = 8;
                  break;
                }

                oldFilters = this.filters;
                this.store.dispatch({
                  type: this.actionTypes.addFilters,
                  filters: [].concat(events)
                });

                if (!(oldFilters.length !== this.filters.length)) {
                  _context4.next = 8;
                  break;
                }

                _context4.next = 8;
                return this._subscribe(delay);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function subscribe() {
        return _subscribe2.apply(this, arguments);
      }

      return subscribe;
    }()
  }, {
    key: "unsubscribe",
    value: function () {
      var _unsubscribe = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var events,
            oldFilters,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                events = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : [];

                if (this.ready) {
                  oldFilters = this.filters;
                  this.store.dispatch({
                    type: this.actionTypes.removeFilters,
                    fiters: [].concat(events)
                  });

                  if (this.filters.length === 0) {
                    this.remove();
                  } else if (oldFilters.length !== this.filters.length) {
                    this._subscribe();
                  }
                }

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function unsubscribe() {
        return _unsubscribe.apply(this, arguments);
      }

      return unsubscribe;
    }()
  }, {
    key: "_stopRetry",
    value: function () {
      var _stopRetry2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this._retryTimeoutId) {
                  clearTimeout(this._retryTimeoutId);
                  this._retryTimeoutId = null;
                }

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _stopRetry() {
        return _stopRetry2.apply(this, arguments);
      }

      return _stopRetry;
    }()
  }, {
    key: "_retry",
    value: function () {
      var _retry2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        var _this6 = this;

        var t,
            _args7 = arguments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                t = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : this._timeToRetry;

                this._stopRetry();

                this._retryTimeoutId = setTimeout(function () {
                  if (_this6.ready) {
                    _this6._subscribe();
                  }
                }, t);

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _retry() {
        return _retry2.apply(this, arguments);
      }

      return _retry;
    }()
  }, {
    key: "_remove",
    value: function () {
      var _remove2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this._subscription) {
                  _context8.next = 11;
                  break;
                }

                _context8.prev = 1;
                this.store.dispatch({
                  type: this.actionTypes.remove
                });
                _context8.next = 5;
                return this._subscription.remove();

              case 5:
                _context8.next = 9;
                break;

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](1);

              case 9:
                if (this._subscription) {
                  // check again in case subscription object was removed while waiting
                  this._subscription.reset();

                  this._subscription = null;
                }

                this._removePromise = null;

              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[1, 7]]);
      }));

      function _remove() {
        return _remove2.apply(this, arguments);
      }

      return _remove;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!this._removePromise) {
                  this._removePromise = this._remove();
                }

                return _context9.abrupt("return", this._removePromise);

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function remove() {
        return _remove3.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: "_reset",
    value: function () {
      var _reset2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.reset
                });

                this._stopSleepDetection();

                this._stopRetry();

                if (!this._subscription) {
                  _context10.next = 16;
                  break;
                }

                if (!this._auth.loggedIn) {
                  _context10.next = 14;
                  break;
                }

                _context10.prev = 5;
                _context10.next = 8;
                return this.remove();

              case 8:
                _context10.next = 12;
                break;

              case 10:
                _context10.prev = 10;
                _context10.t0 = _context10["catch"](5);

              case 12:
                _context10.next = 16;
                break;

              case 14:
                this._subscription.reset();

                this._subscription = null;

              case 16:
                this._resetPromise = null;
                this.store.dispatch({
                  type: this.actionTypes.resetSuccess
                });

              case 18:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[5, 10]]);
      }));

      function _reset() {
        return _reset2.apply(this, arguments);
      }

      return _reset;
    }()
  }, {
    key: "reset",
    value: function () {
      var _reset3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!this._resetPromise) {
                  this._resetPromise = this._reset();
                }

                return _context11.abrupt("return", this._resetPromise);

              case 2:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function reset() {
        return _reset3.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "filters",
    get: function get() {
      return this.state.filters;
    }
  }, {
    key: "message",
    get: function get() {
      return this.state.message;
    }
  }, {
    key: "subscriptionStatus",
    get: function get() {
      return this.state.subscriptionStatus;
    }
  }, {
    key: "cachedSubscription",
    get: function get() {
      return this._storage.getItem(this._cacheStorageKey);
    }
  }, {
    key: "pubnub",
    get: function get() {
      return this._subscription && this._subscription._pubnub;
    }
  }]);

  return Subscription;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "subscribe", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "subscribe"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unsubscribe", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "unsubscribe"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "remove", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "remove"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reset", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "reset"), _class2.prototype)), _class2)) || _class);
exports["default"] = Subscription;
//# sourceMappingURL=index.js.map
