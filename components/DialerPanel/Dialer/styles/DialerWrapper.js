"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextFieldWrapper = exports.DialerWrapper = void 0;
var _juno = require("@ringcentral/juno");
var _scss = require("../../../../scss");
var _templateObject, _templateObject2;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var DialerWrapper = exports.DialerWrapper = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  flex: 1 1 auto;\n  margin-top: 100px;\n"])));
var TextFieldWrapper = exports.TextFieldWrapper = _juno.styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  width: 100%;\n  margin-top: 6px;\n  margin-bottom: 25px;\n\n  ", " {\n    padding-left: ", ";\n    ", ";\n    border-bottom: 1px solid ", ";\n\n    input {\n      margin: 7px 0 !important;\n      text-align: center;\n      font-size: 17px;\n\n      [sf-classic] & {\n        margin: 5px 0 !important;\n      }\n    }\n  }\n"])), _juno.RcDialTextField, function (_ref) {
  var isHaveValue = _ref.isHaveValue;
  return isHaveValue && (0, _juno.spacing)(9);
}, (0, _scss.pageSpace)('margin'), (0, _juno.palette2)('neutral', 'l03'));
//# sourceMappingURL=DialerWrapper.js.map
