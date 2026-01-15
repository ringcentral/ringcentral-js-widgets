"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EmojiMenu = require("./EmojiMenu");
Object.keys(_EmojiMenu).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EmojiMenu[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EmojiMenu[key];
    }
  });
});
//# sourceMappingURL=index.js.map
