"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
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
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));
var _subscriptionFilters = require("../../enums/subscriptionFilters");
var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));
var _di = require("../../lib/di");
var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));
var _isBlank = require("../../lib/isBlank");
var _proxify = require("../../lib/proxy/proxify");
var _actionTypes = require("./actionTypes");
var _getReducer = _interopRequireWildcard(require("./getReducer"));
var _status = require("./status");
var _excluded = ["client", "auth", "subscription", "storage", "extensionFeatures", "loadTtl"],
  _excluded2 = ["eventType"];
var _dec, _class, _class2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t4 in e) "default" !== _t4 && {}.hasOwnProperty.call(e, _t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t4)) && (i.get || i.set) ? o(f, _t4, i) : f[_t4] = e[_t4]); return f; })(e, t); }
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
var glipPostsRegExp = /glip\/posts$/;
var glipGroupRegExp = /glip\/groups$/;
var DEFAULT_LOAD_TTL = 30 * 60 * 1000;
var GlipPosts = exports["default"] = (_dec = (0, _di.Module)({
  deps: ['Client', 'Auth', 'Subscription', 'Storage', 'ExtensionFeatures', {
    dep: 'GlipPostsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function GlipPosts(_ref) {
    var _this;
    var client = _ref.client,
      auth = _ref.auth,
      subscription = _ref.subscription,
      storage = _ref.storage,
      extensionFeatures = _ref.extensionFeatures,
      _ref$loadTtl = _ref.loadTtl,
      loadTtl = _ref$loadTtl === void 0 ? DEFAULT_LOAD_TTL : _ref$loadTtl,
      options = _objectWithoutProperties(_ref, _excluded);
    _classCallCheck(this, GlipPosts);
    _this = _callSuper(this, GlipPosts, [_objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes.actionTypes
    })]);
    _this._auth = void 0;
    _this._client = void 0;
    _this._extensionFeatures = void 0;
    _this._fetchPromises = void 0;
    _this._loadTtl = void 0;
    _this._newPostListeners = void 0;
    _this._readTimeStorageKey = void 0;
    _this._storage = void 0;
    _this._subscription = void 0;
    _this._reducer = (0, _getReducer["default"])(_this.actionTypes);

    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._client = _ensureExist["default"].call(_this, client, 'client');
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._auth = _ensureExist["default"].call(_this, auth, 'auth');
    _this._extensionFeatures = extensionFeatures;
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._subscription = _ensureExist["default"].call(_this, subscription, 'subscription');
    _this._fetchPromises = {};
    _this._loadTtl = loadTtl;
    _this._storage = storage;
    _this._readTimeStorageKey = 'glipPostReadTime';
    _this._storage.registerReducer({
      key: _this._readTimeStorageKey,
      reducer: (0, _getReducer.getGlipPostsReadTimeReducer)(_this.actionTypes)
    });
    _this._newPostListeners = [];
    return _this;
  }
  _inherits(GlipPosts, _RcModule);
  return _createClass(GlipPosts, [{
    key: "addNewPostListener",
    value: function addNewPostListener(listen) {
      if (typeof listen === 'function') {
        this._newPostListeners.push(listen);
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this2 = this;
      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
      this._subscription.register(this, {
        filters: [_subscriptionFilters.subscriptionFilters.glipPosts],
        handler: function handler(message) {
          return _this2._handleSubscription(message);
        }
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
                _context.n = 2;
                break;
              }
              this.store.dispatch({
                type: this.actionTypes.init
              });
              if (this._hasPermission) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              this.store.dispatch({
                type: this.actionTypes.initSuccess
              });
              _context.n = 3;
              break;
            case 2:
              if (this._shouldReset()) {
                this.store.dispatch({
                  type: this.actionTypes.resetSuccess
                });
                this._fetchPromises = {};
              }
            case 3:
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
      return this._auth.loggedIn && this._subscription.ready && this._extensionFeatures.ready && this.pending;
    }

    // @ts-expect-error TS(4113): This member cannot have an 'override' modifier bec... Remove this comment to see the full error message
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !this._extensionFeatures.ready || !this._subscription.ready) && this.ready;
    }
  }, {
    key: "_handleSubscription",
    value: function _handleSubscription(message) {
      if (message && (glipPostsRegExp.test(message.event) || glipGroupRegExp.test(message.event)) && message.body) {
        var _message$body = message.body,
          eventType = _message$body.eventType,
          post = _objectWithoutProperties(_message$body, _excluded2);
        if (eventType.indexOf('Post') !== 0) {
          return;
        }
        if (eventType === 'PostRemoved') {
          return;
        }
        this.store.dispatch({
          type: this.actionTypes.createSuccess,
          groupId: post.groupId,
          record: post,
          oldRecordId: post.id,
          isSendByMe: post.creatorId === this._auth.ownerId && eventType === 'PostAdded'
        });
        if (eventType === 'PostAdded' && post.creatorId !== this._auth.ownerId) {
          this._newPostListeners.forEach(function (listen) {
            listen(post);
          });
        }
      }
    }
  }, {
    key: "loadPosts",
    value: function () {
      var _loadPosts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(groupId) {
        var recordCount,
          lastPosts,
          fetchTime,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              recordCount = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 20;
              lastPosts = this.postsMap[groupId];
              fetchTime = this.fetchTimeMap[groupId];
              if (!(lastPosts && fetchTime && Date.now() - fetchTime < this._loadTtl)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              _context2.n = 2;
              return this.fetchPosts(groupId, recordCount);
            case 2:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function loadPosts(_x) {
        return _loadPosts.apply(this, arguments);
      }
      return loadPosts;
    }()
  }, {
    key: "fetchPosts",
    value: function () {
      var _fetchPosts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(groupId) {
        var _this3 = this;
        var recordCount,
          pageToken,
          promise,
          _args4 = arguments;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              recordCount = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 20;
              pageToken = _args4.length > 2 ? _args4[2] : undefined;
              if (groupId) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              if (!this._fetchPromises[groupId]) {
                this._fetchPromises[groupId] = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
                  var params, response, _t;
                  return _regenerator().w(function (_context3) {
                    while (1) switch (_context3.p = _context3.n) {
                      case 0:
                        _context3.p = 0;
                        _this3.store.dispatch({
                          type: _this3.actionTypes.fetch
                        });
                        params = {
                          recordCount: recordCount
                        };
                        if (pageToken) {
                          // @ts-expect-error TS(2339): Property 'pageToken' does not exist on type '{ rec... Remove this comment to see the full error message
                          params.pageToken = pageToken;
                        }
                        _context3.n = 1;
                        return _this3._client.glip().groups(groupId).posts().list(params);
                      case 1:
                        response = _context3.v;
                        _this3.store.dispatch({
                          type: _this3.actionTypes.fetchSuccess,
                          groupId: groupId,
                          records: response.records,
                          lastPageToken: pageToken,
                          navigation: response.navigation
                        });
                        _context3.n = 3;
                        break;
                      case 2:
                        _context3.p = 2;
                        _t = _context3.v;
                        _this3.store.dispatch({
                          type: _this3.actionTypes.fetchError
                        });
                      case 3:
                        _this3._fetchPromises[groupId] = null;
                      case 4:
                        return _context3.a(2);
                    }
                  }, _callee3, null, [[0, 2]]);
                }))();
              }
              promise = this._fetchPromises[groupId];
              _context4.n = 2;
              return promise;
            case 2:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function fetchPosts(_x2) {
        return _fetchPosts.apply(this, arguments);
      }
      return fetchPosts;
    }()
  }, {
    key: "loadNextPage",
    value: function () {
      var _loadNextPage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(groupId, recordCount) {
        var pageInfo, pageToken;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              pageInfo = this.pageInfos[groupId];
              pageToken = pageInfo && pageInfo.prevPageToken;
              if (pageToken) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              _context5.n = 2;
              return this.fetchPosts(groupId, recordCount, pageToken);
            case 2:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function loadNextPage(_x3, _x4) {
        return _loadNextPage.apply(this, arguments);
      }
      return loadNextPage;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(_ref3) {
        var groupId, text, mentions, fakeId, fakeRecord, record, _t2;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              groupId = _ref3.groupId;
              text = this.postInputs[groupId] && this.postInputs[groupId].text;
              mentions = this.postInputs[groupId] && this.postInputs[groupId].mentions;
              if (!((0, _isBlank.isBlank)(text) || !groupId)) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2);
            case 1:
              if (mentions && mentions.length > 0) {
                mentions.forEach(function (mention) {
                  if (!mention.matcherId) {
                    return;
                  }
                  text = text.replace(mention.mention, "![:Person](".concat(mention.matcherId, ")"));
                });
              }
              fakeId = "".concat(Date.now());
              fakeRecord = {
                id: fakeId,
                groupId: groupId,
                creatorId: this._auth.ownerId,
                sendStatus: _status.status.creating,
                creationTime: "".concat(new Date(Date.now())),
                text: text,
                type: 'TextMessage'
              };
              _context6.p = 2;
              this.store.dispatch({
                type: this.actionTypes.create,
                groupId: groupId,
                record: fakeRecord
              });
              this.updatePostInput({
                text: '',
                groupId: groupId,
                mentions: []
              });
              _context6.n = 3;
              return this._client.glip().groups(groupId).posts().post({
                text: text
              });
            case 3:
              record = _context6.v;
              this.store.dispatch({
                type: this.actionTypes.createSuccess,
                groupId: groupId,
                record: record,
                oldRecordId: fakeId
              });
              _context6.n = 5;
              break;
            case 4:
              _context6.p = 4;
              _t2 = _context6.v;
              // @ts-expect-error TS(2339): Property 'createError' does not exist on type 'Obj... Remove this comment to see the full error message
              fakeRecord.sendStatus = _status.status.createError;
              this.store.dispatch({
                type: this.actionTypes.createError,
                record: fakeRecord,
                groupId: groupId,
                oldRecordId: fakeId
              });
              this.updatePostInput({
                text: text,
                groupId: groupId,
                mentions: mentions
              });
            case 5:
              return _context6.a(2);
          }
        }, _callee6, this, [[2, 4]]);
      }));
      function create(_x5) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "sendFile",
    value: function () {
      var _sendFile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(_ref4) {
        var fileName, groupId, rawFile, platform, body, response, _t3;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              fileName = _ref4.fileName, groupId = _ref4.groupId, rawFile = _ref4.rawFile;
              _context7.p = 1;
              platform = this._client.service.platform();
              body = rawFile;
              _context7.n = 2;
              return platform.post('/restapi/v1.0/glip/files', body, {
                groupId: groupId,
                name: fileName
              }, {
                headers: {
                  'Content-Type': 'application/octet-stream'
                }
              });
            case 2:
              response = _context7.v;
              return _context7.a(2, response.json());
            case 3:
              _context7.p = 3;
              _t3 = _context7.v;
              console.error(_t3);
              return _context7.a(2, null);
          }
        }, _callee7, this, [[1, 3]]);
      }));
      function sendFile(_x6) {
        return _sendFile.apply(this, arguments);
      }
      return sendFile;
    }() // @ts-expect-error TS(2345): Argument of type 'TypedPropertyDescriptor<(groupId... Remove this comment to see the full error message
  }, {
    key: "updateReadTime",
    value: function updateReadTime(groupId, time) {
      this.store.dispatch({
        type: this.actionTypes.updateReadTime,
        groupId: groupId,
        time: time
      });
    }

    // @ts-expect-error TS(2345): Argument of type 'TypedPropertyDescriptor<({ text,... Remove this comment to see the full error message
  }, {
    key: "updatePostInput",
    value: function updatePostInput(_ref5) {
      var text = _ref5.text,
        groupId = _ref5.groupId,
        mentions = _ref5.mentions;
      this.store.dispatch({
        type: this.actionTypes.updatePostInput,
        groupId: groupId,
        mentions: mentions,
        textValue: text
      });
    }
  }, {
    key: "postsMap",
    get: function get() {
      return this.state.glipPostsStore;
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
    key: "postInputs",
    get: function get() {
      return this.state.postInputs;
    }
  }, {
    key: "readTimeMap",
    get: function get() {
      return this._storage.getItem(this._readTimeStorageKey);
    }
  }, {
    key: "pageInfos",
    get: function get() {
      return this.state.pageInfos;
    }
  }, {
    key: "fetchTimeMap",
    get: function get() {
      return this.state.fetchTimes;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      var _this$_extensionFeatu, _this$_extensionFeatu2;
      return !!((_this$_extensionFeatu = this._extensionFeatures.features) === null || _this$_extensionFeatu === void 0 ? void 0 : (_this$_extensionFeatu2 = _this$_extensionFeatu.Glip) === null || _this$_extensionFeatu2 === void 0 ? void 0 : _this$_extensionFeatu2.available);
    }
  }]);
}(_RcModule2["default"]), _applyDecoratedDescriptor(_class2.prototype, "loadPosts", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "loadPosts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchPosts", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchPosts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadNextPage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "loadNextPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "create", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "create"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sendFile", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "sendFile"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateReadTime", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateReadTime"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updatePostInput", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updatePostInput"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=index.js.map
