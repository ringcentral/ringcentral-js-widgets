"use strict";

require("core-js/modules/es.array.index-of");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _juno = require("@ringcentral/juno");
var _useScrollIntoView = require("../../react-hooks/useScrollIntoView");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
var ListItem = function ListItem(_ref) {
  var selected = _ref.selected,
    onClick = _ref.onClick,
    children = _ref.children,
    className = _ref.className,
    rest = _objectWithoutProperties(_ref, ["selected", "onClick", "children", "className"]);
  var itemRef = (0, _useScrollIntoView.useScrollIntoView)(selected);
  return /*#__PURE__*/_react["default"].createElement(_juno.RcListItem, _extends({
    innerRef: itemRef,
    button: true,
    selected: selected,
    classes: {
      root: (0, _classnames["default"])(_styles["default"].listItem, className)
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
exports.ListItem = ListItem;
ListItem.defaultProps = {
  selected: false,
  onClick: function onClick() {}
};
//# sourceMappingURL=ListItem.js.map
