"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToProps = mapToProps;
exports.mapToFunctions = mapToFunctions;
exports.default = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

var _reactRedux = require("react-redux");

var _ConversationsPanel = _interopRequireDefault(require("../../components/ConversationsPanel"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      brand = _ref$phone.brand,
      locale = _ref$phone.locale,
      conversations = _ref$phone.conversations,
      contactMatcher = _ref$phone.contactMatcher,
      dateTimeFormat = _ref$phone.dateTimeFormat,
      regionSettings = _ref$phone.regionSettings,
      rolesAndPermissions = _ref$phone.rolesAndPermissions,
      call = _ref$phone.call,
      conversationLogger = _ref$phone.conversationLogger,
      connectivityMonitor = _ref$phone.connectivityMonitor,
      rateLimiter = _ref$phone.rateLimiter,
      messageStore = _ref$phone.messageStore,
      _ref$showTitle = _ref.showTitle,
      showTitle = _ref$showTitle === void 0 ? false : _ref$showTitle,
      _ref$enableContactFal = _ref.enableContactFallback,
      enableContactFallback = _ref$enableContactFal === void 0 ? false : _ref$enableContactFal,
      _ref$showGroupNumberN = _ref.showGroupNumberName,
      showGroupNumberName = _ref$showGroupNumberN === void 0 ? false : _ref$showGroupNumberN;
  var serviceFeatures = rolesAndPermissions.serviceFeatures,
      permissions = rolesAndPermissions.permissions,
      readTextPermissions = rolesAndPermissions.readTextPermissions,
      voicemailPermissions = rolesAndPermissions.voicemailPermissions,
      readFaxPermissions = rolesAndPermissions.readFaxPermissions;
  return {
    showTitle: showTitle,
    enableContactFallback: enableContactFallback,
    showGroupNumberName: showGroupNumberName,
    brand: brand.fullName,
    currentLocale: locale.currentLocale,
    conversations: conversations.pagingConversations,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    disableLinks: !connectivityMonitor.connectivity || rateLimiter.throttling,
    disableClickToDial: !(call && call.isIdle),
    outboundSmsPermission: !!(permissions && permissions.OutboundSMS),
    internalSmsPermission: !!(permissions && permissions.InternalSMS),
    composeTextPermission: !!(serviceFeatures && (serviceFeatures.Pager && serviceFeatures.Pager.enabled || serviceFeatures.SMS && serviceFeatures.SMS.enabled)),
    loggingMap: conversationLogger && conversationLogger.loggingMap,
    showSpinner: !(locale.ready && conversations.ready && (!contactMatcher || contactMatcher.ready) && dateTimeFormat.ready && regionSettings.ready && rolesAndPermissions.ready && connectivityMonitor.ready && rateLimiter.ready && (!rolesAndPermissions || rolesAndPermissions.ready) && (!call || call.ready) && (!conversationLogger || conversationLogger.ready)),
    searchInput: conversations.searchInput,
    autoLog: !!(conversationLogger && conversationLogger.autoLog),
    typeFilter: conversations.typeFilter,
    textUnreadCounts: messageStore.textUnreadCounts,
    voiceUnreadCounts: messageStore.voiceUnreadCounts,
    faxUnreadCounts: messageStore.faxUnreadCounts,
    readTextPermission: readTextPermissions,
    readVoicemailPermission: voicemailPermissions,
    readFaxPermission: readFaxPermissions,
    loadingNextPage: conversations.loadingOldConversations
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      dateTimeFormat = _ref2$phone.dateTimeFormat,
      conversations = _ref2$phone.conversations,
      messageStore = _ref2$phone.messageStore,
      conversationLogger = _ref2$phone.conversationLogger,
      contactMatcher = _ref2$phone.contactMatcher,
      call = _ref2$phone.call,
      dialerUI = _ref2$phone.dialerUI,
      routerInteraction = _ref2$phone.routerInteraction,
      composeText = _ref2$phone.composeText,
      contactSearch = _ref2$phone.contactSearch,
      rolesAndPermissions = _ref2$phone.rolesAndPermissions,
      _ref2$showViewContact = _ref2.showViewContact,
      showViewContact = _ref2$showViewContact === void 0 ? true : _ref2$showViewContact,
      _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
      dateTimeFormatter = _ref2$dateTimeFormatt === void 0 ? function () {
    return dateTimeFormat.formatDateTime.apply(dateTimeFormat, arguments);
  } : _ref2$dateTimeFormatt,
      _ref2$dialerRoute = _ref2.dialerRoute,
      dialerRoute = _ref2$dialerRoute === void 0 ? '/dialer' : _ref2$dialerRoute,
      onCreateContact = _ref2.onCreateContact,
      onLogConversation = _ref2.onLogConversation,
      isLoggedContact = _ref2.isLoggedContact,
      onViewContact = _ref2.onViewContact,
      _ref2$conversationDet = _ref2.conversationDetailRoute,
      conversationDetailRoute = _ref2$conversationDet === void 0 ? '/conversations/{conversationId}' : _ref2$conversationDet,
      _ref2$composeTextRout = _ref2.composeTextRoute,
      composeTextRoute = _ref2$composeTextRout === void 0 ? '/composeText' : _ref2$composeTextRout,
      _previewFaxMessages = _ref2.previewFaxMessages;
  return {
    dateTimeFormatter: dateTimeFormatter,
    onViewContact: showViewContact ? onViewContact || function (_ref3) {
      var _ref3$contact = _ref3.contact,
          id = _ref3$contact.id,
          type = _ref3$contact.type;
      routerInteraction.push("/contacts/".concat(type, "/").concat(id, "?direct=true"));
    } : null,
    onCreateContact: onCreateContact ?
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref4) {
        var phoneNumber, name, entityType, hasMatchNumber;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                phoneNumber = _ref4.phoneNumber, name = _ref4.name, entityType = _ref4.entityType;
                _context.next = 3;
                return contactMatcher.hasMatchNumber({
                  phoneNumber: phoneNumber,
                  ignoreCache: true
                });

              case 3:
                hasMatchNumber = _context.sent;

                if (hasMatchNumber) {
                  _context.next = 9;
                  break;
                }

                _context.next = 7;
                return onCreateContact({
                  phoneNumber: phoneNumber,
                  name: name,
                  entityType: entityType
                });

              case 7:
                _context.next = 9;
                return contactMatcher.forceMatchNumber({
                  phoneNumber: phoneNumber
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref5.apply(this, arguments);
      };
    }() : undefined,
    onClickToDial: dialerUI && rolesAndPermissions.callingEnabled ? function (recipient) {
      if (call.isIdle) {
        routerInteraction.push(dialerRoute); // for track router

        messageStore.onClickToCall({
          fromType: recipient.fromType
        });
        dialerUI.call({
          recipient: recipient
        });
      }
    } : undefined,
    onClickToSms: rolesAndPermissions.hasComposeTextPermission ? function (contact) {
      var isDummyContact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (routerInteraction) {
        routerInteraction.push(composeTextRoute);
      } // if contact autocomplete, if no match fill the number only


      if (contact.name && contact.phoneNumber && isDummyContact) {
        composeText.updateTypingToNumber(contact.name);
        contactSearch.search({
          searchString: contact.name
        });
      } else {
        composeText.addToNumber(contact);

        if (composeText.typingToNumber === contact.phoneNumber) {
          composeText.cleanTypingToNumber();
        }
      } // for track


      messageStore.onClickToSMS();
    } : undefined,
    isLoggedContact: isLoggedContact,
    onLogConversation: onLogConversation || conversationLogger &&
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref6) {
        var _ref6$redirect, redirect, options;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref6$redirect = _ref6.redirect, redirect = _ref6$redirect === void 0 ? true : _ref6$redirect, options = _objectWithoutProperties(_ref6, ["redirect"]);
                _context2.next = 3;
                return conversationLogger.logConversation(_objectSpread({}, options, {
                  redirect: redirect
                }));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref7.apply(this, arguments);
      };
    }(),
    onSearchInputChange: function onSearchInputChange(e) {
      conversations.updateSearchInput(e.currentTarget.value);
    },
    showConversationDetail: function showConversationDetail(conversationId) {
      routerInteraction.push(conversationDetailRoute.replace('{conversationId}', conversationId));
    },
    readMessage: function readMessage(conversationId) {
      messageStore.readMessages(conversationId);
    },
    markMessage: function markMessage(conversationId) {
      messageStore.unreadMessage(conversationId);
    },
    unmarkMessage: function unmarkMessage(conversationId) {
      messageStore.readMessages(conversationId);
      messageStore.onUnmarkMessages();
    },
    goToComposeText: function goToComposeText() {
      return routerInteraction.push(composeTextRoute);
    },
    updateTypeFilter: function updateTypeFilter(type) {
      return conversations.updateTypeFilter(type);
    },
    deleteMessage: function deleteMessage(conversationId) {
      conversations.deleteCoversation(conversationId);
    },
    previewFaxMessages: function previewFaxMessages(uri, conversationId) {
      if (!_previewFaxMessages) {
        window.open(uri);
      } else {
        _previewFaxMessages(uri);
      }

      messageStore.readMessages(conversationId);
    },
    loadNextPage: function () {
      var _loadNextPage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return conversations.loadNextPage();

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function loadNextPage() {
        return _loadNextPage.apply(this, arguments);
      }

      return loadNextPage;
    }(),
    onUnmount: function onUnmount() {
      if (conversations.currentPage > 2) {
        conversations.resetCurrentPage();
      }
    }
  };
}

var _default = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ConversationsPanel.default));

exports.default = _default;
//# sourceMappingURL=index.js.map
