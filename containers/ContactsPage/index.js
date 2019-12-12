"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _reactRedux = require("react-redux");

var _ContactsView = _interopRequireDefault(require("../../components/ContactsView"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var _ref2$phone = _ref2.phone,
      contacts = _ref2$phone.contacts,
      contactDetailsUI = _ref2$phone.contactDetailsUI,
      onItemSelect = _ref2.onItemSelect,
      onVisitPage = _ref2.onVisitPage,
      onRefresh = _ref2.onRefresh;
  return {
    getAvatarUrl: function getAvatarUrl() {
      return null;
    },
    getPresence: function getPresence(contact) {
      return regeneratorRuntime.async(function getPresence$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", contacts.getPresence(contact));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    onItemSelect: onItemSelect || function _callee(_ref3) {
      var type, id;
      return regeneratorRuntime.async(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              type = _ref3.type, id = _ref3.id;

              if (contactDetailsUI) {
                contactDetailsUI.showContactDetails({
                  type: type,
                  id: id
                });
              }

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    onSearchContact: function onSearchContact(_ref4) {
      var searchSource = _ref4.searchSource,
          searchString = _ref4.searchString;
      contacts.updateFilter({
        sourceFilter: searchSource,
        searchFilter: searchString
      });
    },
    onVisitPage: onVisitPage,
    onRefresh: onRefresh
  };
}

var ContactsPage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_ContactsView["default"]));
var _default = ContactsPage;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
