'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reactRedux = require('react-redux');

var _ContactsView = require('../../components/ContactsView');

var _ContactsView2 = _interopRequireDefault(_ContactsView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var locale = _ref.locale,
      contactSearch = _ref.contactSearch;

  return {
    currentLocale: locale.currentLocale,
    contactSourceNames: contactSearch.contactSourceNames || [],
    contactGroups: contactSearch.contactGroups || [],
    searchSource: contactSearch.searchCriteria && contactSearch.searchCriteria.sourceName,
    searchText: contactSearch.searchCriteria && contactSearch.searchCriteria.searchText,
    currentPage: contactSearch.searchCriteria && contactSearch.searchCriteria.pageNumber,
    showSpinner: !(locale.ready && contactSearch.ready)
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var router = _ref2.router,
      contacts = _ref2.contacts,
      contactSearch = _ref2.contactSearch;

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
    onItemSelect: function onItemSelect(_ref5) {
      var id = _ref5.id;

      router.push('/contacts/' + id);
    },
    onSearchContact: function onSearchContact(_ref6) {
      var searchSource = _ref6.searchSource,
          searchText = _ref6.searchText,
          pageNumber = _ref6.pageNumber;

      contactSearch.searchPlus({
        sourceName: searchSource,
        searchText: searchText,
        pageNumber: pageNumber
      });
    }
  };
}

var ContactsPage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ContactsView2.default);

exports.default = ContactsPage;
//# sourceMappingURL=index.js.map
