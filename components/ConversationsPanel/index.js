"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.filter");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _messageTypes = _interopRequireDefault(require("ringcentral-integration/enums/messageTypes"));

var _Header = _interopRequireDefault(require("../Header"));

var _SpinnerOverlay = _interopRequireDefault(require("../SpinnerOverlay"));

var _MessageTabButton = _interopRequireDefault(require("../MessageTabButton"));

var _NavigationBar = _interopRequireDefault(require("../NavigationBar"));

var _SearchInput = _interopRequireDefault(require("../SearchInput"));

var _ComposeText = _interopRequireDefault(require("../../assets/images/ComposeText.svg"));

var _NewComposeText = _interopRequireDefault(require("../../assets/images/NewComposeText.svg"));

var _NewComposeTextHover = _interopRequireDefault(require("../../assets/images/NewComposeTextHover.svg"));

var _ConversationList = _interopRequireDefault(require("../ConversationList"));

var _NoMessage = _interopRequireDefault(require("./widgets/NoMessage"));

var _Search = _interopRequireDefault(require("./widgets/Search"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function TabTitle(_ref) {
  var type = _ref.type,
      currentLocale = _ref.currentLocale;
  return _react.default.createElement("span", {
    className: _styles.default.tabTitle
  }, _i18n.default.getString(type, currentLocale));
}

TabTitle.propTypes = {
  type: _propTypes.default.string.isRequired,
  currentLocale: _propTypes.default.string.isRequired
};

var ConversationsPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(ConversationsPanel, _Component);

  function ConversationsPanel(props) {
    var _this;

    _classCallCheck(this, ConversationsPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConversationsPanel).call(this, props));

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
      if (typeof this.props.onUnmount === 'function') {
        this.props.onUnmount();
      }
    }
  }, {
    key: "renderTabs",
    value: function renderTabs() {
      var tabs = [{
        icon: _react.default.createElement(TabTitle, {
          type: _messageTypes.default.all,
          currentLocale: this.props.currentLocale
        }),
        label: _i18n.default.getString(_messageTypes.default.all, this.props.currentLocale),
        path: _messageTypes.default.all,
        isActive: function isActive(path) {
          return path === _messageTypes.default.all;
        }
      }, this.props.readVoicemailPermission && {
        icon: _react.default.createElement(TabTitle, {
          type: _messageTypes.default.voiceMail,
          currentLocale: this.props.currentLocale
        }),
        label: _i18n.default.getString(_messageTypes.default.voiceMail, this.props.currentLocale),
        path: _messageTypes.default.voiceMail,
        isActive: function isActive(path) {
          return path === _messageTypes.default.voiceMail;
        },
        noticeCounts: this.props.voiceUnreadCounts
      }, this.props.readFaxPermission && {
        icon: _react.default.createElement(TabTitle, {
          type: _messageTypes.default.fax,
          currentLocale: this.props.currentLocale
        }),
        label: _i18n.default.getString(_messageTypes.default.fax, this.props.currentLocale),
        path: _messageTypes.default.fax,
        isActive: function isActive(path) {
          return path === _messageTypes.default.fax;
        },
        noticeCounts: this.props.faxUnreadCounts
      }, this.props.readTextPermission && {
        icon: _react.default.createElement(TabTitle, {
          type: _messageTypes.default.text,
          currentLocale: this.props.currentLocale
        }),
        label: _i18n.default.getString(_messageTypes.default.text, this.props.currentLocale),
        path: _messageTypes.default.text,
        isActive: function isActive(path) {
          return path === _messageTypes.default.text;
        },
        noticeCounts: this.props.textUnreadCounts
      }].filter(function (x) {
        return !!x;
      });
      return _react.default.createElement(_NavigationBar.default, {
        button: _MessageTabButton.default,
        className: _styles.default.tabBar,
        currentPath: this.props.typeFilter,
        goTo: this.onTabChanged,
        tabs: tabs
      });
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$props = this.props,
          showSpinner = _this$props.showSpinner,
          showTitle = _this$props.showTitle,
          searchInput = _this$props.searchInput,
          onSearchInputChange = _this$props.onSearchInputChange,
          currentLocale = _this$props.currentLocale,
          perPage = _this$props.perPage,
          disableLinks = _this$props.disableLinks,
          conversations = _this$props.conversations,
          brand = _this$props.brand,
          showConversationDetail = _this$props.showConversationDetail,
          readMessage = _this$props.readMessage,
          markMessage = _this$props.markMessage,
          dateTimeFormatter = _this$props.dateTimeFormatter,
          showContactDisplayPlaceholder = _this$props.showContactDisplayPlaceholder,
          sourceIcons = _this$props.sourceIcons,
          phoneTypeRenderer = _this$props.phoneTypeRenderer,
          phoneSourceNameRenderer = _this$props.phoneSourceNameRenderer,
          showGroupNumberName = _this$props.showGroupNumberName,
          areaCode = _this$props.areaCode,
          countryCode = _this$props.countryCode,
          onLogConversation = _this$props.onLogConversation,
          onViewContact = _this$props.onViewContact,
          onCreateContact = _this$props.onCreateContact,
          createEntityTypes = _this$props.createEntityTypes,
          onClickToDial = _this$props.onClickToDial,
          onClickToSms = _this$props.onClickToSms,
          disableClickToDial = _this$props.disableClickToDial,
          unmarkMessage = _this$props.unmarkMessage,
          autoLog = _this$props.autoLog,
          enableContactFallback = _this$props.enableContactFallback,
          deleteMessage = _this$props.deleteMessage,
          typeFilter = _this$props.typeFilter,
          goToComposeText = _this$props.goToComposeText,
          composeTextPermission = _this$props.composeTextPermission,
          previewFaxMessages = _this$props.previewFaxMessages,
          loadNextPage = _this$props.loadNextPage,
          loadingNextPage = _this$props.loadingNextPage,
          renderExtraButton = _this$props.renderExtraButton,
          outboundSmsPermission = _this$props.outboundSmsPermission,
          internalSmsPermission = _this$props.internalSmsPermission,
          updateTypeFilter = _this$props.updateTypeFilter,
          renderSearchTip = _this$props.renderSearchTip,
          renderNoMessage = _this$props.renderNoMessage;

      if (showSpinner) {
        return _react.default.createElement(_SpinnerOverlay.default, null);
      }

      var placeholder = onSearchInputChange && searchInput.length > 0 ? _i18n.default.getString('noSearchResults', currentLocale) : _i18n.default.getString('noMessages', currentLocale);
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(_styles.default.content, showTitle && _styles.default.contentWithHeader)
      }, _react.default.createElement(_Search.default, {
        composeTextPermission: composeTextPermission,
        typeFilter: typeFilter,
        onSearchInputChange: onSearchInputChange,
        searchInput: searchInput,
        currentLocale: currentLocale,
        disableLinks: disableLinks,
        goToComposeText: goToComposeText,
        renderSearchTip: renderSearchTip
      }), conversations.length ? _react.default.createElement(_ConversationList.default, {
        className: onSearchInputChange ? _styles.default.contentWithSearch : null,
        currentLocale: currentLocale,
        perPage: perPage,
        disableLinks: disableLinks,
        conversations: conversations,
        brand: brand,
        showConversationDetail: showConversationDetail,
        readMessage: readMessage,
        markMessage: markMessage,
        dateTimeFormatter: dateTimeFormatter,
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
        updateTypeFilter: updateTypeFilter
      }) : !loadingNextPage && (renderNoMessage && renderNoMessage() || _react.default.createElement(_NoMessage.default, {
        placeholder: placeholder
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          currentLocale = _this$props2.currentLocale,
          showTitle = _this$props2.showTitle,
          showComposeText = _this$props2.showComposeText,
          goToComposeText = _this$props2.goToComposeText;
      var buttons = [];

      if (showComposeText) {
        buttons.push({
          label: _react.default.createElement(_ComposeText.default, {
            className: _styles.default.composeText
          }),
          onClick: goToComposeText,
          placement: 'right'
        });
      }

      var header = showTitle ? _react.default.createElement(_Header.default, {
        buttons: buttons
      }, _i18n.default.getString('title', currentLocale)) : null;
      var tabsHeader = this.renderTabs();
      var content = this.renderContent();
      return _react.default.createElement("div", {
        "data-sign": "ConversationsPanel",
        className: _styles.default.root
      }, header, tabsHeader, content);
    }
  }]);

  return ConversationsPanel;
}(_react.Component);

exports.default = ConversationsPanel;
ConversationsPanel.propTypes = {
  currentLocale: _propTypes.default.string.isRequired,
  showSpinner: _propTypes.default.bool,
  showTitle: _propTypes.default.bool,
  showContactDisplayPlaceholder: _propTypes.default.bool,
  sourceIcons: _propTypes.default.object,
  phoneTypeRenderer: _propTypes.default.func,
  phoneSourceNameRenderer: _propTypes.default.func,
  showComposeText: _propTypes.default.bool,
  goToComposeText: _propTypes.default.func.isRequired,
  typeFilter: _propTypes.default.string,
  updateTypeFilter: _propTypes.default.func,
  showConversationDetail: _propTypes.default.func.isRequired,
  textUnreadCounts: _propTypes.default.number.isRequired,
  voiceUnreadCounts: _propTypes.default.number.isRequired,
  faxUnreadCounts: _propTypes.default.number.isRequired,
  showGroupNumberName: _propTypes.default.bool,
  onClickToDial: _propTypes.default.func,
  onClickToSms: _propTypes.default.func,
  markMessage: _propTypes.default.func.isRequired,
  readMessage: _propTypes.default.func.isRequired,
  readTextPermission: _propTypes.default.bool,
  outboundSmsPermission: _propTypes.default.bool,
  internalSmsPermission: _propTypes.default.bool,
  readVoicemailPermission: _propTypes.default.bool,
  readFaxPermission: _propTypes.default.bool,
  onSearchInputChange: _propTypes.default.func,
  searchInput: _propTypes.default.string,
  perPage: _propTypes.default.number,
  disableLinks: _propTypes.default.bool,
  conversations: _propTypes.default.array.isRequired,
  brand: _propTypes.default.string.isRequired,
  dateTimeFormatter: _propTypes.default.func,
  areaCode: _propTypes.default.string.isRequired,
  countryCode: _propTypes.default.string.isRequired,
  onLogConversation: _propTypes.default.func,
  onViewContact: _propTypes.default.func,
  onCreateContact: _propTypes.default.func,
  createEntityTypes: _propTypes.default.array,
  disableClickToDial: _propTypes.default.bool,
  unmarkMessage: _propTypes.default.func.isRequired,
  autoLog: _propTypes.default.bool,
  enableContactFallback: _propTypes.default.bool,
  deleteMessage: _propTypes.default.func,
  composeTextPermission: _propTypes.default.bool,
  previewFaxMessages: _propTypes.default.func,
  loadNextPage: _propTypes.default.func.isRequired,
  loadingNextPage: _propTypes.default.bool,
  onUnmount: _propTypes.default.func,
  renderExtraButton: _propTypes.default.func,
  renderSearchTip: _propTypes.default.func,
  renderNoMessage: _propTypes.default.func
};
ConversationsPanel.defaultProps = {
  showSpinner: false,
  showTitle: false,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  showComposeText: false,
  typeFilter: _messageTypes.default.all,
  updateTypeFilter: undefined,
  showGroupNumberName: false,
  onClickToDial: undefined,
  onClickToSms: undefined,
  readTextPermission: true,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  readVoicemailPermission: true,
  readFaxPermission: true,
  onSearchInputChange: undefined,
  searchInput: '',
  perPage: 20,
  disableLinks: false,
  dateTimeFormatter: undefined,
  onLogConversation: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
  createEntityTypes: undefined,
  disableClickToDial: false,
  autoLog: false,
  enableContactFallback: undefined,
  deleteMessage: undefined,
  composeTextPermission: true,
  previewFaxMessages: undefined,
  loadingNextPage: false,
  onUnmount: undefined,
  renderExtraButton: undefined,
  renderSearchTip: undefined,
  renderNoMessage: undefined
};
//# sourceMappingURL=index.js.map
