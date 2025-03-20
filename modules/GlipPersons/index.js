"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _utils = require("@ringcentral-integration/utils");
var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));
var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));
var _batchApiHelper = require("../../lib/batchApiHelper");
var _di = require("../../lib/di");
var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));
var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));
var _actionTypes = require("./actionTypes");
var _getReducer = _interopRequireWildcard(require("./getReducer"));
var _dec, _class, _class2;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var MaximumBatchGetPersons = 30;
var DEFAULT_BATCH_FETCH_DELAY = 500;
var GlipPersons = (_dec = (0, _di.Module)({
  deps: ['Client', 'Auth', 'AppFeatures', {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'GlipPersonsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(GlipPersons, _RcModule);
  var _super = _createSuper(GlipPersons);
  function GlipPersons(_ref) {
    var _this;
    var client = _ref.client,
      auth = _ref.auth,
      storage = _ref.storage,
      tabManager = _ref.tabManager,
      appFeatures = _ref.appFeatures,
      _ref$batchFetchDelay = _ref.batchFetchDelay,
      batchFetchDelay = _ref$batchFetchDelay === void 0 ? DEFAULT_BATCH_FETCH_DELAY : _ref$batchFetchDelay,
      options = _objectWithoutProperties(_ref, ["client", "auth", "storage", "tabManager", "appFeatures", "batchFetchDelay"]);
    _classCallCheck(this, GlipPersons);
    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes.actionTypes
    }));
    _this._appFeatures = void 0;
    _this._auth = void 0;
    _this._batchFetchDelay = void 0;
    _this._client = void 0;
    _this._dataStorageKey = void 0;
    _this._fetchingIds = void 0;
    _this._storage = void 0;
    _this._tabManager = void 0;
    _this._appFeatures = appFeatures;
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._client = _ensureExist["default"].call(_assertThisInitialized(_this), client, 'client');
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._auth = _ensureExist["default"].call(_assertThisInitialized(_this), auth, 'auth');
    _this._tabManager = tabManager;
    _this._storage = storage;
    _this._fetchingIds = {};
    _this._batchFetchDelay = batchFetchDelay;
    _this._dataStorageKey = 'glipPersonsData';
    if (_this._storage) {
      _this._reducer = (0, _getReducer["default"])(_this.actionTypes);
      _this._storage.registerReducer({
        key: _this._dataStorageKey,
        reducer: (0, _getReducer.getGlipPersonStoreReducer)(_this.actionTypes)
      });
    } else {
      _this._reducer = (0, _getReducer["default"])(_this.actionTypes, {
        glipPersonStore: (0, _getReducer.getGlipPersonStoreReducer)(_this.actionTypes)
      });
    }
    return _this;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(GlipPersons, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;
      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context.next = 10;
                  break;
                }
                this.store.dispatch({
                  type: this.actionTypes.init
                });
                if (this._auth.isFreshLogin) {
                  this.store.dispatch({
                    type: this.actionTypes.cleanUp
                  });
                }
                if (this._hasPermission) {
                  _context.next = 5;
                  break;
                }
                return _context.abrupt("return");
              case 5:
                _context.next = 7;
                return this.loadMe();
              case 7:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                _context.next = 11;
                break;
              case 10:
                if (this._shouldReset()) {
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                }
              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }
      return _onStateChange;
    }() // @ts-expect-error TS(4113): This member cannot have an 'override' modifier bec... Remove this comment to see the full error message
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._auth.loggedIn && this._appFeatures.ready && (!this._storage || this._storage.ready) && (!this._tabManager || this._tabManager.ready) && this.pending;
    } // @ts-expect-error TS(4113): This member cannot have an 'override' modifier bec... Remove this comment to see the full error message
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (this._storage && !this._storage.ready || this._tabManager && !this._tabManager.ready || !this._appFeatures.ready || !this._auth.loggedIn) && this.ready;
    }
  }, {
    key: "loadMe",
    value: function () {
      var _loadMe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.loadPerson(this._auth.ownerId);
              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function loadMe() {
        return _loadMe.apply(this, arguments);
      }
      return loadMe;
    }()
  }, {
    key: "loadPerson",
    value: function () {
      var _loadPerson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var person;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                this.store.dispatch({
                  type: this.actionTypes.fetch
                });
                _context3.next = 4;
                return this._client.glip().persons(id).get();
              case 4:
                person = _context3.sent;
                this.store.dispatch({
                  type: this.actionTypes.fetchSuccess,
                  person: person
                });
                _context3.next = 11;
                break;
              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                this.store.dispatch({
                  type: this.actionTypes.fetchError
                });
              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));
      function loadPerson(_x) {
        return _loadPerson.apply(this, arguments);
      }
      return loadPerson;
    }()
  }, {
    key: "loadPersons",
    value: function () {
      var _loadPersons = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(personIds) {
        var _this3 = this;
        var ownerId, newPersonIds, ids, persons, lastIds;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this._auth.loggedIn) {
                  _context4.next = 2;
                  break;
                }
                return _context4.abrupt("return");
              case 2:
                if (personIds) {
                  _context4.next = 4;
                  break;
                }
                return _context4.abrupt("return");
              case 4:
                ownerId = this._auth.ownerId;
                newPersonIds = [];
                personIds.forEach(function (id) {
                  if (!_this3.personsMap[id] && !_this3._fetchingIds[id]) {
                    newPersonIds.push(id);
                  }
                });
                if (!(newPersonIds.length === 0)) {
                  _context4.next = 9;
                  break;
                }
                return _context4.abrupt("return");
              case 9:
                ids = newPersonIds.slice(0, MaximumBatchGetPersons); // @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
                ids.forEach(function (id) {
                  _this3._fetchingIds[id] = 1;
                });
                _context4.prev = 11;
                this.store.dispatch({
                  type: this.actionTypes.fetch
                });
                _context4.next = 15;
                return this._batchGetPersons(ids);
              case 15:
                persons = _context4.sent;
                this.store.dispatch({
                  type: this.actionTypes.batchFetchSuccess,
                  persons: persons
                });
                // @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
                ids.forEach(function (id) {
                  delete _this3._fetchingIds[id];
                });
                _context4.next = 24;
                break;
              case 20:
                _context4.prev = 20;
                _context4.t0 = _context4["catch"](11);
                this.store.dispatch({
                  type: this.actionTypes.fetchError
                });
                // @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
                ids.forEach(function (id) {
                  delete _this3._fetchingIds[id];
                });
              case 24:
                if (!(ownerId !== this._auth.ownerId)) {
                  _context4.next = 26;
                  break;
                }
                return _context4.abrupt("return");
              case 26:
                lastIds = newPersonIds.slice(MaximumBatchGetPersons);
                if (!(lastIds.length > 0)) {
                  _context4.next = 32;
                  break;
                }
                _context4.next = 30;
                return (0, _utils.sleep)(this._batchFetchDelay);
              case 30:
                _context4.next = 32;
                return this.loadPersons(lastIds);
              case 32:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[11, 20]]);
      }));
      function loadPersons(_x2) {
        return _loadPersons.apply(this, arguments);
      }
      return loadPersons;
    }()
  }, {
    key: "_batchGetPersons",
    value: function () {
      var _batchGetPersons2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(personIds) {
        var response, ids, multipartResponse, responses;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!personIds || personIds.length === 0)) {
                  _context5.next = 2;
                  break;
                }
                return _context5.abrupt("return", []);
              case 2:
                if (!(personIds.length === 1)) {
                  _context5.next = 7;
                  break;
                }
                _context5.next = 5;
                return this._client.glip().persons(personIds[0]).get();
              case 5:
                response = _context5.sent;
                return _context5.abrupt("return", [response]);
              case 7:
                ids = personIds.join(',');
                _context5.next = 10;
                return (0, _batchApiHelper.batchGetApi)({
                  platform: this._client.service.platform(),
                  url: "/restapi/v1.0/glip/persons/".concat(ids)
                });
              case 10:
                multipartResponse = _context5.sent;
                _context5.next = 13;
                return Promise.all(multipartResponse.filter(function (r) {
                  return r.ok;
                }).map(function (x) {
                  return x.json();
                }));
              case 13:
                responses = _context5.sent;
                return _context5.abrupt("return", responses);
              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function _batchGetPersons(_x3) {
        return _batchGetPersons2.apply(this, arguments);
      }
      return _batchGetPersons;
    }() // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "_actionTypes",
    get: function get() {
      return _actionTypes.actionTypes;
    }
  }, {
    key: "personsMap",
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._dataStorageKey) || {};
      }
      return this.state.glipPersonStore;
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "ready",
    get: function get() {
      return this.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "me",
    get: function get() {
      return this.personsMap[this._auth.ownerId];
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return !!this._appFeatures.hasGlipPermission;
    }
  }]);
  return GlipPersons;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "loadMe", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadMe"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadPerson", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadPerson"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadPersons", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadPersons"), _class2.prototype)), _class2)) || _class);
exports["default"] = GlipPersons;
//# sourceMappingURL=index.js.map
