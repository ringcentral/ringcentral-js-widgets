"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.StyledTab = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _juno = require("@ringcentral/juno");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n      border-bottom: 1px solid ", ";\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var tabColor = (0, _juno.palette2)('tab', 'selected');

var StyledTab = _juno.styled.div(_templateObject(), function (_ref) {
  var $active = _ref.$active;
  return $active && (0, _juno.css)(_templateObject2(), tabColor, tabColor);
});

exports.StyledTab = StyledTab;

var NavigationButton = function NavigationButton(_ref2) {
  var active = _ref2.active,
      icon = _ref2.icon,
      label = _ref2.label,
      noticeCounts = _ref2.noticeCounts,
      onClick = _ref2.onClick,
      width = _ref2.width,
      fullSizeInk = _ref2.fullSizeInk;
  var notice = null;

  if (noticeCounts && noticeCounts > 0) {
    if (noticeCounts > 99) {
      notice = /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "noticeCounts",
        className: _styles["default"].notices
      }, "99+");
    } else {
      notice = /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "noticeCounts",
        className: _styles["default"].notice
      }, noticeCounts);
    }
  }

  return /*#__PURE__*/_react["default"].createElement(StyledTab, {
    onClick: onClick,
    className: (0, _classnames["default"])(_styles["default"].navigationButton, active && _styles["default"].active, fullSizeInk ? null : _styles["default"].linearBorder),
    $active: active,
    style: {
      width: width
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].iconHolder,
    title: label,
    "data-sign": label
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].icon
  }, icon), notice));
};

NavigationButton.defaultProps = {
  active: false,
  label: undefined,
  noticeCounts: undefined,
  onClick: undefined,
  fullSizeInk: true
};
var _default = NavigationButton;
exports["default"] = _default;
//# sourceMappingURL=MessageTabButton.js.map
