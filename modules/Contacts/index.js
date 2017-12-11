'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DefaultContactListPageSize = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _isBlank = require('../../lib/isBlank');

var _isBlank2 = _interopRequireDefault(_isBlank);

var _contactHelper = require('../../lib/contactHelper');

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getContactsReducer = require('./getContactsReducer');

var _getContactsReducer2 = _interopRequireDefault(_getContactsReducer);

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

var DefaultContactListPageSize = exports.DefaultContactListPageSize = 20;

/**
 * @class
 * @description Contacts managing module
 */
var Contacts = (_dec = (0, _di.Module)({
  deps: ['Auth', { dep: 'ContactSources', optional: true }, { dep: 'ContactsOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(Contacts, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   */
  function Contacts(_ref) {
    var auth = _ref.auth,
        _ref$listPageSize = _ref.listPageSize,
        listPageSize = _ref$listPageSize === undefined ? DefaultContactListPageSize : _ref$listPageSize,
        _ref$contactSources = _ref.contactSources,
        contactSources = _ref$contactSources === undefined ? [] : _ref$contactSources,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'listPageSize', 'contactSources']);
    (0, _classCallCheck3.default)(this, Contacts);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Contacts.__proto__ || (0, _getPrototypeOf2.default)(Contacts)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._auth = _ensureExist2.default.call(_this, auth, 'auth');
    _this._reducer = (0, _getContactsReducer2.default)(_this.actionTypes);
    _this._contactSources = new _map2.default();
    _this._sourcesLastStatus = new _map2.default();
    _this._sourcesUpdatedAt = Date.now();
    _this._listPageSize = listPageSize;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(contactSources), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var source = _step.value;

        _this.addSource(source);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    _this.addSelector('sourceNames', function () {
      return _this._contactSources.size;
    }, function () {
      return _this._checkSourceUpdated();
    }, function () {
      var names = [_contactHelper.AllContactSourceName];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)((0, _from2.default)(_this._contactSources.keys())), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var sourceName = _step2.value;

          var source = _this._contactSources.get(sourceName);
          if (source.sourceReady) {
            names.push(sourceName);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return names;
    });

    _this.addSelector('allContacts', function () {
      return _this._checkSourceUpdated();
    }, function () {
      var contacts = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator3.default)((0, _from2.default)(_this._contactSources.keys())), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var sourceName = _step3.value;

          var source = _this._contactSources.get(sourceName);
          if (source.sourceReady) {
            contacts = contacts.concat(source.contacts);
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return contacts;
    });

    _this.addSelector('contactGroups', function () {
      return _this.filteredContacts;
    }, function () {
      return _this.pageNumber;
    }, function (filteredContacts, pageNumber) {
      var pageSize = _this._listPageSize;
      var count = pageNumber * pageSize;
      var items = (0, _contactHelper.uniqueContactItems)(filteredContacts);
      items = (0, _contactHelper.sortContactItemsByName)(items);
      items = items.slice(0, count);
      var groups = (0, _contactHelper.groupByFirstLetterOfName)(items);
      return groups;
    });

    _this.addSelector('filteredContacts', function () {
      return _this.searchFilter;
    }, function () {
      return _this.sourceFilter;
    }, function () {
      return _this._checkSourceUpdated();
    }, function (searchFilter, sourceFilter) {
      var contacts = void 0;
      if ((0, _isBlank2.default)(searchFilter) && (sourceFilter === _contactHelper.AllContactSourceName || (0, _isBlank2.default)(sourceFilter))) {
        return _this.allContacts;
      }
      if (sourceFilter !== _contactHelper.AllContactSourceName && !(0, _isBlank2.default)(sourceFilter)) {
        var source = _this._contactSources.get(sourceFilter);
        if (source && source.sourceReady) {
          /* eslint { "prefer-destructuring": 0 } */
          contacts = source.contacts;
        } else {
          contacts = [];
        }
      } else {
        contacts = _this.allContacts;
      }
      if (!(0, _isBlank2.default)(searchFilter)) {
        contacts = (0, _contactHelper.filterContacts)(contacts, searchFilter);
      }
      return contacts;
    });
    return _this;
  }

  (0, _createClass3.default)(Contacts, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if (this._shouldReset()) {
        this._resetModuleStatus();
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._auth.loggedIn && this.sourceModuleReady && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !this.sourceModuleReady) && this.ready;
    }
  }, {
    key: '_resetModuleStatus',
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: 'updateFilter',
    value: function updateFilter(_ref2) {
      var sourceFilter = _ref2.sourceFilter,
          searchFilter = _ref2.searchFilter,
          pageNumber = _ref2.pageNumber;

      this.store.dispatch({
        type: this.actionTypes.updateFilter,
        sourceFilter: sourceFilter,
        searchFilter: searchFilter,
        pageNumber: pageNumber
      });
    }

    /**
     * @function
     * @param {Object} source - source module object
     * @param {String} params.sourceName - source name
     * @param {Bool} params.ready - source module ready status
     * @param {Bool} params.sourceReady - source ready status
     * @param {Array} params.contacts - source contacts data
     * @param {Function} params.getPresence - get source presence function, optional
     * @param {Function} params.getProfileImage - get source profile image function, optional
     * @param {Function} params.sync - sync source data function, optional
     * @param {Function} params.matchPhoneNumber - get match phoneNumber function, optional
     */

  }, {
    key: 'addSource',
    value: function addSource(source) {
      if (!source.sourceName) {
        throw new Error('Contacts: "sourceName" is required in Contacts source.');
      }
      if (this._contactSources.has(source.sourceName)) {
        throw new Error('Contacts: A contact source named "' + source.sourceName + '" already exists');
      }
      if (source.getPresence && typeof source.getPresence !== 'function') {
        throw new Error('Contacts: source\' getPresence must be a function');
      }
      if (source.getProfileImage && typeof source.getProfileImage !== 'function') {
        throw new Error('Contacts: source\' getProfileImage must be a function');
      }
      if (source.matchPhoneNumber && typeof source.matchPhoneNumber !== 'function') {
        throw new Error('Contacts: source\' matchPhoneNumber must be a function');
      }
      this._contactSources.set(source.sourceName, source);
      this._sourcesLastStatus.set(source.sourceName, {});
      this._sourcesUpdatedAt = Date.now();
    }
  }, {
    key: '_checkSourceUpdated',
    value: function _checkSourceUpdated() {
      var updated = false;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, _getIterator3.default)((0, _from2.default)(this._contactSources.keys())), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var sourceName = _step4.value;

          var source = this._contactSources.get(sourceName);
          var lastStatus = this._sourcesLastStatus.get(sourceName);
          if (lastStatus.ready !== source.sourceReady || lastStatus.data !== source.contacts) {
            updated = true;
            this._sourcesLastStatus.set(sourceName, {
              ready: source.sourceReady,
              data: source.contacts
            });
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      if (updated) {
        this._sourcesUpdatedAt = Date.now();
      }
      return this._sourcesUpdatedAt;
    }
  }, {
    key: 'matchPhoneNumber',
    value: function matchPhoneNumber(phoneNumber) {
      var result = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = (0, _getIterator3.default)((0, _from2.default)(this._contactSources.keys())), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var sourceName = _step5.value;

          var source = this._contactSources.get(sourceName);
          if (typeof source.matchPhoneNumber === 'function') {
            result = result.concat(source.matchPhoneNumber(phoneNumber));
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return result;
    }
  }, {
    key: 'matchContacts',
    value: function matchContacts(_ref3) {
      var _this3 = this;

      var phoneNumbers = _ref3.phoneNumbers;

      var result = {};
      phoneNumbers.forEach(function (phoneNumber) {
        result[phoneNumber] = _this3.matchPhoneNumber(phoneNumber);
      });
      return result;
    }
  }, {
    key: 'find',
    value: function find(_ref4) {
      var type = _ref4.type,
          id = _ref4.id;

      var contactId = (id || '').toString();
      var source = this._contactSources.get(type);
      if (source) {
        return source.contacts.find(function (x) {
          return x.id.toString() === contactId;
        });
      }
      return null;
    }
  }, {
    key: 'getProfileImage',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(contact) {
        var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var source, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                source = this._contactSources.get(contact && contact.type);

                if (!(source && source.getProfileImage)) {
                  _context.next = 6;
                  break;
                }

                _context.next = 4;
                return source.getProfileImage(contact, useCache);

              case 4:
                result = _context.sent;
                return _context.abrupt('return', result);

              case 6:
                return _context.abrupt('return', null);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getProfileImage(_x) {
        return _ref5.apply(this, arguments);
      }

      return getProfileImage;
    }()
  }, {
    key: 'getPresence',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(contact) {
        var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var source, result;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                source = this._contactSources.get(contact && contact.type);

                if (!(source && source.getPresence)) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 4;
                return source.getPresence(contact, useCache);

              case 4:
                result = _context2.sent;
                return _context2.abrupt('return', result);

              case 6:
                return _context2.abrupt('return', null);

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getPresence(_x3) {
        return _ref6.apply(this, arguments);
      }

      return getPresence;
    }()
  }, {
    key: 'sync',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, sourceName, source;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _iteratorNormalCompletion6 = true;
                _didIteratorError6 = false;
                _iteratorError6 = undefined;
                _context3.prev = 3;
                _iterator6 = (0, _getIterator3.default)((0, _from2.default)(this._contactSources.keys()));

              case 5:
                if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                  _context3.next = 14;
                  break;
                }

                sourceName = _step6.value;
                source = this._contactSources.get(sourceName);

                if (!(typeof source.sync === 'function')) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 11;
                return source.sync();

              case 11:
                _iteratorNormalCompletion6 = true;
                _context3.next = 5;
                break;

              case 14:
                _context3.next = 20;
                break;

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3['catch'](3);
                _didIteratorError6 = true;
                _iteratorError6 = _context3.t0;

              case 20:
                _context3.prev = 20;
                _context3.prev = 21;

                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                  _iterator6.return();
                }

              case 23:
                _context3.prev = 23;

                if (!_didIteratorError6) {
                  _context3.next = 26;
                  break;
                }

                throw _iteratorError6;

              case 26:
                return _context3.finish(23);

              case 27:
                return _context3.finish(20);

              case 28:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 16, 20, 28], [21,, 23, 27]]);
      }));

      function sync() {
        return _ref7.apply(this, arguments);
      }

      return sync;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'sourceModuleReady',
    get: function get() {
      var ready = true;
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = (0, _getIterator3.default)((0, _from2.default)(this._contactSources.keys())), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var sourceName = _step7.value;

          var source = this._contactSources.get(sourceName);
          if (!source.ready) {
            ready = false;
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return ready;
    }
  }, {
    key: 'companyContacts',
    get: function get() {
      var source = this._contactSources.get('company');
      if (source) {
        return source.contacts;
      }
      return [];
    }
  }, {
    key: 'personalContacts',
    get: function get() {
      var source = this._contactSources.get('personal');
      if (source) {
        return source.contacts;
      }
      return [];
    }
  }, {
    key: 'searchFilter',
    get: function get() {
      return this.state.searchFilter;
    }
  }, {
    key: 'sourceFilter',
    get: function get() {
      return this.state.sourceFilter;
    }
  }, {
    key: 'pageNumber',
    get: function get() {
      return this.state.pageNumber;
    }
  }, {
    key: 'allContacts',
    get: function get() {
      return this._selectors.allContacts();
    }
  }, {
    key: 'filteredContacts',
    get: function get() {
      return this._selectors.filteredContacts();
    }
  }, {
    key: 'sourceNames',
    get: function get() {
      return this._selectors.sourceNames();
    }
  }, {
    key: 'contactGroups',
    get: function get() {
      return this._selectors.contactGroups();
    }
  }]);
  return Contacts;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'updateFilter', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateFilter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'getProfileImage', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'getProfileImage'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'getPresence', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'getPresence'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'sync', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'sync'), _class2.prototype)), _class2)) || _class);
exports.default = Contacts;
//# sourceMappingURL=index.js.map
