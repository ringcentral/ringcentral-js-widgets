"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ConferenceDialerUI2.ConferenceDialerUI;
  }
});
var _ConferenceDialerUI = require("./ConferenceDialerUI.interface");
Object.keys(_ConferenceDialerUI).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ConferenceDialerUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConferenceDialerUI[key];
    }
  });
});
var _ConferenceDialerUI2 = require("./ConferenceDialerUI");
Object.keys(_ConferenceDialerUI2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ConferenceDialerUI2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConferenceDialerUI2[key];
    }
  });
});
//# sourceMappingURL=index.js.map
