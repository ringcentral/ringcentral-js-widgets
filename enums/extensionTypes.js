"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extensionTypes = exports["default"] = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var extensionTypes = exports.extensionTypes = _ObjectMap.ObjectMap.fromObject({
  announcement: 'Announcement',
  applicationExtension: 'ApplicationExtension',
  bot: 'Bot',
  department: 'Department',
  digitalUser: 'DigitalUser',
  faxUser: 'FaxUser',
  ivrMenu: 'IvrMenu',
  limited: 'Limited',
  pagingOnly: 'PagingOnly',
  parkLocation: 'ParkLocation',
  room: 'Room',
  sharedLinesGroup: 'SharedLinesGroup',
  site: 'Site',
  user: 'User',
  virtualUser: 'VirtualUser',
  voicemail: 'Voicemail'
});
var _default = exports["default"] = extensionTypes;
//# sourceMappingURL=extensionTypes.js.map
