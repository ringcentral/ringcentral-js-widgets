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

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

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

    var detailedPresence = _ref.detailedPresence,
        callLog = _ref.callLog,
        activeCalls = _ref.activeCalls,
        activityMatcher = _ref.activityMatcher,
        contactMatcher = _ref.contactMatcher,
        regionSettings = _ref.regionSettings,
        options = (0, _objectWithoutProperties3.default)(_ref, ['detailedPresence', 'callLog', 'activeCalls', 'activityMatcher', 'contactMatcher', 'regionSettings']);
    (0, _classCallCheck3.default)(this, CallHistory);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallHistory.__proto__ || (0, _getPrototypeOf2.default)(CallHistory)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._onStateChange = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var uniqueNumbers, sessionIds;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this._callLog.ready && _this._activeCalls.ready && _this._detailedPresence.ready && _this._regionSettings.ready && (!_this._contactMatcher || _this._contactMatcher.ready) && (!_this._activityMatcher || _this._activityMatcher.ready) && _this.pending) {
                _this.store.dispatch({
                  type: _this.actionTypes.init
                });
                _this.store.dispatch({
                  type: _this.actionTypes.initSuccess
                });
              } else if ((!_this._callLog.ready || !_this._activeCalls.ready || !_this._detailedPresence.ready || !_this._regionSettings.ready || _this._contactMatcher && !_this._contactMatcher.ready || _this._activityMatcher && !_this._activityMatcher.ready) && _this.ready) {
                _this.store.dispatch({
                  type: _this.actionTypes.reset
                });
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
              }

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this._activeCalls = _ensureExist2.default.call(_this, activeCalls, 'activeCalls');
    _this._callLog = _ensureExist2.default.call(_this, callLog, 'callLog');
    _this._detailedPresence = _ensureExist2.default.call(_this, detailedPresence, 'detailedPresence');
    // this._activityMatcher = this::ensureExist(activityMatcher, 'activityMatcher');
    // this._contactMatcher = this::ensureExist(contactMatcher, 'contactMatcher');
    _this._regionSettings = _ensureExist2.default.call(_this, regionSettings, 'regionSettings');
    _this._activityMatcher = activityMatcher;
    _this._contactMatcher = contactMatcher;
    _this._reducer = (0, _getCallHistoryReducer2.default)(_this.actionTypes);

    _this.addSelector('filteredCalls', function () {
      return _this._callLog.calls;
    }, function () {
      return _this._activeCalls.calls;
    }, function () {
      return _this._detailedPresence.calls;
    }, function (callsFromCallLog, callsFromActiveCalls, callsFromPresence) {
      var indexMap = {};
      callsFromCallLog.forEach(function (call) {
        indexMap[call.sessionId] = true;
      });
      var presentInPresenceCalls = {};
      callsFromPresence.forEach(function (call) {
        presentInPresenceCalls[call.sessionId] = true;
      });
      return callsFromActiveCalls.filter(function (call) {
        return !indexMap[call.sessionId] && !presentInPresenceCalls[call.sessionId];
      }).concat(callsFromCallLog);
    });
    _this.addSelector('normalizedCalls', _this._selectors.filteredCalls, function () {
      return _this._regionSettings.countryCode;
    }, function () {
      return _this._regionSettings.areaCode;
    }, function (filteredCalls, countryCode, areaCode) {
      return filteredCalls.map(function (call) {
        var callFrom = (0, _extends3.default)({}, call.from);
        if (callFrom.phoneNumber) {
          callFrom.phoneNumber = (0, _normalizeNumber2.default)({
            phoneNumber: callFrom.phoneNumber,
            countryCode: countryCode,
            areaCode: areaCode
          });
        }
        var callTo = (0, _extends3.default)({}, call.to);
        if (callTo.phoneNumber) {
          callTo.phoneNumber = (0, _normalizeNumber2.default)({
            phoneNumber: callTo.phoneNumber,
            countryCode: countryCode,
            areaCode: areaCode
          });
        }
        return (0, _extends3.default)({}, call, {
          from: callFrom,
          to: callTo
        });
      });
    });

    _this.addSelector('calls', _this._selectors.normalizedCalls, function () {
      return _this._contactMatcher && _this._contactMatcher.ready ? _this._contactMatcher.cache : null;
    }, function () {
      return _this._activityMatcher && _this._activityMatcher.ready ? _this._activityMatcher.cache : null;
    }, function (normalizedCalls, contactCache, activityCache) {
      return normalizedCalls.map(function (call) {
        var fromNumber = call.from && (call.from.phoneNumber || call.from.extensionNumber);
        var toNumber = call.to && (call.to.phoneNumber || call.to.extensionNumber);
        return (0, _extends3.default)({}, call, {
          fromMatches: fromNumber && contactCache && contactCache.dataMap[fromNumber] || [],
          toMatches: toNumber && contactCache && contactCache.dataMap[toNumber] || [],
          activityMatches: activityCache && activityCache.dataMap[call.sessionId] || []
        });
      }).sort(_callLogHelpers.sortByStartTime);
    });

    _this.addSelector('uniqueNumbers', _this._selectors.normalizedCalls, function (normalizedCalls) {
      var output = [];
      var numberMap = {};
      function addIfNotExist(number) {
        if (!numberMap[number]) {
          output.push(number);
          numberMap[number] = true;
        }
      }
      normalizedCalls.forEach(function (call) {
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
      });
      return output;
    });

    if (_this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: _this._selectors.uniqueNumbers,
        readyCheckFn: function readyCheckFn() {
          return _this._activeCalls.ready && _this._detailedPresence.ready && _this._callLog.ready && _this._regionSettings.ready;
        }
      });
    }

    _this.addSelector('sessionIds', _this._selectors.filteredCalls, function (filteredCalls) {
      return filteredCalls.map(function (call) {
        return call.sessionId;
      });
    });

    if (_this._activityMatcher) {
      _this._activityMatcher.addQuerySource({
        getQueriesFn: _this._selectors.sessionIds,
        readyCheckFn: function readyCheckFn() {
          return _this._activeCalls.ready && _this._detailedPresence.ready && _this._callLog.ready;
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
      return this.state.status === _moduleStatus2.default.ready;
    }
  }, {
    key: 'pending',
    get: function get() {
      return this.state.status === _moduleStatus2.default.pending;
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
