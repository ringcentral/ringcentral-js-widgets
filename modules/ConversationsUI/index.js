"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ConversationsUI = require("./ConversationsUI");
Object.keys(_ConversationsUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConversationsUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConversationsUI[key];
    }
  });
});
var _ConversationsUI2 = require("./ConversationsUI.interface");
Object.keys(_ConversationsUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConversationsUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConversationsUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
