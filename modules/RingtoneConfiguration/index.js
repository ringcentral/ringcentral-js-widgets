"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _RingtoneConfiguration = require("./RingtoneConfiguration");
Object.keys(_RingtoneConfiguration).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RingtoneConfiguration[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RingtoneConfiguration[key];
    }
  });
});
var _RingtoneConfiguration2 = require("./RingtoneConfiguration.interface");
Object.keys(_RingtoneConfiguration2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RingtoneConfiguration2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RingtoneConfiguration2[key];
    }
  });
});
var _const = require("./const");
Object.keys(_const).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _const[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _const[key];
    }
  });
});
var _helper = require("./helper");
Object.keys(_helper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _helper[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _helper[key];
    }
  });
});
//# sourceMappingURL=index.js.map
