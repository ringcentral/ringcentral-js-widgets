"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Root = void 0;
var _juno = require("@ringcentral/juno");
var _commonStyles = require("../../../lib/commonStyles");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  box-sizing: border-box;\n  background: ", ";\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var Root = _juno.styled.div(_templateObject(), _commonStyles.fullSizeStyle, (0, _juno.palette2)('neutral', 'b01'));
exports.Root = Root;
//# sourceMappingURL=ComposeTextPanel.js.map
