"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _react = _interopRequireDefault(require("react"));
var _CallItem = _interopRequireDefault(require("../CallItem"));
var _NoCalls = _interopRequireDefault(require("../NoCalls"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CallList = function CallList(_ref) {
  var className = _ref.className,
    brand = _ref.brand,
    currentLocale = _ref.currentLocale,
    calls = _ref.calls,
    areaCode = _ref.areaCode,
    countryCode = _ref.countryCode,
    onViewContact = _ref.onViewContact,
    onCreateContact = _ref.onCreateContact,
    createEntityTypes = _ref.createEntityTypes,
    onLogCall = _ref.onLogCall,
    onClickToDial = _ref.onClickToDial,
    onClickToSms = _ref.onClickToSms,
    isLoggedContact = _ref.isLoggedContact,
    dateTimeFormatter = _ref.dateTimeFormatter,
    enableContactFallback = _ref.enableContactFallback,
    showCallerIdName = _ref.showCallerIdName,
    sourceIcons = _ref.sourceIcons,
    phoneTypeRenderer = _ref.phoneTypeRenderer,
    phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
    renderContactName = _ref.renderContactName,
    renderExtraButton = _ref.renderExtraButton,
    contactDisplayStyle = _ref.contactDisplayStyle,
    externalViewEntity = _ref.externalViewEntity,
    externalHasEntity = _ref.externalHasEntity,
    shouldHideEntityButton = _ref.shouldHideEntityButton,
    maxExtensionNumberLength = _ref.maxExtensionNumberLength,
    _ref$currentSiteCode = _ref.currentSiteCode,
    currentSiteCode = _ref$currentSiteCode === void 0 ? '' : _ref$currentSiteCode,
    _ref$isSyncingActivit = _ref.isSyncingActivityMatcher,
    isSyncingActivityMatcher = _ref$isSyncingActivit === void 0 ? false : _ref$isSyncingActivit,
    _ref$isMultipleSiteEn = _ref.isMultipleSiteEnabled,
    isMultipleSiteEnabled = _ref$isMultipleSiteEn === void 0 ? false : _ref$isMultipleSiteEn,
    _ref$active = _ref.active,
    active = _ref$active === void 0 ? false : _ref$active,
    _ref$disableLinks = _ref.disableLinks,
    disableLinks = _ref$disableLinks === void 0 ? false : _ref$disableLinks,
    _ref$disableCallButto = _ref.disableCallButton,
    disableCallButton = _ref$disableCallButto === void 0 ? false : _ref$disableCallButto,
    _ref$disableClickToDi = _ref.disableClickToDial,
    disableClickToDial = _ref$disableClickToDi === void 0 ? false : _ref$disableClickToDi,
    _ref$outboundSmsPermi = _ref.outboundSmsPermission,
    outboundSmsPermission = _ref$outboundSmsPermi === void 0 ? false : _ref$outboundSmsPermi,
    _ref$internalSmsPermi = _ref.internalSmsPermission,
    internalSmsPermission = _ref$internalSmsPermi === void 0 ? false : _ref$internalSmsPermi,
    _ref$loggingMap = _ref.loggingMap,
    loggingMap = _ref$loggingMap === void 0 ? {} : _ref$loggingMap,
    _ref$showContactDispl = _ref.showContactDisplayPlaceholder,
    showContactDisplayPlaceholder = _ref$showContactDispl === void 0 ? true : _ref$showContactDispl,
    _ref$autoLog = _ref.autoLog,
    autoLog = _ref$autoLog === void 0 ? false : _ref$autoLog,
    _ref$readTextPermissi = _ref.readTextPermission,
    readTextPermission = _ref$readTextPermissi === void 0 ? true : _ref$readTextPermissi,
    _ref$enableCDC = _ref.enableCDC,
    enableCDC = _ref$enableCDC === void 0 ? false : _ref$enableCDC,
    callsDelaySavingState = _ref.callsDelaySavingState;
  if (calls && calls.length) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: className
    }, calls.map(function (call, index) {
      return /*#__PURE__*/_react["default"].createElement(_CallItem["default"], {
        key: call.id,
        call: call,
        renderIndex: index,
        currentLocale: currentLocale,
        brand: brand,
        areaCode: areaCode,
        countryCode: countryCode,
        currentSiteCode: currentSiteCode,
        isMultipleSiteEnabled: isMultipleSiteEnabled,
        showCallerIdName: showCallerIdName,
        onViewContact: onViewContact,
        onCreateContact: onCreateContact,
        createEntityTypes: createEntityTypes,
        onLogCall: onLogCall,
        onClickToDial: onClickToDial,
        onClickToSms: onClickToSms,
        isLoggedContact: isLoggedContact,
        disableLinks: disableLinks,
        disableCallButton: disableCallButton,
        disableClickToDial: disableClickToDial,
        outboundSmsPermission: outboundSmsPermission,
        internalSmsPermission: internalSmsPermission,
        active: !!active,
        dateTimeFormatter: dateTimeFormatter,
        isLogging: !!loggingMap[call.sessionId],
        enableContactFallback: enableContactFallback,
        autoLog: autoLog,
        isSyncingActivityMatcher: isSyncingActivityMatcher,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        sourceIcons: sourceIcons,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        renderContactName: renderContactName,
        renderExtraButton: renderExtraButton,
        contactDisplayStyle: contactDisplayStyle,
        externalViewEntity: externalViewEntity,
        externalHasEntity: externalHasEntity,
        shouldHideEntityButton: shouldHideEntityButton,
        readTextPermission: readTextPermission,
        enableCDC: enableCDC,
        maxExtensionNumberLength: maxExtensionNumberLength,
        currentDelaySavingState: callsDelaySavingState && callsDelaySavingState[call.sessionId]
      });
    }));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: className
  }, /*#__PURE__*/_react["default"].createElement(_NoCalls["default"], {
    currentLocale: currentLocale,
    active: !!active
  }));
};
var _default = exports["default"] = CallList;
//# sourceMappingURL=index.js.map
