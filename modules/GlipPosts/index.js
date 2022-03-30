"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.index-of");

require("regenerator-runtime/runtime");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _di = require("../../lib/di");

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _isBlank = _interopRequireDefault(require("../../lib/isBlank"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _actionTypes = require("./actionTypes");

var _getReducer = _interopRequireWildcard(require("./getReducer"));

var _status = require("./status");

var _dec, _class, _class2;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var glipPostsRegExp = /glip\/posts$/;
var glipGroupRegExp = /glip\/groups$/;
var subscriptionFilter = '/restapi/v1.0/glip/posts';
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
    _this._reducer = (0, _getReducer["default"])(_this.actionTypes);
    _this._client = _ensureExist["default"].call(_assertThisInitialized(_this), client, 'client');
    _this._auth = _ensureExist["default"].call(_assertThisInitialized(_this), auth, 'auth');
    _this._extensionFeatures = extensionFeatures;
    _this._subscription = _ensureExist["default"].call(_assertThisInitialized(_this), subscription, 'subscription');
    _this._fetchPromises = {};
    _this._lastMessage = null;
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
    }
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context.next = 8;
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

                this._subscription.subscribe([subscriptionFilter]);

                _context.next = 9;
                break;

              case 8:
                if (this._shouldReset()) {
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                  this._fetchPromises = {};
                } else if (this._shouldHandleSubscriptionMessage()) {
                  this._processSubscription();
                }

              case 9:
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
    }()
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._auth.loggedIn && this._subscription.ready && this._extensionFeatures.ready && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !this._extensionFeatures.ready || !this._subscription.ready) && this.ready;
    }
  }, {
    key: "_shouldHandleSubscriptionMessage",
    value: function _shouldHandleSubscriptionMessage() {
      return !!(this.ready && this._subscription && this._subscription.ready && this._subscription.message && this._subscription.message !== this._lastMessage);
    }
  }, {
    key: "_processSubscription",
    value: function _processSubscription() {
      var message = this._subscription.message;
      this._lastMessage = message;

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

                if (!((0, _isBlank["default"])(text) || !groupId)) {
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
    }()
  }, {
    key: "updateReadTime",
    value: function updateReadTime(groupId, time) {
      this.store.dispatch({
        type: this.actionTypes.updateReadTime,
        groupId: groupId,
        time: time
      });
    }
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
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "loadPosts", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadPosts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchPosts", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchPosts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadNextPage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadNextPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "create", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "create"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sendFile", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "sendFile"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateReadTime", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateReadTime"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updatePostInput", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updatePostInput"), _class2.prototype)), _class2)) || _class);
exports["default"] = GlipPosts;
//# sourceMappingURL=index.js.map
