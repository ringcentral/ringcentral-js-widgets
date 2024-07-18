"use strict";

require("core-js/modules/es.array.includes");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockPanel = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _SpinnerOverlay = require("../SpinnerOverlay");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
var BlockPanel = function BlockPanel(_ref) {
  var block = _ref.block,
    rest = _objectWithoutProperties(_ref, ["block"]);
  if (!block) return null;
  var _block$classes = block.classes,
    classes = _block$classes === void 0 ? {} : _block$classes;
  return block && /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, _extends({
    classes: (0, _juno.combineProps)(classes, {
      container: _styles["default"].spinner
    }),
    custom: function custom() {
      return /*#__PURE__*/_react["default"].createElement(_juno.RcCircularProgress, {
        size: 40
      });
    }
  }, rest));
};
exports.BlockPanel = BlockPanel;
BlockPanel.defaultProps = {};
//# sourceMappingURL=BlockPanel.js.map
