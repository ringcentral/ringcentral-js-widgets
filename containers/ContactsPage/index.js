"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _reactRedux = require("react-redux");

var _ContactsView = _interopRequireDefault(require("../../components/ContactsView"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
      routerInteraction = _ref2$phone.routerInteraction,
      contacts = _ref2$phone.contacts,
      onItemSelect = _ref2.onItemSelect,
      onVisitPage = _ref2.onVisitPage,
      onRefresh = _ref2.onRefresh;
  return {
    getAvatarUrl: function getAvatarUrl() {
      return null;
    },
    getPresence: function () {
      var _getPresence = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(contact) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", contacts.getPresence(contact));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getPresence(_x) {
        return _getPresence.apply(this, arguments);
      }

      return getPresence;
    }(),
    onItemSelect: onItemSelect ||
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref3) {
        var type, id;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                type = _ref3.type, id = _ref3.id;
                routerInteraction.push("/contacts/".concat(type, "/").concat(id));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }(),
    onSearchContact: function onSearchContact(_ref5) {
      var searchSource = _ref5.searchSource,
          searchString = _ref5.searchString;
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
