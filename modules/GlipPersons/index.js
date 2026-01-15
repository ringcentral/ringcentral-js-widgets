"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _utils = require("@ringcentral-integration/utils");
var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));
var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));
var _batchApiHelper = require("../../lib/batchApiHelper");
var _di = require("../../lib/di");
var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));
var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));
var _actionTypes = require("./actionTypes");
var _getReducer = _interopRequireWildcard(require("./getReducer"));
var _excluded = ["client", "auth", "storage", "tabManager", "appFeatures", "batchFetchDelay"];
var _dec, _class, _class2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var MaximumBatchGetPersons = 30;
var DEFAULT_BATCH_FETCH_DELAY = 500;
var GlipPersons = exports["default"] = (_dec = (0, _di.Module)({
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
  function GlipPersons(_ref) {
    var _this;
    var client = _ref.client,
      auth = _ref.auth,
      storage = _ref.storage,
      tabManager = _ref.tabManager,
      appFeatures = _ref.appFeatures,
      _ref$batchFetchDelay = _ref.batchFetchDelay,
      batchFetchDelay = _ref$batchFetchDelay === void 0 ? DEFAULT_BATCH_FETCH_DELAY : _ref$batchFetchDelay,
      options = _objectWithoutProperties(_ref, _excluded);
    _classCallCheck(this, GlipPersons);
    _this = _callSuper(this, GlipPersons, [_objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes.actionTypes
    })]);
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
    _this._client = _ensureExist["default"].call(_this, client, 'client');
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._auth = _ensureExist["default"].call(_this, auth, 'auth');
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
  _inherits(GlipPersons, _RcModule);
  return _createClass(GlipPersons, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;
      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!this._shouldInit()) {
                _context.n = 3;
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
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              _context.n = 2;
              return this.loadMe();
            case 2:
              this.store.dispatch({
                type: this.actionTypes.initSuccess
              });
              _context.n = 4;
              break;
            case 3:
              if (this._shouldReset()) {
                this.store.dispatch({
                  type: this.actionTypes.resetSuccess
                });
              }
            case 4:
              return _context.a(2);
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
    }

    // @ts-expect-error TS(4113): This member cannot have an 'override' modifier bec... Remove this comment to see the full error message
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (this._storage && !this._storage.ready || this._tabManager && !this._tabManager.ready || !this._appFeatures.ready || !this._auth.loggedIn) && this.ready;
    }
  }, {
    key: "loadMe",
    value: function () {
      var _loadMe = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this.loadPerson(this._auth.ownerId);
            case 1:
              return _context2.a(2);
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
      var _loadPerson = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(id) {
        var person, _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              this.store.dispatch({
                type: this.actionTypes.fetch
              });
              _context3.n = 1;
              return this._client.glip().persons(id).get();
            case 1:
              person = _context3.v;
              this.store.dispatch({
                type: this.actionTypes.fetchSuccess,
                person: person
              });
              _context3.n = 3;
              break;
            case 2:
              _context3.p = 2;
              _t = _context3.v;
              this.store.dispatch({
                type: this.actionTypes.fetchError
              });
            case 3:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 2]]);
      }));
      function loadPerson(_x) {
        return _loadPerson.apply(this, arguments);
      }
      return loadPerson;
    }()
  }, {
    key: "loadPersons",
    value: function () {
      var _loadPersons = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(personIds) {
        var _this3 = this;
        var ownerId, newPersonIds, ids, persons, lastIds, _t2;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              if (this._auth.loggedIn) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              if (personIds) {
                _context4.n = 2;
                break;
              }
              return _context4.a(2);
            case 2:
              ownerId = this._auth.ownerId;
              newPersonIds = [];
              personIds.forEach(function (id) {
                if (!_this3.personsMap[id] && !_this3._fetchingIds[id]) {
                  newPersonIds.push(id);
                }
              });
              if (!(newPersonIds.length === 0)) {
                _context4.n = 3;
                break;
              }
              return _context4.a(2);
            case 3:
              ids = newPersonIds.slice(0, MaximumBatchGetPersons); // @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
              ids.forEach(function (id) {
                _this3._fetchingIds[id] = 1;
              });
              _context4.p = 4;
              this.store.dispatch({
                type: this.actionTypes.fetch
              });
              _context4.n = 5;
              return this._batchGetPersons(ids);
            case 5:
              persons = _context4.v;
              this.store.dispatch({
                type: this.actionTypes.batchFetchSuccess,
                persons: persons
              });
              // @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
              ids.forEach(function (id) {
                delete _this3._fetchingIds[id];
              });
              _context4.n = 7;
              break;
            case 6:
              _context4.p = 6;
              _t2 = _context4.v;
              this.store.dispatch({
                type: this.actionTypes.fetchError
              });
              // @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
              ids.forEach(function (id) {
                delete _this3._fetchingIds[id];
              });
            case 7:
              if (!(ownerId !== this._auth.ownerId)) {
                _context4.n = 8;
                break;
              }
              return _context4.a(2);
            case 8:
              lastIds = newPersonIds.slice(MaximumBatchGetPersons);
              if (!(lastIds.length > 0)) {
                _context4.n = 10;
                break;
              }
              _context4.n = 9;
              return (0, _utils.sleep)(this._batchFetchDelay);
            case 9:
              _context4.n = 10;
              return this.loadPersons(lastIds);
            case 10:
              return _context4.a(2);
          }
        }, _callee4, this, [[4, 6]]);
      }));
      function loadPersons(_x2) {
        return _loadPersons.apply(this, arguments);
      }
      return loadPersons;
    }()
  }, {
    key: "_batchGetPersons",
    value: function () {
      var _batchGetPersons2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(personIds) {
        var response, ids, multipartResponse, responses;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (!(!personIds || personIds.length === 0)) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2, []);
            case 1:
              if (!(personIds.length === 1)) {
                _context5.n = 3;
                break;
              }
              _context5.n = 2;
              return this._client.glip().persons(personIds[0]).get();
            case 2:
              response = _context5.v;
              return _context5.a(2, [response]);
            case 3:
              ids = personIds.join(',');
              _context5.n = 4;
              return (0, _batchApiHelper.batchGetApi)({
                platform: this._client.service.platform(),
                url: "/restapi/v1.0/glip/persons/".concat(ids)
              });
            case 4:
              multipartResponse = _context5.v;
              _context5.n = 5;
              return Promise.all(multipartResponse.filter(function (r) {
                return r.ok;
              }).map(function (x) {
                return x.json();
              }));
            case 5:
              responses = _context5.v;
              return _context5.a(2, responses);
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
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
}(_RcModule2["default"]), _applyDecoratedDescriptor(_class2.prototype, "loadMe", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadMe"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadPerson", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadPerson"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadPersons", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadPersons"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=index.js.map
