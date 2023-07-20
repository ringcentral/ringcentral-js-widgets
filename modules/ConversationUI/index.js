"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ConversationUI = require("./ConversationUI");
Object.keys(_ConversationUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConversationUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConversationUI[key];
    }
  });
});
var _ConversationUI2 = require("./ConversationUI.interface");
Object.keys(_ConversationUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConversationUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConversationUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
