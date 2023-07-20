"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ReplyWithMessageUI2.ReplyWithMessageUI;
  }
});
var _ReplyWithMessageUI = require("./ReplyWithMessageUI.interface");
Object.keys(_ReplyWithMessageUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ReplyWithMessageUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ReplyWithMessageUI[key];
    }
  });
});
var _ReplyWithMessageUI2 = require("./ReplyWithMessageUI");
Object.keys(_ReplyWithMessageUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ReplyWithMessageUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ReplyWithMessageUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
