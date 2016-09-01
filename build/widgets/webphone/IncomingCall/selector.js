'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _googleLibphonenumber = require('google-libphonenumber');

var _googleLibphonenumber2 = _interopRequireDefault(_googleLibphonenumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var phoneUtil = _googleLibphonenumber2.default.PhoneNumberUtil.getInstance();

function clean(str) {
  return str.slice(0, str.indexOf('@'));
}

function getNationalPhone(raw) {
  var country = arguments.length <= 1 || arguments[1] === undefined ? 'US' : arguments[1];

  if (!raw) return '';
  return phoneUtil.format(phoneUtil.parse(raw, country), _googleLibphonenumber2.default.PhoneNumberFormat.NATIONAL);
}

exports.default = function (state, props, phone) {
  return {
    accept: function accept() {
      return phone.webphone.accept();
    },
    bye: function bye() {
      return phone.webphone.bye();
    },
    // phoneNumber could be (temp) toNumber from dial pad or
    // actuall info from sip
    callingNumber: getNationalPhone(state.common.webphone.remoteIdentity ? clean(state.common.webphone.remoteIdentity.friendlyName) : state.common.webphone.toNumber)
  };
};