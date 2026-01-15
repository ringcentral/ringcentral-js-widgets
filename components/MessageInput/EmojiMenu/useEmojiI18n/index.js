"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _useEmojiI18n = require("./useEmojiI18n");
Object.keys(_useEmojiI18n).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useEmojiI18n[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useEmojiI18n[key];
    }
  });
});
//# sourceMappingURL=index.js.map
