"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _PhoneBookPanel = require("./PhoneBookPanel");
Object.keys(_PhoneBookPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PhoneBookPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PhoneBookPanel[key];
    }
  });
});
//# sourceMappingURL=index.js.map
