'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.propTypes = exports.mapToProps = exports.mapToFunctions = undefined;

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _Locale = require('ringcentral-integration/modules/Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _Conference = require('ringcentral-integration/modules/Conference');

var _Conference2 = _interopRequireDefault(_Conference);

var _RegionSettings = require('ringcentral-integration/modules/RegionSettings');

var _RegionSettings2 = _interopRequireDefault(_RegionSettings);

var _ComposeText = require('ringcentral-integration/modules/ComposeText');

var _ComposeText2 = _interopRequireDefault(_ComposeText);

var _RouterInteraction = require('../../modules/RouterInteraction');

var _RouterInteraction2 = _interopRequireDefault(_RouterInteraction);

var _ConferencePanel = require('../../components/ConferencePanel');

var _ConferencePanel2 = _interopRequireDefault(_ConferencePanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var conference = _ref.conference,
      regionSettings = _ref.regionSettings,
      locale = _ref.locale,
      composeText = _ref.composeText;

  return {
    conferenceNumbers: conference.conferenceNumbers,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode,
    currentLocale: locale.currentLocale,
    showSpinner: !(conference.ready && regionSettings.ready && locale.ready && composeText.ready)
  };
}

function mapToFunctions(_, _ref2) {
  var composeText = _ref2.composeText,
      router = _ref2.router;

  return {
    inviteWithText: function inviteWithText(text) {
      composeText.updateMessageText(text);
      router.push('/composeText');
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

var ConferencePage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ConferencePanel2.default);

var propTypes = {
  conference: _propTypes2.default.instanceOf(_Conference2.default),
  regionSettings: _propTypes2.default.instanceOf(_RegionSettings2.default),
  locale: _propTypes2.default.instanceOf(_Locale2.default),
  composeText: _propTypes2.default.instanceOf(_ComposeText2.default),
  router: _propTypes2.default.instanceOf(_RouterInteraction2.default)
};

ConferencePage.propTypes = propTypes;

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.propTypes = propTypes;
exports.default = ConferencePage;
//# sourceMappingURL=index.js.map
