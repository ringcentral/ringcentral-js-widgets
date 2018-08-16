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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _withPhone = require('ringcentral-widgets/lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _GlipChatPanel = require('../../components/GlipChatPanel');

var _GlipChatPanel2 = _interopRequireDefault(_GlipChatPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAtRender(_ref) {
  var glipGroups = _ref.glipGroups,
      glipPersons = _ref.glipPersons,
      onViewPersonProfile = _ref.onViewPersonProfile,
      onViewGroup = _ref.onViewGroup;

  var AtRender = function AtRender(_ref2) {
    var id = _ref2.id,
        type = _ref2.type;

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
  };
  AtRender.propTypes = {
    id: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.string.isRequired
  };
  return AtRender;
}

function mapToProps(_, _ref3) {
  var params = _ref3.params,
      _ref3$phone = _ref3.phone,
      glipGroups = _ref3$phone.glipGroups,
      glipPosts = _ref3$phone.glipPosts;

  return {
    groupId: params.groupId,
    group: glipGroups.currentGroup,
    posts: glipGroups.currentGroupPosts,
    textValue: glipPosts.postInputs[params.groupId] && glipPosts.postInputs[params.groupId].text
  };
}

function mapToFunctions(_, _ref4) {
  var _ref4$phone = _ref4.phone,
      glipGroups = _ref4$phone.glipGroups,
      glipPosts = _ref4$phone.glipPosts,
      glipPersons = _ref4$phone.glipPersons,
      dateTimeFormat = _ref4$phone.dateTimeFormat,
      _ref4$dateTimeFormatt = _ref4.dateTimeFormatter,
      dateTimeFormatter = _ref4$dateTimeFormatt === undefined ? function (time) {
    return dateTimeFormat.formatDateTime({ utcTimestamp: time });
  } : _ref4$dateTimeFormatt,
      onViewPersonProfile = _ref4.onViewPersonProfile,
      onViewGroup = _ref4.onViewGroup,
      _ref4$mobile = _ref4.mobile,
      mobile = _ref4$mobile === undefined ? true : _ref4$mobile;

  return {
    mobile: mobile,
    loadGroup: function loadGroup(groupId) {
      glipGroups.updateCurrentGroupId(groupId);
    },
    loadNextPage: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
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
        return _ref5.apply(this, arguments);
      }

      return loadNextPage;
    }(),
    createPost: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
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
        return _ref6.apply(this, arguments);
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
    atRender: getAtRender({
      glipGroups: glipGroups,
      glipPersons: glipPersons,
      onViewPersonProfile: onViewPersonProfile,
      onViewGroup: onViewGroup
    }),
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
