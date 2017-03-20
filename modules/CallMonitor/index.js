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

require('core-js/fn/array/find');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getCallMonitorReducer = require('./getCallMonitorReducer');

var _getCallMonitorReducer2 = _interopRequireDefault(_getCallMonitorReducer);

var _normalizeNumber = require('../../lib/normalizeNumber');

var _normalizeNumber2 = _interopRequireDefault(_normalizeNumber);

var _callLogHelpers = require('../../lib/callLogHelpers');

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallMonitor = function (_RcModule) {
  (0, _inherits3.default)(CallMonitor, _RcModule);

  function CallMonitor(_ref) {
    var _this2 = this;

    var accountInfo = _ref.accountInfo,
        detailedPresence = _ref.detailedPresence,
        activeCalls = _ref.activeCalls,
        activityMatcher = _ref.activityMatcher,
        contactMatcher = _ref.contactMatcher,
        onRinging = _ref.onRinging,
        onNewCall = _ref.onNewCall,
        onCallUpdated = _ref.onCallUpdated,
        onCallEnded = _ref.onCallEnded,
        options = (0, _objectWithoutProperties3.default)(_ref, ['accountInfo', 'detailedPresence', 'activeCalls', 'activityMatcher', 'contactMatcher', 'onRinging', 'onNewCall', 'onCallUpdated', 'onCallEnded']);
    (0, _classCallCheck3.default)(this, CallMonitor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallMonitor.__proto__ || (0, _getPrototypeOf2.default)(CallMonitor)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._onStateChange = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var uniqueNumbers, sessionIds, oldCalls;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this._accountInfo.ready && _this._detailedPresence.ready && _this._activeCalls.ready && (!_this._contactMatcher || _this._contactMatcher.ready) && (!_this._activityMatcher || _this._activityMatcher.ready) && _this.pending) {
                _this.store.dispatch({
                  type: _this.actionTypes.init
                });
                _this.store.dispatch({
                  type: _this.actionTypes.initSuccess
                });
              } else if ((!_this._accountInfo.ready || !_this._detailedPresence.ready || !_this._activeCalls.ready || _this._contactMatcher && !_this._contactMatcher.ready || _this._activityMatcher && !_this._activityMatcher.ready) && _this.ready) {
                _this.store.dispatch({
                  type: _this.actionTypes.reset
                });
                _this._lastProcessedCalls = null;
                _this._lastProcessedIds = null;
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

                if (_this._lastProcessedCalls !== _this.calls) {
                  oldCalls = _this._lastProcessedCalls && _this._lastProcessedCalls.slice() || [];

                  _this._lastProcessedCalls = _this.calls;

                  _this.calls.forEach(function (call) {
                    var oldCallIndex = oldCalls.findIndex(function (item) {
                      return item.sessionId === call.sessionId;
                    });
                    if (oldCallIndex === -1) {
                      if (typeof _this._onNewCall === 'function') {
                        _this._onNewCall(call);
                      }
                      if (typeof _this._onRinging === 'function' && (0, _callLogHelpers.isRinging)(call)) {
                        _this._onRinging(call);
                      }
                    } else {
                      var oldCall = oldCalls[oldCallIndex];
                      oldCalls.splice(oldCallIndex, 1);
                      if (call.telephonyStatus !== oldCall.telephonyStatus && typeof _this._onCallUpdated === 'function') {
                        _this._onCallUpdated(call);
                      }
                    }
                  });
                  oldCalls.forEach(function (call) {
                    if (typeof _this._onCallEnded === 'function') {
                      _this._onCallEnded(call);
                    }
                  });
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
    _this._detailedPresence = _ensureExist2.default.call(_this, detailedPresence, 'detailedPresence');
    _this._activeCalls = _ensureExist2.default.call(_this, activeCalls, 'activeCalls');
    _this._contactMatcher = contactMatcher;
    _this._activityMatcher = activityMatcher;
    _this._onRinging = onRinging;
    _this._onNewCall = onNewCall;
    _this._onCallUpdated = onCallUpdated;
    _this._onCallEnded = onCallEnded;

    _this._reducer = (0, _getCallMonitorReducer2.default)(_this.actionTypes);
    _this.addSelector('normalizedCalls', function () {
      return _this._detailedPresence.calls;
    }, function () {
      return _this._activeCalls.calls;
    }, function () {
      return _this._accountInfo.countryCode;
    }, function (callsFromPresence, callsFromActiveCalls, countryCode) {
      return callsFromPresence.map(function (call) {
        var activeCall = call.inboundLeg && callsFromActiveCalls.find(function (item) {
          return item.sessionId === call.inboundLeg.sessionId;
        });

        // use account countryCode to normalize number due to API issues [RCINT-3419]
        var fromNumber = (0, _normalizeNumber2.default)({
          phoneNumber: call.from && call.from.phoneNumber,
          countryCode: countryCode
        });
        var toNumber = (0, _normalizeNumber2.default)({
          phoneNumber: call.to && call.to.phoneNumber,
          countryCode: countryCode
        });

        return (0, _extends3.default)({}, call, {
          from: (0, _extends3.default)({}, activeCall && activeCall.to || {}, {
            phoneNumber: fromNumber
          }),
          to: (0, _extends3.default)({}, activeCall && activeCall.from || {}, {
            phoneNumber: toNumber
          }),
          startTime: activeCall && activeCall.startTime || call.startTime
        });
      });
    });
    _this.addSelector('calls', _this._selectors.normalizedCalls, function () {
      return _this._contactMatcher && _this._contactMatcher.ready ? _this._contactMatcher.cache : null;
    }, function () {
      return _this._activityMatcher && _this._activityMatcher.ready ? _this._activityMatcher.cache : null;
    }, function (normalizedCalls, contactCache, activityCache) {
      return normalizedCalls.map(function (call) {
        var fromNumber = call.from && call.from.phoneNumber;
        var toNumber = call.to && call.to.phoneNumber;
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
        }
        if (call.to && call.to.phoneNumber) {
          addIfNotExist(call.to.phoneNumber);
        }
      });
      return output;
    });

    if (_this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: _this._selectors.uniqueNumbers,
        readyCheckFn: function readyCheckFn() {
          return _this._accountInfo.ready && _this._activeCalls.ready && _this._detailedPresence.ready;
        }
      });
    }
    _this.addSelector('sessionIds', function () {
      return _this._detailedPresence.calls;
    }, function (calls) {
      return calls.map(function (call) {
        return call.sessionId;
      });
    });
    if (_this._activityMatcher) {
      _this._activityMatcher.addQuerySource({
        getQueriesFn: _this._selectors.sessionIds,
        readyCheckFn: function readyCheckFn() {
          return _this._detailedPresence.ready;
        }
      });
    }

    _this._lastProcessedNumbers = null;
    _this._lastProcessedCalls = null;
    _this._lastProcessedIds = null;
    return _this;
  }

  (0, _createClass3.default)(CallMonitor, [{
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
  return CallMonitor;
}(_RcModule3.default);

exports.default = CallMonitor;
//# sourceMappingURL=index.js.map
