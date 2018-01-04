'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reactRedux = require('react-redux');

var _formatNumber2 = require('ringcentral-integration/lib/formatNumber');

var _formatNumber3 = _interopRequireDefault(_formatNumber2);

var _ContactDetailsView = require('../../components/ContactDetailsView');

var _ContactDetailsView2 = _interopRequireDefault(_ContactDetailsView);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var params = _ref.params,
      _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      contacts = _ref$phone.contacts,
      contactDetails = _ref$phone.contactDetails,
      contactSearch = _ref$phone.contactSearch,
      rolesAndPermissions = _ref$phone.rolesAndPermissions;

  return {
    currentLocale: locale.currentLocale,
    contactItem: contactDetails.contact,
    showSpinner: !(locale.ready && contactSearch.ready && contactDetails.ready && rolesAndPermissions.ready),
    outboundSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.OutboundSMS),
    internalSmsPermission: !!(rolesAndPermissions.permissions && rolesAndPermissions.permissions.InternalSMS)
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var params = _ref2.params,
      _ref2$dialerRoute = _ref2.dialerRoute,
      dialerRoute = _ref2$dialerRoute === undefined ? '/dialer' : _ref2$dialerRoute,
      _ref2$composeTextRout = _ref2.composeTextRoute,
      composeTextRoute = _ref2$composeTextRout === undefined ? '/composeText' : _ref2$composeTextRout,
      _ref2$phone = _ref2.phone,
      routerInteraction = _ref2$phone.routerInteraction,
      contactDetails = _ref2$phone.contactDetails,
      regionSettings = _ref2$phone.regionSettings,
      call = _ref2$phone.call,
      dialerUI = _ref2$phone.dialerUI,
      composeText = _ref2$phone.composeText,
      contactSearch = _ref2$phone.contactSearch;

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
      return (0, _formatNumber3.default)({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      });
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
    onClickToDial: dialerUI ? function (recipient) {
      if (call.isIdle) {
        routerInteraction.push(dialerRoute);
        dialerUI.call({ recipient: recipient });
        contactDetails.onClickToCall();
      }
    } : undefined,
    onClickToSMS: composeText ? function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(contact) {
        var isDummyContact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (routerInteraction) {
                  routerInteraction.push(composeTextRoute);
                }
                // if contact autocomplete, if no match fill the number only
                if (contact.name && contact.phoneNumber && isDummyContact) {
                  composeText.updateTypingToNumber(contact.name);
                  contactSearch.search({ searchString: contact.name });
                } else {
                  composeText.addToNumber(contact);
                  if (composeText.typingToNumber === contact.phoneNumber) {
                    composeText.cleanTypingToNumber();
                  }
                }
                // for track
                contactDetails.onClickToSMS();

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }() : undefined
  };
}

var ContactDetailsPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ContactDetailsView2.default));

exports.default = ContactDetailsPage;
//# sourceMappingURL=index.js.map
