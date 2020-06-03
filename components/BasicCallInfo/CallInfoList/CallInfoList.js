"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallInfoList = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _CallInfo = require("../CallInfo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallInfoList = function CallInfoList(_ref) {
  var callInfos = _ref.callInfos,
      className = _ref.className;
  if (!callInfos || callInfos.length === 0) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "infoList",
    className: className
  }, callInfos.map(function (_ref2, i) {
    var name = _ref2.name,
        content = _ref2.content;
    return /*#__PURE__*/_react["default"].createElement(_CallInfo.CallInfo, {
      key: i,
      name: name,
      content: content
    });
  }));
};

exports.CallInfoList = CallInfoList;
//# sourceMappingURL=CallInfoList.js.map
