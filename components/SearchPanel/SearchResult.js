"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchResult = void 0;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.filter");

var _react = _interopRequireDefault(require("react"));

var _List = require("@ringcentral/juno/es6/components/List/List/List.js");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SearchResult = function SearchResult(_ref) {
  var options = _ref.options,
      filteredOptions = _ref.filteredOptions,
      filter = _ref.filter,
      currentLocale = _ref.currentLocale,
      renderListItem = _ref.renderListItem,
      classes = _ref.classes,
      tipWhenNoOptions = _ref.tipWhenNoOptions;

  var noResultMessage = _i18n["default"].getString('noResultFoundFor', currentLocale);

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, options.length ? /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.root,
    "data-sign": "searchResult"
  }, filteredOptions.length > 0 ? /*#__PURE__*/_react["default"].createElement(_List.RcList, null, filteredOptions.map(function (option, index) {
    return renderListItem({
      option: option,
      index: index
    });
  })) : /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.noResult
  }, "".concat(noResultMessage, " \"").concat(filter, "\""))) : tipWhenNoOptions || null);
};

exports.SearchResult = SearchResult;
SearchResult.defaultProps = {
  renderListItem: function renderListItem() {},
  classes: {},
  tipWhenNoOptions: ''
};
//# sourceMappingURL=SearchResult.js.map
