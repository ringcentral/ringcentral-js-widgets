"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _AddressBook = require("./AddressBook");
Object.keys(_AddressBook).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AddressBook[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AddressBook[key];
    }
  });
});
var _AddressBook2 = require("./AddressBook.interface");
Object.keys(_AddressBook2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AddressBook2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AddressBook2[key];
    }
  });
});
var _helpers = require("./helpers");
Object.keys(_helpers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _helpers[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _helpers[key];
    }
  });
});
//# sourceMappingURL=index.js.map
