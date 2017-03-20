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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _callLogHelpers = require('../../lib/callLogHelpers');

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getCallHistoryReducer = require('./getCallHistoryReducer');

var _getCallHistoryReducer2 = _interopRequireDefault(_getCallHistoryReducer);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _normalizeNumber = require('../../lib/normalizeNumber');

var _normalizeNumber2 = _interopRequireDefault(_normalizeNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallHistory = function (_RcModule) {
  (0, _inherits3.default)(CallHistory, _RcModule);

  function CallHistory(_ref) {
    var _this2 = this;

    var accountInfo = _ref.accountInfo,
        callLog = _ref.callLog,
        callMonitor = _ref.callMonitor,
        activityMatcher = _ref.activityMatcher,
        contactMatcher = _ref.contactMatcher,
        options = (0, _objectWithoutProperties3.default)(_ref, ['accountInfo', 'callLog', 'callMonitor', 'activityMatcher', 'contactMatcher']);
    (0, _classCallCheck3.default)(this, CallHistory);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallHistory.__proto__ || (0, _getPrototypeOf2.default)(CallHistory)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._onStateChange = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var uniqueNumbers, sessionIds, monitorCalls, endedCalls, currentCalls, ids, shouldRemove;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this._callLog.ready && (!_this._callMonitor || _this._callMonitor.ready) && _this._accountInfo.ready && (!_this._contactMatcher || _this._contactMatcher.ready) && (!_this._activityMatcher || _this._activityMatcher.ready) && _this.pending) {
                _this.store.dispatch({
                  type: _this.actionTypes.init
                });
                _this.store.dispatch({
                  type: _this.actionTypes.initSuccess
                });
              } else if ((!_this._callLog.ready || _this._callMonitor && !_this._callMonitor.ready || !_this._accountInfo.ready || _this._contactMatcher && !_this._contactMatcher.ready || _this._activityMatcher && !_this._activityMatcher.ready) && _this.ready) {
                _this.store.dispatch({
                  type: _this.actionTypes.reset
                });
                _this._lastProcessedCalls = null;
                _this._lastProcessedIds = null;
                _this._lastProcessedMonitorCalls = null;
                _this._lastProcessedNumbers = null;
                _this.store.dispatch({
                  type: _this.actionTypes.resetSuccess
                });
              } else if (_this.ready) {
                uniqueNumbers = _this._selectors.uniqueNumbers();

                if (_this._lastProcessedNumbers !== uniqueNumbers) {
                  _this._lastProcessedNumbers = uniqueNumbers;
                  if (_this._contactMatcher && _this._contactMatcher.ready) {
                    _this._contactMatcher.triggerMatch();
                  }
                }
                sessionIds = _this._selectors.sessionIds();

                if (_this._lastProcessedIds !== sessionIds) {
                  _this._lastProcessedIds = sessionIds;
                  if (_this._activityMatcher && _this._activityMatcher.ready) {
                    _this._activityMatcher.triggerMatch();
                  }
                }
                if (_this._callMonitor) {
                  monitorCalls = _this._callMonitor.calls;

                  if (_this._lastProcessedMonitorCalls !== monitorCalls) {
                    endedCalls = (_this._lastProcessedMonitorCalls || []).filter(function (call) {
                      return !monitorCalls.find(function (currentCall) {
                        return call.sessionId === currentCall.sessionId;
                      });
                    });

                    _this._lastProcessedMonitorCalls = monitorCalls;
                    if (endedCalls.length) {
                      _this.store.dispatch({
                        type: _this.actionTypes.addEndedCalls,
                        endedCalls: endedCalls,
                        timestamp: Date.now()
                      });
                    }
                  }
                }
                currentCalls = _this._callLog.calls;

                if (currentCalls !== _this._lastProcessedCalls) {
                  _this._lastProcessedCalls = currentCalls;
                  ids = {};

                  currentCalls.forEach(function (call) {
                    ids[call.sessionId] = true;
                  });
                  shouldRemove = _this.state.endedCalls.filter(function (call) {
                    return ids[call.sessionId];
                  });

                  if (shouldRemove.length) {
                    _this.store.dispatch({
                      type: _this.actionTypes.removeEndedCalls,
                      endedCalls: shouldRemove
                    });
                  }
                }
              }

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this._accountInfo = _ensureExist2.default.call(_this, accountInfo, 'accountInfo');
    _this._callLog = _ensureExist2.default.call(_this, callLog, 'callLog');
    _this._activityMatcher = activityMatcher;
    _this._contactMatcher = contactMatcher;
    _this._callMonitor = callMonitor;
    _this._reducer = (0, _getCallHistoryReducer2.default)(_this.actionTypes);

    _this.addSelector('normalizedCalls', function () {
      return _this._callLog.calls;
    }, function () {
      return _this._accountInfo.countryCode;
    }, function (calls, countryCode) {
      return calls.map(function (call) {
        var callFrom = (0, _extends3.default)({}, call.from);
        if (callFrom.phoneNumber) {
          callFrom.phoneNumber = (0, _normalizeNumber2.default)({
            phoneNumber: callFrom.phoneNumber,
            countryCode: countryCode
          });
        }
        var callTo = (0, _extends3.default)({}, call.to);
        if (callTo.phoneNumber) {
          callTo.phoneNumber = (0, _normalizeNumber2.default)({
            phoneNumber: callTo.phoneNumber,
            countryCode: countryCode
          });
        }
        return (0, _extends3.default)({}, call, {
          from: callFrom,
          to: callTo
        });
      });
    });

    _this.addSelector('calls', _this._selectors.normalizedCalls, function () {
      return _this.state.endedCalls;
    }, function () {
      return _this._contactMatcher && _this._contactMatcher.ready ? _this._contactMatcher.cache : null;
    }, function () {
      return _this._activityMatcher && _this._activityMatcher.ready ? _this._activityMatcher.cache : null;
    }, function (normalizedCalls, endedCalls, contactCache, activityCache) {
      var sessionIds = {};
      return normalizedCalls.map(function (call) {
        sessionIds[call.sessionId] = true;
        var fromNumber = call.from && (call.from.phoneNumber || call.from.extensionNumber);
        var toNumber = call.to && (call.to.phoneNumber || call.to.extensionNumber);
        return (0, _extends3.default)({}, call, {
          fromMatches: fromNumber && contactCache && contactCache.dataMap[fromNumber] || [],
          toMatches: toNumber && contactCache && contactCache.dataMap[toNumber] || [],
          activityMatches: activityCache && activityCache.dataMap[call.sessionId] || []
        });
      }).concat(endedCalls.filter(function (call) {
        return !sessionIds[call.sessionId];
      })).sort(_callLogHelpers.sortByStartTime);
    });

    _this.addSelector('uniqueNumbers', _this._selectors.normalizedCalls, function () {
      return _this.state.endedCalls;
    }, function (normalizedCalls, endedCalls) {
      var output = [];
      var numberMap = {};
      function addIfNotExist(number) {
        if (!numberMap[number]) {
          output.push(number);
          numberMap[number] = true;
        }
      }
      function addNumbersFromCall(call) {
        if (call.from && call.from.phoneNumber) {
          addIfNotExist(call.from.phoneNumber);
        } else if (call.from && call.from.extensionNumber) {
          addIfNotExist(call.from.extensionNumber);
        }
        if (call.to && call.to.phoneNumber) {
          addIfNotExist(call.to.phoneNumber);
        } else if (call.to && call.to.extensionNumber) {
          addIfNotExist(call.to.extensionNumber);
        }
      }
      normalizedCalls.forEach(addNumbersFromCall);
      endedCalls.forEach(addNumbersFromCall);
      return output;
    });

    if (_this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: _this._selectors.uniqueNumbers,
        readyCheckFn: function readyCheckFn() {
          return (!_this._callMonitor || _this._callMonitor.ready) && _this._callLog.ready && _this._accountInfo.ready;
        }
      });
    }

    _this.addSelector('sessionIds', function () {
      return _this._callLog.calls;
    }, function () {
      return _this.state.endedCalls;
    }, function (calls, endedCalls) {
      var sessionIds = {};
      return calls.map(function (call) {
        sessionIds[call.sessionId] = true;
        return call.sessionId;
      }).concat(endedCalls.filter(function (call) {
        return !sessionIds[call.sessionId];
      }).map(function (call) {
        return call.sessionId;
      }));
    });

    if (_this._activityMatcher) {
      _this._activityMatcher.addQuerySource({
        getQueriesFn: _this._selectors.sessionIds,
        readyCheckFn: function readyCheckFn() {
          return (!_this._callMonitor || _this._callMonitor.ready) && _this._callLog.ready;
        }
      });
    }
    return _this;
  }

  (0, _createClass3.default)(CallHistory, [{
    key: 'initialize',
    value: function initialize() {
      this.store.subscribe(this._onStateChange);
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'pending',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.pending;
    }
  }, {
    key: 'calls',
    get: function get() {
      return this._selectors.calls();
    }
  }]);
  return CallHistory;
}(_RcModule3.default);

exports.default = CallHistory;
//# sourceMappingURL=index.js.map
