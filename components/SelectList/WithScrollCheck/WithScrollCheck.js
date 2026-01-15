"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithScrollCheck = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var WithScrollCheck = exports.WithScrollCheck = function WithScrollCheck(SelectList) {
  var scrollCheck = function scrollCheck(scrollElmRef, matchElmRef, elm, type) {
    var scrollElm = scrollElmRef.current;
    var matchElm = matchElmRef.current;
    if (scrollElm && scrollElm.scrollHeight > scrollElm.clientHeight) {
      scrollElm.scrollTop = type === 'other' ? elm.offsetTop + matchElm.offsetHeight : elm.offsetTop;
    }
  };
  return function (props) {
    return /*#__PURE__*/_react["default"].createElement(SelectList, _extends({
      scrollCheck: scrollCheck
    }, props));
  };
};
//# sourceMappingURL=WithScrollCheck.js.map
