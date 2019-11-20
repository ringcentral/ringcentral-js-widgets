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

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.find");

var _di = require("ringcentral-integration/lib/di");

var _phoneNumber = require("@ringcentral-integration/phone-number");

var _formatNumber2 = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

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

var DEFAULT_DIALER_ROUTE = '/dialer';
var DEFAULT_COMPOSETEXT_ROUTE = '/composeText';
var ContactDetailsUI = (_dec = (0, _di.Module)({
  name: 'ContactDetailsUI',
  deps: ['RouterInteraction', 'ContactDetails', 'ContactSearch', 'RolesAndPermissions', 'RateLimiter', 'RegionSettings', 'ConnectivityManager', 'Call', 'DialerUI', 'ComposeText', 'Brand', 'Locale', 'CallingSettings', {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'ContactDetailsUIOptions',
    optional: true
  }]
}), _dec(_class =
/*#__PURE__*/
function (_RcUIModule) {
  _inherits(ContactDetailsUI, _RcUIModule);

  function ContactDetailsUI() {
    _classCallCheck(this, ContactDetailsUI);

    return _possibleConstructorReturn(this, _getPrototypeOf(ContactDetailsUI).apply(this, arguments));
  }

  _createClass(ContactDetailsUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var params = _ref.params,
          _ref$dialerRoute = _ref.dialerRoute,
          dialerRoute = _ref$dialerRoute === void 0 ? DEFAULT_DIALER_ROUTE : _ref$dialerRoute,
          _ref$composeTextRoute = _ref.composeTextRoute,
          composeTextRoute = _ref$composeTextRoute === void 0 ? DEFAULT_COMPOSETEXT_ROUTE : _ref$composeTextRoute,
          _ref$phone = _ref.phone,
          locale = _ref$phone.locale,
          contactDetails = _ref$phone.contactDetails,
          contactSearch = _ref$phone.contactSearch,
          rolesAndPermissions = _ref$phone.rolesAndPermissions,
          connectivityManager = _ref$phone.connectivityManager,
          rateLimiter = _ref$phone.rateLimiter;
      return {
        params: params,
        dialerRoute: dialerRoute,
        composeTextRoute: composeTextRoute,
        currentLocale: locale.currentLocale,
        contactItem: contactDetails.contact,
        disableLinks: connectivityManager.isOfflineMode || connectivityManager.isVoipOnlyMode || rateLimiter.throttling,
        disableCallButton: connectivityManager.isOfflineMode || connectivityManager.isWebphoneUnavailableMode || connectivityManager.isWebphoneInitializing || rateLimiter.throttling,
        showSpinner: !(locale.ready && contactSearch.ready && contactDetails.ready && rolesAndPermissions.ready),
        outboundSmsPermission: rolesAndPermissions.permissions && rolesAndPermissions.permissions.OutboundSMS,
        internalSmsPermission: rolesAndPermissions.permissions && rolesAndPermissions.permissions.InternalSMS
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var params = _ref2.params,
          _ref2$dialerRoute = _ref2.dialerRoute,
          dialerRoute = _ref2$dialerRoute === void 0 ? DEFAULT_DIALER_ROUTE : _ref2$dialerRoute,
          _ref2$composeTextRout = _ref2.composeTextRoute,
          composeTextRoute = _ref2$composeTextRout === void 0 ? DEFAULT_COMPOSETEXT_ROUTE : _ref2$composeTextRout,
          _ref2$phone = _ref2.phone,
          call = _ref2$phone.call,
          dialerUI = _ref2$phone.dialerUI,
          composeText = _ref2$phone.composeText,
          contactSearch = _ref2$phone.contactSearch,
          contactDetails = _ref2$phone.contactDetails,
          regionSettings = _ref2$phone.regionSettings,
          routerInteraction = _ref2$phone.routerInteraction,
          rolesAndPermissions = _ref2$phone.rolesAndPermissions;
      return {
        getContact: function getContact() {
          contactDetails.find({
            id: params.contactId,
            type: params.contactType
          });
        },
        clearContact: function clearContact() {
          contactDetails.clear();
        },
        formatNumber: function formatNumber(phoneNumber) {
          // if the cleaned phone number is not a E164 format
          // we will show it directly, doesn't format it.
          var cleanedNumber = (0, _phoneNumber.parseIncompletePhoneNumber)(phoneNumber.toString());
          var isE164Number = (0, _phoneNumber.isE164)(cleanedNumber);

          if (isE164Number) {
            var formatedNumber = (0, _formatNumber2["default"])({
              phoneNumber: phoneNumber,
              countryCode: regionSettings.countryCode
            });
            return {
              phoneNumber: formatedNumber,
              beFormated: true
            };
          }

          return {
            phoneNumber: phoneNumber,
            beFormated: false
          };
        },
        getAvatar: function getAvatar(contact) {
          return contactDetails.getProfileImage(contact);
        },
        getPresence: function getPresence(contact) {
          return contactDetails.getPresence(contact);
        },
        onBackClick: function onBackClick() {
          routerInteraction.goBack();
        },
        onClickToDial: dialerUI && rolesAndPermissions.callingEnabled ? function (recipient) {
          if (call.isIdle) {
            routerInteraction.push(dialerRoute);
            dialerUI.call({
              recipient: recipient
            });
            contactDetails.onClickToCall();
          }
        } : undefined,
        onClickToSMS: composeText ? function _callee(contact) {
          var isDummyContact,
              _args = arguments;
          return regeneratorRuntime.async(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  isDummyContact = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;

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


                  contactDetails.onClickToSMS();

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          });
        } : undefined
      };
    }
  }]);

  return ContactDetailsUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = ContactDetailsUI;
//# sourceMappingURL=index.js.map
