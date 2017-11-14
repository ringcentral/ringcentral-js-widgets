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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var locale = _ref.locale,
      contactDetails = _ref.contactDetails,
      contactSearch = _ref.contactSearch;

  return {
    currentLocale: locale.currentLocale,
    contactItem: contactDetails.contact,
    showSpinner: !(locale.ready && contactSearch.ready && contactDetails.ready)
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var router = _ref2.router,
      contactDetails = _ref2.contactDetails,
      regionSettings = _ref2.regionSettings,
      params = _ref2.params,
      call = _ref2.call,
      composeText = _ref2.composeText,
      contactSearch = _ref2.contactSearch,
      _ref2$dialerRoute = _ref2.dialerRoute,
      dialerRoute = _ref2$dialerRoute === undefined ? '/dialer' : _ref2$dialerRoute,
      _ref2$composeTextRout = _ref2.composeTextRoute,
      composeTextRoute = _ref2$composeTextRout === undefined ? '/composeText' : _ref2$composeTextRout;

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
      router.goBack();
    },
    onClickToDial: call ? function (phoneNumber) {
      if (call.isIdle) {
        router.push(dialerRoute);
        call.onToNumberChange(phoneNumber);
        call.onCall();
      }
    } : undefined,
    onClickToSMS: composeText ? function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(contact) {
        var isDummyContact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (router) {
                  router.push(composeTextRoute);
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

              case 2:
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

var ContactDetailsPage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ContactDetailsView2.default);

exports.default = ContactDetailsPage;
//# sourceMappingURL=index.js.map
