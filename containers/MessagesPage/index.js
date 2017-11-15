'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

var _Header = require('../../components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _SpinnerOverlay = require('../../components/SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _MessageList = require('../../components/MessageList');

var _MessageList2 = _interopRequireDefault(_MessageList);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MessagesPanel(_ref) {
  var currentLocale = _ref.currentLocale,
      showSpinner = _ref.showSpinner,
      showTitle = _ref.showTitle,
      props = (0, _objectWithoutProperties3.default)(_ref, ['currentLocale', 'showSpinner', 'showTitle']);

  var header = showTitle ? _react2.default.createElement(
    _Header2.default,
    null,
    _i18n2.default.getString('title', currentLocale)
  ) : null;
  var content = showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, null) : _react2.default.createElement(_MessageList2.default, (0, _extends3.default)({
    className: (0, _classnames2.default)(_styles2.default.content, showTitle && _styles2.default.contentWithHeader)
  }, props, {
    currentLocale: currentLocale
  }));
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.root },
    header,
    content
  );
}

MessagesPanel.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  showSpinner: _propTypes2.default.bool,
  showTitle: _propTypes2.default.bool,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object
};
MessagesPanel.defaultProps = {
  showSpinner: false,
  showTitle: false,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined
};

function mapToProps(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      brand = _ref2$phone.brand,
      locale = _ref2$phone.locale,
      messages = _ref2$phone.messages,
      contactMatcher = _ref2$phone.contactMatcher,
      dateTimeFormat = _ref2$phone.dateTimeFormat,
      regionSettings = _ref2$phone.regionSettings,
      rolesAndPermissions = _ref2$phone.rolesAndPermissions,
      call = _ref2$phone.call,
      conversationLogger = _ref2$phone.conversationLogger,
      connectivityMonitor = _ref2$phone.connectivityMonitor,
      rateLimiter = _ref2$phone.rateLimiter,
      _ref2$showTitle = _ref2.showTitle,
      showTitle = _ref2$showTitle === undefined ? false : _ref2$showTitle,
      _ref2$enableContactFa = _ref2.enableContactFallback,
      enableContactFallback = _ref2$enableContactFa === undefined ? false : _ref2$enableContactFa;

  return {
    showTitle: showTitle,
    enableContactFallback: enableContactFallback,
    brand: brand.fullName,
    currentLocale: locale.currentLocale,
    conversations: messages.filteredConversations,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    disableLinks: !connectivityMonitor.connectivity || rateLimiter.throttling,
    disableClickToDial: !(call && call.isIdle),
    outboundSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.OutboundSMS),
    internalSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.InternalSMS),
    loggingMap: conversationLogger && conversationLogger.loggingMap,
    showSpinner: !(locale.ready && messages.ready && (!contactMatcher || contactMatcher.ready) && dateTimeFormat.ready && regionSettings.ready && rolesAndPermissions.ready && connectivityMonitor.ready && rateLimiter.ready && (!rolesAndPermissions || rolesAndPermissions.ready) && (!call || call.ready) && (!conversationLogger || conversationLogger.ready)),
    searchInput: messages.searchInput,
    autoLog: !!(conversationLogger && conversationLogger.autoLog)
  };
}

function mapToFunctions(_, _ref3) {
  var _this = this;

  var _ref3$phone = _ref3.phone,
      dateTimeFormat = _ref3$phone.dateTimeFormat,
      messages = _ref3$phone.messages,
      conversationLogger = _ref3$phone.conversationLogger,
      contactMatcher = _ref3$phone.contactMatcher,
      call = _ref3$phone.call,
      routerInteraction = _ref3$phone.routerInteraction,
      _ref3$dateTimeFormatt = _ref3.dateTimeFormatter,
      dateTimeFormatter = _ref3$dateTimeFormatt === undefined ? function () {
    return dateTimeFormat.formatDateTime.apply(dateTimeFormat, arguments);
  } : _ref3$dateTimeFormatt,
      _ref3$dialerRoute = _ref3.dialerRoute,
      dialerRoute = _ref3$dialerRoute === undefined ? '/dialer' : _ref3$dialerRoute,
      onCreateContact = _ref3.onCreateContact,
      onLogConversation = _ref3.onLogConversation,
      isLoggedContact = _ref3.isLoggedContact,
      onViewContact = _ref3.onViewContact,
      _ref3$conversationDet = _ref3.conversationDetailRoute,
      conversationDetailRoute = _ref3$conversationDet === undefined ? '/conversations/{conversationId}' : _ref3$conversationDet;

  return {
    dateTimeFormatter: dateTimeFormatter,
    onViewContact: onViewContact || function (_ref4) {
      var contact = _ref4.contact;

      var id = contact.id;
      var type = contact.type;
      routerInteraction.push('/contacts/' + type + '/' + id + '?direct=true');
    },
    onCreateContact: onCreateContact ? function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref6) {
        var phoneNumber = _ref6.phoneNumber,
            name = _ref6.name,
            entityType = _ref6.entityType;
        var hasMatchNumber;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return contactMatcher.hasMatchNumber({
                  phoneNumber: phoneNumber,
                  ignoreCache: true
                });

              case 2:
                hasMatchNumber = _context.sent;

                if (hasMatchNumber) {
                  _context.next = 8;
                  break;
                }

                _context.next = 6;
                return onCreateContact({ phoneNumber: phoneNumber, name: name, entityType: entityType });

              case 6:
                _context.next = 8;
                return contactMatcher.forceMatchNumber({ phoneNumber: phoneNumber });

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x) {
        return _ref5.apply(this, arguments);
      };
    }() : undefined,
    onClickToDial: call ? function (phoneNumber) {
      if (call.isIdle) {
        routerInteraction.push(dialerRoute);
        call.onToNumberChange(phoneNumber);
        call.onCall();
      }
    } : undefined,
    isLoggedContact: isLoggedContact,
    onLogConversation: onLogConversation || conversationLogger && function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref8) {
        var _ref8$redirect = _ref8.redirect,
            redirect = _ref8$redirect === undefined ? true : _ref8$redirect,
            options = (0, _objectWithoutProperties3.default)(_ref8, ['redirect']);
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return conversationLogger.logConversation((0, _extends3.default)({}, options, {
                  redirect: redirect
                }));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x2) {
        return _ref7.apply(this, arguments);
      };
    }(),
    onSearchInputChange: function onSearchInputChange(e) {
      messages.updateSearchInput(e.currentTarget.value);
    },
    showConversationDetail: function showConversationDetail(conversationId) {
      routerInteraction.push(conversationDetailRoute.replace('{conversationId}', conversationId));
    }
  };
}
exports.default = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(MessagesPanel));
//# sourceMappingURL=index.js.map
