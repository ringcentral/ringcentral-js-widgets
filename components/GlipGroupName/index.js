"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = GlipGroupName;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function GlipGroupName(_ref) {
  var group = _ref.group,
      showNumber = _ref.showNumber;
  var name = group.name;

  if (!name && group.detailMembers) {
    var noMes = group.detailMembers.filter(function (m) {
      return !m.isMe;
    });

    if (noMes.length === 0) {
      noMes = group.detailMembers;
    }

    var names = noMes.map(function (p) {
      return "".concat(p.firstName ? p.firstName : '', " ").concat(p.lastName ? p.lastName : '');
    });
    name = names.join(', ');
  }

  var number;

  if (showNumber && group.members && group.members.length > 2) {
    number = " (".concat(group.members.length, ")");
  }

  return _react["default"].createElement("span", null, name, number);
}

GlipGroupName.propTypes = {
  group: _propTypes["default"].object.isRequired,
  showNumber: _propTypes["default"].bool
};
GlipGroupName.defaultProps = {
  showNumber: false
};
//# sourceMappingURL=index.js.map
