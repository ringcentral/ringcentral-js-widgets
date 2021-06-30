"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Search;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));

var _SearchInput = require("../../../SearchInput");

var _NewComposeText = _interopRequireDefault(require("../../../../assets/images/NewComposeText.svg"));

var _NewComposeTextHover = _interopRequireDefault(require("../../../../assets/images/NewComposeTextHover.svg"));

var _i18n = _interopRequireDefault(require("../../i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Search(_ref) {
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
    className: (0, _classnames["default"])(_styles["default"].searchContainer, showTextIcon ? null : _styles["default"].withoutTextIcon)
  }, /*#__PURE__*/_react["default"].createElement(_SearchInput.SearchInput, {
    className: _styles["default"].searchInput,
    value: searchInput,
    onChange: onSearchInputChange,
    placeholder: _i18n["default"].getString('search', currentLocale),
    disabled: disableLinks
  }), /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString('composeText', currentLocale),
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
}

Search.propTypes = {
  composeTextPermission: _propTypes["default"].bool,
  typeFilter: _propTypes["default"].string,
  onSearchInputChange: _propTypes["default"].func,
  searchInput: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired,
  disableLinks: _propTypes["default"].bool,
  goToComposeText: _propTypes["default"].func.isRequired,
  renderSearchTip: _propTypes["default"].func
};
Search.defaultProps = {
  composeTextPermission: true,
  typeFilter: _messageTypes["default"].all,
  onSearchInputChange: undefined,
  searchInput: '',
  disableLinks: false,
  renderSearchTip: undefined
};
//# sourceMappingURL=index.js.map
