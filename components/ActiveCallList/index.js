'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActiveCallItem = require('../ActiveCallItem');

var _ActiveCallItem2 = _interopRequireDefault(_ActiveCallItem);

var _ActiveCallItemV = require('../ActiveCallItemV2');

var _ActiveCallItemV2 = _interopRequireDefault(_ActiveCallItemV);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isConferenceCall(normalizedCall) {
  return normalizedCall && normalizedCall.to && Array.isArray(normalizedCall.to.phoneNumber) && normalizedCall.to.phoneNumber.length === 0 && normalizedCall.toName === 'Conference';
}

function ActiveCallList(_ref) {
  var calls = _ref.calls,
      className = _ref.className,
      currentLocale = _ref.currentLocale,
      areaCode = _ref.areaCode,
      countryCode = _ref.countryCode,
      brand = _ref.brand,
      showContactDisplayPlaceholder = _ref.showContactDisplayPlaceholder,
      formatPhone = _ref.formatPhone,
      onClickToSms = _ref.onClickToSms,
      onCreateContact = _ref.onCreateContact,
      onViewContact = _ref.onViewContact,
      outboundSmsPermission = _ref.outboundSmsPermission,
      internalSmsPermission = _ref.internalSmsPermission,
      isLoggedContact = _ref.isLoggedContact,
      onLogCall = _ref.onLogCall,
      autoLog = _ref.autoLog,
      loggingMap = _ref.loggingMap,
      webphoneAnswer = _ref.webphoneAnswer,
      webphoneReject = _ref.webphoneReject,
      webphoneHangup = _ref.webphoneHangup,
      webphoneResume = _ref.webphoneResume,
      webphoneToVoicemail = _ref.webphoneToVoicemail,
      enableContactFallback = _ref.enableContactFallback,
      title = _ref.title,
      sourceIcons = _ref.sourceIcons,
      phoneTypeRenderer = _ref.phoneTypeRenderer,
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
      isSessionAConferenceCall = _ref.isSessionAConferenceCall,
      onCallItemClick = _ref.onCallItemClick,
      showAvatar = _ref.showAvatar,
      getAvatarUrl = _ref.getAvatarUrl,
      conferenceCallParties = _ref.conferenceCallParties,
      useV2 = _ref.useV2,
      webphoneHold = _ref.webphoneHold,
      showCallDetail = _ref.showCallDetail,
      updateSessionMatchedContact = _ref.updateSessionMatchedContact,
      renderExtraButton = _ref.renderExtraButton,
      renderContactName = _ref.renderContactName,
      ringoutHangup = _ref.ringoutHangup,
      ringoutTransfer = _ref.ringoutTransfer,
      ringoutReject = _ref.ringoutReject,
      disableLinks = _ref.disableLinks,
      showRingoutCallControl = _ref.showRingoutCallControl;

  if (!calls.length) {
    return null;
  }
  var Component = useV2 ? _ActiveCallItemV2.default : _ActiveCallItem2.default;

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.list, className) },
    _react2.default.createElement(
      'div',
      {
        className: _styles2.default.listTitle,
        style: {
          marginBottom: useV2 && title ? '-5px' : null
        }
      },
      title
    ),
    calls.map(function (call) {
      var isOnConferenceCall = call.webphoneSession ? isSessionAConferenceCall(call.webphoneSession.id) : isConferenceCall(call); // in case it's an other device call

      return _react2.default.createElement(Component, {
        call: call,
        key: call.id,
        isOnConferenceCall: isOnConferenceCall,
        currentLocale: currentLocale,
        areaCode: areaCode,
        countryCode: countryCode,
        brand: brand,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        formatPhone: formatPhone,
        onClickToSms: onClickToSms,
        internalSmsPermission: internalSmsPermission,
        outboundSmsPermission: outboundSmsPermission,
        isLoggedContact: isLoggedContact,
        onLogCall: onLogCall,
        onViewContact: onViewContact,
        onCreateContact: onCreateContact,
        loggingMap: loggingMap,
        webphoneAnswer: webphoneAnswer,
        webphoneReject: webphoneReject,
        webphoneHangup: webphoneHangup,
        webphoneResume: webphoneResume,
        webphoneToVoicemail: webphoneToVoicemail,
        enableContactFallback: enableContactFallback,
        autoLog: autoLog,
        sourceIcons: sourceIcons,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        hasActionMenu: !isOnConferenceCall,
        onClick: function onClick() {
          return onCallItemClick(call);
        },
        showAvatar: showAvatar,
        getAvatarUrl: getAvatarUrl,
        conferenceCallParties: conferenceCallParties,
        webphoneHold: webphoneHold,
        showCallDetail: showCallDetail,
        updateSessionMatchedContact: updateSessionMatchedContact,
        renderExtraButton: renderExtraButton,
        renderContactName: renderContactName,
        ringoutHangup: ringoutHangup,
        ringoutTransfer: ringoutTransfer,
        ringoutReject: ringoutReject,
        disableLinks: disableLinks,
        showRingoutCallControl: showRingoutCallControl
      });
    })
  );
}

ActiveCallList.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  title: _propTypes2.default.string.isRequired,
  calls: _propTypes2.default.array.isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  brand: _propTypes2.default.string,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  formatPhone: _propTypes2.default.func.isRequired,
  onClickToSms: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  onViewContact: _propTypes2.default.func,
  outboundSmsPermission: _propTypes2.default.bool,
  internalSmsPermission: _propTypes2.default.bool,
  isLoggedContact: _propTypes2.default.func,
  onLogCall: _propTypes2.default.func,
  loggingMap: _propTypes2.default.object,
  webphoneAnswer: _propTypes2.default.func,
  webphoneReject: _propTypes2.default.func,
  webphoneHangup: _propTypes2.default.func,
  webphoneResume: _propTypes2.default.func,
  webphoneToVoicemail: _propTypes2.default.func,
  enableContactFallback: _propTypes2.default.bool,
  autoLog: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object,
  phoneTypeRenderer: _propTypes2.default.func,
  phoneSourceNameRenderer: _propTypes2.default.func,
  isSessionAConferenceCall: _propTypes2.default.func,
  useV2: _propTypes2.default.bool,
  onCallItemClick: _propTypes2.default.func,
  showAvatar: _propTypes2.default.bool,
  getAvatarUrl: _propTypes2.default.func,
  conferenceCallParties: _propTypes2.default.arrayOf(_propTypes2.default.object),
  webphoneHold: _propTypes2.default.func,
  showCallDetail: _propTypes2.default.bool,
  updateSessionMatchedContact: _propTypes2.default.func,
  renderExtraButton: _propTypes2.default.func,
  renderContactName: _propTypes2.default.func,
  ringoutHangup: _propTypes2.default.func,
  ringoutTransfer: _propTypes2.default.func,
  ringoutReject: _propTypes2.default.func,
  disableLinks: _propTypes2.default.bool,
  showRingoutCallControl: _propTypes2.default.bool
};

ActiveCallList.defaultProps = {
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onLogCall: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  onViewContact: undefined,
  webphoneToVoicemail: undefined,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  isSessionAConferenceCall: function isSessionAConferenceCall() {
    return false;
  },
  useV2: false,
  onCallItemClick: function onCallItemClick(i) {
    return i;
  },
  showAvatar: true,
  getAvatarUrl: function getAvatarUrl(i) {
    return i;
  },
  conferenceCallParties: [],
  webphoneHold: function webphoneHold(i) {
    return i;
  },
  showCallDetail: false,
  updateSessionMatchedContact: function updateSessionMatchedContact(i) {
    return i;
  },
  renderExtraButton: undefined,
  renderContactName: undefined,
  ringoutHangup: undefined,
  ringoutTransfer: undefined,
  ringoutReject: undefined,
  disableLinks: false,
  showRingoutCallControl: false
};

exports.default = ActiveCallList;
//# sourceMappingURL=index.js.map
