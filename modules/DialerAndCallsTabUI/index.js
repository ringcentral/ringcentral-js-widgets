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

var _DialerAndCallsTabUI = require("./DialerAndCallsTabUI");

Object.keys(_DialerAndCallsTabUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DialerAndCallsTabUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DialerAndCallsTabUI[key];
    }
  });
});

var _DialerAndCallsTabUI2 = require("./DialerAndCallsTabUI.interface");

Object.keys(_DialerAndCallsTabUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DialerAndCallsTabUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DialerAndCallsTabUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
