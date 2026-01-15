"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
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
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _utils = require("@ringcentral-integration/utils");
var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));
var _subscriptionFilters = require("../../enums/subscriptionFilters");
var _Pollable2 = _interopRequireDefault(require("../../lib/Pollable"));
var _di = require("../../lib/di");
var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));
var _isBlank = require("../../lib/isBlank");
var _proxify = require("../../lib/proxy/proxify");
var _selector = require("../../lib/selector");
var _actionTypes = require("./actionTypes");
var _getReducer = _interopRequireWildcard(require("./getReducer"));
var _excluded = ["auth", "subscription", "client", "tabManager", "glipPersons", "glipPosts", "storage", "appFeatures", "connectivityMonitor", "timeToRetry", "ttl", "polling", "disableCache", "perPage", "recordCountPerReq", "preloadPosts", "preloadPostsDelayTtl"],
  _excluded2 = ["eventType"];
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t5 in e) "default" !== _t5 && {}.hasOwnProperty.call(e, _t5) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t5)) && (i.get || i.set) ? o(f, _t5, i) : f[_t5] = e[_t5]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var glipGroupRegExp = /glip\/groups$/;
var DEFAULT_PER_PAGE = 20;
var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_RETRY = 62 * 1000;
var DEFAULT_RECORD_COUNT_PER_REQ = 250;
var DEFAULT_PRELOAD_POSTS_DELAY_TTL = 800;
function formatGroup(group, personsMap) {
  var postsMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var ownerId = arguments.length > 3 ? arguments[3] : undefined;
  if (!group || !group.id) {
    return {};
  }
  var detailMembers = [];
  if (group.members) {
    group.members.forEach(function (memberId) {
      if (personsMap[memberId]) {
        detailMembers.push(_objectSpread(_objectSpread({}, personsMap[memberId]), {}, {
          isMe: ownerId === memberId
        }));
      }
    });
  }
  var newGroup = _objectSpread(_objectSpread({}, group), {}, {
    detailMembers: detailMembers,
    updatedTime: new Date(group.lastModifiedTime).getTime()
  });
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  var latestPost = postsMap[group.id] && postsMap[group.id][0];
  if (latestPost) {
    newGroup.latestPost = _objectSpread(_objectSpread({}, latestPost), {}, {
      creator: personsMap[latestPost.creatorId]
    });
    var postCreationTime = new Date(latestPost.creationTime).getTime();
    if (postCreationTime > newGroup.updatedTime) {
      newGroup.updatedTime = postCreationTime;
    }
  }
  return newGroup;
}
function getUniqueMemberIds(groups) {
  var memberIds = [];
  var memberIdsMap = {};
  groups.forEach(function (group) {
    group.members.forEach(function (memberId) {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (memberIdsMap[memberId]) {
        return;
      }
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      memberIdsMap[memberId] = true;
      memberIds.push(memberId);
    });
  });
  return memberIds;
}
function searchPosts(searchFilter, posts) {
  var result = false;
  var _iterator = _createForOfIteratorHelper(posts),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var post = _step.value;
      if (post.text && post.text.toLowerCase().indexOf(searchFilter) > -1) {
        result = true;
        break;
      }
      if (post.mentions && post.mentions.length > 0) {
        var mentionNames = post.mentions.map(function (m) {
          return m.name;
        }).join(' ').toLowerCase();
        if (mentionNames.indexOf(searchFilter) > -1) {
          result = true;
          break;
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return result;
}

/**
 * @class
 * @description Accound info managing module.
 */
var GlipGroups = exports["default"] = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Client', 'Subscription', 'AppFeatures', {
    dep: 'ConnectivityMonitor',
    optional: true
  }, {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'GlipPersons',
    optional: true
  }, {
    dep: 'GlipPosts',
    optional: true
  }, {
    dep: 'GLipGroupsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_Pollable) {
  function GlipGroups(_ref) {
    var _this;
    var auth = _ref.auth,
      subscription = _ref.subscription,
      client = _ref.client,
      tabManager = _ref.tabManager,
      glipPersons = _ref.glipPersons,
      glipPosts = _ref.glipPosts,
      storage = _ref.storage,
      appFeatures = _ref.appFeatures,
      connectivityMonitor = _ref.connectivityMonitor,
      _ref$timeToRetry = _ref.timeToRetry,
      timeToRetry = _ref$timeToRetry === void 0 ? DEFAULT_RETRY : _ref$timeToRetry,
      _ref$ttl = _ref.ttl,
      ttl = _ref$ttl === void 0 ? DEFAULT_TTL : _ref$ttl,
      _ref$polling = _ref.polling,
      polling = _ref$polling === void 0 ? false : _ref$polling,
      _ref$disableCache = _ref.disableCache,
      disableCache = _ref$disableCache === void 0 ? false : _ref$disableCache,
      _ref$perPage = _ref.perPage,
      perPage = _ref$perPage === void 0 ? DEFAULT_PER_PAGE : _ref$perPage,
      _ref$recordCountPerRe = _ref.recordCountPerReq,
      recordCountPerReq = _ref$recordCountPerRe === void 0 ? DEFAULT_RECORD_COUNT_PER_REQ : _ref$recordCountPerRe,
      _ref$preloadPosts = _ref.preloadPosts,
      preloadPosts = _ref$preloadPosts === void 0 ? true : _ref$preloadPosts,
      _ref$preloadPostsDela = _ref.preloadPostsDelayTtl,
      preloadPostsDelayTtl = _ref$preloadPostsDela === void 0 ? DEFAULT_PRELOAD_POSTS_DELAY_TTL : _ref$preloadPostsDela,
      options = _objectWithoutProperties(_ref, _excluded);
    _classCallCheck(this, GlipGroups);
    _this = _callSuper(this, GlipGroups, [_objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes.actionTypes
    })]);
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._appFeatures = void 0;
    _this._auth = void 0;
    _this._client = void 0;
    _this._connectivity = void 0;
    _this._connectivityMonitor = void 0;
    _this._dataStorageKey = void 0;
    _this._glipPersons = void 0;
    _this._glipPosts = void 0;
    _this._perPage = void 0;
    _this._polling = void 0;
    _this._preloadPosts = void 0;
    _this._preloadPostsDelayTtl = void 0;
    _this._preloadedPosts = void 0;
    _this._promise = void 0;
    _this._readyCheckFn = void 0;
    _this._recordCountPerReq = void 0;
    _this._storage = void 0;
    _this._subscription = void 0;
    _this._timeToRetry = void 0;
    _this._timestampStorageKey = void 0;
    _this._ttl = void 0;
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "allGroups", _descriptor, _this);
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "filteredGroups", _descriptor2, _this);
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "groups", _descriptor3, _this);
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "uniqueMemberIds", _descriptor4, _this);
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "groupMemberIds", _descriptor5, _this);
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "currentGroup", _descriptor6, _this);
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "currentGroupPosts", _descriptor7, _this);
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "groupsWithUnread", _descriptor8, _this);
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "unreadCounts", _descriptor9, _this);
    _this._auth = _ensureExist["default"].call(_this, auth, 'auth');
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._client = _ensureExist["default"].call(_this, client, 'client');
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._subscription = _ensureExist["default"].call(_this, subscription, 'subscription');
    _this._appFeatures = appFeatures;
    _this._connectivityMonitor = connectivityMonitor;
    _this._glipPersons = glipPersons;
    _this._glipPosts = glipPosts;
    _this._tabManager = tabManager;
    _this._ttl = ttl;
    _this._timeToRetry = timeToRetry;
    _this._polling = polling;
    _this._perPage = perPage;
    _this._recordCountPerReq = recordCountPerReq;
    _this._preloadPosts = preloadPosts;
    _this._preloadedPosts = {};
    _this._preloadPostsDelayTtl = preloadPostsDelayTtl;
    _this._promise = null;
    if (!disableCache) {
      _this._storage = storage;
    }
    _this._dataStorageKey = 'glipGroupsData';
    _this._timestampStorageKey = 'glipGroupsTimestamp';
    if (_this._storage) {
      _this._reducer = (0, _getReducer["default"])(_this.actionTypes);
      _this._storage.registerReducer({
        key: _this._dataStorageKey,
        reducer: (0, _getReducer.getDataReducer)(_this.actionTypes)
      });
      _this._storage.registerReducer({
        key: _this._timestampStorageKey,
        reducer: (0, _getReducer.getTimestampReducer)(_this.actionTypes)
      });
    } else {
      _this._reducer = (0, _getReducer["default"])(_this.actionTypes, {
        timestamp: (0, _getReducer.getTimestampReducer)(_this.actionTypes),
        data: (0, _getReducer.getDataReducer)(_this.actionTypes)
      });
    }
    if (_this._glipPosts) {
      _this._glipPosts.addNewPostListener(function (post) {
        return _this.onNewPost(post);
      });
    }
    return _this;
  }
  _inherits(GlipGroups, _Pollable);
  return _createClass(GlipGroups, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;
      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
      this._subscription.register(this, {
        filters: [_subscriptionFilters.subscriptionFilters.glipGroups],
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
              _context.n = 1;
              return this._init();
            case 1:
              _context.n = 7;
              break;
            case 2:
              if (!this._isDataReady()) {
                _context.n = 3;
                break;
              }
              this.store.dispatch({
                type: this.actionTypes.initSuccess
              });
              this._onDataReady();
              _context.n = 7;
              break;
            case 3:
              if (!this._shouldReset()) {
                _context.n = 4;
                break;
              }
              this._clearTimeout();
              this._promise = null;
              this.store.dispatch({
                type: this.actionTypes.resetSuccess
              });
              _context.n = 7;
              break;
            case 4:
              if (!(this.ready && this._connectivityMonitor && this._connectivityMonitor.ready && this._connectivity !== this._connectivityMonitor.connectivity)) {
                _context.n = 7;
                break;
              }
              this._connectivity = this._connectivityMonitor.connectivity;
              if (this._connectivity) {
                _context.n = 5;
                break;
              }
              return _context.a(2);
            case 5:
              _context.n = 6;
              return this.fetchData();
            case 6:
              if (this._preloadPosts) {
                this._preloadedPosts = {};
                this._preloadGroupPosts(true);
              }
            case 7:
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
      return !!(this._auth.loggedIn && this._appFeatures.ready && (!this._connectivityMonitor || this._connectivityMonitor.ready) && (!this._storage || this._storage.ready) && (!this._readyCheckFn || this._readyCheckFn()) && (!this._subscription || this._subscription.ready) && (!this._glipPosts || this._glipPosts.ready) && (!this._glipPersons || this._glipPersons.ready) && (!this._tabManager || this._tabManager.ready) && this.pending);
    }

    // @ts-expect-error TS(4113): This member cannot have an 'override' modifier bec... Remove this comment to see the full error message
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!((!this._auth.loggedIn || !this._appFeatures.ready || this._storage && !this._storage.ready || this._readyCheckFn && !this._readyCheckFn() || this._subscription && !this._subscription.ready || this._glipPosts && !this._glipPosts.ready || this._glipPersons && !this._glipPersons.ready || this._connectivityMonitor && !this._connectivityMonitor.ready || this._tabManager && !this._tabManager.ready) && this.ready);
    }
  }, {
    key: "_onDataReady",
    value: function _onDataReady() {
      if (this._glipPersons) {
        this._glipPersons.loadPersons(this.groupMemberIds);
      }
      if (this._preloadPosts) {
        this._preloadedPosts = {};
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
        this._preloadGroupPosts();
      }
    }
  }, {
    key: "_handleSubscription",
    value: function () {
      var _handleSubscription2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(message) {
        var _message$body, eventType, group;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!(message && glipGroupRegExp.test(message.event) && message.body && message.body.eventType)) {
                _context2.n = 3;
                break;
              }
              _message$body = message.body, eventType = _message$body.eventType, group = _objectWithoutProperties(_message$body, _excluded2);
              if (!(eventType.indexOf('Group') !== 0)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              if (!(eventType === 'GroupLeft')) {
                _context2.n = 2;
                break;
              }
              this.store.dispatch({
                type: this.actionTypes.removeGroup,
                group: group
              });
              return _context2.a(2);
            case 2:
              this.store.dispatch({
                type: this.actionTypes.updateGroup,
                group: group
              });
              if (this._glipPersons) {
                this._glipPersons.loadPersons(group.members);
              }
              this._glipPosts.loadPosts(group.id);
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function _handleSubscription(_x) {
        return _handleSubscription2.apply(this, arguments);
      }
      return _handleSubscription;
    }()
  }, {
    key: "_shouldFetch",
    value: function _shouldFetch() {
      return !this._tabManager || this._tabManager.active;
    }
  }, {
    key: "_isDataReady",
    value: function _isDataReady() {
      return this.status === _moduleStatuses["default"].initializing && this.timestamp !== null;
    }
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (this._hasPermission) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              if (!this._shouldFetch()) {
                _context3.n = 6;
                break;
              }
              _context3.p = 2;
              _context3.n = 3;
              return this.fetchData();
            case 3:
              _context3.n = 5;
              break;
            case 4:
              _context3.p = 4;
              _t = _context3.v;
              console.error('fetchData error:', _t);
              this._retry();
            case 5:
              _context3.n = 7;
              break;
            case 6:
              if (this._polling) {
                this._startPolling();
              } else {
                this._retry();
              }
            case 7:
              if (this._connectivityMonitor) {
                this._connectivity = this._connectivityMonitor.connectivity;
              }
            case 8:
              return _context3.a(2);
          }
        }, _callee3, this, [[2, 4]]);
      }));
      function _init() {
        return _init2.apply(this, arguments);
      }
      return _init;
    }()
  }, {
    key: "_preloadGroupPosts",
    value: function () {
      var _preloadGroupPosts2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(force) {
        var groups, _iterator2, _step2, group, _t2;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              groups = this.groups.slice(0, 20);
              _iterator2 = _createForOfIteratorHelper(groups);
              _context4.p = 1;
              _iterator2.s();
            case 2:
              if ((_step2 = _iterator2.n()).done) {
                _context4.n = 7;
                break;
              }
              group = _step2.value;
              if (this._glipPosts) {
                _context4.n = 3;
                break;
              }
              return _context4.a(2);
            case 3:
              if (this._preloadedPosts[group.id]) {
                _context4.n = 6;
                break;
              }
              // @ts-expect-error TS(2339): Property 'id' does not exist on type '(filteredGro... Remove this comment to see the full error message
              this._preloadedPosts[group.id] = true;
              // @ts-expect-error TS(2339): Property 'id' does not exist on type '(filteredGro... Remove this comment to see the full error message
              if (!(!this._glipPosts.postsMap[group.id] || force)) {
                _context4.n = 5;
                break;
              }
              _context4.n = 4;
              return (0, _utils.sleep)(this._preloadPostsDelayTtl);
            case 4:
              if (!(!this._glipPosts.postsMap[group.id] || force)) {
                _context4.n = 5;
                break;
              }
              _context4.n = 5;
              return this._glipPosts.fetchPosts(group.id);
            case 5:
              // @ts-expect-error TS(2339): Property 'id' does not exist on type '(filteredGro... Remove this comment to see the full error message
              if (!this._glipPosts.readTimeMap[group.id]) {
                this._glipPosts.updateReadTime(
                // @ts-expect-error TS(2339): Property 'id' does not exist on type '(filteredGro... Remove this comment to see the full error message
                group.id, Date.now() - 1000 * 3600 * 2);
              }
            case 6:
              _context4.n = 2;
              break;
            case 7:
              _context4.n = 9;
              break;
            case 8:
              _context4.p = 8;
              _t2 = _context4.v;
              _iterator2.e(_t2);
            case 9:
              _context4.p = 9;
              _iterator2.f();
              return _context4.f(9);
            case 10:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 8, 9, 10]]);
      }));
      function _preloadGroupPosts(_x2) {
        return _preloadGroupPosts2.apply(this, arguments);
      }
      return _preloadGroupPosts;
    }() // @ts-expect-error TS(2345): Argument of type 'TypedPropertyDescriptor<({ searc... Remove this comment to see the full error message
  }, {
    key: "updateFilter",
    value: function updateFilter(_ref2) {
      var searchFilter = _ref2.searchFilter,
        pageNumber = _ref2.pageNumber;
      this.store.dispatch({
        type: this.actionTypes.updateFilter,
        searchFilter: searchFilter,
        pageNumber: pageNumber
      });
      if (this._preloadPosts && this.groups.length <= this._perPage * 2) {
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
        this._preloadGroupPosts();
      }
    }

    // @ts-expect-error TS(2345): Argument of type 'TypedPropertyDescriptor<(groupId... Remove this comment to see the full error message
  }, {
    key: "updateCurrentGroupId",
    value: function updateCurrentGroupId(groupId) {
      if (!groupId) {
        return;
      }
      var lastGroupId = this.currentGroupId;
      var lastGroupPosts = this.currentGroupPosts;
      this.store.dispatch({
        type: this.actionTypes.updateCurrentGroupId,
        groupId: groupId
      });
      if (this._glipPersons) {
        this._glipPersons.loadPersons(
        // @ts-expect-error TS(2339): Property 'members' does not exist on type '((allGr... Remove this comment to see the full error message
        this.currentGroup && this.currentGroup.members);
      }
      if (!this._glipPosts) {
        return;
      }
      if (lastGroupPosts.length > 20) {
        this._glipPosts.fetchPosts(lastGroupId);
      }
      this._glipPosts.loadPosts(groupId);
      this._glipPosts.updateReadTime(groupId);
    }
  }, {
    key: "_fetchFunction",
    value: function () {
      var _fetchFunction2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var result;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this._client.glip().groups().list({
                recordCount: this._recordCountPerReq
              });
            case 1:
              result = _context5.v;
              return _context5.a(2, result);
          }
        }, _callee5, this);
      }));
      function _fetchFunction() {
        return _fetchFunction2.apply(this, arguments);
      }
      return _fetchFunction;
    }()
  }, {
    key: "_fetchData",
    value: function () {
      var _fetchData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var ownerId, data, _t3;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              this.store.dispatch({
                type: this.actionTypes.fetch
              });
              ownerId = this._auth.ownerId;
              _context6.p = 1;
              _context6.n = 2;
              return this._fetchFunction();
            case 2:
              data = _context6.v;
              if (this._auth.ownerId === ownerId) {
                this.store.dispatch({
                  type: this.actionTypes.fetchSuccess,
                  data: data,
                  timestamp: Date.now()
                });
                if (this._polling) {
                  this._startPolling();
                }
                this._promise = null;
              }
              _context6.n = 4;
              break;
            case 3:
              _context6.p = 3;
              _t3 = _context6.v;
              if (!(this._auth.ownerId === ownerId)) {
                _context6.n = 4;
                break;
              }
              this._promise = null;
              this.store.dispatch({
                type: this.actionTypes.fetchError,
                error: _t3
              });
              if (this._polling) {
                this._startPolling(this.timeToRetry);
              } else {
                this._retry();
              }
              throw _t3;
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function _fetchData() {
        return _fetchData2.apply(this, arguments);
      }
      return _fetchData;
    }()
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (!this._promise) {
                this._promise = this._fetchData();
              }
              return _context7.a(2, this._promise);
          }
        }, _callee7, this);
      }));
      function fetchData() {
        return _fetchData3.apply(this, arguments);
      }
      return fetchData;
    }()
  }, {
    key: "startChat",
    value: function () {
      var _startChat = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(personId) {
        var group, _t4;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              _context8.n = 1;
              return this._client.glip().groups().post({
                type: 'PrivateChat',
                members: [this._auth.ownerId, personId]
              });
            case 1:
              group = _context8.v;
              group.lastModifiedTime = Date.now();
              this.store.dispatch({
                type: this.actionTypes.updateGroup,
                group: group
              });
              this.store.dispatch({
                type: this.actionTypes.updateCurrentGroupId,
                groupId: group.id
              });
              return _context8.a(2, group);
            case 2:
              _context8.p = 2;
              _t4 = _context8.v;
              console.error(_t4);
              return _context8.a(2, null);
          }
        }, _callee8, this, [[0, 2]]);
      }));
      function startChat(_x3) {
        return _startChat.apply(this, arguments);
      }
      return startChat;
    }()
  }, {
    key: "onNewPost",
    value: function onNewPost(post) {
      if (post.groupId === this.currentGroupId && this._glipPosts) {
        this._glipPosts.updateReadTime(post.groupId);
      }
    }
  }, {
    key: "createTeam",
    value: function () {
      var _createTeam = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(name, members) {
        var type,
          group,
          _args9 = arguments;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              type = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : 'Team';
              _context9.n = 1;
              return this._client.glip().groups().post({
                type: type,
                name: name,
                members: members,
                isPublic: true,
                description: ''
              });
            case 1:
              group = _context9.v;
              return _context9.a(2, group.id);
          }
        }, _callee9, this);
      }));
      function createTeam(_x4, _x5) {
        return _createTeam.apply(this, arguments);
      }
      return createTeam;
    }()
  }, {
    key: "searchFilter",
    get: function get() {
      return this.state.searchFilter;
    }
  }, {
    key: "data",
    get: function get() {
      return this._storage ? this._storage.getItem(this._dataStorageKey) : this.state.data;
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "timestamp",
    get: function get() {
      return this._storage ? this._storage.getItem(this._timestampStorageKey) : this.state.timestamp;
    }
  }, {
    key: "currentGroupId",
    get: function get() {
      return this.state.currentGroupId;
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

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "pending",
    get: function get() {
      return this.status === _moduleStatuses["default"].pending;
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "ttl",
    get: function get() {
      return this._ttl;
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "timeToRetry",
    get: function get() {
      return this._timeToRetry;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return !!this._appFeatures.hasGlipPermission;
    }
  }]);
}(_Pollable2["default"]), _applyDecoratedDescriptor(_class2.prototype, "updateFilter", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateFilter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCurrentGroupId", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCurrentGroupId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startChat", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "startChat"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "allGroups", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;
    return [function () {
      return _this3.data;
    }, function () {
      return _this3._glipPersons && _this3._glipPersons.personsMap;
    }, function () {
      return _this3._glipPosts && _this3._glipPosts.postsMap;
    }, function () {
      return _this3._auth.ownerId;
    }, function (data) {
      var personsMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var postsMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var ownerId = arguments.length > 3 ? arguments[3] : undefined;
      return (data || []).map(function (group) {
        return formatGroup(group, personsMap, postsMap, ownerId);
      });
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "filteredGroups", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;
    return [function () {
      return _this4.allGroups;
    }, function () {
      return _this4.searchFilter;
    }, function () {
      return _this4._glipPosts && _this4._glipPosts.postsMap;
    }, function (allGroups, searchFilter) {
      var postsMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if ((0, _isBlank.isBlank)(searchFilter)) {
        return allGroups;
      }
      var filterString = searchFilter.toLowerCase();
      return allGroups.filter(function (group) {
        var name = group.name && group.name.toLowerCase();
        if (name && name.indexOf(filterString) > -1) {
          return true;
        }
        if (!name) {
          var groupUsernames = group.detailMembers.map(function (m) {
            return "".concat(m.firstName, " ").concat(m.lastName);
          }).join(' ').toLowerCase();
          if (groupUsernames && groupUsernames.indexOf(filterString) > -1) {
            return true;
          }
        }
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        var result = searchPosts(filterString, postsMap[group.id] || []);
        return result;
      });
    }];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "groups", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;
    return [function () {
      return _this5.filteredGroups;
    }, function (filteredGroups) {
      var sortedGroups = filteredGroups.sort(function (a, b) {
        if (a.updatedTime === b.updatedTime) return 0;
        return a.updatedTime > b.updatedTime ? -1 : 1;
      });
      return sortedGroups;
    }];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "uniqueMemberIds", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;
    return [function () {
      return _this6.allGroups;
    }, getUniqueMemberIds];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "groupMemberIds", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;
    return [function () {
      return _this7.allGroups;
    }, function (groups) {
      var noTeamGroups = groups.filter(function (g) {
        return g.type !== 'Team';
      });
      return getUniqueMemberIds(noTeamGroups);
    }];
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "currentGroup", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;
    return [function () {
      return _this8.allGroups;
    }, function () {
      return _this8.currentGroupId;
    }, function () {
      return _this8._glipPersons && _this8._glipPersons.personsMap || {};
    }, function (allGroups, currentGroupId, personsMap) {
      var group = allGroups.find(function (g) {
        return g.id === currentGroupId;
      }) || {};
      return formatGroup(group, personsMap, undefined, _this8._auth.ownerId);
    }];
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "currentGroupPosts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this9 = this;
    return [function () {
      var postsMap = _this9._glipPosts && _this9._glipPosts.postsMap || {};
      return postsMap[_this9.currentGroupId];
    }, function () {
      return _this9._glipPersons && _this9._glipPersons.personsMap || {};
    }, function (posts, personsMap) {
      // const posts = postsMap[currentGroupId] || [];
      var reversePosts = (posts || []).slice(0).reverse();
      return reversePosts.map(function (post) {
        var creator = personsMap[post.creatorId];
        return _objectSpread(_objectSpread({}, post), {}, {
          sentByMe: post.creatorId === _this9._auth.ownerId,
          creator: creator
        });
      });
    }];
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "groupsWithUnread", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this0 = this;
    return [function () {
      return _this0.groups;
    }, function () {
      return _this0._glipPosts && _this0._glipPosts.postsMap || {};
    }, function () {
      return _this0._glipPosts && _this0._glipPosts.readTimeMap || {};
    }, function (groups, postsMap, readTimeMap) {
      return groups.map(function (group) {
        var posts = postsMap[group.id] || [];
        var readTime = readTimeMap[group.id] || Date.now();
        return _objectSpread(_objectSpread({}, group), {}, {
          unread: posts.filter(function (post) {
            return new Date(post.creationTime).getTime() > readTime && post.creatorId !== _this0._auth.ownerId;
          }).length
        });
      });
    }];
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "unreadCounts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this1 = this;
    return [function () {
      return _this1.groupsWithUnread;
    }, function (groups) {
      return groups.reduce(function (a, b) {
        return a + b.unread;
      }, 0);
    }];
  }
}), _class2)) || _class);
//# sourceMappingURL=index.js.map
