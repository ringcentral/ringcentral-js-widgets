'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reactRedux = require('react-redux');

var _ContactDetailsView = require('../../components/ContactDetailsView');

var _ContactDetailsView2 = _interopRequireDefault(_ContactDetailsView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var params = _ref.params,
      locale = _ref.locale,
      contacts = _ref.contacts;

  return {
    currentLocale: locale.currentLocale,
    contactItem: contacts.findContactItem({
      contactType: null,
      contactId: params.contactId
    }),
    showSpinner: !(locale.ready && contacts.ready)
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var router = _ref2.router,
      contacts = _ref2.contacts;

  return {
    getAvatarUrl: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(contact) {
        var avatarUrl;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return contacts.getImageProfile(contact);

              case 2:
                avatarUrl = _context.sent;
                return _context.abrupt('return', avatarUrl);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function getAvatarUrl(_x) {
        return _ref3.apply(this, arguments);
      };
    }(),
    getPresence: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(contact) {
        var presence;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return contacts.getPresence(contact);

              case 2:
                presence = _context2.sent;
                return _context2.abrupt('return', presence);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function getPresence(_x2) {
        return _ref4.apply(this, arguments);
      };
    }(),
    onBackClick: function onBackClick() {
      router.goBack();
    },
    onClickToSMS: function onClickToSMS(_ref5) {
      var options = (0, _objectWithoutProperties3.default)(_ref5, []);
    },
    onClickToDial: function onClickToDial(_ref6) {
      var options = (0, _objectWithoutProperties3.default)(_ref6, []);
    },
    onClickToGmail: function onClickToGmail(_ref7) {
      var options = (0, _objectWithoutProperties3.default)(_ref7, []);
    }
  };
}

var ContactDetailsPage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ContactDetailsView2.default);

exports.default = ContactDetailsPage;
//# sourceMappingURL=index.js.map
