"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _PersonalMeetingSettings = require("./PersonalMeetingSettings.view");
Object.keys(_PersonalMeetingSettings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PersonalMeetingSettings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PersonalMeetingSettings[key];
    }
  });
});
var _PersonalMeetingSettingsView = require("./PersonalMeetingSettings.view.interface");
Object.keys(_PersonalMeetingSettingsView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PersonalMeetingSettingsView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PersonalMeetingSettingsView[key];
    }
  });
});
//# sourceMappingURL=index.js.map
