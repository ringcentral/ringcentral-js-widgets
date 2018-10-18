'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToFunctions = exports.mapToProps = undefined;

var _reactRedux = require('react-redux');

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _TransferPanel = require('../../components/TransferPanel');

var _TransferPanel2 = _interopRequireDefault(_TransferPanel);

var _phoneContext = require('../../lib/phoneContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var phone = _ref.phone,
      sessionId = _ref.params.sessionId;
  var locale = phone.locale,
      activeCallControl = phone.activeCallControl;
  var currentLocale = locale.currentLocale;
  var activeSession = activeCallControl.activeSession;


  return {
    sessionId: sessionId,
    currentLocale: currentLocale,
    searchContactList: [],
    isOnTransfer: false,
    activeSession: activeSession,
    disablePage: true
  };
}

function mapToFunctions(_, _ref2) {
  var phone = _ref2.phone;
  var regionSettings = phone.regionSettings,
      routerInteraction = phone.routerInteraction,
      activeCallControl = phone.activeCallControl;

  return {
    setActiveSessionId: function setActiveSessionId(sessionId) {
      return activeCallControl.setActiveSessionId(sessionId);
    },
    onTransfer: function onTransfer(transferNumber) {
      var sessionIdRgx = /\d+/g;
      var sessionId = routerInteraction.currentPath.match(sessionIdRgx);
      if (sessionId) {
        activeCallControl.transfer(transferNumber, sessionId[0]);
      }
    },
    toggleTransferPanel: function toggleTransferPanel() {
      routerInteraction.push('/calls');
    },

    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber2.default)({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      });
    },
    searchContact: function searchContact() {
      return null;
    }
  };
}

var TransferPage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_TransferPanel2.default));

exports.mapToProps = mapToProps;
exports.mapToFunctions = mapToFunctions;
exports.default = TransferPage;
//# sourceMappingURL=index.js.map
