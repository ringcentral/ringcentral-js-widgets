"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.generateTheme = generateTheme;
var _Templates = require("../Templates");
var _Widgets = require("../Widgets");
function generateTheme() {
  return {
    templates: (0, _Templates.generateTemplates)(),
    widgets: (0, _Widgets.generateWidgets)()
  };
}
var _default = exports["default"] = generateTheme();
//# sourceMappingURL=Theme.js.map
