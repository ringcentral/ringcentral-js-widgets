'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reactRedux = require('react-redux');

var _withPhone = require('ringcentral-widgets/lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _GlipGroupsPanel = require('../../components/GlipGroupsPanel');

var _GlipGroupsPanel2 = _interopRequireDefault(_GlipGroupsPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      glipGroups = _ref$phone.glipGroups,
      contacts = _ref$phone.contacts,
      _ref$hiddenCurrentGro = _ref.hiddenCurrentGroup,
      hiddenCurrentGroup = _ref$hiddenCurrentGro === undefined ? false : _ref$hiddenCurrentGro;

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
      glipGroups.updateFilter({ searchFilter: searchFilter });
    },
    onNextPage: function onNextPage(pageNumber) {
      glipGroups.updateFilter({ pageNumber: pageNumber });
    },
    updateContactSearchFilter: function updateContactSearchFilter(searchFilter) {
      contacts.updateFilter({ searchFilter: searchFilter });
    },
    createTeam: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
        var teamName = _ref3.teamName,
            selectedContacts = _ref3.selectedContacts;
        var groupId;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return glipGroups.createTeam(teamName, selectedContacts.map(function (sc) {
                  return sc.email;
                }));

              case 2:
                groupId = _context.sent;

                onSelectGroup(groupId);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createTeam(_x) {
        return _ref4.apply(this, arguments);
      }

      return createTeam;
    }()
  };
}

var GlipGroupsPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_GlipGroupsPanel2.default));

exports.default = GlipGroupsPage;
//# sourceMappingURL=index.js.map
