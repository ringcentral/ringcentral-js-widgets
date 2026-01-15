"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListView = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _ListViewItem = require("./ListViewItem");
var _excluded = ["options", "nonShow", "startAdornment", "disabled"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var ListView = exports.ListView = function ListView(_ref) {
  var _ref$options = _ref.options,
    options = _ref$options === void 0 ? [] : _ref$options,
    nonShow = _ref.nonShow,
    startAdornment = _ref.startAdornment,
    disabled = _ref.disabled,
    props = _objectWithoutProperties(_ref, _excluded);
  if (nonShow && options.length === 0) {
    return nonShow;
  }
  return /*#__PURE__*/_react["default"].createElement(_juno.RcList, null, options.map(function (option, i) {
    return /*#__PURE__*/_react["default"].createElement(_ListViewItem.ListViewItem, _extends({
      key: i,
      index: i,
      option: option,
      startAdornment: startAdornment,
      disabled: disabled
    }, props));
  }));
};
ListView.defaultProps = {
  options: [],
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'ReactElemen... Remove this comment to see the full error message
  nonShow: null
};
//# sourceMappingURL=ListView.js.map
