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

var _EvIntegratedSoftphone = require("./EvIntegratedSoftphone.interface");

Object.keys(_EvIntegratedSoftphone).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvIntegratedSoftphone[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvIntegratedSoftphone[key];
    }
  });
});

var _EvIntegratedSoftphone2 = require("./EvIntegratedSoftphone");

Object.keys(_EvIntegratedSoftphone2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvIntegratedSoftphone2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvIntegratedSoftphone2[key];
    }
  });
});
//# sourceMappingURL=index.js.map