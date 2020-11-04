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

var _MoreActionWithForward = require("./MoreActionWithForward");

Object.keys(_MoreActionWithForward).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MoreActionWithForward[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MoreActionWithForward[key];
    }
  });
});

var _MoreActionWithForward2 = require("./MoreActionWithForward.interface");

Object.keys(_MoreActionWithForward2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MoreActionWithForward2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MoreActionWithForward2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
