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
var _clsx2 = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _Header = require("../Header");
var _RecentActivityView = _interopRequireDefault(require("../RecentActivityView"));
var _expandable = _interopRequireDefault(require("./expandable"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ToggleIcon = function ToggleIcon(_ref) {
  var expanded = _ref.expanded;
  return /*#__PURE__*/_react["default"].createElement("i", {
    className: (0, _clsx2["default"])(_DynamicsFont["default"].arrow, (0, _clsx2["default"])(_styles["default"].arrowIcon, _defineProperty({}, _styles["default"].foldArrowIcon, !expanded)))
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
  var containerClass = (0, _clsx2["default"])(_styles["default"].container, props.className);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: containerClass,
    "data-sign": "recentActivityPanel"
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
