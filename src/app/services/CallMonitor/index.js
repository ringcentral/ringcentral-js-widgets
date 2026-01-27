"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CallMonitor = require("./CallMonitor.interface");
Object.keys(_CallMonitor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallMonitor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallMonitor[key];
    }
  });
});
var _CallMonitor2 = require("./CallMonitor");
Object.keys(_CallMonitor2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CallMonitor2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CallMonitor2[key];
    }
  });
});
var _callEvents = require("./callEvents");
Object.keys(_callEvents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _callEvents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _callEvents[key];
    }
  });
});
var _const = require("./const");
Object.keys(_const).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _const[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _const[key];
    }
  });
});
//# sourceMappingURL=index.js.map
