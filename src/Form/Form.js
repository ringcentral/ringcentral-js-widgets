"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.generateForm = generateForm;
var _core = require("@rjsf/core");
var _Theme = require("../Theme");
function generateForm() {
  return (0, _core.withTheme)((0, _Theme.generateTheme)());
}
var _default = exports["default"] = generateForm();
//# sourceMappingURL=Form.js.map
