"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

var _reactRedux = require("react-redux");

var _withPhone = _interopRequireDefault(require("ringcentral-widgets/lib/withPhone"));

var _GlipGroupsPanel = _interopRequireDefault(require("../../components/GlipGroupsPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      glipGroups = _ref$phone.glipGroups,
      contacts = _ref$phone.contacts,
      _ref$hiddenCurrentGro = _ref.hiddenCurrentGroup,
      hiddenCurrentGroup = _ref$hiddenCurrentGro === void 0 ? false : _ref$hiddenCurrentGro;
  return {
    groups: glipGroups.groupsWithUnread,
    currentGroupId: hiddenCurrentGroup ? null : glipGroups.currentGroupId,
    searchFilter: glipGroups.searchFilter,
    currentPage: glipGroups.pageNumber,
    filteredContacts: contacts.filteredContacts,
    contactSearchFilter: contacts.searchFilter
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      glipGroups = _ref2$phone.glipGroups,
      contacts = _ref2$phone.contacts,
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
      contacts.updateFilter({
        searchFilter: searchFilter
      });
    },
    createTeam: function createTeam(_ref3) {
      var teamName, selectedContacts, groupId;
      return regeneratorRuntime.async(function createTeam$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              teamName = _ref3.teamName, selectedContacts = _ref3.selectedContacts;
              _context.next = 3;
              return regeneratorRuntime.awrap(glipGroups.createTeam(teamName, selectedContacts.map(function (sc) {
                return sc.email;
              })));

            case 3:
              groupId = _context.sent;
              onSelectGroup(groupId);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  };
}

var GlipGroupsPage = (0, _withPhone["default"])((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_GlipGroupsPanel["default"]));
var _default = GlipGroupsPage;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
