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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallHistory = function (_RcModule) {
  (0, _inherits3.default)(CallHistory, _RcModule);

  function CallHistory(_ref) {
    var _this2 = this;

    var detailedPresence = _ref.detailedPresence,
        callLog = _ref.callLog,
        activeCalls = _ref.activeCalls,
        options = (0, _objectWithoutProperties3.default)(_ref, ['detailedPresence', 'callLog', 'activeCalls']);
    (0, _classCallCheck3.default)(this, CallHistory);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallHistory.__proto__ || (0, _getPrototypeOf2.default)(CallHistory)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._onStateChange = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this._callLog.ready && _this._activeCalls.ready && _this._detailedPresence.ready && _this.pending) {
                _this.store.dispatch({
                  type: _this.actionTypes.init
                });
                _this.store.dispatch({
                  type: _this.actionTypes.initSuccess
                });
              } else if ((!_this._callLog.ready || !_this._activeCalls.ready || !_this._detailedPresence.ready) && _this.ready) {
                _this.store.dispatch({
                  type: _this.actionTypes.reset
                });
                _this.store.dispatch({
                  type: _this.actionTypes.resetSuccess
                });
              }

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this._activeCalls = activeCalls;
    _this._callLog = callLog;
    _this._detailedPresence = detailedPresence;
    _this._reducer = (0, _getCallHistoryReducer2.default)(_this.actionTypes);

    _this.addSelector('calls', function () {
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
      }).concat(callsFromCallLog).sort(_callLogHelpers.sortCallsByStartTime);
    });
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
