"use strict";

require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChooseAccountPanel = void 0;
var _CustomArrowButton = require("@ringcentral-integration/widgets/components/Rcui/CustomArrowButton");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _EvLoginHeader = require("../EvLoginHeader");
var _SelectList = require("../SelectList");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  height: 56px;\n  width: 100%;\n  border-bottom: 1px solid ", ";\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  > div {\n    display: inline-block;\n  }\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin: ", ";\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledTitle = (0, _juno.styled)(_juno.RcTypography)(_templateObject(), (0, _juno.spacing)(2, 0, 8));
var ContentItem = _juno.styled.div(_templateObject2(), (0, _juno.palette2)('neutral', 'l02'));
var ChooseAccountPanel = function ChooseAccountPanel(_ref) {
  var currentLocale = _ref.currentLocale,
    agents = _ref.agents,
    onAccountItemClick = _ref.onAccountItemClick;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_EvLoginHeader.EvLoginHeader, {
    wrapperStyle: _styles["default"].wrapperStyle,
    svgStyle: _styles["default"].svgStyle
  }), /*#__PURE__*/_react["default"].createElement(StyledTitle, {
    align: "center",
    variant: "caption2",
    color: "neutral.f04"
  }, _i18n["default"].getString('chooseAccount', currentLocale)), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].lists
  }, agents.map(function (agent) {
    return /*#__PURE__*/_react["default"].createElement(_SelectList.ListItem, {
      onClick: function onClick() {
        return onAccountItemClick(agent.agentId);
      },
      key: agent.agentId,
      className: _styles["default"].listItem
    }, /*#__PURE__*/_react["default"].createElement(ContentItem, {
      "data-sign": "subAccount"
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
      variant: "body1",
      color: "neutral.f06"
    }, agent.accountName), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
      variant: "caption1",
      color: "neutral.f04"
    }, _i18n["default"].getString(agent.agentType, currentLocale))), /*#__PURE__*/_react["default"].createElement(_CustomArrowButton.CustomArrowButton, null)));
  })));
};
exports.ChooseAccountPanel = ChooseAccountPanel;
//# sourceMappingURL=ChooseAccountPanel.js.map
