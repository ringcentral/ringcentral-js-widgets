"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeTextUI = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _module = _interopRequireDefault(require("ringcentral-integration/lib/di/decorators/module"));

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * TODO: check type correctness after migrating to @rx-ex for client
 */
var ComposeTextUI = (_dec = (0, _module["default"])({
  name: 'ComposeTextUI',
  deps: ['Brand', 'ComposeText', 'ConnectivityMonitor', 'ContactSearch', 'Conversations', 'Locale', 'MessageSender', 'MessageStore', 'RateLimiter', 'RegionSettings', 'ExtensionFeatures', 'RouterInteraction']
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
          supportAttachment = _ref.supportAttachment;
      var _this$_deps = this._deps,
          brand = _this$_deps.brand,
          locale = _this$_deps.locale,
          composeText = _this$_deps.composeText,
          messageSender = _this$_deps.messageSender,
          connectivityMonitor = _this$_deps.connectivityMonitor,
          rateLimiter = _this$_deps.rateLimiter,
          extensionFeatures = _this$_deps.extensionFeatures,
          contactSearch = _this$_deps.contactSearch;
      var isContentEmpty = composeText.messageText.length === 0 && (!composeText.attachments || composeText.attachments.length === 0);
      return {
        brand: brand.fullName,
        currentLocale: locale.currentLocale,
        sendButtonDisabled: !(composeText.ready && messageSender.idle) || isContentEmpty || composeText.toNumbers.length === 0 && composeText.typingToNumber.length === 0 || !connectivityMonitor.connectivity || rateLimiter.throttling,
        senderNumbers: messageSender.senderNumbersList,
        senderNumber: composeText.senderNumber,
        typingToNumber: composeText.typingToNumber,
        toNumbers: composeText.toNumbers,
        messageText: composeText.messageText,
        outboundSMS: extensionFeatures.hasOutboundSMSPermission,
        searchContactList: contactSearch.sortedResult,
        showSpinner: !(composeText.ready && locale.ready && messageSender.ready && extensionFeatures.ready && contactSearch.ready),
        inputExpandable: inputExpandable,
        attachments: composeText.attachments,
        supportAttachment: supportAttachment
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;

      var _ref2$formatContactPh = _ref2.formatContactPhone,
          formatContactPhone = _ref2$formatContactPh === void 0 ? function (phoneNumber) {
        return (0, _formatNumber["default"])({
          phoneNumber: phoneNumber,
          areaCode: _this._deps.regionSettings.areaCode,
          countryCode: _this._deps.regionSettings.countryCode
        });
      } : _ref2$formatContactPh,
          phoneTypeRenderer = _ref2.phoneTypeRenderer,
          phoneSourceNameRenderer = _ref2.phoneSourceNameRenderer,
          recipientsContactInfoRenderer = _ref2.recipientsContactInfoRenderer,
          recipientsContactPhoneRenderer = _ref2.recipientsContactPhoneRenderer;
      var _this$_deps2 = this._deps,
          routerInteraction = _this$_deps2.routerInteraction,
          composeText = _this$_deps2.composeText,
          messageStore = _this$_deps2.messageStore,
          contactSearch = _this$_deps2.contactSearch,
          conversations = _this$_deps2.conversations;
      return {
        send: function send(text, attachments) {
          return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var responses, conversationId;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return composeText.send(text, attachments);

                  case 3:
                    responses = _context.sent;

                    if (!(!responses || responses.length === 0)) {
                      _context.next = 6;
                      break;
                    }

                    return _context.abrupt("return");

                  case 6:
                    messageStore.pushMessages(responses);

                    if (!(responses.length === 1)) {
                      _context.next = 14;
                      break;
                    }

                    conversationId = responses[0] && responses[0].conversation && responses[0].conversation.id;

                    if (conversationId) {
                      _context.next = 11;
                      break;
                    }

                    return _context.abrupt("return");

                  case 11:
                    routerInteraction.push("/conversations/".concat(conversationId));
                    _context.next = 15;
                    break;

                  case 14:
                    routerInteraction.push('/messages');

                  case 15:
                    conversations.relateCorrespondentEntity(responses);
                    composeText.clean();
                    return _context.abrupt("return");

                  case 20:
                    _context.prev = 20;
                    _context.t0 = _context["catch"](0);
                    console.log(_context.t0);

                  case 23:
                    composeText.send(text, attachments).then(function (responses) {
                      if (!responses || responses.length === 0) {
                        return null;
                      }

                      messageStore.pushMessages(responses);

                      if (responses.length === 1) {
                        var _conversationId = responses[0] && responses[0].conversation && responses[0].conversation.id;

                        if (!_conversationId) {
                          return null;
                        }

                        routerInteraction.push("/conversations/".concat(_conversationId));
                      } else {
                        routerInteraction.push('/messages');
                      }

                      conversations.relateCorrespondentEntity(responses);
                      composeText.clean();
                      return null;
                    }, function (err) {
                      console.log(err);
                    });

                  case 24:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[0, 20]]);
          }))();
        },
        formatPhone: formatContactPhone,
        formatContactPhone: formatContactPhone,
        detectPhoneNumbers: function detectPhoneNumbers(input) {
          return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
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
                                return composeText.validatePhoneNumber(item);

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

                      return function (_x) {
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
                      composeText.addToNumber({
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
          }))();
        },
        searchContact: function searchContact(searchString) {
          return contactSearch.debouncedSearch({
            searchString: searchString
          });
        },
        updateSenderNumber: function updateSenderNumber(_ref4) {
          var phoneNumber = _ref4.phoneNumber;
          return composeText.updateSenderNumber(phoneNumber);
        },
        updateTypingToNumber: function updateTypingToNumber() {
          return composeText.updateTypingToNumber.apply(composeText, arguments);
        },
        cleanTypingToNumber: function cleanTypingToNumber() {
          return composeText.cleanTypingToNumber.apply(composeText, arguments);
        },
        addToNumber: function addToNumber() {
          return composeText.addToNumber.apply(composeText, arguments);
        },
        removeToNumber: function removeToNumber() {
          return composeText.removeToNumber.apply(composeText, arguments);
        },
        updateMessageText: function updateMessageText() {
          return composeText.updateMessageText.apply(composeText, arguments);
        },
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        recipientsContactInfoRenderer: recipientsContactInfoRenderer,
        recipientsContactPhoneRenderer: recipientsContactPhoneRenderer,
        addAttachment: function addAttachment() {
          return composeText.addAttachment.apply(composeText, arguments);
        },
        removeAttachment: function removeAttachment() {
          return composeText.removeAttachment.apply(composeText, arguments);
        }
      };
    }
  }]);

  return ComposeTextUI;
}(_core.RcUIModuleV2)) || _class);
exports.ComposeTextUI = ComposeTextUI;
//# sourceMappingURL=ComposeTextUI.js.map
