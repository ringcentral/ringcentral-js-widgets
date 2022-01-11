"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.filter");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));

var _ComposeText = _interopRequireDefault(require("../../assets/images/ComposeText.svg"));

var _ConversationList = _interopRequireDefault(require("../ConversationList"));

var _Header = require("../Header");

var _MessageTabButton = require("../MessageTabButton");

var _NavigationBar = _interopRequireDefault(require("../NavigationBar"));

var _SpinnerOverlay = require("../SpinnerOverlay");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _TabTitle = require("./TabTitle");

var _NoMessage = _interopRequireDefault(require("./widgets/NoMessage"));

var _Search = _interopRequireDefault(require("./widgets/Search"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ConversationsPanel = /*#__PURE__*/function (_Component) {
  _inherits(ConversationsPanel, _Component);

  var _super = _createSuper(ConversationsPanel);

  function ConversationsPanel() {
    var _this;

    _classCallCheck(this, ConversationsPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.onTabChanged = function (type) {
      if (typeof _this.props.updateTypeFilter === 'function') {
        _this.props.updateTypeFilter(type);
      }
    };

    return _this;
  }

  _createClass(ConversationsPanel, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props;

      (_this$props = this.props) === null || _this$props === void 0 ? void 0 : _this$props.onUnmount();
    }
  }, {
    key: "renderTabs",
    value: function renderTabs() {
      var tabs = [{
        icon: /*#__PURE__*/_react["default"].createElement(_TabTitle.TabTitle, {
          type: _messageTypes["default"].all,
          currentLocale: this.props.currentLocale
        }),
        label: _i18n["default"].getString(_messageTypes["default"].all, this.props.currentLocale),
        path: _messageTypes["default"].all,
        isActive: function isActive(path) {
          return path === _messageTypes["default"].all;
        }
      }, this.props.readVoicemailPermission && {
        icon: /*#__PURE__*/_react["default"].createElement(_TabTitle.TabTitle, {
          type: _messageTypes["default"].voiceMail,
          currentLocale: this.props.currentLocale
        }),
        label: _i18n["default"].getString(_messageTypes["default"].voiceMail, this.props.currentLocale),
        path: _messageTypes["default"].voiceMail,
        isActive: function isActive(path) {
          return path === _messageTypes["default"].voiceMail;
        },
        noticeCounts: this.props.voiceUnreadCounts
      }, this.props.readFaxPermission && {
        icon: /*#__PURE__*/_react["default"].createElement(_TabTitle.TabTitle, {
          type: _messageTypes["default"].fax,
          currentLocale: this.props.currentLocale
        }),
        label: _i18n["default"].getString(_messageTypes["default"].fax, this.props.currentLocale),
        path: _messageTypes["default"].fax,
        isActive: function isActive(path) {
          return path === _messageTypes["default"].fax;
        },
        noticeCounts: this.props.faxUnreadCounts
      }, this.props.readTextPermission && {
        icon: /*#__PURE__*/_react["default"].createElement(_TabTitle.TabTitle, {
          type: _messageTypes["default"].text,
          currentLocale: this.props.currentLocale
        }),
        label: _i18n["default"].getString(_messageTypes["default"].text, this.props.currentLocale),
        path: _messageTypes["default"].text,
        isActive: function isActive(path) {
          return path === _messageTypes["default"].text;
        },
        noticeCounts: this.props.textUnreadCounts
      }];
      return /*#__PURE__*/_react["default"].createElement(_NavigationBar["default"], {
        button: _MessageTabButton.MessageTabButton,
        className: _styles["default"].tabBar,
        currentPath: this.props.typeFilter,
        goTo: this.onTabChanged,
        tabs: tabs.filter(function (x) {
          return !!x;
        })
      });
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$props2 = this.props,
          showSpinner = _this$props2.showSpinner,
          showTitle = _this$props2.showTitle,
          searchInput = _this$props2.searchInput,
          onSearchInputChange = _this$props2.onSearchInputChange,
          currentLocale = _this$props2.currentLocale,
          perPage = _this$props2.perPage,
          disableLinks = _this$props2.disableLinks,
          disableCallButton = _this$props2.disableCallButton,
          conversations = _this$props2.conversations,
          brand = _this$props2.brand,
          showConversationDetail = _this$props2.showConversationDetail,
          readMessage = _this$props2.readMessage,
          markMessage = _this$props2.markMessage,
          dateTimeFormatter = _this$props2.dateTimeFormatter,
          showContactDisplayPlaceholder = _this$props2.showContactDisplayPlaceholder,
          contactPlaceholder = _this$props2.contactPlaceholder,
          sourceIcons = _this$props2.sourceIcons,
          phoneTypeRenderer = _this$props2.phoneTypeRenderer,
          phoneSourceNameRenderer = _this$props2.phoneSourceNameRenderer,
          showGroupNumberName = _this$props2.showGroupNumberName,
          areaCode = _this$props2.areaCode,
          countryCode = _this$props2.countryCode,
          onLogConversation = _this$props2.onLogConversation,
          onViewContact = _this$props2.onViewContact,
          onCreateContact = _this$props2.onCreateContact,
          createEntityTypes = _this$props2.createEntityTypes,
          onClickToDial = _this$props2.onClickToDial,
          onClickToSms = _this$props2.onClickToSms,
          disableClickToDial = _this$props2.disableClickToDial,
          unmarkMessage = _this$props2.unmarkMessage,
          autoLog = _this$props2.autoLog,
          enableContactFallback = _this$props2.enableContactFallback,
          deleteMessage = _this$props2.deleteMessage,
          typeFilter = _this$props2.typeFilter,
          goToComposeText = _this$props2.goToComposeText,
          composeTextPermission = _this$props2.composeTextPermission,
          previewFaxMessages = _this$props2.previewFaxMessages,
          loadNextPage = _this$props2.loadNextPage,
          loadingNextPage = _this$props2.loadingNextPage,
          renderExtraButton = _this$props2.renderExtraButton,
          outboundSmsPermission = _this$props2.outboundSmsPermission,
          internalSmsPermission = _this$props2.internalSmsPermission,
          updateTypeFilter = _this$props2.updateTypeFilter,
          renderSearchTip = _this$props2.renderSearchTip,
          renderNoMessage = _this$props2.renderNoMessage,
          onFaxDownload = _this$props2.onFaxDownload,
          currentSiteCode = _this$props2.currentSiteCode,
          isMultipleSiteEnabled = _this$props2.isMultipleSiteEnabled,
          showChooseEntityModal = _this$props2.showChooseEntityModal,
          shouldLogSelectRecord = _this$props2.shouldLogSelectRecord,
          onSelectContact = _this$props2.onSelectContact,
          renderContactList = _this$props2.renderContactList,
          dropdownClassName = _this$props2.dropdownClassName,
          enableCDC = _this$props2.enableCDC;

      if (showSpinner) {
        return /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null);
      }

      var placeholder = onSearchInputChange && searchInput.length > 0 ? _i18n["default"].getString('noSearchResults', currentLocale) : _i18n["default"].getString('noMessages', currentLocale);
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "messageList",
        className: (0, _classnames["default"])(_styles["default"].content, showTitle && _styles["default"].contentWithHeader)
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
        className: onSearchInputChange ? _styles["default"].contentWithSearch : null,
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
        enableCDC: enableCDC
      }) : !loadingNextPage && (renderNoMessage && renderNoMessage() || /*#__PURE__*/_react["default"].createElement(_NoMessage["default"], {
        placeholder: placeholder
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          currentLocale = _this$props3.currentLocale,
          showTitle = _this$props3.showTitle,
          showComposeText = _this$props3.showComposeText,
          goToComposeText = _this$props3.goToComposeText;
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

      var header = showTitle ? /*#__PURE__*/_react["default"].createElement(_Header.Header, {
        buttons: buttons
      }, _i18n["default"].getString('title', currentLocale)) : null;
      var tabsHeader = this.renderTabs();
      var content = this.renderContent();
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "ConversationsPanel",
        className: _styles["default"].root
      }, header, tabsHeader, content);
    }
  }]);

  return ConversationsPanel;
}(_react.Component);

exports["default"] = ConversationsPanel;
ConversationsPanel.defaultProps = {
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
  showSpinner: false,
  showTitle: false,
  contactPlaceholder: '',
  showContactDisplayPlaceholder: true,
  showComposeText: false,
  typeFilter: _messageTypes["default"].all,
  showGroupNumberName: false,
  readTextPermission: true,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  readVoicemailPermission: true,
  readFaxPermission: true,
  searchInput: '',
  perPage: 20,
  disableLinks: false,
  disableCallButton: false,
  disableClickToDial: false,
  autoLog: false,
  composeTextPermission: true,
  loadingNextPage: false,
  showChooseEntityModal: true,
  shouldLogSelectRecord: false,
  dropdownClassName: null,
  enableCDC: false
};
//# sourceMappingURL=index.js.map
