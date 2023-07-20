"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ConversationMatcher = require("./ConversationMatcher");
Object.keys(_ConversationMatcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConversationMatcher[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConversationMatcher[key];
    }
  });
});
var _ConversationMatcher2 = require("./ConversationMatcher.interface");
Object.keys(_ConversationMatcher2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConversationMatcher2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConversationMatcher2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
