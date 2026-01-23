"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchLine = void 0;
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
var _components = require("@ringcentral-integration/next-widgets/components");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _excluded = ["disabled", "checked", "onChange", "children", "loading"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var SwitchLine = exports.SwitchLine = function SwitchLine(_ref) {
  var disabled = _ref.disabled,
    checked = _ref.checked,
    onChange = _ref.onChange,
    children = _ref.children,
    loading = _ref.loading,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_components.Line, _extends({
    endAdornment: loading ? /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center justify-center w-10"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.CircularProgressIndicator, {
      size: "medium"
    })) : /*#__PURE__*/_react["default"].createElement(_springUi.Switch, _extends({}, rest, {
      "data-sign": "switch",
      disabled: disabled,
      checked: checked,
      onChange: function (_onChange) {
        function onChange(_x) {
          return _onChange.apply(this, arguments);
        }
        onChange.toString = function () {
          return _onChange.toString();
        };
        return onChange;
      }(function (e) {
        return onChange === null || onChange === void 0 ? void 0 : onChange(e.target.checked);
      })
    }))
  }, rest), children);
};
//# sourceMappingURL=SwitchLine.js.map
