"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _react = _interopRequireDefault(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _Header = require("../Header");

var _RecentActivityView = _interopRequireDefault(require("../RecentActivityView"));

var _expandable = _interopRequireDefault(require("./expandable"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  }, /*#__PURE__*/_react["default"].createElement(_Header.Header, {
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

var _default = (0, _expandable["default"])({
  styles: {
    height: '200px',
    offset: '27px'
  },
  className: _styles["default"].expandable
})(RecentActivityPanel);

exports["default"] = _default;
//# sourceMappingURL=index.js.map
