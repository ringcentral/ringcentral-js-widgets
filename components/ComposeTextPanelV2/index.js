"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ComposeTextPanel.ComposeTextPanel;
  }
});
var _ComposeTextPanel = require("./ComposeTextPanel");
Object.keys(_ComposeTextPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ComposeTextPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ComposeTextPanel[key];
    }
  });
});
//# sourceMappingURL=index.js.map
