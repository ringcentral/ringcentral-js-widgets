'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _countryData = require('country-data');

var _countryData2 = _interopRequireDefault(_countryData);

var _googleLibphonenumber = require('google-libphonenumber');

var _googleLibphonenumber2 = _interopRequireDefault(_googleLibphonenumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var phoneUtil = _googleLibphonenumber2.default.PhoneNumberUtil.getInstance();

function countryMapping(name) {
  return _countryData2.default.lookup.countries({ name: name })[0].alpha2;
}

function getInternationalPhone(raw) {
  var country = arguments.length <= 1 || arguments[1] === undefined ? 'US' : arguments[1];

  if (!raw) return '';
  return phoneUtil.format(phoneUtil.parse(raw, country), _googleLibphonenumber2.default.PhoneNumberFormat.INTERNATIONAL);
}

var numberTypeMapping = {
  CompanyFaxNumber: {
    priority: 0,
    abbr: 'Company'
  },
  CompanyNumber: {
    priority: 1,
    abbr: 'Company'
  },
  MainCompanyNumber: {
    priority: 2,
    abbr: 'Main'
  },
  DirectNumber: {
    priority: 3,
    abbr: 'Direct'
  }
};

exports.default = function (state, props, phone) {
  return {
    call: function call() {
      var _phone$webphone;

      return (_phone$webphone = phone.webphone).call.apply(_phone$webphone, arguments);
    },
    userNumbers: state.common.user.phoneNumbers.sort(function (a, b) {
      return numberTypeMapping[b.usageType].priority - numberTypeMapping[a.usageType].priority;
    }).map(function (number) {
      return Object.assign({}, number, {
        left: countryMapping(number.country.name),
        mid: getInternationalPhone(number.phoneNumber, countryMapping(number.country.name)),
        right: numberTypeMapping[number.usageType].abbr
      });
    }),
    loadRingAudio: function loadRingAudio(options) {
      return phone.webphone.loadRingAudio(options);
    }
  };
};