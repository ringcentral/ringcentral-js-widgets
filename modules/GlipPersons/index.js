'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

var _dec, _class, _desc, _value, _class2;

var _di = require('../../lib/di');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _sleep = require('../../lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _batchApiHelper = require('../../lib/batchApiHelper');

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getReducer = require('./getReducer');

var _getReducer2 = _interopRequireDefault(_getReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var MaximumBatchGetPersons = 30;
var DEFAULT_BATCH_FETCH_DELAY = 500;

var GlipPersons = (_dec = (0, _di.Module)({
  deps: ['Client', 'Auth', { dep: 'Storage', optional: true }, { dep: 'TabManager', optional: true }, { dep: 'GlipPersonsOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(GlipPersons, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Auth} params.auth - auth module instance
   * @param {Storage} params.storage - storage module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   */
  function GlipPersons(_ref) {
    var client = _ref.client,
        auth = _ref.auth,
        storage = _ref.storage,
        tabManager = _ref.tabManager,
        _ref$batchFetchDelay = _ref.batchFetchDelay,
        batchFetchDelay = _ref$batchFetchDelay === undefined ? DEFAULT_BATCH_FETCH_DELAY : _ref$batchFetchDelay,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'auth', 'storage', 'tabManager', 'batchFetchDelay']);
    (0, _classCallCheck3.default)(this, GlipPersons);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GlipPersons.__proto__ || (0, _getPrototypeOf2.default)(GlipPersons)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._client = client;
    _this._auth = auth;
    _this._tabManager = tabManager;
    _this._storage = storage;

    _this._fetchingIds = {};
    _this._batchFetchDelay = batchFetchDelay;

    _this._dataStorageKey = 'glipPersonsData';
    if (_this._storage) {
      _this._reducer = (0, _getReducer2.default)(_this.actionTypes);
      _this._storage.registerReducer({
        key: _this._dataStorageKey,
        reducer: (0, _getReducer.getGlipPersonStoreReducer)(_this.actionTypes)
      });
    } else {
      _this._reducer = (0, _getReducer2.default)(_this.actionTypes, {
        glipPersonStore: (0, _getReducer.getGlipPersonStoreReducer)(_this.actionTypes)
      });
    }
    return _this;
  }

  (0, _createClass3.default)(GlipPersons, [{
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
                if (!this._shouldInit()) {
                  _context.next = 8;
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
                _context.next = 5;
                return this.loadMe();

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                _context.next = 9;
                break;

              case 8:
                if (this._shouldReset()) {
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                }

              case 9:
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
      return this._auth.loggedIn && (!this._storage || this._storage.ready) && (!this._tabManager || this._tabManager.ready) && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (this._storage && !this._storage.ready || this._tabManager && !this._tabManager.ready || !this._auth.loggedIn) && this.ready;
    }
  }, {
    key: 'loadMe',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.loadPerson(this._auth.ownerId);

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadMe() {
        return _ref3.apply(this, arguments);
      }

      return loadMe;
    }()
  }, {
    key: 'loadPerson',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(id) {
        var person;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
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
                _context3.t0 = _context3['catch'](0);

                this.store.dispatch({
                  type: this.actionTypes.fetchError
                });

              case 11:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function loadPerson(_x) {
        return _ref4.apply(this, arguments);
      }

      return loadPerson;
    }()
  }, {
    key: 'loadPersons',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(personIds) {
        var _this3 = this;

        var ownerId, newPersonIds, ids, persons, lastIds;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this._auth.loggedIn) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return');

              case 2:
                if (personIds) {
                  _context4.next = 4;
                  break;
                }

                return _context4.abrupt('return');

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

                return _context4.abrupt('return');

              case 9:
                ids = newPersonIds.slice(0, MaximumBatchGetPersons);

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
                ids.forEach(function (id) {
                  delete _this3._fetchingIds[id];
                });
                _context4.next = 24;
                break;

              case 20:
                _context4.prev = 20;
                _context4.t0 = _context4['catch'](11);

                this.store.dispatch({
                  type: this.actionTypes.fetchError
                });
                ids.forEach(function (id) {
                  delete _this3._fetchingIds[id];
                });

              case 24:
                if (!(ownerId !== this._auth.ownerId)) {
                  _context4.next = 26;
                  break;
                }

                return _context4.abrupt('return');

              case 26:
                lastIds = newPersonIds.slice(MaximumBatchGetPersons);

                if (!(lastIds.length > 0)) {
                  _context4.next = 32;
                  break;
                }

                _context4.next = 30;
                return (0, _sleep2.default)(this._batchFetchDelay);

              case 30:
                _context4.next = 32;
                return this.loadPersons(lastIds);

              case 32:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[11, 20]]);
      }));

      function loadPersons(_x2) {
        return _ref5.apply(this, arguments);
      }

      return loadPersons;
    }()
  }, {
    key: '_batchGetPersons',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(personIds) {
        var response, ids, multipartResponse, responses;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!personIds || personIds.length === 0)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return', []);

              case 2:
                if (!(personIds.length === 1)) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 5;
                return this._client.glip().persons(personIds[0]).get();

              case 5:
                response = _context5.sent;
                return _context5.abrupt('return', [response]);

              case 7:
                ids = personIds.join(',');
                _context5.next = 10;
                return (0, _batchApiHelper.batchGetApi)({
                  platform: this._client.service.platform(),
                  url: '/glip/persons/' + ids
                });

              case 10:
                multipartResponse = _context5.sent;
                responses = multipartResponse.filter(function (r) {
                  return r.ok();
                }).map(function (x) {
                  return x.json();
                });
                return _context5.abrupt('return', responses);

              case 13:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _batchGetPersons(_x3) {
        return _ref6.apply(this, arguments);
      }

      return _batchGetPersons;
    }()
  }, {
    key: '_actionTypes',
    get: function get() {
      return _actionTypes2.default;
    }
  }, {
    key: 'personsMap',
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._dataStorageKey) || {};
      }
      return this.state.glipPersonStore;
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
    key: 'me',
    get: function get() {
      return this.personsMap[this._auth.ownerId];
    }
  }]);
  return GlipPersons;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'loadMe', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'loadMe'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'loadPerson', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'loadPerson'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'loadPersons', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'loadPersons'), _class2.prototype)), _class2)) || _class);
exports.default = GlipPersons;
//# sourceMappingURL=index.js.map
