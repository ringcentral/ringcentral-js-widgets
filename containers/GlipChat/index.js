"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.find");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _withPhone = _interopRequireDefault(require("ringcentral-widgets/lib/withPhone"));

var _GlipChatPanel = _interopRequireDefault(require("../../components/GlipChatPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
      name = person && "".concat(person.firstName).concat(person.lastName ? " ".concat(person.lastName) : '') || id;
    }

    var onClickAtLink = function onClickAtLink(e) {
      e.preventDefault();

      if (type === 'Person') {
        onViewPersonProfile(id);
      } else if (type === 'Team') {
        onViewGroup(id);
      }
    };

    return _react["default"].createElement("a", {
      href: "#".concat(id),
      onClick: onClickAtLink
    }, "@", name);
  };

  AtRender.propTypes = {
    id: _propTypes["default"].string.isRequired,
    type: _propTypes["default"].string.isRequired
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
      dateTimeFormatter = _ref4$dateTimeFormatt === void 0 ? function (time) {
    return dateTimeFormat.formatDateTime({
      utcTimestamp: time
    });
  } : _ref4$dateTimeFormatt,
      onViewPersonProfile = _ref4.onViewPersonProfile,
      onViewGroup = _ref4.onViewGroup,
      _ref4$mobile = _ref4.mobile,
      mobile = _ref4$mobile === void 0 ? true : _ref4$mobile;
  return {
    mobile: mobile,
    loadGroup: function loadGroup(groupId) {
      glipGroups.updateCurrentGroupId(groupId);
    },
    loadNextPage: function loadNextPage() {
      return regeneratorRuntime.async(function loadNextPage$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(glipPosts.loadNextPage(glipGroups.currentGroupId));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    createPost: function createPost() {
      return regeneratorRuntime.async(function createPost$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(glipPosts.create({
                groupId: glipGroups.currentGroupId
              }));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
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

var GlipChatPage = (0, _withPhone["default"])((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_GlipChatPanel["default"]));
var _default = GlipChatPage;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
