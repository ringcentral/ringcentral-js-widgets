"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CompanyContacts = require("./CompanyContacts");
Object.keys(_CompanyContacts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CompanyContacts[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CompanyContacts[key];
    }
  });
});
var _CompanyContacts2 = require("./CompanyContacts.interface");
Object.keys(_CompanyContacts2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CompanyContacts2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CompanyContacts2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
