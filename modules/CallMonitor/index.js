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

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getCallMonitorReducer = require('./getCallMonitorReducer');

var _getCallMonitorReducer2 = _interopRequireDefault(_getCallMonitorReducer);

var _normalizeNumber = require('../../lib/normalizeNumber');

var _normalizeNumber2 = _interopRequireDefault(_normalizeNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallMonitor = function (_RcModule) {
  (0, _inherits3.default)(CallMonitor, _RcModule);

  function CallMonitor(_ref) {
    var _this2 = this;

    var detailedPresence = _ref.detailedPresence,
        activeCalls = _ref.activeCalls,
        activityMatcher = _ref.activityMatcher,
        contactMatcher = _ref.contactMatcher,
        regionSettings = _ref.regionSettings,
        options = (0, _objectWithoutProperties3.default)(_ref, ['detailedPresence', 'activeCalls', 'activityMatcher', 'contactMatcher', 'regionSettings']);
    (0, _classCallCheck3.default)(this, CallMonitor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallMonitor.__proto__ || (0, _getPrototypeOf2.default)(CallMonitor)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._onStateChange = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var uniqueNumbers;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this._detailedPresence.ready && _this._activeCalls.ready && _this._regionSettings.ready && (!_this._contactMatcher || _this._contactMatcher.ready) && (!_this._activityMatcher || _this._activityMatcher.ready) && _this.pending) {
                _this.store.dispatch({
                  type: _this.actionTypes.init
                });
                _this.store.dispatch({
                  type: _this.actionTypes.initSuccess
                });
              } else if ((!_this._detailedPresence.ready || !_this._activeCalls.ready || !_this._regionSettings.ready || _this._contactMatcher && !_this._contactMatcher.ready || _this._activityMatcher && !_this._activityMatcher.ready) && _this.ready) {
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

    _this._detailedPresence = detailedPresence;
    _this._activeCalls = activeCalls;
    _this._contactMatcher = contactMatcher;
    _this._activityMatcher = activityMatcher;
    _this._regionSettings = regionSettings;
    _this._reducer = (0, _getCallMonitorReducer2.default)(_this.actionTypes);
    _this.addSelector('calls', function () {
      return _this._detailedPresence.calls;
    }, function () {
      return _this._activeCalls.calls;
    }, function () {
      return _this._contactMatcher && _this._contactMatcher.ready ? _this._contactMatcher.cache : null;
    }, function () {
      return _this._activityMatcher && _this._activityMatcher.ready ? _this._activityMatcher.cache : null;
    }, function (callsFromPresence, callsFromActiveCalls, contactCache, activityCache) {
      return callsFromPresence.map(function (call) {
        var activeCall = callsFromActiveCalls.find(function (item) {
          return item.sessionId === call.sessionId;
        });
        var fromNumber = (0, _normalizeNumber2.default)({
          phoneNumber: call.from,
          countryCode: _this._regionSettings.countryCode,
          areaCode: _this._regionSettings.areaCode
        });
        var toNumber = (0, _normalizeNumber2.default)({
          phoneNumber: call.to,
          countryCode: _this._regionSettings.countryCode,
          areaCode: _this._regionSettings.areaCode
        });
        return (0, _extends3.default)({}, call, {
          from: {
            phoneNumber: fromNumber
          },
          to: {
            phoneNumber: toNumber
          },
          startTime: activeCall && activeCall.startTime || call.startTime,
          fromMatches: contactCache && contactCache.dataMap[fromNumber] || [],
          toMatches: contactCache && contactCache.dataMap[toNumber] || [],
          activityMatches: activityCache && activityCache.dataMap[call.sessionId] || []
        });
      });
    });

    _this.addSelector('uniqueNumbers', function () {
      return _this._detailedPresence.calls;
    }, function () {
      return _this._activeCalls.calls;
    }, function (callsFromPresence, callsFromActiveCalls) {
      var output = [];
      var numberMap = {};
      callsFromPresence.forEach(function (call) {
        if (call.from) {
          var number = (0, _normalizeNumber2.default)({
            phoneNumber: call.from,
            countryCode: _this._regionSettings.countryCode,
            areaCode: _this._regionSettings.areCode
          });
          if (!numberMap[number]) {
            output.push(number);
            numberMap[number] = true;
          }
        }
        if (call.to) {
          var _number = (0, _normalizeNumber2.default)({
            phoneNumber: call.to,
            countryCode: _this._regionSettings.countryCode,
            areaCode: _this._regionSettings.areCode
          });
          if (!numberMap[_number]) {
            output.push(_number);
            numberMap[_number] = true;
          }
        }
      });
      callsFromActiveCalls.forEach(function (call) {
        if (call.from) {
          var number = (0, _normalizeNumber2.default)({
            phoneNumber: call.from.phoneNumber || call.from.extensionNumber,
            countryCode: _this._regionSettings.countryCode,
            areaCode: _this._regionSettings.areaCode
          });
          if (number && !numberMap[number]) {
            output.push(number);
            numberMap[number] = true;
          }
        }
        if (call.to) {
          var _number2 = (0, _normalizeNumber2.default)({
            phoneNumber: call.to.phoneNumber || call.to.extensionNumber,
            countryCode: _this._regionSettings.countryCode,
            areaCode: _this._regionSettings.areaCode
          });
          if (_number2 && !numberMap[_number2]) {
            output.push(_number2);
            numberMap[_number2] = true;
          }
        }
      });
      return output;
    });

    if (_this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: _this._selectors.uniqueNumbers,
        readyCheckFn: function readyCheckFn() {
          return _this._activeCalls.ready && _this._detailedPresence.ready && _this._regionSettings.ready;
        }
      });
    }
    _this.addSelector('sessionIdList', function () {
      return _this._detailedPresence.calls;
    }, function (calls) {
      return calls.map(function (call) {
        return call.sessionId;
      });
    });
    if (_this._activityMatcher) {
      _this._activityMatcher.addQuerySource({
        getQueriesFn: _this._selectors.sessionIdList,
        readyCheckFn: function readyCheckFn() {
          return _this._detailedPresence.ready;
        }
      });
    }

    _this._lastProcessedNumbers = null;
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
  return CallMonitor;
}(_RcModule3.default);

exports.default = CallMonitor;
//# sourceMappingURL=index.js.map
