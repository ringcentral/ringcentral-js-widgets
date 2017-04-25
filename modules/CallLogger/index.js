'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.callIdentityFunction = callIdentityFunction;

var _LoggerBase2 = require('../../lib/LoggerBase');

var _LoggerBase3 = _interopRequireDefault(_LoggerBase2);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _callLogHelpers = require('../../lib/callLogHelpers');

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getDataReducer = require('./getDataReducer');

var _getDataReducer2 = _interopRequireDefault(_getDataReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @description Identity function for calls.
 * @param {Object} call - call object
 * @return {String} sessionId
 */
function callIdentityFunction(call) {
  return call.sessionId;
}

var CallLogger = function (_LoggerBase) {
  (0, _inherits3.default)(CallLogger, _LoggerBase);

  function CallLogger(_ref) {
    var storage = _ref.storage,
        callMonitor = _ref.callMonitor,
        callHistory = _ref.callHistory,
        contactMatcher = _ref.contactMatcher,
        activityMatcher = _ref.activityMatcher,
        options = (0, _objectWithoutProperties3.default)(_ref, ['storage', 'callMonitor', 'callHistory', 'contactMatcher', 'activityMatcher']);
    (0, _classCallCheck3.default)(this, CallLogger);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallLogger.__proto__ || (0, _getPrototypeOf2.default)(CallLogger)).call(this, (0, _extends3.default)({}, options, {
      name: 'callLogger',
      actionTypes: _actionTypes2.default,
      getDataReducer: _getDataReducer2.default,
      identityFunction: callIdentityFunction
    })));

    _this._storage = _ensureExist2.default.call(_this, storage, 'storage');
    _this._callMonitor = _ensureExist2.default.call(_this, callMonitor, 'callMonitor');
    _this._contactMatcher = _ensureExist2.default.call(_this, contactMatcher, 'contactMatcher');
    _this._activityMatcher = _ensureExist2.default.call(_this, activityMatcher, 'activityMatcher');
    _this._callHistory = callHistory;
    _this._storageKey = _this._name + 'Data';
    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: (0, _getDataReducer2.default)(_this.actionTypes)
    });

    _this._lastProcessedCalls = null;
    _this._lastProcessedEndedCalls = null;
    return _this;
  }

  (0, _createClass3.default)(CallLogger, [{
    key: 'addLogProvider',
    value: function addLogProvider(_ref2) {
      var name = _ref2.name,
          logFn = _ref2.logFn,
          readyCheckFn = _ref2.readyCheckFn,
          _ref2$allowAutoLog = _ref2.allowAutoLog,
          allowAutoLog = _ref2$allowAutoLog === undefined ? true : _ref2$allowAutoLog,
          options = (0, _objectWithoutProperties3.default)(_ref2, ['name', 'logFn', 'readyCheckFn', 'allowAutoLog']);

      (0, _get3.default)(CallLogger.prototype.__proto__ || (0, _getPrototypeOf2.default)(CallLogger.prototype), 'addLogProvider', this).call(this, (0, _extends3.default)({
        name: name,
        logFn: logFn,
        readyCheckFn: readyCheckFn,
        allowAutoLog: !!allowAutoLog
      }, options));
    }
  }, {
    key: '_onReset',
    value: function _onReset() {
      this._lastProcessedCalls = null;
      this._lastProcessedEndedCalls = null;
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this.pending && this._callMonitor.ready && (!this._callHistory || this._callHistory.ready) && this._contactMatcher.ready && this._activityMatcher.ready && this.logProvidersReady && this._storage.ready;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return this.ready && (!this._callMonitor.ready || this._callMonitor && !this._callMonitor.ready || this._callHistory && !this._callHistory.ready || !this._contactMatcher.ready || !this._activityMatcher.ready || !this.logProvidersReady || !this._storage.ready);
    }
  }, {
    key: 'log',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref4) {
        var call = _ref4.call,
            name = _ref4.name,
            options = (0, _objectWithoutProperties3.default)(_ref4, ['call', 'name']);
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', (0, _get3.default)(CallLogger.prototype.__proto__ || (0, _getPrototypeOf2.default)(CallLogger.prototype), 'log', this).call(this, (0, _extends3.default)({ item: call, name: name }, options)));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function log(_x) {
        return _ref3.apply(this, arguments);
      }

      return log;
    }()
  }, {
    key: '_shouldLogNewCall',
    value: function _shouldLogNewCall(call) {
      return this.autoLog && (this.logOnRinging || !(0, _callLogHelpers.isRinging)(call));
    }
  }, {
    key: 'logCall',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref6) {
        var call = _ref6.call,
            name = _ref6.name,
            contact = _ref6.contact,
            options = (0, _objectWithoutProperties3.default)(_ref6, ['call', 'name', 'contact']);
        var inbound, fromEntity, toEntity;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                inbound = (0, _callLogHelpers.isInbound)(call);
                fromEntity = inbound && contact || null;
                toEntity = !inbound && contact || null;
                _context2.next = 5;
                return this.log((0, _extends3.default)({}, options, {
                  call: (0, _extends3.default)({}, call, {
                    duration: Object.prototype.hasOwnProperty.call(call, 'duration') ? call.duration : Math.round((Date.now() - call.startTime) / 1000),
                    result: call.result || call.telephonyStatus
                  }),
                  name: name,
                  fromEntity: fromEntity,
                  toEntity: toEntity
                }));

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function logCall(_x2) {
        return _ref5.apply(this, arguments);
      }

      return logCall;
    }()
  }, {
    key: '_autoLogCall',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref8) {
        var _this2 = this;

        var call = _ref8.call,
            fromEntity = _ref8.fromEntity,
            toEntity = _ref8.toEntity;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _promise2.default.all([].concat((0, _toConsumableArray3.default)(this._logProviders.keys())).filter(function (name) {
                  var provider = _this2._logProviders.get(name);
                  return provider.allowAutoLog && provider.readyCheckFn();
                }).map(function (name) {
                  return _this2.log({
                    call: (0, _extends3.default)({}, call, {
                      duration: Object.prototype.hasOwnProperty.call(call, 'duration') ? call.duration : Math.round((Date.now() - call.startTime) / 1000),
                      result: call.result || call.telephonyStatus
                    }),
                    name: name,
                    fromEntity: fromEntity,
                    toEntity: toEntity
                  });
                }));

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _autoLogCall(_x3) {
        return _ref7.apply(this, arguments);
      }

      return _autoLogCall;
    }()
  }, {
    key: '_onNewCall',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(call) {
        var fromMatches, toMatches, fromEntity, toEntity;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this._shouldLogNewCall(call)) {
                  _context4.next = 16;
                  break;
                }

                _context4.next = 3;
                return this._activityMatcher.triggerMatch();

              case 3:
                if (!(!this._activityMatcher.dataMapping[call.sessionId] || !this._activityMatcher.dataMapping[call.sessionId].length)) {
                  _context4.next = 14;
                  break;
                }

                _context4.next = 6;
                return this._contactMatcher.triggerMatch();

              case 6:
                fromMatches = call.from && call.from.phoneNumber && this._contactMatcher.dataMapping[call.from.phoneNumber] || [];
                toMatches = call.to && call.to.phoneNumber && this._contactMatcher.dataMapping[call.to.phoneNumber] || [];
                fromEntity = fromMatches && fromMatches.length === 1 && fromMatches[0] || null;
                toEntity = toMatches && toMatches.length === 1 && toMatches[0] || null;
                _context4.next = 12;
                return this._autoLogCall({
                  call: call,
                  fromEntity: fromEntity,
                  toEntity: toEntity
                });

              case 12:
                _context4.next = 16;
                break;

              case 14:
                _context4.next = 16;
                return this._autoLogCall({ call: call });

              case 16:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _onNewCall(_x4) {
        return _ref9.apply(this, arguments);
      }

      return _onNewCall;
    }()
  }, {
    key: '_shouldLogUpdatedCall',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(call) {
        var activityMatches;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(this.logOnRinging || !(0, _callLogHelpers.isRinging)(call))) {
                  _context5.next = 7;
                  break;
                }

                if (!this.autoLog) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt('return', true);

              case 3:
                _context5.next = 5;
                return this._activityMatcher.triggerMatch();

              case 5:
                activityMatches = this._activityMatcher.dataMapping[call.sessionId] || [];
                return _context5.abrupt('return', activityMatches.length > 0);

              case 7:
                return _context5.abrupt('return', false);

              case 8:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _shouldLogUpdatedCall(_x5) {
        return _ref10.apply(this, arguments);
      }

      return _shouldLogUpdatedCall;
    }()
  }, {
    key: '_onCallUpdated',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(call) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._shouldLogUpdatedCall(call);

              case 2:
                if (!_context6.sent) {
                  _context6.next = 5;
                  break;
                }

                _context6.next = 5;
                return this._autoLogCall({ call: call });

              case 5:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _onCallUpdated(_x6) {
        return _ref11.apply(this, arguments);
      }

      return _onCallUpdated;
    }()
  }, {
    key: '_processCalls',
    value: function _processCalls() {
      var _this3 = this;

      if (this.ready) {
        if (this._lastProcessedCalls !== this._callMonitor.calls) {
          var oldCalls = this._lastProcessedCalls && this._lastProcessedCalls.slice() || [];
          this._lastProcessedCalls = this._callMonitor.calls;

          this._lastProcessedCalls.forEach(function (call) {
            var oldCallIndex = oldCalls.findIndex(function (item) {
              return item.sessionId === call.sessionId;
            });

            if (oldCallIndex === -1) {
              _this3._onNewCall(call);
            } else {
              var oldCall = oldCalls[oldCallIndex];
              oldCalls.splice(oldCallIndex, 1);
              if (call.telephonyStatus !== oldCall.telephonyStatus) {
                _this3._onCallUpdated(call);
              }
            }
          });
          oldCalls.forEach(function (call) {
            _this3._onCallUpdated(call);
          });
        }
        if (this._callHistory && this._lastProcessedEndedCalls !== this._callHistory.recentlyEndedCalls) {
          var _oldCalls = this._lastProcessedEndedCalls && this._lastProcessedEndedCalls.slice() || [];
          this._lastProcessedEndedCalls = this._callHistory.recentlyEndedCalls;
          var currentSessions = {};
          this._lastProcessedEndedCalls.forEach(function (call) {
            currentSessions[call.sessionId] = true;
          });
          _oldCalls.forEach(function (call) {
            if (!currentSessions[call.sessionId]) {
              // call log updated
              var callInfo = _this3._callHistory.calls.find(function (item) {
                return item.sessionId === call.sessionId;
              });
              if (callInfo) {
                _this3._onCallUpdated(callInfo);
              }
            }
          });
        }
      }
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return (0, _get3.default)(CallLogger.prototype.__proto__ || (0, _getPrototypeOf2.default)(CallLogger.prototype), '_onStateChange', this).call(this);

              case 2:
                this._processCalls();

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _onStateChange() {
        return _ref12.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: 'setAutoLog',
    value: function setAutoLog(autoLog) {
      if (this.ready && autoLog !== this.autoLog) {
        this.store.dispatch({
          type: this.actionTypes.setAutoLog,
          autoLog: autoLog
        });
      }
    }
  }, {
    key: 'setLogOnRinging',
    value: function setLogOnRinging(logOnRinging) {
      if (this.ready && logOnRinging !== this.logOnRinging) {
        this.store.dispatch({
          type: this.actionTypes.setLogOnRinging,
          logOnRinging: logOnRinging
        });
      }
    }
  }, {
    key: 'autoLog',
    get: function get() {
      return this._storage.getItem(this._storageKey).autoLog;
    }
  }, {
    key: 'logOnRinging',
    get: function get() {
      return this._storage.getItem(this._storageKey).logOnRinging;
    }
  }]);
  return CallLogger;
}(_LoggerBase3.default);

exports.default = CallLogger;
//# sourceMappingURL=index.js.map
