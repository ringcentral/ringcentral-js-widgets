"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
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
var glipPostsRegExp = /glip\/posts$/;
var glipGroupRegExp = /glip\/groups$/;
var DEFAULT_LOAD_TTL = 30 * 60 * 1000;
var GlipPosts = (_dec = (0, _di.Module)({
  deps: ['Client', 'Auth', 'Subscription', 'Storage', 'ExtensionFeatures', {
    dep: 'GlipPostsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(GlipPosts, _RcModule);
  var _super = _createSuper(GlipPosts);
  function GlipPosts(_ref) {
    var _this;
    var client = _ref.client,
      auth = _ref.auth,
      subscription = _ref.subscription,
      storage = _ref.storage,
      extensionFeatures = _ref.extensionFeatures,
      _ref$loadTtl = _ref.loadTtl,
      loadTtl = _ref$loadTtl === void 0 ? DEFAULT_LOAD_TTL : _ref$loadTtl,
      options = _objectWithoutProperties(_ref, ["client", "auth", "subscription", "storage", "extensionFeatures", "loadTtl"]);
    _classCallCheck(this, GlipPosts);
    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes.actionTypes
    }));
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
    _this._client = _ensureExist["default"].call(_assertThisInitialized(_this), client, 'client');
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._auth = _ensureExist["default"].call(_assertThisInitialized(_this), auth, 'auth');
    _this._extensionFeatures = extensionFeatures;
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._subscription = _ensureExist["default"].call(_assertThisInitialized(_this), subscription, 'subscription');
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
  _createClass(GlipPosts, [{
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
                  _context.next = 7;
                  break;
                }
                this.store.dispatch({
                  type: this.actionTypes.init
                });
                if (this._hasPermission) {
                  _context.next = 4;
                  break;
                }
                return _context.abrupt("return");
              case 4:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                _context.next = 8;
                break;
              case 7:
                if (this._shouldReset()) {
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                  this._fetchPromises = {};
                }
              case 8:
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
      return this._auth.loggedIn && this._subscription.ready && this._extensionFeatures.ready && this.pending;
    } // @ts-expect-error TS(4113): This member cannot have an 'override' modifier bec... Remove this comment to see the full error message
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
          post = _objectWithoutProperties(_message$body, ["eventType"]);
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
      var _loadPosts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(groupId) {
        var recordCount,
          lastPosts,
          fetchTime,
          _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                recordCount = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 20;
                lastPosts = this.postsMap[groupId];
                fetchTime = this.fetchTimeMap[groupId];
                if (!(lastPosts && fetchTime && Date.now() - fetchTime < this._loadTtl)) {
                  _context2.next = 5;
                  break;
                }
                return _context2.abrupt("return");
              case 5:
                _context2.next = 7;
                return this.fetchPosts(groupId, recordCount);
              case 7:
              case "end":
                return _context2.stop();
            }
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
      var _fetchPosts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(groupId) {
        var _this3 = this;
        var recordCount,
          pageToken,
          promise,
          _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                recordCount = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 20;
                pageToken = _args4.length > 2 ? _args4[2] : undefined;
                if (groupId) {
                  _context4.next = 4;
                  break;
                }
                return _context4.abrupt("return");
              case 4:
                if (!this._fetchPromises[groupId]) {
                  this._fetchPromises[groupId] = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                    var params, response;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.prev = 0;
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
                            _context3.next = 6;
                            return _this3._client.glip().groups(groupId).posts().list(params);
                          case 6:
                            response = _context3.sent;
                            _this3.store.dispatch({
                              type: _this3.actionTypes.fetchSuccess,
                              groupId: groupId,
                              records: response.records,
                              lastPageToken: pageToken,
                              navigation: response.navigation
                            });
                            _context3.next = 13;
                            break;
                          case 10:
                            _context3.prev = 10;
                            _context3.t0 = _context3["catch"](0);
                            _this3.store.dispatch({
                              type: _this3.actionTypes.fetchError
                            });
                          case 13:
                            _this3._fetchPromises[groupId] = null;
                          case 14:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, null, [[0, 10]]);
                  }))();
                }
                promise = this._fetchPromises[groupId];
                _context4.next = 8;
                return promise;
              case 8:
              case "end":
                return _context4.stop();
            }
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
      var _loadNextPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(groupId, recordCount) {
        var pageInfo, pageToken;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                pageInfo = this.pageInfos[groupId];
                pageToken = pageInfo && pageInfo.prevPageToken;
                if (pageToken) {
                  _context5.next = 4;
                  break;
                }
                return _context5.abrupt("return");
              case 4:
                _context5.next = 6;
                return this.fetchPosts(groupId, recordCount, pageToken);
              case 6:
              case "end":
                return _context5.stop();
            }
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
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref3) {
        var groupId, text, mentions, fakeId, fakeRecord, record;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                groupId = _ref3.groupId;
                text = this.postInputs[groupId] && this.postInputs[groupId].text;
                mentions = this.postInputs[groupId] && this.postInputs[groupId].mentions;
                if (!((0, _isBlank.isBlank)(text) || !groupId)) {
                  _context6.next = 5;
                  break;
                }
                return _context6.abrupt("return");
              case 5:
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
                _context6.prev = 8;
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
                _context6.next = 13;
                return this._client.glip().groups(groupId).posts().post({
                  text: text
                });
              case 13:
                record = _context6.sent;
                this.store.dispatch({
                  type: this.actionTypes.createSuccess,
                  groupId: groupId,
                  record: record,
                  oldRecordId: fakeId
                });
                _context6.next = 22;
                break;
              case 17:
                _context6.prev = 17;
                _context6.t0 = _context6["catch"](8);
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
              case 22:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[8, 17]]);
      }));
      function create(_x5) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "sendFile",
    value: function () {
      var _sendFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_ref4) {
        var fileName, groupId, rawFile, platform, body, response;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                fileName = _ref4.fileName, groupId = _ref4.groupId, rawFile = _ref4.rawFile;
                _context7.prev = 1;
                platform = this._client.service.platform();
                body = rawFile;
                _context7.next = 6;
                return platform.post('/restapi/v1.0/glip/files', body, {
                  groupId: groupId,
                  name: fileName
                }, {
                  headers: {
                    'Content-Type': 'application/octet-stream'
                  }
                });
              case 6:
                response = _context7.sent;
                return _context7.abrupt("return", response.json());
              case 10:
                _context7.prev = 10;
                _context7.t0 = _context7["catch"](1);
                console.error(_context7.t0);
              case 13:
                return _context7.abrupt("return", null);
              case 14:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 10]]);
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
    } // @ts-expect-error TS(2345): Argument of type 'TypedPropertyDescriptor<({ text,... Remove this comment to see the full error message
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
  return GlipPosts;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "loadPosts", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "loadPosts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchPosts", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchPosts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadNextPage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "loadNextPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "create", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "create"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sendFile", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "sendFile"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateReadTime", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateReadTime"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updatePostInput", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updatePostInput"), _class2.prototype)), _class2)) || _class);
exports["default"] = GlipPosts;
//# sourceMappingURL=index.js.map
