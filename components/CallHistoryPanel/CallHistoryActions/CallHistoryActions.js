"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryActions = void 0;

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ActionButton = require("./ActionButton");

var _MenuButton = require("./MenuButton");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallHistoryActions = function CallHistoryActions(_ref) {
  var _ref$actionMenu = _ref.actionMenu,
      actionMenu = _ref$actionMenu === void 0 ? [] : _ref$actionMenu,
      _ref$isWide = _ref.isWide,
      isWide = _ref$isWide === void 0 ? true : _ref$isWide;
  // only show first 3 buttons
  var displayedButtons = actionMenu.slice(0, 3);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])([_styles["default"].actions, !isWide && _styles["default"].classic])
  }, displayedButtons.map(function (_ref2, index) {
    var icon = _ref2.icon,
        label = _ref2.label,
        disabled = _ref2.disabled,
        action = _ref2.action,
        subMenu = _ref2.subMenu;

    if (action) {
      return /*#__PURE__*/_react["default"].createElement(_ActionButton.ActionButton, {
        icon: icon,
        label: label,
        disabled: disabled,
        action: action,
        key: index
      });
    }

    if (subMenu) {
      return /*#__PURE__*/_react["default"].createElement(_MenuButton.MenuButton, {
        icon: icon,
        label: label,
        disabled: disabled,
        subMenu: subMenu,
        key: index
      });
    }

    return null;
  }));
};

exports.CallHistoryActions = CallHistoryActions;
//# sourceMappingURL=CallHistoryActions.js.map
