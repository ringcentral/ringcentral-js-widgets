"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Segment", {
  enumerable: true,
  get: function get() {
    return _segment["default"];
  }
});
Object.defineProperty(exports, "Pendo", {
  enumerable: true,
  get: function get() {
    return _pendo.Pendo;
  }
});

var _segment = _interopRequireDefault(require("./segment"));

var _pendo = require("./pendo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//# sourceMappingURL=index.js.map