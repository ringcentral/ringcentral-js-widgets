"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChooseAccountPanel = void 0;

require("core-js/modules/es6.array.map");

var _juno = require("@ringcentral/juno");

var _react = _interopRequireDefault(require("react"));

var _CustomArrowButton = require("ringcentral-widgets/components/Rcui/CustomArrowButton");

var _EvLoginHeader = require("../EvLoginHeader");

var _SelectList = require("../SelectList");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ChooseAccountPanel = function ChooseAccountPanel(_ref) {
  var currentLocale = _ref.currentLocale,
      agents = _ref.agents,
      onAccountItemClick = _ref.onAccountItemClick;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_EvLoginHeader.EvLoginHeader, {
    wrapperStyle: _styles["default"].wrapperStyle,
    svgStyle: _styles["default"].svgStyle
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    variant: "caption2",
    className: _styles["default"].title
  }, _i18n["default"].getString('chooseAccount', currentLocale)), agents.map(function (agent) {
    return /*#__PURE__*/_react["default"].createElement(_SelectList.ListItem, {
      onClick: function onClick() {
        return onAccountItemClick(agent.agentId);
      },
      key: agent.agentId,
      className: _styles["default"].listItem
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
      variant: "body1",
      className: _styles["default"].accountName
    }, agent.accountName), /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
      variant: "caption1",
      className: _styles["default"].agentType
    }, _i18n["default"].getString(agent.agentType, currentLocale))), /*#__PURE__*/_react["default"].createElement(_CustomArrowButton.CustomArrowButton, null));
  }));
};

exports.ChooseAccountPanel = ChooseAccountPanel;
//# sourceMappingURL=ChooseAccountPanel.js.map
