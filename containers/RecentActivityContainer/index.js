"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabs = getTabs;
exports.mapToProps = mapToProps;
exports.default = void 0;

require("core-js/modules/es6.array.filter");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _RecentActivityPanel = _interopRequireDefault(require("../../components/RecentActivityPanel"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _RecentActivityMessages = _interopRequireDefault(require("../../components/RecentActivityMessages"));

var _RecentActivityCalls = _interopRequireDefault(require("../../components/RecentActivityCalls"));

var _VoicemailIcon = _interopRequireDefault(require("../../assets/images/VoicemailIcon.svg"));

var _Fax = _interopRequireDefault(require("../../assets/images/Fax.svg"));

var _phoneContext = require("../../lib/phoneContext");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTabs(_ref) {
  var ready = _ref.ready,
      currentLocale = _ref.currentLocale,
      dateTimeFormatter = _ref.dateTimeFormatter,
      navigateTo = _ref.navigateTo,
      recentMessages = _ref.recentMessages,
      recentCalls = _ref.recentCalls,
      currentContact = _ref.currentContact,
      sessionId = _ref.sessionId,
      showRecentCalls = _ref.showRecentCalls,
      showRecentMessage = _ref.showRecentMessage,
      showFax = _ref.showFax,
      showVoiceMails = _ref.showVoiceMails;
  if (!ready) return [];
  var messages = [];
  var calls = [];

  if (currentContact && currentContact.id) {
    var contactId = currentContact.id;
    var activityCardId = sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId;

    if (recentMessages.messages[activityCardId]) {
      messages = recentMessages.messages[activityCardId];
    }

    if (recentCalls.calls[activityCardId]) {
      calls = recentCalls.calls[activityCardId];
    }
  }

  return [showVoiceMails ? {
    icon: _react.default.createElement(_VoicemailIcon.default, {
      width: 21,
      height: 21
    }),
    label: _i18n.default.getString('voicemail', currentLocale),
    path: 'voicemails',
    isActive: function isActive(path) {
      return path === 'voicemails';
    },
    view: null,
    getData: function getData() {},
    cleanUp: function cleanUp() {}
  } : null, showRecentMessage ? {
    icon: _react.default.createElement("span", {
      className: _DynamicsFont.default.composeText
    }),
    label: _i18n.default.getString('text', currentLocale),
    path: 'recentMessages',
    isActive: function isActive(path) {
      return path === 'recentMessages';
    },
    view: _react.default.createElement(_RecentActivityMessages.default, {
      messages: messages,
      navigateTo: navigateTo,
      dateTimeFormatter: dateTimeFormatter,
      currentLocale: currentLocale,
      isMessagesLoaded: recentMessages.isMessagesLoaded
    }),
    getData: function getData() {
      recentMessages.getMessages({
        currentContact: currentContact,
        sessionId: sessionId
      });
    },
    cleanUp: function cleanUp() {
      return recentMessages.cleanUpMessages({
        contact: currentContact,
        sessionId: sessionId
      });
    }
  } : null, showFax ? {
    icon: _react.default.createElement(_Fax.default, {
      width: 21,
      height: 21
    }),
    label: _i18n.default.getString('fax', currentLocale),
    path: 'faxes',
    isActive: function isActive(path) {
      return path === 'faxes';
    },
    view: null,
    getData: function getData() {},
    cleanUp: function cleanUp() {}
  } : null, showRecentCalls ? {
    icon: _react.default.createElement("span", {
      className: _DynamicsFont.default.active
    }),
    label: _i18n.default.getString('call', currentLocale),
    path: 'recentCalls',
    isActive: function isActive(path) {
      return path === 'recentCalls';
    },
    view: _react.default.createElement(_RecentActivityCalls.default, {
      calls: calls,
      dateTimeFormatter: dateTimeFormatter,
      currentLocale: currentLocale,
      isCallsLoaded: recentCalls.isCallsLoaded
    }),
    getData: function getData() {
      recentCalls.getCalls({
        currentContact: currentContact,
        sessionId: sessionId
      });
    },
    cleanUp: function cleanUp() {
      return recentCalls.cleanUpCalls({
        contact: currentContact,
        sessionId: sessionId
      });
    }
  } : null].filter(function (x) {
    return x !== null;
  });
}

function mapToProps(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      locale = _ref2$phone.locale,
      dateTimeFormat = _ref2$phone.dateTimeFormat,
      recentMessages = _ref2$phone.recentMessages,
      recentCalls = _ref2$phone.recentCalls,
      contactMatcher = _ref2$phone.contactMatcher,
      _ref2$currentLocale = _ref2.currentLocale,
      currentLocale = _ref2$currentLocale === void 0 ? locale.currentLocale : _ref2$currentLocale,
      navigateTo = _ref2.navigateTo,
      _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
      dateTimeFormatter = _ref2$dateTimeFormatt === void 0 ? function () {
    return dateTimeFormat.formatDateTime.apply(dateTimeFormat, arguments);
  } : _ref2$dateTimeFormatt,
      getSession = _ref2.getSession,
      useContact = _ref2.useContact,
      contact = _ref2.contact,
      _ref2$showRecentCalls = _ref2.showRecentCalls,
      showRecentCalls = _ref2$showRecentCalls === void 0 ? true : _ref2$showRecentCalls,
      _ref2$showRecentMessa = _ref2.showRecentMessage,
      showRecentMessage = _ref2$showRecentMessa === void 0 ? true : _ref2$showRecentMessa,
      _ref2$showFax = _ref2.showFax,
      showFax = _ref2$showFax === void 0 ? true : _ref2$showFax,
      _ref2$showVoiceMails = _ref2.showVoiceMails,
      showVoiceMails = _ref2$showVoiceMails === void 0 ? true : _ref2$showVoiceMails;
  var sessionId = null;
  var currentContact = contact;
  var ready = dateTimeFormat.ready && locale.ready && recentMessages.ready && recentCalls.ready;

  if (!useContact) {
    var session = getSession();
    sessionId = session.id;
    currentContact = session.contactMatch;
    var contactMapping = contactMatcher && contactMatcher.dataMapping;
    var phoneNumber = session.direction === _callDirections.default.outbound ? session.to : session.from;

    if (!currentContact) {
      currentContact = contactMapping && contactMapping[phoneNumber];

      if (currentContact && currentContact.length >= 1) {
        currentContact = currentContact[0];
      }
    }

    ready = ready && contactMatcher.ready;
  }

  return {
    currentLocale: currentLocale,
    title: _i18n.default.getString('recentActivities', locale.currentLocale),
    showSpinner: !ready,
    currentContact: currentContact,
    calls: recentCalls.calls || [],
    tabs: getTabs({
      ready: ready,
      currentLocale: currentLocale,
      dateTimeFormatter: dateTimeFormatter,
      navigateTo: navigateTo,
      currentContact: currentContact,
      recentMessages: recentMessages,
      recentCalls: recentCalls,
      sessionId: sessionId,
      showFax: showFax,
      showRecentCalls: showRecentCalls,
      showVoiceMails: showVoiceMails,
      showRecentMessage: showRecentMessage
    }),
    defaultTab: 'recentCalls'
  };
}

var RecentActivityContainer = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps)(_RecentActivityPanel.default));
exports.default = RecentActivityContainer;
//# sourceMappingURL=index.js.map
