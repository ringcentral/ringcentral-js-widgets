"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _CallInfo = require("../CallInfo");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallInfoList = function CallInfoList(_ref) {
  var callInfos = _ref.callInfos;
  if (!callInfos || callInfos.length === 0) return null;
  return _react["default"].createElement("div", {
    "data-sign": "infoList",
    className: _styles["default"].infoList
  }, callInfos.map(function (_ref2, i) {
    var name = _ref2.name,
        content = _ref2.content;
    return _react["default"].createElement(_CallInfo.CallInfo, {
      key: i,
      name: name,
      content: content
    });
  }));
};

var _default = CallInfoList;
exports["default"] = _default;
//# sourceMappingURL=CallInfoList.js.map
