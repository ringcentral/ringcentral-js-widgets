"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItem = void 0;
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _useScrollIntoView = require("../../react-hooks/useScrollIntoView");
var _styles = _interopRequireDefault(require("./styles.scss"));
var _excluded = ["selected", "onClick", "children", "className"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/**
 * if you want to make that can be auto scroll, should add `SelectListContext` and pass scrollElmRef into.
 * example:
 * ```tsx
 *  const scrollElmRef = useRef();
 *
 *  return (
 *    <SelectListContext.Provider value={{ scrollElmRef }}>.
 *      ..
 *    </SelectListContext.Provider>
 *  );
 * ```
 */
var ListItem = exports.ListItem = function ListItem(_ref) {
  var selected = _ref.selected,
    onClick = _ref.onClick,
    children = _ref.children,
    className = _ref.className,
    rest = _objectWithoutProperties(_ref, _excluded);
  var itemRef = (0, _useScrollIntoView.useScrollIntoView)(selected);
  return /*#__PURE__*/_react["default"].createElement(_juno.RcListItem, _extends({
    innerRef: itemRef,
    button: true,
    selected: selected,
    classes: {
      root: (0, _clsx["default"])(_styles["default"].listItem, className)
    },
    onClick: function (_onClick) {
      function onClick(_x) {
        return _onClick.apply(this, arguments);
      }
      onClick.toString = function () {
        return _onClick.toString();
      };
      return onClick;
    }(function (e) {
      e.preventDefault();
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      onClick();
    })
  }, rest), children);
};
ListItem.defaultProps = {
  selected: false,
  onClick: function onClick() {}
};
//# sourceMappingURL=ListItem.js.map
