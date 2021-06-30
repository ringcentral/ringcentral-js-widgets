"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInviteTxt = getInviteTxt;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find");

var _formatMessage = _interopRequireDefault(require("format-message"));

var _ramda = require("ramda");

var _formatNumber = _interopRequireDefault(require("@ringcentral-integration/commons/lib/formatNumber"));

var _countryNames = _interopRequireDefault(require("../countryNames"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dialInNumbersLinks = {
  att: 'https://ringcentr.al/2L14jqL',
  // att reuse rc brand
  bt: 'https://www.btcloudphone.bt.com/conferencing',
  rc: 'https://ringcentr.al/2L14jqL',
  telus: 'https://telus.com/BusinessConnect/ConferencingFrequentlyAskedQuestions'
};

function getInviteTxt(_ref) {
  var brand = _ref.brand,
      conference = _ref.conference,
      locale = _ref.locale,
      regionSettings = _ref.regionSettings;
  var _conference$data = conference.data,
      participantCode = _conference$data.participantCode,
      phoneNumbers = _conference$data.phoneNumbers;
  var dialInNumber = conference.dialInNumber || '';
  var additionalNumbers = conference.additionalNumbers;
  var countryCounter = (0, _ramda.reduce)(function (acc, item) {
    if (!acc[item.country.isoCode]) {
      acc[item.country.isoCode] = 1;
    } else {
      acc[item.country.isoCode] += 1;
    }

    return acc;
  }, {}, phoneNumbers);
  var dialInNumbers = (0, _ramda.map)(function (item) {
    var countryName = _countryNames["default"].getString(item.country.isoCode, locale.currentLocale); // only show the provinces of canada


    return {
      region: countryCounter[item.country.isoCode] > 1 ? "".concat(countryName, ", ").concat(item.location) : countryName,
      phoneNumber: item.phoneNumber,
      formattedPhoneNumber: (0, _formatNumber["default"])({
        phoneNumber: item.phoneNumber,
        countryCode: regionSettings.countryCode,
        areaCode: regionSettings.areaCode,
        international: true
      })
    };
  }, phoneNumbers);
  dialInNumber = dialInNumbers.find(function (e) {
    return e.phoneNumber === dialInNumber;
  }) || dialInNumbers[0];
  var formattedDialInNumber = dialInNumber.formattedPhoneNumber;
  var additionalNumbersTxt = additionalNumbers.map(function (p) {
    return dialInNumbers.find(function (obj) {
      return obj.phoneNumber === p;
    });
  }).map(function (fmt) {
    return "".concat(fmt.region, "  ").concat(fmt.formattedPhoneNumber);
  }).join('\n');
  var additionalNumbersSection = '';

  if (additionalNumbers.length > 0) {
    additionalNumbersSection = "".concat(_i18n["default"].getString('internationalNumber', locale.currentLocale), "\n").concat(additionalNumbersTxt);
  }

  return (0, _formatMessage["default"])(_i18n["default"].getString("inviteText_".concat(brand.code), locale.currentLocale), {
    brandName: brand.name,
    formattedDialInNumber: formattedDialInNumber,
    additionalNumbersSection: additionalNumbersSection,
    participantCode: participantCode.replace(/(\d{3})/g, '$1-').replace(/-$/, ''),
    dialInNumbersLinks: dialInNumbersLinks[brand.code]
  });
}
//# sourceMappingURL=index.js.map
