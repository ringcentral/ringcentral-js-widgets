"use strict";

require("core-js/modules/es6.array.filter");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataMatcher = void 0;

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.regexp.match");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.set");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _ramda = require("ramda");

var _core = require("@ringcentral-integration/core");

var _di = require("../di");

var _proxify = _interopRequireDefault(require("../proxy/proxify"));

var _dec, _dec2, _class, _class2, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_NO_MATCH_TTL = 30 * 1000;
var DataMatcher = (_dec = (0, _di.Library)({
  name: 'DataMatcher',
  deps: [{
    dep: 'Storage',
    optional: true
  }, {
    dep: 'DataMatcherOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var data = _ref.data,
      ready = _ref.ready,
      _searchProviders = _ref._searchProviders;
  return [data, ready, _searchProviders.size];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(DataMatcher, _RcModuleV);

  var _super = _createSuper(DataMatcher);

  function DataMatcher(deps, storageKey) {
    var _deps$dataMatcherOpti, _deps$dataMatcherOpti2, _this$_deps$dataMatch, _this$_deps$dataMatch2, _this$_deps$dataMatch3, _this$_deps$dataMatch4;

    var _this;

    _classCallCheck(this, DataMatcher);

    _this = _super.call(this, {
      deps: deps,
      enableCache: !((_deps$dataMatcherOpti = (_deps$dataMatcherOpti2 = deps.dataMatcherOptions) === null || _deps$dataMatcherOpti2 === void 0 ? void 0 : _deps$dataMatcherOpti2.disableCache) !== null && _deps$dataMatcherOpti !== void 0 ? _deps$dataMatcherOpti : false),
      storageKey: storageKey
    });
    _this._ttl = (_this$_deps$dataMatch = (_this$_deps$dataMatch2 = _this._deps.dataMatcherOptions) === null || _this$_deps$dataMatch2 === void 0 ? void 0 : _this$_deps$dataMatch2.ttl) !== null && _this$_deps$dataMatch !== void 0 ? _this$_deps$dataMatch : DEFAULT_TTL;
    _this._noMatchTtl = (_this$_deps$dataMatch3 = (_this$_deps$dataMatch4 = _this._deps.dataMatcherOptions) === null || _this$_deps$dataMatch4 === void 0 ? void 0 : _this$_deps$dataMatch4.noMatchTtl) !== null && _this$_deps$dataMatch3 !== void 0 ? _this$_deps$dataMatch3 : DEFAULT_NO_MATCH_TTL;
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
      this.data = {};
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
                  matching = this._matchPromises.get(name);
                  promises.push(matching.promise);
                  matching.queries.forEach(function (item) {
                    queuedItems[item] = true;
                  });
                }

                if (!ignoreQueue && this._matchQueues.has(name)) {
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
                  } else if (!matching) {
                    matching = {
                      promise: this._fetchMatchResult({
                        name: name,
                        queries: newQueries
                      }),
                      queries: newQueries
                    };
                    promises.push(matching.promise);
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
                    queue;

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
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "insertMatchEntries", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "insertMatchEntries"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_cleanUp", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_cleanUp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "triggerMatch", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "triggerMatch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "match", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "match"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_matchSource", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_matchSource"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "insertMatching", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "insertMatching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dataMapping", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "dataMapping"), _class2.prototype)), _class2)) || _class);
exports.DataMatcher = DataMatcher;
//# sourceMappingURL=DataMatcher.js.map
