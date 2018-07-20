'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActiveCallItem = require('../ActiveCallItem');

var _ActiveCallItem2 = _interopRequireDefault(_ActiveCallItem);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isConferenceCall(normalizedCall) {
  return normalizedCall.to.phoneNumber.length === 0 && normalizedCall.toName === 'Conference';
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
      isWebRTC = _ref.isWebRTC,
      currentCall = _ref.currentCall,
      conferenceCallEquipped = _ref.conferenceCallEquipped,
      hasConferenceCall = _ref.hasConferenceCall,
      disableMerge = _ref.disableMerge,
      mergeToConference = _ref.mergeToConference,
      isSessionAConferenceCall = _ref.isSessionAConferenceCall,
      onConfirmMergeCall = _ref.onConfirmMergeCall;

  if (!calls.length) {
    return null;
  }

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.list, className) },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.listTitle },
      title
    ),
    calls.map(function (call) {
      var showMergeCall = false;
      var isOnConferenceCall = false;
      var onMergeCall = null;
      if (conferenceCallEquipped) {
        isOnConferenceCall = call.webphoneSession ? isSessionAConferenceCall(call.webphoneSession.id) : isConferenceCall(call); // in case it's an other device call
        var isCurrentCallAConf = currentCall ? isSessionAConferenceCall(currentCall.webphoneSession.id) : false;

        if (!isWebRTC) {
          showMergeCall = false;
        } else if (currentCall) {
          if (call === currentCall) {
            showMergeCall = false;
          } else if (call.direction === _callDirections2.default.inbound) {
            showMergeCall = false;
          } else if (currentCall.direction === _callDirections2.default.outbound) {
            if (hasConferenceCall) {
              showMergeCall = true;
              if (isOnConferenceCall) {
                onMergeCall = function onMergeCall() {
                  return mergeToConference([currentCall.webphoneSession]);
                };
              } else if (isCurrentCallAConf) {
                onMergeCall = function onMergeCall() {
                  return mergeToConference([call.webphoneSession]);
                };
              } else {
                onMergeCall = function onMergeCall() {
                  return onConfirmMergeCall(call);
                };
              }
            } else {
              showMergeCall = true;
              var partyCalls = [call.webphoneSession, currentCall.webphoneSession];
              onMergeCall = function onMergeCall() {
                return mergeToConference(partyCalls);
              };
            }
          } else if (hasConferenceCall) {
            if (isOnConferenceCall) {
              showMergeCall = false;
            } else {
              showMergeCall = true;
              onMergeCall = function onMergeCall() {
                onConfirmMergeCall(call);
              };
            }
          } else {
            showMergeCall = false;
          }
        } else {
          showMergeCall = false;
        }
      }

      return _react2.default.createElement(_ActiveCallItem2.default, {
        call: call,
        key: call.id,
        showMergeCall: showMergeCall,
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
        onMergeCall: onMergeCall,
        loggingMap: loggingMap,
        webphoneAnswer: webphoneAnswer,
        webphoneReject: webphoneReject,
        webphoneHangup: webphoneHangup,
        webphoneResume: webphoneResume,
        webphoneToVoicemail: webphoneToVoicemail,
        enableContactFallback: enableContactFallback,
        autoLog: autoLog,
        sourceIcons: sourceIcons,
        disableMerge: disableMerge,
        hasActionMenu: !isOnConferenceCall
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
  isWebRTC: _propTypes2.default.bool.isRequired,
  conferenceCallEquipped: _propTypes2.default.bool,
  hasConferenceCall: _propTypes2.default.bool,
  currentCall: _propTypes2.default.object,
  disableMerge: _propTypes2.default.bool,
  mergeToConference: _propTypes2.default.func,
  isSessionAConferenceCall: _propTypes2.default.func,
  onConfirmMergeCall: _propTypes2.default.func
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
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  currentCall: undefined,
  disableMerge: false,
  mergeToConference: function mergeToConference(i) {
    return i;
  },
  isSessionAConferenceCall: function isSessionAConferenceCall() {
    return false;
  },
  onConfirmMergeCall: function onConfirmMergeCall(i) {
    return i;
  }
};

exports.default = ActiveCallList;
//# sourceMappingURL=index.js.map
