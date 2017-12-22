'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToProps = exports.mapToFunctions = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _reactRedux = require('react-redux');

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
      composeText = _ref$phone.composeText,
      serviceFeatures = _ref$phone.extensionInfo.serviceFeatures,
      brand = _ref$phone.brand;
  var data = conference.data;
  var hostCode = data.hostCode,
      participantCode = data.participantCode,
      allowJoinBeforeHost = data.allowJoinBeforeHost;

  var dialInNumbers = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(data.phoneNumbers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var p = _step.value;

      var region = p.country.name;
      if (p.location) {
        region += ', ';
        region += p.location;
      }
      dialInNumbers.push({
        region: region,
        phoneNumber: p.phoneNumber
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var disableTxtBtn = !serviceFeatures.SMS.enabled && !serviceFeatures.Pager.enabled;
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
    currentLocale: locale.currentLocale,
    brand: {
      code: brand.code,
      name: brand.name
    },
    showSpinner: !(conference.ready && regionSettings.ready && locale.ready && composeText.ready)
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
