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

var _CallLogCallCtrlUI = require("./CallLogCallCtrlUI");

Object.keys(_CallLogCallCtrlUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallLogCallCtrlUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLogCallCtrlUI[key];
    }
  });
});

var _CallLogCallCtrlUI2 = require("./CallLogCallCtrlUI.interface");

Object.keys(_CallLogCallCtrlUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallLogCallCtrlUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLogCallCtrlUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
