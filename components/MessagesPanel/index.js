'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _messageTypes = require('ringcentral-integration/enums/messageTypes');

var _messageTypes2 = _interopRequireDefault(_messageTypes);

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _SpinnerOverlay = require('../SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _MessageList = require('../MessageList');

var _MessageList2 = _interopRequireDefault(_MessageList);

var _MessageTabButton = require('../MessageTabButton');

var _MessageTabButton2 = _interopRequireDefault(_MessageTabButton);

var _NavigationBar = require('../NavigationBar');

var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

var _SearchInput = require('../SearchInput');

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _ComposeText = require('../../assets/images/ComposeText.svg');

var _ComposeText2 = _interopRequireDefault(_ComposeText);

var _NewComposeText = require('../../assets/images/NewComposeText.svg');

var _NewComposeText2 = _interopRequireDefault(_NewComposeText);

var _NewComposeTextHover = require('../../assets/images/NewComposeTextHover.svg');

var _NewComposeTextHover2 = _interopRequireDefault(_NewComposeTextHover);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TabTitle(_ref) {
  var type = _ref.type,
      currentLocale = _ref.currentLocale;

  return _react2.default.createElement(
    'span',
    { className: _styles2.default.tabTitle },
    _i18n2.default.getString(type, currentLocale)
  );
}

TabTitle.propTypes = {
  type: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired
};

var MessagesPanel = function (_Component) {
  (0, _inherits3.default)(MessagesPanel, _Component);

  function MessagesPanel(props) {
    (0, _classCallCheck3.default)(this, MessagesPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MessagesPanel.__proto__ || (0, _getPrototypeOf2.default)(MessagesPanel)).call(this, props));

    _this.onTabChanged = function (type) {
      if (typeof _this.props.updateTypeFilter === 'function') {
        _this.props.updateTypeFilter(type);
      }
    };
    return _this;
  }

  (0, _createClass3.default)(MessagesPanel, [{
    key: 'renderTabs',
    value: function renderTabs() {
      var tabs = [{
        icon: _react2.default.createElement(TabTitle, { type: _messageTypes2.default.all, currentLocale: this.props.currentLocale }),
        label: _i18n2.default.getString(_messageTypes2.default.all, this.props.currentLocale),
        path: _messageTypes2.default.all,
        isActive: function isActive(path) {
          return path === _messageTypes2.default.all;
        }
      }, this.props.readVoicemailPermission && {
        icon: _react2.default.createElement(TabTitle, { type: _messageTypes2.default.voiceMail, currentLocale: this.props.currentLocale }),
        label: _i18n2.default.getString(_messageTypes2.default.voiceMail, this.props.currentLocale),
        path: _messageTypes2.default.voiceMail,
        isActive: function isActive(path) {
          return path === _messageTypes2.default.voiceMail;
        },
        noticeCounts: this.props.voiceUnreadCounts
      }, this.props.readTextPermission && {
        icon: _react2.default.createElement(TabTitle, { type: _messageTypes2.default.text, currentLocale: this.props.currentLocale }),
        label: _i18n2.default.getString(_messageTypes2.default.text, this.props.currentLocale),
        path: _messageTypes2.default.text,
        isActive: function isActive(path) {
          return path === _messageTypes2.default.text;
        },
        noticeCounts: this.props.textUnreadCounts
      }].filter(function (x) {
        return !!x;
      });
      return _react2.default.createElement(_NavigationBar2.default, {
        button: _MessageTabButton2.default,
        className: _styles2.default.tabBar,
        currentPath: this.props.typeFilter,
        goTo: this.onTabChanged,
        tabs: tabs
      });
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      var _props = this.props,
          showSpinner = _props.showSpinner,
          showTitle = _props.showTitle,
          searchInput = _props.searchInput,
          onSearchInputChange = _props.onSearchInputChange,
          currentLocale = _props.currentLocale,
          perPage = _props.perPage,
          disableLinks = _props.disableLinks,
          conversations = _props.conversations,
          brand = _props.brand,
          showConversationDetail = _props.showConversationDetail,
          readVoicemail = _props.readVoicemail,
          markVoicemail = _props.markVoicemail,
          dateTimeFormatter = _props.dateTimeFormatter,
          showContactDisplayPlaceholder = _props.showContactDisplayPlaceholder,
          sourceIcons = _props.sourceIcons,
          showGroupNumberName = _props.showGroupNumberName,
          areaCode = _props.areaCode,
          countryCode = _props.countryCode,
          onLogConversation = _props.onLogConversation,
          onViewContact = _props.onViewContact,
          onCreateContact = _props.onCreateContact,
          onClickToDial = _props.onClickToDial,
          onClickToSms = _props.onClickToSms,
          disableClickToDial = _props.disableClickToDial,
          unmarkVoicemail = _props.unmarkVoicemail,
          autoLog = _props.autoLog,
          enableContactFallback = _props.enableContactFallback,
          deleteMessage = _props.deleteMessage,
          typeFilter = _props.typeFilter,
          goToComposeText = _props.goToComposeText,
          composeTextPermission = _props.composeTextPermission;

      if (showSpinner) {
        return _react2.default.createElement(_SpinnerOverlay2.default, null);
      }
      var showTextIcon = composeTextPermission && (typeFilter === _messageTypes2.default.all || typeFilter === _messageTypes2.default.text);
      var search = onSearchInputChange ? _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.searchContainer, showTextIcon ? null : _styles2.default.withoutTextIcon)
        },
        _react2.default.createElement(_SearchInput2.default, {
          className: _styles2.default.searchInput,
          value: searchInput,
          onChange: onSearchInputChange,
          placeholder: _i18n2.default.getString('search', currentLocale),
          disabled: disableLinks
        }),
        _react2.default.createElement(
          'span',
          {
            title: _i18n2.default.getString('composeText', currentLocale),
            className: _styles2.default.textIcon,
            onClick: goToComposeText
          },
          _react2.default.createElement(_NewComposeTextHover2.default, { className: _styles2.default.hoverTextSVGIcon, width: 20, height: 21 }),
          _react2.default.createElement(_NewComposeText2.default, { className: _styles2.default.textSVGIcon, width: 20, height: 21 })
        )
      ) : null;
      var placeholder = onSearchInputChange && searchInput.length > 0 ? _i18n2.default.getString('noSearchResults', currentLocale) : _i18n2.default.getString('noMessages', currentLocale);
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.content, showTitle && _styles2.default.contentWithHeader) },
        search,
        _react2.default.createElement(_MessageList2.default, {
          className: onSearchInputChange ? _styles2.default.contentWithSearch : null,
          currentLocale: currentLocale,
          perPage: perPage,
          disableLinks: disableLinks,
          conversations: conversations,
          brand: brand,
          showConversationDetail: showConversationDetail,
          readVoicemail: readVoicemail,
          markVoicemail: markVoicemail,
          dateTimeFormatter: dateTimeFormatter,
          showContactDisplayPlaceholder: showContactDisplayPlaceholder,
          sourceIcons: sourceIcons,
          showGroupNumberName: showGroupNumberName,
          placeholder: placeholder,
          areaCode: areaCode,
          countryCode: countryCode,
          onLogConversation: onLogConversation,
          onViewContact: onViewContact,
          onCreateContact: onCreateContact,
          onClickToDial: onClickToDial,
          onClickToSms: onClickToSms,
          disableClickToDial: disableClickToDial,
          unmarkVoicemail: unmarkVoicemail,
          autoLog: autoLog,
          enableContactFallback: enableContactFallback,
          deleteMessage: deleteMessage
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          currentLocale = _props2.currentLocale,
          showTitle = _props2.showTitle,
          showComposeText = _props2.showComposeText,
          goToComposeText = _props2.goToComposeText;

      var buttons = [];
      if (showComposeText) {
        buttons.push({
          label: _react2.default.createElement(_ComposeText2.default, { className: _styles2.default.composeText }),
          onClick: goToComposeText,
          placement: 'right'
        });
      }
      var header = showTitle ? _react2.default.createElement(
        _Header2.default,
        { buttons: buttons },
        _i18n2.default.getString('title', currentLocale)
      ) : null;
      var tabsHeader = this.renderTabs();
      var content = this.renderContent();
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        header,
        tabsHeader,
        content
      );
    }
  }]);
  return MessagesPanel;
}(_react.Component);

exports.default = MessagesPanel;


MessagesPanel.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  showSpinner: _propTypes2.default.bool,
  showTitle: _propTypes2.default.bool,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object,
  showComposeText: _propTypes2.default.bool,
  goToComposeText: _propTypes2.default.func.isRequired,
  typeFilter: _propTypes2.default.string,
  updateTypeFilter: _propTypes2.default.func,
  showConversationDetail: _propTypes2.default.func.isRequired,
  textUnreadCounts: _propTypes2.default.number.isRequired,
  voiceUnreadCounts: _propTypes2.default.number.isRequired,
  showGroupNumberName: _propTypes2.default.bool,
  onClickToDial: _propTypes2.default.func,
  onClickToSms: _propTypes2.default.func,
  markVoicemail: _propTypes2.default.func.isRequired,
  readVoicemail: _propTypes2.default.func.isRequired,
  readTextPermission: _propTypes2.default.bool,
  readVoicemailPermission: _propTypes2.default.bool,
  onSearchInputChange: _propTypes2.default.func,
  searchInput: _propTypes2.default.string,
  perPage: _propTypes2.default.number,
  disableLinks: _propTypes2.default.bool,
  conversations: _propTypes2.default.array.isRequired,
  brand: _propTypes2.default.string.isRequired,
  dateTimeFormatter: _propTypes2.default.func,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  onLogConversation: _propTypes2.default.func,
  onViewContact: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  disableClickToDial: _propTypes2.default.bool,
  unmarkVoicemail: _propTypes2.default.func.isRequired,
  autoLog: _propTypes2.default.bool,
  enableContactFallback: _propTypes2.default.bool,
  deleteMessage: _propTypes2.default.func,
  composeTextPermission: _propTypes2.default.bool
};

MessagesPanel.defaultProps = {
  showSpinner: false,
  showTitle: false,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  showComposeText: false,
  typeFilter: _messageTypes2.default.all,
  updateTypeFilter: undefined,
  showGroupNumberName: false,
  onClickToDial: undefined,
  onClickToSms: undefined,
  readTextPermission: true,
  readVoicemailPermission: true,
  onSearchInputChange: undefined,
  searchInput: '',
  perPage: 20,
  disableLinks: false,
  dateTimeFormatter: undefined,
  onLogConversation: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
  disableClickToDial: false,
  autoLog: false,
  enableContactFallback: undefined,
  deleteMessage: undefined,
  composeTextPermission: true
};
//# sourceMappingURL=index.js.map
