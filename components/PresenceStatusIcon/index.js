"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PresenceStatusIcon = function PresenceStatusIcon(_ref) {
  var userStatus = _ref.userStatus,
    dndStatus = _ref.dndStatus,
    presenceStatus = _ref.presenceStatus,
    className = _ref.className;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].presence,
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    _styles["default"][presenceStatus || userStatus],
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    _styles["default"][dndStatus], className)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].presenceBar
  }));
};
PresenceStatusIcon.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  dndStatus: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  userStatus: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  presenceStatus: null
};
var _default = PresenceStatusIcon;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
