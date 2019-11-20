"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FollowInfo = function FollowInfo(_ref) {
  var infoList = _ref.infoList,
      splitSign = _ref.splitSign;
  if (!infoList || infoList.length === 0) return null;
  return _react["default"].createElement("div", {
    className: _styles["default"].followInfo
  }, infoList.filter(function (info) {
    return !!info;
  }).map(function (info, i) {
    return info && _react["default"].createElement(_react["default"].Fragment, {
      key: i
    }, _react["default"].createElement("span", {
      title: info,
      className: _styles["default"].followItem
    }, info), _react["default"].createElement("span", {
      className: _styles["default"].splitSign
    }, splitSign));
  }));
};

var _default = FollowInfo;
exports["default"] = _default;
//# sourceMappingURL=FollowInfo.js.map
