'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GlipGroupName;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      return (p.firstName ? p.firstName : '') + ' ' + (p.lastName ? p.lastName : '');
    });
    name = names.join(', ');
  }
  var number = void 0;
  if (showNumber && group.members && group.members.length > 2) {
    number = ' (' + group.members.length + ')';
  }
  return _react2.default.createElement(
    'span',
    null,
    name,
    number
  );
}

GlipGroupName.propTypes = {
  group: _propTypes2.default.object.isRequired,
  showNumber: _propTypes2.default.bool
};

GlipGroupName.defaultProps = {
  showNumber: false
};
//# sourceMappingURL=index.js.map
