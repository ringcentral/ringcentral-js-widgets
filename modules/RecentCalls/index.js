'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _background = require('../../lib/background');

var _background2 = _interopRequireDefault(_background);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _callStatus = require('./callStatus');

var _callStatus2 = _interopRequireDefault(_callStatus);

var _getRecentCallsReducer = require('./getRecentCallsReducer');

var _getRecentCallsReducer2 = _interopRequireDefault(_getRecentCallsReducer);

var _getDateFrom = require('../../lib/getDateFrom');

var _getDateFrom2 = _interopRequireDefault(_getDateFrom);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _concurrentExecute = require('../../lib/concurrentExecute');

var _concurrentExecute2 = _interopRequireDefault(_concurrentExecute);

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

/**
 * @class
 * @description Retrieve all recent calls related to a specified contact.
 */
var RecentCalls = (_dec = (0, _di.Module)({
  deps: ['Client', 'CallHistory']
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(RecentCalls, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {CallHistory} params.callHistory - callHistory module instance
   * @param {Client} params.client - client module instance
   */
  function RecentCalls(_ref) {
    var client = _ref.client,
        callHistory = _ref.callHistory,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'callHistory']);
    (0, _classCallCheck3.default)(this, RecentCalls);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RecentCalls.__proto__ || (0, _getPrototypeOf2.default)(RecentCalls)).call(this, (0, _extends3.default)({
      actionTypes: _actionTypes2.default
    }, options)));

    _this._client = _ensureExist2.default.call(_this, client, 'client');
    _this._callHistory = _ensureExist2.default.call(_this, callHistory, 'callHistory');
    _this._reducer = (0, _getRecentCallsReducer2.default)(_this.actionTypes);
    return _this;
  }

  (0, _createClass3.default)(RecentCalls, [{
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
      if (this.pending && this._callHistory.ready) {
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if (this.ready && !this._callHistory.ready) {
        this.store.dispatch({
          type: this.actionTypes.resetSuccess
        });
      }
    }
  }, {
    key: 'getCalls',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3) {
        var currentContact = _ref3.currentContact,
            _ref3$sessionId = _ref3.sessionId,
            sessionId = _ref3$sessionId === undefined ? null : _ref3$sessionId;
        var contactId, calls;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (currentContact) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                contactId = String(currentContact && currentContact.id);
                // if (this.calls[currentContact.id]) {

                if (!this.calls[sessionId ? contactId + '-' + sessionId : contactId]) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return');

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.initLoad
                });
                _context.next = 8;
                return this._getRecentCalls(currentContact, this._callHistory.calls);

              case 8:
                calls = _context.sent;

                this.store.dispatch({
                  type: this.actionTypes.loadSuccess,
                  calls: calls,
                  contact: currentContact,
                  sessionId: sessionId
                });

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCalls(_x) {
        return _ref2.apply(this, arguments);
      }

      return getCalls;
    }()
  }, {
    key: 'cleanUpCalls',
    value: function cleanUpCalls(_ref4) {
      var contact = _ref4.contact,
          _ref4$sessionId = _ref4.sessionId,
          sessionId = _ref4$sessionId === undefined ? null : _ref4$sessionId;

      this.store.dispatch({
        type: this.actionTypes.loadReset,
        contact: contact,
        sessionId: sessionId
      });
    }
  }, {
    key: '_getRecentCalls',


    /**
     * Searching for recent calls of specific contact.
     * @param {Object} currentContact Current contact
     * @param {Array} calls Calls in callHistory
     * @param {Number} daySpan Find calls within certain days
     * @param {Number} length Maximum length of recent calls
     * @return {Array}
     * @private
     */
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(currentContact) {
        var calls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var daySpan = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60;
        var length = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;
        var dateFrom, recentCalls;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dateFrom = (0, _getDateFrom2.default)(daySpan);
                recentCalls = this._getLocalRecentCalls(currentContact, calls, dateFrom);

                // If we could not find enough recent calls,
                // we need to search for calls on server.

                if (!(recentCalls.length < length)) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 5;
                return this._fetchRemoteRecentCalls(currentContact, dateFrom.toISOString(), length);

              case 5:
                recentCalls = _context2.sent;

              case 6:

                recentCalls.sort(this._sortByTime);
                recentCalls = this._dedup(recentCalls);
                return _context2.abrupt('return', recentCalls.length > length ? recentCalls.slice(0, length) : recentCalls);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _getRecentCalls(_x2) {
        return _ref5.apply(this, arguments);
      }

      return _getRecentCalls;
    }()

    /**
     * Get recent calls from callHistory.
     * @param {Object} currentContact
     * @param {Array} calls
     * @param {Date} dateFrom
     */

  }, {
    key: '_getLocalRecentCalls',
    value: function _getLocalRecentCalls(_ref6, calls, dateFrom) {
      var phoneNumbers = _ref6.phoneNumbers;

      var _this3 = this;

      // Get all calls related to this contact
      return calls.reduce(function (acc, call) {
        if (call && call.to && call.from) {
          var matches = phoneNumbers.find(_this3._filterPhoneNumber(call));

          // Check if calls is within certain days
          if (!!matches && new Date(call.startTime) > dateFrom) {
            return acc.concat(call);
          }
        }
        return acc;
      }, []);
    }
  }, {
    key: '_filterPhoneNumber',
    value: function _filterPhoneNumber(call) {
      return function (_ref7) {
        var phoneNumber = _ref7.phoneNumber;
        return phoneNumber === call.from.phoneNumber || phoneNumber === call.to.phoneNumber || phoneNumber === call.from.extensionNumber || phoneNumber === call.to.extensionNumber;
      };
    }

    /**
     * Fetch recent calls from server by given current contact.
     * @param {Object} currentContact
     * @param {String} dateFrom
     * @param {String} dateTo
     * @param {Number} length The number of calls
     * @return {Array}
     */

  }, {
    key: '_fetchRemoteRecentCalls',
    value: function _fetchRemoteRecentCalls(_ref8, dateFrom, length) {
      var phoneNumbers = _ref8.phoneNumbers;

      var _this4 = this;

      var params = {
        dateFrom: dateFrom,
        perPage: length,
        type: 'Voice'
      };

      // CallLog API doesn't support plus sign in phoneNumber
      var recentCallsPromises = phoneNumbers.reduce(function (acc, _ref9) {
        var phoneType = _ref9.phoneType,
            phoneNumber = _ref9.phoneNumber;

        phoneNumber = phoneNumber.replace('+', '');
        if (phoneType === 'extension') {
          var _promise = _this4._fetchCallLogList((0, _assign2.default)({}, params, {
            extensionNumber: phoneNumber
          }));
          return acc.concat(_promise);
        }
        var promise = _this4._fetchCallLogList((0, _assign2.default)({}, params, {
          phoneNumber: phoneNumber
        }));
        return acc.concat(promise);
      }, []);

      return (0, _concurrentExecute2.default)(recentCallsPromises, 5, 500).then(this._flattenToRecords);
    }
  }, {
    key: '_fetchCallLogList',
    value: function _fetchCallLogList(params) {
      var _this5 = this;

      return function () {
        return _this5._client.account().extension().callLog().list(params);
      };
    }
  }, {
    key: '_flattenToRecords',
    value: function _flattenToRecords(items) {
      return items.reduce(function (acc, _ref10) {
        var records = _ref10.records;
        return acc.concat(records);
      }, []);
    }

    // Sort by time in descending order

  }, {
    key: '_sortByTime',
    value: function _sortByTime(a, b) {
      return new Date(b.startTime) - new Date(a.startTime);
    }
  }, {
    key: '_dedup',
    value: function _dedup(calls) {
      var hash = {};
      return calls.reduce(function (acc, cur) {
        if (hash[cur.id]) return acc;
        hash[cur.id] = true;
        return acc.concat(cur);
      }, []);
    }
  }, {
    key: 'calls',
    get: function get() {
      return this.state.calls;
    }
  }, {
    key: 'isCallsLoaded',
    get: function get() {
      return this.state.callStatus === _callStatus2.default.loaded;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }]);
  return RecentCalls;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'getCalls', [_background2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'getCalls'), _class2.prototype)), _class2)) || _class);
exports.default = RecentCalls;
//# sourceMappingURL=index.js.map
