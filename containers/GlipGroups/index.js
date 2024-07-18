"use strict";

require("core-js/modules/es.array.map");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _reactRedux = require("react-redux");
var _withPhone = _interopRequireDefault(require("@ringcentral-integration/widgets/lib/withPhone"));
var _GlipGroupsPanel = _interopRequireDefault(require("../../components/GlipGroupsPanel"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
