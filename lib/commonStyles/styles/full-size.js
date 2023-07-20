"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fullSizeStyle = void 0;
var _juno = require("@ringcentral/juno");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var fullSizeStyle = (0, _juno.css)(_templateObject());
exports.fullSizeStyle = fullSizeStyle;
//# sourceMappingURL=full-size.js.map
