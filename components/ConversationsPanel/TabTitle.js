"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabTitle = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledTitle = _juno.styled.div(_templateObject(), function (_ref) {
  var $active = _ref.$active;
  return $active && (0, _juno.palette2)('tab', 'selected');
});
var TabTitle = function TabTitle(_ref2) {
  var type = _ref2.type,
    currentLocale = _ref2.currentLocale,
    active = _ref2.active;
  return (
    /*#__PURE__*/
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    _react["default"].createElement(StyledTitle, {
      $active: active,
      className: _styles["default"].tabTitle
    }, _i18n["default"].getString(type, currentLocale))
  );
};
exports.TabTitle = TabTitle;
//# sourceMappingURL=TabTitle.js.map
