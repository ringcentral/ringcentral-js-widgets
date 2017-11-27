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

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      contacts = _ref$phone.contacts;

  return {
    currentLocale: locale.currentLocale,
    contactSourceNames: contacts.sourceNames || [],
    contactGroups: contacts.contactGroups || [],
    searchSource: contacts.sourceFilter,
    searchString: contacts.searchFilter,
    currentPage: contacts.pageNumber,
    showSpinner: !(locale.ready && contacts.ready)
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var _ref2$phone = _ref2.phone,
      routerInteraction = _ref2$phone.routerInteraction,
      contacts = _ref2$phone.contacts,
      onItemSelect = _ref2.onItemSelect,
      onVisitPage = _ref2.onVisitPage;

  return {
    getAvatarUrl: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
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

      return function getAvatarUrl() {
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

      return function getPresence(_x) {
        return _ref4.apply(this, arguments);
      };
    }(),
    onItemSelect: onItemSelect || function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref6) {
        var type = _ref6.type,
            id = _ref6.id;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                routerInteraction.push('/contacts/' + type + '/' + id);

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }));

      return function (_x2) {
        return _ref5.apply(this, arguments);
      };
    }(),
    onSearchContact: function onSearchContact(_ref7) {
      var searchSource = _ref7.searchSource,
          searchString = _ref7.searchString,
          pageNumber = _ref7.pageNumber;

      contacts.updateFilter({
        sourceFilter: searchSource,
        searchFilter: searchString,
        pageNumber: pageNumber
      });
    },
    onVisitPage: onVisitPage
  };
}

var ContactsPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ContactsView2.default));

exports.default = ContactsPage;
//# sourceMappingURL=index.js.map
