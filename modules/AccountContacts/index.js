"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _AccountContacts = require("./AccountContacts");
Object.keys(_AccountContacts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AccountContacts[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AccountContacts[key];
    }
  });
});
var _AccountContacts2 = require("./AccountContacts.interface");
Object.keys(_AccountContacts2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AccountContacts2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AccountContacts2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
