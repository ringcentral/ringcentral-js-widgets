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
  showContactDisplayPlaceholder: _propTypes2.default.bool
};
MessagesPanel.defaultProps = {
  showSpinner: false,
  showTitle: false,
  showContactDisplayPlaceholder: true
};

function mapToProps(_, _ref2) {
  var brand = _ref2.brand,
      locale = _ref2.locale,
      messages = _ref2.messages,
      contactMatcher = _ref2.contactMatcher,
      dateTimeFormat = _ref2.dateTimeFormat,
      regionSettings = _ref2.regionSettings,
      rolesAndPermissions = _ref2.rolesAndPermissions,
      call = _ref2.call,
      conversationLogger = _ref2.conversationLogger,
      connectivityMonitor = _ref2.connectivityMonitor,
      rateLimiter = _ref2.rateLimiter,
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

  var dateTimeFormat = _ref3.dateTimeFormat,
      _ref3$dateTimeFormatt = _ref3.dateTimeFormatter,
      dateTimeFormatter = _ref3$dateTimeFormatt === undefined ? function () {
    return dateTimeFormat.formatDateTime.apply(dateTimeFormat, arguments);
  } : _ref3$dateTimeFormatt,
      messages = _ref3.messages,
      conversationLogger = _ref3.conversationLogger,
      contactMatcher = _ref3.contactMatcher,
      call = _ref3.call,
      router = _ref3.router,
      _ref3$dialerRoute = _ref3.dialerRoute,
      dialerRoute = _ref3$dialerRoute === undefined ? '/dialer' : _ref3$dialerRoute,
      onViewContact = _ref3.onViewContact,
      onCreateContact = _ref3.onCreateContact,
      onLogConversation = _ref3.onLogConversation,
      isLoggedContact = _ref3.isLoggedContact,
      _ref3$conversationDet = _ref3.conversationDetailRoute,
      conversationDetailRoute = _ref3$conversationDet === undefined ? '/conversations/{conversationId}' : _ref3$conversationDet;

  return {
    dateTimeFormatter: dateTimeFormatter,
    onViewContact: onViewContact ? function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref5) {
        var phoneNumber = _ref5.phoneNumber,
            contact = _ref5.contact;
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

                if (!hasMatchNumber) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return onViewContact({ phoneNumber: phoneNumber, contact: contact });

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }() : undefined,
    onCreateContact: onCreateContact ? function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref7) {
        var phoneNumber = _ref7.phoneNumber,
            name = _ref7.name,
            entityType = _ref7.entityType;
        var hasMatchNumber;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return contactMatcher.hasMatchNumber({
                  phoneNumber: phoneNumber,
                  ignoreCache: true
                });

              case 2:
                hasMatchNumber = _context2.sent;

                if (hasMatchNumber) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 6;
                return onCreateContact({ phoneNumber: phoneNumber, name: name, entityType: entityType });

              case 6:
                _context2.next = 8;
                return contactMatcher.forceMatchNumber({ phoneNumber: phoneNumber });

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x2) {
        return _ref6.apply(this, arguments);
      };
    }() : undefined,
    onClickToDial: call ? function (phoneNumber) {
      if (call.isIdle) {
        router.push(dialerRoute);
        call.onToNumberChange(phoneNumber);
        call.onCall();
      }
    } : undefined,
    isLoggedContact: isLoggedContact,
    onLogConversation: onLogConversation || conversationLogger && function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref9) {
        var _ref9$redirect = _ref9.redirect,
            redirect = _ref9$redirect === undefined ? true : _ref9$redirect,
            options = (0, _objectWithoutProperties3.default)(_ref9, ['redirect']);
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return conversationLogger.logConversation((0, _extends3.default)({}, options, {
                  redirect: redirect
                }));

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }));

      return function (_x3) {
        return _ref8.apply(this, arguments);
      };
    }(),
    onSearchInputChange: function onSearchInputChange(e) {
      messages.updateSearchInput(e.currentTarget.value);
    },
    showConversationDetail: function showConversationDetail(conversationId) {
      router.push(conversationDetailRoute.replace('{conversationId}', conversationId));
    }
  };
}
exports.default = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(MessagesPanel);
//# sourceMappingURL=index.js.map
