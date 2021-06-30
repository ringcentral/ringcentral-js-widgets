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

var _CallLogCallCtrlPanel = require("./CallLogCallCtrlPanel");

Object.keys(_CallLogCallCtrlPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallLogCallCtrlPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLogCallCtrlPanel[key];
    }
  });
});

var _CallLogCallCtrlPanel2 = require("./CallLogCallCtrlPanel.interface");

Object.keys(_CallLogCallCtrlPanel2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallLogCallCtrlPanel2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallLogCallCtrlPanel2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
