'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CallInfo = require('./CallInfo');

var _CallInfo2 = _interopRequireDefault(_CallInfo);

var _MergeInfo = require('./MergeInfo');

var _MergeInfo2 = _interopRequireDefault(_MergeInfo);

var _ConferenceInfo = require('./ConferenceInfo');

var _ConferenceInfo2 = _interopRequireDefault(_ConferenceInfo);

var _BackButton = require('../BackButton');

var _BackButton2 = _interopRequireDefault(_BackButton);

var _BackHeader = require('../BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _DurationCounter = require('../DurationCounter');

var _DurationCounter2 = _interopRequireDefault(_DurationCounter);

var _ActiveCallPad = require('../ActiveCallPad');

var _ActiveCallPad2 = _interopRequireDefault(_ActiveCallPad);

var _callCtrlLayouts = require('../../enums/callCtrlLayouts');

var _callCtrlLayouts2 = _interopRequireDefault(_callCtrlLayouts);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ActiveCallPanel(_ref) {
  var showBackButton = _ref.showBackButton,
      backButtonLabel = _ref.backButtonLabel,
      onBackButtonClick = _ref.onBackButtonClick,
      currentLocale = _ref.currentLocale,
      nameMatches = _ref.nameMatches,
      fallBackName = _ref.fallBackName,
      phoneNumber = _ref.phoneNumber,
      formatPhone = _ref.formatPhone,
      startTime = _ref.startTime,
      startTimeOffset = _ref.startTimeOffset,
      areaCode = _ref.areaCode,
      countryCode = _ref.countryCode,
      selectedMatcherIndex = _ref.selectedMatcherIndex,
      onSelectMatcherName = _ref.onSelectMatcherName,
      avatarUrl = _ref.avatarUrl,
      isOnMute = _ref.isOnMute,
      isOnHold = _ref.isOnHold,
      recordStatus = _ref.recordStatus,
      onMute = _ref.onMute,
      onUnmute = _ref.onUnmute,
      onHold = _ref.onHold,
      onUnhold = _ref.onUnhold,
      onRecord = _ref.onRecord,
      onStopRecord = _ref.onStopRecord,
      onShowKeyPad = _ref.onShowKeyPad,
      onHangup = _ref.onHangup,
      onPark = _ref.onPark,
      onAdd = _ref.onAdd,
      onMerge = _ref.onMerge,
      onShowFlipPanel = _ref.onShowFlipPanel,
      onToggleTransferPanel = _ref.onToggleTransferPanel,
      onOpenPartiesModal = _ref.onOpenPartiesModal,
      children = _ref.children,
      showContactDisplayPlaceholder = _ref.showContactDisplayPlaceholder,
      brand = _ref.brand,
      flipNumbers = _ref.flipNumbers,
      sourceIcons = _ref.sourceIcons,
      layout = _ref.layout,
      direction = _ref.direction,
      addDisabled = _ref.addDisabled,
      mergeDisabled = _ref.mergeDisabled,
      conferenceCallEquipped = _ref.conferenceCallEquipped,
      hasConferenceCall = _ref.hasConferenceCall,
      conferenceCallParties = _ref.conferenceCallParties,
      lastCallInfo = _ref.lastCallInfo,
      onLastCallEnded = _ref.onLastCallEnded;

  var backHeader = showBackButton ? _react2.default.createElement(_BackHeader2.default, {
    onBackClick: onBackButtonClick,
    backButton: _react2.default.createElement(_BackButton2.default, { label: backButtonLabel })
  }) : null;

  var timeCounter = _react2.default.createElement(
    'div',
    { className: _styles2.default.timeCounter },
    startTime ? _react2.default.createElement(_DurationCounter2.default, { startTime: startTime, offset: startTimeOffset }) : _react2.default.createElement(
      'span',
      { 'aria-hidden': 'true' },
      '\xA0'
    )
  );

  var currentCallTitle = nameMatches.length ? nameMatches[0].name : phoneNumber;

  var callInfo = void 0;

  switch (layout) {
    case _callCtrlLayouts2.default.mergeCtrl:
      callInfo = _react2.default.createElement(_MergeInfo2.default, {
        currentLocale: currentLocale,
        timeCounter: timeCounter,
        lastCallInfo: lastCallInfo,
        onLastCallEnded: onLastCallEnded,
        currentCallAvatarUrl: avatarUrl,
        currentCallTitle: currentCallTitle || fallBackName
      });
      break;

    case _callCtrlLayouts2.default.conferenceCtrl:
      callInfo = _react2.default.createElement(_ConferenceInfo2.default, {
        currentLocale: currentLocale,
        partyProfiles: conferenceCallParties,
        onClick: onOpenPartiesModal
      });
      break;

    default:
      callInfo = _react2.default.createElement(_CallInfo2.default, {
        currentLocale: currentLocale,
        nameMatches: nameMatches,
        fallBackName: fallBackName,
        phoneNumber: phoneNumber,
        formatPhone: formatPhone,
        startTime: startTime,
        areaCode: areaCode,
        countryCode: countryCode,
        selectedMatcherIndex: selectedMatcherIndex,
        onSelectMatcherName: onSelectMatcherName,
        avatarUrl: avatarUrl,
        brand: brand,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        sourceIcons: sourceIcons
      });
      break;
  }

  return _react2.default.createElement(
    'div',
    { className: _styles2.default.root },
    backHeader,
    _react2.default.createElement(
      _Panel2.default,
      { className: _styles2.default.panel },
      layout !== _callCtrlLayouts2.default.mergeCtrl ? timeCounter : null,
      callInfo,
      _react2.default.createElement(_ActiveCallPad2.default, {
        className: _styles2.default.callPad,
        currentLocale: currentLocale,
        isOnMute: isOnMute,
        isOnHold: isOnHold,
        recordStatus: recordStatus,
        onMute: onMute,
        onUnmute: onUnmute,
        onHold: onHold,
        onUnhold: onUnhold,
        onRecord: onRecord,
        onStopRecord: onStopRecord,
        onShowKeyPad: onShowKeyPad,
        onHangup: onHangup,
        onAdd: onAdd,
        onMerge: onMerge,
        onShowFlipPanel: onShowFlipPanel,
        onToggleTransferPanel: onToggleTransferPanel,
        flipNumbers: flipNumbers,
        onPark: onPark,
        layout: layout,
        direction: direction,
        addDisabled: addDisabled,
        mergeDisabled: mergeDisabled,
        conferenceCallEquipped: conferenceCallEquipped,
        hasConferenceCall: hasConferenceCall
      }),
      children
    )
  );
}

ActiveCallPanel.propTypes = {
  phoneNumber: _propTypes2.default.string,
  nameMatches: _propTypes2.default.array.isRequired,
  fallBackName: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  startTime: _propTypes2.default.number,
  startTimeOffset: _propTypes2.default.number,
  isOnMute: _propTypes2.default.bool,
  isOnHold: _propTypes2.default.bool,
  recordStatus: _propTypes2.default.string.isRequired,
  onMute: _propTypes2.default.func.isRequired,
  onUnmute: _propTypes2.default.func.isRequired,
  onHold: _propTypes2.default.func.isRequired,
  onUnhold: _propTypes2.default.func.isRequired,
  onRecord: _propTypes2.default.func.isRequired,
  onStopRecord: _propTypes2.default.func.isRequired,
  onAdd: _propTypes2.default.func,
  onMerge: _propTypes2.default.func,
  onHangup: _propTypes2.default.func.isRequired,
  onPark: _propTypes2.default.func.isRequired,
  showBackButton: _propTypes2.default.bool,
  backButtonLabel: _propTypes2.default.string,
  onBackButtonClick: _propTypes2.default.func,
  onShowKeyPad: _propTypes2.default.func.isRequired,
  formatPhone: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  selectedMatcherIndex: _propTypes2.default.number.isRequired,
  onSelectMatcherName: _propTypes2.default.func.isRequired,
  avatarUrl: _propTypes2.default.string,
  brand: _propTypes2.default.string,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  onShowFlipPanel: _propTypes2.default.func,
  flipNumbers: _propTypes2.default.array,
  onToggleTransferPanel: _propTypes2.default.func,
  onOpenPartiesModal: _propTypes2.default.func,
  sourceIcons: _propTypes2.default.object,
  layout: _propTypes2.default.string.isRequired,
  direction: _propTypes2.default.string,
  addDisabled: _propTypes2.default.bool,
  mergeDisabled: _propTypes2.default.bool,
  conferenceCallParties: _propTypes2.default.array,
  conferenceCallEquipped: _propTypes2.default.bool,
  hasConferenceCall: _propTypes2.default.bool,
  lastCallInfo: _propTypes2.default.object,
  onLastCallEnded: _propTypes2.default.func
};

ActiveCallPanel.defaultProps = {
  startTime: null,
  startTimeOffset: 0,
  isOnMute: false,
  isOnHold: false,
  phoneNumber: null,
  children: undefined,
  avatarUrl: null,
  showBackButton: false,
  backButtonLabel: 'Active Calls',
  onBackButtonClick: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  flipNumbers: [],
  onAdd: undefined,
  onMerge: undefined,
  onShowFlipPanel: function onShowFlipPanel() {
    return null;
  },
  onToggleTransferPanel: function onToggleTransferPanel() {
    return null;
  },
  onOpenPartiesModal: function onOpenPartiesModal() {
    return null;
  },
  sourceIcons: undefined,
  direction: null,
  addDisabled: false,
  mergeDisabled: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  conferenceCallParties: undefined,
  lastCallInfo: undefined,
  onLastCallEnded: undefined
};

exports.default = ActiveCallPanel;
//# sourceMappingURL=index.js.map
