'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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
    searchString: contactSearch.searchCriteria && contactSearch.searchCriteria.searchString,
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
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', null);

              case 1:
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
    onItemSelect: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref6) {
        var type = _ref6.type,
            id = _ref6.id;
        var searchSource, isInsure, searchCriteria, currentSearchCriteria;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                searchSource = contacts[type + 'Contacts'] || [];
                isInsure = searchSource.map(function (_ref7) {
                  var id = _ref7.id;
                  return id.toString();
                }).includes(id);

                if (isInsure) {
                  _context3.next = 13;
                  break;
                }

                searchCriteria = JSON.parse((0, _stringify2.default)(contactSearch.state.searchCriteria));
                _context3.next = 6;
                return contacts.showAlert();

              case 6:
                currentSearchCriteria = contactSearch.state.searchCriteria;
                _context3.next = 9;
                return contactSearch.searchPlus((0, _extends3.default)({}, currentSearchCriteria, { searchString: undefined }));

              case 9:
                _context3.next = 11;
                return contactSearch.searchPlus(searchCriteria);

              case 11:
                _context3.next = 14;
                break;

              case 13:
                router.push('/contacts/' + type + '/' + id);

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }));

      return function onItemSelect(_x3) {
        return _ref5.apply(this, arguments);
      };
    }(),
    // onRestSearch: () => {
    //   contactSearch.resetSearchStatus();
    // },
    onSearchContact: function onSearchContact(_ref8) {
      var searchSource = _ref8.searchSource,
          searchString = _ref8.searchString,
          pageNumber = _ref8.pageNumber;

      contactSearch.searchPlus({
        sourceName: searchSource,
        searchString: searchString,
        pageNumber: pageNumber
      });
    }
  };
}

var ContactsPage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ContactsView2.default);

exports.default = ContactsPage;
//# sourceMappingURL=index.js.map
