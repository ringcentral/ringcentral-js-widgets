"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterAndSearchHint = void 0;
var _components = require("@ringcentral-integration/next-widgets/components");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _i18n = require("./i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var lineStyle = 'flex gap-3 items-center w-full py-3.5 px-4';
var FilterAndSearchHint = exports.FilterAndSearchHint = function FilterAndSearchHint(_ref) {
  var searchValue = _ref.searchValue,
    onClickHandler = _ref.onClickHandler,
    errorHint = _ref.errorHint,
    _ref$enableSearch = _ref.enableSearch,
    enableSearch = _ref$enableSearch === void 0 ? true : _ref$enableSearch,
    _ref$searchLimitLengt = _ref.searchLimitLength,
    searchLimitLength = _ref$searchLimitLengt === void 0 ? 3 : _ref$searchLimitLengt;
  if (!enableSearch) {
    return null;
  }
  var searchAble = searchValue && searchValue.length >= searchLimitLength;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, searchAble ? /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return onClickHandler();
    },
    "data-sign": "reference-search-hint",
    className: lineStyle
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
    symbol: _springIcon.SearchMd,
    size: "small"
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    className: "typography-descriptor text-neutral-b0 break-words ",
    "data-sign": "title"
  }, /*#__PURE__*/_react["default"].createElement(_components.FormattedMessage, {
    message: (0, _i18n.t)('meetSearchTips'),
    values: {
      searchValue: /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
        className: "font-bold"
      }, searchValue)
    }
  }))) : /*#__PURE__*/_react["default"].createElement("div", {
    className: lineStyle,
    "data-sign": "reference-search-hint"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    className: "typography-descriptor text-neutral-b2",
    "data-sign": "title"
  }, (0, _i18n.t)('unmeetSearchTips', {
    searchLimitLength: searchLimitLength
  }))), errorHint ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-4 pb-2"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    className: "typography-descriptor text-danger break-words",
    "data-sign": "title"
  }, errorHint)) : null, /*#__PURE__*/_react["default"].createElement(_springUi.Divider, null));
};
//# sourceMappingURL=FilterAndSearchHint.js.map
