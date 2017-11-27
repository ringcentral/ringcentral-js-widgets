'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToProps = exports.mapToFunctions = undefined;

var _reactRedux = require('react-redux');

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _ConferencePanel = require('../../components/ConferencePanel');

var _ConferencePanel2 = _interopRequireDefault(_ConferencePanel);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      conference = _ref$phone.conference,
      regionSettings = _ref$phone.regionSettings,
      locale = _ref$phone.locale,
      composeText = _ref$phone.composeText;

  return {
    conferenceNumbers: conference.conferenceNumbers,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode,
    currentLocale: locale.currentLocale,
    showSpinner: !(conference.ready && regionSettings.ready && locale.ready && composeText.ready)
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      composeText = _ref2$phone.composeText,
      routerInteraction = _ref2$phone.routerInteraction;

  return {
    inviteWithText: function inviteWithText(text) {
      composeText.updateMessageText(text);
      routerInteraction.push('/composeText');
    },
    formatInternational: function formatInternational(phoneNumber, callingCode) {
      if (phoneNumber.indexOf(callingCode === 1)) {
        return '+' + callingCode + ' ' + phoneNumber.replace('+', '').replace(callingCode, '');
      }
      return phoneNumber;
    },
    formatPin: function formatPin(number) {
      if (!number) {
        return '';
      }
      return number.replace(/(\d{3})/g, '$1-').replace(/-$/, '');
    },
    formatPhone: function formatPhone(phoneNumber, countryCode, areaCode) {
      return (0, _formatNumber2.default)({
        phoneNumber: phoneNumber,
        countryCode: countryCode,
        areaCode: areaCode || ''
      });
    }
  };
}

var ConferencePage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ConferencePanel2.default));

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = ConferencePage;
//# sourceMappingURL=index.js.map
