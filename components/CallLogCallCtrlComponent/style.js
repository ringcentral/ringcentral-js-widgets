"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompleteTransferButton = void 0;
var _juno = require("@ringcentral/juno");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  white-space: initial;\n  margin-right: ", ";\n  padding: ", ";\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var CompleteTransferButton = (0, _juno.styled)(_juno.RcButton)(_templateObject(), function (_ref) {
  var $isWide = _ref.$isWide;
  return $isWide ? (0, _juno.spacing)(2) : (0, _juno.spacing)(1);
}, function (_ref2) {
  var $isWide = _ref2.$isWide;
  return !$isWide && (0, _juno.spacing)(0, 2);
});
exports.CompleteTransferButton = CompleteTransferButton;
CompleteTransferButton.defaultProps = {
  $isWide: true
};
//# sourceMappingURL=style.js.map
