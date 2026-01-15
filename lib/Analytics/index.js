"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Pendo", {
  enumerable: true,
  get: function get() {
    return _pendo.Pendo;
  }
});
Object.defineProperty(exports, "Segment", {
  enumerable: true,
  get: function get() {
    return _segment["default"];
  }
});
var _segment = _interopRequireDefault(require("./segment"));
var _pendo = require("./pendo");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//# sourceMappingURL=index.js.map
