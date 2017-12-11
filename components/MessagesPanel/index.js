'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _Header = require('../../components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _SpinnerOverlay = require('../../components/SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _MessageList = require('../../components/MessageList');

var _MessageList2 = _interopRequireDefault(_MessageList);

var _MessageTabButton = require('../../components/MessageTabButton');

var _MessageTabButton2 = _interopRequireDefault(_MessageTabButton);

var _NavigationBar = require('../../components/NavigationBar');

var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

var _ComposeText = require('../../assets/images/ComposeText.svg');

var _ComposeText2 = _interopRequireDefault(_ComposeText);

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
      }, {
        icon: _react2.default.createElement(TabTitle, { type: _messageTypes2.default.voiceMail, currentLocale: this.props.currentLocale }),
        label: _i18n2.default.getString(_messageTypes2.default.voiceMail, this.props.currentLocale),
        path: _messageTypes2.default.voiceMail,
        isActive: function isActive(path) {
          return path === _messageTypes2.default.voiceMail;
        },
        noticeCounts: this.props.voiceUnreadCounts
      }, {
        icon: _react2.default.createElement(TabTitle, { type: _messageTypes2.default.text, currentLocale: this.props.currentLocale }),
        label: _i18n2.default.getString(_messageTypes2.default.text, this.props.currentLocale),
        path: _messageTypes2.default.text,
        isActive: function isActive(path) {
          return path === _messageTypes2.default.text;
        },
        noticeCounts: this.props.textUnreadCounts
      }];
      return _react2.default.createElement(_NavigationBar2.default, {
        button: _MessageTabButton2.default,
        className: _styles2.default.tabBar,
        currentPath: this.props.typeFilter,
        goTo: this.onTabChanged,
        tabs: tabs
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentLocale = _props.currentLocale,
          showSpinner = _props.showSpinner,
          showTitle = _props.showTitle,
          showComposeText = _props.showComposeText,
          composeText = _props.composeText,
          props = (0, _objectWithoutProperties3.default)(_props, ['currentLocale', 'showSpinner', 'showTitle', 'showComposeText', 'composeText']);

      var buttons = [];
      if (showComposeText) {
        buttons.push({
          label: _react2.default.createElement(_ComposeText2.default, { className: _styles2.default.composeText }),
          onClick: composeText,
          placement: 'right'
        });
      }
      var header = showTitle ? _react2.default.createElement(
        _Header2.default,
        { buttons: buttons },
        _i18n2.default.getString('title', currentLocale)
      ) : null;
      var tabsHeader = this.renderTabs();
      var content = showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, null) : _react2.default.createElement(_MessageList2.default, (0, _extends3.default)({
        className: (0, _classnames2.default)(_styles2.default.content, showTitle && _styles2.default.contentWithHeader)
      }, props, {
        currentLocale: currentLocale
      }));
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
  composeText: _propTypes2.default.func.isRequired,
  typeFilter: _propTypes2.default.string,
  updateTypeFilter: _propTypes2.default.func,
  showConversationDetail: _propTypes2.default.func.isRequired,
  textUnreadCounts: _propTypes2.default.number.isRequired,
  voiceUnreadCounts: _propTypes2.default.number.isRequired,
  showGroupNumberName: _propTypes2.default.bool,
  onClickToDial: _propTypes2.default.func,
  onClickToSms: _propTypes2.default.func,
  markVoicemail: _propTypes2.default.func.isRequired,
  readVoicemail: _propTypes2.default.func.isRequired
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
  onClickToSms: undefined
};
//# sourceMappingURL=index.js.map
