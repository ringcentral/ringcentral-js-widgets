"use strict";

require("core-js/modules/es.array.index-of");
require("core-js/modules/es.object.keys");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectList = void 0;
var _react = _interopRequireDefault(require("react"));
var _SelectListV = require("@ringcentral-integration/widgets/components/SelectListV2");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var SelectList = function SelectList(_ref) {
  var children = _ref.children,
    rest = _objectWithoutProperties(_ref, ["children"]);
  return /*#__PURE__*/_react["default"].createElement(_SelectListV.SelectListV2, _extends({
    classes: {
      backHeader: _styles["default"].backHeader,
      search: {
        searchInput: _styles["default"].searchInput,
        searchResult: {
          noResult: _styles["default"].noResult
        },
        placeholder: _styles["default"].placeholder
      }
    },
    rightIcon: /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].fillRight
    })
  }, rest), children);
};
exports.SelectList = SelectList;
//# sourceMappingURL=SelectList.js.map
