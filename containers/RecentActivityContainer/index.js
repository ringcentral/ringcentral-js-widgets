'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _RecentActivityPanel = require('../../components/RecentActivityPanel');

var _RecentActivityPanel2 = _interopRequireDefault(_RecentActivityPanel);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _RecentActivityMessages = require('../../components/RecentActivityMessages');

var _RecentActivityMessages2 = _interopRequireDefault(_RecentActivityMessages);

var _RecentActivityCalls = require('../../components/RecentActivityCalls');

var _RecentActivityCalls2 = _interopRequireDefault(_RecentActivityCalls);

var _VoicemailIcon = require('../../assets/images/VoicemailIcon.svg');

var _VoicemailIcon2 = _interopRequireDefault(_VoicemailIcon);

var _Fax = require('../../assets/images/Fax.svg');

var _Fax2 = _interopRequireDefault(_Fax);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTabs(_ref) {
  var ready = _ref.ready,
      currentLocale = _ref.currentLocale,
      dateTimeFormatter = _ref.dateTimeFormatter,
      navigateTo = _ref.navigateTo,
      recentMessages = _ref.recentMessages,
      recentCalls = _ref.recentCalls,
      currentContact = _ref.currentContact,
      sessionId = _ref.sessionId;

  if (!ready) return [];
  var messages = [];
  var calls = [];
  if (currentContact && currentContact.id) {
    var contactId = currentContact.id;
    var activityCardId = sessionId ? contactId + '-' + sessionId : contactId;
    if (recentMessages.messages[activityCardId]) {
      messages = recentMessages.messages[activityCardId];
    }
    if (recentCalls.calls[activityCardId]) {
      calls = recentCalls.calls[activityCardId];
    }
  }
  return [{
    icon: _react2.default.createElement(_VoicemailIcon2.default, { width: 21, height: 21 }),
    label: _i18n2.default.getString('voicemail', currentLocale),
    path: 'voicemails',
    isActive: function isActive(path) {
      return path === 'voicemails';
    },
    view: null,
    getData: function getData() {},
    cleanUp: function cleanUp() {}
  }, {
    icon: _react2.default.createElement('span', { className: _DynamicsFont2.default.composeText }),
    label: _i18n2.default.getString('text', currentLocale),
    path: 'recentMessages',
    isActive: function isActive(path) {
      return path === 'recentMessages';
    },
    view: _react2.default.createElement(_RecentActivityMessages2.default, {
      messages: messages,
      navigateTo: navigateTo,
      dateTimeFormatter: dateTimeFormatter,
      currentLocale: currentLocale,
      isMessagesLoaded: recentMessages.isMessagesLoaded
    }),
    getData: function getData() {
      recentMessages.getMessages({ currentContact: currentContact, sessionId: sessionId });
    },
    cleanUp: function cleanUp() {
      return recentMessages.cleanUpMessages({ contact: currentContact, sessionId: sessionId });
    }
  }, {
    icon: _react2.default.createElement(_Fax2.default, { width: 21, height: 21 }),
    label: _i18n2.default.getString('fax', currentLocale),
    path: 'faxes',
    isActive: function isActive(path) {
      return path === 'faxes';
    },
    view: null,
    getData: function getData() {},
    cleanUp: function cleanUp() {}
  }, {
    icon: _react2.default.createElement('span', { className: _DynamicsFont2.default.active }),
    label: _i18n2.default.getString('call', currentLocale),
    path: 'recentCalls',
    isActive: function isActive(path) {
      return path === 'recentCalls';
    },
    view: _react2.default.createElement(_RecentActivityCalls2.default, {
      calls: calls,
      dateTimeFormatter: dateTimeFormatter,
      currentLocale: currentLocale,
      isCallsLoaded: recentCalls.isCallsLoaded
    }),
    getData: function getData() {
      recentCalls.getCalls({ currentContact: currentContact, sessionId: sessionId });
    },
    cleanUp: function cleanUp() {
      return recentCalls.cleanUpCalls({ contact: currentContact, sessionId: sessionId });
    }
  }];
}

function mapToProps(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      locale = _ref2$phone.locale,
      dateTimeFormat = _ref2$phone.dateTimeFormat,
      recentMessages = _ref2$phone.recentMessages,
      recentCalls = _ref2$phone.recentCalls,
      contactMatcher = _ref2$phone.contactMatcher,
      _ref2$currentLocale = _ref2.currentLocale,
      currentLocale = _ref2$currentLocale === undefined ? locale.currentLocale : _ref2$currentLocale,
      navigateTo = _ref2.navigateTo,
      _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
      dateTimeFormatter = _ref2$dateTimeFormatt === undefined ? function () {
    return dateTimeFormat.formatDateTime.apply(dateTimeFormat, arguments);
  } : _ref2$dateTimeFormatt,
      getSession = _ref2.getSession,
      useContact = _ref2.useContact,
      contact = _ref2.contact;

  var sessionId = null;
  var currentContact = contact;
  var ready = dateTimeFormat.ready && locale.ready && recentMessages.ready && recentCalls.ready;
  if (!useContact) {
    var session = getSession();
    sessionId = session.id;
    currentContact = session.contactMatch;
    var contactMapping = contactMatcher && contactMatcher.dataMapping;
    var phoneNumber = session.direction === _callDirections2.default.outbound ? session.to : session.from;
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
    title: _i18n2.default.getString('recentActivities', locale.currentLocale),
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
      sessionId: sessionId
    }),
    defaultTab: 'recentCalls'
  };
}

exports.default = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps)(_RecentActivityPanel2.default));
//# sourceMappingURL=index.js.map
