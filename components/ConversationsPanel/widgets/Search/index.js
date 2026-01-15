"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _NewComposeText = _interopRequireDefault(require("../../../../assets/images/NewComposeText.svg"));
var _NewComposeTextHover = _interopRequireDefault(require("../../../../assets/images/NewComposeTextHover.svg"));
var _SearchInput = require("../../../SearchInput");
var _i18n = _interopRequireDefault(require("../../i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Search = function Search(_ref) {
  var composeTextPermission = _ref.composeTextPermission,
    typeFilter = _ref.typeFilter,
    onSearchInputChange = _ref.onSearchInputChange,
    searchInput = _ref.searchInput,
    currentLocale = _ref.currentLocale,
    disableLinks = _ref.disableLinks,
    goToComposeText = _ref.goToComposeText,
    renderSearchTip = _ref.renderSearchTip;
  if (!onSearchInputChange) {
    return null;
  }
  var showTextIcon = composeTextPermission && (typeFilter === _messageTypes["default"].all || typeFilter === _messageTypes["default"].text);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].searchContainer, showTextIcon ? null : _styles["default"].withoutTextIcon)
  }, /*#__PURE__*/_react["default"].createElement(_SearchInput.SearchInput, {
    dataSign: "conversationSearch",
    className: _styles["default"].searchInput
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    ,
    value: searchInput,
    onChange: onSearchInputChange,
    placeholder: _i18n["default"].getString('search', currentLocale),
    disabled: disableLinks
  }), /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString('composeText', currentLocale),
    "data-sign": "ComposeText",
    className: _styles["default"].textIcon,
    onClick: goToComposeText
  }, /*#__PURE__*/_react["default"].createElement(_NewComposeTextHover["default"], {
    className: _styles["default"].hoverTextSVGIcon,
    width: 20,
    height: 21
  }), /*#__PURE__*/_react["default"].createElement(_NewComposeText["default"], {
    className: _styles["default"].textSVGIcon,
    width: 20,
    height: 21
  })), renderSearchTip && renderSearchTip());
};
Search.defaultProps = {
  composeTextPermission: true,
  typeFilter: _messageTypes["default"].all,
  onSearchInputChange: undefined,
  searchInput: '',
  disableLinks: false,
  renderSearchTip: undefined
};
var _default = exports["default"] = Search;
//# sourceMappingURL=index.js.map
