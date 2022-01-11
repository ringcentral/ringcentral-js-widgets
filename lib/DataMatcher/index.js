"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.filter");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkName = checkName;
exports["default"] = void 0;

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.regexp.match");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.set");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.function.name");

var _ramda = require("ramda");

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _di = require("../di");

var _proxify = _interopRequireDefault(require("../proxy/proxify"));

var _RcModule2 = _interopRequireDefault(require("../RcModule"));

var _selector = require("../selector");

var _baseActionTypes = require("./baseActionTypes");

var _getDefaultDataReducer = _interopRequireDefault(require("./getDefaultDataReducer"));

var _getDefaultReducer = _interopRequireDefault(require("./getDefaultReducer"));

var _dec, _class, _class2, _descriptor, _descriptor2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

function checkName(name) {
  if (!name) {
    throw new Error('DataMatcher: "name" is required.');
  }

  if (typeof name !== 'string') {
    throw new Error('DataMatcher: "name" must be a string.');
  }
}

var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_NO_MATCH_TTL = 30 * 1000;
var DataMatcher = (_dec = (0, _di.Library)({
  deps: [{
    dep: 'Storage',
    optional: true
  }, {
    dep: 'DataMatcherOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(DataMatcher, _RcModule);

  var _super = _createSuper(DataMatcher);

  function DataMatcher() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var name = _ref.name,
        storage = _ref.storage,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? DEFAULT_TTL : _ref$ttl,
        _ref$noMatchTtl = _ref.noMatchTtl,
        noMatchTtl = _ref$noMatchTtl === void 0 ? DEFAULT_NO_MATCH_TTL : _ref$noMatchTtl,
        _ref$disableCache = _ref.disableCache,
        disableCache = _ref$disableCache === void 0 ? false : _ref$disableCache,
        _ref$actionTypes = _ref.actionTypes,
        actionTypes = _ref$actionTypes === void 0 ? _ObjectMap.ObjectMap.prefixKeys(_toConsumableArray(_ObjectMap.ObjectMap.keys(_baseActionTypes.baseActionTypes)), name) : _ref$actionTypes,
        _ref$storageKey = _ref.storageKey,
        storageKey = _ref$storageKey === void 0 ? "".concat(name, "Data") : _ref$storageKey,
        _ref$getReducer = _ref.getReducer,
        getReducer = _ref$getReducer === void 0 ? _getDefaultReducer["default"] : _ref$getReducer,
        _ref$getDataReducer = _ref.getDataReducer,
        getDataReducer = _ref$getDataReducer === void 0 ? _getDefaultDataReducer["default"] : _ref$getDataReducer,
        options = _objectWithoutProperties(_ref, ["name", "storage", "ttl", "noMatchTtl", "disableCache", "actionTypes", "storageKey", "getReducer", "getDataReducer"]);

    _classCallCheck(this, DataMatcher);

    checkName(name);
    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: actionTypes
    }));

    _initializerDefineProperty(_this, "_data", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_dataMapping", _descriptor2, _assertThisInitialized(_this));

    _this._querySources = new Map();
    _this._searchProviders = new Map();
    _this._matchPromises = new Map();
    _this._matchQueues = new Map();

    if (!disableCache) {
      _this._storage = storage;
    }

    _this._ttl = ttl;
    _this._noMatchTtl = noMatchTtl;
    _this._storageKey = storageKey;

    if (_this._storage) {
      _this._reducer = getReducer(_this.actionTypes);

      _this._storage.registerReducer({
        key: _this._storageKey,
        reducer: getDataReducer(_this.actionTypes)
      });
    } else {
      _this._reducer = getReducer(_this.actionTypes, {
        data: getDataReducer(_this.actionTypes)
      });
    }

    _this._lastCleanUp = 0;
    return _this;
  }

  _createClass(DataMatcher, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
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
    key: "_cleanUp",
    value: function _cleanUp() {
      // throttle clean up to only run once every 100ms
      var now = Date.now();

      if (now - this._lastCleanUp > 100) {
        this._lastCleanUp = now;
        this.store.dispatch({
          type: this.actionTypes.cleanUp,
          queries: this._getQueries(),
          timestamp: Date.now(),
          ttl: this._ttl
        });
      }
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this.store.dispatch({
          type: this.actionTypes.init
        }); // this._cleanUp();

        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if (this._shouldReset()) {
        this.store.dispatch({
          type: this.actionTypes.reset
        });
        this._lastCleanUp = 0;
        this.store.dispatch({
          type: this.actionTypes.resetSuccess
        });
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(this.pending && (!this._storage || this._storage.ready) && this.searchProvidersReady);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(this.ready && (!!this._storage && !this._storage.ready || !this.searchProvidersReady));
    }
  }, {
    key: "addSearchProvider",
    value: function addSearchProvider(_ref2) {
      var name = _ref2.name,
          searchFn = _ref2.searchFn,
          readyCheckFn = _ref2.readyCheckFn;

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
    value: function addQuerySource(_ref3) {
      var getQueriesFn = _ref3.getQueriesFn,
          readyCheckFn = _ref3.readyCheckFn;

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
        var _ref4,
            _ref4$ignoreCache,
            ignoreCache,
            _ref4$ignoreQueue,
            ignoreQueue,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref4 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref4$ignoreCache = _ref4.ignoreCache, ignoreCache = _ref4$ignoreCache === void 0 ? false : _ref4$ignoreCache, _ref4$ignoreQueue = _ref4.ignoreQueue, ignoreQueue = _ref4$ignoreQueue === void 0 ? false : _ref4$ignoreQueue;

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
      var _match = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref5) {
        var _this3 = this;

        var queries, _ref5$ignoreCache, ignoreCache, _ref5$ignoreQueue, ignoreQueue;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queries = _ref5.queries, _ref5$ignoreCache = _ref5.ignoreCache, ignoreCache = _ref5$ignoreCache === void 0 ? false : _ref5$ignoreCache, _ref5$ignoreQueue = _ref5.ignoreQueue, ignoreQueue = _ref5$ignoreQueue === void 0 ? false : _ref5$ignoreQueue;
                _context2.next = 3;
                return Promise.all(_toConsumableArray(this._searchProviders.keys()).map(function (name) {
                  return _this3._matchSource({
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
      var _fetchMatchResult2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref6) {
        var name, queries, provider, promise, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                name = _ref6.name, queries = _ref6.queries;
                _context3.prev = 1;
                this.store.dispatch({
                  type: this.actionTypes.match,
                  queries: queries,
                  name: name
                });
                provider = this._searchProviders.get(name);

                if (provider) {
                  _context3.next = 6;
                  break;
                }

                throw new Error("".concat(this.constructor.name, ": provider named \"").concat(name, " does not exist"));

              case 6:
                promise = Promise.resolve(provider.searchFn({
                  queries: queries
                }));

                this._matchPromises.set(name, {
                  promise: promise,
                  queries: queries
                });

                _context3.next = 10;
                return promise;

              case 10:
                data = _context3.sent;

                this._matchPromises["delete"](name);

                this.store.dispatch({
                  type: this.actionTypes.matchSuccess,
                  name: name,
                  queries: queries,
                  data: data,
                  timestamp: Date.now()
                });
                _context3.next = 20;
                break;

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3["catch"](1);

                this._matchPromises["delete"](name);

                this.store.dispatch({
                  type: this.actionTypes.matchError,
                  name: name,
                  queries: queries,
                  error: _context3.t0,
                  timestamp: Date.now()
                });
                throw _context3.t0;

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 15]]);
      }));

      function _fetchMatchResult(_x2) {
        return _fetchMatchResult2.apply(this, arguments);
      }

      return _fetchMatchResult;
    }()
  }, {
    key: "_matchSource",
    value: function () {
      var _matchSource2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref7) {
        var _this4 = this;

        var name, queries, ignoreCache, ignoreQueue, now, data, queuedItems, promises, matching, queue, newQueries;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                name = _ref7.name, queries = _ref7.queries, ignoreCache = _ref7.ignoreCache, ignoreQueue = _ref7.ignoreQueue;
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
                  return !queuedItems[query] && (!data[query] || !data[query][name] || now - data[query][name]._t > _this4._noMatchTtl);
                }, queries);

                if (newQueries.length) {
                  if (ignoreQueue) {
                    promises.push(this._fetchMatchResult({
                      name: name,
                      queries: newQueries
                    }));
                  } else if (!matching) {
                    matching = this._fetchMatchResult({
                      name: name,
                      queries: newQueries
                    });
                    promises.push(matching);
                  } else if (!queue) {
                    queue = {
                      queries: newQueries
                    };
                    queue.promise = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                      var promise;
                      return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              _context4.next = 2;
                              return matching.promise;

                            case 2:
                              promise = _this4._fetchMatchResult({
                                name: name,
                                queries: queue.queries
                              });

                              _this4._matchQueues["delete"](name);

                              _context4.next = 6;
                              return promise;

                            case 6:
                            case "end":
                              return _context4.stop();
                          }
                        }
                      }, _callee4);
                    }))();

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
    value: function insertMatching(_ref9) {
      var name = _ref9.name,
          data = _ref9.data,
          queries = _ref9.queries;
      this.store.dispatch({
        type: this.actionTypes.insertMatchEntries,
        data: data,
        queries: queries,
        name: name,
        timestamp: Date.now()
      });
    }
  }, {
    key: "searchProvidersReady",
    get: function get() {
      return (0, _ramda.all)(function (_ref10) {
        var readyCheckFn = _ref10.readyCheckFn;
        return readyCheckFn();
      }, _toConsumableArray(this._searchProviders.values()));
    }
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
    key: "pending",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].pending;
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    }
  }, {
    key: "dataMapping",
    get: function get() {
      return this._dataMapping;
    }
  }]);

  return DataMatcher;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "triggerMatch", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "triggerMatch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "match", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "match"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_matchSource", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_matchSource"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "insertMatching", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "insertMatching"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_data", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return [function () {
      return _this5._storage ? _this5._storage.getItem(_this5._storageKey) : _this5.state.data;
    }, function (data) {
      return data || {};
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_dataMapping", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return [function () {
      return _this6.data;
    }, function () {
      return _this6.ready;
    }, function () {
      return Array.from(_this6._searchProviders.keys()).length;
    }, function (data, ready, prividers) {
      if (!ready || !prividers) return {};
      var dataMap = {};
      (0, _ramda.forEach)(function (query) {
        var queryResult = data[query];

        if (!queryResult) {
          return;
        }

        var matchesList = [];
        (0, _ramda.forEach)(function (_providerValue, providerName) {
          if (queryResult[providerName] && queryResult[providerName].data.length > 0) {
            matchesList = matchesList.concat(queryResult[providerName].data);
          }
        }, _this6._searchProviders);

        if (matchesList.length > 0) {
          dataMap[query] = matchesList;
        }
      }, Object.keys(data));
      return dataMap;
    }];
  }
})), _class2)) || _class);
exports["default"] = DataMatcher;
//# sourceMappingURL=index.js.map
