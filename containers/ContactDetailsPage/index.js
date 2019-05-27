"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.find");

var _reactRedux = require("react-redux");

var _phoneNumber = require("@ringcentral-integration/phone-number");

var _formatNumber2 = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _ContactDetailsView = _interopRequireDefault(require("../../components/ContactDetailsView"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function mapToProps(_, _ref) {
  var params = _ref.params,
      _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      contactDetails = _ref$phone.contactDetails,
      contactSearch = _ref$phone.contactSearch,
      rolesAndPermissions = _ref$phone.rolesAndPermissions,
      auth = _ref$phone.auth,
      audioSettings = _ref$phone.audioSettings,
      webphone = _ref$phone.webphone,
      callingSettings = _ref$phone.callingSettings;
  return {
    currentLocale: locale.currentLocale,
    contactItem: contactDetails.contact,
    disableCallButton: auth.ready && audioSettings.ready && webphone && webphone.ready && auth.loggedIn && callingSettings.isWebphoneMode && (!audioSettings.userMedia || !webphone.connected),
    showSpinner: !(locale.ready && contactSearch.ready && contactDetails.ready && rolesAndPermissions.ready),
    outboundSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.OutboundSMS),
    internalSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.InternalSMS)
  };
}

function mapToFunctions(_, _ref2) {
  var params = _ref2.params,
      _ref2$dialerRoute = _ref2.dialerRoute,
      dialerRoute = _ref2$dialerRoute === void 0 ? '/dialer' : _ref2$dialerRoute,
      _ref2$composeTextRout = _ref2.composeTextRoute,
      composeTextRoute = _ref2$composeTextRout === void 0 ? '/composeText' : _ref2$composeTextRout,
      _ref2$phone = _ref2.phone,
      routerInteraction = _ref2$phone.routerInteraction,
      contactDetails = _ref2$phone.contactDetails,
      regionSettings = _ref2$phone.regionSettings,
      call = _ref2$phone.call,
      dialerUI = _ref2$phone.dialerUI,
      composeText = _ref2$phone.composeText,
      contactSearch = _ref2$phone.contactSearch,
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
      // if the cleaned phone number is not a E164 format, we will show it directly, doesn't format it.
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
    onClickToSMS: composeText ?
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(contact) {
        var isDummyContact,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
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
        }, _callee);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }() : undefined
  };
}

var ContactDetailsPage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ContactDetailsView["default"]));
var _default = ContactDetailsPage;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
