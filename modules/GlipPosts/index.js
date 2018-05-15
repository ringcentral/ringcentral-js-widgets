'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _di = require('../../lib/di');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _isBlank = require('../../lib/isBlank');

var _isBlank2 = _interopRequireDefault(_isBlank);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getReducer = require('./getReducer');

var _getReducer2 = _interopRequireDefault(_getReducer);

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var glipPostsRegExp = /glip\/posts$/;
var subscriptionFilter = '/glip/posts';

var DEFAULT_LOAD_TTL = 30 * 60 * 1000;

var GlipPosts = (_dec = (0, _di.Module)({
  deps: ['Client', 'Auth', 'Subscription', 'Storage', { dep: 'GlipPostsOptions', optional: true }]
}), _dec(_class = function (_RcModule) {
  (0, _inherits3.default)(GlipPosts, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Auth} params.auth - auth module instance
   * @param {Subscription} params.subscription - subscription module instance
   */
  function GlipPosts(_ref) {
    var client = _ref.client,
        auth = _ref.auth,
        subscription = _ref.subscription,
        storage = _ref.storage,
        _ref$loadTtl = _ref.loadTtl,
        loadTtl = _ref$loadTtl === undefined ? DEFAULT_LOAD_TTL : _ref$loadTtl,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'auth', 'subscription', 'storage', 'loadTtl']);
    (0, _classCallCheck3.default)(this, GlipPosts);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GlipPosts.__proto__ || (0, _getPrototypeOf2.default)(GlipPosts)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._reducer = (0, _getReducer2.default)(_this.actionTypes);

    _this._client = client;
    _this._auth = auth;
    _this._subscription = subscription;
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

  (0, _createClass3.default)(GlipPosts, [{
    key: 'addNewPostListener',
    value: function addNewPostListener(listen) {
      if (typeof listen === 'function') {
        this._newPostListeners.push(listen);
      }
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this._shouldInit()) {
                  this.store.dispatch({
                    type: this.actionTypes.initSuccess
                  });
                  this._subscription.subscribe(subscriptionFilter);
                } else if (this._shouldReset()) {
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                  this._fetchPromises = {};
                } else if (this._shouldSubscribe()) {
                  this._processSubscription();
                }

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _ref2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._auth.loggedIn && this._subscription.ready && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !this._subscription.ready) && this.ready;
    }
  }, {
    key: '_shouldSubscribe',
    value: function _shouldSubscribe() {
      return !!(this.ready && this._subscription && this._subscription.ready && this._subscription.message && this._subscription.message !== this._lastMessage);
    }
  }, {
    key: '_processSubscription',
    value: function _processSubscription() {
      var message = this._subscription.message;

      this._lastMessage = message;
      if (message && glipPostsRegExp.test(message.event) && message.body) {
        var _message$body = message.body,
            eventType = _message$body.eventType,
            post = (0, _objectWithoutProperties3.default)(_message$body, ['eventType']);

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
    key: 'loadPosts',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(groupId) {
        var recordCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
        var lastPosts, fetchTime;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                lastPosts = this.postsMap[groupId];
                fetchTime = this.fetchTimeMap[groupId];

                if (!(lastPosts && fetchTime && Date.now() - fetchTime < this._loadTtl)) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt('return');

              case 4:
                _context2.next = 6;
                return this.fetchPosts(groupId, recordCount);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadPosts(_x2) {
        return _ref3.apply(this, arguments);
      }

      return loadPosts;
    }()
  }, {
    key: 'fetchPosts',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(groupId) {
        var _this3 = this;

        var recordCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
        var pageToken = arguments[2];
        var promise;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (groupId) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return');

              case 2:
                if (!this._fetchPromises[groupId]) {
                  this._fetchPromises[groupId] = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                    var params, response;
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.prev = 0;

                            _this3.store.dispatch({
                              type: _this3.actionTypes.fetch
                            });
                            params = { recordCount: recordCount };

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
                            _context3.t0 = _context3['catch'](0);

                            _this3.store.dispatch({
                              type: _this3.actionTypes.fetchError
                            });

                          case 13:
                            _this3._fetchPromises[groupId] = null;

                          case 14:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this3, [[0, 10]]);
                  }))();
                }
                promise = this._fetchPromises[groupId];
                _context4.next = 6;
                return promise;

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchPosts(_x4) {
        return _ref4.apply(this, arguments);
      }

      return fetchPosts;
    }()
  }, {
    key: 'loadNextPage',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(groupId, recordCount) {
        var pageInfo, pageToken;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                pageInfo = this.pageInfos[groupId];
                pageToken = pageInfo && pageInfo.prevPageToken;

                if (pageToken) {
                  _context5.next = 4;
                  break;
                }

                return _context5.abrupt('return');

              case 4:
                _context5.next = 6;
                return this.fetchPosts(groupId, recordCount, pageToken);

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function loadNextPage(_x5, _x6) {
        return _ref6.apply(this, arguments);
      }

      return loadNextPage;
    }()
  }, {
    key: 'create',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_ref7) {
        var groupId = _ref7.groupId;
        var text, fakeId, fakeRecord, record;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                text = this.postInputs[groupId] && this.postInputs[groupId].text;

                if (!((0, _isBlank2.default)(text) || !groupId)) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt('return');

              case 3:
                fakeId = '' + Date.now();
                fakeRecord = {
                  id: fakeId,
                  groupId: groupId,
                  creatorId: this._auth.ownerId,
                  sendStatus: _status2.default.creating,
                  creationTime: '' + new Date(Date.now()),
                  text: text,
                  type: 'TextMessage'
                };
                _context6.prev = 5;

                this.store.dispatch({
                  type: this.actionTypes.create,
                  groupId: groupId,
                  record: fakeRecord
                });
                this.updatePostInput({ text: '', groupId: groupId });
                _context6.next = 10;
                return this._client.glip().groups(groupId).posts().post({
                  text: text
                });

              case 10:
                record = _context6.sent;

                this.store.dispatch({
                  type: this.actionTypes.createSuccess,
                  groupId: groupId,
                  record: record,
                  oldRecordId: fakeId
                });
                _context6.next = 19;
                break;

              case 14:
                _context6.prev = 14;
                _context6.t0 = _context6['catch'](5);

                fakeRecord.sendStatus = _status2.default.createError;
                this.store.dispatch({
                  type: this.actionTypes.createError,
                  record: fakeRecord,
                  groupId: groupId,
                  oldRecordId: fakeId
                });
                this.updatePostInput({ text: text, groupId: groupId });

              case 19:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[5, 14]]);
      }));

      function create(_x7) {
        return _ref8.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'sendFile',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_ref9) {
        var fileName = _ref9.fileName,
            groupId = _ref9.groupId,
            rawFile = _ref9.rawFile;
        var platform, body, response;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                platform = this._client.service.platform();
                body = rawFile;
                _context7.next = 5;
                return platform.post('/glip/files', body, { groupId: groupId, name: fileName }, {
                  headers: {
                    'Content-Type': 'application/octet-stream'
                  }
                });

              case 5:
                response = _context7.sent;
                return _context7.abrupt('return', response.json());

              case 9:
                _context7.prev = 9;
                _context7.t0 = _context7['catch'](0);

                console.error(_context7.t0);

              case 12:
                return _context7.abrupt('return', null);

              case 13:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 9]]);
      }));

      function sendFile(_x8) {
        return _ref10.apply(this, arguments);
      }

      return sendFile;
    }()
  }, {
    key: 'updateReadTime',
    value: function updateReadTime(groupId, time) {
      this.store.dispatch({
        type: this.actionTypes.updateReadTime,
        groupId: groupId,
        time: time
      });
    }
  }, {
    key: 'updatePostInput',
    value: function updatePostInput(_ref11) {
      var text = _ref11.text,
          groupId = _ref11.groupId;

      this.store.dispatch({
        type: this.actionTypes.updatePostInput,
        groupId: groupId,
        textValue: text
      });
    }
  }, {
    key: 'postsMap',
    get: function get() {
      return this.state.glipPostsStore;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'postInputs',
    get: function get() {
      return this.state.postInputs;
    }
  }, {
    key: 'readTimeMap',
    get: function get() {
      return this._storage.getItem(this._readTimeStorageKey);
    }
  }, {
    key: 'pageInfos',
    get: function get() {
      return this.state.pageInfos;
    }
  }, {
    key: 'fetchTimeMap',
    get: function get() {
      return this.state.fetchTimes;
    }
  }]);
  return GlipPosts;
}(_RcModule3.default)) || _class);
exports.default = GlipPosts;
//# sourceMappingURL=index.js.map
