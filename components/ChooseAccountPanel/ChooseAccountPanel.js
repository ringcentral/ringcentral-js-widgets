"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChooseAccountPanel = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _CustomArrowButton = require("@ringcentral-integration/widgets/components/Rcui/CustomArrowButton");

var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");

var _Typography = require("@ringcentral/juno/es6/components/Typography/Typography.js");

var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");

var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));

var _EvLoginHeader = require("../EvLoginHeader");

var _SelectList = require("../SelectList");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledTitle = (0, _styledComponents["default"])(_Typography.RcTypography)(_templateObject(), (0, _spacing.spacing)(2, 0, 8));

var ContentItem = _styledComponents["default"].div(_templateObject2(), (0, _newPalette.palette2)('neutral', 'l02'));

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
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_Typography.RcTypography, {
      variant: "body1",
      color: "neutral.f06"
    }, agent.accountName), /*#__PURE__*/_react["default"].createElement(_Typography.RcTypography, {
      variant: "caption1",
      color: "neutral.f04"
    }, _i18n["default"].getString(agent.agentType, currentLocale))), /*#__PURE__*/_react["default"].createElement(_CustomArrowButton.CustomArrowButton, null)));
  })));
};

exports.ChooseAccountPanel = ChooseAccountPanel;
//# sourceMappingURL=ChooseAccountPanel.js.map
