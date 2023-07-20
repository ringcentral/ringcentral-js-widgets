"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.function.name");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
require("core-js/modules/es.string.search");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationsUI = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _core = require("@ringcentral-integration/core");
var _dec, _class;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var ConversationsUI = (_dec = (0, _di.Module)({
  name: 'ConversationsUI',
  deps: ['Brand', 'Locale', 'Conversations', 'DateTimeFormat', 'RegionSettings', 'AppFeatures', 'ConnectivityMonitor', 'RateLimiter', 'MessageStore', 'ConnectivityManager', 'ExtensionInfo', 'RouterInteraction', 'ComposeText', 'ContactSearch', 'AccountInfo', {
    dep: 'Call',
    optional: true
  }, {
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
      var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3, _this$_deps$extension4, _this$_deps$extension5;
      var _ref$showTitle = _ref.showTitle,
        showTitle = _ref$showTitle === void 0 ? false : _ref$showTitle,
        _ref$enableContactFal = _ref.enableContactFallback,
        enableContactFallback = _ref$enableContactFal === void 0 ? false : _ref$enableContactFal,
        _ref$showGroupNumberN = _ref.showGroupNumberName,
        showGroupNumberName = _ref$showGroupNumberN === void 0 ? false : _ref$showGroupNumberN;
      return {
        showTitle: showTitle,
        enableContactFallback: enableContactFallback,
        showGroupNumberName: showGroupNumberName,
        brand: this._deps.brand.name,
        currentLocale: this._deps.locale.currentLocale,
        currentSiteCode: (_this$_deps$extension = (_this$_deps$extension2 = this._deps.extensionInfo) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.site) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.code) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : '',
        isMultipleSiteEnabled: (_this$_deps$extension4 = (_this$_deps$extension5 = this._deps.extensionInfo) === null || _this$_deps$extension5 === void 0 ? void 0 : _this$_deps$extension5.isMultipleSiteEnabled) !== null && _this$_deps$extension4 !== void 0 ? _this$_deps$extension4 : false,
        conversations: this._deps.conversations.pagingConversations,
        areaCode: this._deps.regionSettings.areaCode,
        countryCode: this._deps.regionSettings.countryCode,
        disableLinks: this._deps.connectivityManager.isOfflineMode || this._deps.connectivityManager.isVoipOnlyMode || this._deps.rateLimiter.throttling,
        disableCallButton: this._deps.connectivityManager.isOfflineMode || this._deps.connectivityManager.isWebphoneUnavailableMode || this._deps.connectivityManager.isWebphoneInitializing || this._deps.rateLimiter.throttling,
        disableClickToDial: !(this._deps.call && this._deps.call.isIdle),
        outboundSmsPermission: this._deps.appFeatures.hasOutboundSMSPermission,
        internalSmsPermission: this._deps.appFeatures.hasInternalSMSPermission,
        composeTextPermission: this._deps.appFeatures.hasComposeTextPermission,
        loggingMap: this._deps.conversationLogger && this._deps.conversationLogger.loggingMap,
        showSpinner: !(this._deps.locale.ready && this._deps.conversations.ready && (!this._deps.contactMatcher || this._deps.contactMatcher.ready) && this._deps.dateTimeFormat.ready && this._deps.regionSettings.ready && this._deps.appFeatures.ready && this._deps.connectivityMonitor.ready && this._deps.rateLimiter.ready && (!this._deps.call || this._deps.call.ready) && (!this._deps.conversationLogger || this._deps.conversationLogger.ready)),
        searchInput: this._deps.conversations.searchInput,
        autoLog: !!(this._deps.conversationLogger && this._deps.conversationLogger.autoLog),
        typeFilter: this._deps.conversations.typeFilter,
        textUnreadCounts: this._deps.messageStore.textUnreadCounts,
        voiceUnreadCounts: this._deps.messageStore.voiceUnreadCounts,
        faxUnreadCounts: this._deps.messageStore.faxUnreadCounts,
        readTextPermission: this._deps.appFeatures.hasReadTextPermission,
        readVoicemailPermission: this._deps.appFeatures.hasVoicemailPermission,
        readFaxPermission: this._deps.appFeatures.hasReadFaxPermission,
        loadingNextPage: this._deps.conversations.loadingOldConversations,
        enableCDC: this._deps.appFeatures.isCDCEnabled,
        maxExtensionNumberLength: this._deps.accountInfo.maxExtensionNumberLength
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;
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
      return {
        formatPhone: function formatPhone(phoneNumber) {
          var _this$_deps$extension6;
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this._deps.regionSettings.areaCode,
            countryCode: _this._deps.regionSettings.countryCode,
            maxExtensionLength: _this._deps.accountInfo.maxExtensionNumberLength,
            isMultipleSiteEnabled: _this._deps.extensionInfo.isMultipleSiteEnabled,
            siteCode: (_this$_deps$extension6 = _this._deps.extensionInfo.site) === null || _this$_deps$extension6 === void 0 ? void 0 : _this$_deps$extension6.code
          });
        },
        // @ts-expect-error TS(2322): Type '(options: Partial<FormatDateTimeOptions>) =>... Remove this comment to see the full error message
        dateTimeFormatter: dateTimeFormatter !== null && dateTimeFormatter !== void 0 ? dateTimeFormatter : function () {
          var _this$_deps$dateTimeF;
          return (_this$_deps$dateTimeF = _this._deps.dateTimeFormat).formatDateTime.apply(_this$_deps$dateTimeF, arguments);
        },
        // @ts-expect-error TS(2322): Type '((options: OnViewContactOptions) => void) | ... Remove this comment to see the full error message
        onViewContact: showViewContact ? onViewContact || function (_ref3) {
          var _ref3$contact = _ref3.contact,
            id = _ref3$contact.id,
            type = _ref3$contact.type;
          if (_this._deps.contactDetailsUI) {
            _this._deps.contactDetailsUI.showContactDetails({
              id: id,
              type: type,
              direct: true
            });
          }
        } : null,
        // @ts-expect-error TS(2322): Type '(({ phoneNumber, name, entityType }: OnCreat... Remove this comment to see the full error message
        onCreateContact: onCreateContact ? /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref4) {
            var phoneNumber, name, entityType, hasMatchNumber;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    phoneNumber = _ref4.phoneNumber, name = _ref4.name, entityType = _ref4.entityType;
                    _context.next = 3;
                    return _this._deps.contactMatcher.hasMatchNumber({
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
                    return _this._deps.contactMatcher.forceMatchNumber({
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
        onClickToDial: this._deps.dialerUI && this._deps.appFeatures.isCallingEnabled ? function (recipient) {
          if (_this._deps.call.isIdle) {
            _this._deps.routerInteraction.push(dialerRoute);
            // for track router
            _this._deps.messageStore.onClickToCall({
              fromType: recipient.fromType
            });
            _this._deps.dialerUI.call({
              recipient: recipient
            });
          }
        } : undefined,
        onClickToSms: this._deps.appFeatures.hasComposeTextPermission ? function (contact) {
          var isDummyContact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (_this._deps.routerInteraction) {
            _this._deps.routerInteraction.push(composeTextRoute);
          }
          // if contact autocomplete, if no match fill the number only
          if (contact.name && contact.phoneNumber && isDummyContact) {
            _this._deps.composeText.updateTypingToNumber(contact.name);
            _this._deps.contactSearch.search({
              searchString: contact.name
            });
          } else {
            _this._deps.composeText.addToNumber(contact);
            if (_this._deps.composeText.typingToNumber === contact.phoneNumber) {
              _this._deps.composeText.cleanTypingToNumber();
            }
          }
          // for track
          _this._deps.messageStore.onClickToSMS();
        } : undefined,
        onLogConversation: onLogConversation || this._deps.conversationLogger && /*#__PURE__*/function () {
          var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref6) {
            var _ref6$redirect, redirect, options;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _ref6$redirect = _ref6.redirect, redirect = _ref6$redirect === void 0 ? true : _ref6$redirect, options = _objectWithoutProperties(_ref6, ["redirect"]);
                    _context2.next = 3;
                    return _this._deps.conversationLogger.logConversation(_objectSpread(_objectSpread({}, options), {}, {
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
          _this._deps.conversations.updateSearchInput(e.currentTarget.value);
        },
        showConversationDetail: function showConversationDetail(conversationId) {
          _this._deps.routerInteraction.push(conversationDetailRoute.replace('{conversationId}', conversationId));
        },
        readMessage: function readMessage(conversationId) {
          _this._deps.messageStore.readMessages(conversationId);
        },
        markMessage: function markMessage(conversationId) {
          _this._deps.messageStore.unreadMessage(conversationId);
        },
        unmarkMessage: function unmarkMessage(conversationId) {
          _this._deps.messageStore.readMessages(conversationId);
          _this._deps.messageStore.onUnmarkMessages();
        },
        goToComposeText: function goToComposeText() {
          return _this._deps.routerInteraction.push(composeTextRoute);
        },
        updateTypeFilter: function updateTypeFilter(type) {
          return _this._deps.conversations.updateTypeFilter(type);
        },
        deleteMessage: function deleteMessage(conversationId) {
          _this._deps.conversations.deleteConversation(conversationId);
        },
        previewFaxMessages: function previewFaxMessages(uri, conversationId) {
          if (!_previewFaxMessages) {
            window.open(uri);
          } else {
            _previewFaxMessages(uri);
          }
          _this._deps.messageStore.readMessages(conversationId);
        },
        loadNextPage: function () {
          var _loadNextPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return _this._deps.conversations.loadNextPage();
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
          if (_this._deps.conversations.currentPage > 2) {
            _this._deps.conversations.resetCurrentPage();
          }
        },
        // @ts-expect-error TS(2322): Type '((options: { uri: string; }) => void) | unde... Remove this comment to see the full error message
        onFaxDownload: onFaxDownload
      };
    }
  }]);
  return ConversationsUI;
}(_core.RcUIModuleV2)) || _class);
exports.ConversationsUI = ConversationsUI;
//# sourceMappingURL=ConversationsUI.js.map
