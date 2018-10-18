'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

require('core-js/fn/array/find');

var _reselect = require('reselect');

var _di = require('../../lib/di');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getCallMonitorReducer = require('./getCallMonitorReducer');

var _getCallMonitorReducer2 = _interopRequireDefault(_getCallMonitorReducer);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _normalizeNumber = require('../../lib/normalizeNumber');

var _normalizeNumber2 = _interopRequireDefault(_normalizeNumber);

var _callMonitorHelper = require('./callMonitorHelper');

var _getter = require('../../lib/getter');

var _getter2 = _interopRequireDefault(_getter);

var _callLogHelpers = require('../../lib/callLogHelpers');

var _webphoneHelper = require('../Webphone/webphoneHelper');

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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

/**
 * @class
 * @description active calls monitor module
 */
var CallMonitor = (_dec = (0, _di.Module)({
  deps: ['AccountInfo', 'Storage', 'DetailedPresence', { dep: 'ContactMatcher', optional: true }, { dep: 'Webphone', optional: true }, { dep: 'Call', optional: true }, { dep: 'ConferenceCall', optional: true }, { dep: 'ActivityMatcher', optional: true }, { dep: 'CallMonitorOptions', optional: true }, { dep: 'TabManager', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(CallMonitor, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Call} params.call - call module instance
   * @param {ConferenceCall} params.conferenceCall - conference call module instance
   * @param {AccountInfo} params.accountInfo - accountInfo module instance
   * @param {DetailedPresence} params.detailedPresence - detailedPresence module instance
   * @param {ActivityMatcher} params.activityMatcher - activityMatcher module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance
   * @param {Webphone} params.webphone - webphone module instance
   * @param {Storage} params.storage - storage module instance
   * @param {Function} params.onRinging - function on ring
   * @param {Function} params.onNewCall - function on new call
   * @param {Function} params.onCallUpdated - function on call updated
   * @param {Function} params.onCallEnded - function on call ended
   */
  function CallMonitor(_ref) {
    var call = _ref.call,
        conferenceCall = _ref.conferenceCall,
        accountInfo = _ref.accountInfo,
        detailedPresence = _ref.detailedPresence,
        activityMatcher = _ref.activityMatcher,
        contactMatcher = _ref.contactMatcher,
        tabManager = _ref.tabManager,
        webphone = _ref.webphone,
        onRinging = _ref.onRinging,
        onNewCall = _ref.onNewCall,
        onCallUpdated = _ref.onCallUpdated,
        onCallEnded = _ref.onCallEnded,
        storage = _ref.storage,
        options = (0, _objectWithoutProperties3.default)(_ref, ['call', 'conferenceCall', 'accountInfo', 'detailedPresence', 'activityMatcher', 'contactMatcher', 'tabManager', 'webphone', 'onRinging', 'onNewCall', 'onCallUpdated', 'onCallEnded', 'storage']);
    (0, _classCallCheck3.default)(this, CallMonitor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallMonitor.__proto__ || (0, _getPrototypeOf2.default)(CallMonitor)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _initDefineProp(_this, 'ringoutRingCalls', _descriptor, _this);

    _initDefineProp(_this, 'ringoutCurrentCalls', _descriptor2, _this);

    _initDefineProp(_this, 'ringoutOnHoldCalls', _descriptor3, _this);

    _this._call = call;
    _this._conferenceCall = conferenceCall;
    _this._accountInfo = _ensureExist2.default.call(_this, accountInfo, 'accountInfo');
    _this._detailedPresence = _ensureExist2.default.call(_this, detailedPresence, 'detailedPresence');
    _this._contactMatcher = contactMatcher;
    _this._activityMatcher = activityMatcher;
    _this._tabManager = tabManager;
    _this._webphone = webphone;
    _this._onRinging = onRinging;
    _this._onNewCall = onNewCall;
    _this._onCallUpdated = onCallUpdated;
    _this._onCallEnded = onCallEnded;
    _this._storage = _ensureExist2.default.call(_this, storage, 'storage');
    _this._callMatchedKey = 'callMatched';

    _this._reducer = (0, _getCallMonitorReducer2.default)(_this.actionTypes);

    _this._storage.registerReducer({
      key: _this._callMatchedKey,
      reducer: (0, _getCallMonitorReducer.getCallMatchedReducer)(_this.actionTypes)
    });

    var _normalizedCalls = void 0;
    _this.addSelector('normalizedCalls', function () {
      return _this._detailedPresence.calls;
    }, function () {
      return _this._accountInfo.countryCode;
    }, function () {
      return _this._webphone && _this._webphone.sessions;
    }, function () {
      return _this._webphone && _this._webphone.cachedSessions;
    }, function (callsFromPresence, countryCode, sessions, cachedSessions) {
      // match cached calls
      var cachedCalls = [];
      if (_normalizedCalls && cachedSessions && cachedSessions.length) {
        cachedCalls = _normalizedCalls.filter(function (x) {
          return x.webphoneSession && cachedSessions.find(function (i) {
            return i.id === x.webphoneSession.id;
          });
        });
      }

      // combine
      var combinedCalls = [].concat((0, _toConsumableArray3.default)(callsFromPresence)); // clone
      cachedCalls.forEach(function (cachedCall) {
        if (!callsFromPresence.find(function (x) {
          return x.id === cachedCall.id;
        })) {
          combinedCalls.push(cachedCall);
        }
      });

      // mapping and sort
      var theSessions = sessions || [];
      _normalizedCalls = combinedCalls.map(function (callItem) {
        // use account countryCode to normalize number due to API issues [RCINT-3419]
        var fromNumber = (0, _normalizeNumber2.default)({
          phoneNumber: callItem.from && callItem.from.phoneNumber,
          countryCode: countryCode
        });
        var toNumber = (0, _normalizeNumber2.default)({
          phoneNumber: callItem.to && callItem.to.phoneNumber,
          countryCode: countryCode
        });
        var webphoneSession = (0, _callMonitorHelper.matchWephoneSessionWithAcitveCall)(theSessions, callItem);
        theSessions = theSessions.filter(function (x) {
          return x !== webphoneSession;
        });
        return (0, _extends3.default)({}, callItem, {
          from: {
            phoneNumber: fromNumber
          },
          to: {
            phoneNumber: toNumber
          },
          startTime: webphoneSession && webphoneSession.startTime || callItem.startTime,
          webphoneSession: webphoneSession
        });
      }).sort(function (l, r) {
        return (0, _webphoneHelper.sortByLastActiveTimeDesc)(l.webphoneSession, r.webphoneSession);
      });

      return _normalizedCalls;
    });

    _this.addSelector('allCalls', _this._selectors.normalizedCalls, function () {
      return _this._contactMatcher && _this._contactMatcher.dataMapping;
    }, function () {
      return _this._activityMatcher && _this._activityMatcher.dataMapping;
    }, function () {
      return _this.callMatched;
    }, function (normalizedCalls) {
      var contactMapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var activityMapping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callMatched = arguments[3];

      var calls = normalizedCalls.map(function (callItem) {
        var fromNumber = callItem.from && callItem.from.phoneNumber;
        var toNumber = callItem.to && callItem.to.phoneNumber;
        var fromMatches = fromNumber && contactMapping[fromNumber] || [];
        var toMatches = toNumber && contactMapping[toNumber] || [];
        var toNumberEntity = callMatched[callItem.sessionId];
        return (0, _extends3.default)({}, callItem, {
          fromMatches: fromMatches,
          toMatches: toMatches,
          activityMatches: activityMapping[callItem.sessionId] || [],
          toNumberEntity: toNumberEntity
        });
      });
      return calls;
    });

    _this.addSelector('calls', _this._selectors.allCalls, function () {
      return _this._conferenceCall && _this._conferenceCall.isMerging;
    }, function (calls, isMerging) {
      return calls.filter(function (callItem) {
        // filtering out the conferece during merging
        if (isMerging) {
          return !(0, _webphoneHelper.isConferenceSession)(callItem.webphoneSession);
        }
        return true;
      });
    });

    _this.addSelector('activeRingCalls', _this._selectors.calls, function (calls) {
      return calls.filter(function (callItem) {
        return callItem.webphoneSession && (0, _webphoneHelper.isRing)(callItem.webphoneSession);
      });
    });

    _this.addSelector('_activeOnHoldCalls', _this._selectors.calls, function (calls) {
      return calls.filter(function (callItem) {
        return callItem.webphoneSession && (0, _webphoneHelper.isOnHold)(callItem.webphoneSession);
      });
    });

    _this.addSelector('_activeCurrentCalls', _this._selectors.calls, function (calls) {
      return calls.filter(function (callItem) {
        return callItem.webphoneSession && !(0, _webphoneHelper.isOnHold)(callItem.webphoneSession) && !(0, _webphoneHelper.isRing)(callItem.webphoneSession);
      });
    });

    _this.addSelector('activeOnHoldCalls', _this._selectors._activeOnHoldCalls, _this._selectors._activeCurrentCalls, function (_activeOnHoldCalls, _activeCurrentCalls) {
      return _activeOnHoldCalls.length && !_activeCurrentCalls.length ? _activeOnHoldCalls.slice(1) : _activeOnHoldCalls;
    });

    _this.addSelector('activeCurrentCalls', _this._selectors._activeCurrentCalls, _this._selectors._activeOnHoldCalls, function (_activeCurrentCalls, _activeOnHoldCalls) {
      return !_activeCurrentCalls.length && _activeOnHoldCalls.length ? _activeOnHoldCalls.slice(0, 1) : _activeCurrentCalls;
    });

    _this.addSelector('otherDeviceCalls', _this._selectors.calls, function () {
      return _this._webphone && _this._webphone.lastEndedSessions;
    }, function (calls, lastEndedSessions) {
      var sessionsCache = lastEndedSessions;
      return calls.filter(function (callItem) {
        if (callItem.webphoneSession) {
          return false;
        }
        if (!sessionsCache) {
          return true;
        }
        var endCall = (0, _callMonitorHelper.matchWephoneSessionWithAcitveCall)(sessionsCache, callItem);
        sessionsCache = sessionsCache.filter(function (x) {
          return x !== endCall;
        });
        return !endCall;
      });
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
      normalizedCalls.forEach(function (callItem) {
        if (callItem.from && callItem.from.phoneNumber) {
          addIfNotExist(callItem.from.phoneNumber);
        }
        if (callItem.to && callItem.to.phoneNumber) {
          addIfNotExist(callItem.to.phoneNumber);
        }
      });
      return output;
    });

    if (_this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: _this._selectors.uniqueNumbers,
        readyCheckFn: function readyCheckFn() {
          return _this._accountInfo.ready && _this._detailedPresence.ready;
        }
      });
    }

    _this.addSelector('sessionIds', function () {
      return _this._detailedPresence.calls;
    }, function (calls) {
      return calls.map(function (callItem) {
        return callItem.sessionId;
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
    key: '_onStateChange',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this2 = this;

        var uniqueNumbers, sessionIds, oldCalls, entities;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if ((!this._call || this._call.ready) && (!this._conferenceCall || this._conferenceCall.ready) && this._accountInfo.ready && this._detailedPresence.ready && (!this._contactMatcher || this._contactMatcher.ready) && (!this._activityMatcher || this._activityMatcher.ready) && (!this._tabManager || this._tabManager.ready) && this._storage.ready && this.pending) {
                  this.store.dispatch({
                    type: this.actionTypes.init
                  });
                  this.store.dispatch({
                    type: this.actionTypes.initSuccess
                  });
                } else if ((this._call && !this._call.ready || this._conferenceCall && !this._conferenceCall.ready || !this._accountInfo.ready || !this._detailedPresence.ready || this._contactMatcher && !this._contactMatcher.ready || this._activityMatcher && !this._activityMatcher.ready || this._tabManager && !this._tabManager.ready || !this._storage.ready) && this.ready) {
                  this.store.dispatch({
                    type: this.actionTypes.reset
                  });
                  this._lastProcessedCalls = null;
                  this._lastProcessedIds = null;
                  this._lastProcessedNumbers = null;
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                } else if (this.ready) {
                  uniqueNumbers = this._selectors.uniqueNumbers();

                  if (this._lastProcessedNumbers !== uniqueNumbers && (!this._tabManager || this._tabManager.active)) {
                    this._lastProcessedNumbers = uniqueNumbers;
                    if (this._contactMatcher && this._contactMatcher.ready) {
                      this._contactMatcher.triggerMatch();
                    }
                  }
                  sessionIds = this._selectors.sessionIds();

                  if (this._lastProcessedIds !== sessionIds && (!this._tabManager || this._tabManager.active)) {
                    this._lastProcessedIds = sessionIds;
                    if (this._activityMatcher && this._activityMatcher.ready) {
                      this._activityMatcher.triggerMatch();
                    }
                  }

                  if (this._lastProcessedCalls !== this.calls) {
                    oldCalls = this._lastProcessedCalls && this._lastProcessedCalls.slice() || [];


                    this._lastProcessedCalls = this.calls;

                    // no ringing calls
                    if (this._call && oldCalls.length !== 0 && this.calls.length === 0 && this._call.toNumberEntities && this._call.toNumberEntities.length !== 0) {
                      // console.log('no calls clean to number:');
                      this._call.cleanToNumberEntities();
                    }

                    entities = this._call ? this._call.toNumberEntities.sort(_callLogHelpers.sortByStartTime) : [];
                    // const matchedMap = {};

                    this.calls.forEach(function (call) {
                      var oldCallIndex = oldCalls.findIndex(function (item) {
                        return item.sessionId === call.sessionId;
                      });
                      if (oldCallIndex === -1) {
                        if (typeof _this2._onNewCall === 'function') {
                          _this2._onNewCall(call);
                        }
                        if (typeof _this2._onRinging === 'function' && (0, _callLogHelpers.isRinging)(call)) {
                          _this2._onRinging(call);
                        }
                      } else {
                        var oldCall = oldCalls[oldCallIndex];
                        oldCalls.splice(oldCallIndex, 1);
                        if ((call.telephonyStatus !== oldCall.telephonyStatus || (oldCall.from && oldCall.from.phoneNumber) !== (call.from && call.from.phoneNumber)) && typeof _this2._onCallUpdated === 'function') {
                          _this2._onCallUpdated(call);
                        }
                      }
                      entities.find(function (entity, index) {
                        var toEntity = call.toMatches.find(function (toMatch) {
                          return toMatch.id === entity.entityId;
                        });
                        if (toEntity !== undefined) {
                          entities = _this2._removeMatched(index, entities);
                          _this2._setMatchedData({
                            sessionId: call.sessionId,
                            toEntityId: toEntity.id
                          });
                          return true;
                        }
                        return false;
                      });
                    });

                    oldCalls.forEach(function (call) {
                      if (typeof _this2._onCallEnded === 'function') {
                        _this2._onCallEnded(call);
                      }
                    });
                  }
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
    key: 'initialize',
    value: function initialize() {
      var _this3 = this;

      this.store.subscribe(function () {
        return _this3._onStateChange();
      });
    }
  }, {
    key: '_removeMatched',
    value: function _removeMatched(index, entities) {
      console.log('removeMatched:', index);
      entities.splice(index, 1);
      console.log('entities after splice:', entities);
      return entities;
    }
  }, {
    key: '_setMatchedData',
    value: function _setMatchedData(matched) {
      this.store.dispatch((0, _extends3.default)({
        type: this.actionTypes.setData
      }, matched));
    }
    // user action track funtions

  }, {
    key: 'callItemClickTrack',
    value: function callItemClickTrack() {
      this.store.dispatch({
        type: this.actionTypes.callItemClickTrack
      });
    }
  }, {
    key: 'allCallsClickHoldTrack',
    value: function allCallsClickHoldTrack() {
      this.store.dispatch({
        type: this.actionTypes.allCallsClickHoldTrack
      });
    }
  }, {
    key: 'allCallsClickHangupTrack',
    value: function allCallsClickHangupTrack() {
      this.store.dispatch({
        type: this.actionTypes.allCallsClickHangupTrack
      });
    }
  }, {
    key: 'allCallsClickRejectTrack',
    value: function allCallsClickRejectTrack() {
      this.store.dispatch({
        type: this.actionTypes.allCallsClickRejectTrack
      });
    }
  }, {
    key: 'callControlClickAddTrack',
    value: function callControlClickAddTrack() {
      this.store.dispatch({
        type: this.actionTypes.callControlClickAddTrack
      });
    }
  }, {
    key: 'mergeControlClickHangupTrack',
    value: function mergeControlClickHangupTrack() {
      this.store.dispatch({
        type: this.actionTypes.mergeControlClickHangupTrack
      });
    }
  }, {
    key: 'callControlClickMergeTrack',
    value: function callControlClickMergeTrack() {
      this.store.dispatch({
        type: this.actionTypes.callControlClickMergeTrack
      });
    }
  }, {
    key: 'confirmMergeClickCloseTrack',
    value: function confirmMergeClickCloseTrack() {
      this.store.dispatch({
        type: this.actionTypes.confirmMergeClickCloseTrack
      });
    }
  }, {
    key: 'confirmMergeClickMergeTrack',
    value: function confirmMergeClickMergeTrack() {
      this.store.dispatch({
        type: this.actionTypes.confirmMergeClickMergeTrack
      });
    }
  }, {
    key: 'callsOnHoldClickAddTrack',
    value: function callsOnHoldClickAddTrack() {
      this.store.dispatch({
        type: this.actionTypes.callsOnHoldClickAddTrack
      });
    }
  }, {
    key: 'callsOnHoldClickMergeTrack',
    value: function callsOnHoldClickMergeTrack() {
      this.store.dispatch({
        type: this.actionTypes.callsOnHoldClickMergeTrack
      });
    }
  }, {
    key: 'callsOnHoldClickHangupTrack',
    value: function callsOnHoldClickHangupTrack() {
      this.store.dispatch({
        type: this.actionTypes.callsOnHoldClickHangupTrack
      });
    }
  }, {
    key: 'callControlClickParticipantAreaTrack',
    value: function callControlClickParticipantAreaTrack() {
      this.store.dispatch({
        type: this.actionTypes.callControlClickParticipantAreaClickTrack
      });
    }
  }, {
    key: 'hasRingingCalls',
    get: function get() {
      return (0, _callLogHelpers.hasRingingCalls)(this.calls);
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
  }, {
    key: 'allCalls',
    get: function get() {
      return this._selectors.allCalls();
    }
  }, {
    key: 'callMatched',
    get: function get() {
      return this._storage.getItem(this._callMatchedKey);
    }
  }, {
    key: 'activeRingCalls',
    get: function get() {
      return this._selectors.activeRingCalls();
    }
  }, {
    key: 'activeOnHoldCalls',
    get: function get() {
      return this._selectors.activeOnHoldCalls();
    }
  }, {
    key: 'activeCurrentCalls',
    get: function get() {
      return this._selectors.activeCurrentCalls();
    }
  }, {
    key: 'otherDeviceCalls',
    get: function get() {
      return this._selectors.otherDeviceCalls();
    }
  }]);
  return CallMonitor;
}(_RcModule3.default), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'ringoutRingCalls', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return (0, _reselect.createSelector)(function () {
      return _this4.otherDeviceCalls;
    }, function (otherDeviceCalls) {
      return otherDeviceCalls.filter(function (callItem) {
        return (0, _callLogHelpers.isRingingInboundCall)(callItem);
      });
    });
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'ringoutCurrentCalls', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return (0, _reselect.createSelector)(function () {
      return _this5.otherDeviceCalls;
    }, function (otherDeviceCalls) {
      return otherDeviceCalls.filter(function (callItem) {
        return !(0, _callLogHelpers.isRingingInboundCall)(callItem) && !(0, _callLogHelpers.isOnHold)(callItem);
      });
    });
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'ringoutOnHoldCalls', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return (0, _reselect.createSelector)(function () {
      return _this6.otherDeviceCalls;
    }, function (otherDeviceCalls) {
      return otherDeviceCalls.filter(function (callItem) {
        return (0, _callLogHelpers.isOnHold)(callItem);
      });
    });
  }
})), _class2)) || _class);
exports.default = CallMonitor;
//# sourceMappingURL=index.js.map
