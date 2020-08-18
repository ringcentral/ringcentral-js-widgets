"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.extensionTypes = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var extensionTypes = _ObjectMap.ObjectMap.fromObject({
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

exports.extensionTypes = extensionTypes;
var _default = extensionTypes;
exports["default"] = _default;
//# sourceMappingURL=extensionTypes.js.map
