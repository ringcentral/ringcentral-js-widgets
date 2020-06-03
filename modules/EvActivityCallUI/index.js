"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  i18n: true
};
Object.defineProperty(exports, "i18n", {
  enumerable: true,
  get: function get() {
    return _i18n["default"];
  }
});

var _i18n = _interopRequireDefault(require("./i18n"));

var _EvActivityCallUI = require("./EvActivityCallUI.interface");

Object.keys(_EvActivityCallUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvActivityCallUI[key];
    }
  });
});

var _EvActivityCallUI2 = require("./EvActivityCallUI");

Object.keys(_EvActivityCallUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvActivityCallUI2[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//# sourceMappingURL=index.js.map
