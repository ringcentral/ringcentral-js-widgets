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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _desc, _value, _class2;

exports.callIdentityFunction = callIdentityFunction;

var _di = require('../../lib/di');

var _LoggerBase2 = require('../../lib/LoggerBase');

var _LoggerBase3 = _interopRequireDefault(_LoggerBase2);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _callLogHelpers = require('../../lib/callLogHelpers');

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getDataReducer = require('./getDataReducer');

var _getDataReducer2 = _interopRequireDefault(_getDataReducer);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

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
 * @function
 * @description Identity function for calls.
 * @param {Object} call - call object
 * @return {String} sessionId
 */
function callIdentityFunction(call) {
  return call.sessionId;
}

/**
 * @class
 * @description call logger module
 */
var CallLogger = (_dec = (0, _di.Module)({
  deps: ['Storage', { dep: 'ActivityMatcher', optional: true }, 'CallHistory', 'CallMonitor', { dep: 'ContactMatcher', optional: true }, { dep: 'TabManager', optional: true }, { dep: 'CallLoggerOptions', optional: true }]
}), _dec(_class = (_class2 = function (_LoggerBase) {
  (0, _inherits3.default)(CallLogger, _LoggerBase);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Storage} params.storage - storage module instance
   * @param {ActivityMatcher} params.activityMatcher - activityMatcher module instance
   * @param {CallHistory} params.callHistory - callHistory module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance
   */
  function CallLogger(_ref) {
    var storage = _ref.storage,
        activityMatcher = _ref.activityMatcher,
        callHistory = _ref.callHistory,
        callMonitor = _ref.callMonitor,
        contactMatcher = _ref.contactMatcher,
        tabManager = _ref.tabManager,
        options = (0, _objectWithoutProperties3.default)(_ref, ['storage', 'activityMatcher', 'callHistory', 'callMonitor', 'contactMatcher', 'tabManager']);
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
    _this._tabManager = tabManager;
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
    key: '_onReset',
    value: function _onReset() {
      this._lastProcessedCalls = null;
      this._lastProcessedEndedCalls = null;
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this.pending && this._callMonitor.ready && (!this._callHistory || this._callHistory.ready) && (!this._tabManager || this._tabManager.ready) && this._contactMatcher.ready && this._activityMatcher.ready && this._readyCheckFunction() && this._storage.ready;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return this.ready && (!this._callMonitor.ready || !this._callMonitor.ready || this._callHistory && !this._callHistory.ready || this._tabManager && !this._tabManager.ready || !this._contactMatcher.ready || !this._activityMatcher.ready || !this._readyCheckFunction() || !this._storage.ready);
    }
  }, {
    key: 'log',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3) {
        var call = _ref3.call,
            options = (0, _objectWithoutProperties3.default)(_ref3, ['call']);
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', (0, _get3.default)(CallLogger.prototype.__proto__ || (0, _getPrototypeOf2.default)(CallLogger.prototype), 'log', this).call(this, (0, _extends3.default)({ item: call }, options)));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function log(_x) {
        return _ref2.apply(this, arguments);
      }

      return log;
    }()
  }, {
    key: '_ensureActive',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var isActive;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = !this._tabManager;

                if (_context2.t0) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 4;
                return this._tabManager.ensureActive();

              case 4:
                _context2.t0 = _context2.sent;

              case 5:
                isActive = _context2.t0;
                return _context2.abrupt('return', isActive);

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _ensureActive() {
        return _ref4.apply(this, arguments);
      }

      return _ensureActive;
    }()
  }, {
    key: '_shouldLogNewCall',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(call) {
        var isActive;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._ensureActive();

              case 2:
                isActive = _context3.sent;
                return _context3.abrupt('return', isActive && this.autoLog && (this.logOnRinging || !(0, _callLogHelpers.isRinging)(call)));

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _shouldLogNewCall(_x2) {
        return _ref5.apply(this, arguments);
      }

      return _shouldLogNewCall;
    }()
  }, {
    key: 'logCall',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref7) {
        var call = _ref7.call,
            contact = _ref7.contact,
            options = (0, _objectWithoutProperties3.default)(_ref7, ['call', 'contact']);
        var inbound, fromEntity, toEntity;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                inbound = (0, _callLogHelpers.isInbound)(call);
                fromEntity = inbound && contact || null;
                toEntity = !inbound && contact || null;
                _context4.next = 5;
                return this.log((0, _extends3.default)({}, options, {
                  call: (0, _extends3.default)({}, call, {
                    duration: Object.prototype.hasOwnProperty.call(call, 'duration') ? call.duration : Math.round((Date.now() - call.startTime) / 1000),
                    result: call.result || call.telephonyStatus
                  }),
                  fromEntity: fromEntity,
                  toEntity: toEntity
                }));

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function logCall(_x3) {
        return _ref6.apply(this, arguments);
      }

      return logCall;
    }()
  }, {
    key: '_autoLogCall',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_ref9) {
        var call = _ref9.call,
            fromEntity = _ref9.fromEntity,
            toEntity = _ref9.toEntity;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.log({
                  call: (0, _extends3.default)({}, call, {
                    duration: Object.prototype.hasOwnProperty.call(call, 'duration') ? call.duration : Math.round((Date.now() - call.startTime) / 1000),
                    result: call.result || call.telephonyStatus
                  }),
                  fromEntity: fromEntity,
                  toEntity: toEntity
                });

              case 2:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _autoLogCall(_x4) {
        return _ref8.apply(this, arguments);
      }

      return _autoLogCall;
    }()
  }, {
    key: '_onNewCall',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(call) {
        var toNumberEntity, fromMatches, toMatches, fromEntity, toEntity;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._shouldLogNewCall(call);

              case 2:
                if (!_context6.sent) {
                  _context6.next = 20;
                  break;
                }

                _context6.next = 5;
                return this._activityMatcher.triggerMatch();

              case 5:
                if (!(!this._activityMatcher.dataMapping[call.sessionId] || !this._activityMatcher.dataMapping[call.sessionId].length)) {
                  _context6.next = 18;
                  break;
                }

                _context6.next = 8;
                return this._contactMatcher.triggerMatch();

              case 8:
                toNumberEntity = call.toNumberEntity || '';
                fromMatches = call.from && call.from.phoneNumber && this._contactMatcher.dataMapping[call.from.phoneNumber] || [];
                toMatches = call.to && call.to.phoneNumber && this._contactMatcher.dataMapping[call.to.phoneNumber] || [];
                fromEntity = fromMatches && fromMatches.length === 1 && fromMatches[0] || null;
                toEntity = null;

                if (toMatches && toMatches.length === 1) {
                  /* eslint { "prefer-destructuring": 0 } */
                  toEntity = toMatches[0];
                } else if (toMatches && toMatches.length > 1 && toNumberEntity !== '') {
                  toEntity = toMatches.find(function (match) {
                    return toNumberEntity === match.id;
                  });
                }

                _context6.next = 16;
                return this._autoLogCall({
                  call: call,
                  fromEntity: fromEntity,
                  toEntity: toEntity
                });

              case 16:
                _context6.next = 20;
                break;

              case 18:
                _context6.next = 20;
                return this._autoLogCall({ call: call });

              case 20:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _onNewCall(_x5) {
        return _ref10.apply(this, arguments);
      }

      return _onNewCall;
    }()
  }, {
    key: '_shouldLogUpdatedCall',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(call) {
        var isActive, activityMatches;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._ensureActive();

              case 2:
                isActive = _context7.sent;

                if (!(isActive && (this.logOnRinging || !(0, _callLogHelpers.isRinging)(call)))) {
                  _context7.next = 10;
                  break;
                }

                if (!this.autoLog) {
                  _context7.next = 6;
                  break;
                }

                return _context7.abrupt('return', true);

              case 6:
                _context7.next = 8;
                return this._activityMatcher.triggerMatch();

              case 8:
                activityMatches = this._activityMatcher.dataMapping[call.sessionId] || [];
                return _context7.abrupt('return', activityMatches.length > 0);

              case 10:
                return _context7.abrupt('return', false);

              case 11:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _shouldLogUpdatedCall(_x6) {
        return _ref11.apply(this, arguments);
      }

      return _shouldLogUpdatedCall;
    }()
  }, {
    key: '_onCallUpdated',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(call) {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._shouldLogUpdatedCall(call);

              case 2:
                if (!_context8.sent) {
                  _context8.next = 5;
                  break;
                }

                _context8.next = 5;
                return this._autoLogCall({ call: call });

              case 5:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _onCallUpdated(_x7) {
        return _ref12.apply(this, arguments);
      }

      return _onCallUpdated;
    }()
  }, {
    key: '_processCalls',
    value: function _processCalls() {
      var _this2 = this;

      if (this.ready) {
        if (this._lastProcessedCalls !== this._callMonitor.calls) {
          var oldCalls = this._lastProcessedCalls && this._lastProcessedCalls.slice() || [];
          this._lastProcessedCalls = this._callMonitor.calls;

          (0, _callLogHelpers.removeDuplicateSelfCalls)(this._lastProcessedCalls).forEach(function (call) {
            var oldCallIndex = oldCalls.findIndex(function (item) {
              return item.sessionId === call.sessionId;
            });

            if (oldCallIndex === -1) {
              _this2._onNewCall(call);
            } else {
              var oldCall = oldCalls[oldCallIndex];
              oldCalls.splice(oldCallIndex, 1);
              if (call.telephonyStatus !== oldCall.telephonyStatus) {
                _this2._onCallUpdated(call);
              }
            }
          });
          oldCalls.forEach(function (call) {
            _this2._onCallUpdated(call);
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
              var callInfo = _this2._callHistory.calls.find(function (item) {
                return item.sessionId === call.sessionId;
              });
              if (callInfo) {
                _this2._onCallUpdated(callInfo);
              }
            }
          });
        }
      }
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return (0, _get3.default)(CallLogger.prototype.__proto__ || (0, _getPrototypeOf2.default)(CallLogger.prototype), '_onStateChange', this).call(this);

              case 2:
                this._processCalls();

              case 3:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function _onStateChange() {
        return _ref13.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: 'setAutoLog',
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(autoLog) {
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (this.ready && autoLog !== this.autoLog) {
                  this.store.dispatch({
                    type: this.actionTypes.setAutoLog,
                    autoLog: autoLog
                  });
                }

              case 1:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function setAutoLog(_x8) {
        return _ref14.apply(this, arguments);
      }

      return setAutoLog;
    }()
  }, {
    key: 'setLogOnRinging',
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(logOnRinging) {
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (this.ready && logOnRinging !== this.logOnRinging) {
                  this.store.dispatch({
                    type: this.actionTypes.setLogOnRinging,
                    logOnRinging: logOnRinging
                  });
                }

              case 1:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function setLogOnRinging(_x9) {
        return _ref15.apply(this, arguments);
      }

      return setLogOnRinging;
    }()
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
}(_LoggerBase3.default), (_applyDecoratedDescriptor(_class2.prototype, 'log', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'log'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'logCall', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'logCall'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'setAutoLog', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'setAutoLog'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'setLogOnRinging', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'setLogOnRinging'), _class2.prototype)), _class2)) || _class);
exports.default = CallLogger;
//# sourceMappingURL=index.js.map
