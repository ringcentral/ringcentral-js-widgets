"use strict";

require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomArrowButton = void 0;
require("core-js/modules/es.object.assign.js");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
var CustomArrowButton = exports.CustomArrowButton = function CustomArrowButton(_ref) {
  var rest = Object.assign({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, _extends({
    "data-sign": "arrow_icon",
    color: "neutral.f03",
    variant: "plain"
  }, rest));
};
CustomArrowButton.defaultProps = {
  onClick: function onClick() {},
  symbol: _junoIcon.ArrowRight1,
  size: 'large'
};
//# sourceMappingURL=CustomArrowButton.js.map
