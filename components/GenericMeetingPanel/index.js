"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  GenericMeetingPanel: true
};
Object.defineProperty(exports, "GenericMeetingPanel", {
  enumerable: true,
  get: function get() {
    return _GenericMeetingPanel.GenericMeetingPanel;
  }
});
var _GenericMeetingPanel = require("./GenericMeetingPanel");
var _interface = require("./interface");
Object.keys(_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _interface[key];
    }
  });
});
//# sourceMappingURL=index.js.map
