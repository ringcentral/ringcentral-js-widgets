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

var GlipPosts = (_dec = (0, _di.Module)({
  deps: ['Client', 'Auth', 'Subscription', { dep: 'GlipPostsOptions', optional: true }]
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
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'auth', 'subscription']);
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
    return _this;
  }

  (0, _createClass3.default)(GlipPosts, [{
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
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
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
      }
    }
  }, {
    key: 'loadPosts',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(groupId) {
        var _this3 = this;

        var recordCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
        var promise;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (groupId) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return');

              case 2:
                if (!this._fetchPromises[groupId]) {
                  this._fetchPromises[groupId] = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                    var response;
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.prev = 0;

                            _this3.store.dispatch({
                              type: _this3.actionTypes.fetch
                            });
                            _context2.next = 4;
                            return _this3._client.glip().groups(groupId).posts().list({ recordCount: recordCount });

                          case 4:
                            response = _context2.sent;

                            _this3.store.dispatch({
                              type: _this3.actionTypes.fetchSuccess,
                              groupId: groupId,
                              records: response.records
                            });
                            _context2.next = 11;
                            break;

                          case 8:
                            _context2.prev = 8;
                            _context2.t0 = _context2['catch'](0);

                            _this3.store.dispatch({
                              type: _this3.actionTypes.fetchError
                            });

                          case 11:
                            _this3._fetchPromises[groupId] = null;

                          case 12:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this3, [[0, 8]]);
                  }))();
                }
                promise = this._fetchPromises[groupId];
                _context3.next = 6;
                return promise;

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadPosts(_x) {
        return _ref3.apply(this, arguments);
      }

      return loadPosts;
    }()
  }, {
    key: 'create',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref6) {
        var groupId = _ref6.groupId;
        var text, fakeId, fakeRecord, record;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                text = this.postInputs[groupId] && this.postInputs[groupId].text;

                if (!((0, _isBlank2.default)(text) || !groupId)) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt('return');

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
                _context4.prev = 5;

                this.store.dispatch({
                  type: this.actionTypes.create,
                  groupId: groupId,
                  record: fakeRecord
                });
                this.updatePostInput({ text: '', groupId: groupId });
                _context4.next = 10;
                return this._client.glip().groups(groupId).posts().post({
                  text: text
                });

              case 10:
                record = _context4.sent;

                this.store.dispatch({
                  type: this.actionTypes.createSuccess,
                  groupId: groupId,
                  record: record,
                  oldRecordId: fakeId
                });
                _context4.next = 19;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4['catch'](5);

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
                return _context4.stop();
            }
          }
        }, _callee4, this, [[5, 14]]);
      }));

      function create(_x3) {
        return _ref5.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'sendFile',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_ref8) {
        var fileName = _ref8.fileName,
            groupId = _ref8.groupId,
            rawFile = _ref8.rawFile;
        var platform, body, response;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                platform = this._client.service.platform();
                body = rawFile;
                _context5.next = 5;
                return platform.post('/glip/files', body, { groupId: groupId, name: fileName }, {
                  headers: {
                    'Content-Type': 'application/octet-stream'
                  }
                });

              case 5:
                response = _context5.sent;
                return _context5.abrupt('return', response.json());

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5['catch'](0);

                console.error(_context5.t0);

              case 12:
                return _context5.abrupt('return', null);

              case 13:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 9]]);
      }));

      function sendFile(_x4) {
        return _ref7.apply(this, arguments);
      }

      return sendFile;
    }()
  }, {
    key: 'updatePostInput',
    value: function updatePostInput(_ref9) {
      var text = _ref9.text,
          groupId = _ref9.groupId;

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
  }]);
  return GlipPosts;
}(_RcModule3.default)) || _class);
exports.default = GlipPosts;
//# sourceMappingURL=index.js.map
