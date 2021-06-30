"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackHeader = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _BackHeaderV = _interopRequireDefault(require("@ringcentral-integration/widgets/components/BackHeaderV2"));

var _styles = _interopRequireDefault(require("../styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var BackHeader = function BackHeader(props) {
  return /*#__PURE__*/_react["default"].createElement(_BackHeaderV["default"], _extends({}, props, {
    rightIcon: /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].fillRight
    }),
    className: _styles["default"].backHeader
  }));
};

exports.BackHeader = BackHeader;
//# sourceMappingURL=BackHeader.js.map
