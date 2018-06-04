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
    getAvatarUrl: function getAvatarUrl() {
      return null;
    },
    getPresence: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(contact) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', contacts.getPresence(contact));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getPresence(_x) {
        return _ref3.apply(this, arguments);
      }

      return getPresence;
    }(),

    onItemSelect: onItemSelect || function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4) {
        var type = _ref4.type,
            id = _ref4.id;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                routerInteraction.push('/contacts/' + type + '/' + id);

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x2) {
        return _ref5.apply(this, arguments);
      };
    }(),
    onSearchContact: function onSearchContact(_ref6) {
      var searchSource = _ref6.searchSource,
          searchString = _ref6.searchString;

      contacts.updateFilter({
        sourceFilter: searchSource,
        searchFilter: searchString
      });
    },

    onVisitPage: onVisitPage
  };
}

var ContactsPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ContactsView2.default));

exports.default = ContactsPage;
//# sourceMappingURL=index.js.map
