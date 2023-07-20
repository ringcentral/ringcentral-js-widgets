"use strict";

require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.assign");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithScrollCheck = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var WithScrollCheck = function WithScrollCheck(SelectList) {
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
exports.WithScrollCheck = WithScrollCheck;
//# sourceMappingURL=WithScrollCheck.js.map
