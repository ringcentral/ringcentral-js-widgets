"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeTextUI = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _module = _interopRequireDefault(require("@ringcentral-integration/commons/lib/di/decorators/module"));
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _core = require("@ringcentral-integration/core");
var _dec, _dec2, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
/**
 * TODO: check type correctness after migrating to @rx-ex for client
 */
var ComposeTextUI = exports.ComposeTextUI = (_dec = (0, _module["default"])({
  name: 'ComposeTextUI',
  deps: ['Brand', 'ComposeText', 'ConnectivityMonitor', 'ContactSearch', 'Conversations', 'Locale', 'MessageSender', 'MessageStore', 'RateLimiter', 'RegionSettings', 'AppFeatures', 'RouterInteraction', 'AccountInfo']
}), _dec2 = (0, _core.track)(function (that, eventName, contactType) {
  return [eventName, {
    contactType: contactType,
    location: 'SMS compose'
  }];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  function ComposeTextUI(deps) {
    _classCallCheck(this, ComposeTextUI);
    return _callSuper(this, ComposeTextUI, [{
      deps: deps
    }]);
  }
  _inherits(ComposeTextUI, _RcUIModuleV);
  return _createClass(ComposeTextUI, [{
    key: "triggerEventTracking",
    value: function () {
      var _triggerEventTracking = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(eventName, contactType) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              return _context.a(2);
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
          var _send = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(text, attachments) {
            var responses, conversationId, _t;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.p = _context2.n) {
                case 0:
                  _context2.p = 0;
                  _context2.n = 1;
                  return _this._deps.composeText.send(text, attachments);
                case 1:
                  responses = _context2.v;
                  if (!(!responses || responses.length === 0)) {
                    _context2.n = 2;
                    break;
                  }
                  return _context2.a(2);
                case 2:
                  // @ts-expect-error TS(2345): Argument of type Remove this comment to see the full error message
                  _this._deps.messageStore.pushMessages(responses);
                  if (!(responses.length === 1)) {
                    _context2.n = 4;
                    break;
                  }
                  conversationId = responses[0] &&
                  // @ts-expect-error TS(2551): Property 'conversation' does not exist on type 'Ge... Remove this comment to see the full error message
                  responses[0].conversation &&
                  // @ts-expect-error TS(2551): Property 'conversation' does not exist on type 'Ge... Remove this comment to see the full error message
                  responses[0].conversation.id;
                  if (conversationId) {
                    _context2.n = 3;
                    break;
                  }
                  return _context2.a(2);
                case 3:
                  _this._deps.routerInteraction.push("/conversations/".concat(conversationId));
                  _context2.n = 5;
                  break;
                case 4:
                  _this._deps.routerInteraction.push('/messages');
                case 5:
                  // @ts-expect-error TS(2345): Argument of type 'GetMessageInfoResponse[]' is not... Remove this comment to see the full error message
                  _this._deps.conversations.relateCorrespondentEntity(responses);
                  _this._deps.composeText.clean();
                  return _context2.a(2);
                case 6:
                  _context2.p = 6;
                  _t = _context2.v;
                  console.log(_t);
                case 7:
                  return _context2.a(2);
              }
            }, _callee2, null, [[0, 6]]);
          }));
          function send(_x3, _x4) {
            return _send.apply(this, arguments);
          }
          return send;
        }(),
        formatPhone: formatContactPhone,
        formatContactPhone: formatContactPhone,
        detectPhoneNumbers: function () {
          var _detectPhoneNumbers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(input) {
            var promises, results, detectedNumbers;
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.n) {
                case 0:
                  promises = input.split(/,\s*/g).map(/*#__PURE__*/function () {
                    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(item) {
                      var isValid;
                      return _regenerator().w(function (_context3) {
                        while (1) switch (_context3.n) {
                          case 0:
                            item = item.trim();
                            _context3.n = 1;
                            return _this._deps.composeText.validatePhoneNumber(item);
                          case 1:
                            isValid = _context3.v;
                            return _context3.a(2, isValid ? item : '');
                        }
                      }, _callee3);
                    }));
                    return function (_x6) {
                      return _ref3.apply(this, arguments);
                    };
                  }());
                  _context4.n = 1;
                  return Promise.all(promises);
                case 1:
                  results = _context4.v;
                  detectedNumbers = results.filter(function (item) {
                    return !!item;
                  });
                  detectedNumbers.forEach(function (phoneNumber) {
                    _this._deps.composeText.addToNumber({
                      phoneNumber: phoneNumber
                    });
                  });
                  return _context4.a(2, detectedNumbers.length > 0);
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
}(_core.RcUIModuleV2), _applyDecoratedDescriptor(_class2.prototype, "triggerEventTracking", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "triggerEventTracking"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=ComposeTextUI.js.map
