"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileName = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _TextMiddleEllipsis = require("./TextMiddleEllipsis");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  ", "\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var StyledTextMiddleEllipsis = (0, _juno.styled)(_TextMiddleEllipsis.TextMiddleEllipsis)(_templateObject(), (0, _juno.palette2)('neutral', 'f06'), (0, _juno.typography)('body1'));
var FileName = function FileName(_ref) {
  var fileName = _ref.fileName;
  return /*#__PURE__*/_react["default"].createElement(StyledTextMiddleEllipsis, null, fileName);
};
exports.FileName = FileName;
//# sourceMappingURL=FileName.js.map
