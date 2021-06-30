"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

var _reactRedux = require("react-redux");

var _withPhone = _interopRequireDefault(require("@ringcentral-integration/widgets/lib/withPhone"));

var _GlipGroupsPanel = _interopRequireDefault(require("../../components/GlipGroupsPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      glipGroups = _ref$phone.glipGroups,
      contactListUI = _ref$phone.contactListUI,
      _ref$hiddenCurrentGro = _ref.hiddenCurrentGroup,
      hiddenCurrentGroup = _ref$hiddenCurrentGro === void 0 ? false : _ref$hiddenCurrentGro;
  return {
    groups: glipGroups.groupsWithUnread,
    currentGroupId: hiddenCurrentGroup ? null : glipGroups.currentGroupId,
    searchFilter: glipGroups.searchFilter,
    currentPage: glipGroups.pageNumber,
    filteredContacts: contactListUI.filteredContacts,
    contactSearchFilter: contactListUI.searchFilter
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      glipGroups = _ref2$phone.glipGroups,
      contactListUI = _ref2$phone.contactListUI,
      onSelectGroup = _ref2.onSelectGroup;
  return {
    onSelectGroup: onSelectGroup,
    updateSearchFilter: function updateSearchFilter(searchFilter) {
      glipGroups.updateFilter({
        searchFilter: searchFilter
      });
    },
    onNextPage: function onNextPage(pageNumber) {
      glipGroups.updateFilter({
        pageNumber: pageNumber
      });
    },
    updateContactSearchFilter: function updateContactSearchFilter(searchFilter) {
      contactListUI.applyFilters({
        searchFilter: searchFilter
      });
    },
    createTeam: function createTeam(_ref3) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var teamName, selectedContacts, groupId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                teamName = _ref3.teamName, selectedContacts = _ref3.selectedContacts;
                _context.next = 3;
                return glipGroups.createTeam(teamName, selectedContacts.map(function (sc) {
                  return sc.email;
                }));

              case 3:
                groupId = _context.sent;
                onSelectGroup(groupId);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
}

var GlipGroupsPage = (0, _withPhone["default"])((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_GlipGroupsPanel["default"]));
var _default = GlipGroupsPage;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
