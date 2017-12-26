'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

var _reselect = require('reselect');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

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

var _getter = require('../../lib/getter');

var _getter2 = _interopRequireDefault(_getter);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  (0, _defineProperty2.default)(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

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
 * @description Call history managing module
 */
var CallHistory = (_dec = (0, _di.Module)({
  deps: ['AccountInfo', 'CallLog', 'CallMonitor', { dep: 'ActivityMatcher', optional: true }, { dep: 'ContactMatcher', optional: true }, { dep: 'CallHistoryOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(CallHistory, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {AccountInfo} params.accountInfo - accountInfo module instance
   * @param {CallLog} params.callLog - callLog module instance
   * @param {CallMonitor} params.callMonitor - callMonitor module instance
   * @param {ActivityMatcher} params.activityMatcher - activityMatcher module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance
   */
  function CallHistory(_ref) {
    var accountInfo = _ref.accountInfo,
        callLog = _ref.callLog,
        callMonitor = _ref.callMonitor,
        activityMatcher = _ref.activityMatcher,
        contactMatcher = _ref.contactMatcher,
        options = (0, _objectWithoutProperties3.default)(_ref, ['accountInfo', 'callLog', 'callMonitor', 'activityMatcher', 'contactMatcher']);
    (0, _classCallCheck3.default)(this, CallHistory);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallHistory.__proto__ || (0, _getPrototypeOf2.default)(CallHistory)).call(this, (0, _extends3.default)({}, options)));

    _initDefineProp(_this, 'normalizedCalls', _descriptor, _this);

    _initDefineProp(_this, 'calls', _descriptor2, _this);

    _initDefineProp(_this, 'uniqueNumbers', _descriptor3, _this);

    _initDefineProp(_this, 'sessionIds', _descriptor4, _this);

    _this._accountInfo = _ensureExist2.default.call(_this, accountInfo, 'accountInfo');
    _this._callLog = _ensureExist2.default.call(_this, callLog, 'callLog');
    _this._activityMatcher = activityMatcher;
    _this._contactMatcher = contactMatcher;
    _this._callMonitor = callMonitor;
    _this._reducer = (0, _getCallHistoryReducer2.default)(_this.actionTypes);

    if (_this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.uniqueNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return (!_this._callMonitor || _this._callMonitor.ready) && _this._callLog.ready && _this._accountInfo.ready;
        }
      });
    }
    if (_this._activityMatcher) {
      _this._activityMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.sessionIds;
        },
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
                  this._initModuleStatus();
                } else if (this._shouldReset()) {
                  this._resetModuleStatus();
                } else if (this.ready) {
                  this._processCallHistory();
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
      return this._callLog.ready && (!this._callMonitor || this._callMonitor.ready) && this._accountInfo.ready && (!this._contactMatcher || this._contactMatcher.ready) && (!this._activityMatcher || this._activityMatcher.ready) && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!this._callLog.ready || this._callMonitor && !this._callMonitor.ready || !this._accountInfo.ready || this._contactMatcher && !this._contactMatcher.ready || this._activityMatcher && !this._activityMatcher.ready) && this.ready;
    }
  }, {
    key: '_shouldTriggerContactMatch',
    value: function _shouldTriggerContactMatch(uniqueNumbers) {
      if (this._lastProcessedNumbers !== uniqueNumbers) {
        this._lastProcessedNumbers = uniqueNumbers;
        if (this._contactMatcher && this._contactMatcher.ready) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: '_shouldTriggerActivityMatch',
    value: function _shouldTriggerActivityMatch(sessionIds) {
      if (this._lastProcessedIds !== sessionIds) {
        this._lastProcessedIds = sessionIds;
        if (this._activityMatcher && this._activityMatcher.ready) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: '_getEndedCalls',
    value: function _getEndedCalls() {
      if (this._callMonitor) {
        var monitorCalls = this._callMonitor.calls;
        var callLogCalls = this._callLog.calls;
        if (this._lastProcessedMonitorCalls !== monitorCalls) {
          var endedCalls = (this._lastProcessedMonitorCalls || []).filter(function (call) {
            return !monitorCalls.find(function (currentCall) {
              return call.sessionId === currentCall.sessionId;
            }) &&
            // if the call's callLog has been fetch, skip
            !callLogCalls.find(function (currentCall) {
              return call.sessionId === currentCall.sessionId;
            });
          });
          this._lastProcessedMonitorCalls = monitorCalls;
          return endedCalls;
        }
      }
      return null;
    }
  }, {
    key: '_shouldRemoveEndedCalls',
    value: function _shouldRemoveEndedCalls() {
      var currentCalls = this._callLog.calls;
      if (currentCalls !== this._lastProcessedCalls) {
        this._lastProcessedCalls = currentCalls;
        var ids = {};
        currentCalls.forEach(function (call) {
          ids[call.sessionId] = true;
        });
        return this.recentlyEndedCalls.filter(function (call) {
          return ids[call.sessionId];
        });
      }
      return null;
    }
  }, {
    key: '_processCallHistory',
    value: function _processCallHistory() {
      var uniqueNumbers = this.uniqueNumbers;
      if (this._shouldTriggerContactMatch(uniqueNumbers)) {
        this._contactMatcher.triggerMatch();
      }
      var sessionIds = this.sessionIds;
      if (this._shouldTriggerActivityMatch(sessionIds)) {
        this._activityMatcher.triggerMatch();
      }

      var endedCalls = this._getEndedCalls();
      if (endedCalls && endedCalls.length) {
        this._addEndedCalls(endedCalls);
      }

      var shouldRemove = this._shouldRemoveEndedCalls();
      if (shouldRemove && shouldRemove.length) {
        this._removeEndedCalls(shouldRemove);
      }
    }
  }, {
    key: '_initModuleStatus',
    value: function _initModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.init
      });
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    }
  }, {
    key: '_resetModuleStatus',
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.reset
      });
      this._lastProcessedCalls = null;
      this._lastProcessedIds = null;
      this._lastProcessedMonitorCalls = null;
      this._lastProcessedNumbers = null;
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: '_addEndedCalls',
    value: function _addEndedCalls(endedCalls) {
      endedCalls.map(function (call) {
        call.result = 'Disconnected';
        return call;
      });
      this.store.dispatch({
        type: this.actionTypes.addEndedCalls,
        endedCalls: endedCalls,
        timestamp: Date.now()
      });
      this._callLog.sync();
    }
  }, {
    key: '_removeEndedCalls',
    value: function _removeEndedCalls(endedCalls) {
      this.store.dispatch({
        type: this.actionTypes.removeEndedCalls,
        endedCalls: endedCalls
      });
    }

    // for track click to sms in call history

  }, {
    key: 'onClickToSMS',
    value: function onClickToSMS() {
      this.store.dispatch({
        type: this.actionTypes.clickToSMS
      });
    }
    // for track click to call in call history

  }, {
    key: 'onClickToCall',
    value: function onClickToCall() {
      this.store.dispatch({
        type: this.actionTypes.clickToCall
      });
    }
  }, {
    key: '_actionTypes',
    get: function get() {
      return _actionTypes2.default;
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
    key: 'recentlyEndedCalls',
    get: function get() {
      return this.state.endedCalls;
    }
  }]);
  return CallHistory;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'onClickToSMS', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'onClickToSMS'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'onClickToCall', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'onClickToCall'), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, 'normalizedCalls', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return (0, _reselect.createSelector)(function () {
      return _this3._callLog.calls;
    }, function () {
      return _this3._accountInfo.countryCode;
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
      }).sort(_callLogHelpers.sortByStartTime);
    });
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'calls', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return (0, _reselect.createSelector)(function () {
      return _this4.normalizedCalls;
    }, function () {
      return _this4.state.endedCalls;
    }, function () {
      return _this4._contactMatcher && _this4._contactMatcher.dataMapping;
    }, function () {
      return _this4._activityMatcher && _this4._activityMatcher.dataMapping;
    }, function () {
      return _this4._callMonitor && _this4._callMonitor.callMatched;
    }, function (normalizedCalls, endedCalls) {
      var contactMapping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var activityMapping = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var callMatched = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      var sessionIds = {};
      var calls = normalizedCalls.map(function (call) {
        sessionIds[call.sessionId] = true;
        var fromNumber = call.from && (call.from.phoneNumber || call.from.extensionNumber);
        var toNumber = call.to && (call.to.phoneNumber || call.to.extensionNumber);
        var fromMatches = fromNumber && contactMapping[fromNumber] || [];
        var toMatches = toNumber && contactMapping[toNumber] || [];
        var activityMatches = activityMapping[call.sessionId] || [];
        var matched = callMatched[call.sessionId];
        return (0, _extends3.default)({}, call, {
          fromMatches: fromMatches,
          toMatches: toMatches,
          activityMatches: activityMatches,
          toNumberEntity: matched
        });
      });
      return [].concat((0, _toConsumableArray3.default)(endedCalls.filter(function (call) {
        return !sessionIds[call.sessionId];
      }).sort(_callLogHelpers.sortByStartTime)), (0, _toConsumableArray3.default)(calls));
    });
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'uniqueNumbers', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return (0, _reselect.createSelector)(function () {
      return _this5.normalizedCalls;
    }, function () {
      return _this5.state.endedCalls;
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
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'sessionIds', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return (0, _reselect.createSelector)(function () {
      return _this6._callLog.calls;
    }, function () {
      return _this6.state.endedCalls;
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
  }
})), _class2)) || _class);
exports.default = CallHistory;
//# sourceMappingURL=index.js.map
