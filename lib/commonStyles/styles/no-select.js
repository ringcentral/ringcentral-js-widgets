"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noSelectStyle = void 0;
var _juno = require("@ringcentral/juno");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  user-select: none;\n  user-drag: none;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var noSelectStyle = (0, _juno.css)(_templateObject());
exports.noSelectStyle = noSelectStyle;
//# sourceMappingURL=no-select.js.map
