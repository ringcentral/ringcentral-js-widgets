"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Contacts = require("./Contacts");
Object.keys(_Contacts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Contacts[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Contacts[key];
    }
  });
});
var _Contacts2 = require("./Contacts.interface");
Object.keys(_Contacts2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Contacts2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Contacts2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
