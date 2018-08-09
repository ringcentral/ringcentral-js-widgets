'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _withPhone = require('ringcentral-widgets/lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _GlipChatPanel = require('../../components/GlipChatPanel');

var _GlipChatPanel2 = _interopRequireDefault(_GlipChatPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var params = _ref.params,
      _ref$phone = _ref.phone,
      glipGroups = _ref$phone.glipGroups,
      glipPosts = _ref$phone.glipPosts;

  return {
    groupId: params.groupId,
    group: glipGroups.currentGroup,
    posts: glipGroups.currentGroupPosts,
    textValue: glipPosts.postInputs[params.groupId] && glipPosts.postInputs[params.groupId].text
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      glipGroups = _ref2$phone.glipGroups,
      glipPosts = _ref2$phone.glipPosts,
      glipPersons = _ref2$phone.glipPersons,
      dateTimeFormat = _ref2$phone.dateTimeFormat,
      _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
      dateTimeFormatter = _ref2$dateTimeFormatt === undefined ? function (time) {
    return dateTimeFormat.formatDateTime({ utcTimestamp: time });
  } : _ref2$dateTimeFormatt,
      onViewPersonProfile = _ref2.onViewPersonProfile,
      onViewGroup = _ref2.onViewGroup,
      _ref2$mobile = _ref2.mobile,
      mobile = _ref2$mobile === undefined ? true : _ref2$mobile;

  return {
    mobile: mobile,
    loadGroup: function loadGroup(groupId) {
      glipGroups.updateCurrentGroupId(groupId);
    },
    loadNextPage: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return glipPosts.loadNextPage(glipGroups.currentGroupId);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadNextPage() {
        return _ref3.apply(this, arguments);
      }

      return loadNextPage;
    }(),
    createPost: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return glipPosts.create({
                  groupId: glipGroups.currentGroupId
                });

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createPost() {
        return _ref4.apply(this, arguments);
      }

      return createPost;
    }(),
    updateText: function updateText(text, mentions) {
      glipPosts.updatePostInput({
        text: text,
        groupId: glipGroups.currentGroupId,
        mentions: mentions
      });
    },

    uploadFile: function uploadFile(fileName, rawFile) {
      return glipPosts.sendFile({
        fileName: fileName,
        rawFile: rawFile,
        groupId: glipGroups.currentGroupId
      });
    },
    atRender: function atRender(_ref5) {
      var id = _ref5.id,
          type = _ref5.type;

      var name = id;
      if (type === 'Team') {
        var group = glipGroups.allGroups.find(function (g) {
          return g.id === id;
        });
        name = group && group.name;
      } else {
        var person = glipPersons.personsMap[id];
        name = person && '' + person.firstName + (person.lastName ? ' ' + person.lastName : '') || id;
      }
      var onClickAtLink = function onClickAtLink(e) {
        e.preventDefault();
        if (type === 'Person') {
          onViewPersonProfile(id);
        } else if (type === 'Team') {
          onViewGroup(id);
        }
      };
      return _react2.default.createElement(
        'a',
        { href: '#' + id, onClick: onClickAtLink },
        '@',
        name
      );
    },
    viewProfile: function viewProfile(personId) {
      if (personId) {
        onViewPersonProfile(personId);
      }
    },

    dateTimeFormatter: dateTimeFormatter
  };
}

var GlipChatPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_GlipChatPanel2.default));

exports.default = GlipChatPage;
//# sourceMappingURL=index.js.map
