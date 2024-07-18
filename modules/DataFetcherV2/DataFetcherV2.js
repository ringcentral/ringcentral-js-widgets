"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.from");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.map");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.set");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataFetcherV2 = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _sourceStatus = require("./sourceStatus");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DataFetcherV2 = (_dec = (0, _di.Module)({
  name: 'DataFetcherV2',
  deps: ['Auth', 'Storage', 'SleepDetector', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'DataFetcherV2Options',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(DataFetcherV2, _RcModuleV);
  var _super = _createSuper(DataFetcherV2);
  function DataFetcherV2(deps) {
    var _this;
    _classCallCheck(this, DataFetcherV2);
    _this = _super.call(this, {
      storageKey: 'dataFetcherV2',
      enableCache: true,
      deps: deps
    });
    _this._sources = new Set();
    _this._timeoutIds = new Map();
    _this._promises = new Map();
    _initializerDefineProperty(_this, "sourceStatus", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "storageData", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "data", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "timestamps", _descriptor4, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "isFetching", _descriptor5, _assertThisInitialized(_this));
    _this._handleSleepDetected = function () {
      (0, _ramda.forEach)(function (source) {
        if (_this.ready && _this._shouldFetch(source)) {
          _this.tryFetchData(source, '_handleSleepDetected');
        }
      }, Array.from(_this._sources));
    };
    return _this;
  }
  _createClass(DataFetcherV2, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._deps.auth.loggedIn && _get(_getPrototypeOf(DataFetcherV2.prototype), "_shouldInit", this).call(this);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_get(_getPrototypeOf(DataFetcherV2.prototype), "_shouldReset", this).call(this) || this.ready && !this._deps.auth.loggedIn);
    }
  }, {
    key: "_setFetching",
    value: function _setFetching(key, isFetching) {
      this.isFetching[key] = isFetching;
    }
  }, {
    key: "getFetching",
    value: function getFetching(source) {
      return !!this.isFetching[source.key];
    }
  }, {
    key: "_setData",
    value: function _setData(key, disableCache, data) {
      var timestamp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Date.now();
      if (disableCache) {
        this.data[key] = data;
        this.timestamps[key] = timestamp;
      } else {
        this.storageData.cachedData[key] = data;
        this.storageData.cachedTimestamps[key] = timestamp;
      }
    }
  }, {
    key: "updateData",
    value: function updateData(source, data, timestamp) {
      this._setData(source.key, source.disableCache, data, timestamp);
    }
  }, {
    key: "_fetchData",
    value: function () {
      var _fetchData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
        var ownerId, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._setFetching(source.key, true);
                ownerId = this._deps.auth.ownerId;
                _context.prev = 2;
                _context.next = 5;
                return source.fetchFunction();
              case 5:
                data = _context.sent;
                if (this._deps.auth.ownerId === ownerId) {
                  this._setData(source.key, source.disableCache, data, Date.now());
                  this._setFetching(source.key, false);
                  if (source.polling) {
                    this._startPolling(source);
                  }
                  this._promises["delete"](source.key);
                }
                _context.next = 16;
                break;
              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);
                if (!(this._deps.auth.ownerId === ownerId)) {
                  _context.next = 16;
                  break;
                }
                this._promises["delete"](source.key);
                this._setFetching(source.key, false);
                if (source.polling) {
                  this._startPolling(source, source.timeToRetry);
                } else {
                  this._retry(source);
                }
                throw _context.t0;
              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));
      function _fetchData(_x) {
        return _fetchData2.apply(this, arguments);
      }
      return _fetchData;
    }()
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout(source) {
      if (this._timeoutIds.has(source.key)) {
        clearTimeout(this._timeoutIds.get(source.key));
        this._timeoutIds["delete"](source.key);
      }
    }
  }, {
    key: "_startPolling",
    value: function _startPolling(source) {
      var _this2 = this;
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getTimestamp(source) + source.pollingInterval + 10 - Date.now();
      this._clearTimeout(source);
      this._timeoutIds.set(source.key, setTimeout(function () {
        _this2._timeoutIds["delete"](source.key);
        if (_this2.ready && _this2._checkIsActiveTab(source) && source.readyCheckFunction() && source.permissionCheckFunction()) {
          if (_this2._expired(source)) {
            _this2.tryFetchData(source, '_startPolling');
          } else {
            _this2._startPolling(source);
          }
        } else if (!_this2._expired(source)) {
          _this2._startPolling(source);
        } else {
          _this2._startPolling(source, source.timeToRetry);
        }
      }, t));
    }
  }, {
    key: "_retry",
    value: function _retry(source) {
      var _this3 = this;
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : source.timeToRetry;
      this._clearTimeout(source);
      this._timeoutIds.set(source.key, setTimeout(function () {
        if (_this3._expired(source)) {
          if (_this3.ready && _this3._checkIsActiveTab(source) && source.readyCheckFunction() && source.permissionCheckFunction()) {
            _this3.tryFetchData(source, '_retry');
          } else {
            _this3._retry(source);
          }
        }
      }, t));
    }
  }, {
    key: "tryFetchData",
    value: function () {
      var _tryFetchData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(source, callerName) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.fetchData(source);
              case 3:
                _context2.next = 8;
                break;
              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2["catch"](0);
                console.error("[DataFetcherV2] > ".concat(callerName, " > fetchData"), "source \"".concat(source.key, "\""), _context2.t0);
              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 5]]);
      }));
      function tryFetchData(_x2, _x3) {
        return _tryFetchData.apply(this, arguments);
      }
      return tryFetchData;
    }()
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(source) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._promises.get(source.key)) {
                  this._promises.set(source.key, this._fetchData(source));
                }
                return _context3.abrupt("return", this._promises.get(source.key));
              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function fetchData(_x4) {
        return _fetchData3.apply(this, arguments);
      }
      return fetchData;
    }()
  }, {
    key: "getTimestamp",
    value: function getTimestamp(source) {
      if (source.disableCache) {
        return this.timestamps[source.key] || null;
      }
      return this.cachedTimestamps[source.key] || null;
    }
  }, {
    key: "_expired",
    value: function _expired(source) {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      return Date.now() - this.getTimestamp(source) > source.ttl;
    }
  }, {
    key: "_shouldFetch",
    value: function _shouldFetch(source) {
      var isFreshLogin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this._checkIsActiveTab(source) && (isFreshLogin || this._expired(source));
    }
  }, {
    key: "_checkIsActiveTab",
    value: function _checkIsActiveTab(source) {
      // if cache is disabled, then each tab should fetch its own data
      // therefore tabManager should be ignored
      return source.disableCache || !this._deps.tabManager || this._deps.tabManager.active;
    }
  }, {
    key: "_tryInitializeSource",
    value: function () {
      var _tryInitializeSource2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(source) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.getSourceStatus(source) === _sourceStatus.sourceStatus.pending)) {
                  _context4.next = 15;
                  break;
                }
                this._setSourceStatus(source.key, _sourceStatus.sourceStatus.initializing);
                if (!this._shouldFetch(source)) {
                  _context4.next = 13;
                  break;
                }
                _context4.prev = 3;
                _context4.next = 6;
                return this.fetchData(source);
              case 6:
                _context4.next = 11;
                break;
              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](3);
                this._retry(source);
              case 11:
                _context4.next = 14;
                break;
              case 13:
                if (source.polling) {
                  this._startPolling(source);
                } else {
                  this._retry(source);
                }
              case 14:
                return _context4.abrupt("return");
              case 15:
                if (this.getData(source) !== null && this.getTimestamp(source) !== null) {
                  this._setSourceStatus(source.key, _sourceStatus.sourceStatus.ready);
                }
              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 8]]);
      }));
      function _tryInitializeSource(_x5) {
        return _tryInitializeSource2.apply(this, arguments);
      }
      return _tryInitializeSource;
    }()
  }, {
    key: "_setSourceStatus",
    value: function _setSourceStatus(key, status) {
      this.sourceStatus[key] = status;
    }
  }, {
    key: "getSourceStatus",
    value: function getSourceStatus(source) {
      return this.sourceStatus[source.key];
    }
  }, {
    key: "_processSources",
    value: function _processSources() {
      var _this4 = this;
      if (this.ready) {
        (0, _ramda.forEach)(function (source) {
          if (!_this4.getSourceStatus(source)) {
            _this4._setSourceStatus(source.key, _sourceStatus.sourceStatus.pending);
          }
          var status = _this4.getSourceStatus(source);
          var readyCheck = _this4.ready && source.readyCheckFunction();
          var permissionCheck = readyCheck && source.permissionCheckFunction();
          if (readyCheck) {
            if (status === _sourceStatus.sourceStatus.pending || status === _sourceStatus.sourceStatus.initializing) {
              // if user has no permission to fetch data, bypass the initialization process
              if (!permissionCheck) {
                _this4._setSourceStatus(source.key, _sourceStatus.sourceStatus.ready);
                _this4._setData(source.key, source.disableCache, null, 0);
              } else {
                _this4._tryInitializeSource(source);
              }
            } else if (status === _sourceStatus.sourceStatus.ready) {
              if (!permissionCheck && _this4.getData(source) !== null && _this4.getTimestamp(source) !== null) {
                // no permission but has data, set data to null
                // use 0 for timestamp so we know this is on purpose
                _this4._setData(source.key, source.disableCache, null, 0);
              } else if (permissionCheck && _this4.getData(source) === null && _this4.getTimestamp(source) === 0 && !_this4._promises.get(source.key)) {
                // if the data set to null due to permission before
                // but now there is permission, then fetch data
                _this4.tryFetchData(source, '_processSources');
              }
            }
          } else if (status === _sourceStatus.sourceStatus.ready) {
            _this4._setSourceStatus(source.key, _sourceStatus.sourceStatus.pending);
            if (source.cleanOnReset) {
              // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
              _this4._setData(source.key, source.disableCache, null, null);
            }
          }
        }, Array.from(this._sources));
      }
    }
  }, {
    key: "_getRegisteredKeys",
    value: function _getRegisteredKeys() {
      var keys = new Set();
      this._sources.forEach(function (source) {
        keys.add(source.key);
      });
      return keys;
    }
  }, {
    key: "_getInvalidCachedKeys",
    value: function _getInvalidCachedKeys() {
      var registeredKeys = this._getRegisteredKeys();
      var keys = new Set();
      for (var k in this.cachedData) {
        if (Object.prototype.hasOwnProperty.call(this.cachedData, k) && !registeredKeys.has(k)) {
          keys.add(k);
        }
      }
      for (var _k in this.cachedTimestamps) {
        if (Object.prototype.hasOwnProperty.call(this.cachedTimestamps, _k) && !registeredKeys.has(_k)) {
          keys.add(_k);
        }
      }
      return keys;
    }
  }, {
    key: "_deleteKeys",
    value: function _deleteKeys(keys) {
      var _this5 = this;
      keys.forEach(function (k) {
        delete _this5.cachedData[k];
        delete _this5.cachedTimestamps[k];
      });
    }
  }, {
    key: "_cleanCache",
    value: function _cleanCache() {
      this._deleteKeys(this._getInvalidCachedKeys());
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this._deps.sleepDetector.on(this._deps.sleepDetector.events.detected, this._handleSleepDetected);
      // clean up cached sources that are no longer exist
      this._cleanCache();
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this6 = this;
      this._deps.sleepDetector.off(this._deps.sleepDetector.events.detected, this._handleSleepDetected);
      (0, _ramda.forEach)(function (source) {
        // clear all pollings or retries
        _this6._clearTimeout(source);
        // clear all pending requests
        _this6._promises["delete"](source.key);
        // reset isFetching
        _this6._setFetching(source.key, false);
        if (_this6.getSourceStatus(source) !== _sourceStatus.sourceStatus.pending) {
          _this6._setSourceStatus(source.key, _sourceStatus.sourceStatus.pending);
        }
        if (source.cleanOnReset && _this6.getData(source) !== null && _this6.getTimestamp(source) !== null) {
          // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
          _this6._setData(source.key, source.disableCache, null, null);
        }
      }, Array.from(this._sources));
    }
  }, {
    key: "onStateChange",
    value: function onStateChange() {
      this._processSources();
    }
  }, {
    key: "register",
    value: function register(source) {
      this._sources.add(source);
    }
  }, {
    key: "getData",
    value: function getData(source) {
      if (this._sources.has(source)) {
        if (source.disableCache) {
          return this.data[source.key] || null;
        }
        return this.cachedData[source.key] || null;
      }
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'T'.
      return null;
    }
  }, {
    key: "cachedData",
    get: function get() {
      return this.storageData.cachedData;
    }
  }, {
    key: "cachedTimestamps",
    get: function get() {
      return this.storageData.cachedTimestamps;
    }
  }, {
    key: "sources",
    get: function get() {
      return this._sources;
    }
  }]);
  return DataFetcherV2;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sourceStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "storageData", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      cachedData: {},
      cachedTimestamps: {}
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "timestamps", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "isFetching", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setFetching", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setFetching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "tryFetchData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "tryFetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setSourceStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSourceStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_deleteKeys", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_deleteKeys"), _class2.prototype)), _class2)) || _class);
exports.DataFetcherV2 = DataFetcherV2;
//# sourceMappingURL=DataFetcherV2.js.map
