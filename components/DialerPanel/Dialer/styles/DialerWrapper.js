"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextFieldWrapper = exports.DialerWrapper = void 0;
var _juno = require("@ringcentral/juno");
var _scss = require("../../../../scss");
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  width: 100%;\n  margin-top: 6px;\n  margin-bottom: 25px;\n\n  ", " {\n    padding-left: ", ";\n    ", ";\n    border-bottom: 1px solid ", ";\n\n    input {\n      margin: 7px 0 !important;\n      text-align: center;\n      font-size: 17px;\n\n      [sf-classic] & {\n        margin: 5px 0 !important;\n      }\n    }\n  }\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  flex: 1 1 auto;\n  margin-top: 100px;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var DialerWrapper = _juno.styled.div(_templateObject());
exports.DialerWrapper = DialerWrapper;
var TextFieldWrapper = _juno.styled.div(_templateObject2(), _juno.RcDialTextField, function (_ref) {
  var isHaveValue = _ref.isHaveValue;
  return isHaveValue && (0, _juno.spacing)(9);
}, (0, _scss.pageSpace)('margin'), (0, _juno.palette2)('neutral', 'l03'));
exports.TextFieldWrapper = TextFieldWrapper;
//# sourceMappingURL=DialerWrapper.js.map
