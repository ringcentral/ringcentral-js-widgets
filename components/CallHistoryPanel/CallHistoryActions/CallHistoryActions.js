"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallHistoryActions = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.to-string.js");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _ActionButton = require("./ActionButton");
var _MenuButton = require("./MenuButton");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CallHistoryActions = exports.CallHistoryActions = function CallHistoryActions(_ref) {
  var _ref$actionMenu = _ref.actionMenu,
    actionMenu = _ref$actionMenu === void 0 ? [] : _ref$actionMenu,
    _ref$isWide = _ref.isWide,
    isWide = _ref$isWide === void 0 ? true : _ref$isWide;
  // only show first 3 buttons
  var displayedButtons = actionMenu.slice(0, 3);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])([_styles["default"].actions, !isWide && _styles["default"].classic]),
    "data-sign": "callHistoryActions"
  }, displayedButtons.map(function (_ref2, index) {
    var icon = _ref2.icon,
      label = _ref2.label,
      disabled = _ref2.disabled,
      dataSign = _ref2.dataSign,
      action = _ref2.action,
      subMenu = _ref2.subMenu;
    if (action) {
      return /*#__PURE__*/_react["default"].createElement(_ActionButton.ActionButton, {
        icon: icon,
        label: label,
        disabled: disabled,
        action: action,
        key: index,
        dataSign: dataSign
      });
    }
    if (subMenu) {
      return /*#__PURE__*/_react["default"].createElement(_MenuButton.MenuButton, {
        icon: icon,
        label: label,
        disabled: disabled,
        subMenu: subMenu,
        key: index,
        dataSign: dataSign
      });
    }
    return null;
  }));
};
//# sourceMappingURL=CallHistoryActions.js.map
