"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationContainer = void 0;
var _NotificationPanel = require("../../components/NotificationPanel");
var _phoneContext = require("../../lib/phoneContext");
var NotificationContainer = exports.NotificationContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.alertUI;
})(_NotificationPanel.NotificationPanel);
//# sourceMappingURL=NotificationContainer.js.map
