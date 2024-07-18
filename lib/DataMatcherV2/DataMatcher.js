"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.name");
require("core-js/modules/es.map");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.set");
require("core-js/modules/es.string.iterator");
require("core-js/modules/es.string.match");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataMatcher = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _di = require("../di");
var _proxify = _interopRequireDefault(require("../proxy/proxify"));
var _dec, _dec2, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
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
var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_NO_MATCH_TTL = 30 * 1000;
var DataMatcher = (_dec = (0, _di.Library)({
  name: 'DataMatcher',
  deps: [{
    dep: 'Storage',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var data = _ref.data,
    ready = _ref.ready,
    _searchProviders = _ref._searchProviders;
  return [data, ready, _searchProviders.size];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(DataMatcher, _RcModuleV);
  var _super = _createSuper(DataMatcher);
  function DataMatcher(deps, storageKey, disableCache) {
    var _this;
    _classCallCheck(this, DataMatcher);
    _this = _super.call(this, {
      deps: deps,
      enableCache: !(disableCache !== null && disableCache !== void 0 ? disableCache : false),
      storageKey: storageKey
    });
    _this._querySources = new Map();
    _this._searchProviders = new Map();
    _this._matchPromises = new Map();
    _this._matchQueues = new Map();
    _this._lastCleanUp = 0;
    _initializerDefineProperty(_this, "data", _descriptor, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(DataMatcher, [{
    key: "onReset",
    value: function onReset() {
      this._lastCleanUp = 0;
    }
  }, {
    key: "_getQueries",
    value: function _getQueries() {
      var output = new Set();
      this._querySources.forEach(function (readyCheckFn, getQueriesFn) {
        if (readyCheckFn()) {
          getQueriesFn().forEach(function (query) {
            output.add(query);
          });
        }
      });
      return _toConsumableArray(output);
    }
  }, {
    key: "insertMatchEntries",
    value: function insertMatchEntries(_ref2) {
      var _this2 = this;
      var name = _ref2.name,
        queries = _ref2.queries,
        data = _ref2.data;
      var timestamp = Date.now();
      queries.forEach(function (query) {
        var _this2$data$query, _data$query;
        _this2.data[query] = (_this2$data$query = _this2.data[query]) !== null && _this2$data$query !== void 0 ? _this2$data$query : {};
        _this2.data[query][name] = {
          _t: timestamp,
          // for noMatchTtl check
          data: (_data$query = data[query]) !== null && _data$query !== void 0 ? _data$query : []
        };
      });
    }
  }, {
    key: "_cleanUp",
    value: function _cleanUp() {
      var _this3 = this;
      // throttle clean up to only run once every 100ms
      var now = Date.now();
      if (now - this._lastCleanUp > 100) {
        this._lastCleanUp = now;
        Object.keys(this.data).forEach(function (query) {
          Object.keys(_this3.data[query]).forEach(function (name) {
            if (!_this3.data[query][name]._t) {
              // mark for deletion
              _this3.data[query][name]._t = now;
            } else if (now - _this3.data[query][name]._t > _this3._ttl) {
              // expired yet
              // entry is removed
              delete _this3.data[query][name];
            }
          });
        });
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_get(_getPrototypeOf(DataMatcher.prototype), "_shouldInit", this).call(this) && this.searchProvidersReady);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_get(_getPrototypeOf(DataMatcher.prototype), "_shouldReset", this).call(this) || this.ready && !this.searchProvidersReady);
    }
  }, {
    key: "addSearchProvider",
    value: function addSearchProvider(_ref3) {
      var name = _ref3.name,
        searchFn = _ref3.searchFn,
        readyCheckFn = _ref3.readyCheckFn;
      if (!name) {
        throw new Error("".concat(this.constructor.name, ": \"name\" is required."));
      }
      if (this._searchProviders.has(name)) {
        throw new Error("".concat(this.constructor.name, ": A provider named \"").concat(name, "\" already exists."));
      }
      if (typeof searchFn !== 'function') {
        throw new Error("".concat(this.constructor.name, ": \"searchFn\" must be a function."));
      }
      if (typeof readyCheckFn !== 'function') {
        throw new Error("".concat(this.constructor.name, ": \"readyCheckFn\" must be a function."));
      }
      this._searchProviders.set(name, {
        searchFn: searchFn,
        readyCheckFn: readyCheckFn
      });
    }
  }, {
    key: "addQuerySource",
    value: function addQuerySource(_ref4) {
      var getQueriesFn = _ref4.getQueriesFn,
        readyCheckFn = _ref4.readyCheckFn;
      if (typeof getQueriesFn !== 'function') {
        throw new Error("".concat(this.constructor.name, ": \"getQueriesFn\" must be a function."));
      }
      if (typeof readyCheckFn !== 'function') {
        throw new Error("".concat(this.constructor.name, ": \"readyCheckFn\" must be a function."));
      }
      if (this._querySources.has(getQueriesFn)) {
        throw new Error("".concat(this.constructor.name, ": this getQueryFn has already been added."));
      }
      this._querySources.set(getQueriesFn, readyCheckFn);
    }
  }, {
    key: "triggerMatch",
    value: function () {
      var _triggerMatch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _ref5,
          _ref5$ignoreCache,
          ignoreCache,
          _ref5$ignoreQueue,
          ignoreQueue,
          _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref5 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref5$ignoreCache = _ref5.ignoreCache, ignoreCache = _ref5$ignoreCache === void 0 ? false : _ref5$ignoreCache, _ref5$ignoreQueue = _ref5.ignoreQueue, ignoreQueue = _ref5$ignoreQueue === void 0 ? false : _ref5$ignoreQueue;
                if (!this.ready) {
                  _context.next = 5;
                  break;
                }
                this._cleanUp();
                _context.next = 5;
                return this.match({
                  queries: this._getQueries(),
                  ignoreCache: ignoreCache,
                  ignoreQueue: ignoreQueue
                });
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function triggerMatch() {
        return _triggerMatch.apply(this, arguments);
      }
      return triggerMatch;
    }()
  }, {
    key: "match",
    value: function () {
      var _match = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref6) {
        var _this4 = this;
        var queries, _ref6$ignoreCache, ignoreCache, _ref6$ignoreQueue, ignoreQueue;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queries = _ref6.queries, _ref6$ignoreCache = _ref6.ignoreCache, ignoreCache = _ref6$ignoreCache === void 0 ? false : _ref6$ignoreCache, _ref6$ignoreQueue = _ref6.ignoreQueue, ignoreQueue = _ref6$ignoreQueue === void 0 ? false : _ref6$ignoreQueue;
                _context2.next = 3;
                return Promise.all(_toConsumableArray(this._searchProviders.keys()).map(function (name) {
                  return _this4._matchSource({
                    name: name,
                    queries: queries,
                    ignoreCache: ignoreCache,
                    ignoreQueue: ignoreQueue
                  });
                }));
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function match(_x) {
        return _match.apply(this, arguments);
      }
      return match;
    }()
  }, {
    key: "_fetchMatchResult",
    value: function () {
      var _fetchMatchResult2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref7) {
        var name, queries, provider, promise, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                name = _ref7.name, queries = _ref7.queries;
                _context3.prev = 1;
                provider = this._searchProviders.get(name);
                if (provider) {
                  _context3.next = 5;
                  break;
                }
                throw new Error("".concat(this.constructor.name, ": provider named \"").concat(name, " does not exist"));
              case 5:
                promise = Promise.resolve(provider.searchFn({
                  queries: queries
                }));
                this._matchPromises.set(name, {
                  promise: promise,
                  queries: queries
                });
                _context3.next = 9;
                return promise;
              case 9:
                data = _context3.sent;
                this._matchPromises["delete"](name);
                this.insertMatchEntries({
                  name: name,
                  queries: queries,
                  data: data
                });
                _context3.next = 18;
                break;
              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](1);
                this._matchPromises["delete"](name);
                throw _context3.t0;
              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 14]]);
      }));
      function _fetchMatchResult(_x2) {
        return _fetchMatchResult2.apply(this, arguments);
      }
      return _fetchMatchResult;
    }()
  }, {
    key: "_matchSource",
    value: function () {
      var _matchSource2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref8) {
        var _this5 = this;
        var name, queries, ignoreCache, ignoreQueue, now, data, queuedItems, promises, matching, queue, newQueries, promise;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                name = _ref8.name, queries = _ref8.queries, ignoreCache = _ref8.ignoreCache, ignoreQueue = _ref8.ignoreQueue;
                now = Date.now();
                data = this.data;
                queuedItems = {};
                promises = [];
                if (!ignoreQueue && this._matchPromises.has(name)) {
                  // @ts-expect-error TS(2322): Type 'MatchPromises<T> | undefined' is not assigna... Remove this comment to see the full error message
                  matching = this._matchPromises.get(name);
                  promises.push(matching.promise);
                  matching.queries.forEach(function (item) {
                    queuedItems[item] = true;
                  });
                }
                if (!ignoreQueue && this._matchQueues.has(name)) {
                  // @ts-expect-error TS(2322): Type 'MatchQueue | undefined' is not assignable to... Remove this comment to see the full error message
                  queue = this._matchQueues.get(name);
                  promises.push(queue.promise);
                  queue.queries.forEach(function (item) {
                    queuedItems[item] = true;
                  });
                }
                newQueries = ignoreCache ? queries : (0, _ramda.filter)(function (query) {
                  return !queuedItems[query] && (!data[query] || !data[query][name] || now - data[query][name]._t > _this5._noMatchTtl);
                }, queries);
                if (newQueries.length) {
                  if (ignoreQueue) {
                    promises.push(this._fetchMatchResult({
                      name: name,
                      queries: newQueries
                    }));
                    // @ts-expect-error TS(2454): Variable 'matching' is used before being assigned.
                  } else if (!matching) {
                    matching = {
                      promise: this._fetchMatchResult({
                        name: name,
                        queries: newQueries
                      }),
                      queries: newQueries
                    };
                    promises.push(matching.promise);
                    // @ts-expect-error TS(2454): Variable 'queue' is used before being assigned.
                  } else if (!queue) {
                    promise = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                      var promise;
                      return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              _context4.next = 2;
                              return matching.promise;
                            case 2:
                              promise = _this5._fetchMatchResult({
                                name: name,
                                // @ts-expect-error TS(2454): Variable 'queue' is used before being assigned.
                                queries: queue.queries
                              });
                              _this5._matchQueues["delete"](name);
                              _context4.next = 6;
                              return promise;
                            case 6:
                            case "end":
                              return _context4.stop();
                          }
                        }
                      }, _callee4);
                    }))();
                    queue = {
                      queries: newQueries,
                      promise: promise
                    };
                    this._matchQueues.set(name, queue);
                    promises.push(queue.promise);
                  } else {
                    queue.queries = queue.queries.concat(newQueries);
                  }
                }
                _context5.next = 11;
                return Promise.all(promises);
              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function _matchSource(_x3) {
        return _matchSource2.apply(this, arguments);
      }
      return _matchSource;
    }()
    /**
     * insert matching result directly
     */
  }, {
    key: "insertMatching",
    value: function () {
      var _insertMatching = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref10) {
        var name, data, queries;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                name = _ref10.name, data = _ref10.data, queries = _ref10.queries;
                this.insertMatchEntries({
                  data: data,
                  queries: queries,
                  name: name
                });
              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function insertMatching(_x4) {
        return _insertMatching.apply(this, arguments);
      }
      return insertMatching;
    }()
  }, {
    key: "_ttl",
    get: function get() {
      var _this$dataMatcherOpti, _this$dataMatcherOpti2;
      return (_this$dataMatcherOpti = (_this$dataMatcherOpti2 = this.dataMatcherOptions) === null || _this$dataMatcherOpti2 === void 0 ? void 0 : _this$dataMatcherOpti2.ttl) !== null && _this$dataMatcherOpti !== void 0 ? _this$dataMatcherOpti : DEFAULT_TTL;
    }
  }, {
    key: "_noMatchTtl",
    get: function get() {
      var _this$dataMatcherOpti3, _this$dataMatcherOpti4;
      return (_this$dataMatcherOpti3 = (_this$dataMatcherOpti4 = this.dataMatcherOptions) === null || _this$dataMatcherOpti4 === void 0 ? void 0 : _this$dataMatcherOpti4.noMatchTtl) !== null && _this$dataMatcherOpti3 !== void 0 ? _this$dataMatcherOpti3 : DEFAULT_NO_MATCH_TTL;
    }
  }, {
    key: "searchProvidersReady",
    get: function get() {
      return (0, _ramda.all)(function (_ref11) {
        var readyCheckFn = _ref11.readyCheckFn;
        return readyCheckFn();
      }, _toConsumableArray(this._searchProviders.values()));
    }
  }, {
    key: "dataMapping",
    get: function get() {
      var _this6 = this;
      if (!this.ready || !this._searchProviders.size) return {};
      var dataMap = {};
      (0, _ramda.forEach)(function (query) {
        var queryResult = _this6.data[query];
        if (!queryResult) {
          return;
        }
        var matchesList = [];
        var _iterator = _createForOfIteratorHelper(_this6._searchProviders),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 1),
              providerName = _step$value[0];
            if (queryResult[providerName] && queryResult[providerName].data.length > 0) {
              matchesList = matchesList.concat(queryResult[providerName].data);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (matchesList.length > 0) {
          dataMap[query] = matchesList;
        }
      }, Object.keys(this.data));
      return dataMap;
    }
  }]);
  return DataMatcher;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "insertMatchEntries", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "insertMatchEntries"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_cleanUp", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_cleanUp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "triggerMatch", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "triggerMatch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "match", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "match"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_matchSource", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_matchSource"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "insertMatching", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "insertMatching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dataMapping", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "dataMapping"), _class2.prototype)), _class2)) || _class);
exports.DataMatcher = DataMatcher;
//# sourceMappingURL=DataMatcher.js.map
