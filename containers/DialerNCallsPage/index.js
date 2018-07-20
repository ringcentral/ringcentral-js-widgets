'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _callingModes = require('ringcentral-integration/modules/CallingSettings/callingModes');

var _callingModes2 = _interopRequireDefault(_callingModes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DialerPage = require('../DialerPage');

var _DialerPage2 = _interopRequireDefault(_DialerPage);

var _ActiveCallsPage = require('../ActiveCallsPage');

var _ActiveCallsPage2 = _interopRequireDefault(_ActiveCallsPage);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _NavigationBar = require('../../components/NavigationBar');

var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

var _MessageTabButton = require('../../components/MessageTabButton');

var _MessageTabButton2 = _interopRequireDefault(_MessageTabButton);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _routerMap = require('./routerMap');

var _routerMap2 = _interopRequireDefault(_routerMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TabTitle(_ref) {
  var type = _ref.type,
      currentLocale = _ref.currentLocale,
      active = _ref.active;

  return _react2.default.createElement(
    'span',
    { className: (0, _classnames2.default)(_styles2.default.tabTitle, active ? _styles2.default.active : null) },
    _i18n2.default.getString(type, currentLocale)
  );
}

TabTitle.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string.isRequired,
  active: _propTypes2.default.bool
};

TabTitle.defaultProps = {
  active: false
};

function renderTabs(currentLocale, currentPath, goto) {
  var tabs = [{
    icon: _react2.default.createElement(TabTitle, {
      type: _routerMap2.default.dialer,
      currentLocale: currentLocale,
      active: currentPath === _routerMap2.default.dialer }),
    label: _i18n2.default.getString(_routerMap2.default.dialer, currentLocale),
    path: _routerMap2.default.dialer,
    isActive: function isActive() {
      return currentPath === _routerMap2.default.dialer;
    }
  }, {
    icon: _react2.default.createElement(TabTitle, {
      type: _routerMap2.default.allCalls,
      currentLocale: currentLocale,
      active: currentPath === _routerMap2.default.allCalls }),
    label: _i18n2.default.getString(_routerMap2.default.allCalls, currentLocale),
    path: _routerMap2.default.allCalls,
    isActive: function isActive() {
      return currentPath === _routerMap2.default.allCalls;
    }
  }];
  return _react2.default.createElement(_NavigationBar2.default, {
    button: _MessageTabButton2.default,
    className: _styles2.default.tabBar,
    currentPath: currentPath,
    goTo: goto,
    tabs: tabs,
    fullSizeInk: false
  });
}

function DialerNCallsPanel(_ref2) {
  var currentLocale = _ref2.currentLocale,
      currentPath = _ref2.currentPath,
      onLogCall = _ref2.onLogCall,
      onCreateContact = _ref2.onCreateContact,
      onCallsEmpty = _ref2.onCallsEmpty,
      sourceIcons = _ref2.sourceIcons,
      goto = _ref2.goto,
      showTab = _ref2.showTab,
      phoneTypeRenderer = _ref2.phoneTypeRenderer,
      recipientsContactInfoRenderer = _ref2.recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer = _ref2.recipientsContactPhoneRenderer,
      dialButtonMuted = _ref2.dialButtonMuted,
      showViewContact = _ref2.showViewContact,
      showContactDisplayPlaceholder = _ref2.showContactDisplayPlaceholder;

  var contentMap = {
    '/dialer': _react2.default.createElement(_DialerPage2.default, {
      phoneTypeRenderer: phoneTypeRenderer,
      recipientsContactInfoRenderer: recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer: recipientsContactPhoneRenderer,
      dialButtonMuted: dialButtonMuted
    }),
    '/calls': _react2.default.createElement(_ActiveCallsPage2.default, {
      onLogCall: onLogCall,
      onCreateContact: onCreateContact,
      onCallsEmpty: onCallsEmpty,
      sourceIcons: sourceIcons,
      showViewContact: showViewContact,
      showContactDisplayPlaceholder: showContactDisplayPlaceholder
    })
  };
  var tabsHeader = renderTabs(currentLocale, currentPath, goto);
  if (showTab) {
    return _react2.default.createElement(
      'div',
      { className: _styles2.default.root },
      tabsHeader,
      _react2.default.createElement(
        'div',
        { className: _styles2.default.content },
        contentMap[currentPath]
      )
    );
  }
  return contentMap[currentPath];
}

DialerNCallsPanel.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  currentPath: _propTypes2.default.string.isRequired,
  onLogCall: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  onCallsEmpty: _propTypes2.default.func,
  sourceIcons: _propTypes2.default.object,
  goto: _propTypes2.default.func.isRequired,
  phoneTypeRenderer: _propTypes2.default.func,
  recipientsContactInfoRenderer: _propTypes2.default.func,
  recipientsContactPhoneRenderer: _propTypes2.default.func,
  dialButtonMuted: _propTypes2.default.bool,
  showViewContact: _propTypes2.default.bool,
  showContactDisplayPlaceholder: _propTypes2.default.bool
};

DialerNCallsPanel.defaultProps = {
  sourceIcons: null,
  onLogCall: null,
  onCreateContact: null,
  onCallsEmpty: null,
  phoneTypeRenderer: null,
  recipientsContactInfoRenderer: null,
  recipientsContactPhoneRenderer: null,
  dialButtonMuted: false,
  showViewContact: true,
  showContactDisplayPlaceholder: false
};

function mapToProps(_, _ref3) {
  var _ref3$phone = _ref3.phone,
      locale = _ref3$phone.locale,
      routerInteraction = _ref3$phone.routerInteraction,
      webphone = _ref3$phone.webphone,
      callingMode = _ref3$phone.callingSettings.callingMode,
      sourceIcons = _ref3.sourceIcons,
      phoneTypeRenderer = _ref3.phoneTypeRenderer,
      recipientsContactInfoRenderer = _ref3.recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer = _ref3.recipientsContactPhoneRenderer;

  return {
    currentPath: routerInteraction.currentPath,
    currentLocale: locale.currentLocale,
    sourceIcons: sourceIcons,
    showTab: webphone.sessions.length && callingMode === _callingModes2.default.webphone,
    phoneTypeRenderer: phoneTypeRenderer,
    recipientsContactInfoRenderer: recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer: recipientsContactPhoneRenderer
  };
}

function mapToFunctions(_, _ref4) {
  var routerInteraction = _ref4.phone.routerInteraction,
      onLogCall = _ref4.onLogCall,
      onCreateContact = _ref4.onCreateContact,
      onCallsEmpty = _ref4.onCallsEmpty,
      sourceIcons = _ref4.sourceIcons;

  return {
    goto: function goto(path) {
      return routerInteraction.push(path);
    },
    onLogCall: onLogCall,
    onCreateContact: onCreateContact,
    onCallsEmpty: onCallsEmpty,
    sourceIcons: sourceIcons
  };
}

var DialerNCallsPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(DialerNCallsPanel));

exports.default = DialerNCallsPage;
//# sourceMappingURL=index.js.map
