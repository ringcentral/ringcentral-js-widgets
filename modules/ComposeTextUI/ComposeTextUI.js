"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.iterator");
require("core-js/modules/es.string.split");
require("core-js/modules/es.string.trim");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeTextUI = void 0;
require("regenerator-runtime/runtime");
var _module = _interopRequireDefault(require("@ringcentral-integration/commons/lib/di/decorators/module"));
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _core = require("@ringcentral-integration/core");
var _dec, _dec2, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
/**
 * TODO: check type correctness after migrating to @rx-ex for client
 */
var ComposeTextUI = (_dec = (0, _module["default"])({
  name: 'ComposeTextUI',
  deps: ['Brand', 'ComposeText', 'ConnectivityMonitor', 'ContactSearch', 'Conversations', 'Locale', 'MessageSender', 'MessageStore', 'RateLimiter', 'RegionSettings', 'AppFeatures', 'RouterInteraction', 'AccountInfo']
}), _dec2 = (0, _core.track)(function (that, eventName, contactType) {
  return [eventName, {
    contactType: contactType,
    location: 'SMS compose'
  }];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(ComposeTextUI, _RcUIModuleV);
  var _super = _createSuper(ComposeTextUI);
  function ComposeTextUI(deps) {
    _classCallCheck(this, ComposeTextUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(ComposeTextUI, [{
    key: "triggerEventTracking",
    value: function () {
      var _triggerEventTracking = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(eventName, contactType) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function triggerEventTracking(_x, _x2) {
        return _triggerEventTracking.apply(this, arguments);
      }
      return triggerEventTracking;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var inputExpandable = _ref.inputExpandable,
        supportAttachment = _ref.supportAttachment,
        _ref$supportEmoji = _ref.supportEmoji,
        supportEmoji = _ref$supportEmoji === void 0 ? false : _ref$supportEmoji,
        _ref$useRecipientsInp = _ref.useRecipientsInputV2,
        useRecipientsInputV2 = _ref$useRecipientsInp === void 0 ? false : _ref$useRecipientsInp,
        autoFocusToField = _ref.autoFocusToField,
        _ref$showCustomPhoneL = _ref.showCustomPhoneLabel,
        showCustomPhoneLabel = _ref$showCustomPhoneL === void 0 ? false : _ref$showCustomPhoneL;
      var isContentEmpty = this._deps.composeText.messageText.length === 0 && (!this._deps.composeText.attachments || this._deps.composeText.attachments.length === 0);
      return {
        brand: this._deps.brand.name,
        currentLocale: this._deps.locale.currentLocale,
        sendButtonDisabled: !(this._deps.composeText.ready && this._deps.messageSender.idle) || isContentEmpty || this._deps.composeText.toNumbers.length === 0 && this._deps.composeText.typingToNumber.length === 0 || !this._deps.connectivityMonitor.connectivity || this._deps.rateLimiter.throttling,
        senderNumbers: this._deps.messageSender.senderNumbersList,
        senderNumber: this._deps.composeText.senderNumber,
        typingToNumber: this._deps.composeText.typingToNumber,
        toNumbers: this._deps.composeText.toNumbers,
        messageText: this._deps.composeText.messageText,
        outboundSMS: this._deps.appFeatures.hasOutboundSMSPermission,
        // @ts-expect-error TS(2322): Type '{ id: string; name: string; phoneNumber: str... Remove this comment to see the full error message
        searchContactList: this._deps.contactSearch.sortedResult,
        showSpinner: !(this._deps.composeText.ready && this._deps.locale.ready && this._deps.messageSender.ready && this._deps.appFeatures.ready && this._deps.contactSearch.ready),
        inputExpandable: inputExpandable,
        attachments: this._deps.composeText.attachments,
        supportAttachment: supportAttachment && this._deps.appFeatures.hasSendMMSPermission,
        supportEmoji: supportEmoji,
        useRecipientsInputV2: useRecipientsInputV2,
        autoFocus: autoFocusToField,
        showCustomPhoneLabel: showCustomPhoneLabel
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;
      var _ref2$formatContactPh = _ref2.formatContactPhone,
        formatContactPhone = _ref2$formatContactPh === void 0 ? function (phoneNumber) {
          return (
            // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
            (0, _formatNumber.formatNumber)({
              phoneNumber: phoneNumber,
              areaCode: _this._deps.regionSettings.areaCode,
              countryCode: _this._deps.regionSettings.countryCode,
              maxExtensionLength: _this._deps.accountInfo.maxExtensionNumberLength
            })
          );
        } : _ref2$formatContactPh,
        phoneTypeRenderer = _ref2.phoneTypeRenderer,
        phoneSourceNameRenderer = _ref2.phoneSourceNameRenderer,
        recipientsContactInfoRenderer = _ref2.recipientsContactInfoRenderer,
        recipientsContactPhoneRenderer = _ref2.recipientsContactPhoneRenderer;
      return {
        triggerEventTracking: function triggerEventTracking(eventName, contactType) {
          return _this.triggerEventTracking(eventName, contactType);
        },
        send: function () {
          var _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(text, attachments) {
            var responses, conversationId;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return _this._deps.composeText.send(text, attachments);
                  case 3:
                    responses = _context2.sent;
                    if (!(!responses || responses.length === 0)) {
                      _context2.next = 6;
                      break;
                    }
                    return _context2.abrupt("return");
                  case 6:
                    // @ts-expect-error TS(2345): Argument of type Remove this comment to see the full error message
                    _this._deps.messageStore.pushMessages(responses);
                    if (!(responses.length === 1)) {
                      _context2.next = 14;
                      break;
                    }
                    conversationId = responses[0] &&
                    // @ts-expect-error TS(2551): Property 'conversation' does not exist on type 'Ge... Remove this comment to see the full error message
                    responses[0].conversation &&
                    // @ts-expect-error TS(2551): Property 'conversation' does not exist on type 'Ge... Remove this comment to see the full error message
                    responses[0].conversation.id;
                    if (conversationId) {
                      _context2.next = 11;
                      break;
                    }
                    return _context2.abrupt("return");
                  case 11:
                    _this._deps.routerInteraction.push("/conversations/".concat(conversationId));
                    _context2.next = 15;
                    break;
                  case 14:
                    _this._deps.routerInteraction.push('/messages');
                  case 15:
                    // @ts-expect-error TS(2345): Argument of type 'GetMessageInfoResponse[]' is not... Remove this comment to see the full error message
                    _this._deps.conversations.relateCorrespondentEntity(responses);
                    _this._deps.composeText.clean();
                    return _context2.abrupt("return");
                  case 20:
                    _context2.prev = 20;
                    _context2.t0 = _context2["catch"](0);
                    console.log(_context2.t0);
                  case 23:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, null, [[0, 20]]);
          }));
          function send(_x3, _x4) {
            return _send.apply(this, arguments);
          }
          return send;
        }(),
        formatPhone: formatContactPhone,
        formatContactPhone: formatContactPhone,
        detectPhoneNumbers: function () {
          var _detectPhoneNumbers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(input) {
            var promises, results, detectedNumbers;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    promises = input.split(/,\s*/g).map( /*#__PURE__*/function () {
                      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(item) {
                        var isValid;
                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                item = item.trim();
                                _context3.next = 3;
                                return _this._deps.composeText.validatePhoneNumber(item);
                              case 3:
                                isValid = _context3.sent;
                                return _context3.abrupt("return", isValid ? item : '');
                              case 5:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        }, _callee3);
                      }));
                      return function (_x6) {
                        return _ref3.apply(this, arguments);
                      };
                    }());
                    _context4.next = 3;
                    return Promise.all(promises);
                  case 3:
                    results = _context4.sent;
                    detectedNumbers = results.filter(function (item) {
                      return !!item;
                    });
                    detectedNumbers.forEach(function (phoneNumber) {
                      _this._deps.composeText.addToNumber({
                        phoneNumber: phoneNumber
                      });
                    });
                    return _context4.abrupt("return", detectedNumbers.length > 0);
                  case 7:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));
          function detectPhoneNumbers(_x5) {
            return _detectPhoneNumbers.apply(this, arguments);
          }
          return detectPhoneNumbers;
        }(),
        searchContact: function searchContact(searchString) {
          return _this._deps.contactSearch.debouncedSearch({
            searchString: searchString
          });
        },
        updateSenderNumber: function updateSenderNumber(_ref4) {
          var phoneNumber = _ref4.phoneNumber;
          return _this._deps.composeText.updateSenderNumber(phoneNumber);
        },
        updateTypingToNumber: function updateTypingToNumber() {
          var _this$_deps$composeTe;
          return (
            // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
            (_this$_deps$composeTe = _this._deps.composeText).updateTypingToNumber.apply(_this$_deps$composeTe, arguments)
          );
        },
        cleanTypingToNumber: function cleanTypingToNumber() {
          var _this$_deps$composeTe2;
          return (
            // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
            (_this$_deps$composeTe2 = _this._deps.composeText).cleanTypingToNumber.apply(_this$_deps$composeTe2, arguments)
          );
        },
        // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
        addToNumber: function addToNumber() {
          var _this$_deps$composeTe3;
          return (_this$_deps$composeTe3 = _this._deps.composeText).addToNumber.apply(_this$_deps$composeTe3, arguments);
        },
        removeToNumber: function removeToNumber() {
          var _this$_deps$composeTe4;
          return (
            // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
            (_this$_deps$composeTe4 = _this._deps.composeText).removeToNumber.apply(_this$_deps$composeTe4, arguments)
          );
        },
        updateMessageText: function updateMessageText() {
          var _this$_deps$composeTe5;
          return (
            // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
            (_this$_deps$composeTe5 = _this._deps.composeText).updateMessageText.apply(_this$_deps$composeTe5, arguments)
          );
        },
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        recipientsContactInfoRenderer: recipientsContactInfoRenderer,
        recipientsContactPhoneRenderer: recipientsContactPhoneRenderer,
        addAttachments: function addAttachments() {
          var _this$_deps$composeTe6;
          return (
            // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
            (_this$_deps$composeTe6 = _this._deps.composeText).addAttachments.apply(_this$_deps$composeTe6, arguments)
          );
        },
        removeAttachment: function removeAttachment() {
          var _this$_deps$composeTe7;
          return (
            // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
            (_this$_deps$composeTe7 = _this._deps.composeText).removeAttachment.apply(_this$_deps$composeTe7, arguments)
          );
        }
      };
    }
  }]);
  return ComposeTextUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "triggerEventTracking", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "triggerEventTracking"), _class2.prototype)), _class2)) || _class);
exports.ComposeTextUI = ComposeTextUI;
//# sourceMappingURL=ComposeTextUI.js.map
