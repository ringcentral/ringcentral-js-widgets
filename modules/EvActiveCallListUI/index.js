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

var _EvActiveCallListUI = require("./EvActiveCallListUI");

Object.keys(_EvActiveCallListUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvActiveCallListUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvActiveCallListUI[key];
    }
  });
});

var _EvActiveCallListUI2 = require("./EvActiveCallListUI.interface");

Object.keys(_EvActiveCallListUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvActiveCallListUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvActiveCallListUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
