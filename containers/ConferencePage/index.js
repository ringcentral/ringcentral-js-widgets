'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToProps = exports.mapToFunctions = undefined;

var _reactRedux = require('react-redux');

var _ConferencePanel = require('../../components/ConferencePanel');

var _ConferencePanel2 = _interopRequireDefault(_ConferencePanel);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      conference = _ref$phone.conference,
      regionSettings = _ref$phone.regionSettings,
      _ref$phone$locale = _ref$phone.locale,
      currentLocale = _ref$phone$locale.currentLocale,
      localeReady = _ref$phone$locale.ready,
      composeText = _ref$phone.composeText,
      serviceFeatures = _ref$phone.extensionInfo.serviceFeatures,
      brand = _ref$phone.brand;
  var data = conference.data;
  var hostCode = data.hostCode,
      participantCode = data.participantCode,
      allowJoinBeforeHost = data.allowJoinBeforeHost;

  var dialInNumbers = data.phoneNumbers.map(function (p) {
    var _region = _i18n2.default.getString('conference_' + p.country.isoCode, currentLocale);
    // only show the provinces of canada
    return {
      region: p.location && p.country.isoCode === 'CA' ? _region + ', ' + p.location : _region,
      phoneNumber: p.phoneNumber
    };
  });
  var disableTxtBtn = (!serviceFeatures.SMS || !serviceFeatures.SMS.enabled) && (!serviceFeatures.Pager || !serviceFeatures.Pager.enabled);
  return {
    dialInNumbers: dialInNumbers,
    dialInNumber: conference.dialInNumber,
    hostCode: hostCode,
    participantCode: participantCode,
    allowJoinBeforeHost: allowJoinBeforeHost,
    additionalNumbers: conference.additionalNumbers,
    disableTxtBtn: disableTxtBtn,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode,
    currentLocale: currentLocale,
    brand: {
      code: brand.code,
      name: brand.name
    },
    showSpinner: !(conference.ready && regionSettings.ready && localeReady && composeText.ready)
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      conference = _ref2$phone.conference,
      composeText = _ref2$phone.composeText,
      routerInteraction = _ref2$phone.routerInteraction,
      call = _ref2$phone.call,
      _alert = _ref2$phone.alert;

  return {
    alert: function alert(msg) {
      _alert.warning({ message: msg });
    },
    updateDialInNumber: function updateDialInNumber(dialInNumber) {
      conference.updateDialInNumber(dialInNumber);
    },
    updateAdditionalNumbers: function updateAdditionalNumbers(additionalDialInNumbers) {
      conference.updateAdditionalNumbers(additionalDialInNumbers);
    },
    inviteWithText: function inviteWithText(text) {
      composeText.updateMessageText(text);
      // for track
      conference.onInviteWithText();
      routerInteraction.push('/composeText');
    },
    joinAsHost: function joinAsHost(phoneNumber) {
      // for track
      conference.onJoinAsHost();
      routerInteraction.history.push('/dialer');
      call.call({ phoneNumber: phoneNumber });
    },
    onAllowJoinBeforeHostChange: function onAllowJoinBeforeHostChange(allowJoinBeforeHost) {
      conference.updateEnableJoinBeforeHost(allowJoinBeforeHost);
    },
    showHelpCommands: function showHelpCommands() {
      routerInteraction.push('/conference/commands');
    }
  };
}

var ConferencePage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ConferencePanel2.default));

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = ConferencePage;
//# sourceMappingURL=index.js.map
