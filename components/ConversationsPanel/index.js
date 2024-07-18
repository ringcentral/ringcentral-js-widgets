"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationsPanel = void 0;
var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _ComposeText = _interopRequireDefault(require("../../assets/images/ComposeText.svg"));
var _ConversationList = _interopRequireDefault(require("../ConversationList"));
var _Header = require("../Header");
var _MessageTabButton = require("../MessageTabButton");
var _NavigationBar = require("../NavigationBar");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _useConversationTabData = require("./useConversationTabData");
var _NoMessage = _interopRequireDefault(require("./widgets/NoMessage"));
var _Search = _interopRequireDefault(require("./widgets/Search"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ConversationsPanel = function ConversationsPanel(props) {
  var _renderNoMessage;
  var _props$currentSiteCod = props.currentSiteCode,
    currentSiteCode = _props$currentSiteCod === void 0 ? '' : _props$currentSiteCod,
    _props$isMultipleSite = props.isMultipleSiteEnabled,
    isMultipleSiteEnabled = _props$isMultipleSite === void 0 ? false : _props$isMultipleSite,
    _props$showSpinner = props.showSpinner,
    showSpinner = _props$showSpinner === void 0 ? false : _props$showSpinner,
    _props$showTitle = props.showTitle,
    showTitle = _props$showTitle === void 0 ? false : _props$showTitle,
    _props$contactPlaceho = props.contactPlaceholder,
    contactPlaceholder = _props$contactPlaceho === void 0 ? '' : _props$contactPlaceho,
    _props$showContactDis = props.showContactDisplayPlaceholder,
    showContactDisplayPlaceholder = _props$showContactDis === void 0 ? true : _props$showContactDis,
    _props$showComposeTex = props.showComposeText,
    showComposeText = _props$showComposeTex === void 0 ? false : _props$showComposeTex,
    _props$typeFilter = props.typeFilter,
    typeFilter = _props$typeFilter === void 0 ? _messageTypes["default"].all : _props$typeFilter,
    _props$showGroupNumbe = props.showGroupNumberName,
    showGroupNumberName = _props$showGroupNumbe === void 0 ? false : _props$showGroupNumbe,
    _props$readTextPermis = props.readTextPermission,
    readTextPermission = _props$readTextPermis === void 0 ? true : _props$readTextPermis,
    _props$outboundSmsPer = props.outboundSmsPermission,
    outboundSmsPermission = _props$outboundSmsPer === void 0 ? true : _props$outboundSmsPer,
    _props$internalSmsPer = props.internalSmsPermission,
    internalSmsPermission = _props$internalSmsPer === void 0 ? true : _props$internalSmsPer,
    _props$readVoicemailP = props.readVoicemailPermission,
    readVoicemailPermission = _props$readVoicemailP === void 0 ? true : _props$readVoicemailP,
    _props$readFaxPermiss = props.readFaxPermission,
    readFaxPermission = _props$readFaxPermiss === void 0 ? true : _props$readFaxPermiss,
    _props$searchInput = props.searchInput,
    searchInput = _props$searchInput === void 0 ? '' : _props$searchInput,
    _props$perPage = props.perPage,
    perPage = _props$perPage === void 0 ? 20 : _props$perPage,
    _props$disableLinks = props.disableLinks,
    disableLinks = _props$disableLinks === void 0 ? false : _props$disableLinks,
    _props$disableCallBut = props.disableCallButton,
    disableCallButton = _props$disableCallBut === void 0 ? false : _props$disableCallBut,
    _props$disableClickTo = props.disableClickToDial,
    disableClickToDial = _props$disableClickTo === void 0 ? false : _props$disableClickTo,
    _props$autoLog = props.autoLog,
    autoLog = _props$autoLog === void 0 ? false : _props$autoLog,
    _props$composeTextPer = props.composeTextPermission,
    composeTextPermission = _props$composeTextPer === void 0 ? true : _props$composeTextPer,
    _props$loadingNextPag = props.loadingNextPage,
    loadingNextPage = _props$loadingNextPag === void 0 ? false : _props$loadingNextPag,
    _props$showChooseEnti = props.showChooseEntityModal,
    showChooseEntityModal = _props$showChooseEnti === void 0 ? true : _props$showChooseEnti,
    _props$shouldLogSelec = props.shouldLogSelectRecord,
    shouldLogSelectRecord = _props$shouldLogSelec === void 0 ? false : _props$shouldLogSelec,
    dropdownClassName = props.dropdownClassName,
    _props$enableCDC = props.enableCDC,
    enableCDC = _props$enableCDC === void 0 ? false : _props$enableCDC,
    onSearchInputChange = props.onSearchInputChange,
    currentLocale = props.currentLocale,
    conversations = props.conversations,
    brand = props.brand,
    showConversationDetail = props.showConversationDetail,
    readMessage = props.readMessage,
    markMessage = props.markMessage,
    dateTimeFormatter = props.dateTimeFormatter,
    sourceIcons = props.sourceIcons,
    phoneTypeRenderer = props.phoneTypeRenderer,
    phoneSourceNameRenderer = props.phoneSourceNameRenderer,
    areaCode = props.areaCode,
    countryCode = props.countryCode,
    onLogConversation = props.onLogConversation,
    onViewContact = props.onViewContact,
    onCreateContact = props.onCreateContact,
    createEntityTypes = props.createEntityTypes,
    onClickToDial = props.onClickToDial,
    onClickToSms = props.onClickToSms,
    unmarkMessage = props.unmarkMessage,
    enableContactFallback = props.enableContactFallback,
    deleteMessage = props.deleteMessage,
    goToComposeText = props.goToComposeText,
    previewFaxMessages = props.previewFaxMessages,
    loadNextPage = props.loadNextPage,
    renderExtraButton = props.renderExtraButton,
    updateTypeFilter = props.updateTypeFilter,
    renderSearchTip = props.renderSearchTip,
    renderNoMessage = props.renderNoMessage,
    onFaxDownload = props.onFaxDownload,
    onSelectContact = props.onSelectContact,
    renderContactList = props.renderContactList,
    maxExtensionNumberLength = props.maxExtensionNumberLength,
    renderContactName = props.renderContactName,
    externalHasEntity = props.externalHasEntity,
    externalViewEntity = props.externalViewEntity,
    shouldHideEntityButton = props.shouldHideEntityButton,
    formatPhone = props.formatPhone,
    renderActionMenuExtraButton = props.renderActionMenuExtraButton,
    onUnmount = props.onUnmount,
    faxUnreadCounts = props.faxUnreadCounts,
    textUnreadCounts = props.textUnreadCounts,
    voiceUnreadCounts = props.voiceUnreadCounts;
  (0, _react.useEffect)(function () {
    return onUnmount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var tabs = (0, _useConversationTabData.useConversationTabData)({
    currentLocale: currentLocale,
    readVoicemailPermission: readVoicemailPermission,
    voiceUnreadCounts: voiceUnreadCounts,
    readFaxPermission: readFaxPermission,
    faxUnreadCounts: faxUnreadCounts,
    readTextPermission: readTextPermission,
    textUnreadCounts: textUnreadCounts
  });
  var placeholder = onSearchInputChange && searchInput.length > 0 ? _i18n["default"].getString('noSearchResults', currentLocale) : _i18n["default"].getString('noMessages', currentLocale);
  var buttons = (0, _react.useMemo)(function () {
    var buttons = [];
    if (showComposeText) {
      buttons.push({
        label: /*#__PURE__*/_react["default"].createElement(_ComposeText["default"], {
          className: _styles["default"].composeText
        }),
        onClick: goToComposeText,
        placement: 'right'
      });
    }
    return buttons;
  }, [goToComposeText, showComposeText]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "ConversationsPanel",
    className: _styles["default"].root
  }, showTitle ? /*#__PURE__*/_react["default"].createElement(_Header.Header, {
    buttons: buttons
  }, _i18n["default"].getString('title', currentLocale)) : null, /*#__PURE__*/_react["default"].createElement(_NavigationBar.NavigationBar, {
    button: _MessageTabButton.MessageTabButton,
    className: _styles["default"].tabBar,
    currentPath: typeFilter,
    goTo: updateTypeFilter,
    tabs: tabs
  }), showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "messageList",
    className: (0, _clsx["default"])(_styles["default"].content, showTitle && _styles["default"].contentWithHeader)
  }, /*#__PURE__*/_react["default"].createElement(_Search["default"], {
    composeTextPermission: composeTextPermission,
    typeFilter: typeFilter,
    onSearchInputChange: onSearchInputChange,
    searchInput: searchInput,
    currentLocale: currentLocale,
    disableLinks: disableLinks,
    goToComposeText: goToComposeText,
    renderSearchTip: renderSearchTip
  }), conversations.length ? /*#__PURE__*/_react["default"].createElement(_ConversationList["default"], {
    formatPhone: formatPhone,
    className: onSearchInputChange ? _styles["default"].contentWithSearch : undefined,
    currentLocale: currentLocale,
    currentSiteCode: currentSiteCode,
    isMultipleSiteEnabled: isMultipleSiteEnabled,
    perPage: perPage,
    disableLinks: disableLinks,
    disableCallButton: disableCallButton,
    conversations: conversations,
    brand: brand,
    showConversationDetail: showConversationDetail,
    readMessage: readMessage,
    markMessage: markMessage,
    dateTimeFormatter: dateTimeFormatter,
    contactPlaceholder: contactPlaceholder,
    showContactDisplayPlaceholder: showContactDisplayPlaceholder,
    sourceIcons: sourceIcons,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    showGroupNumberName: showGroupNumberName,
    placeholder: placeholder,
    areaCode: areaCode,
    countryCode: countryCode,
    onLogConversation: onLogConversation,
    onViewContact: onViewContact,
    onCreateContact: onCreateContact,
    createEntityTypes: createEntityTypes,
    onClickToDial: onClickToDial,
    onClickToSms: onClickToSms,
    disableClickToDial: disableClickToDial,
    unmarkMessage: unmarkMessage,
    autoLog: autoLog,
    enableContactFallback: enableContactFallback,
    deleteMessage: deleteMessage,
    previewFaxMessages: previewFaxMessages,
    loadNextPage: loadNextPage,
    loadingNextPage: loadingNextPage,
    typeFilter: typeFilter,
    renderExtraButton: renderExtraButton,
    outboundSmsPermission: outboundSmsPermission,
    internalSmsPermission: internalSmsPermission,
    updateTypeFilter: updateTypeFilter,
    onFaxDownload: onFaxDownload,
    showChooseEntityModal: showChooseEntityModal,
    shouldLogSelectRecord: shouldLogSelectRecord,
    onSelectContact: onSelectContact,
    renderContactList: renderContactList,
    dropdownClassName: dropdownClassName,
    enableCDC: enableCDC,
    maxExtensionNumberLength: maxExtensionNumberLength,
    renderContactName: renderContactName,
    externalHasEntity: externalHasEntity,
    externalViewEntity: externalViewEntity,
    shouldHideEntityButton: shouldHideEntityButton,
    renderActionMenuExtraButton: renderActionMenuExtraButton
  }) : !loadingNextPage && ((_renderNoMessage = renderNoMessage === null || renderNoMessage === void 0 ? void 0 : renderNoMessage()) !== null && _renderNoMessage !== void 0 ? _renderNoMessage : /*#__PURE__*/_react["default"].createElement(_NoMessage["default"], {
    placeholder: placeholder
  }))));
};
exports.ConversationsPanel = ConversationsPanel;
//# sourceMappingURL=index.js.map
