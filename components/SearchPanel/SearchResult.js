"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchResult = void 0;
var _react = _interopRequireDefault(require("react"));
var _utils = require("@ringcentral-integration/utils");
var _juno = require("@ringcentral/juno");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SearchResult = function SearchResult(_ref) {
  var _ref$renderListItem = _ref.renderListItem,
    renderListItem = _ref$renderListItem === void 0 ? _utils.emptyFn : _ref$renderListItem,
    _ref$classes = _ref.classes,
    classes = _ref$classes === void 0 ? {} : _ref$classes,
    _ref$tipWhenNoOptions = _ref.tipWhenNoOptions,
    tipWhenNoOptions = _ref$tipWhenNoOptions === void 0 ? '' : _ref$tipWhenNoOptions,
    options = _ref.options,
    filteredOptions = _ref.filteredOptions,
    filter = _ref.filter,
    currentLocale = _ref.currentLocale;
  var noResultMessage = _i18n["default"].getString('noResultFoundFor', currentLocale);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, options.length ? /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.root,
    "data-sign": "searchResult"
  }, filteredOptions.length > 0 ? /*#__PURE__*/_react["default"].createElement(_juno.RcList, null, filteredOptions.map(function (option, index) {
    return renderListItem({
      option: option,
      index: index
    });
  })) : /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.noResult
  }, "".concat(noResultMessage, " \"").concat(filter, "\""))) : tipWhenNoOptions || null);
};
exports.SearchResult = SearchResult;
//# sourceMappingURL=SearchResult.js.map
