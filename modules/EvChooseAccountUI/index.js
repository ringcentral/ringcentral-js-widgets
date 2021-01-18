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

var _EvChooseAccountUI = require("./EvChooseAccountUI");

Object.keys(_EvChooseAccountUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvChooseAccountUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvChooseAccountUI[key];
    }
  });
});

var _EvChooseAccountUI2 = require("./EvChooseAccountUI.interface");

Object.keys(_EvChooseAccountUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EvChooseAccountUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EvChooseAccountUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
