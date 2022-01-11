"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _is_type = require("@ringcentral-integration/commons/lib/di/utils/is_type");

var _callCtrlLayouts = _interopRequireDefault(require("../../enums/callCtrlLayouts"));

var _ActiveCallPad = _interopRequireDefault(require("../ActiveCallPad"));

var _BackButton = _interopRequireDefault(require("../BackButton"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _DurationCounter = _interopRequireDefault(require("../DurationCounter"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _CallInfo = _interopRequireDefault(require("./CallInfo"));

var _ConferenceInfo = _interopRequireDefault(require("./ConferenceInfo"));

var _MergeInfo = _interopRequireDefault(require("./MergeInfo"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ActiveCallPanel = function ActiveCallPanel(_ref) {
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
      onFlip = _ref.onFlip,
      onTransfer = _ref.onTransfer,
      gotoParticipantsCtrl = _ref.gotoParticipantsCtrl,
      children = _ref.children,
      showContactDisplayPlaceholder = _ref.showContactDisplayPlaceholder,
      brand = _ref.brand,
      disableFlip = _ref.disableFlip,
      showPark = _ref.showPark,
      sourceIcons = _ref.sourceIcons,
      phoneTypeRenderer = _ref.phoneTypeRenderer,
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
      layout = _ref.layout,
      direction = _ref.direction,
      addDisabled = _ref.addDisabled,
      mergeDisabled = _ref.mergeDisabled,
      conferenceCallEquipped = _ref.conferenceCallEquipped,
      hasConferenceCall = _ref.hasConferenceCall,
      conferenceCallParties = _ref.conferenceCallParties,
      lastCallInfo = _ref.lastCallInfo,
      getAvatarUrl = _ref.getAvatarUrl,
      actions = _ref.actions,
      controlBusy = _ref.controlBusy,
      callQueueName = _ref.callQueueName,
      isOnTransfer = _ref.isOnTransfer,
      isOnWaitingTransfer = _ref.isOnWaitingTransfer,
      onCompleteTransfer = _ref.onCompleteTransfer;
  var backHeader = showBackButton ? /*#__PURE__*/_react["default"].createElement(_BackHeader["default"], {
    onBackClick: onBackButtonClick,
    backButton: /*#__PURE__*/_react["default"].createElement(_BackButton["default"], {
      label: backButtonLabel
    })
  }) : null;

  var timeCounter = /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].timeCounter
  }, startTime ? /*#__PURE__*/_react["default"].createElement(_DurationCounter["default"], {
    startTime: startTime,
    offset: startTimeOffset
  }) : /*#__PURE__*/_react["default"].createElement("span", {
    "aria-hidden": "true"
  }, "\xA0"));

  var currentCallTitle = (0, _is_type.isArray)(nameMatches) && nameMatches.length ? nameMatches[0].name : formatPhone(phoneNumber);
  var callInfo;

  switch (layout) {
    case _callCtrlLayouts["default"].completeTransferCtrl:
    case _callCtrlLayouts["default"].mergeCtrl:
      callInfo = /*#__PURE__*/_react["default"].createElement(_MergeInfo["default"], {
        currentLocale: currentLocale,
        timeCounter: timeCounter,
        lastCallInfo: lastCallInfo,
        currentCallAvatarUrl: avatarUrl,
        currentCallTitle: currentCallTitle || fallBackName,
        formatPhone: formatPhone,
        getAvatarUrl: getAvatarUrl
      });
      break;

    case _callCtrlLayouts["default"].conferenceCtrl:
      callInfo = /*#__PURE__*/_react["default"].createElement(_ConferenceInfo["default"], {
        currentLocale: currentLocale,
        partyProfiles: conferenceCallParties,
        onClick: gotoParticipantsCtrl
      });
      break;

    default:
      callInfo = /*#__PURE__*/_react["default"].createElement(_CallInfo["default"], {
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
        sourceIcons: sourceIcons,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        callQueueName: callQueueName
      });
      break;
  }

  var showTimeCounter = layout !== _callCtrlLayouts["default"].mergeCtrl && layout !== _callCtrlLayouts["default"].completeTransferCtrl;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "activeCallPanel",
    className: _styles["default"].root
  }, backHeader, /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
    className: _styles["default"].panel
  }, showTimeCounter ? timeCounter : null, callInfo, /*#__PURE__*/_react["default"].createElement(_ActiveCallPad["default"], {
    className: _styles["default"].callPad,
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
    onTransfer: onTransfer,
    onFlip: onFlip,
    disableFlip: disableFlip,
    onPark: onPark,
    showPark: showPark,
    layout: layout,
    direction: direction,
    addDisabled: addDisabled,
    mergeDisabled: mergeDisabled,
    conferenceCallEquipped: conferenceCallEquipped,
    hasConferenceCall: hasConferenceCall,
    actions: actions,
    controlBusy: controlBusy,
    isOnTransfer: isOnTransfer,
    isOnWaitingTransfer: isOnWaitingTransfer,
    onCompleteTransfer: onCompleteTransfer
  }), children));
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
  disableFlip: false,
  showPark: false,
  onAdd: undefined,
  onMerge: undefined,
  onFlip: function onFlip() {
    return null;
  },
  onPark: function onPark() {
    return null;
  },
  gotoParticipantsCtrl: function gotoParticipantsCtrl() {
    return null;
  },
  onCompleteTransfer: function onCompleteTransfer() {
    return null;
  },
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  direction: null,
  addDisabled: false,
  mergeDisabled: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  conferenceCallParties: undefined,
  lastCallInfo: undefined,
  getAvatarUrl: function getAvatarUrl() {
    return null;
  },
  actions: [],
  controlBusy: false,
  callQueueName: null,
  isOnWaitingTransfer: false,
  isOnTransfer: false
};
var _default = ActiveCallPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
