'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

var _redux = require('redux');

var _rcModule = require('../../lib/rc-module');

var _rcModule2 = _interopRequireDefault(_rcModule);

var _userStatus = require('./user-status');

var _userStatus2 = _interopRequireDefault(_userStatus);

var _userEvents = require('./user-events');

var _userEvents2 = _interopRequireDefault(_userEvents);

var _accountInfo = require('../account-info');

var _accountInfo2 = _interopRequireDefault(_accountInfo);

var _extensionInfo = require('../extension-info');

var _extensionInfo2 = _interopRequireDefault(_extensionInfo);

var _dialingPlan = require('../dialing-plan');

var _dialingPlan2 = _interopRequireDefault(_dialingPlan);

var _extensionPhoneNumber = require('../extension-phone-number');

var _extensionPhoneNumber2 = _interopRequireDefault(_extensionPhoneNumber);

var _forwardingNumber = require('../forwarding-number');

var _forwardingNumber2 = _interopRequireDefault(_forwardingNumber);

var _blockedNumber = require('../blocked-number');

var _blockedNumber2 = _interopRequireDefault(_blockedNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['api', 'auth', 'storage', 'reducer']);

function calculateStatus(state) {
  if (state.accountInfo.status === _accountInfo2.default.accountInfoStatus.fetching || state.extensionInfo.status === _extensionInfo2.default.extensionInfoStatus.fetching || state.dialingPlan.status === _dialingPlan2.default.dialingPlanStatus.fetching || state.phoneNumber.status === _extensionPhoneNumber2.default.extensionPhoneNumberStatus.fetching || state.forwardingNumber.status === _forwardingNumber2.default.forwardingNumberStatus.fetching || state.blockedNumber.status === _blockedNumber2.default.blockedNumberStatus.fetching) {
    return _userStatus2.default.fetching;
  } else if (state.accountInfo.status === _accountInfo2.default.accountInfoStatus.pending || state.extensionInfo.status === _extensionInfo2.default.extensionInfoStatus.pending || state.dialingPlan.status === _dialingPlan2.default.dialingPlanStatus.pending || state.phoneNumber.status === _extensionPhoneNumber2.default.extensionPhoneNumberStatus.pending || state.forwardingNumber.status === _forwardingNumber2.default.forwardingNumberStatus.pending || state.blockedNumber.status === _blockedNumber2.default.blockedNumberStatus.pending) {
    return _userStatus2.default.pending;
  }
  return _userStatus2.default.ready;
}

var User = function (_RcModule) {
  (0, _inherits3.default)(User, _RcModule);

  function User() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, User);

    var _this = (0, _possibleConstructorReturn3.default)(this, (User.__proto__ || (0, _getPrototypeOf2.default)(User)).call(this, (0, _extends3.default)({}, options)));

    var api = options.api;
    var auth = options.auth;
    var storage = options.storage;

    _this[symbols.api] = api;
    _this[symbols.auth] = auth;
    _this[symbols.storage] = storage;

    _rcModule.addModule.call(_this, 'accountInfo', new _accountInfo2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.accountInfo;
      }
    })));
    _rcModule.addModule.call(_this, 'extensionInfo', new _extensionInfo2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.extensionInfo;
      }
    })));
    _rcModule.addModule.call(_this, 'dialingPlan', new _dialingPlan2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.dialingPlan;
      }
    })));
    _rcModule.addModule.call(_this, 'phoneNumber', new _extensionPhoneNumber2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.phoneNumber;
      }
    })));
    _rcModule.addModule.call(_this, 'forwardingNumber', new _forwardingNumber2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.forwardingNumber;
      }
    })));
    _rcModule.addModule.call(_this, 'blockedNumber', new _blockedNumber2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.blockedNumber;
      }
    })));

    _this[symbols.reducer] = (0, _redux.combineReducers)({
      accountInfo: _this.accountInfo.reducer,
      extensionInfo: _this.extensionInfo.reducer,
      dialingPlan: _this.dialingPlan.reducer,
      phoneNumber: _this.phoneNumber.reducer,
      forwardingNumber: _this.forwardingNumber.reducer,
      blockedNumber: _this.blockedNumber.reducer
    });

    _this.on('state-change', function (_ref) {
      var oldState = _ref.oldState;
      var newState = _ref.newState;

      var oldStatus = oldState && calculateStatus(oldState);
      var newStatus = calculateStatus(newState);
      if (oldStatus !== newStatus) {
        _this.emit(_userEvents2.default.statusChange, {
          oldStatus: oldStatus,
          newStatus: newStatus
        });
        _this.emit(newStatus);
      }
    });
    _this.accountInfo.on(_this.accountInfo.accountInfoEvents.error, function (error) {
      _this.emit(_userEvents2.default.error, error);
    });
    _this.extensionInfo.on(_this.extensionInfo.extensionInfoEvents.error, function (error) {
      _this.emit(_userEvents2.default.error, error);
    });
    _this.dialingPlan.on(_this.dialingPlan.dialingPlanEvents.error, function (error) {
      _this.emit(_userEvents2.default.error, error);
    });
    _this.phoneNumber.on(_this.phoneNumber.extensionPhoneNumberEvents.error, function (error) {
      _this.emit(_userEvents2.default.error, error);
    });
    _this.forwardingNumber.on(_this.forwardingNumber.forwardingNumberEvents.error, function (error) {
      _this.emit(_userEvents2.default.error, error);
    });
    _this.blockedNumber.on(_this.blockedNumber.blockedNumberEvents.error, function (error) {
      _this.emit(_userEvents2.default.error, error);
    });
    return _this;
  }

  (0, _createClass3.default)(User, [{
    key: 'userStatus',
    get: function get() {
      return _userStatus2.default;
    }
  }, {
    key: 'userEvents',
    get: function get() {
      return _userEvents2.default;
    }
  }, {
    key: 'reducer',
    get: function get() {
      return this[symbols.reducer];
    }
  }, {
    key: 'status',
    get: function get() {
      return calculateStatus(this.state);
    }
  }], [{
    key: 'userStatus',
    get: function get() {
      return _userStatus2.default;
    }
  }, {
    key: 'userEvents',
    get: function get() {
      return _userEvents2.default;
    }
  }]);
  return User;
}(_rcModule2.default);

exports.default = User;
//# sourceMappingURL=index.js.map
