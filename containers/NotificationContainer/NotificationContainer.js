"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationContainer = void 0;
var _NotificationPanel = require("../../components/NotificationPanel");
var _phoneContext = require("../../lib/phoneContext");
var NotificationContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.alertUI;
})(_NotificationPanel.NotificationPanel);
exports.NotificationContainer = NotificationContainer;
//# sourceMappingURL=NotificationContainer.js.map
