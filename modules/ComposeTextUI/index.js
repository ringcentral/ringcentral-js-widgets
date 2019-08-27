"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _module = _interopRequireDefault(require("ringcentral-integration/lib/di/decorators/module"));

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ComposeTextUI = (_dec = (0, _module["default"])({
  name: 'ComposeTextUI',
  deps: ['Brand', 'ComposeText', 'ConnectivityMonitor', 'ContactSearch', 'Conversations', 'Locale', 'MessageSender', 'MessageStore', 'RateLimiter', 'RegionSettings', 'RolesAndPermissions', 'RouterInteraction']
}), _dec(_class =
/*#__PURE__*/
function (_RcUIModule) {
  _inherits(ComposeTextUI, _RcUIModule);

  function ComposeTextUI() {
    _classCallCheck(this, ComposeTextUI);

    return _possibleConstructorReturn(this, _getPrototypeOf(ComposeTextUI).apply(this, arguments));
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
          inputExpandable = _ref.inputExpandable;
      return {
        brand: brand.fullName,
        currentLocale: locale.currentLocale,
        sendButtonDisabled: !(composeText.ready && messageSender.idle) || composeText.messageText.length === 0 || composeText.toNumbers.length === 0 && composeText.typingToNumber.length === 0 || !connectivityMonitor.connectivity || rateLimiter.throttling,
        senderNumbers: messageSender.senderNumbersList,
        senderNumber: composeText.senderNumber,
        typingToNumber: composeText.typingToNumber,
        toNumbers: composeText.toNumbers,
        messageText: composeText.messageText,
        outboundSMS: rolesAndPermissions.permissions.OutboundSMS,
        searchContactList: contactSearch.sortedResult,
        showSpinner: !(composeText.ready && locale.ready && messageSender.ready && rolesAndPermissions.ready && contactSearch.ready),
        inputExpandable: inputExpandable
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
        searchContact: function searchContact(searchString) {
          return contactSearch.debouncedSearch({
            searchString: searchString
          });
        },
        updateSenderNumber: function updateSenderNumber(_ref3) {
          var phoneNumber = _ref3.phoneNumber;
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
        recipientsContactPhoneRenderer: recipientsContactPhoneRenderer
      };
    }
  }]);

  return ComposeTextUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = ComposeTextUI;
//# sourceMappingURL=index.js.map
