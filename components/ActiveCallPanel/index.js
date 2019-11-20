"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _is_type = require("ringcentral-integration/lib/di/utils/is_type");

var _CallInfo = _interopRequireDefault(require("./CallInfo"));

var _MergeInfo = _interopRequireDefault(require("./MergeInfo"));

var _ConferenceInfo = _interopRequireDefault(require("./ConferenceInfo"));

var _BackButton = _interopRequireDefault(require("../BackButton"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _DurationCounter = _interopRequireDefault(require("../DurationCounter"));

var _ActiveCallPad = _interopRequireDefault(require("../ActiveCallPad"));

var _callCtrlLayouts = _interopRequireDefault(require("../../enums/callCtrlLayouts"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
      onFlip = _ref.onFlip,
      onTransfer = _ref.onTransfer,
      gotoParticipantsCtrl = _ref.gotoParticipantsCtrl,
      children = _ref.children,
      showContactDisplayPlaceholder = _ref.showContactDisplayPlaceholder,
      brand = _ref.brand,
      disableFlip = _ref.disableFlip,
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
      controlBusy = _ref.controlBusy;
  var backHeader = showBackButton ? _react["default"].createElement(_BackHeader["default"], {
    onBackClick: onBackButtonClick,
    backButton: _react["default"].createElement(_BackButton["default"], {
      label: backButtonLabel
    })
  }) : null;

  var timeCounter = _react["default"].createElement("div", {
    className: _styles["default"].timeCounter
  }, startTime ? _react["default"].createElement(_DurationCounter["default"], {
    startTime: startTime,
    offset: startTimeOffset
  }) : _react["default"].createElement("span", {
    "aria-hidden": "true"
  }, "\xA0"));

  var currentCallTitle = (0, _is_type.isArray)(nameMatches) && nameMatches.length ? nameMatches[0].name : formatPhone(phoneNumber);
  var callInfo;

  switch (layout) {
    case _callCtrlLayouts["default"].mergeCtrl:
      callInfo = _react["default"].createElement(_MergeInfo["default"], {
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
      callInfo = _react["default"].createElement(_ConferenceInfo["default"], {
        currentLocale: currentLocale,
        partyProfiles: conferenceCallParties,
        onClick: gotoParticipantsCtrl
      });
      break;

    default:
      callInfo = _react["default"].createElement(_CallInfo["default"], {
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
        phoneSourceNameRenderer: phoneSourceNameRenderer
      });
      break;
  }

  return _react["default"].createElement("div", {
    "data-sign": "activeCallPanel",
    className: _styles["default"].root
  }, backHeader, _react["default"].createElement(_Panel["default"], {
    className: _styles["default"].panel
  }, layout !== _callCtrlLayouts["default"].mergeCtrl ? timeCounter : null, callInfo, _react["default"].createElement(_ActiveCallPad["default"], {
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
    layout: layout,
    direction: direction,
    addDisabled: addDisabled,
    mergeDisabled: mergeDisabled,
    conferenceCallEquipped: conferenceCallEquipped,
    hasConferenceCall: hasConferenceCall,
    actions: actions,
    controlBusy: controlBusy
  }), children));
}

ActiveCallPanel.propTypes = {
  phoneNumber: _propTypes["default"].string,
  nameMatches: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  fallBackName: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  startTime: _propTypes["default"].number,
  startTimeOffset: _propTypes["default"].number,
  isOnMute: _propTypes["default"].bool,
  isOnHold: _propTypes["default"].bool,
  recordStatus: _propTypes["default"].string.isRequired,
  onMute: _propTypes["default"].func.isRequired,
  onUnmute: _propTypes["default"].func.isRequired,
  onHold: _propTypes["default"].func.isRequired,
  onUnhold: _propTypes["default"].func.isRequired,
  onRecord: _propTypes["default"].func.isRequired,
  onStopRecord: _propTypes["default"].func.isRequired,
  onAdd: _propTypes["default"].func,
  onMerge: _propTypes["default"].func,
  onHangup: _propTypes["default"].func.isRequired,
  onPark: _propTypes["default"].func.isRequired,
  showBackButton: _propTypes["default"].bool,
  backButtonLabel: _propTypes["default"].string,
  onBackButtonClick: _propTypes["default"].func,
  onShowKeyPad: _propTypes["default"].func.isRequired,
  formatPhone: _propTypes["default"].func.isRequired,
  children: _propTypes["default"].node,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  selectedMatcherIndex: _propTypes["default"].number.isRequired,
  onSelectMatcherName: _propTypes["default"].func.isRequired,
  avatarUrl: _propTypes["default"].string,
  brand: _propTypes["default"].string,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  onFlip: _propTypes["default"].func,
  disableFlip: _propTypes["default"].bool,
  gotoParticipantsCtrl: _propTypes["default"].func,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  layout: _propTypes["default"].string.isRequired,
  direction: _propTypes["default"].string,
  addDisabled: _propTypes["default"].bool,
  mergeDisabled: _propTypes["default"].bool,
  conferenceCallParties: _propTypes["default"].array,
  conferenceCallEquipped: _propTypes["default"].bool,
  hasConferenceCall: _propTypes["default"].bool,
  lastCallInfo: _propTypes["default"].object,
  getAvatarUrl: _propTypes["default"].func,
  actions: _propTypes["default"].array,
  controlBusy: _propTypes["default"].bool
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
  onAdd: undefined,
  onMerge: undefined,
  onFlip: function onFlip() {
    return null;
  },
  gotoParticipantsCtrl: function gotoParticipantsCtrl() {
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
  controlBusy: false
};
var _default = ActiveCallPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
