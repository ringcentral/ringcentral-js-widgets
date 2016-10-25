'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _redux = require('redux');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _userStatus = require('./userStatus');

var _userStatus2 = _interopRequireDefault(_userStatus);

var _AccountInfo = require('../AccountInfo');

var _AccountInfo2 = _interopRequireDefault(_AccountInfo);

var _ExtensionInfo = require('../ExtensionInfo');

var _ExtensionInfo2 = _interopRequireDefault(_ExtensionInfo);

var _DialingPlan = require('../DialingPlan');

var _DialingPlan2 = _interopRequireDefault(_DialingPlan);

var _ExtensionPhoneNumber = require('../ExtensionPhoneNumber');

var _ExtensionPhoneNumber2 = _interopRequireDefault(_ExtensionPhoneNumber);

var _ForwardingNumber = require('../ForwardingNumber');

var _ForwardingNumber2 = _interopRequireDefault(_ForwardingNumber);

var _BlockedNumber = require('../BlockedNumber');

var _BlockedNumber2 = _interopRequireDefault(_BlockedNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = function (_RcModule) {
  (0, _inherits3.default)(User, _RcModule);

  function User(_ref) {
    var options = (0, _objectWithoutProperties3.default)(_ref, []);
    (0, _classCallCheck3.default)(this, User);

    var _this = (0, _possibleConstructorReturn3.default)(this, (User.__proto__ || (0, _getPrototypeOf2.default)(User)).call(this, options));

    _this.addModule('accountInfo', new _AccountInfo2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.accountInfo;
      }
    })));
    _this.addModule('extensionInfo', new _ExtensionInfo2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.extensionInfo;
      }
    })));
    _this.addModule('dialingPlan', new _DialingPlan2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.dialingPlan;
      }
    })));
    _this.addModule('phoneNumber', new _ExtensionPhoneNumber2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.phoneNumber;
      }
    })));
    _this.addModule('forwardingNumber', new _ForwardingNumber2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.forwardingNumber;
      }
    })));
    _this.addModule('blockedNumber', new _BlockedNumber2.default((0, _extends3.default)({}, options, {
      getState: function getState() {
        return _this.state.blockedNumber;
      }
    })));
    _this._reducer = (0, _redux.combineReducers)({
      accountInfo: _this.accountInfo.reducer,
      extensionInfo: _this.extensionInfo.reducer,
      dialingPlan: _this.dialingPlan.reducer,
      phoneNumber: _this.phoneNumber.reducer,
      forwardingNumber: _this.forwardingNumber.reducer,
      blockedNumber: _this.blockedNumber.reducer
    });

    _this.addSelector('error', [function () {
      return _this.accountInfo.error;
    }, function () {
      return _this.extensionInfo.error;
    }, function () {
      return _this.dialingPlan.error;
    }, function () {
      return _this.phoneNumber.error;
    }, function () {
      return _this.forwardingNumber.error;
    }, function () {
      return _this.blockedNumber.error;
    }], function (accountInfoError, extensionInfoError, dialingPlanError, phoneNumberError, forwardingNumberError, blockedNumberErrror) {
      if (accountInfoError || extensionInfoError || dialingPlanError || phoneNumberError || forwardingNumberError || blockedNumberErrror) {
        return {
          accountInfoError: accountInfoError,
          extensionInfoError: extensionInfoError,
          dialingPlanError: dialingPlanError,
          phoneNumberError: phoneNumberError,
          forwardingNumberError: forwardingNumberError,
          blockedNumberErrror: blockedNumberErrror
        };
      }
      return null;
    });
    return _this;
  }

  (0, _createClass3.default)(User, [{
    key: 'userState',
    get: function get() {
      return _userStatus2.default;
    }
  }, {
    key: 'status',
    get: function get() {
      if (this.accountInfo.status === this.accountInfo.accountInfoStatus.pending || this.extensionInfo.status === this.extensionInfo.extensionInfoStatus.pending || this.dialingPlan.status === this.dialingPlan.dialingPlanStatus.pending || this.phoneNumber.status === this.phoneNumber.extensionPhoneNumberStatus.pending || this.forwardingNumber.status === this.forwardingNumber.forwardingNumberStatus.pending || this.blockedNumber.status === this.blockedNumber.blockedNumberStatus.pending) {
        return _userStatus2.default.pending;
      } else if (this.accountInfo.status === this.accountInfo.accountInfoStatus.fetching || this.extensionInfo.status === this.extensionInfo.extensionInfoStatus.fetching || this.dialingPlan.status === this.dialingPlan.dialingPlanStatus.fetching || this.phoneNumber.status === this.phoneNumber.extensionPhoneNumberStatus.fetching || this.forwardingNumber.status === this.forwardingNumber.forwardingNumberStatus.fetching || this.blockedNumber.status === this.blockedNumber.blockedNumberStatus.fetching) {
        return _userStatus2.default.fetching;
      }
      return _userStatus2.default.ready;
    }
  }, {
    key: 'error',
    get: function get() {
      return this.getSelector('error')();
    }
  }]);
  return User;
}(_RcModule3.default);

exports.default = User;
//# sourceMappingURL=index.js.map
