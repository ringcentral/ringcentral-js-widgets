"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.function.bind");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _bind = _interopRequireDefault(require("classnames/bind"));

var _Header = _interopRequireDefault(require("../Header"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _expandable = _interopRequireDefault(require("./expandable"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _RecentActivityView = _interopRequireDefault(require("../RecentActivityView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cx = _bind["default"].bind(_styles["default"]);

var ToggleIcon = function ToggleIcon(_ref) {
  var expanded = _ref.expanded;
  return _react["default"].createElement("i", {
    className: (0, _classnames["default"])(_DynamicsFont["default"].arrow, cx('arrowIcon', {
      foldArrowIcon: !expanded
    }))
  });
};

ToggleIcon.propTypes = {
  expanded: _propTypes["default"].bool.isRequired
};
/**
 * RecentActivityPanel component provides a animated slide-out panel.
 */

function RecentActivityPanel(props) {
  var title = props.title,
      expanded = props.expanded,
      onPanelToggle = props.onPanelToggle;
  var toggleButton = {
    label: _react["default"].createElement(ToggleIcon, {
      expanded: expanded
    }),
    onClick: onPanelToggle,
    placement: 'right'
  };

  if (!props.currentContact) {
    return null;
  }

  var containerClass = (0, _classnames["default"])(_styles["default"].container, props.className);
  return _react["default"].createElement("div", {
    className: containerClass
  }, _react["default"].createElement("div", {
    className: _styles["default"].header,
    onClick: onPanelToggle
  }, _react["default"].createElement(_Header["default"], {
    buttons: [toggleButton],
    className: _styles["default"].header
  }, title)), _react["default"].createElement(_RecentActivityView["default"], props));
}

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
