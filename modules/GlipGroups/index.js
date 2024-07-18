"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.array.reverse");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.name");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _utils = require("@ringcentral-integration/utils");
var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));
var _Pollable2 = _interopRequireDefault(require("../../lib/Pollable"));
var _di = require("../../lib/di");
var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));
var _isBlank = require("../../lib/isBlank");
var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));
var _selector = require("../../lib/selector");
var _actionTypes = require("./actionTypes");
var _getReducer = _interopRequireWildcard(require("./getReducer"));
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var glipGroupRegExp = /glip\/groups$/;
var subscriptionFilter = '/restapi/v1.0/glip/groups';
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
var GlipGroups = (_dec = (0, _di.Module)({
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
  _inherits(GlipGroups, _Pollable);
  var _super = _createSuper(GlipGroups);
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
      options = _objectWithoutProperties(_ref, ["auth", "subscription", "client", "tabManager", "glipPersons", "glipPosts", "storage", "appFeatures", "connectivityMonitor", "timeToRetry", "ttl", "polling", "disableCache", "perPage", "recordCountPerReq", "preloadPosts", "preloadPostsDelayTtl"]);
    _classCallCheck(this, GlipGroups);
    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes.actionTypes
    }));
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._appFeatures = void 0;
    _this._auth = void 0;
    _this._client = void 0;
    _this._connectivity = void 0;
    _this._connectivityMonitor = void 0;
    _this._dataStorageKey = void 0;
    _this._glipPersons = void 0;
    _this._glipPosts = void 0;
    _this._lastMessage = void 0;
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
    _this._subscriptionFilters = void 0;
    _this._timeToRetry = void 0;
    _this._timestampStorageKey = void 0;
    _this._ttl = void 0;
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "allGroups", _descriptor, _assertThisInitialized(_this));
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "filteredGroups", _descriptor2, _assertThisInitialized(_this));
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "groups", _descriptor3, _assertThisInitialized(_this));
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "uniqueMemberIds", _descriptor4, _assertThisInitialized(_this));
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "groupMemberIds", _descriptor5, _assertThisInitialized(_this));
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "currentGroup", _descriptor6, _assertThisInitialized(_this));
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "currentGroupPosts", _descriptor7, _assertThisInitialized(_this));
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "groupsWithUnread", _descriptor8, _assertThisInitialized(_this));
    // @ts-expect-error TS(1240): Unable to resolve signature of property decorator ... Remove this comment to see the full error message
    _initializerDefineProperty(_this, "unreadCounts", _descriptor9, _assertThisInitialized(_this));
    _this._auth = _ensureExist["default"].call(_assertThisInitialized(_this), auth, 'auth');
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._client = _ensureExist["default"].call(_assertThisInitialized(_this), client, 'client');
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._subscription = _ensureExist["default"].call(_assertThisInitialized(_this), subscription, 'subscription');
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
    _this._lastMessage = null;
    _this._subscriptionFilters = [subscriptionFilter];
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

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(GlipGroups, [{
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
                  _context.next = 6;
                  break;
                }
                this.store.dispatch({
                  type: this.actionTypes.init
                });
                _context.next = 4;
                return this._init();
              case 4:
                _context.next = 28;
                break;
              case 6:
                if (!this._isDataReady()) {
                  _context.next = 11;
                  break;
                }
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                this._onDataReady();
                _context.next = 28;
                break;
              case 11:
                if (!this._shouldReset()) {
                  _context.next = 17;
                  break;
                }
                this._clearTimeout();
                this._promise = null;
                this.store.dispatch({
                  type: this.actionTypes.resetSuccess
                });
                _context.next = 28;
                break;
              case 17:
                if (!this._shouldHandleSubscriptionMessage()) {
                  _context.next = 21;
                  break;
                }
                this._processSubscription();
                _context.next = 28;
                break;
              case 21:
                if (!(this.ready && this._connectivityMonitor && this._connectivityMonitor.ready && this._connectivity !== this._connectivityMonitor.connectivity)) {
                  _context.next = 28;
                  break;
                }
                this._connectivity = this._connectivityMonitor.connectivity;
                if (this._connectivity) {
                  _context.next = 25;
                  break;
                }
                return _context.abrupt("return");
              case 25:
                _context.next = 27;
                return this.fetchData();
              case 27:
                if (this._preloadPosts) {
                  this._preloadedPosts = {};
                  this._preloadGroupPosts(true);
                }
              case 28:
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
      return !!(this._auth.loggedIn && this._appFeatures.ready && (!this._connectivityMonitor || this._connectivityMonitor.ready) && (!this._storage || this._storage.ready) && (!this._readyCheckFn || this._readyCheckFn()) && (!this._subscription || this._subscription.ready) && (!this._glipPosts || this._glipPosts.ready) && (!this._glipPersons || this._glipPersons.ready) && (!this._tabManager || this._tabManager.ready) && this.pending);
    } // @ts-expect-error TS(4113): This member cannot have an 'override' modifier bec... Remove this comment to see the full error message
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!((!this._auth.loggedIn || !this._appFeatures.ready || this._storage && !this._storage.ready || this._readyCheckFn && !this._readyCheckFn() || this._subscription && !this._subscription.ready || this._glipPosts && !this._glipPosts.ready || this._glipPersons && !this._glipPersons.ready || this._connectivityMonitor && !this._connectivityMonitor.ready || this._tabManager && !this._tabManager.ready) && this.ready);
    }
  }, {
    key: "_shouldHandleSubscriptionMessage",
    value: function _shouldHandleSubscriptionMessage() {
      return !!(this.ready && this._subscription && this._subscription.ready && this._subscription.message && this._subscription.message !== this._lastMessage);
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
    key: "_subscriptionHandleFn",
    value: function () {
      var _subscriptionHandleFn2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(message) {
        var _message$body, eventType, group;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(message && glipGroupRegExp.test(message.event) && message.body && message.body.eventType)) {
                  _context2.next = 10;
                  break;
                }
                _message$body = message.body, eventType = _message$body.eventType, group = _objectWithoutProperties(_message$body, ["eventType"]);
                if (!(eventType.indexOf('Group') !== 0)) {
                  _context2.next = 4;
                  break;
                }
                return _context2.abrupt("return");
              case 4:
                if (!(eventType === 'GroupLeft')) {
                  _context2.next = 7;
                  break;
                }
                this.store.dispatch({
                  type: this.actionTypes.removeGroup,
                  group: group
                });
                return _context2.abrupt("return");
              case 7:
                this.store.dispatch({
                  type: this.actionTypes.updateGroup,
                  group: group
                });
                if (this._glipPersons) {
                  this._glipPersons.loadPersons(group.members);
                }
                this._glipPosts.loadPosts(group.id);
              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _subscriptionHandleFn(_x) {
        return _subscriptionHandleFn2.apply(this, arguments);
      }
      return _subscriptionHandleFn;
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
      var _init2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this._hasPermission) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                if (!this._shouldFetch()) {
                  _context3.next = 14;
                  break;
                }
                _context3.prev = 3;
                _context3.next = 6;
                return this.fetchData();
              case 6:
                _context3.next = 12;
                break;
              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](3);
                console.error('fetchData error:', _context3.t0);
                this._retry();
              case 12:
                _context3.next = 15;
                break;
              case 14:
                if (this._polling) {
                  this._startPolling();
                } else {
                  this._retry();
                }
              case 15:
                if (this._subscription && this._subscriptionFilters) {
                  this._subscription.subscribe(this._subscriptionFilters);
                }
                if (this._connectivityMonitor) {
                  this._connectivity = this._connectivityMonitor.connectivity;
                }
              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 8]]);
      }));
      function _init() {
        return _init2.apply(this, arguments);
      }
      return _init;
    }()
  }, {
    key: "_processSubscription",
    value: function _processSubscription() {
      this._lastMessage = this._subscription.message;
      this._subscriptionHandleFn(this._lastMessage);
    }
  }, {
    key: "_preloadGroupPosts",
    value: function () {
      var _preloadGroupPosts2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(force) {
        var groups, _iterator2, _step2, group;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                groups = this.groups.slice(0, 20);
                _iterator2 = _createForOfIteratorHelper(groups);
                _context4.prev = 2;
                _iterator2.s();
              case 4:
                if ((_step2 = _iterator2.n()).done) {
                  _context4.next = 19;
                  break;
                }
                group = _step2.value;
                if (this._glipPosts) {
                  _context4.next = 8;
                  break;
                }
                return _context4.abrupt("return");
              case 8:
                if (this._preloadedPosts[group.id]) {
                  _context4.next = 17;
                  break;
                }
                // @ts-expect-error TS(2339): Property 'id' does not exist on type '(filteredGro... Remove this comment to see the full error message
                this._preloadedPosts[group.id] = true;
                // @ts-expect-error TS(2339): Property 'id' does not exist on type '(filteredGro... Remove this comment to see the full error message
                if (!(!this._glipPosts.postsMap[group.id] || force)) {
                  _context4.next = 16;
                  break;
                }
                _context4.next = 13;
                return (0, _utils.sleep)(this._preloadPostsDelayTtl);
              case 13:
                if (!(!this._glipPosts.postsMap[group.id] || force)) {
                  _context4.next = 16;
                  break;
                }
                _context4.next = 16;
                return this._glipPosts.fetchPosts(group.id);
              case 16:
                // @ts-expect-error TS(2339): Property 'id' does not exist on type '(filteredGro... Remove this comment to see the full error message
                if (!this._glipPosts.readTimeMap[group.id]) {
                  this._glipPosts.updateReadTime(
                  // @ts-expect-error TS(2339): Property 'id' does not exist on type '(filteredGro... Remove this comment to see the full error message
                  group.id, Date.now() - 1000 * 3600 * 2);
                }
              case 17:
                _context4.next = 4;
                break;
              case 19:
                _context4.next = 24;
                break;
              case 21:
                _context4.prev = 21;
                _context4.t0 = _context4["catch"](2);
                _iterator2.e(_context4.t0);
              case 24:
                _context4.prev = 24;
                _iterator2.f();
                return _context4.finish(24);
              case 27:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 21, 24, 27]]);
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
    } // @ts-expect-error TS(2345): Argument of type 'TypedPropertyDescriptor<(groupId... Remove this comment to see the full error message
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
      var _fetchFunction2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._client.glip().groups().list({
                  recordCount: this._recordCountPerReq
                });
              case 2:
                result = _context5.sent;
                return _context5.abrupt("return", result);
              case 4:
              case "end":
                return _context5.stop();
            }
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
      var _fetchData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var ownerId, data;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.fetch
                });
                ownerId = this._auth.ownerId;
                _context6.prev = 2;
                _context6.next = 5;
                return this._fetchFunction();
              case 5:
                data = _context6.sent;
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
                _context6.next = 16;
                break;
              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](2);
                if (!(this._auth.ownerId === ownerId)) {
                  _context6.next = 16;
                  break;
                }
                this._promise = null;
                this.store.dispatch({
                  type: this.actionTypes.fetchError,
                  error: _context6.t0
                });
                if (this._polling) {
                  this._startPolling(this.timeToRetry);
                } else {
                  this._retry();
                }
                throw _context6.t0;
              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 9]]);
      }));
      function _fetchData() {
        return _fetchData2.apply(this, arguments);
      }
      return _fetchData;
    }()
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!this._promise) {
                  this._promise = this._fetchData();
                }
                return _context7.abrupt("return", this._promise);
              case 2:
              case "end":
                return _context7.stop();
            }
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
      var _startChat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(personId) {
        var group;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return this._client.glip().groups().post({
                  type: 'PrivateChat',
                  members: [this._auth.ownerId, personId]
                });
              case 3:
                group = _context8.sent;
                group.lastModifiedTime = Date.now();
                this.store.dispatch({
                  type: this.actionTypes.updateGroup,
                  group: group
                });
                this.store.dispatch({
                  type: this.actionTypes.updateCurrentGroupId,
                  groupId: group.id
                });
                return _context8.abrupt("return", group);
              case 10:
                _context8.prev = 10;
                _context8.t0 = _context8["catch"](0);
                console.error(_context8.t0);
              case 13:
                return _context8.abrupt("return", null);
              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 10]]);
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
      var _createTeam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(name, members) {
        var type,
          group,
          _args9 = arguments;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                type = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : 'Team';
                _context9.next = 3;
                return this._client.glip().groups().post({
                  type: type,
                  name: name,
                  members: members,
                  isPublic: true,
                  description: ''
                });
              case 3:
                group = _context9.sent;
                return _context9.abrupt("return", group.id);
              case 5:
              case "end":
                return _context9.stop();
            }
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
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "timestamp",
    get: function get() {
      return this._storage ? this._storage.getItem(this._timestampStorageKey) : this.state.timestamp;
    }
  }, {
    key: "currentGroupId",
    get: function get() {
      return this.state.currentGroupId;
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
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "pending",
    get: function get() {
      return this.status === _moduleStatuses["default"].pending;
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "ttl",
    get: function get() {
      return this._ttl;
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
  return GlipGroups;
}(_Pollable2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "updateFilter", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateFilter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCurrentGroupId", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCurrentGroupId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startChat", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "startChat"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "allGroups", [_selector.selector], {
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
    var _this10 = this;
    return [function () {
      return _this10.groups;
    }, function () {
      return _this10._glipPosts && _this10._glipPosts.postsMap || {};
    }, function () {
      return _this10._glipPosts && _this10._glipPosts.readTimeMap || {};
    }, function (groups, postsMap, readTimeMap) {
      return groups.map(function (group) {
        var posts = postsMap[group.id] || [];
        var readTime = readTimeMap[group.id] || Date.now();
        return _objectSpread(_objectSpread({}, group), {}, {
          unread: posts.filter(function (post) {
            return new Date(post.creationTime).getTime() > readTime && post.creatorId !== _this10._auth.ownerId;
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
    var _this11 = this;
    return [function () {
      return _this11.groupsWithUnread;
    }, function (groups) {
      return groups.reduce(function (a, b) {
        return a + b.unread;
      }, 0);
    }];
  }
})), _class2)) || _class);
exports["default"] = GlipGroups;
//# sourceMappingURL=index.js.map
