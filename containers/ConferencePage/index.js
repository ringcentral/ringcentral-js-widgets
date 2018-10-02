'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToProps = exports.mapToFunctions = undefined;

var _reactRedux = require('react-redux');

var _ramda = require('ramda');

var _ConferencePanel = require('../../components/ConferencePanel');

var _ConferencePanel2 = _interopRequireDefault(_ConferencePanel);

var _countryNames = require('../../lib/countryNames');

var _countryNames2 = _interopRequireDefault(_countryNames);

var _phoneContext = require('../../lib/phoneContext');

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

  var _ref2 = conference.data || {},
      _ref2$hostCode = _ref2.hostCode,
      hostCode = _ref2$hostCode === undefined ? '' : _ref2$hostCode,
      _ref2$participantCode = _ref2.participantCode,
      participantCode = _ref2$participantCode === undefined ? '' : _ref2$participantCode,
      _ref2$allowJoinBefore = _ref2.allowJoinBeforeHost,
      allowJoinBeforeHost = _ref2$allowJoinBefore === undefined ? false : _ref2$allowJoinBefore,
      _ref2$phoneNumbers = _ref2.phoneNumbers,
      phoneNumbers = _ref2$phoneNumbers === undefined ? [] : _ref2$phoneNumbers;

  var countryCounter = (0, _ramda.reduce)(function (acc, item) {
    if (!acc[item.country.isoCode]) {
      acc[item.country.isoCode] = 1;
    } else {
      acc[item.country.isoCode] += 1;
    }
    return acc;
  }, {}, phoneNumbers);
  var dialInNumbers = (0, _ramda.map)(function (item) {
    var countryName = _countryNames2.default.getString(item.country.isoCode, currentLocale);
    // only show the provinces of canada
    return {
      region: countryCounter[item.country.isoCode] > 1 ? countryName + ', ' + item.location : countryName,
      phoneNumber: item.phoneNumber
    };
  }, phoneNumbers);
  var disableTxtBtn = (!serviceFeatures.SMS || !serviceFeatures.SMS.enabled) && (!serviceFeatures.Pager || !serviceFeatures.Pager.enabled);
  return {
    dialInNumbers: dialInNumbers,
    dialInNumber: conference.dialInNumber || '',
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

function mapToFunctions(_, _ref3) {
  var _ref3$phone = _ref3.phone,
      conference = _ref3$phone.conference,
      composeText = _ref3$phone.composeText,
      routerInteraction = _ref3$phone.routerInteraction,
      call = _ref3$phone.call,
      _alert = _ref3$phone.alert,
      _ref3$enableAutoEnter = _ref3.enableAutoEnterHostKey,
      enableAutoEnterHostKey = _ref3$enableAutoEnter === undefined ? false : _ref3$enableAutoEnter;

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
    joinAsHost: function joinAsHost() {
      // for track
      conference.onJoinAsHost();
      routerInteraction.history.push('/dialer');
      var phoneNumber = enableAutoEnterHostKey ? conference.dialInNumber + ',,' + conference.data.hostCode + '#' : conference.dialInNumber;
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

var ConferencePage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ConferencePanel2.default));

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = ConferencePage;
//# sourceMappingURL=index.js.map
