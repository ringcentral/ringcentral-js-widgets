"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames2 = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _Header = require("../Header");
var _RecentActivityView = _interopRequireDefault(require("../RecentActivityView"));
var _expandable = _interopRequireDefault(require("./expandable"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ToggleIcon = function ToggleIcon(_ref) {
  var expanded = _ref.expanded;
  return /*#__PURE__*/_react["default"].createElement("i", {
    className: (0, _classnames2["default"])(_DynamicsFont["default"].arrow, (0, _classnames2["default"])(_styles["default"].arrowIcon, _defineProperty({}, _styles["default"].foldArrowIcon, !expanded)))
  });
};
ToggleIcon.propTypes = {
  expanded: _propTypes["default"].bool.isRequired
};

/**
 * RecentActivityPanel component provides a animated slide-out panel.
 */
var RecentActivityPanel = function RecentActivityPanel(props) {
  var title = props.title,
    expanded = props.expanded,
    onPanelToggle = props.onPanelToggle;
  var toggleButton = {
    label: /*#__PURE__*/_react["default"].createElement(ToggleIcon, {
      expanded: expanded
    }),
    onClick: onPanelToggle,
    placement: 'right'
  };
  if (!props.currentContact) {
    return null;
  }
  var containerClass = (0, _classnames2["default"])(_styles["default"].container, props.className);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: containerClass
  }, /*#__PURE__*/_react["default"].createElement(_Header.Header
  // @ts-expect-error TS(2322): Type '{ label: JSX.Element; onClick: any; placemen... Remove this comment to see the full error message
  , {
    buttons: [toggleButton],
    className: _styles["default"].header,
    onClick: onPanelToggle
  }, title), /*#__PURE__*/_react["default"].createElement(_RecentActivityView["default"], props));
};
RecentActivityPanel.propTypes = {
  title: _propTypes["default"].string.isRequired,
  currentContact: _propTypes["default"].object,
  onPanelToggle: _propTypes["default"].func.isRequired,
  expanded: _propTypes["default"].bool.isRequired,
  className: _propTypes["default"].string
};
RecentActivityPanel.defaultProps = {
  currentContact: null,
  className: null
};
var ExpandableRecentActivityPanel = (0, _expandable["default"])({
  styles: {
    height: '200px',
    offset: '27px'
  },
  className: _styles["default"].expandable
})(RecentActivityPanel);
var _default = ExpandableRecentActivityPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
