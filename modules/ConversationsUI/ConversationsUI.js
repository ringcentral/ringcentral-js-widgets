"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationsUI = void 0;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.search");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

var _di = require("@ringcentral-integration/commons/lib/di");

var _core = require("@ringcentral-integration/core");

var _dec, _class;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var ConversationsUI = (_dec = (0, _di.Module)({
  name: 'ConversationsUI',
  deps: ['Brand', 'Locale', 'Conversations', 'DateTimeFormat', 'RegionSettings', 'AppFeatures', 'Call', 'ConnectivityMonitor', 'RateLimiter', 'MessageStore', 'ConnectivityManager', 'ExtensionInfo', 'RouterInteraction', 'ComposeText', 'ContactSearch', {
    dep: 'DialerUI',
    optional: true
  }, {
    dep: 'ContactDetailsUI',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'ConversationLogger',
    optional: true
  }, {
    dep: 'ConversationsUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(ConversationsUI, _RcUIModuleV);

  var _super = _createSuper(ConversationsUI);

  function ConversationsUI(deps) {
    _classCallCheck(this, ConversationsUI);

    return _super.call(this, {
      deps: deps
    });
  }

  _createClass(ConversationsUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _extensionInfo$site$c, _extensionInfo$site, _extensionInfo$isMult;

      var _ref$showTitle = _ref.showTitle,
          showTitle = _ref$showTitle === void 0 ? false : _ref$showTitle,
          _ref$enableContactFal = _ref.enableContactFallback,
          enableContactFallback = _ref$enableContactFal === void 0 ? false : _ref$enableContactFal,
          _ref$showGroupNumberN = _ref.showGroupNumberName,
          showGroupNumberName = _ref$showGroupNumberN === void 0 ? false : _ref$showGroupNumberN;
      var _this$_deps = this._deps,
          brand = _this$_deps.brand,
          locale = _this$_deps.locale,
          conversations = _this$_deps.conversations,
          contactMatcher = _this$_deps.contactMatcher,
          dateTimeFormat = _this$_deps.dateTimeFormat,
          regionSettings = _this$_deps.regionSettings,
          appFeatures = _this$_deps.appFeatures,
          call = _this$_deps.call,
          conversationLogger = _this$_deps.conversationLogger,
          connectivityMonitor = _this$_deps.connectivityMonitor,
          rateLimiter = _this$_deps.rateLimiter,
          messageStore = _this$_deps.messageStore,
          connectivityManager = _this$_deps.connectivityManager,
          extensionInfo = _this$_deps.extensionInfo;
      return {
        showTitle: showTitle,
        enableContactFallback: enableContactFallback,
        showGroupNumberName: showGroupNumberName,
        brand: brand.name,
        currentLocale: locale.currentLocale,
        currentSiteCode: (_extensionInfo$site$c = extensionInfo === null || extensionInfo === void 0 ? void 0 : (_extensionInfo$site = extensionInfo.site) === null || _extensionInfo$site === void 0 ? void 0 : _extensionInfo$site.code) !== null && _extensionInfo$site$c !== void 0 ? _extensionInfo$site$c : '',
        isMultipleSiteEnabled: (_extensionInfo$isMult = extensionInfo === null || extensionInfo === void 0 ? void 0 : extensionInfo.isMultipleSiteEnabled) !== null && _extensionInfo$isMult !== void 0 ? _extensionInfo$isMult : false,
        conversations: conversations.pagingConversations,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
        disableLinks: connectivityManager.isOfflineMode || connectivityManager.isVoipOnlyMode || rateLimiter.throttling,
        disableCallButton: connectivityManager.isOfflineMode || connectivityManager.isWebphoneUnavailableMode || connectivityManager.isWebphoneInitializing || rateLimiter.throttling,
        disableClickToDial: !(call && call.isIdle),
        outboundSmsPermission: appFeatures.hasOutboundSMSPermission,
        internalSmsPermission: appFeatures.hasInternalSMSPermission,
        composeTextPermission: appFeatures.hasComposeTextPermission,
        loggingMap: conversationLogger && conversationLogger.loggingMap,
        showSpinner: !(locale.ready && conversations.ready && (!contactMatcher || contactMatcher.ready) && dateTimeFormat.ready && regionSettings.ready && appFeatures.ready && connectivityMonitor.ready && rateLimiter.ready && (!call || call.ready) && (!conversationLogger || conversationLogger.ready)),
        searchInput: conversations.searchInput,
        autoLog: !!(conversationLogger && conversationLogger.autoLog),
        typeFilter: conversations.typeFilter,
        textUnreadCounts: messageStore.textUnreadCounts,
        voiceUnreadCounts: messageStore.voiceUnreadCounts,
        faxUnreadCounts: messageStore.faxUnreadCounts,
        readTextPermission: appFeatures.hasReadTextPermission,
        readVoicemailPermission: appFeatures.hasVoicemailPermission,
        readFaxPermission: appFeatures.hasReadFaxPermission,
        loadingNextPage: conversations.loadingOldConversations,
        enableCDC: appFeatures.isCDCEnabled
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _ref2$showViewContact = _ref2.showViewContact,
          showViewContact = _ref2$showViewContact === void 0 ? true : _ref2$showViewContact,
          dateTimeFormatter = _ref2.dateTimeFormatter,
          _ref2$dialerRoute = _ref2.dialerRoute,
          dialerRoute = _ref2$dialerRoute === void 0 ? '/dialer' : _ref2$dialerRoute,
          onCreateContact = _ref2.onCreateContact,
          onLogConversation = _ref2.onLogConversation,
          onViewContact = _ref2.onViewContact,
          _ref2$conversationDet = _ref2.conversationDetailRoute,
          conversationDetailRoute = _ref2$conversationDet === void 0 ? '/conversations/{conversationId}' : _ref2$conversationDet,
          _ref2$composeTextRout = _ref2.composeTextRoute,
          composeTextRoute = _ref2$composeTextRout === void 0 ? '/composeText' : _ref2$composeTextRout,
          _previewFaxMessages = _ref2.previewFaxMessages,
          onFaxDownload = _ref2.onFaxDownload;
      var _this$_deps2 = this._deps,
          dateTimeFormat = _this$_deps2.dateTimeFormat,
          conversations = _this$_deps2.conversations,
          messageStore = _this$_deps2.messageStore,
          conversationLogger = _this$_deps2.conversationLogger,
          contactMatcher = _this$_deps2.contactMatcher,
          call = _this$_deps2.call,
          dialerUI = _this$_deps2.dialerUI,
          routerInteraction = _this$_deps2.routerInteraction,
          contactDetailsUI = _this$_deps2.contactDetailsUI,
          composeText = _this$_deps2.composeText,
          contactSearch = _this$_deps2.contactSearch,
          appFeatures = _this$_deps2.appFeatures;
      return {
        dateTimeFormatter: dateTimeFormatter !== null && dateTimeFormatter !== void 0 ? dateTimeFormatter : function () {
          return dateTimeFormat.formatDateTime.apply(dateTimeFormat, arguments);
        },
        onViewContact: showViewContact ? onViewContact || function (_ref3) {
          var _ref3$contact = _ref3.contact,
              id = _ref3$contact.id,
              type = _ref3$contact.type;

          if (contactDetailsUI) {
            contactDetailsUI.showContactDetails({
              id: id,
              type: type,
              direct: true
            });
          }
        } : null,
        onCreateContact: onCreateContact ? /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref4) {
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
        onClickToDial: dialerUI && appFeatures.isCallingEnabled ? function (recipient) {
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
        onClickToSms: appFeatures.hasComposeTextPermission ? function (contact) {
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
        onLogConversation: onLogConversation || conversationLogger && /*#__PURE__*/function () {
          var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref6) {
            var _ref6$redirect, redirect, options;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _ref6$redirect = _ref6.redirect, redirect = _ref6$redirect === void 0 ? true : _ref6$redirect, options = _objectWithoutProperties(_ref6, ["redirect"]);
                    _context2.next = 3;
                    return conversationLogger.logConversation(_objectSpread(_objectSpread({}, options), {}, {
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
          conversations.deleteConversation(conversationId);
        },
        previewFaxMessages: function previewFaxMessages(uri, conversationId) {
          if (!_previewFaxMessages) {
            window.open(uri);
          } else {
            _previewFaxMessages(uri);
          }

          messageStore.readMessages(conversationId);
        },
        loadNextPage: function loadNextPage() {
          return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
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
          }))();
        },
        onUnmount: function onUnmount() {
          if (conversations.currentPage > 2) {
            conversations.resetCurrentPage();
          }
        },
        onFaxDownload: onFaxDownload
      };
    }
  }]);

  return ConversationsUI;
}(_core.RcUIModuleV2)) || _class);
exports.ConversationsUI = ConversationsUI;
//# sourceMappingURL=ConversationsUI.js.map
