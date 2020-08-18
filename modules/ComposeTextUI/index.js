"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

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

var _module = _interopRequireDefault(require("ringcentral-integration/lib/di/decorators/module"));

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ComposeTextUI = (_dec = (0, _module["default"])({
  name: 'ComposeTextUI',
  deps: ['Brand', 'ComposeText', 'ConnectivityMonitor', 'ContactSearch', 'Conversations', 'Locale', 'MessageSender', 'MessageStore', 'RateLimiter', 'RegionSettings', 'RolesAndPermissions', 'RouterInteraction']
}), _dec(_class = /*#__PURE__*/function (_RcUIModule) {
  _inherits(ComposeTextUI, _RcUIModule);

  var _super = _createSuper(ComposeTextUI);

  function ComposeTextUI() {
    _classCallCheck(this, ComposeTextUI);

    return _super.apply(this, arguments);
  }

  _createClass(ComposeTextUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _ref$phone = _ref.phone,
          brand = _ref$phone.brand,
          locale = _ref$phone.locale,
          composeText = _ref$phone.composeText,
          messageSender = _ref$phone.messageSender,
          connectivityMonitor = _ref$phone.connectivityMonitor,
          rateLimiter = _ref$phone.rateLimiter,
          rolesAndPermissions = _ref$phone.rolesAndPermissions,
          contactSearch = _ref$phone.contactSearch,
          inputExpandable = _ref.inputExpandable,
          supportAttachment = _ref.supportAttachment;
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
        outboundSMS: rolesAndPermissions.permissions.OutboundSMS,
        searchContactList: contactSearch.sortedResult,
        showSpinner: !(composeText.ready && locale.ready && messageSender.ready && rolesAndPermissions.ready && contactSearch.ready),
        inputExpandable: inputExpandable,
        attachments: composeText.attachments,
        supportAttachment: supportAttachment
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _ref2$phone = _ref2.phone,
          regionSettings = _ref2$phone.regionSettings,
          routerInteraction = _ref2$phone.routerInteraction,
          composeText = _ref2$phone.composeText,
          messageStore = _ref2$phone.messageStore,
          contactSearch = _ref2$phone.contactSearch,
          conversations = _ref2$phone.conversations,
          _ref2$formatContactPh = _ref2.formatContactPhone,
          formatContactPhone = _ref2$formatContactPh === void 0 ? function (phoneNumber) {
        return (0, _formatNumber["default"])({
          phoneNumber: phoneNumber,
          areaCode: regionSettings.areaCode,
          countryCode: regionSettings.countryCode
        });
      } : _ref2$formatContactPh,
          phoneTypeRenderer = _ref2.phoneTypeRenderer,
          phoneSourceNameRenderer = _ref2.phoneSourceNameRenderer,
          recipientsContactInfoRenderer = _ref2.recipientsContactInfoRenderer,
          recipientsContactPhoneRenderer = _ref2.recipientsContactPhoneRenderer;
      return {
        send: function send() {
          var timeout = setTimeout(function () {
            if (routerInteraction.currentPath === '/composeText') {
              composeText.alertMessageSending();
            }

            if (timeout) {
              clearTimeout(timeout);
              timeout = null;
            }
          }, 10000);
          composeText.send().then(function (responses) {
            if (timeout) {
              clearTimeout(timeout);
              timeout = null;
            }

            composeText.dismissMessageSending();

            if (!responses || responses.length === 0) {
              return null;
            }

            messageStore.pushMessages(responses);

            if (responses.length === 1) {
              var conversationId = responses[0] && responses[0].conversation && responses[0].conversation.id;

              if (!conversationId) {
                return null;
              }

              routerInteraction.push("/conversations/".concat(conversationId));
            } else {
              routerInteraction.push('/messages');
            }

            conversations.relateCorrespondentEntity(responses);
            composeText.clean();
            return null;
          }, function () {
            if (timeout) {
              clearTimeout(timeout);
              timeout = null;
            }
          });
        },
        formatPhone: formatContactPhone,
        formatContactPhone: formatContactPhone,
        detectPhoneNumbers: function detectPhoneNumbers(input) {
          return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var promises, results, detectedNumbers;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    promises = input.split(/,\s*/g).map( /*#__PURE__*/function () {
                      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item) {
                        var isValid;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.next = 2;
                                return composeText.validatePhoneNumber(item);

                              case 2:
                                isValid = _context.sent;
                                return _context.abrupt("return", isValid ? item : undefined);

                              case 4:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee);
                      }));

                      return function (_x) {
                        return _ref3.apply(this, arguments);
                      };
                    }());
                    _context2.next = 3;
                    return Promise.all(promises);

                  case 3:
                    results = _context2.sent;
                    detectedNumbers = results.filter(function (item) {
                      return !!item;
                    });
                    detectedNumbers.forEach(function (phoneNumber) {
                      composeText.addToNumber({
                        phoneNumber: phoneNumber
                      });
                    });
                    return _context2.abrupt("return", detectedNumbers.length > 0);

                  case 7:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
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
}(_RcUIModule2["default"])) || _class);
exports["default"] = ComposeTextUI;
//# sourceMappingURL=index.js.map
