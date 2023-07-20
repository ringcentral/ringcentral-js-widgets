"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.iterator");
require("core-js/modules/es.string.split");
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
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
/**
 * TODO: check type correctness after migrating to @rx-ex for client
 */
var ComposeTextUI = (_dec = (0, _module["default"])({
  name: 'ComposeTextUI',
  deps: ['Brand', 'ComposeText', 'ConnectivityMonitor', 'ContactSearch', 'Conversations', 'Locale', 'MessageSender', 'MessageStore', 'RateLimiter', 'RegionSettings', 'AppFeatures', 'RouterInteraction', 'AccountInfo']
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(ComposeTextUI, _RcUIModuleV);
  var _super = _createSuper(ComposeTextUI);
  function ComposeTextUI(deps) {
    _classCallCheck(this, ComposeTextUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(ComposeTextUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var inputExpandable = _ref.inputExpandable,
        supportAttachment = _ref.supportAttachment,
        _ref$useRecipientsInp = _ref.useRecipientsInputV2,
        useRecipientsInputV2 = _ref$useRecipientsInp === void 0 ? false : _ref$useRecipientsInp;
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
        supportAttachment: supportAttachment,
        useRecipientsInputV2: useRecipientsInputV2
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
        send: function () {
          var _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(text, attachments) {
            var responses, conversationId;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return _this._deps.composeText.send(text, attachments);
                  case 3:
                    responses = _context.sent;
                    if (!(!responses || responses.length === 0)) {
                      _context.next = 6;
                      break;
                    }
                    return _context.abrupt("return");
                  case 6:
                    // @ts-expect-error TS(2345): Argument of type Remove this comment to see the full error message
                    _this._deps.messageStore.pushMessages(responses);
                    if (!(responses.length === 1)) {
                      _context.next = 14;
                      break;
                    }
                    conversationId = responses[0] &&
                    // @ts-expect-error TS(2551): Property 'conversation' does not exist on type 'Ge... Remove this comment to see the full error message
                    responses[0].conversation &&
                    // @ts-expect-error TS(2551): Property 'conversation' does not exist on type 'Ge... Remove this comment to see the full error message
                    responses[0].conversation.id;
                    if (conversationId) {
                      _context.next = 11;
                      break;
                    }
                    return _context.abrupt("return");
                  case 11:
                    _this._deps.routerInteraction.push("/conversations/".concat(conversationId));
                    _context.next = 15;
                    break;
                  case 14:
                    _this._deps.routerInteraction.push('/messages');
                  case 15:
                    // @ts-expect-error TS(2345): Argument of type 'GetMessageInfoResponse[]' is not... Remove this comment to see the full error message
                    _this._deps.conversations.relateCorrespondentEntity(responses);
                    _this._deps.composeText.clean();
                    return _context.abrupt("return");
                  case 20:
                    _context.prev = 20;
                    _context.t0 = _context["catch"](0);
                    console.log(_context.t0);
                  case 23:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[0, 20]]);
          }));
          function send(_x, _x2) {
            return _send.apply(this, arguments);
          }
          return send;
        }(),
        formatPhone: formatContactPhone,
        formatContactPhone: formatContactPhone,
        detectPhoneNumbers: function () {
          var _detectPhoneNumbers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(input) {
            var promises, results, detectedNumbers;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    promises = input.split(/,\s*/g).map( /*#__PURE__*/function () {
                      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item) {
                        var isValid;
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                _context2.next = 2;
                                return _this._deps.composeText.validatePhoneNumber(item);
                              case 2:
                                isValid = _context2.sent;
                                return _context2.abrupt("return", isValid ? item : undefined);
                              case 4:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        }, _callee2);
                      }));
                      return function (_x4) {
                        return _ref3.apply(this, arguments);
                      };
                    }());
                    _context3.next = 3;
                    return Promise.all(promises);
                  case 3:
                    results = _context3.sent;
                    detectedNumbers = results.filter(function (item) {
                      return !!item;
                    });
                    detectedNumbers.forEach(function (phoneNumber) {
                      _this._deps.composeText.addToNumber({
                        phoneNumber: phoneNumber
                      });
                    });
                    return _context3.abrupt("return", detectedNumbers.length > 0);
                  case 7:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));
          function detectPhoneNumbers(_x3) {
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
        // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
        addAttachment: function addAttachment() {
          var _this$_deps$composeTe6;
          return (_this$_deps$composeTe6 = _this._deps.composeText).addAttachment.apply(_this$_deps$composeTe6, arguments);
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
}(_core.RcUIModuleV2)) || _class);
exports.ComposeTextUI = ComposeTextUI;
//# sourceMappingURL=ComposeTextUI.js.map
