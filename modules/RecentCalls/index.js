"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.date.to-iso-string");

require("regenerator-runtime/runtime");

var _background = _interopRequireDefault(require("../../lib/background"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _callStatus = _interopRequireDefault(require("./callStatus"));

var _getRecentCallsReducer = _interopRequireDefault(require("./getRecentCallsReducer"));

var _getDateFrom = _interopRequireDefault(require("../../lib/getDateFrom"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _concurrentExecute = _interopRequireDefault(require("../../lib/concurrentExecute"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

var RecentCalls = (
/**
 * @class
 * @description Retrieve all recent calls related to a specified contact.
 */
_dec = (0, _di.Module)({
  deps: ['Client', 'CallHistory']
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(RecentCalls, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {CallHistory} params.callHistory - callHistory module instance
   * @param {Client} params.client - client module instance
   */
  function RecentCalls(_ref) {
    var _context;

    var _this;

    var client = _ref.client,
        callHistory = _ref.callHistory,
        options = _objectWithoutProperties(_ref, ["client", "callHistory"]);

    _classCallCheck(this, RecentCalls);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RecentCalls).call(this, _objectSpread({
      actionTypes: _actionTypes.default
    }, options)));
    _this._client = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context, client, 'client');
    _this._callHistory = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context, callHistory, 'callHistory');
    _this._reducer = (0, _getRecentCallsReducer.default)(_this.actionTypes);
    return _this;
  }

  _createClass(RecentCalls, [{
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
    key: "getCalls",
    value: function () {
      var _getCalls = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref2) {
        var currentContact, _ref2$sessionId, sessionId, contactId, calls;

        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                currentContact = _ref2.currentContact, _ref2$sessionId = _ref2.sessionId, sessionId = _ref2$sessionId === void 0 ? null : _ref2$sessionId;

                if (currentContact) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return");

              case 3:
                contactId = String(currentContact && currentContact.id); // if (this.calls[currentContact.id]) {

                if (!this.calls[sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId]) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return");

              case 6:
                this.store.dispatch({
                  type: this.actionTypes.initLoad
                });
                _context2.next = 9;
                return this._getRecentCalls(currentContact, this._callHistory.calls);

              case 9:
                calls = _context2.sent;
                this.store.dispatch({
                  type: this.actionTypes.loadSuccess,
                  calls: calls,
                  contact: currentContact,
                  sessionId: sessionId
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function getCalls(_x) {
        return _getCalls.apply(this, arguments);
      }

      return getCalls;
    }()
  }, {
    key: "cleanUpCalls",
    value: function cleanUpCalls(_ref3) {
      var contact = _ref3.contact,
          _ref3$sessionId = _ref3.sessionId,
          sessionId = _ref3$sessionId === void 0 ? null : _ref3$sessionId;
      this.store.dispatch({
        type: this.actionTypes.loadReset,
        contact: contact,
        sessionId: sessionId
      });
    }
  }, {
    key: "_getRecentCalls",

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
      var _getRecentCalls2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(currentContact) {
        var calls,
            daySpan,
            length,
            dateFrom,
            recentCalls,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                calls = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : [];
                daySpan = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 60;
                length = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : 5;
                dateFrom = (0, _getDateFrom.default)(daySpan);
                recentCalls = this._getLocalRecentCalls(currentContact, calls, dateFrom); // If we could not find enough recent calls,
                // we need to search for calls on server.

                if (!(recentCalls.length < length)) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 8;
                return this._fetchRemoteRecentCalls(currentContact, dateFrom.toISOString(), length);

              case 8:
                recentCalls = _context3.sent;

              case 9:
                recentCalls.sort(this._sortByTime);
                recentCalls = this._dedup(recentCalls);
                return _context3.abrupt("return", recentCalls.length > length ? recentCalls.slice(0, length) : recentCalls);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function _getRecentCalls(_x2) {
        return _getRecentCalls2.apply(this, arguments);
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
    key: "_getLocalRecentCalls",
    value: function _getLocalRecentCalls(_ref4, calls, dateFrom) {
      var _this3 = this;

      var phoneNumbers = _ref4.phoneNumbers;
      // Get all calls related to this contact
      return calls.reduce(function (acc, call) {
        if (call && call.to && call.from) {
          var matches = phoneNumbers.find(_this3._filterPhoneNumber(call)); // Check if calls is within certain days

          if (!!matches && new Date(call.startTime) > dateFrom) {
            return acc.concat(call);
          }
        }

        return acc;
      }, []);
    }
  }, {
    key: "_filterPhoneNumber",
    value: function _filterPhoneNumber(call) {
      return function (_ref5) {
        var phoneNumber = _ref5.phoneNumber;
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
    key: "_fetchRemoteRecentCalls",
    value: function _fetchRemoteRecentCalls(_ref6, dateFrom, length) {
      var _this4 = this;

      var phoneNumbers = _ref6.phoneNumbers;
      var params = {
        dateFrom: dateFrom,
        perPage: length,
        type: 'Voice'
      }; // CallLog API doesn't support plus sign in phoneNumber

      var recentCallsPromises = phoneNumbers.reduce(function (acc, _ref7) {
        var phoneType = _ref7.phoneType,
            phoneNumber = _ref7.phoneNumber;
        phoneNumber = phoneNumber.replace('+', '');

        if (phoneType === 'extension') {
          var _promise = _this4._fetchCallLogList(Object.assign({}, params, {
            extensionNumber: phoneNumber
          }));

          return acc.concat(_promise);
        }

        var promise = _this4._fetchCallLogList(Object.assign({}, params, {
          phoneNumber: phoneNumber
        }));

        return acc.concat(promise);
      }, []);
      return (0, _concurrentExecute.default)(recentCallsPromises, 5, 500).then(this._flattenToRecords);
    }
  }, {
    key: "_fetchCallLogList",
    value: function _fetchCallLogList(params) {
      var _this5 = this;

      return function () {
        return _this5._client.account().extension().callLog().list(params);
      };
    }
  }, {
    key: "_flattenToRecords",
    value: function _flattenToRecords(items) {
      return items.reduce(function (acc, _ref8) {
        var records = _ref8.records;
        return acc.concat(records);
      }, []);
    } // Sort by time in descending order

  }, {
    key: "_sortByTime",
    value: function _sortByTime(a, b) {
      return new Date(b.startTime) - new Date(a.startTime);
    }
  }, {
    key: "_dedup",
    value: function _dedup(calls) {
      var hash = {};
      return calls.reduce(function (acc, cur) {
        if (hash[cur.id]) return acc;
        hash[cur.id] = true;
        return acc.concat(cur);
      }, []);
    }
  }, {
    key: "calls",
    get: function get() {
      return this.state.calls;
    }
  }, {
    key: "isCallsLoaded",
    get: function get() {
      return this.state.callStatus === _callStatus.default.loaded;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }]);

  return RecentCalls;
}(_RcModule2.default), (_applyDecoratedDescriptor(_class2.prototype, "getCalls", [_background.default], Object.getOwnPropertyDescriptor(_class2.prototype, "getCalls"), _class2.prototype)), _class2)) || _class);
exports.default = RecentCalls;
//# sourceMappingURL=index.js.map
