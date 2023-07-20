"use strict";

require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.map");
require("core-js/modules/es.object.keys");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListView = void 0;
var _react = _interopRequireDefault(require("react"));
var _juno = require("@ringcentral/juno");
var _ListViewItem = require("./ListViewItem");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var ListView = function ListView(_ref) {
  var _ref$options = _ref.options,
    options = _ref$options === void 0 ? [] : _ref$options,
    nonShow = _ref.nonShow,
    startAdornment = _ref.startAdornment,
    disabled = _ref.disabled,
    props = _objectWithoutProperties(_ref, ["options", "nonShow", "startAdornment", "disabled"]);
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
exports.ListView = ListView;
ListView.defaultProps = {
  options: [],
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'ReactElemen... Remove this comment to see the full error message
  nonShow: null
};
//# sourceMappingURL=ListView.js.map
