"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

var _di = require("../../lib/di");

var _Pollable2 = _interopRequireDefault(require("../../lib/Pollable"));

var _isBlank = _interopRequireDefault(require("../../lib/isBlank"));

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _selector = require("../../lib/selector");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _getReducer = _interopRequireWildcard(require("./getReducer"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var glipGroupRegExp = /glip\/groups$/;
var subscriptionFilter = '/glip/groups';
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
        detailMembers.push(_objectSpread({}, personsMap[memberId], {
          isMe: ownerId === memberId
        }));
      }
    });
  }

  var newGroup = _objectSpread({}, group, {
    detailMembers: detailMembers,
    updatedTime: new Date(group.lastModifiedTime).getTime()
  });

  var latestPost = postsMap[group.id] && postsMap[group.id][0];

  if (latestPost) {
    newGroup.latestPost = _objectSpread({}, latestPost, {
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
      if (memberIdsMap[memberId]) {
        return;
      }

      memberIdsMap[memberId] = true;
      memberIds.push(memberId);
    });
  });
  return memberIds;
}

function searchPosts(searchFilter, posts) {
  var result = false;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = posts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}
/**
 * @class
 * @description Accound info managing module.
 */


var GlipGroups = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Client', 'Subscription', 'RolesAndPermissions', {
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
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Pollable) {
  _inherits(GlipGroups, _Pollable);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Auth} params.auth - auth module instance
   * @param {RolesAndPermissions} params.rolesAndPermissions - rolesAndPermission module instance
   * @param {Subscription} params.subscription - subscription module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   * @param {GlipPersons} params.glipPersons - glipPersons module instance
   * @param {GlipPosts} params.glipPosts - glipPosts module instance
   * @param {Storage} params.storage - storage module instance
   */
  function GlipGroups(_ref) {
    var _context;

    var _this;

    var auth = _ref.auth,
        subscription = _ref.subscription,
        client = _ref.client,
        tabManager = _ref.tabManager,
        glipPersons = _ref.glipPersons,
        glipPosts = _ref.glipPosts,
        storage = _ref.storage,
        rolesAndPermissions = _ref.rolesAndPermissions,
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
        options = _objectWithoutProperties(_ref, ["auth", "subscription", "client", "tabManager", "glipPersons", "glipPosts", "storage", "rolesAndPermissions", "connectivityMonitor", "timeToRetry", "ttl", "polling", "disableCache", "perPage", "recordCountPerReq", "preloadPosts", "preloadPostsDelayTtl"]);

    _classCallCheck(this, GlipGroups);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GlipGroups).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));

    _initializerDefineProperty(_this, "allGroups", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "filteredGroups", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "groups", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "uniqueMemberIds", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "groupMemberIds", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "currentGroup", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "currentGroupPosts", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "groupsWithUnread", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "unreadCounts", _descriptor9, _assertThisInitialized(_this));

    _this._auth = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, auth, 'auth');
    _this._client = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, client, 'client');
    _this._subscription = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, subscription, 'subscription');
    _this._rolesAndPermissions = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, rolesAndPermissions, 'rolesAndPermissions');
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

  _createClass(GlipGroups, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      return regeneratorRuntime.async(function _onStateChange$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this._shouldInit()) {
                _context2.next = 6;
                break;
              }

              this.store.dispatch({
                type: this.actionTypes.init
              });
              _context2.next = 4;
              return regeneratorRuntime.awrap(this._init());

            case 4:
              _context2.next = 28;
              break;

            case 6:
              if (!this._isDataReady()) {
                _context2.next = 11;
                break;
              }

              this.store.dispatch({
                type: this.actionTypes.initSuccess
              });

              this._onDataReady();

              _context2.next = 28;
              break;

            case 11:
              if (!this._shouldReset()) {
                _context2.next = 17;
                break;
              }

              this._clearTimeout();

              this._promise = null;
              this.store.dispatch({
                type: this.actionTypes.resetSuccess
              });
              _context2.next = 28;
              break;

            case 17:
              if (!this._shouldHandleSubscriptionMessage()) {
                _context2.next = 21;
                break;
              }

              this._processSubscription();

              _context2.next = 28;
              break;

            case 21:
              if (!(this.ready && this._connectivityMonitor && this._connectivityMonitor.ready && this._connectivity !== this._connectivityMonitor.connectivity)) {
                _context2.next = 28;
                break;
              }

              this._connectivity = this._connectivityMonitor.connectivity;

              if (this._connectivity) {
                _context2.next = 25;
                break;
              }

              return _context2.abrupt("return");

            case 25:
              _context2.next = 27;
              return regeneratorRuntime.awrap(this.fetchData());

            case 27:
              if (this._preloadPosts) {
                this._preloadedPosts = {};

                this._preloadGroupPosts(true);
              }

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(this._auth.loggedIn && this._rolesAndPermissions.ready && (!this._connectivityMonitor || this._connectivityMonitor.ready) && (!this._storage || this._storage.ready) && (!this._readyCheckFn || this._readyCheckFn()) && (!this._subscription || this._subscription.ready) && (!this._glipPosts || this._glipPosts.ready) && (!this._glipPersons || this._glipPersons.ready) && (!this._tabManager || this._tabManager.ready) && this.pending);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!((!this._auth.loggedIn || !this._rolesAndPermissions.ready || this._storage && !this._storage.ready || this._readyCheckFn && !this._readyCheckFn() || this._subscription && !this._subscription.ready || this._glipPosts && !this._glipPosts.ready || this._glipPersons && !this._glipPersons.ready || this._connectivityMonitor && !this._connectivityMonitor.ready || this._tabManager && !this._tabManager.ready) && this.ready);
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

        this._preloadGroupPosts();
      }
    }
  }, {
    key: "_subscriptionHandleFn",
    value: function _subscriptionHandleFn(message) {
      var _message$body, eventType, group;

      return regeneratorRuntime.async(function _subscriptionHandleFn$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(message && glipGroupRegExp.test(message.event) && message.body && message.body.eventType)) {
                _context3.next = 10;
                break;
              }

              _message$body = message.body, eventType = _message$body.eventType, group = _objectWithoutProperties(_message$body, ["eventType"]);

              if (!(eventType.indexOf('Group') !== 0)) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return");

            case 4:
              if (!(eventType === 'GroupLeft')) {
                _context3.next = 7;
                break;
              }

              this.store.dispatch({
                type: this.actionTypes.removeGroup,
                group: group
              });
              return _context3.abrupt("return");

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
              return _context3.stop();
          }
        }
      }, null, this);
    }
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
    value: function _init() {
      return regeneratorRuntime.async(function _init$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (this._hasPermission) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return");

            case 2:
              if (!this._shouldFetch()) {
                _context4.next = 14;
                break;
              }

              _context4.prev = 3;
              _context4.next = 6;
              return regeneratorRuntime.awrap(this.fetchData());

            case 6:
              _context4.next = 12;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](3);
              console.error('fetchData error:', _context4.t0);

              this._retry();

            case 12:
              _context4.next = 15;
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
              return _context4.stop();
          }
        }
      }, null, this, [[3, 8]]);
    }
  }, {
    key: "_processSubscription",
    value: function _processSubscription() {
      this._lastMessage = this._subscription.message;

      this._subscriptionHandleFn(this._lastMessage);
    }
  }, {
    key: "_preloadGroupPosts",
    value: function _preloadGroupPosts(force) {
      var groups, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, group;

      return regeneratorRuntime.async(function _preloadGroupPosts$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              groups = this.groups.slice(0, 20);
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context5.prev = 4;
              _iterator2 = groups[Symbol.iterator]();

            case 6:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context5.next = 23;
                break;
              }

              group = _step2.value;

              if (this._glipPosts) {
                _context5.next = 10;
                break;
              }

              return _context5.abrupt("break", 23);

            case 10:
              if (!this._preloadedPosts[group.id]) {
                _context5.next = 12;
                break;
              }

              return _context5.abrupt("continue", 20);

            case 12:
              this._preloadedPosts[group.id] = true;

              if (!(!this._glipPosts.postsMap[group.id] || force)) {
                _context5.next = 19;
                break;
              }

              _context5.next = 16;
              return regeneratorRuntime.awrap((0, _sleep["default"])(this._preloadPostsDelayTtl));

            case 16:
              if (!(!this._glipPosts.postsMap[group.id] || force)) {
                _context5.next = 19;
                break;
              }

              _context5.next = 19;
              return regeneratorRuntime.awrap(this._glipPosts.fetchPosts(group.id));

            case 19:
              if (!this._glipPosts.readTimeMap[group.id]) {
                this._glipPosts.updateReadTime(group.id, Date.now() - 1000 * 3600 * 2);
              }

            case 20:
              _iteratorNormalCompletion2 = true;
              _context5.next = 6;
              break;

            case 23:
              _context5.next = 29;
              break;

            case 25:
              _context5.prev = 25;
              _context5.t0 = _context5["catch"](4);
              _didIteratorError2 = true;
              _iteratorError2 = _context5.t0;

            case 29:
              _context5.prev = 29;
              _context5.prev = 30;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 32:
              _context5.prev = 32;

              if (!_didIteratorError2) {
                _context5.next = 35;
                break;
              }

              throw _iteratorError2;

            case 35:
              return _context5.finish(32);

            case 36:
              return _context5.finish(29);

            case 37:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[4, 25, 29, 37], [30,, 32, 36]]);
    }
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
        this._preloadGroupPosts();
      }
    }
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
        this._glipPersons.loadPersons(this.currentGroup && this.currentGroup.members);
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
    value: function _fetchFunction() {
      var result;
      return regeneratorRuntime.async(function _fetchFunction$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this._client.glip().groups().list({
                recordCount: this._recordCountPerReq
              }));

            case 2:
              result = _context6.sent;
              return _context6.abrupt("return", result);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_fetchData",
    value: function _fetchData() {
      var ownerId, data;
      return regeneratorRuntime.async(function _fetchData$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              this.store.dispatch({
                type: this.actionTypes.fetch
              });
              ownerId = this._auth.ownerId;
              _context7.prev = 2;
              _context7.next = 5;
              return regeneratorRuntime.awrap(this._fetchFunction());

            case 5:
              data = _context7.sent;

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

              _context7.next = 16;
              break;

            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](2);

              if (!(this._auth.ownerId === ownerId)) {
                _context7.next = 16;
                break;
              }

              this._promise = null;
              this.store.dispatch({
                type: this.actionTypes.fetchError,
                error: _context7.t0
              });

              if (this._polling) {
                this._startPolling(this.timeToRetry);
              } else {
                this._retry();
              }

              throw _context7.t0;

            case 16:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this, [[2, 9]]);
    }
  }, {
    key: "fetchData",
    value: function fetchData() {
      return regeneratorRuntime.async(function fetchData$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!this._promise) {
                this._promise = this._fetchData();
              }

              return _context8.abrupt("return", this._promise);

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "startChat",
    value: function startChat(personId) {
      var group;
      return regeneratorRuntime.async(function startChat$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return regeneratorRuntime.awrap(this._client.glip().groups().post({
                type: 'PrivateChat',
                members: [this._auth.ownerId, personId]
              }));

            case 3:
              group = _context9.sent;
              group.lastModifiedTime = Date.now();
              this.store.dispatch({
                type: this.actionTypes.updateGroup,
                group: group
              });
              this.store.dispatch({
                type: this.actionTypes.updateCurrentGroupId,
                groupId: group.id
              });
              return _context9.abrupt("return", group);

            case 10:
              _context9.prev = 10;
              _context9.t0 = _context9["catch"](0);
              console.error(_context9.t0);

            case 13:
              return _context9.abrupt("return", null);

            case 14:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this, [[0, 10]]);
    }
  }, {
    key: "onNewPost",
    value: function onNewPost(post) {
      if (post.groupId === this.currentGroupId && this._glipPosts) {
        this._glipPosts.updateReadTime(post.groupId);
      }
    }
  }, {
    key: "createTeam",
    value: function createTeam(name, members) {
      var type,
          group,
          _args9 = arguments;
      return regeneratorRuntime.async(function createTeam$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              type = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : 'Team';
              _context10.next = 3;
              return regeneratorRuntime.awrap(this._client.glip().groups().post({
                type: type,
                name: name,
                members: members,
                isPublic: true,
                description: ''
              }));

            case 3:
              group = _context10.sent;
              return _context10.abrupt("return", group.id);

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }
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
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.status === _moduleStatuses["default"].pending;
    }
  }, {
    key: "ttl",
    get: function get() {
      return this._ttl;
    }
  }, {
    key: "timeToRetry",
    get: function get() {
      return this._timeToRetry;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return !!this._rolesAndPermissions.hasGlipPermission;
    }
  }]);

  return GlipGroups;
}(_Pollable2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "updateFilter", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateFilter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCurrentGroupId", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCurrentGroupId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startChat", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "startChat"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "allGroups", [_selector.selector], {
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

      if ((0, _isBlank["default"])(searchFilter)) {
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
        return _objectSpread({}, post, {
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
        return _objectSpread({}, group, {
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
